(function(e){function t(t){for(var o,c,i=t[0],u=t[1],s=t[2],f=0,p=[];f<i.length;f++)c=i[f],r[c]&&p.push(r[c][0]),r[c]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);l&&l(t);while(p.length)p.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,i=1;i<n.length;i++){var u=n[i];0!==r[u]&&(o=!1)}o&&(a.splice(t--,1),e=c(c.s=n[0]))}return e}var o={},r={shop_message_notice_bonus:0},a=[];function c(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=o,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(n,o,function(t){return e[t]}.bind(null,o));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var l=u;a.push([64,"chunk-vendors","chunk-common"]),n()})({"15cc":function(e,t,n){"use strict";var o=n("acc1"),r=n.n(o);r.a},64:function(e,t,n){e.exports=n("b4f9")},acc1:function(e,t,n){},b4f9:function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"title"},[e._v("消息中心")]),n("MessageNotice",{attrs:{messageItem:e.messageItem}})],1)},a=[],c=n("e0ba"),i=n("a3d3"),u={gotoStore:function(){console.log("goto A20190226"),i["a"].openWidget("A20190226","views/order")}},s={name:"message_notice_bonus",components:{MessageNotice:c["a"]},created:function(){},mounted:function(){},data:function(){return{messageItem:[{mess_title:"您有一个新的提成订单",time_label:"订单时间",item_label:"会员名称",phone_label:"手机号码",goods_label:"订单商品",order_time:1552218489118,item_mess:"贺鸿波",member_phone:"18680494735",order_goods:"雅培（Abbott）铂优恩美力幼儿配方奶粉3段900克新老包装随机发货"}]}},methods:{goBack:function(){u.gotoStore()}}},l=s,f=(n("15cc"),n("2877")),p=Object(f["a"])(l,r,a,!1,null,"9c7150aa",null),d=p.exports,b=n("d8ac");o["a"].config.productionTip=!1,b["a"].start(o["a"]),window.EventBus=new o["a"],window.isPc()?(console.log("pc"),new o["a"]({render:function(e){return e(d)},data:{Bus:new o["a"]}}).$mount("#app")):(console.log("移动端"),window.apiready=function(){new o["a"]({render:function(e){return e(d)}}).$mount("#app")})}});