(function(e){function t(t){for(var i,o,s=t[0],c=t[1],u=t[2],l=0,d=[];l<s.length;l++)o=s[l],a[o]&&d.push(a[o][0]),a[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);m&&m(t);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(i=!1)}i&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var i={},a={erp_report_frames_time_frame:0},r=[];function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var m=c;r.push([2,"chunk-vendors","chunk-common"]),n()})({2:function(e,t,n){e.exports=n("2149")},2149:function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var i=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"frame",attrs:{id:"app"}},[n("p",{staticClass:"screen_top q-1px-b"},[n("span",{on:{click:e.onClose}})]),n("List",{attrs:{list:e.list},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.item,a=t.index;return[n("p",{staticClass:"screen_item q-1px-b",on:{click:function(t){return e.onChooseTime(a)}}},[n("span",[e._v(e._s(i.text))]),n("span",{directives:[{name:"show",rawName:"v-show",value:i.isChecked,expression:"item.isChecked"}],staticClass:"icon"})])]}}])}),n("p",{staticClass:"screen_item q-1px-b"},[n("span",[e._v("自定义时间")]),n("span",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.startTime,expression:"startTime"}],attrs:{placeholder:"请选择",readonly:"readonly"},domProps:{value:e.startTime},on:{click:function(t){return e.timeChoose("startTime")},input:function(t){t.target.composing||(e.startTime=t.target.value)}}}),n("span",[e._v("一")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.endTime,expression:"endTime"}],attrs:{placeholder:"请选择",readonly:"readonly"},domProps:{value:e.endTime},on:{click:function(t){return e.timeChoose("endTime")},input:function(t){t.target.composing||(e.endTime=t.target.value)}}}),n("i")])])],1)},r=[],o=n("a3d3"),s=n("6abe"),c=(n("a481"),n("f499")),u=n.n(c),m=n("b2eb"),l="",d="",f="",p=function(e){var t=f,n=t.getTime()+864e5*e.timeValue;t.setTime(n);var i=h(t);return e.timeValue<-1?(e.startTime=i,e.endTime=h(new Date)):e.startTime=e.endTime=i,e},h=function(e){var t=e.getFullYear(),n=e.getMonth()+1,i=e.getDate(),a=t+"-"+n+"-"+i;return a},v={setParam:function(e){l=e.startTime,d=e.endTime,f=e.standardTime?e.standardTime:new Date},closeFrame:function(){o["a"].close("time_frame",{isFrame:!0})},timeChoose:function(e,t,n){o["a"].openPicker({type:"date",date:t||"",title:"选择时间"},function(t,i){if(t){var a=t.year+"-"+t.month+"-"+t.day;"startTime"==e?l=a:d=a,n(a)}else o["a"].toast("选择时间出错 请重新选择",{location:"middle"}),console.log(u()(i))})},compareDate:function(e,t){return!(new Date(e.replace(/-/g,"/"))>new Date(t.replace(/-/g,"/")))||(l=d="",o["a"].toast("结束时间必须大于开始时间",{location:"middle"}),!1)},completeChoose:function(e){var t=l+"~"+d,n={startTime:l,endTime:d,text:t},i=e?p(e):n;m["a"].publish("timeChoose",i),o["a"].close()}},T={name:"time_frame",components:{List:s["a"]},created:function(){var e=this,t=o["a"].getParam();v.setParam(t),e.startTime=t.startTime,e.endTime=t.endTime;for(var n=t.text,i=0;i<e.list.length;i++)n==e.list[i].text&&(e.activeIndex=i,e.list[i].isChecked=!0)},mounted:function(){o["a"].fixStatusBar(this.$refs.frame)},data:function(){return{startTime:"",endTime:"",activeIndex:"",isLock:!1,list:[{text:"今天",timeValue:0,isChecked:!1,startTime:"",endTime:""},{text:"昨天",timeValue:-1,isChecked:!1,startTime:"",endTime:""},{text:"近7日",timeValue:-7,isChecked:!1,startTime:"",endTime:""},{text:"30日内",timeValue:-30,isChecked:!1,startTime:"",endTime:""}]}},methods:{onClose:function(){v.closeFrame()},onChooseTime:function(e){if(!this.isLock){this.activeIndex&&(this.list[this.activeIndex].isChecked=!1),this.list[e].isChecked=!0,this.isLock=!0;var t=this.list[e];setTimeout(function(){v.completeChoose(t)},200)}},timeChoose:function(e){var t=this;if("endTime"==e&&!t.startTime)return o["a"].toast("请先选择开始时间",{location:"middle"});var n=t[e];v.timeChoose(e,n,function(n){if(t[e]=n,!v.compareDate(t.startTime,t.endTime))return t.startTime="",void(t.endTime="");v.completeChoose()})}}},g=T,w=(n("82d1"),n("2877")),b=Object(w["a"])(g,a,r,!1,null,"70fbf168",null),x=b.exports,C=n("d8ac");i["a"].config.productionTip=!1,C["a"].start(i["a"]),window.EventBus=new i["a"],window.isPc()?(console.log("pc"),new i["a"]({render:function(e){return e(x)},data:{Bus:new i["a"]}}).$mount("#app")):(console.log("移动端"),window.apiready=function(){new i["a"]({render:function(e){return e(x)}}).$mount("#app")})},"82d1":function(e,t,n){"use strict";var i=n("ac43"),a=n.n(i);a.a},ac43:function(e,t,n){}});