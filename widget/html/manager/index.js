define(function (require, exports, module) {
    console.log(window.DeviceId);
    var Http = require('U/http');
    var Alipush = require('U/alipush');
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
    // 获取会员模块切换配置
    _g.getMemberSwitchConfig(Http)
    // 引入阿里推送
    Alipush.init();
    // 引入meiQia
    // meiQia设置自定义信息
    console.log('noteMes ' + JSON.stringify(noteMes));
    window.meiqia.setClientInfo(noteMes);
    // 设置登录用户
    window.meiqia.setLoginCustomizedId(clientIdParam);

    var header = new Vue({
    	el: '#header',
    	template: _g.getTemplate('header/header-index-V'),
        data: {
            active: 0,
            list: {
                name: StoreName,
            },
            noteCount: 0
        },
        methods: returnHeadMethod()
    });
    var footer = new Vue({
        el: '#footer',
        template: _g.getTemplate('header/footer-nav-new'), 
        data: {
            active: 1,
            showMallHelp: false, //显示商城
            list: [{
                title: '首页',
            },{
                title: '门店',
            },{
                title: '商城'
            },{
                title: '店员',
            },{
                title: '会员',
            }]
        },
        created:function(){
            openMallHelp();
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
                        
                    }},function(){
                       Alipush.init();
                    });
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
                } else if (this.list[index].title == "会员") {
                    console.log("manager/index.js 店长角色 开启新会员模块:" + _g.showRebuildMember)
                    if(_g.showRebuildMember) {
                        window.api.openWidget({id: 'A201902211822',wgtParam: {
                            path: 'views/member/index', 
                            pageParam: {
                                customNavigationBar: {
                                //   style: {background: 'red'},
                                title: '会员',
                                url:'views/member/index/header_frame'
                                } 
                            }
                        }});
                    }else {
                        this.active = index;
                        setFrameGroupHead(index);
                        api.setFrameGroupIndex && api.setFrameGroupIndex({
                            name: 'manage-group',
                            index: index,
                            scroll: false,
                            reload: false
                        });
                    }
                } else {
                    this.active = index;
                    setFrameGroupHead(index);
                    api.setFrameGroupIndex && api.setFrameGroupIndex({
                        name: 'manage-group',
                        index: index,
                        scroll: false,
                        reload: false
                    });
                }
            },

        }
    });
    

    //
    var qrcodeShow = false;
    var bound = false;
    var isWX = false;
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
                    qrcodeShow = res.object;
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

        var _url2 = '/app/auth/shopGuide/jumpToPageOrApplet.do';
        Http.ajax({
            data: _data,
            api_versions: 'v2',
            url: _url2,
            success: function (res) {
                logger.log({ "Type": "operation", "action": "获取二维码是否网页版二维码-------------------------", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url2, "line": "------------------------------------------------------" })
                if (res.code == 200) {
                    // alert(JSON.stringify(res));
                    isWX = res.object;
                } else {
                    _g.toast(res.message);
                }
            },
            error: function (err) {
                _g.hideProgress();
            }
        })
    }


    getQRCodeConfig();

    function returnHeadMethod3() {
        return {
            onTapRightBtn: function () {
                if (bound) {
                    salesQrcodePoint();
                    _g.openWin({
                        header: {
                            data: {
                                title: '导购二维码',
                            }
                        },
                        pageParam: {
                            isWX: isWX
                        },
                        name: 'clerk-qrcode',
                        url: '../clerk/qrcode.html',
                        bounces: false,
                        slidBackEnabled: true,
                    });
                } else {
                    _g.toast('您未绑定相应的营业员角色，该功能无法使用');
                }
            }
        }
    }
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
                        footer.showMallHelp = false;
                        _g.setLS("GuideStaffInfo", null);
                    } else {
                        footer.showMallHelp = true;
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
            onItemTap: function (index) {
                this.active = index;
                header.active = index;
                api && api.sendEvent({
                    name: 'changeTime',
                    extra: {
                        type: index,
                    }
                })
            },
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
                // 2018-07-04更新
                // onMeiQia: function () {
                //     window.console.log('打开meiqia成功!--------------');
                //     // 打开meiQia
                //     window.meiqia.show();
                // }
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
            name: 'manage-group',
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
                name: 'manager-home-frame',
                url: '../manager/home.html',
                bounces: true
            }, {
                name: 'shop-home-frame',
                url: '../shop/home.html',
                bounces: true
            },{ //商城助手index，永远不会触发
                name: 'shop-home-frame',
                url: '../shop/home.html',
                bounces: true
            },
            {
                name: 'assistant-home-frame',
                url: '../manager/assistantFunction_manager.html',
                bounces: true
            }, {
                name: 'menber-home-frame',
                url: '../manager/memberIndex.html',
                bounces: true
            }]
        }, function (ret, err) {
            footer.active = ret.index;
        });
    }

    function setFrameGroupHead(index) {
        var tapTitle = footer.list[index].title;
        if (tapTitle === '门店') {
           _g.addHeader({
                data: {
                    title: '门店'
                },
                template: 'header/header-shop-V',
            });
        } else if (tapTitle === '首页') {
           _g.addHeader({
                data: {
                    active: header.active,
                    list: [StoreName],
                    noteCount: header.noteCount
                },
                template: 'header/header-index-V',
                methods: returnHeadMethod()
            });
        } else if (tapTitle === '店员') {
            _g.addHeader({
                data: {
                    title: '店员管理'
                },
                template: 'header/header-shop-V',
            });
        } else if (tapTitle === '会员') {
        	_g.addHeader({
                data: {
                        title: '会员管理',
                        qrcodeShow: qrcodeShow,
                        bound: bound,
                    },
                    template: 'header/header-userManage-V',
                    methods: returnHeadMethod3()
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
    // 侧滑效果
    // api.setFrameGroupAttr && api.setFrameGroupAttr({
    //     name: 'manage-group',
    //     scrollEnabled: true
    // });
     logger.log({ "Type": "operation", "action": "店长首页", "Win_name": api.winName, "设备型号": deviceModel, "系统类型": systemType, "手机平台的系统版本": systemVersion, "设备名称": deviceName })
    module.exports = {};
}
);
