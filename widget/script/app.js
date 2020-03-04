define(function(require, exports, module) {
    var Http = require('U/http');
    var MemberRebuildService = require('S/MemberRebuildService');
    var user = _g.getLS('UserInfo');
    var role = null;
    var pathConf = {  // 新旧页面配置 即登录之后页面的跳向   
        'company_admin': {  //老板
            'new': {      //新会员
                methods: 'openDrawerLayout',
                name: 'memberRebuild_index',  //页面名字
                url: './html/memberRebuild/index.html', //页面地址
                // 'bounces': true,          //页面弹动
                pageParam: { key: 'fade' },
                animation: { type: 'none' },
                leftPane: {
                    name: 'main-index-nav',
                    url: './html/memberRebuild/member_left_frame.html',
                    bgColor: 'rgba(0,0,0,0.0)',
                    edge: 110
                }
            },
            'old': {      //旧页面
                methods: 'openDrawerLayout',
                name: 'boss-index-win',
                url: './html/boss/index.html',
                pageParam: { key: 'fade' },
                animation: { type: 'none' },
                leftPane: {
                    name: 'main-index-nav',
                    url: './html/main/nav.html',
                    bgColor: 'rgba(0,0,0,0.0)',
                    edge: 110
                }
            }
        },
        'store_admin': {  //店长
            'new': {
                methods: 'openWin',
                name: 'memberManager_index',
                url: './html/memberManager/index.html',
                // 'bounces': true,
            },
            'old': {
                methods: 'openWin',
                name: 'manager-index',
                url: './html/manager/index.html',
            }
        },
        'sales': {  //店员
            'new': {
                methods: 'openWin',
                name: 'memberClerk_index',
                url: './html/memberClerk/index.html',
                // 'bounces': true,
            },
            'old': {
                methods: 'openWin',
                name: 'clerk-index',
                url: './html/clerk/index.html',
            }
        }
    };
    var judgeEntrance = function() {  //新旧页面判断
        Http.ajax({
            data: {},
            api_versions: 'v2',
            url: '/app/auth/home/task/getJumpConfig.do',
            success: function (ret) {
                if(!ret.object) return goPage(); //object不为true 默认跳转到旧页面
                MemberRebuildService.ifUpdate(function(){
                    goPage(true);
                });
            },
            error: function (err) { 
                return goPage();
            },
        });
    };
    // var ifUpdate = function() {    //是否需要重新获取配置
    //     var confTime = '';
    //     var callback = function(res) {
    //         var rebuild = rebuildData(res);
    //         _g.setLS('getTaskConfTime',confTime);   //缓存最后更新配置时间
    //         _g.setLS('taskConf',rebuild);   //缓存配置
    //         goPage(true);   //跳转到新页面
    //     };
    //     Http.ajax({
    //         data: {},
    //         api_versions: 'v2',
    //         url: '/app/auth/home/task/getLastUpdateTime.do',
    //         success: function (ret) {
    //             confTime = ret.object || 0;  //后台返回的时间
    //             var localTime = _g.getLS('getTaskConfTime') || 0;   //本地最后一次更新配置的时间
    //             if(confTime <= localTime) return goPage(true);    //后台逻辑：只有返回的时间小于本地的时间这种情况不用更新
    //             getConf(callback);
    //         },
    //         error: function (err) { 
    //             getConf(callback);
    //         },
    //     });
    // };
    // var getConf = function(callback) { //从后台获取配置
    //     Http.ajax({
    //         data: {
    //             parent_id: '0',     //一开始获取配置默认传0
    //         },
    //         api_versions: 'v2',
    //         url: '/app/auth/home/task/get.do',
    //         success: function (ret) {
    //             var result = ret.object || [];
    //             callback && callback(result);
    //         },
    //         error: function (err) { 
    //         },
    //     });
    // };
    var goPage = function(isNew) {   //页面跳转
        var roleNote = role;
        var conf = isNew ? pathConf[roleNote].new : pathConf[roleNote].old;      //todo 用三元 从启新接口判断来拿不同配置
        var defaultOpts = {
            name: '',
            url: '',
            bounces: false, //是否可弹动
            slidBackEnabled: false, //是否允许左滑返回
            animation: {},    //动画
            pageParam: {},    //页面传参
        };
        var opts = Object.assign(defaultOpts,conf);
        api[conf.methods] && api[conf.methods](opts);               
    };
    // var rebuildData = function(list) { //重组配置数据
    //     var lastId;     //记录一级菜单id
    //     var index = -1; //记录某个一级菜单在newlist的位置
    //     var newList = []; //保存重组后的数据
    //     for(var i=0;i<list.length;i++) {
    //         if(lastId == list[i].parent_id) {   //一级菜单id相同 说明是同个分类下的不同行
    //             newList[index].obj[i] = list[i].childList;
    //         }else {
    //             var obj = {};
    //             obj[i] = list[i].childList;
    //             list[i].obj = obj;
    //             newList.push(list[i]);
    //             lastId = list[i].parent_id;
    //             index++;
    //         }
    //     }
    //     return newList;
    // }
    // // 初始化极光推送
    // var ajpush = require('U/ajpush');
    //      ajpush.init();
    //      ajpush.click();
    function openMainPage() {
        if(_g.getLS('UserInfo')){
            if(_g.getLS('UserInfo').notes === 'company_admin'){
                // 抽屉式侧栏效果，老板
                api && api.openDrawerLayout({
                    name: 'boss-index-win',
                    url: './html/boss/index.html',
                    bounces: false,
                    slidBackEnabled: false,
                    pageParam: { key: 'fade' },
                    animation: { type: 'none' }, 
                    leftPane: {
                        name: 'main-index-nav',
                        url: './html/main/nav.html',
                        bgColor: 'rgba(0,0,0,0.0)',
                        edge: 110
                    }
                });
            }else if(_g.getLS('UserInfo').notes === 'store_admin'){
                // 店长
                api.openWin && api.openWin({
                    name: 'manager-index',
                    url: './html/manager/index.html',
                    bounces: false,
                    slidBackEnabled: false,
                });
            }else if(_g.getLS('UserInfo').notes === 'sales'){
                // 店员
                api.openWin && api.openWin({
                    name: 'clerk-index',
                    url: './html/clerk/index.html',
                    bounces: false,
                    slidBackEnabled: false,
                });
            }
        }else{
            // 登录
            api && api.openWin({
                name: 'account-login-win',
                url: './html/account/login.html',
                bounces: false,
                slidBackEnabled: false,
                pageParam: { key: 'value' },
                animation: { type: 'none' }
            });
        }
    };


    api.addEventListener && api.addEventListener({
        name:'online'
    }, function(ret, err){
        //alert(JSON.stringify(ret) + new Date());
    });



    // 清除小红点
    api.setAppIconBadge({
        badge: 0
    });


    openMainPage();
    module.exports = {};

});
