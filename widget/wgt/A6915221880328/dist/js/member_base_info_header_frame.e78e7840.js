(function(e){function t(t){for(var r,i,c=t[0],u=t[1],s=t[2],l=0,f=[];l<c.length;l++)i=c[l],o[i]&&f.push(o[i][0]),o[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(t);while(f.length)f.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,c=1;c<n.length;c++){var u=n[c];0!==o[u]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={member_base_info_header_frame:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var d=u;a.push([14,"chunk-vendors","chunk-common"]),n()})({14:function(e,t,n){e.exports=n("a650")},6529:function(e,t,n){"use strict";var r=n("c44a"),o=n.n(r);o.a},a650:function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{ref:"header",attrs:{id:"app"}},[r("div",{staticClass:"header",style:e.styleObject},[r("div",{staticClass:"left",on:{click:e.back}},[r("img",{attrs:{src:n("d133")}})]),r("div",{staticClass:"content"},[r("span",[e._v(e._s(e.title))])]),r("div",{staticClass:"right",on:{click:function(t){return e.goForEditMember()}}},[r("span",[e._v("编辑")])])])])},a=[],i=n("a3d3"),c={name:"add_member_header_frame",components:{},data:function(){return{styleObject:{},title:"基本信息",height:100,idx:0,top:0,user_id:null}},created:function(){},mounted:function(){var e=this,t=i["a"].fixStatusBar(this.$refs.header),n=i["a"].getParam();n.top=t,n.animation={type:"none"},this.user_id=n.user_id,this.frameName=i["a"].openPopover(n),this.$nextTick(function(){e.styleObject=n.customNavigationBar.style||{}})},computed:{},methods:{back:function(){i["a"].close()},goForEditMember:function(){i["a"].openView("views/member/add_member",{param:{bounces:!1,type:"edit",user_id:this.user_id},customNavigationBar:{style:{background:"#4cbdbe",color:"#fff"},url:"views/member/add_member/header_frame"}})}}},u=c,s=(n("6529"),n("2877")),d=Object(s["a"])(u,o,a,!1,null,"b18b764e",null),l=d.exports,f=n("d8ac");r["a"].config.productionTip=!1,f["a"].start(r["a"]),window.EventBus=new r["a"],window.isPc()?(console.log("pc"),new r["a"]({render:function(e){return e(l)},data:{Bus:new r["a"]}}).$mount("#app")):(console.log("移动端"),window.apiready=function(){new r["a"]({render:function(e){return e(l)}}).$mount("#app")})},c44a:function(e,t,n){}});