(function(e){function t(t){for(var a,i,c=t[0],s=t[1],u=t[2],f=0,d=[];f<c.length;f++)i=c[f],r[i]&&d.push(r[i][0]),r[i]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);l&&l(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,c=1;c<n.length;c++){var s=n[c];0!==r[s]&&(a=!1)}a&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},r={shop_estimate_royalty_header_frame:0},o=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=s;o.push([14,"chunk-vendors","chunk-common"]),n()})({14:function(e,t,n){e.exports=n("31fb")},2500:function(e,t,n){"use strict";var a=n("781e"),r=n.n(a);r.a},"31fb":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"header",attrs:{id:"app"}},[a("div",{staticClass:"header",style:e.styleObject},[a("div",{staticClass:"left",on:{click:e.back}},[a("img",{attrs:{src:n("6154")}})]),a("div",{staticClass:"content"},[a("span",[e._v(e._s(e.title))])]),a("div",{staticClass:"right"})]),a("SelectTab",{staticClass:"tab",attrs:{tabs:e.tabs,index:e.idx,height:e.height},on:{selected:e.tabSelected}})],1)},o=[],i=n("a3d3"),c=n("b2eb"),s=n("fc32"),u={name:"group_order_frame",components:{SelectTab:s["a"]},data:function(){return{frameName:"",styleObject:{},title:"预估提成明细",height:100,isGroup:!0,idx:0,tabs:[{name:"拼团商品",value:"PT"},{name:"普通商品",value:"NORMAL"}]}},created:function(){var e=this,t=i["a"].getParam();e.idx=t.idx},mounted:function(){var e=this,t=i["a"].fixStatusBar(this.$refs.header),n=i["a"].getParam();n.top=t,this.frameName=i["a"].openPopover(n),this.$nextTick(function(){e.styleObject=n.customNavigationBar.style||{}})},methods:{back:function(){i["a"].close()},choose:function(){},tabSelected:function(e){var t=this;t.val=e,console.log("tab值"+t.val),c["a"].publish("getValue",{value:e})}}},l=u,f=(n("2500"),n("2877")),d=Object(f["a"])(l,r,o,!1,null,"5467cb56",null),p=d.exports,b=n("d8ac");a["a"].config.productionTip=!1,b["a"].start(a["a"]),window.EventBus=new a["a"],window.isPc()?(console.log("pc"),new a["a"]({render:function(e){return e(p)},data:{Bus:new a["a"]}}).$mount("#app")):(console.log("移动端"),window.apiready=function(){new a["a"]({render:function(e){return e(p)}}).$mount("#app")})},"781e":function(e,t,n){}});