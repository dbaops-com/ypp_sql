webpackJsonp([17],{316:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(2),a=e(4),o=e.n(a);n.default={name:"myorder-list",data:function(){return{columnsName:[{title:"回滚语句",key:"sql"}],tabcolumns:[{title:"sql语句",key:"sql"},{title:"状态",key:"state",width:250},{title:"错误信息",key:"error",width:400},{title:"影响行数",key:"affectrow",width:100},{title:"执行时间/秒",key:"execute_time",width:200}],TableDataNew:[],sql:"",openswitch:!1,single:!1,reloadsql:!1,formItem:{computer_room:"",connection_name:"",basename:"",username:"",bundle_id:null},ddlsql:[],sqltype:null,dmlorddl:null}},methods:{_RollBack:function(){var t=this;if(40===this.TableDataNew[1].state.length){this.openswitch=!0;var n=this.TableDataNew.map(function(t){return t.sequence});n.splice(0,1),o.a.post(i.a.url+"/detail/",{opid:JSON.stringify(n),id:this.$route.query.id}).then(function(n){t.formItem=n.data.data,t.formItem.backup="0",t.ddlsql=n.data.sql,t.sqltype=n.data.type,t.reloadsql=!0}).catch(function(){i.a.err_notice("无法获得相关回滚数据,请确认备份库配置正确及备份规则")})}else this.$Message.error("此工单没有备份或语句执行失败!")},PutData:function(){var t=this;o.a.put(i.a.url+"/detail",{id:this.$route.query.id}).then(function(n){t.formItem=n.data.data,t.sql=n.data.sql,t.sqltype=n.data.type}).catch(function(t){i.a.err_notice(t)}),this.reloadsql=!0},_Putorder:function(){var t=[],n=!0,e=!1,a=void 0;try{for(var A,r=this.ddlsql[Symbol.iterator]();!(n=(A=r.next()).done);n=!0){var d=A.value;t.push(d.sql)}}catch(t){e=!0,a=t}finally{try{!n&&r.return&&r.return()}finally{if(e)throw a}}o.a.post(i.a.url+"/sqlsyntax/",{data:JSON.stringify(this.formItem),sql:JSON.stringify(t),real_name:sessionStorage.getItem("real_name"),type:this.dmlorddl,id:this.formItem.bundle_id}).then(function(){i.a.notice("工单已提交成功")}).catch(function(t){i.a.err_notice(t)})},delorder:function(){var t=this,n=[];n.push({status:this.$route.query.status,id:this.$route.query.id}),o.a.post(i.a.url+"/undoOrder",{id:JSON.stringify(n)}).then(function(n){i.a.notice(n.data),t.$router.go(-1)}).catch(function(t){i.a.err_notice(t)})}},mounted:function(){var t=this;o.a.get(i.a.url+"/detail?workid="+this.$route.query.workid+"&status="+this.$route.query.status+"&id="+this.$route.query.id).then(function(n){t.TableDataNew=n.data.data,t.dmlorddl=n.data.type}).catch(function(t){i.a.err_notice(t)})}}},333:function(t,n,e){n=t.exports=e(75)(!0),n.push([t.i,".demo-spin-icon-load{animation:ani-demo-spin 1s linear infinite}.margin-top-8{margin-top:8px}.margin-top-10{margin-top:10px}.margin-top-20{margin-top:20px}.margin-left-10{margin-left:10px}.margin-bottom-10{margin-bottom:10px}.margin-bottom-100{margin-bottom:100px}.margin-right-10{margin-right:10px}.padding-left-6{padding-left:6px}.padding-left-8{padding-left:5px}.padding-left-10{padding-left:10px}.padding-left-20{padding-left:20px}.height-100{height:100%}.height-120px{height:100px}.height-200px{height:200px}.height-492px{height:492px}.height-460px{height:460px}.line-gray{height:0;border-bottom:2px solid #dcdcdc}.notwrap{word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.padding-left-5{padding-left:10px}[v-cloak]{display:none}.dragging-tip-enter-active{opacity:1;transition:opacity .3s}.dragging-tip-enter,.dragging-tip-leave-to{opacity:0;transition:opacity .3s}.dragging-tip-con{display:block;text-align:center;width:100%;height:50px}.dragging-tip-con span{font-size:18px}.record-tip-con{display:block;width:100%;height:292px;overflow:auto}.record-item{box-sizing:content-box;display:block;overflow:hidden;height:24px;line-height:24px;padding:8px 10px;border-bottom:1px dashed #dcdcdc}.record-tip-con span{font-size:14px}.edittable-test-con{min-height:600px}.edittable-testauto-con{height:100%}.edittable-table-height-con{min-height:600px}.edittable-table-height1-con{height:200px}.edittable-con-1{box-sizing:content-box;padding:15px 0 0;height:550px}.exportable-table-download-con1{padding:16px 0 16px 20px;border-bottom:1px dashed #c3c3c3;margin-bottom:16px}.exportable-table-download-con2{padding-left:20px}.show-image{padding:20px 0}.show-image img{display:block;width:100%;height:auto}.top{padding:10px;background:rgba(0,153,229,.7);color:#fff;text-align:center;border-radius:2px}","",{version:3,sources:["/Users/vincent/Desktop/ypp_sql/webpage/src/components/order/components/myorderList.vue"],names:[],mappings:"AACA,qBACE,0CAA4C,CAC7C,AACD,cACE,cAAgB,CACjB,AACD,eACE,eAAiB,CAClB,AACD,eACE,eAAiB,CAClB,AACD,gBACE,gBAAkB,CACnB,AACD,kBACE,kBAAoB,CACrB,AACD,mBACE,mBAAqB,CACtB,AACD,iBACE,iBAAmB,CACpB,AACD,gBACE,gBAAkB,CACnB,AACD,gBACE,gBAAkB,CACnB,AACD,iBACE,iBAAmB,CACpB,AACD,iBACE,iBAAmB,CACpB,AACD,YACE,WAAa,CACd,AACD,cACE,YAAc,CACf,AACD,cACE,YAAc,CACf,AACD,cACE,YAAc,CACf,AACD,cACE,YAAc,CACf,AACD,WACE,SAAU,AACV,+BAAiC,CAClC,AACD,SACE,oBAAqB,AACrB,mBAAoB,AACpB,gBAAiB,AACjB,sBAAwB,CACzB,AACD,gBACE,iBAAmB,CACpB,AACD,UACE,YAAc,CACf,AACD,2BACE,UAAW,AACX,sBAAyB,CAC1B,AACD,2CAEE,UAAW,AACX,sBAAyB,CAC1B,AACD,kBACE,cAAe,AACf,kBAAmB,AACnB,WAAY,AACZ,WAAa,CACd,AACD,uBACE,cAAgB,CACjB,AACD,gBACE,cAAe,AACf,WAAY,AACZ,aAAc,AACd,aAAe,CAChB,AACD,aACE,uBAAwB,AACxB,cAAe,AACf,gBAAiB,AACjB,YAAa,AACb,iBAAkB,AAClB,iBAAkB,AAClB,gCAAoC,CACrC,AACD,qBACE,cAAgB,CACjB,AACD,oBACE,gBAAkB,CACnB,AACD,wBACE,WAAa,CACd,AACD,4BACE,gBAAkB,CACnB,AACD,6BACE,YAAc,CACf,AACD,iBACE,uBAAwB,AACxB,iBAAkB,AAClB,YAAc,CACf,AACD,gCACE,yBAA0B,AAC1B,iCAAkC,AAClC,kBAAoB,CACrB,AACD,gCACE,iBAAmB,CACpB,AACD,YACE,cAAgB,CACjB,AACD,gBACE,cAAe,AACf,WAAY,AACZ,WAAa,CACd,AACD,KACE,aAAc,AACd,8BAAmC,AACnC,WAAY,AACZ,kBAAmB,AACnB,iBAAmB,CACpB",file:"myorderList.vue",sourcesContent:["\n.demo-spin-icon-load {\n  animation: ani-demo-spin 1s linear infinite;\n}\n.margin-top-8 {\n  margin-top: 8px;\n}\n.margin-top-10 {\n  margin-top: 10px;\n}\n.margin-top-20 {\n  margin-top: 20px;\n}\n.margin-left-10 {\n  margin-left: 10px;\n}\n.margin-bottom-10 {\n  margin-bottom: 10px;\n}\n.margin-bottom-100 {\n  margin-bottom: 100px;\n}\n.margin-right-10 {\n  margin-right: 10px;\n}\n.padding-left-6 {\n  padding-left: 6px;\n}\n.padding-left-8 {\n  padding-left: 5px;\n}\n.padding-left-10 {\n  padding-left: 10px;\n}\n.padding-left-20 {\n  padding-left: 20px;\n}\n.height-100 {\n  height: 100%;\n}\n.height-120px {\n  height: 100px;\n}\n.height-200px {\n  height: 200px;\n}\n.height-492px {\n  height: 492px;\n}\n.height-460px {\n  height: 460px;\n}\n.line-gray {\n  height: 0;\n  border-bottom: 2px solid #dcdcdc;\n}\n.notwrap {\n  word-break: keep-all;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.padding-left-5 {\n  padding-left: 10px;\n}\n[v-cloak] {\n  display: none;\n}\n.dragging-tip-enter-active {\n  opacity: 1;\n  transition: opacity 0.3s;\n}\n.dragging-tip-enter,\n.dragging-tip-leave-to {\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.dragging-tip-con {\n  display: block;\n  text-align: center;\n  width: 100%;\n  height: 50px;\n}\n.dragging-tip-con span {\n  font-size: 18px;\n}\n.record-tip-con {\n  display: block;\n  width: 100%;\n  height: 292px;\n  overflow: auto;\n}\n.record-item {\n  box-sizing: content-box;\n  display: block;\n  overflow: hidden;\n  height: 24px;\n  line-height: 24px;\n  padding: 8px 10px;\n  border-bottom: 1px dashed gainsboro;\n}\n.record-tip-con span {\n  font-size: 14px;\n}\n.edittable-test-con {\n  min-height: 600px;\n}\n.edittable-testauto-con {\n  height: 100%;\n}\n.edittable-table-height-con {\n  min-height: 600px;\n}\n.edittable-table-height1-con {\n  height: 200px;\n}\n.edittable-con-1 {\n  box-sizing: content-box;\n  padding: 15px 0 0;\n  height: 550px;\n}\n.exportable-table-download-con1 {\n  padding: 16px 0 16px 20px;\n  border-bottom: 1px dashed #c3c3c3;\n  margin-bottom: 16px;\n}\n.exportable-table-download-con2 {\n  padding-left: 20px;\n}\n.show-image {\n  padding: 20px 0;\n}\n.show-image img {\n  display: block;\n  width: 100%;\n  height: auto;\n}\n.top {\n  padding: 10px;\n  background: rgba(0, 153, 229, 0.7);\n  color: #fff;\n  text-align: center;\n  border-radius: 2px;\n}\n"],sourceRoot:""}])},614:function(t,n,e){var i=e(333);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(76)("279fbd54",i,!0,{})},650:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("Row",[e("Card",[e("p",{staticStyle:{height:"45px"},attrs:{slot:"title"},slot:"title"},[e("Icon",{attrs:{type:"android-send"}}),t._v("\n        工单"+t._s(this.$route.query.workid)+"详细信息\n        "),e("br"),t._v(" "),1===this.$route.query.status?e("Button",{attrs:{type:"text"},nativeOn:{click:function(n){t._RollBack()}}},[t._v("查看回滚语句")]):0===this.$route.query.status&&1===this.$route.query.type?e("Button",{attrs:{type:"text"},nativeOn:{click:function(n){t.PutData()}}},[t._v("重新提交\n        ")]):t._e(),t._v(" "),2===this.$route.query.status?e("Button",{attrs:{type:"text"},nativeOn:{click:function(n){t.delorder()}}},[t._v("工单撤销")]):t._e(),t._v(" "),e("Button",{attrs:{type:"text"},nativeOn:{click:function(n){t.$router.go(-1)}}},[t._v("返回")])],1),t._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("Table",{staticClass:"tabletop",staticStyle:{background:"#5cadff"},attrs:{border:"",columns:t.tabcolumns,data:t.TableDataNew,size:"large"}})],1)],1)],1)],1),t._v(" "),e("BackTop",{attrs:{height:100,bottom:200}},[e("div",{staticClass:"top"},[t._v("返回顶端")])]),t._v(" "),e("Modal",{attrs:{"ok-text":"提交工单",width:"800"},on:{"on-ok":t._Putorder},model:{value:t.reloadsql,callback:function(n){t.reloadsql=n},expression:"reloadsql"}},[e("Row",[e("Card",[e("div",{staticClass:"step-header-con"},[e("h3",[t._v("比心数据库自动化平台")])]),t._v(" "),e("p",{staticClass:"step-content"}),t._v(" "),e("Form",{staticClass:"step-form",attrs:{"label-width":100}},[e("FormItem",{attrs:{label:"用户名:"}},[e("p",[t._v(t._s(t.formItem.username))])]),t._v(" "),e("FormItem",{attrs:{label:"环境:"}},[e("p",[t._v(t._s(t.formItem.computer_room))])]),t._v(" "),e("FormItem",{attrs:{label:"业务信息:"}},[e("p",[t._v(t._s(t.formItem.connection_name))])]),t._v(" "),e("FormItem",{attrs:{label:"数据库库名:"}},[e("p",[t._v(t._s(t.formItem.basename))])]),t._v(" "),e("FormItem",[e("Table",{attrs:{columns:t.columnsName,data:t.ddlsql,stripe:"",border:""}})],1),t._v(" "),e("FormItem",{attrs:{label:"工单提交说明:"}},[e("Input",{attrs:{placeholder:"最多不超过20个字"},model:{value:t.formItem.text,callback:function(n){t.$set(t.formItem,"text",n)},expression:"formItem.text"}})],1),t._v(" "),e("FormItem",{attrs:{label:"是否备份"}},[e("RadioGroup",{model:{value:t.formItem.backup,callback:function(n){t.$set(t.formItem,"backup",n)},expression:"formItem.backup"}},[e("Radio",{attrs:{label:"1"}},[t._v("是")]),t._v(" "),e("Radio",{attrs:{label:"0"}},[t._v("否")])],1)],1)],1)],1)],1)],1)],1)},staticRenderFns:[]}},95:function(t,n,e){function i(t){e(614)}var a=e(1)(e(316),e(650),i,null,null);t.exports=a.exports}});
//# sourceMappingURL=17.a99230d12a011f7f4474.js.map