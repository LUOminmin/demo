(function(e){function t(t){for(var n,i,s=t[0],u=t[1],c=t[2],p=0,f=[];p<s.length;p++)i=s[p],r[i]&&f.push(r[i][0]),r[i]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);l&&l(t);while(f.length)f.shift()();return a.push.apply(a,c||[]),o()}function o(){for(var e,t=0;t<a.length;t++){for(var o=a[t],n=!0,s=1;s<o.length;s++){var u=o[s];0!==r[u]&&(n=!1)}n&&(a.splice(t--,1),e=i(i.s=o[0]))}return e}var n={},r={shop_message_notice_group:0},a=[];function i(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=n,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(o,n,function(t){return e[t]}.bind(null,n));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var l=u;a.push([28,"chunk-vendors","chunk-common"]),o()})({28:function(e,t,o){e.exports=o("b898")},a90a:function(e,t,o){"use strict";var n=o("d982"),r=o.n(n);r.a},b898:function(e,t,o){"use strict";o.r(t);o("cadf"),o("551c"),o("f751"),o("097d");var n=o("2b0e"),r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("div",{staticClass:"title"},[e._v("消息中心")]),o("MessageNotice",{attrs:{messageItem:e.messageItem},on:{click:e.goForGroupDetails}})],1)},a=[],i=o("e0ba"),s=o("a3d3"),u={gotoStore:function(){console.log("goto A20190226"),s["a"].openWidget("A20190226","views/order")},goForGroupDetails:function(){s["a"].openView("views/shop/message_notice_group")}},c={name:"message_notice_bonus",components:{MessageNotice:i["a"]},created:function(){},mounted:function(){},data:function(){return{messageItem:[{mess_title:"拼团成功提醒",time_label:"拼团时间",item_label:"拼团编号",phone_label:"团长手机",goods_label:"拼团商品",order_time:1552218489118,item_mess:"PTO155074116449845814 ",member_phone:"18680494735",order_goods:"雅培（Abbott）铂优恩美力幼儿配方奶粉3段900克新老包装随机发货"},{mess_title:"拼团成功提醒",time_label:"拼团时间",item_label:"拼团编号",phone_label:"团长手机",goods_label:"拼团商品",order_time:1552218489118,item_mess:"PTO155074116449845814 ",member_phone:"18680494735",order_goods:"雅培（Abbott）铂优恩美力幼儿配方奶粉3段900克新老包装随机发货"}]}},methods:{goBack:function(){u.gotoStore()},goForGroupDetails:function(){u.goForGroupDetails()}}},l=c,p=(o("a90a"),o("2877")),f=Object(p["a"])(l,r,a,!1,null,"e9fb19f8",null),d=f.exports,m=o("d8ac");n["a"].config.productionTip=!1,m["a"].start(n["a"]),window.EventBus=new n["a"],window.isPc()?(console.log("pc"),new n["a"]({render:function(e){return e(d)},data:{Bus:new n["a"]}}).$mount("#app")):(console.log("移动端"),window.apiready=function(){new n["a"]({render:function(e){return e(d)}}).$mount("#app")})},d982:function(e,t,o){}});