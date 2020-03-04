define(function (require, exports, module) {
    var Http = require('U/http');
    var MemberRebuildService = require('S/MemberRebuildService');
    var timeout; //长按定时器
    var header = _g.addHeader({
        template: '../html/main/login-header-V',
        data: {
            title: '登录'
        }
    });
    var isReboot = api.pageParam.reboot;
    if (isReboot) {
        _g.toast("登录信息失效，请重新登录!");
        logger.log({ "action": "重新登录","message": api.pageParam.httpResponse, "requireURL": api.pageParam.url, "设备型号": api.deviceModel, "系统类型": api.systemType, "手机平台的系统版本": api.systemVersion, "设备名称": api.deviceName });
    }
    var login = new Vue({
        el: '#login',
        template: _g.getTemplate('account/login-V'),
        data: {
            phone: '',
            pwd: '',
            role: '',   //记录所登录的角色
            isPhoneInput: false,
            isPhoneSuccess: false,
            isPwdSuccess: false,
            isDisable: true,
            envirs: [
                {
                    envir: "dev",
                    envirName: "开发环境"
                },
                {
                    envir: "sit",
                    envirName: "集测环境"
                }, 
                {
                    envir: "test",
                    envirName: "测试环境"
                },                         
                {
                    envir: "pub",
                    envirName: "正式环境"
                },
            ],
            envirIP: '',
            pathConf: {  // 新旧页面配置 即登录之后页面的跳向   
                'company_admin': {  //老板
                    'new': {      //新会员
                        methods: 'openDrawerLayout',
                        name: 'memberRebuild_index',  //页面名字
                        url: '../memberRebuild/index.html', //页面地址
                        // 'bounces': true,          //页面弹动
                        pageParam: { key: 'fade' },
                        animation: { type: 'none' },
                        leftPane: {
                            name: 'main-index-nav',
                            url: '../memberRebuild/member_left_frame.html',
                            bgColor: 'rgba(0,0,0,0.0)',
                            edge: 110
                        }
                    },
                    'old': {      //旧页面
                        methods: 'openDrawerLayout',
                        name: 'boss-index-win',
                        url: '../boss/index.html',
                        pageParam: { key: 'fade' },
                        animation: { type: 'none' },
                        leftPane: {
                            name: 'main-index-nav',
                            url: '../main/nav.html',
                            bgColor: 'rgba(0,0,0,0.0)',
                            edge: 110
                        }
                    }
                },
                'store_admin': {  //店长
                    'new': {
                        methods: 'openWin',
                        name: 'memberManager_index',
                        url: '../memberManager/index.html',
                        // 'bounces': true,
                    },
                    'old': {
                        methods: 'openWin',
                        name: 'manager-index',
                        url: '../manager/index.html',
                    }
                },
                'sales': {  //店员
                    'new': {
                        methods: 'openWin',
                        name: 'memberClerk_index',
                        url: '../memberClerk/index.html',
                        // 'bounces': true,
                    },
                    'old': {
                        methods: 'openWin',
                        name: 'clerk-index',
                        url: '../clerk/index.html',
                    }
                }
            }
        },
        methods: {
            onSetEnvir: function (envir, envirName) {
                //清楚输入框输入的IP缓存
                _g.rmLS("IP");
                _g.setLS("envir", envir);
                _g.toast('进入' + envirName + '...');
                location.reload();
            },
            onSetEnvirIP: function () {
                if(this.envirIP == '') {
                    _g.toast("IP不能为空");
                    return false;
                }
                var address;
                if(this.envirIP.length == 2 || this.envirIP.length == 1) {
                    address = 'http://' + '192.168.10.' + this.envirIP + ':60021';
                }else {
                    address = 'http://' + this.envirIP
                }
                _g.setLS("IP", address);
                _g.toast('当前域名 ' + address);
                location.reload();
            },
            onPhoneInput: function () {
                var phoneReg = /^1[0-9]{10}$/;
                this.isPhoneInput = true;
                if (phoneReg.test(this.phone)) {
                    this.isPhoneSuccess = true;
                } else {
                    this.isPhoneSuccess = false;
                }
                if (this.isPhoneSuccess && this.isPwdSuccess) {
                    this.isDisable = false;
                } else {
                    this.isDisable = true;
                }
                if (this.phone == '') {
                    this.pwd = '';
                }
            },
            clearPhone: function () {
                this.phone = '';
                this.pwd = '';
                this.isPhoneInput = false;
                this.isPhoneSuccess = false;
                this.isDisable = true;
            },
            onPwdInput: function () {
                var pwdReg = /^[a-zA-Z0-9]{6,16}$/;
                if (pwdReg.test(this.pwd)) {
                    this.isPwdSuccess = true;
                } else {
                    this.isPwdSuccess = false;
                    this.isDisable = true;
                }
                if (this.isPhoneSuccess && this.isPwdSuccess) {
                    this.isDisable = false;
                }
            },
            onLoginClick: function () {
                var self = this;
                if (this.isDisable || !this.isPhoneSuccess || !this.isPwdSuccess) {
                    return;
                }
                if (this.isPhoneSuccess && this.isPwdSuccess) {
                    var deviceModel = api.deviceModel;
                    var systemType = api.systemType;
                    var systemVersion = api.systemVersion;
                    var deviceName = api.deviceName;
                    var _data = {
                        user_phone: this.phone,
                        password: this.pwd
                    };
                    var _url = '/app/account/login.do';
                    Http.ajax({
                        data: _data,
                        api_versions: 'v2',
                        url: _url,
                        isSync: true,
                        success: function (ret) {
                            logger.log({ "Type": "operation", "action": "登录情况", "Win_name": api.winName, "data": _data, "message": ret, "requireURL": _url, "设备型号": deviceModel, "系统类型": systemType, "手机平台的系统版本": systemVersion, "设备名称": deviceName })
                            if (ret.code == 200) {
                                if (!ret.object) return
                                _g.setLS('UserInfo', ret.object);
                                _g.toast('登录成功!');
                                self.phone = '';
                                self.pwd = '';
                                self.isPhoneInput = false;
                                self.isPhoneSuccess = false;
                                self.isPwdSuccess = false;
                                self.isDisable = true;
                                self.role = ret.object.notes;
                                return self.judgeEntrance();  //入口判断  新or旧
                            } else {
                                _g.toast(ret.message);
                            }
                        },
                        error: function (err) { },
                    });
                }
            },
            onForgetPwd: function () {
                _g.openWin({
                    header: {
                        data: {
                            title: '忘记密码'
                        }
                    },
                    name: 'account-forget',
                    url: '../account/forget.html',
                    bounces: false,
                    slidBackEnabled: false,
                });
            },
            judgeEntrance: function() {  //新旧页面判断
                var self = this;
                Http.ajax({
                    data: {},
                    api_versions: 'v2',
                    url: '/app/auth/home/task/getJumpConfig.do',
                    success: function (ret) {
                        if(!ret.object) return self.goPage(); //object不为true 默认跳转到旧页面
                        MemberRebuildService.ifUpdate(function(){
                            self.goPage(true);
                        });
                    },
                    error: function (err) { 
                        return self.goPage();
                    },
                });
            },
            // ifUpdate() {    //是否需要重新获取配置
            //     var self = this;
            //     var confTime = '';
            //     var callback = function(res) {
            //         var rebuild = self.rebuildData(res);
            //         _g.setLS('getTaskConfTime',confTime);   //缓存最后更新配置时间
            //         _g.setLS('taskConf',rebuild);   //缓存配置
            //         self.goPage(true);   //跳转到新页面
            //     };
            //     Http.ajax({
            //         data: {},
            //         api_versions: 'v2',
            //         url: '/app/auth/home/task/getLastUpdateTime.do',
            //         success: function (ret) {
            //             confTime = ret.object || 0;  //后台返回的时间
            //             var localTime = _g.getLS('getTaskConfTime') || 0;   //本地最后一次更新配置的时间
            //             if(confTime <= localTime) return self.goPage(true);    //后台逻辑：只有返回的时间小于本地的时间这种情况不用更新
            //             self.getConf(callback);
            //         },
            //         error: function (err) { 
            //             self.getConf(callback);
            //         },
            //     });
            // },
            // getConf(callback) { //从后台获取配置
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
            // },
            goPage: function(isNew) {   //页面跳转
                var self = this;
                var role = self.role;
                var conf = isNew ? self.pathConf[role].new : self.pathConf[role].old;      //从接口返回来判断拿不同配置
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
            },
            // rebuildData(list) { //重组配置数据
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
        }
    });

    //长按logo设置环境
    var logo = $('.ui-login__logo__img')[0];
    logo.addEventListener('touchstart', function (e) {
        timeout = setTimeout(function () {
            $(logo).addClass("settingEnvir");
            $(".ui-btnBox__setEnvir").addClass("settingEnvir");
            $(".inputIPBox").show(1000);
            _g.toast(CONFIG.HOST);
        }, 3000);  //长按时间超过3000ms，则执行传入的方法
    }, false);
    logo.addEventListener('touchend', function (e) {
        clearTimeout(timeout);
    }, false);

    // 解决fixed浮动的bug
    // $('#login').css('height', window.innerHeight + 'px');

    turnSystem = function () {
        this.phone = '';
        this.pwd = '';
        this.isPhoneInput = false;
        this.isPhoneSuccess = false;
        this.isPwdSuccess = false;
        this.isDisable = true;

        api.openWin && api.openWin({
            name: 'account-system',
            url: 'system.html',
            bounces: false,
            slidBackEnabled: false
        });
    }
    // 监听安卓返回按钮事件
    api.addEventListener && api.addEventListener({
        name: 'keyback'
    }, function (ret, err) {
        api.closeWidget();
    });
    api && api.setStatusBarStyle({
        style: 'light'
    });
    logger.log({ "Type": "operation", "action": "登录页面", "Win_name": api.winName });
    module.exports = {};
});
