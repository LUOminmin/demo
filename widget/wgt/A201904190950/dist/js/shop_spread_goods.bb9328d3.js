(function(o){function e(e){for(var s,r,i=e[0],c=e[1],d=e[2],l=0,p=[];l<i.length;l++)r=i[l],a[r]&&p.push(a[r][0]),a[r]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(o[s]=c[s]);u&&u(e);while(p.length)p.shift()();return n.push.apply(n,d||[]),t()}function t(){for(var o,e=0;e<n.length;e++){for(var t=n[e],s=!0,i=1;i<t.length;i++){var c=t[i];0!==a[c]&&(s=!1)}s&&(n.splice(e--,1),o=r(r.s=t[0]))}return o}var s={},a={shop_spread_goods:0},n=[];function r(e){if(s[e])return s[e].exports;var t=s[e]={i:e,l:!1,exports:{}};return o[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=o,r.c=s,r.d=function(o,e,t){r.o(o,e)||Object.defineProperty(o,e,{enumerable:!0,get:t})},r.r=function(o){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})},r.t=function(o,e){if(1&e&&(o=r(o)),8&e)return o;if(4&e&&"object"===typeof o&&o&&o.__esModule)return o;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:o}),2&e&&"string"!=typeof o)for(var s in o)r.d(t,s,function(e){return o[e]}.bind(null,s));return t},r.n=function(o){var e=o&&o.__esModule?function(){return o["default"]}:function(){return o};return r.d(e,"a",e),e},r.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},r.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var d=0;d<i.length;d++)e(i[d]);var u=c;n.push([32,"chunk-vendors","chunk-common"]),t()})({32:function(o,e,t){o.exports=t("e15e")},b005:function(o,e,t){},e15e:function(o,e,t){"use strict";t.r(e);t("cadf"),t("551c"),t("f751"),t("097d");var s=t("2b0e"),a=function(){var o=this,e=o.$createElement,s=o._self._c||e;return s("div",{directives:[{name:"show",rawName:"v-show",value:o.isShow,expression:"isShow"}],attrs:{id:"app"}},[s("goods-banner",{attrs:{imgPaths:o.imgPaths}}),o.isCoupon?o._e():s("div",{staticClass:"spread_goods_price"},[s("div",{staticClass:"goods_price q-1px-b"},[s("span",{staticClass:"price_sale"},[o._v("￥"+o._s(o._f("trans-price")(o.defaultPrice.sellSkuPrice)))]),s("span",{staticClass:"price_original"},[o._v("￥"+o._s(o._f("trans-price")(o.defaultPrice.goodSkuPrice)))])])]),o.isCoupon?s("div",{staticClass:"spread_coupon_price"},[s("div",{staticClass:"coupon_price_show"},[s("span",{staticClass:"price_symbol"},[o._v("￥")]),o._v(o._s(o._f("trans-price-minZero")(o.defaultPrice.sellSkuPrice-o.goodsInfo.couponBatchVo.count_rule_operation_val))+"\n            "),s("span",{staticClass:"price_sale"},[o._v("￥"+o._s(o._f("trans-price")(o.defaultPrice.sellSkuPrice)))])]),s("div",{staticClass:"coupon_value"},[s("span",{staticClass:"coupon_detail"},[o._v("优惠券"+o._s(o._f("trans-price")(o.goodsInfo.couponBatchVo.count_rule_operation_val))+"元")])]),o._m(0)]):o._e(),s("GoodsName",{attrs:{title:o.goodsInfo.goods_name}}),o.isCoupon?s("div",{staticClass:"spread_coupon_time q-1px-t"},[o._v("\n        领券时间 "+o._s(o._f("dataFormat")(o.goodsInfo.couponBatchVo.receive_start_date_time,"yyyy-MM-dd"))+" — "+o._s(o._f("dataFormat")(o.goodsInfo.couponBatchVo.receive_end_date_time,"yyyy-MM-dd"))+"\n    ")]):o._e(),s("div",{staticClass:"goods_sku",on:{click:o.openSku}},[s("span",[o._v("规格")]),s("div",[s("span",{staticClass:"sku_value"},[o._v(o._s(o.defaultPrice.goods_attr_value_remark))]),s("img",{staticClass:"more_img",attrs:{src:t("e75e")}})])]),s("goods-count",{attrs:{shareData:o.shareData}}),s("goods-desc",{attrs:{descdata:o.goodsInfo.detail}}),s("ShareGoods",{attrs:{isActive:o.isShare,goodsData:o.goodsInfo,isGroup:!1,shareText:o.shareText}})],1)},n=[function(){var o=this,e=o.$createElement,t=o._self._c||e;return t("div",{staticClass:"price_discount"},[t("div",{staticClass:"discount_txt"},[o._v("券后价")])])}],r=t("a4bb"),i=t.n(r),c=t("f499"),d=t.n(c),u=t("38dd"),l=t("bb87"),p=t("2cac"),f=t("ce64"),g=t("0e90"),v=t("5dc5"),_=t("a3d3");t("5176"),t("6b54"),t("2b61"),t("c5f6"),t("28a5");var h={name:"spread_goods",components:{GoodsBanner:u["a"],GoodsName:p["a"],GoodsCount:f["a"],ShareGoods:g["a"],GoodsDesc:l["a"]},mounted:function(){var o=this;window.api.addEventListener({name:"selectedSku"},function(e,t){e.value&&(console.log(d()(o.defaultPrice)),o.defaultPrice=e.value.selectedSku,o.goodsInfo.defaultPrice=e.value.selectedSku,console.log(d()(o.defaultPrice)))}),this.getNormalGoodsInfo()},computed:{},data:function(){return{shareData:{sumSharer:{key:"sumSharer",text:"分享数",value:0,isActive:!1,ind:1},sumVistor:{key:"sumVistor",text:"访问量",value:0,isActive:!1,ind:2},couponReceiveNum:{key:"couponReceiveNum",text:"已领券",value:0,isActive:!0,ind:3},numPaidOrder:{key:"numPaidOrder",text:"付款订单数",value:0,isActive:!0,ind:4},sumKpiValue:{key:"sumKpiValue",text:"预估提成",value:0,isActive:!0,ind:5}},isShare:!0,shareText:"立即分享",goodsInfo:{goods_name:"---",couponBatchVo:{count_rule_operation_val:0},sumVistor:0,sumSharer:0,sumKpiValue:0,numPaidOrder:0,couponReceiveNum:0,skuPriceList:{},goodsSkuList:{},detail:""},defaultPrice:{sku_id:"",goods_attr_value_remark:"",stock:0,sellSkuPrice:0,goodsAttrValueIds:0},imgPaths:[],param:{},isCoupon:!0,isShow:!1}},methods:{getNormalGoodsInfo:function(){var o=this;o.param=_["a"].getParam(),v["a"].getNormalGoodsInfo({data:{goods_id:o.param.goodsId},callback:function(e){for(var t in o.goodsInfo=e,o.goodsInfo.couponBatchVo&&0!=i()(o.goodsInfo.couponBatchVo).length?(console.log(d()(o.goodsInfo.shareInfo)),o.isShare=o.goodsInfo.shareInfo.isShare,o.goodsInfo.shareInfo.shareTxt&&(o.shareText=o.goodsInfo.shareInfo.shareTxt)):(o.isCoupon=!1,delete o.shareData.couponReceiveNum,o.isShare=!0),o.goodsInfo.detail=o.goodsInfo.photoAndCom.join(""),o.shareData)o.goodsInfo[t]&&(o.shareData[t].value=o.goodsInfo[t]);o.imgPaths=o.goodsInfo.picUrls,o.defaultPrice=o.goodsInfo.defaultPrice,o.isShow=!0}})},openSku:function(){_["a"].openPopover({name:"goods_sku",url:"views/shop/goods_sku",bgColor:"rgba(0,0,0,0.6)",param:{skuPriceList:this.goodsInfo.skuPriceList,goodsSkuList:this.goodsInfo.goodsSkuList,name:this.goodsInfo.goods_name,img:this.goodsInfo.goodsPicUrl,defaultPrice:this.defaultPrice},animation:{type:"fade",subType:"from_bottom"}})}}},m=h,I=(t("ecf9"),t("2877")),P=Object(I["a"])(m,a,n,!1,null,"199cc876",null),k=P.exports,A=t("d8ac");s["a"].config.productionTip=!1,A["a"].start(s["a"]),window.EventBus=new s["a"],window.isPc()?(console.log("pc"),new s["a"]({render:function(o){return o(k)},data:{Bus:new s["a"]}}).$mount("#app")):(console.log("移动端"),window.apiready=function(){new s["a"]({render:function(o){return o(k)}}).$mount("#app")})},e75e:function(o,e){o.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAABW0lEQVQ4jY3Uv0tVYRgH8I8KgkGDLlJgTRGIrjrYDzKMGkrSUVwEA0d1C6dK8E/wRotDQQgRDQUmVIaiCIKDKIjSEEEpqEO6KDqc5+BB7j33PtP7fXk/8JzzvOdUFQqFVxjGBF6qoKoxgkt4gdeoqQRNZvIgPqCuHBrFeGbvCb6iIQ+dYgxDOIn9DvxEUymU1iR6cBi5GfNoyUPwCZ3YidyEOdzKQ7AU7W1FrscMnuYh2Ay4HLkO0xjIQ/AX9/A5co1kjl15CP6jG28y8Hk5BMd4hrXI7ZUguIorsT6qBF3HN+c3ZKYcuimZ043IBxjLQ634gWuR9/AQW6VQG76jMfI/yetfpPic7mA28wy/cRer6YGL6BG+4HLkbdzGRvZQFvXio+QrhvUAvy62kqJ+vEdt5JVo80+R9lWjD1PO/w0LuI/dYiBFI6iKPIsH2C8FUvRWcjHf4XGsc+sMYWFBGFe/LIIAAAAASUVORK5CYII="},ecf9:function(o,e,t){"use strict";var s=t("b005"),a=t.n(s);a.a}});