(function(e){function t(t){for(var a,c,i=t[0],o=t[1],l=t[2],h=0,d=[];h<i.length;h++)c=i[h],s[c]&&d.push(s[c][0]),s[c]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);u&&u(t);while(d.length)d.shift()();return n.push.apply(n,l||[]),r()}function r(){for(var e,t=0;t<n.length;t++){for(var r=n[t],a=!0,i=1;i<r.length;i++){var o=r[i];0!==s[o]&&(a=!1)}a&&(n.splice(t--,1),e=c(c.s=r[0]))}return e}var a={},s={member_frames_screen_search_frame:0},n=[];function c(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.m=e,c.c=a,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(r,a,function(t){return e[t]}.bind(null,a));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],o=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=o;n.push([25,"chunk-vendors","chunk-common"]),r()})({"07bb":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("f751"),r("097d");var a=r("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"header",style:e.styleObject,attrs:{id:"app"}},[a("div",{staticClass:"fixed_header"},[a("p",{staticClass:"title q-1px-b",on:{click:e.back}},[a("img",{attrs:{src:r("b96f")}})]),a("div",{staticClass:"header q-1px-b"},[a("div",{staticClass:"search"},[a("span",{staticClass:"search_title q-1px-r"},[e._v(e._s(e.PBCName))]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.searchText,expression:"searchText"}],staticClass:"search_text",attrs:{type:"text",placeholder:e.placeholder},domProps:{value:e.searchText},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)},input:function(t){t.target.composing||(e.searchText=t.target.value)}}}),e.searchText?a("i",{staticClass:"icon_delete",on:{click:e.clearSearch}}):e._e()])])]),a("div",{staticClass:"center"},[e.record.length>0&&!e.ifSearch?a("div",{staticClass:"history_record"},[a("p",{staticClass:"history_title"},[e._v("\n        历史记录"),a("span",{on:{click:e.clear}},[e._v("清空")])]),a("p",e._l(e.record,function(t,r){return a("span",{key:r,staticClass:"record_tag",on:{click:function(r){return e.selectTag(t.multi_consume_remind_query_record)}}},[e._v("\n          "+e._s(e._f("clip")(t.multi_consume_remind_query_record))+"\n        ")])}),0)]):e._e(),e.searchList.length>0?a("div",{staticClass:"search_list"},[a("LoadMore",{ref:"scroll",on:{loadmore:e.queryData}},[a("List",{attrs:{list:e.searchList},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.item;t.index;return[a("p",{staticClass:"search_item q-1px-b",on:{click:function(t){return e.chooseItem(r)}}},[e._v("\n              "+e._s(r.PBCName)),r.checked?a("i"):e._e()])]}}],null,!1,180984104)})],1)],1):e._e(),0!=e.record.length||e.ifSearch?e._e():a("div",{staticClass:"no_record"},[a("span",[e._v("暂无历史记录")])]),0==e.searchList.length&&e.ifSearch?a("div",{staticClass:"no_record"},[a("span",[e._v("暂无搜索记录")])]):e._e()]),a("p",{staticClass:"search_footer_button q-1px-t"},[a("span",{staticClass:"search_reset",on:{click:e.reset}},[e._v("重置")]),a("span",{staticClass:"search_ensure",on:{click:e.ensure}},[e._v("确定")])])])},n=[],c=r("a4bb"),i=r.n(c),o=(r("386d"),r("a481"),r("a3d3")),l=r("b2eb"),u=r("2d44"),h=r("6abe"),d=r("c20c"),f={name:"search_frame",components:{List:h["a"],LoadMore:u["a"]},data:function(){return{styleObject:{},height:100,val:1,PBCName:"单品",placeholder:"请输入商品条码/名称/助记码",searchText:null,page:1,list:[],ifSearch:!1,record:[],searchList:[],item:{}}},filters:{clip:function(e){if(void 0!==e){var t=e,r=t.replace(/[^x00-xff]/g,"01").length,a="",s="",n="";return r>25?(a=e.substr(0,5),s=e.substr(-5),n=a+"......"+s):n=e,n}}},created:function(){},mounted:function(){var e=this;o["a"].fixStatusBar(this.$refs.header),e.val=o["a"].getParam().item.val,1==e.val?(e.PBCName="单品",e.placeholder="请输入商品条码/名称/助记码"):2==e.val?(e.PBCName="品牌",e.placeholder="请输入品牌名"):3==e.val&&(e.PBCName="分类",e.placeholder="请输入分类名"),d["a"].getRecord({data:{type:e.val},success:function(t){e.record=t}})},methods:{back:function(){o["a"].close()},search:function(){this.page=1,this.getSearchList(!0)},selectTag:function(e){this.searchText=e,this.search()},chooseItem:function(e){this.searchList.map(function(e){e.checked=!1}),e.checked=!0,this.item=e},clear:function(){this.record=[],d["a"].clearRecord(this.val)},clearSearch:function(){this.searchText=null},reset:function(){this.searchText=null},ensure:function(){var e=this;i()(e.item).length>0&&l["a"].publish("getSearchMessageItem",{item:e.item,val:e.val}),o["a"].close()},getSearchList:function(e){var t=this;t.searchText?d["a"].getSearchList({data:{query_name_input:t.searchText,type:t.val,page:e?1:t.page},success:function(r){t.ifSearch=!0,t.searchList=e?r:t.searchList.concat(r),!e&&r&&r.length>0?t.$refs.scroll.loaded():e||t.$refs.scroll.complete(),e||0!=t.searchList.length||t.$refs.scroll.hideTips()}}):o["a"].toast("请输入查询条件")},queryData:function(){this.page+=1,this.getSearchList(!1)}}},p=f,v=(r("5d39"),r("2877")),_=Object(v["a"])(p,s,n,!1,null,"f9d836de",null),m=_.exports,g=r("d8ac");a["a"].config.productionTip=!1,g["a"].start(a["a"]),window.EventBus=new a["a"],window.isPc()?(console.log("pc"),new a["a"]({render:function(e){return e(m)},data:{Bus:new a["a"]}}).$mount("#app")):(console.log("移动端"),window.apiready=function(){new a["a"]({render:function(e){return e(m)}}).$mount("#app")})},25:function(e,t,r){e.exports=r("07bb")},"53cd":function(e,t,r){},"5d39":function(e,t,r){"use strict";var a=r("53cd"),s=r.n(a);s.a}});