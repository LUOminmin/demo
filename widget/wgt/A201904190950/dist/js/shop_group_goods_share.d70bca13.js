(function(t){function e(e){for(var r,s,i=e[0],c=e[1],d=e[2],l=0,p=[];l<i.length;l++)s=i[l],a[s]&&p.push(a[s][0]),a[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(p.length)p.shift()();return n.push.apply(n,d||[]),o()}function o(){for(var t,e=0;e<n.length;e++){for(var o=n[e],r=!0,i=1;i<o.length;i++){var c=o[i];0!==a[c]&&(r=!1)}r&&(n.splice(e--,1),t=s(s.s=o[0]))}return t}var r={},a={shop_group_goods_share:0},n=[];function s(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=r,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(o,r,function(e){return t[e]}.bind(null,r));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var d=0;d<i.length;d++)e(i[d]);var u=c;n.push([20,"chunk-vendors","chunk-common"]),o()})({20:function(t,e,o){t.exports=o("d6cb")},"4cc0":function(t,e,o){t.exports=o.p+"img/group_share.90ae5e0e.png"},a868:function(t,e,o){t.exports=o.p+"img/group_bg.cd988497.png"},b0b2:function(t,e,o){},d6cb:function(t,e,o){"use strict";o.r(e);o("cadf"),o("551c"),o("f751"),o("097d");var r=o("2b0e"),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("div",{staticClass:"share_goods share_div",attrs:{id:"share_div"}},[r("div",{staticClass:"goods_picture"},[r("img",{staticClass:"goods-pic",attrs:{src:t.goods.goodsPicture}})]),r("div",{staticClass:"group_goods"},[r("div",{staticClass:"group_act_people"},[r("span",[t._v(t._s(t.goods.groupPeople)+"人团")])]),r("img",{staticClass:"group_bg",attrs:{src:o("a868")}}),r("div",{staticClass:"group_act_detail"},[r("div",{staticClass:"group_price"},[r("div",{staticClass:"final_price"},[r("label",[t._v("￥")]),t._v(t._s(t._f("trans-price-int")(t.goods.groupPrice))+"."),r("label",[t._v(t._s(t._f("trans-price-after")(t.goods.groupPrice)))])]),r("div",{staticClass:"normal_price"},[r("span",{staticClass:"text-dec"},[t._v("原价:"+t._s(t._f("trans-price")(t.goods.price)))])])]),t._m(0)])]),r("div",{staticClass:"goods_qr_code"},[r("QrCode",{attrs:{data:t.goods}},[[r("div",{staticClass:"detail_title q-1px-t"},[r("p",{staticClass:"title"},[t._v(t._s(t.tips))])])]],2)],1)]),r("div",{staticClass:"share_button"},[r("ShareButton",{attrs:{data:t.shareButton},on:{onClick:t.getQrCode}})],1)])},n=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"group_share_png"},[r("img",{attrs:{src:o("4cc0")}})])}],s=(o("28a5"),o("adb5")),i=o("a3d3"),c=o("2b61"),d=o("dc86"),u={getPageParam:function(t){var e=i["a"].getParam().goods||{},r={groupPeople:e.groupPeopleAmount,groupPrice:e.groupShoppingPrice,actId:e.actId,goodsId:e.goodsId,skuId:"",guideGoodsId:"1",name:e.title,price:e.normalPrice,goodsPicture:e.imgUrl,qrCodeUrl:o("55ed")};t.cb&&t.cb(r)},getQrCode:function(t,e,o){var r=c["a"].val("GuideStaffInfo")||{};if(r){var a={goods_id:e.goodsId,sku_id:e.skuId,guide_goods_id:"",act_type:3,act_detail:"000001",act_carrier:"1",channel:1,carrier:"1",act_id:e.actId},n="/app/auth/shop/getGuideGroupGoodsShare.do";a.channel="session"==t?1:"timeline"==t?2:3,s["a"].ajax({url:n,data:a,api_versions:"v2",success:function(t){var e=t.object;o&&o(e)},error:function(t){i["a"].toast(t.msg)}})}else i["a"].toast("获取导购信息失败")},share:function(t){d["a"].share(t)}},l=o("9da2"),p=o("2c83"),g={name:"group_goods_share",components:{QrCode:l["a"],ShareButton:p["a"]},data:function(){return{shareButton:[{name:"微信好友",value:"session",url:o("42d6")},{name:"朋友圈",value:"timeline",url:o("5c59")}],invalidQrCodeUrl:o("55ed"),goods:{},textArr:["精选好货，火热拼团中，手慢无！","精选好货，即将开团！"],tips:""}},created:function(){this.getPageParam()},mounted:function(){},methods:{getPageParam:function(){var t=this,e=i["a"].getParam()||{};e.type=e.type||0,this.tips=this.textArr[e.type],u.getPageParam({cb:function(e){t.goods=e}})},getQrCode:function(t){var e=this;u.getQrCode(t,e.goods,function(o){if(o){var r=o.split("?");e.goods.qrCodeUrl=r[0],e.share({channel:t,id:"share_div",cb:function(){console.log(e.goods.qrCodeUrl),e.goods.qrCodeUrl=e.invalidQrCodeUrl}})}})},share:function(t){u.share(t)}}},f=g,_=(o("df17"),o("2877")),v=Object(_["a"])(f,a,n,!1,null,"3a50d377",null),h=v.exports,m=o("d8ac");r["a"].config.productionTip=!1,m["a"].start(r["a"]),window.EventBus=new r["a"],window.isPc()?(console.log("pc"),new r["a"]({render:function(t){return t(h)},data:{Bus:new r["a"]}}).$mount("#app")):(console.log("移动端"),window.apiready=function(){new r["a"]({render:function(t){return t(h)}}).$mount("#app")})},df17:function(t,e,o){"use strict";var r=o("b0b2"),a=o.n(r);a.a}});