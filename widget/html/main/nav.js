define(function(require, exports, module) {
    var Http = require('U/http');
    // 获取会员模块切换配置
    _g.getMemberSwitchConfig(Http);
    var vm = new Vue({
        el: '#nav',
        template: _g.getTemplate('main/home-nav-V'),
        data: {
            list_1: [{
                image: '../../image/nav/nav-icon__home.png',
                text: '首页',
                clickMothod: 'onHomeTap',
            },{
                image: '../../image/nav/nav-icon__check.png',
                text: '未审核列表',
                clickMothod: 'onWaitCheckTap',

            },
            // ,{
            //     image: '../../image/nav/nav-icon__static.png',
            //     text: '营业数据',
            //     clickMothod: 'onShopTap',

            // },
            {
                image: '../../image/nav/nav-icon__manage.png',
                text: '门店管理',
                clickMothod: 'onShopTap',

            },
            {
                image: '../../image/nav/nav-icon__assistant.png',
                text: '店员管理',
                clickMothod: 'onAssistantTap',

            },{
                image: '../../image/nav/nav-icon__member.png',
                text: '会员管理',
                clickMothod: 'onMemberCheckTap',
            }],
            list_2: [
            // {
            //     image: '../../image/nav/nav-icon__toggle.png',
            //     text: '选择门店',
            //     subText: '',
            //     clickMothod: 'onChangeSystemTap'
            // },
            {
                image: '../../image/nav/nav-icon__about.png',
                text: '关于',
                subText: 'v' + api.appVersion,
                clickMothod: 'onAboutTap'
            }]
        },
        methods: {
            onBackTap: function(){
                api.closeDrawerPane && api.closeDrawerPane();
            },
            onClickTap: function(type){
                if(type == 'onAboutTap'){
                    _g.openWin({
                        header: {
                            data: {
                                title: '关于我们'
                            },
                        },
                        bounces: false,
                        name: 'setting-about',
                        url: '../setting/about.html',
                    });
                }else if(type == 'onShopTap'){
                    _g.openWin({
                        header: {
                            data: {
                                title: '门店管理'
                            },
                        },
                        name: 'shop-home',
                        url: '../shop/home.html',
                    });
                }else if(type == 'onAssistantTap'){
                    _g.openWin({
                        header: {
                            data: {
                                title: '店员管理'
                            },
                        },
                        name: 'boss-assistantFunction',
                        url: '../boss/assistantFunction.html',
                    });
                }else if(type == 'onChangeSystemTap'){
                    _g.openWin({
                        header: {
                            data: {
                                title: '选择门店'
                            },
                        },
                        name: 'setting-selectShop',
                        url: '../setting/selectShop.html',
                    });
                }else if(type == 'onWaitCheckTap'){
                    _g.openWin({
                        header: {
                            data: {
                                title: '未审核列表',
                                rightText: '共',
                                rightNum: 0
                            },
                        },
                        name: 'statistics-uncheckBill',
                        url: '../statistics/uncheckBill.html',
                    });
                }else if(type == 'onHomeTap'){
                    api.closeDrawerPane && api.closeDrawerPane();
                }else if(type == 'onMemberCheckTap'){
                    console.log("nav.js 老板角色 开启新会员模块:" + _g.showRebuildMember)
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
                    } else {
                        _g.openWin({
                            header: {
                                data: {
                                    title: '会员管理'
                                },
                            },
                            name: 'boss-memberIndex',
                            url: '../boss/memberIndex.html',
                        });
                    }
                	
                    
                }
                api.closeDrawerPane && api.closeDrawerPane();
            }
        }

    });
    // api && api.addEventListener({
    //     name: 'getShopName'
    // }, function(ret, err) {
    //     vm.list_2[0].subText = ret.value.name;
    // });
    module.exports = {};
});
