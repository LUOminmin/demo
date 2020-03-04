define(function(require, exports, module) {
    var user_id = '';
    if(_g.getLS('UserInfo')) {
        user_id = _g.getLS('UserInfo').user_id;
    }
    var clientIdParam = {
        id: '000000' + user_id
    };
    var getClerkCof = function(httpUrl) {
        if (httpUrl) {
            return {
                title: '门店详情',
                rightText: '门店排行',
                name: 'targetShop-detail',
                url: '../assistant/shopDetails_clerk.html'
            };
        } else {
            return {
                title: '目标管理',
                name: 'targetManage_clerk',
                url: '../clerk/targetManage_clerk.html'
            };
        }
    };
    var getManagerCof = function(httpUrl, type, mes_title) {
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
    var getPageOpts = getManagerCof;
    module.exports = {
    	aliPush: api.require && api.require('aliPush'),
    	init: function(isClerk){
            var self = this;
            if(isClerk) {
                getPageOpts = getClerkCof;
            }	
    		if (self.aliPush) {
                //解绑账号
                self.aliPush.unbindAccount(function (ret, err) { });
                self.aliPush.isRegister(function (ret, err) {
                    if (ret.status) {
                        // 监听通知
                        self.aliPush.addEventListener({
                            name: 'onNotification'
                        }, function (ret, err) {
                            if(ret.extraMap&&ret.extraMap.type=='guide_group_order' || ret.extraMap&&ret.extraMap.type=='guide_order'){  //todo 修改了旧版代码
                                var type = ret.extraMap.type;
                                var id = ret.extraMap.httpUrl;
                                _g.updateCache(id,type,'add');
                                return;
                            }
                            if(ret.userInfo && ret.userInfo.type=='guide_order' || ret.userInfo && ret.userInfo.type=='guide_group_order'){
                                var type = ret.userInfo.type;
                                var id = ret.userInfo.httpUrl;
                                _g.updateCache(id,type,'add');
                                return;
                            }
                            // 只是判断此通知为目标管理的通知，后期可让后台返回一个字段来判断
                            if ((ret.hasOwnProperty('userInfo') && ret.userInfo.hasOwnProperty('httpUrl')) || (ret.hasOwnProperty('extraMap') && ret.extraMap.hasOwnProperty('httpUrl'))) {
                                if (_g.isIOS) {
                                    //目标管理接收通知
                                    // alert('onNotification' + JSON.stringify(ret));
                                    console.log('onNotification' + JSON.stringify(ret));
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
                                api.sendEvent && api.sendEvent({
                                    name: 'resume',
                                });
                            }
                        });
                        // 打开通知消息
                        self.aliPush.addEventListener({
                            name: 'onNotificationOpened'
                        }, function (ret, err) {
                            var isOrder = false;
                            var type;
                            var id;
                            console.log('+++++'+JSON.stringify(ret));
                            if(ret.extraMap&&JSON.parse(ret.extraMap).type=='guide_order' || ret.extraMap && JSON.parse(ret.extraMap).type=='guide_group_order'){  //todo 修改了旧代码
                                console.log('ret--->'+JSON.stringify(ret))                     
                                type = JSON.parse(ret.extraMap).type;
                                id = JSON.parse(ret.extraMap).httpUrl;
                                var opts = {};
                                if(type == 'guide_group_order') {
                                    opts = {
                                        index: 0,
                                        group_shopping_order_no:id,
                                        removeOrder: true
                                    }
                                }else {
                                    opts = {
                                        index: 1,
                                        order_no: id,
                                        removeOrder: true
                                    }
                                }
                                isOrder = true;
                            }
                            else if(ret.userInfo && ret.userInfo.type=='guide_order' || ret.userInfo && ret.userInfo.type=='guide_group_order'){  //todo 修改了旧代码
                                console.log('ret--->'+JSON.stringify(ret))                     
                                type = ret.userInfo.type;
                                id = ret.userInfo.httpUrl;
                                var opts = {};
                                if(type == 'guide_group_order') {
                                    opts = {
                                        index: 0,
                                        group_shopping_order_no:id,
                                        removeOrder: true
                                    }
                                }else {
                                    opts = {
                                        index: 1,
                                        order_no: id,
                                        removeOrder: true
                                    }
                                }
                                isOrder = true;
                            }
                            if(isOrder) {
                                // _g.updateCache(id,type,'remove');
                                // api.sendEvent({
                                //     name: 'customJumpMsg',
                                //     extra: {
                                //         opts : opts,
                                //     }
                                // })
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
                        self.aliPush.bindAccount({ account: clientIdParam.id }, function (ret, err) {
                            console.log("alipush账号绑定"+JSON.stringify(ret));
                            if (!ret.status) {
                                console.log('aliPush绑定失败！ ');
                            }
                        });
                    } else {
                        console.log("ali推送注册失败：" + JSON.stringify(err));
                    }
                });
            }
    	},
    };
  
});

