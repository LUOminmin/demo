(function(e){function n(n){for(var o,i,c=n[0],u=n[1],s=n[2],l=0,p=[];l<c.length;l++)i=c[l],r[i]&&p.push(r[i][0]),r[i]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);f&&f(n);while(p.length)p.shift()();return a.push.apply(a,s||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],o=!0,c=1;c<t.length;c++){var u=t[c];0!==r[u]&&(o=!1)}o&&(a.splice(n--,1),e=i(i.s=t[0]))}return e}var o={},r={root:0},a=[];function i(n){if(o[n])return o[n].exports;var t=o[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=o,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)i.d(t,o,function(n){return e[n]}.bind(null,o));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=n,c=c.slice();for(var s=0;s<c.length;s++)n(c[s]);var f=u;a.push([50,"chunk-vendors","chunk-common"]),t()})({"1d38":function(e,n,t){e.exports=t.p+"img/loading.12fac574.gif"},50:function(e,n,t){e.exports=t("c5f0")},c4a7:function(e,n,t){"use strict";var o=t("e03d"),r=t.n(o);r.a},c5f0:function(e,n,t){"use strict";t.r(n);var o=t("f499"),r=t.n(o),a=(t("cadf"),t("551c"),t("f751"),t("097d"),t("2b0e")),i=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},c=[function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",{attrs:{id:"app"}},[o("img",{attrs:{src:t("1d38")}})])}],u={name:"root",created:function(){console.log("进入root页面")},mounted:function(){},data:function(){return{}}},s=u,f=(t("c4a7"),t("2877")),l=Object(f["a"])(s,i,c,!1,null,"fd915eb4",null),p=l.exports,d=t("a3d3"),v=t("2b61"),g=t("adb5"),w=t("0a0e"),m={getPermission:function(e){var n=v["a"].val("UserInfo")||{},t={staffId:n.user_id},o="/app/auth/suc/listRoleMenu.do";g["a"].ajax({skipToast:!0,url:o,data:t,success:function(n){console.log("权限请求成功"+r()(n));var t=n.object||{},o=t.menuList||[];Object(w["d"])(o),e&&e(n)}})}},h=!0;a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(p)},data:{Bus:new a["a"]}}).$mount("#app"),window.apiready=function(){d["a"].addEventListener({name:"viewappear"},function(){console.log("windows "+r()(window.api.windows())),h||d["a"].closeWidget()}),d["a"].addEventListener({name:"viewdisappear"},function(){console.log("windows viewdisappear "+r()(window.api.windows())),h=!1});var e=d["a"].getWgtParam();console.log("root wgtParam "+r()(e));var n=e.pageParam||{},t=n.staffInfo||v["a"].val("GuideStaffInfo")||{};if(/views\/shop\/index/gi.test(e.path)&&!t.identification_code)return n.path=e.path,void d["a"].openView("views/shop/store_select",{param:{staffInfo:t},customNavigationBar:{title:"选择门店"}});console.log("root permission"),m.getPermission(function(){console.log("root success"),e.path?d["a"].openView(e.path,n):d["a"].alert("参数为空，打开子应用失败",function(){d["a"].closeWidget()})})}},e03d:function(e,n,t){}});