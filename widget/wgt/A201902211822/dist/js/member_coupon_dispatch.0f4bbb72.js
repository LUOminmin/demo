(function(t){function e(e){for(var o,a,r=e[0],u=e[1],c=e[2],p=0,d=[];p<r.length;p++)a=r[p],i[a]&&d.push(i[a][0]),i[a]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(t[o]=u[o]);l&&l(e);while(d.length)d.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],o=!0,r=1;r<n.length;r++){var u=n[r];0!==i[u]&&(o=!1)}o&&(s.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},i={member_coupon_dispatch:0},s=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],u=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var l=u;s.push([20,"chunk-vendors","chunk-common"]),n()})({20:function(t,e,n){t.exports=n("94fb")},"445f":function(t,e,n){"use strict";var o=n("76b6"),i=n.n(o);i.a},"76b6":function(t,e,n){},"94fb":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"content"},[t.showCoupon?n("div",[n("ul",t._l(t.list,function(e,o){return n("li",{key:e.coupon_batch_id},[n("CouponItem",{staticClass:"coupon_item",attrs:{index:o,item:e},on:{onChangeSelectStatus:t.onChangeSelectStatus,onChangDetailedStatus:t.onChangDetailedStatus}})],1)}),0)]):t._e(),t.noneCouponDataStatus?n("div",{staticClass:"without_data"},[t._m(0)]):t._e()]),t.noneCouponDataStatus?t._e():n("div",{staticClass:"footer"},[n("div",{staticClass:"footer-left"},[n("div",{staticClass:"footer-left-space"}),n("div",{staticClass:"footer-left-selected-tips"},[n("span",[t._v("已选择："),n("span",{staticStyle:{color:"#ff003c"}},[t._v(t._s(t.selectedAmount))]),t._v(" 张")])]),t.is_limit?n("div",{staticClass:"footer-left-surplus-tips"},[n("span",[t._v("今日剩余可派：")]),n("span",{staticStyle:{color:"#5cc9c2"}},[t._v(t._s(t.residual_dispensable_num)+"张")])]):t._e(),n("div",{staticClass:"footer-left-space"})]),n("div",{staticClass:"footer-right q-1px-t"},[t.isAbleDispatchCoupon?n("div",{staticClass:"able-dispatch",on:{click:t.onDispatchCouupon}},[t._v("\n\t\t\t\t\t派券\n\t\t\t\t")]):n("div",{staticClass:"forbid-dispatch"},[t._v("\n\t\t\t\t\t超过当日上限\n\t\t\t\t")])])]),n("DispatchCouponConfirm",{attrs:{showDialog:t.showDialog,is_limit:t.is_limit,residual_dispensable_num:t.residual_dispensable_num},on:{onDialogCancel:t.onDialogCancel,onDialogEnter:t.onDialogEnter}})],1)},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"none-coupon-able-dispatch"},[n("i"),t._v("\n\t\t\t\t\t暂无可派送卡券\n\t\t\t\t")])}],a=(n("a481"),n("ac6a"),n("15b8")),r=n.n(a),u=n("cebc"),c=n("a3d3"),l=n("adb5"),p=n("21f4"),d=n("b2eb"),f="",h="",_="",v=function(t){var e=c["a"].getParam();h=e.user_id,f=e.detail.phone,_=p["a"].getUUID(),t&&t()},C=function(){window.api.closeWin(),d["a"].publish("customDispatchCouponSuccess")},b={getCoupon:{baseInfo:{url:"/app/auth/crm/coupon/getCouponlist.do",api_versions:"v1"},getParams:function(t){return Object(u["a"])({user_id:h},t)}},dispatchCoupon:{baseInfo:{url:"/app/auth/crm/coupon/distributeCoupon.do",api_versions:"v1"},getParams:function(t){return Object(u["a"])({},t,{couponVo_list:[{phone:f,user_id:h}],uuid:_})}},getCouponDetail:{baseInfo:{url:"/app/auth/crm/coupon/getCouponDetail.do",api_versions:"v1"},getParams:function(t){return Object(u["a"])({},t)}}},m=function(t,e){for(var n in e)t[n]=e[n];return t},g=function(t){var e=t.type,n=t.success,o=t.error,i=t.param,s={};m(s,b[e].getParams(i));var a={};m(a,b[e].baseInfo),a.data=s,a.success=n,a.error=o,l["a"].ajax(a)},D={app:c["a"],init:v,requestInterface:g,dispatchCouponSuccess:C},S=r()(D),w=n("0cf5"),y=n("b828"),I={name:"",components:{CouponItem:w["a"],DispatchCouponConfirm:y["a"]},created:function(){var t=this;S.init(function(){t.list=[],t.getCoupon()})},mounted:function(){},data:function(){return{list:[{count_rule_operation:"AMOUNT",count_rule_operation_val:0,coupon_title:"",use_rule_val:"",condition:"",goodScope:"商品1、商品2",scope:"部分门店、商城",explain:"新客专用",is_receive:!0,reason_of_unreceive:"",selected:!0,isSpread:!0}],showDialog:!1,tipType:!1,currentCouponId:-1,currentIndex:-1,noneCouponDataStatus:!1,showCoupon:!0,is_dispensable:!1,is_limit:!1,limit_num:0,residual_dispensable_num:0}},computed:{selectedList:function(){for(var t=[],e=0;e<this.list.length;e++)this.list[e].selected&&t.push(this.list[e]);return t},selectedAmount:function(){return this.selectedList.length},isAbleDispatchCoupon:function(){var t=!0;return this.is_limit&&(this.selectedAmount>this.residual_dispensable_num||0===this.residual_dispensable_num)&&(t=!1),t}},methods:{onDispatchCouupon:function(){if(0===this.selectedList.length)return S.app.toast("请先选择卡券",{location:"center"});this.showDialog=!0},onChangDetailedStatus:function(t,e){var n=this;if(!e.isSpread&&!e.isCache)return this.currentCouponId=e.coupon_batch_id,this.currentIndex=t,void S.requestInterface({type:"getCouponDetail",success:function(t){t.success&&t.object&&(n.handleCouponDetail(t.object),n.list[n.currentIndex].isSpread=!0,n.list[n.currentIndex].isCache=!0)},error:function(t){},param:{coupon_batch_id:this.currentCouponId}});e.isSpread=!e.isSpread},onChangeSelectStatus:function(t){t.is_receive&&(t.selected=!t.selected)},onDialogCancel:function(){this.showDialog=!1},onDialogEnter:function(){S.requestInterface({type:"dispatchCoupon",success:function(t){t.success&&S.dispatchCouponSuccess()},error:function(t){},param:{coupon_batch_id:this.getCouponID()}}),this.showDialog=!1},getCouponID:function(){var t=[];return this.list.forEach(function(e){if(e.selected)return t.push(e.coupon_batch_id)}),t},getCoupon:function(){var t=this;S.requestInterface({type:"getCoupon",success:function(e){e.success&&e.object&&(t.handleCouponDispatchStatus(e.object),t.handleCouponData(e.object.couponBatchQueryResultToAppVo))},error:function(t){},param:{}})},handleCouponDispatchStatus:function(t){for(var e=["is_dispensable","is_limit","limit_num","residual_dispensable_num"],n=0;n<e.length;n++){var o=e[n];this[o]=t[o]}},handleCouponData:function(t){var e=this;if(!t||!t.count)return this.showCoupon=!1,void(this.noneCouponDataStatus=!0);t.detailList.forEach(function(t){t.goodScope="",t.scope="",t.explain="",t.condition="",t.selected=!1,t.isSpread=!1,e.handleCouponUseCondition(t)}),this.list=t.detailList},handleCouponUseCondition:function(t){"LIBERTY"===t.count_rule_condition?t.condition="满0元可用":"QUOTA"===t.count_rule_condition&&(t.condition="满"+t.count_rule_condition_val/100+"元可用")},handleCouponDetail:function(t){var e=t.store_products_name||"",n=t.shop_products_name||"";this.list[this.currentIndex].goodScope=e+"、"+n;var o=t.stores_name_for_app||"",i=t.shops_name_brief||"";this.list[this.currentIndex].scope=o+"、"+i,this.list[this.currentIndex].explain=t.remark}},filters:{clearSign:function(t){if(!t)return"";var e=/^、|、$/g;return t.replace(e,"")}}},x=I,j=(n("445f"),n("2877")),O=Object(j["a"])(x,i,s,!1,null,"0585a1c6",null),P=O.exports,E=n("d8ac");o["a"].config.productionTip=!1,E["a"].start(o["a"]),window.EventBus=new o["a"],window.isPc()?(console.log("pc"),new o["a"]({render:function(t){return t(P)},data:{Bus:new o["a"]}}).$mount("#app")):(console.log("移动端"),window.apiready=function(){new o["a"]({render:function(t){return t(P)}}).$mount("#app")})}});