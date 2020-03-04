define(function (require, exports, module) {
    console.log(window.DeviceId);
    var Http = require('U/http');
    var StoreName = _g.getLS('StoreName') || _g.getLS('UserInfo').store_name;
    var deviceModel = api.deviceModel;
    var systemType = api.systemType;
    var systemVersion = api.systemVersion;
    var deviceName = api.deviceName;
    var user_id = ''
    var noteMes = {
        name: '',
        tel: '',
        comment: '',
        '企业编码': _g.getLS('UserInfo').company_code || '',
        '企业名称': _g.getLS('UserInfo').company_name || '',
        '门店编码': _g.getLS('UserInfo').store_code || '',
        '门店名称': StoreName
    };
    if (_g.getLS("UserInfo")) {
        noteMes.name = _g.getLS('UserInfo').user_name;
        noteMes.tel = _g.getLS('UserInfo').user_phone;
        user_id = _g.getLS('UserInfo').user_id;
    }
    var clientIdParam = {
        id: '000000' + user_id
    }
    // 引入阿里推送
    if (aliPush) {
        aliPush.unbindAccount(function (ret, err) { });
    }
    var aliPush = api.require('aliPush');
    if (aliPush) {
        aliPush.isRegister(function (ret, err) {
            if (ret.status) {
                // 监听通知
                aliPush.addEventListener({
                    name: 'onNotification'
                }, function (ret, err) {
                    if(ret.extraMap&&ret.extraMap.type=='guide_group_order' || ret.extraMap&&ret.extraMap.type=='guide_order'){  //todo 修改了旧版代码
                        var type = ret.extraMap.type;
                        var id = ret.extraMap.httpUrl;
                        _g.updateCache(id,type,'add');
                        return;
                    }
                    // 只是判断此通知为目标管理的通知，后期可让后台返回一个字段来判断
                    if ((ret.hasOwnProperty('userInfo') && ret.userInfo.hasOwnProperty('httpUrl')) || (ret.hasOwnProperty('extraMap') && ret.extraMap.hasOwnProperty('httpUrl'))) {
                        if (_g.isIOS) {
                            //目标管理接收通知
                            // alert('onNotification' + JSON.stringify(ret));
                            // console.log('onNotification' + JSON.stringify(ret));
                            //发送通知
                            api.sendEvent && api.sendEvent({
                                name: 'aliNotify',
                                extra: {
                                    target_title: ret.userInfo.title
                                }
                            });
                        } else {
                            //目标管理接收通知
                            // alert('onNotification' + JSON.stringify(ret));
                            //发送通知
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
                    if(ret.extraMap&&JSON.parse(ret.extraMap).type=='guide_order' || ret.extraMap && JSON.parse(ret.extraMap).type=='guide_group_order'){  //todo 修改了旧代码
                        console.log('ret--->'+JSON.stringify(ret))                     
                        var type = JSON.parse(ret.extraMap).type;
                        var id = JSON.parse(ret.extraMap).httpUrl;
                        var opts = {};
                        if(type == 'guide_group_order') {
                            opts = {
                                index: 0,
                                group_shopping_order_no:id
                            }
                        }else {
                            opts = {
                                index: 1,
                                order_no: id
                            }
                        }
                        _g.updateCache(id,type,'remove');
                        api.openWidget({id: 'A6915221880328',wgtParam: {
                            path: 'views/shop/group_order', 
                            pageParam: {
                                isLightStatusBar: true,
                                customNavigationBar: {                               
                                  url:'views/shop/group_order/header_frame'
                                },
                                param: opts
                            }
                        }});
                        return;
                    }
                    // 只是判断此通知为目标管理的通知，后期可让后台返回一个字段来判断
                    if ((ret.hasOwnProperty('userInfo') && ret.userInfo.hasOwnProperty('httpUrl')) || (ret.hasOwnProperty('extraMap') && JSON.parse(ret.extraMap).hasOwnProperty('httpUrl'))) {
                        if (_g.isIOS) {
                            console.log('onNotificationOpened' + JSON.stringify(ret));
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
                                    // cancel : opts.cancel
                                },
                                bounces: false,
                                slidBackEnabled: false,
                            });
                        } else {
                            // alert('onNotificationOpened' + JSON.stringify(ret));
                            console.log('onNotificationOpened' + JSON.stringify(ret));
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
                                    // cancel : opts.cancel
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
                aliPush.bindAccount({ account: clientIdParam.id }, function (ret, err) {
                    if (!ret.status) {
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
    	template: _g.getTemplate('memberManager/header/header'),
        data: {
            active: 0,
            title: StoreName,
            noteCount: 0
        },
        methods: returnHeadMethod()
    });
    var footer = new Vue({
        el: '#footer',
        template: _g.getTemplate('memberManager/footer'), 
        data: {
            active: 1,
            list: [{
                title: '首页',
                isShow: true
            },{
                title: '门店',
                isShow: true
            },{
                title: '商城',
                isShow: false
            },{
                title: '我的二维码',
                isShow: false
            }]
        },
        created:function(){
            openMallHelp();
        },
        ready:function(){
        },
        methods: {
            onTap: function(index){
                if (this.list[index].title == "商城") {
                    api.openWidget({id: 'A6915221880328',wgtParam: {
                        path: 'views/shop/index',
                        pageParam: {
                            isLightStatusBar: true,
                            customNavigationBar: {
                                url:'views/shop/index/header_frame'
                            }
                        }
                        
                    }});
                    // api.openWidget({
                    //     id: 'A6915221880328',
                    //     animation: {
                    //         type: 'push',
                    //         subType: 'from_right',
                    //         duration: 200
                    //     }
                    // }, function(ret, err){
                    //     if(ret){
                    //         logger.log({ "Type": "operation", "action": "进入商城助手", "Win_name": api.winName, "message": ret, "requireURL": _url, "设备型号": api.deviceModel, "系统类型": api.systemType, "手机平台的系统版本": api.systemVersion, "设备名称": api.deviceName })
                    //     }else {
                    //         alert(JSON.stringify(err));
                    //     }
                    // });
                }else {
                    if(!bound && index==3) return _g.toast('您未绑定相应的营业员角色，该功能无法使用');
                    this.active = index;
                    setFrameGroupHead(index);
                    api.setFrameGroupIndex && api.setFrameGroupIndex({
                        name: 'memberManage-group',
                        index: index,
                        scroll: false,
                        reload: false
                    });
                }
            },

        }
    });
    //
    var bound = false;
    var getQRCodeConfig = function (opts, callback) {
        opts = opts || {};
        var _data = {};
        var _url = '/app/auth/shopGuide/showShopGuideCode.do';
        Http.ajax({
            data: _data,
            api_versions: 'v2',
            url: _url,
            success: function (res) {
                logger.log({ "Type": "operation", "action": "获取二维码是否显示-------------------------", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url, "line": "------------------------------------------------------" })
                if (res.code == 200) {
                    footer.list[3].isShow = res.object
                } else {
                    _g.toast(res.message);
                }
            },
            error: function (err) {
                _g.hideProgress();
            }
        })

        var _url1 = '/app/auth/shopGuide/judgeAuth.do';
        Http.ajax({
            data: _data,
            api_versions: 'v2',
            url: _url1,
            success: function (res) {
                logger.log({ "Type": "operation", "action": "获取二维码是否提示-------------------------", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url1, "line": "------------------------------------------------------" })
                if (res.code == 200) {
                    // alert(JSON.stringify(res));
                    bound = res.object;
                } else {
                    _g.toast(res.message);
                }
            },
            error: function (err) {
                _g.hideProgress();
            }
        })
    }

    function getPageOpts(httpUrl, type, mes_title) {
        if (httpUrl) {
            if (type == 'Goal_Access' && mes_title != '你有新的指标考核任务') {
                return {
                    title: '编辑目标',
                    rightText: null,
                    name: 'targetShop-editTargetManager',
                    url: '../../html/manager/editTarget_manager.html'
                };
            } else {
                return {
                    title: '门店详情',
                    rightText: '门店排行',
                    name: 'targetShop-detail',
                    url: '../assistant/shopDetails.html'
                };
            }
        } else if (httpUrl == '') {
            return {
                title: '目标管理',
                name: 'targetManage_manager',
                url: '../manager/targetManage_manager.html'
            };
        }
    }

    getQRCodeConfig();

    // 是否开始导购商城
    function openMallHelp() {
        var userInfo = _g.getLS("UserInfo");
        console.log("用户信息=======" + JSON.stringify(userInfo));
        if (!userInfo || !userInfo.user_id) {
            return false;
        }
        var _url = "/app/auth/shop/getAppGuide.do";
        var _data = {
            staff_id: userInfo.user_id
        }
        console.log("请求参数=======" + JSON.stringify(_data));
        Http.ajax({
            url: _url,
            data: _data,
            api_versions: 'v2',
            // mallHost: true,
            success: function (ret) {
                logger.log({"action": "是否开启商城入口", "Win_name": api.winName, "data": _data, "message": ret, "requireURL": _url, "设备型号": api.deviceModel, "系统类型": api.systemType, "手机平台的系统版本": api.systemVersion, "设备名称": api.deviceName })
                if (ret.success) {
                    if (!ret.object || ret.object.status == "invalid") {
                        footer.list[2].isShow = false;
                        _g.setLS("GuideStaffInfo", null);
                    } else {
                        footer.list[2].isShow = true;
                        _g.setLS("GuideStaffInfo", ret.object);
                    }
                }
            },
            error: function (err) {
                logger.log({"action": "请求商城入口数据失败", "Win_name": api.winName, "data": _data, "message": err, "requireURL": _url, "设备型号": api.deviceModel, "系统类型": api.systemType, "手机平台的系统版本": api.systemVersion, "设备名称": api.deviceName })
            }
        });
    }

    function returnHeadMethod() {
        return {
            // 跳转到设置页面
            onTapSetting: function () {
                _g.openWin({
                    header: {
                        data: {
                            title: '设置'
                        }
                    },
                    name: 'setting-setting',
                    url: '../setting/setting.html',
                    bounces: false,
                    slidBackEnabled: false,
                    pageParam: {
                        storeName: StoreName,
                    }
                });
            },
            //打开消息中心
            onTapRightBtn: function () {
                _g.openWin({
                    header: {
                        data: {
                            title: '消息中心',
                        },
                    },
                    name: 'assistant-messageCenter',
                    url: '../assistant/messageCenter.1.html',
                    bounces: false,
                    slidBackEnabled: false,
                })
            },
        };
    }

    //2018-7-5更新，计算未读消息
    function noteCount() {
        window.meiqia.getUnreadMessageCount(function (ret) {
            header.noteCount = ret.count;
        });
    }

    function openFrameGroup() {
        // headerHeight=document.getElementById('header').offsetHeight + _g.getBarHeight();
        headerHeight = $('#header').offset().height + _g.getBarHeight();
        // footerHeight=document.getElementById('footer').offsetHeight;
        footerHeight = $('#footer').height();

        api && api.openFrameGroup({
            name: 'memberManage-group',
            scrollEnabled: false,
            rect: {
                x: 0,
                y: headerHeight,
                w: 'auto',
                h: api.winHeight - headerHeight - footerHeight    //之前用的是window.innerHeight
            },
            index: 0,
            preload: 4,
            frames: [{
                name: 'memberManager-home-frame',
                url: '../memberManager/home.html',
                bounces: true,                        
            },
            {
                name: 'shop-home-frame',
                url: '../shop/home.html',
                bounces: true
            },
            { //商城助手index，永远不会触发
                name: 'shop-home-frame',
                url: '../shop/home.html',
                bounces: true
            },
            {
                pageParam: {
                    hideTopText: true
                },
                name: 'clerk-qrcode',
                url: '../clerk/qrcode.html',
                bounces: false,
                slidBackEnabled: true,
            }]
        }, function (ret, err) {
            footer.active = ret.index;
        });
    }

    function setFrameGroupHead(index) {
        if (index === 1) {
           _g.addHeader({
                data: {
                    title: '门店'
                },
                template: 'header/header-shop-V',
            });
        } else if (index === 0) {
            api && api.sendEvent({
                name:'memberIndexToTop',
            });
           _g.addHeader({
                data: {
                    active: header.active,
                    list: [StoreName],
                    noteCount: header.noteCount
                },
                template: 'header/header-index-V',
                methods: returnHeadMethod()
            });
        } else if (index === 3) {
            _g.addHeader({
                data: {
                    title: '导购二维码'
                },
            });
        }
    }

    openFrameGroup();

    // 监听安卓返回按钮事件
    api && api.addEventListener({
        name: 'keyback'
    }, function (ret, err) {
        api.closeWidget();
    });

    api.addEventListener && api.addEventListener({
        name: 'selectStore',
    }, function (ret, err) {
        name = _g.getLS('StoreName');
    });
    // 2018-7-5更新
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

     logger.log({ "Type": "operation", "action": "店长首页", "Win_name": api.winName, "设备型号": deviceModel, "系统类型": systemType, "手机平台的系统版本": systemVersion, "设备名称": deviceName })
    module.exports = {};
}
);
