(function(e){function t(t){for(var a,o,i=t[0],c=t[1],u=t[2],f=0,d=[];f<i.length;f++)o=i[f],s[o]&&d.push(s[o][0]),s[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);l&&l(t);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,i=1;i<n.length;i++){var c=n[i];0!==s[c]&&(a=!1)}a&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},s={member_tag_manage:0},r=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=c;r.push([37,"chunk-vendors","chunk-common"]),n()})({"0285":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("LoadMore",{ref:"scroll",staticClass:"space",on:{loadmore:e.queryData}},[n("List",{attrs:{list:e.tagList},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.item;t.index;return[n("p",{staticClass:"item q-1px-b",on:{click:function(t){return e.choose(a)}}},[n("span",[n("i",{class:"icon"+a.is_selected})]),n("span",[e._v(e._s(a.tag_name))])])]}}])})],1),n("p",{staticClass:"footer_button"},[n("span",{staticClass:"footer_choose"},[n("span",[e._v("已选择"),n("span",[e._v(e._s(e.count))]),e._v("个")])]),n("span",{staticClass:"footer_ensure",on:{click:e.ensure}},[e._v("确定")])])],1)},r=[],o=(n("ac6a"),n("5d73")),i=n.n(o),c=n("f499"),u=n.n(c),l=n("adb5"),f=n("a3d3"),d=n("b2eb"),p=n("87ad"),g={getSelectedTags:function(){var e=[],t=f["a"].getParam();return e=t.tagList||[],e.forEach(function(e){e.is_selected=1}),e},getTagList:function(e){var t=e.data||{},n="/app/auth/crm/user/listCrmUserTag.do";t.user_id=p["a"].getUserId(),l["a"].ajax({url:n,api_versions:"v2",action:"获取标签列表",data:t,skipToast:1!=t.page,success:function(t){var n=t.object||[];e.success&&e.success(n)},error:function(e){console.log(e)}})},saveCrmTag:function(e){var t=[],n=!0,a=!1,s=void 0;try{for(var r,o=i()(e.tagList);!(n=(r=o.next()).done);n=!0){var c=r.value;1==c.is_selected&&t.push(c.tag_id)}}catch(v){a=!0,s=v}finally{try{n||null==o.return||o.return()}finally{if(a)throw s}}var g={user_id:p["a"].getUserId(),tag_list:u()(t)},h="/app/auth/crm/user/saveCrmUserTag.do";l["a"].ajax({data:g,url:h,api_versions:"v2",action:"保存标签",success:function(){d["a"].publish("customRefreshMember"),f["a"].close("member_tag_manage",{isFrame:!1})},error:function(e){f["a"].toast(e.message,{location:"middle"})}})}},h=n("6abe"),v=n("2d44"),_={name:"tag_manage",components:{List:h["a"],LoadMore:v["a"]},created:function(){this.selectedTags=g.getSelectedTags()},mounted:function(){this.getTagList(!0)},data:function(){return{page:1,tagList:[],selectedTags:[],all:{is_selected:0,is_all:!0}}},computed:{count:function(){var e=this.selectedTags.length;return this.tagList.forEach(function(t){1===t.is_selected&&e++}),e}},methods:{choose:function(e){e.is_selected=1===e.is_selected?0:1},getTagList:function(e){var t=this,n={page:e?1:this.page,displayRecord:20};g.getTagList({data:n,success:function(n){n=t.handleList(t.selectedTags,n),t.tagList=e?n:t.tagList.concat(n),n&&20===n.length?t.$refs.scroll.loaded():t.$refs.scroll.complete(),0==t.tagList.length&&t.$refs.scroll.hideTips()}})},queryData:function(){this.page+=1,this.getTagList(!1)},ensure:function(){g.saveCrmTag({tagList:this.tagList.concat(this.selectedTags)})},handleList:function(e,t){if(0===e.length)return t;var n=[];return e.forEach(function(e){n.push(e.tag_id)}),t.forEach(function(t){var a=n.indexOf(t.tag_id);-1!==a&&(t.is_selected=1,e.splice(a,1),n.splice(a,1))}),t}}},m=_,b=(n("f0f7"),n("2877")),y=Object(b["a"])(m,s,r,!1,null,"574c096c",null),L=y.exports,T=n("d8ac");a["a"].config.productionTip=!1,T["a"].start(a["a"]),window.EventBus=new a["a"],window.isPc()?(console.log("pc"),new a["a"]({render:function(e){return e(L)},data:{Bus:new a["a"]}}).$mount("#app")):(console.log("移动端"),window.apiready=function(){new a["a"]({render:function(e){return e(L)}}).$mount("#app")})},"341d":function(e,t,n){},37:function(e,t,n){e.exports=n("0285")},f0f7:function(e,t,n){"use strict";var a=n("341d"),s=n.n(a);s.a}});