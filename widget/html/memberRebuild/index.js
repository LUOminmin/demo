define(function(require, exports, module) {
    var Http = require('U/http');
    var deviceModel = api.deviceModel;
    var systemType =api.systemType;
    var systemVersion=api.systemVersion;
    var deviceName=api.deviceName;
    var user_id = '';
    var noteMes = {
        name: '',
        tel: '',
        comment: '',
        '企业编码': '',
        '企业名称': '',
    };
    if (_g.getLS("UserInfo")) {
        noteMes.name = _g.getLS('UserInfo').user_name;
        noteMes.tel = _g.getLS('UserInfo').user_phone;
        user_id = _g.getLS('UserInfo').user_id;
    }
    var param = {
        appkey: "9a560c1acf61196e9d20b4b1e2f873dd"
    };
    var clientIdParam = {
        id: '000000' + user_id
    }
    // 引入阿里推送
    // 解绑账号
    if (aliPush) {
        aliPush.unbindAccount(function(ret,err) {});
    }
    var aliPush = api.require('aliPush');
    if (aliPush) {
        aliPush.isRegister(function (ret, err) {
            if (ret.status) {
                // 监听通知
                aliPush.addEventListener({
                    name: 'onNotification'
                }, function (ret, err) {
                    // 只是判断此通知为目标管理的通知，后期可让后台返回一个字段来判断
                    if ((ret.hasOwnProperty('userInfo') && ret.userInfo.hasOwnProperty('httpUrl')) || (ret.hasOwnProperty('extraMap') && ret.extraMap.hasOwnProperty('httpUrl'))) { 
                        // 目标管理的通知
                        if (_g.isIOS) {
                            // alert('onNotification' + JSON.stringify(ret));
                            // console.log('onNotification' + JSON.stringify(ret));
                            //派发通知事件
                            api.sendEvent && api.sendEvent({
                                name: 'aliNotify',
                                extra: {
                                    target_title: ret.userInfo.title
                                }
                            });
                        } else {
                            // alert('onNotification' + JSON.stringify(ret));
                            //派发通知事件
                            api.sendEvent && api.sendEvent({
                                name: 'aliNotify',
                                extra: {
                                    target_title: ret.extraMap.title
                                }
                            });
                        }
                    } else {
                        console.log('onNotification' + JSON.stringify(ret));
                        noteCount();
                    }
                });
                // 打开通知消息
                aliPush.addEventListener({
                    name: 'onNotificationOpened'
                }, function (ret, err) {
                    // 只是判断此通知为目标管理的通知，后期可让后台返回一个字段来判断
                    if ((ret.hasOwnProperty('userInfo') && ret.userInfo.hasOwnProperty('httpUrl')) || (ret.hasOwnProperty('extraMap') && JSON.parse(ret.extraMap).hasOwnProperty('httpUrl'))) {
                        if (_g.isIOS) {
                            // console.log('onNotificationOpened' + JSON.stringify(ret));
                            // alert('onNotificationOpened' + JSON.stringify(ret));
                            //发送通知
                            api.sendEvent && api.sendEvent({
                                name: 'aliNotify',
                            });
                            //打开具体目标
                            var opts = getPageOpts(ret.userInfo.httpUrl, ret.userInfo.type, ret.userInfo.title);
                            _g.openWin({
                                header: {
                                    data: {
                                        title: opts.title,
                                        rightText: opts.rightText,
                                    }
                                },
                                name: opts.name,
                                url: opts.url,
                                pageParam: {
                                    entId: ret.userInfo.httpUrl,
                                },
                                bounces: false,
                                slidBackEnabled: false,
                            });
                        } else {
                            // alert('onNotificationOpened' + JSON.stringify(ret));
                            // console.log('onNotificationOpened' + JSON.stringify(ret));
                            //发送通知
                            api.sendEvent && api.sendEvent({
                                name: 'aliNotify',
                            });
                            //打开具体目标
                            var extraMap = JSON.parse(ret.extraMap);
                            var opts = getPageOpts(extraMap.httpUrl, extraMap.type, extraMap.title);
                            _g.openWin({
                                header: {
                                    data: {
                                        title: opts.title,
                                        rightText: opts.rightText,
                                    }
                                },
                                name: opts.name,
                                url: opts.url,
                                pageParam: {
                                    entId: extraMap.httpUrl,
                                },
                                bounces: false,
                                slidBackEnabled: false,
                            });
                        }
                    } else {
                        console.log("打开通知消息");
                        // 打开meiQia
                        window.meiqia.show();
                    }
                });

                // 绑定账号
                console.log('clientIdParam.id ' + clientIdParam.id);
                aliPush.bindAccount({ account: clientIdParam.id}, function (ret, err) {
                    if(!ret.status) {
                        console.log('aliPush绑定失败！ ');
                    }
                });

            } else {
                console.log("ali推送注册失败：" + JSON.stringify(err));
            }
        });
    }

    // 引入meiQia
    // meiQia设置自定义信息
    console.log('noteMes ' + JSON.stringify(noteMes));
    window.meiqia.setClientInfo(noteMes);
    // 设置登录用户
    window.meiqia.setLoginCustomizedId(clientIdParam);

    var header = new Vue({
    	el: '#header',
    	template: _g.getTemplate('memberRebuild/header/header'),
        data: {
            active: 0,
            title:'',
            noteCount: 0,
        },
        created:function () {
            openFrameGroup();
        },
        methods: returnHeadMethod()
    });

    // 获取通知跳转信息
    function getPageOpts(httpUrl) {
        if (httpUrl) {
            return {
                title: '门店排行',
                    rightText: '店员',
                    name: 'targetShop-rank',
                    url: '../assistant/targetShopRank.html'
            };
        } else {
            return {
                title: '目标管理',
                name: 'targetManage',
                url: '../boss/targetManage.html'
            };
        }
    }

    function returnHeadMethod(){
        return {
            // 侧边栏导航
            onTapSlide: function(){
                api.openDrawerPane && api.openDrawerPane({
                    type: 'left'
                });
            },
          //打开消息中心
          onTapRightBtn:function(){
            _g.openWin({
                header: {
                    data: {
                        title:'消息中心',
                    },
                },
                    name: 'assistant-messageCenter',
                    url: '../assistant/messageCenter.1.html',
                    bounces: true,
                    slidBackEnabled: false,
                })
            }
        };
    }
    //2018-7-3修改，计算未读消息
    function noteCount() {
        window.meiqia.getUnreadMessageCount(function (ret) {
            header.noteCount = ret.count;
        });
    }
    var getStoreList = function () {
        var _url='/app/auth/store/list.do';
        Http.ajax({
            url:_url,
            data: {},
            api_versions: 'v2',
            success: function(res){
                logger.log({"Type":"operation","action":"老板首页获取门店列表","Win_name":api.winName,"message":res,"requireURL":_url})
                if(res.success){
                    _.each(res.object,function (item) {
                        if(item.org_type == '001'){
                            console.log(item.org_name)
                            header.title = item.org_name
                            noteMes['企业名称'] = item.org_name;
                            noteMes['企业编码'] = item.org_code;
                        }
                        
                    })
                }else{
                    _g.toast(res.message);
                }
            },
            error:function (err) {

            }
        });
    }

    getStoreList();

    function openFrameGroup(){
        headerHeight = $('#header').offset().height + _g.getBarHeight();
        api && api.openFrameGroup({
            name: 'boss-group',
            scrollEnabled: false,
            rect: {
                x: 0,
                y: headerHeight,
                w: 'auto',
                h: window.innerHeight - headerHeight
            },
            index: 0,
            preload: 1,
            frames: [{
                name: 'memberRebuild_home',
                url: '../memberRebuild/home.html',
                bounces: true,
            },
            ]
        }, function(ret, err) {
        });
    }

    // 监听安卓返回按钮事件
    api && api.addEventListener({
        name: 'keyback'
    }, function(ret, err) {
        api.closeWidget();
    });

    //监听从后台进入app事件
    api && api.addEventListener({
        name: 'resume'
    }, function (ret, err) {
        noteCount();
    });
    //监听打开window事件
    _g.viewAppear(function (ret, err) {
        noteCount();
    });
    api && api.addEventListener({
        name: 'note_refresh'
    }, function (ret, err) {
        noteCount();
    });
    api && api.setStatusBarStyle({
        style: 'light'
    });
    logger.log({"Type":"operation","action":"老板首页","Win_name":api.winName,"设备型号":deviceModel,"系统类型":systemType,"手机平台的系统版本":systemVersion,"设备名称":deviceName})
    module.exports = {};
});
