(function(t){function e(e){for(var s,o,r=e[0],l=e[1],u=e[2],m=0,d=[];m<r.length;m++)o=r[m],n[o]&&d.push(n[o][0]),n[o]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);c&&c(e);while(d.length)d.shift()();return i.push.apply(i,u||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],s=!0,r=1;r<a.length;r++){var l=a[r];0!==n[l]&&(s=!1)}s&&(i.splice(e--,1),t=o(o.s=a[0]))}return t}var s={},n={shop_estimate_royalty:0},i=[];function o(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=s,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(a,s,function(e){return t[e]}.bind(null,s));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var u=0;u<r.length;u++)e(r[u]);var c=l;i.push([15,"chunk-vendors","chunk-common"]),a()})({15:function(t,e,a){t.exports=a("99f7")},"51da":function(t,e,a){"use strict";var s=a("627e"),n=a.n(s);n.a},"627e":function(t,e,a){},"7c50":function(t,e,a){"use strict";var s=a("c1c2"),n=a.n(s);n.a},"99f7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var s=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("LoadMore",{ref:"scroll",staticClass:"load_more",on:{loadmore:t.getData}},[t.estimateRoyalty.length?a("div",{staticClass:"content"},[a("EstimateMsg",{attrs:{item:t.estimateMsg}}),a("List",{attrs:{list:t.estimateRoyalty},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.item,n=e.index;return[a("EstimateRoyalty",{class:n===t.estimateRoyalty.length-1?"":"q-1px-b",attrs:{item:s,index:n},nativeOn:{click:function(e){return t.openPage(s)}}})]}}],null,!1,818897694)})],1):a("withoutData",{directives:[{name:"show",rawName:"v-show",value:t.status,expression:"status"}],attrs:{status:t.status}})],1)],1)},i=[],o=a("f499"),r=a.n(o),l=a("a3d3"),u=a("b2eb"),c=(a("2b61"),a("6abe")),m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"details"},[a("div",{staticClass:"img"}),a("div",{staticClass:"detailBox"},[a("div",{staticClass:"top"},[a("div",{staticClass:"goods_name"},[t._v(t._s(t.item.goods_name))]),a("span",{staticClass:"money"},[t._v("+ "+t._s(t._f("trans-price")(t.item.money)))])]),a("div",{staticClass:"bottom"},[a("span",{staticClass:"left"},[a("span",[t._v(t._s(t.item.weight))]),a("span",{staticClass:"time"},[t._v(t._s(t._f("dataFormat")(t.item.detail_time,"MM月dd日 hh:mm")))])]),a("span",{staticClass:"remain_label"},[t._v(t._s(t.item.remain_label)+" "+t._s(t._f("trans-price")(t.item.remain_money)))])])])])},d=[],p={name:"EstimateRoyalty",props:{item:{type:Object,default:function(){return{goods_name:"",money:"",weight:"",detail_time:"",remain_label:"",remain_money:""}}}},data:function(){return{unRead:!0}},mounted:function(){},created:function(){},methods:{}},f=p,_=(a("51da"),a("2877")),y=Object(_["a"])(f,m,d,!1,null,"78045b9a",null),v=y.exports,g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"time"},[t._v(t._s(t._f("dataFormat")(t.item.time,"yyyy年MM月")))]),a("div",{staticClass:"estimate"},[a("span",{staticClass:"label"},[t._v(t._s(t.item.item_label))]),a("span",{staticClass:"value"},[t._v("￥"+t._s(t._f("trans-price")(t.item.royalty)))]),a("span",{staticClass:"label"},[t._v(t._s(t.item.item_num))]),a("span",{staticClass:"value"},[t._v(t._s(t.item.sales))])])])},h=[],b={name:"EstimateMsg",props:{item:{type:Object,default:function(){return{time:"",item_label:"",royalty:"",item_num:"",sales:""}}}},data:function(){return{}},mounted:function(){},created:function(){},methods:{chooseItem:function(t,e){console.log(r()(t)+e)}}},w=b,M=(a("7c50"),Object(_["a"])(w,g,h,!1,null,"75fa9b97",null)),R=M.exports,x=a("2e39"),O=a("2d44"),C=(a("ac6a"),a("adb5")),j={openPage:function(t,e){l["a"].openView("views/shop/group_order",{param:{index:t,order_no:e.order_no,group_shopping_order_no:e.group_shopping_order_no,settle_status:e.settle_status},customNavigationBar:{url:"views/shop/group_order/header_frame"}})},getData:function(t){var e=this,a=t.data,s="/app/auth/shop/getRoyaltyOrder.do";C["a"].ajax({data:a,url:s,success:function(a){var s=a.object;t.success&&t.success(e.transList(s))},error:function(){t.error&&t.error()}})},transList:function(t){var e={estimateRoyalty:[],estimateMsg:{time:this.time,item_label:"预估提成",royalty:t.sum_kpi_value,item_num:"销量",sales:t.sum_sales_num},type:""};return e.type=t.type,null==t.guideKpiOrderVOs?(e.estimateRoyalty=[],e.estimateMsg={},e):(t.guideKpiOrderVOs.forEach(function(t){var a={goods_name:t.goods_name,money:t.kpi_value,weight:t.sku_name,detail_time:t.create_time,remain_label:"结余",remain_money:t.balance_value,order_no:t.order_no,group_shopping_order_no:t.group_shopping_order_no,settle_status:t.settle_status};e.estimateRoyalty.push(a)}),e)},month:function(){this.time=new Date}},P={name:"estimate_royalty",components:{EstimateMsg:R,List:c["a"],EstimateRoyalty:v,withoutData:x["a"],LoadMore:O["a"]},data:function(){return{status:"without_data",page:1,val:"",idx:0,estimateMsg:{},estimateRoyalty:[]}},created:function(){var t=this;j.month();var e=l["a"].getParam();t.val=0==e.idx?"PT":"NORMAL",t.page=1,t.estimateRoyalty=[],t.estimateMsg={},t.getData(t.val)},mounted:function(){var t=this,e=this;u["a"].subscribe("getValue",function(a){e.val=a.value,e.idx="PT"===a.value?0:1,e.page=1,e.estimateRoyalty=[],e.estimateMsg={},e.getData(),t.$refs.scroll.init()}),l["a"].startRefresh({callback:function(){e.page=1,e.estimateRoyalty=[],e.estimateMsg={},e.getData(e.val,function(){l["a"].stopRefresh()})}})},methods:{getData:function(t,e){var a=this,s=this,n=10;j.getData({data:{type:s.val,page:s.page,size:n},success:function(t){s.val=t.type,s.idx="PT"==s.val?0:1,s.estimateRoyalty=t.estimateRoyalty,s.estimateMsg=t.estimateMsg,console.log("预估提成返回"+r()(t)),t.estimateRoyalty&&t.estimateRoyalty.length===n?a.$refs.scroll.loaded():a.$refs.scroll.complete(),s.page+=1},error:function(t){a.$refs.scroll.loaded()}})},openPage:function(t){var e=this;j.openPage(e.idx,t)}}},E=P,k=(a("a6d7"),Object(_["a"])(E,n,i,!1,null,"423e0232",null)),D=k.exports,$=a("d8ac");s["a"].config.productionTip=!1,$["a"].start(s["a"]),window.EventBus=new s["a"],window.isPc()?(console.log("pc"),new s["a"]({render:function(t){return t(D)},data:{Bus:new s["a"]}}).$mount("#app")):(console.log("移动端"),window.apiready=function(){new s["a"]({render:function(t){return t(D)}}).$mount("#app")})},a6d7:function(t,e,a){"use strict";var s=a("f295"),n=a.n(s);n.a},c1c2:function(t,e,a){},f295:function(t,e,a){}});