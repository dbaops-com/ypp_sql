import json
import logging
import datetime
import re
import threading
import simplejson
import ast
from django.http import HttpResponse
from rest_framework.response import Response
from libs.serializers import Query_review, Query_list
from libs import baseview, send_email, util
from libs import con_database
from core.models import DatabaseList, Account, querypermissions, query_order, globalpermissions

CUSTOM_ERROR = logging.getLogger('SQL.core.views')


def exclued_db_list():
    try:
        from core.models import globalpermissions

        setting = globalpermissions.objects.filter(authorization='global').first()
        exclued_database_name = setting.other.get('exclued_db_list', [])
    except Exception:
        logging.error("exclued_database_name配置错误.")
        exclued_database_name = []
    finally:
        return exclued_database_name


class DateEncoder(simplejson.JSONEncoder):  # 感谢的凉夜贡献

    def default(self, o):
        if isinstance(o, datetime.datetime) or isinstance(o, datetime.date) or isinstance(o, datetime.time):
            return o.__str__()
        return simplejson.JSONEncoder.default(self, o)


class search(baseview.BaseView):
    '''
    :argument   sql查询接口, 过滤非查询语句并返回查询结果。
                可以自由limit数目 当limit数目超过配置文件规定的最大数目时将会采用配置文件的最大数目

    '''

    def post(self, request, args=None):
        un_init = util.init_conf()
        limit = ast.literal_eval(un_init['other'])
        sql = request.data['sql']
        check = str(sql).strip().split(';\n')
        user = query_order.objects.filter(username=request.user).order_by('-id').first()
        un_init = util.init_conf()
        custom_com = ast.literal_eval(un_init['other'])
        if user.query_per == 1:
            if check[-1].strip().lower().startswith('s') != 1:
                return Response('只支持查询功能或删除不必要的空白行！')
            else:
                address = json.loads(request.data['address'])
                _c = DatabaseList.objects.filter(
                    connection_name=user.connection_name,
                    computer_room=user.computer_room
                ).first()
                with con_database.SQLgo(
                        ip=_c.ip,
                        password=_c.password,
                        user=_c.username,
                        port=_c.port,
                        db=address['basename']
                ) as f:
                    try:
                        if limit.get('limit').strip() == '':
                            CUSTOM_ERROR.error('未设置全局最大limit值，系统自动设置为1000')
                            query_sql = replace_limit(check[-1].strip(), 1000)
                        else:
                            query_sql = replace_limit(check[-1].strip(), limit.get('limit'))
                        data_set = f.search(sql=query_sql)
                    except Exception as e:
                        CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
                        return HttpResponse(e)
                    else:
                        for l in data_set['data']:
                            for k, v in l.items():
                                if isinstance(v, bytes):
                                    for n in range(data_set['len']):
                                        data_set['data'][n].update({k: 'blob字段为不可呈现类型'})
                                for i in custom_com['sensitive_list']:
                                    if k == i:
                                        for n in range(data_set['len']):
                                            data_set['data'][n].update({k: '********'})
                        querypermissions.objects.create(
                            work_id=user.work_id,
                            username=request.user,
                            statements=query_sql
                        )
                    return HttpResponse(simplejson.dumps(data_set, cls=DateEncoder, bigint_as_string=True))
        else:
            return Response('非法请求,账号无查询权限！')

    def put(self, request, args: str = None):
        base = request.data['base']
        table = request.data['table']
        query_per = query_order.objects.filter(username=request.user).order_by('-id').first()
        if query_per.query_per == 1:
            _c = DatabaseList.objects.filter(
                connection_name=query_per.connection_name,
                computer_room=query_per.computer_room
            ).first()
            try:
                with con_database.SQLgo(
                        ip=_c.ip,
                        password=_c.password,
                        user=_c.username,
                        port=_c.port,
                        db=base
                ) as f:
                    data_set = f.search(sql='desc %s' % table)
                return Response(data_set)
            except:
                return Response('')
        else:
            return Response({'error': '非法请求,账号无查询权限！'})


def replace_limit(sql, limit):
    '''

    :argument 根据正则匹配分析输入信息 当limit数目超过配置文件规定的最大数目时将会采用配置文件的最大数目

    '''

    if sql[-1] != ';':
        sql += ';'
    if sql.startswith('show') == -1:
        return sql
    sql_re = re.search(r'limit\s.*\d.*;', sql.lower())
    length = ''
    if sql_re is not None:
        c = re.search(r'\d.*', sql_re.group())
        if c is not None:
            if c.group().find(',') != -1:
                length = c.group()[-2]
            else:
                length = c.group().rstrip(';')
        if int(length) <= int(limit):
            return sql
        else:
            sql = re.sub(r'limit\s.*\d.*;', 'limit %s;' % limit, sql)
            return sql
    else:
        sql = sql.rstrip(';') + ' limit %s;' % limit
        return sql


class query_worklf(baseview.BaseView):

    def get(self, request, args: str = None):
        page = request.GET.get('page')
        page_number = query_order.objects.count()
        start = int(page) * 20 - 20
        end = int(page) * 20
        info = query_order.objects.all().order_by('-id')[start:end]
        serializers = Query_review(info, many=True)
        return Response({'page': page_number, 'data': serializers.data})

    def post(self, request, args: str = None):

        work_id = request.data['workid']
        user = request.data['user']
        data = querypermissions.objects.filter(work_id=work_id, username=user).all().order_by('-id')
        serializers = Query_list(data, many=True)
        return Response(serializers.data)

    def put(self, request, args: str = None):

        if request.data['mode'] == 'put':
            instructions = request.data['instructions']
            connection_name = request.data['connection_name']
            computer_room = request.data['computer_room']
            export = request.data['export']
            audit = request.data['audit']
            un_init = util.init_conf()
            query_switch = ast.literal_eval(un_init['other'])
            query_per = 2
            work_id = util.workId()
            if not query_switch['query']:
                query_per = 2
            else:
                userinfo = Account.objects.filter(username=audit, group='admin').first()
                try:
                    thread = threading.Thread(
                        target=push_message,
                        args=(
                            {'to_user': request.user, 'workid': work_id}, 5, request.user, userinfo.email, work_id,
                            '提交')
                    )
                    thread.start()
                except Exception as e:
                    CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
            query_order.objects.create(
                work_id=work_id,
                instructions=instructions,
                username=request.user,
                date=util.date(),
                query_per=query_per,
                connection_name=connection_name,
                computer_room=computer_room,
                export=export,
                audit=audit,
                time=util.date()
            )
            if not query_switch['query']:
                query_order.objects.filter(work_id=work_id).update(query_per=1)
            ## 钉钉及email站内信推送
            return Response('查询工单已提交，等待管理员审核！')

        elif request.data['mode'] == 'agree':
            work_id = request.data['work_id']
            query_info = query_order.objects.filter(work_id=work_id).order_by('-id').first()
            query_order.objects.filter(work_id=work_id).update(query_per=1)
            userinfo = Account.objects.filter(username=query_info.username).first()
            try:
                thread = threading.Thread(target=push_message, args=(
                    {'to_user': query_info.username, 'workid': query_info.work_id}, 6, query_info.username,
                    userinfo.email,
                    work_id, '同意'))
                thread.start()
            except Exception as e:
                CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
            return Response('查询工单状态已更新！')

        elif request.data['mode'] == 'disagree':
            work_id = request.data['work_id']
            query_order.objects.filter(work_id=work_id).update(query_per=0)
            query_info = query_order.objects.filter(work_id=work_id).order_by('-id').first()
            userinfo = Account.objects.filter(username=query_info.username).first()
            try:
                thread = threading.Thread(target=push_message, args=(
                    {'to_user': query_info.username, 'workid': query_info.work_id}, 7, query_info.username,
                    userinfo.email,
                    work_id, '驳回'))
                thread.start()
            except Exception as e:
                CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
            return Response('查询工单状态已更新！')

        elif request.data['mode'] == 'status':
            try:
                status = query_order.objects.filter(username=request.user).order_by('-id').first()
                return Response(status.query_per)
            except:
                return Response(0)

        elif request.data['mode'] == 'end':
            try:
                query_order.objects.filter(username=request.data['username']).order_by('-id').update(query_per=3)
                return Response('已结束查询！')
            except Exception as e:
                return HttpResponse(e)

        elif request.data['mode'] == 'info':
            tablelist = []
            highlist = []
            database = query_order.objects.filter(username=request.user).order_by('-id').first()
            _connection = DatabaseList.objects.filter(connection_name=database.connection_name).first()
            with con_database.SQLgo(ip=_connection.ip,
                                    user=_connection.username,
                                    password=_connection.password,
                                    port=_connection.port) as f:
                dataname = f.query_info(sql='show databases')
            children = []
            ignore = exclued_db_list()
            for index, uc in sorted(enumerate(dataname), reverse=True):
                for cc in ignore:
                    if uc['Database'] == cc:
                        del dataname[index]
            for i in dataname:
                with con_database.SQLgo(ip=_connection.ip,
                                        user=_connection.username,
                                        password=_connection.password,
                                        port=_connection.port,
                                        db=i['Database']) as f:
                    tablename = f.query_info(sql='show tables')
                highlist.append({'vl': i['Database'], 'meta': '库名'})
                for c in tablename:
                    key = 'Tables_in_%s' % i['Database']
                    highlist.append({'vl': c[key], 'meta': '表名'})
                    children.append({
                        'title': c[key]
                    })
                tablelist.append({
                    'title': i['Database'],
                    'children': children
                })
                children = []
            data = [{
                'title': database.connection_name,
                'expand': 'true',
                'children': tablelist
            }]
            return Response({'info': json.dumps(data), 'status': database.export, 'highlight': highlist})

    def delete(self, request, args: str = None):

        data = query_order.objects.filter(username=request.user).order_by('-id').first()
        query_order.objects.filter(work_id=data.work_id).delete()
        return Response('')


def push_message(message=None, type=None, user=None, to_addr=None, work_id=None, status=None):
    try:
        tag = globalpermissions.objects.filter(authorization='global').first()
        if tag.message['mail']:
            put_mess = send_email.send_email(to_addr=to_addr, ssl=tag.message['ssl'])
            put_mess.send_mail(mail_data=message, type=type)
    except Exception as e:
        CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')
    else:
        try:
            if tag.message['ding']:
                un_init = util.init_conf()
                webhook = ast.literal_eval(un_init['message'])
                util.dingding(content='查询申请通知\n工单编号:%s\n发起人:%s\n状态:%s' % (work_id, user, status),
                              url=webhook['webhook'])
        except ValueError as e:
            CUSTOM_ERROR.error(f'{e.__class__.__name__}: {e}')


class Query_order(baseview.SuperUserpermissions):

    def get(self, request, args: str = None):
        page = request.GET.get('page')
        pn = query_order.objects.filter(audit=request.user).count()
        start = int(page) * 10 - 10
        end = int(page) * 10
        user_list = query_order.objects.all().order_by('-id')[start:end]
        serializers = Query_review(user_list, many=True)
        return Response({'data': serializers.data, 'pn': pn})

    def post(self, request, args: str = None):
        work_id_list = json.loads(request.data['work_id'])
        for i in work_id_list:
            query_order.objects.filter(work_id=i).delete()
        return Response('申请记录已删除!')
