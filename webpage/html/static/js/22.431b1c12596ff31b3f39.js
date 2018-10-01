webpackJsonp([22],{302:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(4),n=r.n(o),a=r(2);t.default={name:"Query_audit",data:function(){var e=this;return{query_info:[],permissoncolums:[{type:"selection",width:60,align:"center"},{title:"申请编号",key:"work_id"},{title:"时间",key:"time"},{title:"申请人",key:"username"},{title:"状态",key:"query_per",width:150,render:function(e,t){var r=t.row,o="",n="";return 2===r.query_per?(o="primary",n="待审核"):0===r.query_per?(o="error",n="驳回"):1===r.query_per?(o="success",n="同意"):(o="warning",n="查询结束"),e("Tag",{props:{type:"dot",color:o}},n)},sortable:!0,filters:[{label:"同意",value:1},{label:"驳回",value:0},{label:"待审核",value:2},{label:"查询结束",value:3}],filterMethod:function(e,t){return 1===e?1===t.query_per:2===e?2===t.query_per:0===e?0===t.query_per:3===e?3===t.query_per:void 0}},{title:"操作",key:"action",width:200,align:"center",render:function(t,r){return 1===r.row.query_per?t("div",[t("Button",{props:{size:"small",type:"text"},on:{click:function(){e.modalinfo(r.row)}}},"查看"),t("Button",{props:{size:"small",type:"text"},on:{click:function(){e.stop_query(r.row)}}},"中止查询")]):t("div",[t("Button",{props:{size:"small",type:"text"},on:{click:function(){e.modalinfo(r.row)}}},"查看")])}}],per_pn:1,delrecord:[],editInfodModal:!1,query:{}}},methods:{permisson_list:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;n.a.get(a.a.url+"/query_order?page="+t).then(function(t){e.query_info=t.data.data,e.per_pn=t.data.pn}).catch(function(e){a.a.err_notice(e)})},delrecordData:function(){var e=this;n.a.post(a.a.url+"/query_order/",{work_id:JSON.stringify(this.delrecord)}).then(function(t){a.a.notice(t.data),e.$refs.perpage.currentPage=1,e.permisson_list()}).catch(function(e){a.a.err_notice(e)})},delrecordList:function(e){this.delrecord=e.map(function(e){return e.work_id})},modalinfo:function(e){this.editInfodModal=!0,this.query=e},savedata:function(){var e=this;n.a.put(a.a.url+"/query_worklf/",{mode:"agree",work_id:this.query.work_id}).then(function(t){a.a.notice(t.data),e.editInfodModal=!1,e.$refs.perpage.currentPage=1,e.permisson_list()}).catch(function(e){a.a.err_notice(e)})},reject:function(){var e=this;n.a.put(a.a.url+"/query_worklf/",{mode:"disagree",work_id:this.query.work_id}).then(function(t){a.a.notice(t.data),e.editInfodModal=!1,e.$refs.perpage.currentPage=1,e.permisson_list()}).catch(function(e){a.a.err_notice(e)})},stop_query:function(e){var t=this;n.a.put(a.a.url+"/query_worklf",{mode:"end",username:e.username}).then(function(e){a.a.notice(e.data),t.permisson_list()}).catch(function(e){return a.a.err_notice(e)})}},mounted:function(){this.permisson_list()}}},354:function(e,t,r){t=e.exports=r(77)(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"queryAudit.vue",sourceRoot:""}])},637:function(e,t,r){var o=r(354);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);r(78)("72ed814c",o,!0,{})},678:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Row",[r("Card",[r("p",{attrs:{slot:"title"},slot:"title"},[r("Icon",{attrs:{type:"md-person"}}),e._v("\n        查询审核\n      ")],1),e._v(" "),r("Row",[r("Col",{attrs:{span:"24"}},[r("Poptip",{attrs:{confirm:"",title:"您确认删除这些工单信息吗?"},on:{"on-ok":e.delrecordData}},[r("Button",{staticStyle:{"margin-left":"-1%"},attrs:{type:"text"}},[e._v("删除记录")])],1),e._v(" "),r("Table",{ref:"selection",attrs:{border:"",columns:e.permissoncolums,data:e.query_info,stripe:""},on:{"on-selection-change":e.delrecordList}}),e._v(" "),r("br"),e._v(" "),r("Page",{ref:"perpage",attrs:{total:e.per_pn,"show-elevator":"","page-size":20},on:{"on-change":e.permisson_list}})],1)],1)],1)],1),e._v(" "),r("Modal",{attrs:{width:800},model:{value:e.editInfodModal,callback:function(t){e.editInfodModal=t},expression:"editInfodModal"}},[r("h3",{staticStyle:{color:"#2D8CF0"},attrs:{slot:"header"},slot:"header"},[e._v("查询申请单详细内容")]),e._v(" "),r("Form",{attrs:{"label-width":120,"label-position":"right"}},[r("FormItem",{attrs:{label:"机房"}},[r("p",[e._v(e._s(e.query.computer_room))])]),e._v(" "),r("hr",{staticStyle:{height:"1px",border:"none","border-top":"1px dashed #dddee1"}}),e._v(" "),r("br"),e._v(" "),r("FormItem",{attrs:{label:"连接名:"}},[r("p",[e._v(e._s(e.query.connection_name))])]),e._v(" "),r("hr",{staticStyle:{height:"1px",border:"none","border-top":"1px dashed #dddee1"}}),e._v(" "),r("br"),e._v(" "),r("hr",{staticStyle:{height:"1px",border:"none","border-top":"1px dashed #dddee1"}}),e._v(" "),r("br"),e._v(" "),r("FormItem",{attrs:{label:"导出数据:"}},[1===e.query.export?r("p",[e._v("是")]):r("p",[e._v("否")])]),e._v(" "),r("hr",{staticStyle:{height:"1px",border:"none","border-top":"1px dashed #dddee1"}}),e._v(" "),r("br"),e._v(" "),r("FormItem",{attrs:{label:"查询说明:"}},[r("Input",{attrs:{type:"textarea",autosize:{minRows:5,maxRows:8},readonly:""},model:{value:e.query.instructions,callback:function(t){e.$set(e.query,"instructions",t)},expression:"query.instructions"}})],1)],1),e._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("Button",{attrs:{type:"primary"},on:{click:function(t){e.editInfodModal=!1}}},[e._v("取消")]),e._v(" "),2===e.query.query_per?r("Button",{attrs:{type:"error"},on:{click:e.reject}},[e._v("驳回")]):e._e(),e._v(" "),2===e.query.query_per?r("Button",{attrs:{type:"success"},on:{click:e.savedata}},[e._v("同意")]):e._e()],1)],1)],1)},staticRenderFns:[]}},84:function(e,t,r){function o(e){r(637)}var n=r(1)(r(302),r(678),o,"data-v-76bda50b",null);e.exports=n.exports}});
//# sourceMappingURL=22.431b1c12596ff31b3f39.js.map