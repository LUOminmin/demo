(function(e){function t(t){for(var o,n,i=t[0],u=t[1],l=t[2],m=0,c=[];m<i.length;m++)n=i[m],a[n]&&c.push(a[n][0]),a[n]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);d&&d(t);while(c.length)c.shift()();return s.push.apply(s,l||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],o=!0,i=1;i<r.length;i++){var u=r[i];0!==a[u]&&(o=!1)}o&&(s.splice(t--,1),e=n(n.s=r[0]))}return e}var o={},a={shop_group_order:0},s=[];function n(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=o,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var d=u;s.push([61,"chunk-vendors","chunk-common"]),r()})({"141a":function(e,t,r){"use strict";var o=r("3198"),a=r.n(o);a.a},"1a90":function(e,t,r){"use strict";var o=r("c3ee"),a=r.n(o);a.a},"24f3":function(e,t,r){"use strict";var o=r("dcd5"),a=r.n(o);a.a},3198:function(e,t,r){},"3f51":function(e,t,r){},5033:function(e,t,r){"use strict";var o=r("3f51"),a=r.n(o);a.a},61:function(e,t,r){e.exports=r("6963")},6963:function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("f751"),r("097d");var o=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("withoutData",{directives:[{name:"show",rawName:"v-show",value:e.isBlank,expression:"isBlank"}],attrs:{status:e.status}}),r("LoadMore",{ref:"scroll",staticClass:"load_more",on:{loadmore:e.LoadMoreType}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.isGroup,expression:"isGroup"}]},[e.groupOrder.length?r("div",[r("List",{attrs:{list:e.groupOrder},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.item,o=e.index;return[r("OrderTime",{attrs:{item:t,index:o}}),r("OrderDetails",{attrs:{item:t,index:o}}),r("OrderFund",{attrs:{item:t,index:o}}),r("OrderMsgDetails",{attrs:{item:t,index:o}})]}}],null,!1,1956834634)})],1):e._e()]),r("div",{directives:[{name:"show",rawName:"v-show",value:!e.isGroup,expression:"!isGroup"}]},[e.normalOrder.length?r("div",e._l(e.normalOrder,function(t,o){return r("div",{key:t.index},[t[0]?r("OrderTime",{attrs:{item:t[0],index:0}}):e._e(),r("List",{attrs:{list:t},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.item,o=e.index;return[r("OrderDetails",{attrs:{item:t,index:o}}),r("OrderFund",{attrs:{item:t,index:o}})]}}],null,!0)}),t[0]?r("OrderMsgDetails",{attrs:{item:t[0],index:0}}):e._e()],1)}),0):e._e()])])],1)},s=[],n=r("6abe"),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"ui-time q-1px-b"},[r("div",{staticClass:"item"},[r("span",{staticClass:"left"},[e._v(e._s(e._f("dataFormat")(e.item.time,"yyyy/MM/dd hh:mm")))]),r("span",{staticClass:"right"},[e._v(e._s(e.item.event))])])])},u=[],l=(r("c5f6"),{name:"OrderTime",props:{item:{type:Object,default:function(){return{time:"",event:""}}},index:Number},data:function(){return{}},mounted:function(){},created:function(){},methods:{}}),d=l,m=(r("769a"),r("2877")),c=Object(m["a"])(d,i,u,!1,null,"307372fa",null),_=c.exports,p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"order_details"},[r("div",{staticClass:"top q-1px-b"},[r("div",{staticClass:"img"},[r("img",{staticClass:"image",attrs:{src:e.item.img}})]),r("div",{staticClass:"goods"},[r("div",{staticClass:"goods_name"},[e._v(e._s(e.item.goods_name))]),r("div",{staticClass:"goods_size"},[e._v("规格  "+e._s(e.item.goods_size))]),r("div",{staticClass:"goods_msg"},[r("span",{staticClass:"left"},[e._v("￥"+e._s(e._f("trans-price-before")(e.item.goods_price)))]),r("span",{staticClass:"right"},[e._v("x "+e._s(e.item.goods_num))])])])])])},v=[],g={name:"OrderDetails",props:{item:{type:Object,default:function(){return{img:"",goods_name:"",goods_size:"",goods_price:"",goods_num:"",receive_money:"30.00",estimate_money:"0.00",group_rayolty_money:"3.00"}}},index:Number},data:function(){return{}},mounted:function(){},created:function(){},methods:{}},f=g,y=(r("1a90"),Object(m["a"])(f,p,v,!1,null,"63325dda",null)),h=y.exports,b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"bottom"},[r("div",{staticClass:"item"},[r("div",{staticClass:"itemTop"},[e._v(e._s(e.item.receive_money_label))]),r("div",{staticClass:"itemButtom textColor"},[e._v("￥"+e._s(e._f("trans-price-before")(e.item.receive_money)))])]),r("div",{staticClass:"item"},[r("div",{staticClass:"itemTop"},[e._v(e._s(e.item.estimate_money_label))]),r("div",{staticClass:"itemButtom"},[e._v(e._s(e.item.estimate_money))])]),r("div",{staticClass:"item"},[r("div",{staticClass:"itemTop"},[e._v(e._s(e.item.group_rayolty_money_label))]),r("div",{staticClass:"itemButtom"},[e._v(e._s(e.item.group_rayolty_money))])])])},O=[],w={name:"OrderTime",props:{item:{type:Object,default:function(){return{receive_money:"",estimate_money:"",group_rayolty_money:"",receive_money_label:"",estimate_money_label:"",group_rayolty_money_label:"",kpi_type:""}}},index:Number},data:function(){return{}},mounted:function(){},created:function(){},methods:{}},x=w,C=(r("24f3"),Object(m["a"])(x,b,O,!1,null,"4f30ec6d",null)),k=C.exports,N=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"content"},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.showMsg,expression:"showMsg"}],staticClass:"details_msg q-1px-t"},[r("div",{staticClass:"flex_row"},[r("div",{staticClass:"detailKey"},[e._v("会员名称")]),r("div",{directives:[{name:"show",rawName:"v-show",value:e.item.member_name,expression:"item.member_name"}],staticClass:"detailValue"},[e._v(e._s(e.item.member_name))])]),r("div",{staticClass:"flex_row"},[r("div",{staticClass:"detailKey"},[e._v("手机号码")]),r("div",{directives:[{name:"show",rawName:"v-show",value:e.item.member_number,expression:"item.member_number"}],staticClass:"detailValue"},[e._v(e._s(e._f("numFormat")(e.item.member_number)))])]),r("div",{staticClass:"flex_row"},[r("div",{staticClass:"detailKey"},[e._v("订单号码")]),r("div",{directives:[{name:"show",rawName:"v-show",value:e.item.order_num,expression:"item.order_num"}],staticClass:"detailValue"},[e._v(e._s(e.item.order_num))])]),r("div",{staticClass:"flex_row"},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.item.group_num,expression:"item.group_num"}],staticClass:"detailKey"},[e._v("团编号码")]),r("div",{staticClass:"detailValue"},[e._v(e._s(e.item.group_num))])])]),r("div",{directives:[{name:"show",rawName:"v-show",value:e.showMsg,expression:"showMsg"}],staticClass:"btn q-1px-t",on:{click:e.hideMess}},[e._v("点击收起")]),r("div",{directives:[{name:"show",rawName:"v-show",value:!e.showMsg,expression:"!showMsg"}],staticClass:"btn q-1px-t",on:{click:e.showMess}},[e._v("查看更多")])])},M=[],T={name:"OrderMsgDetails",props:{item:{type:Object,default:function(){return{member_name:"",member_number:"",order_num:"",group_num:"",pay_time:"",showMsg:""}}},index:Number},data:function(){return{showMsg:!1}},mounted:function(){},created:function(){},methods:{showMess:function(){var e=this;e.showMsg=!0},hideMess:function(){var e=this;e.showMsg=!1}}},j=T,$=(r("5033"),Object(m["a"])(j,N,M,!1,null,"03aac835",null)),G=$.exports,B=r("a3d3"),E=r("b2eb"),F=r("2d44"),D=r("2e39"),L=(r("ac6a"),r("adb5")),R={getGroupRoyaltyOrder:function(e){var t=this,r=e.data,o="/app/auth/shop/getGroupRoyaltyOrder.do";L["a"].ajax({data:r,url:o,success:function(r){console.log("请求拼团接口成功");var o=r.object;e.success&&e.success(t.transOrder(o))},error:function(t){9326===t.code?B["a"].toast("您的归属门店已修改，暂查不到该订单哦",{duration:2e3,location:"middle"}):B["a"].toast(t.message||"网络出小差了"),e.error&&e.error(t)},complete:function(t){e.complete&&e.complete(t)}})},transOrder:function(e){var t={groupOrder:[]};return null==e||null==e.list?(t.groupOrder=[],t):(e.list.forEach(function(e){var r={time:e.success_group_time,event:e.order_status_name,img:e.pic_path,goods_name:e.goods_name,goods_size:e.goods_sku_name,goods_price:e.goods_price,goods_num:e.amount,receive_money_label:"实收金额",estimate_money_label:"已结算"==e.order_status_name?"团提成":"预估团提成",group_rayolty_money_label:"团提成数值",kpi_type:e.kpi_type,receive_money:e.action_amount,estimate_money:e.group_estimated_royalt,group_rayolty_money:e.group_royalt_num,member_name:e.user_name,member_number:e.phone,order_num:e.order_no,group_num:e.group_shopping_order_no,pay_time:e.pick_goods_time};Number(e.group_estimated_royalt)?r.estimate_money="￥"+Number(e.group_estimated_royalt/100).toFixed(2):r.estimate_money="--","percent"==e.kpi_type?Number(e.group_royalt_num)?r.group_rayolty_money=Number(e.group_royalt_num).toFixed(2)+"%":r.group_rayolty_money="--":"amount"==e.kpi_type&&Number(e.group_royalt_num)?r.group_rayolty_money="￥"+Number(e.group_royalt_num).toFixed(2):r.group_rayolty_money="--",e.user_name?r.member_name=e.user_name:r.member_name="无",t.groupOrder.push(r)}),t)},getNormalOrder:function(e){var t=this,r=e.data,o="/app/auth/shop/getNormalRoyaltyOrder.do";L["a"].ajax({url:o,data:r,success:function(r){if(console.log("请求推广接口成功"),r.success){var o=r.object;e.success&&e.success(t.transOrderNormal(o))}},error:function(t){9326===t.code?B["a"].toast("您的归属门店已修改，暂查不到该订单哦",{duration:2e3,location:"middle"}):B["a"].toast(t.message||"网络出小差了"),e.error&&e.error(t)},complete:function(t){e.complete&&e.complete(t)}})},transOrderNormal:function(e){var t={normalOrder:[[]]};return null==e.list||null==e?(t.normalOrder=[],t):(e.list.forEach(function(e){var r=[];e.forEach(function(e){var t={img:e.picture_url,goods_name:e.goods_name,goods_size:e.sku_name,goods_price:e.retail_price,goods_num:e.sales_num,receive_money_label:"实收金额",estimate_money_label:"已结算"==e.order_status_name?"提成":"预估提成",group_rayolty_money_label:"提成数值",receive_money:e.sales_price,estimate_money:e.kpi_value,group_rayolty_money:e.kpi_set_value,kpi_type:e.kpi_type,time:e.create_time,event:e.order_status_name,member_name:e.user_name,member_number:e.user_phone,order_num:e.order_no,pay_time:e.create_time||e.return_time};Number(e.kpi_value)?t.estimate_money="￥"+(e.kpi_value/100).toFixed(2):t.estimate_money="--","percent"==e.kpi_type?Number(e.kpi_set_value)&&(t.group_rayolty_money=(e.kpi_set_value/100).toFixed(2)+"%"):"amount"==e.kpi_type?t.group_rayolty_money="￥"+(e.kpi_set_value/100).toFixed(2):t.group_rayolty_money="--",e.user_name?t.member_name=e.user_name:t.member_name="无",r.push(t)}),t.normalOrder.push(r)}),t)}},S=r("4136"),V={name:"group_order",components:{List:n["a"],OrderTime:_,OrderDetails:h,OrderFund:k,OrderMsgDetails:G,LoadMore:F["a"],WithoutData:D["a"]},data:function(){return{order_no:"",group_shopping_order_no:"",isGroup:!0,idx:1,val:"",page:1,status:"without_data",groupOrder:[],normalOrder:[],isBlank:!1}},created:function(){var e=this,t=B["a"].getParam();e.order_no=t.order_no,e.group_shopping_order_no=t.group_shopping_order_no,e.idx=t.index+1||1;var r=0==e.idx?"guide_group_order":"guide_order",o=t.order_no||t.group_shopping_order_no;alert(o),t.removeOrder&&S["a"].updateCache(o,r,"remove"),e.renderType(),B["a"].addEventListener({name:"swipeleft"},function(){console.log("estimate_royalty left"),E["a"].publish("customSwipeLeft")}),B["a"].addEventListener({name:"swiperight"},function(){console.log("estimate_royalty right"),E["a"].publish("customSwipeRight")}),E["a"].subscribe("changeTitle",function(t){e.$refs.scroll.hideTips(),e.val="",e.idx=t.index,e.initValue(),e.renderType(e.idx)}),E["a"].subscribe("getTabValue",function(t){e.val=t.value,e.order_no="",e.group_shopping_order_no="",e.$refs.scroll.hideTips(),0==t.value&&(e.val=""),e.initValue(),e.renderType(e.idx,function(){e.$refs.scroll.init()})})},mounted:function(){var e=this;B["a"].startRefresh({callback:function(){e.order_no="",e.group_shopping_order_no="",e.$refs.scroll.hideTips(),e.initValue(),2==e.idx?e.getNormalOrder(function(){e.$refs.scroll.init()}):e.getGroupRoyaltyOrder(function(){e.$refs.scroll.init()})}})},methods:{renderType:function(e,t){var r=this;1==r.idx&&(r.isGroup=!0,r.getGroupRoyaltyOrder(t)),2==r.idx&&(r.isGroup=!1,r.getNormalOrder(t))},initValue:function(){var e=this;e.page=1,e.groupOrder=[],e.normalOrder=[]},LoadMoreType:function(){var e=this;e.isGroup?this.getGroupRoyaltyOrder():this.getNormalOrder()},getGroupRoyaltyOrder:function(e){var t=this,r=this,o=10;R.getGroupRoyaltyOrder({data:{order_status:"settled"==r.val?"":r.val,settle_status:"settled"==r.val?r.val:"",group_shopping_order_no:r.group_shopping_order_no,page:r.page,size:o,api_versions:"v2"},success:function(e){r.groupOrder=r.groupOrder.concat(e.groupOrder),e.groupOrder&&e.groupOrder.length===o?t.$refs.scroll.loaded():t.$refs.scroll.complete(),0==r.groupOrder.length?(t.isBlank=!0,t.$refs.scroll.hideTips()):t.isBlank=!1,r.page+=1},error:function(){t.$refs.scroll.loaded()},complete:function(){e&&e()}})},getNormalOrder:function(e){var t=this,r=this,o=10;R.getNormalOrder({data:{order_status:"settled"==r.val?"":r.val,order_no:r.order_no,settle_status:"settled"==r.val?r.val:"",page:r.page,size:o},success:function(e){r.normalOrder=r.normalOrder.concat(e.normalOrder),e.normalOrder&&e.normalOrder.length===o?t.$refs.scroll.loaded():r.$refs.scroll.complete(),r.page+=1,0==r.normalOrder.length?(t.isBlank=!0,r.$refs.scroll.hideTips()):t.isBlank=!1},error:function(){t.$refs.scroll.loaded()},complete:function(){e&&e()}})}}},P=V,z=(r("141a"),Object(m["a"])(P,a,s,!1,null,"f8c03c98",null)),q=z.exports,K=r("d8ac");o["a"].config.productionTip=!1,K["a"].start(o["a"]),window.EventBus=new o["a"],window.isPc()?(console.log("pc"),new o["a"]({render:function(e){return e(q)},data:{Bus:new o["a"]}}).$mount("#app")):(console.log("移动端"),window.apiready=function(){new o["a"]({render:function(e){return e(q)}}).$mount("#app")})},"769a":function(e,t,r){"use strict";var o=r("ad60"),a=r.n(o);a.a},ad60:function(e,t,r){},c3ee:function(e,t,r){},dcd5:function(e,t,r){}});