define(function (require, exports, module) {
    var Http = require('U/http');
    var MemberRebuildService = require('S/MemberRebuildService');
    var homeList = new Vue({
        el: '#index',
        template: _g.getTemplate('memberClerk/home-body-V'),
        data: {
            showList: [   //空对象为排版需要
                {
                    title: '个人提成',
                    value: 'sales_kpi_price',   //数据对应的data属性
                    name: 'manager-managerCommission',
                    url: '../manager/managerCommission.html',
                    headData: {
                        data: {
                            title: '我的提成',
                        }
                    },
                },
                {
                    title: '进行中的任务 ',
                    value: 'goal_setting_count',
                    noDeal: true,   //是否需要过滤器
                    name: 'manager-targetManage',
                    url: '../manager/targetManage_manager.html',
                    headData: {
                        data: {
                            title: '目标管理',
                            rightText: '历史目标',
                        }
                    },
                },
                {
                    title: '进行中的关怀 ',
                    value: 'care_count',
                    noDeal: true,
                    name: 'manager-managerTheme',
                    url: '../manager/managerTheme.html',
                    headData: {
                        data: {
                            title: '主题关怀',
                        }
                    }
                }
            ],
            manageList: [
                {
                    icon: "url('../../image/memberRebuild/vip.png')",   //icon路径
                    title: '会员信息',  //文案
                    methods: 'openDrawerLayout',    //打开页面方法
                    url: '../member/memberMessage.html',    //页面跳转路径
                    name: 'member-memberMessage',   //跳转页面名
                    headData: { //头部参数
                        data: {
                            title: '会员信息',
                            searchInput: ''
                        },
                        template: '../html/header/header-search-V',
                    },
                    frame: 'rightPane',
                    frameParam: {
                        name: 'rightPane',
                        url: '../member/managerMemberSide.html'
                    }
                },
                {
                    icon: "url('../../image/memberRebuild/aim.png')",
                    title: '我的目标',
                    count: 'goal_setting_count',
                    name: 'clerk-targetManageClerk',
                    url: '../clerk/targetManage_clerk.html',
                    bounces: true,
                    headData: {
                        data: {
                            title: '目标管理',
                            rightText: '历史目标',
                        }
                    }
                },
                {
                    icon: "url('../../image/memberRebuild/royalty.png')",
                    title: '关怀任务',
                    count: 'care_count',
                    name: 'clerk-clerkTheme',
                    url: '../clerk/clerkTheme.html',
                    headData: {
                        data: {
                            title: '主题关怀',
                        }
                    }
                },
                {
                    icon: "url('../../image/memberRebuild/analysis.png')",
                    title: '我的销售',
                    methods: 'openDrawerLayout',
                    url: '../statistics/allDetails.html',
                    name: 'statistics-allDetails',
                    headData: {
                        data: {
                            title: '全部销售明细'
                        },
                        template: '../html/header/header-hasScreen-V'
                    },
                    frame: 'rightPane',
                    frameParam: {
                        name: 'rightPane',
                        url: '../statistics/allDetailsSide.html'
                    }
                }
            ],
            tableList: [],
            activeTab: 0,  //当前选中的一级菜单
            tabOffSetHeight: 0,  //tab距离顶部的高度
            isFixScroll: false,
            flag: true,
            care_count: 0,  //主题数
            goal_setting_count: 0,   //目标数
            total_sale_price: 0,    //个人营业额
            sales_kpi_price: 0,     //个人提成
            type: "DAY", //头部日、周、月类型;
        },
        watch: {
            activeTab: function () {  //监听一级菜单 并进行滑动
                var self = this;
                var i = self.activeTab;
                var tab = document.getElementsByClassName('tab_item')[i];  //当前活跃的一级菜单
                var homeTab = document.getElementsByClassName('home_tab')[0];
                if(!tab || !homeTab) return;
                homeTab.scrollLeft = tab.offsetLeft;   //控制一级菜单水平滚动
            }
        },
        computed: {
            ifCount: function() {
                var self = this;
                return function(prop) {
                    if(prop && self[prop]>0) {
                        return {}
                    }
                    return {
                        display: 'none'
                    }
                }
            }
        },
        created: function () {
            this.tableList = _g.getLS('taskConf') || [];
        },
        // ready: function () {
        //     if(this.tableList.length == 0) return;
        //     this.tabOffSetHeight = document.getElementById('homeTab').getBoundingClientRect().top;  //获取tab距离顶部高度
        //     var lastIndex = this.tableList.length - 1;
        //     document.getElementsByClassName('remind_space')[0].style.height = document.body.clientHeight - document.getElementsByClassName('home_table')[lastIndex].offsetHeight - document.getElementById('homeTab').offsetHeight + 10 + 'px'; //计算底部空白高度
        // },
        methods: {
            onWeekTurnOverTap: function () {
                _g.openDrawerLayout({
                    header:{
                        data:{
                            title:"全部销售明细"
                        },
                        template:'../html/header/header-hasScreen-V'
                    },
                    name: "statistics-allDetails",
                    url:"../statistics/allDetails.html",
                    rightPane: {
                        name: 'rightPane',
                        url: '../statistics/allDetailsSide.html'
                    }
                });
            },
            tabSelect: function (index) {    //一级菜单tab切换
                var self = this;
                if(self.tableList.length == 0) return;
                self.toTabData(index);  //改变tab对应内容的位置
                if (index == self.activeTab) return;
                self.activeTab = index;
            },
            findTab: function () {  //根据二级菜单内容变换一级菜单
                var self = this;
                if(self.tableList.length == 0) return;
                self.isFixScroll = true;
                var tableOffSetHeight = document.getElementsByClassName('home_table')[0].offsetHeight;
                self.activeTab = Math.ceil((self.scrollHeight - self.tabOffSetHeight) / tableOffSetHeight) - 1;
            },
            judgeScroll: function () {  //是否固定tab在顶部
                var self = this;
                self.scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (self.tabOffSetHeight <= self.scrollHeight) return self.findTab();
                self.isFixScroll = false;
            },
            toTabData: function (index) { //改变tab对应内容的位置
                var self = this;
                self.isFixScroll = true;  //固定一级菜单
                var tabId = 'id'+self.tableList[index].parent_id;
                var table = document.getElementById(tabId);
                var tabHeight = document.getElementById('homeTab').offsetHeight;  //获取一级菜单高度
                tableOffsetTop = table.offsetTop - tabHeight + 1;  //+1是因为在边缘距离存在问题
                window.scrollTo(0, tableOffsetTop);  //移动到对应的菜单
            },
            jumpUrl: function (type,index) { //日常管理 页面跳转
                var self = this;
                if(!self[type][index].url) return;
                var methods = self[type][index].methods || 'openWin';
                var frame = self[type][index].frame || '';
                var opts = {
                    header: self[type][index].headData,
                    name: self[type][index].name,
                    url: self[type][index].url,
                    bounces: self[type][index].bounces || false,
                    slidBackEnabled: false,
                };
                if (frame) {
                    opts[frame] = self[type][index].frameParam;
                }
                _g[methods](opts);
            },
            childClick: function (child) {
                if (!child.isLeaf) {  //是否有二级菜单
                    //用该菜单的parent_id 去请求接口拿到子级菜单
                    Http.ajax({
                        data: {
                            parent_id: child.task_config_menu_id,     //一开始获取配置默认传0
                        },
                        api_versions: 'v2',
                        url: '/app/auth/home/task/get.do',
                        success: function (ret) {
                            var result = ret.object[0] || {};
                            //打开二级菜单页面
                            _g.openWin({
                                name: 'leaf',
                                url: '../leaf/leaf.html',
                                header: {
                                    data: {
                                        title: child.task_config_menu_name,
                                    }
                                },
                                pageParam: {
                                    role: child.role_note,  //角色
                                    list: result    //子级菜单列表
                                }
                            });
                        },
                        error: function (err) { 
                            _g.toast('获取子级菜单出错');
                        },
                    });
                    return;
                }
                _g.openDrawerLayout({
                    header: {
                        data: {
                            title: child.task_config_menu_name || '日常关怀'
                        }
                    },
                    pageParam:{
                        themeId:'',
                        statue:'special',
                        title: '日常关怀',
                        flag: true, //是否是由新会员首页进行跳转
                        crm_task_param_id: child.crm_task_param_id, //任务参数id
                        care_id: child.care_id  //主题id
                    },
                    name: 'clerk-clerkThemeName',
                    url: '../clerk/clerkThemeName.html',
                    rightPane: {
                        name: 'rightPane',
                        url: '../member/managerMemberSide.html'
                    }
                })
            }
        }
    });

    //获取个人提成
    var getPersonalData = function () {
        var _data = {
            max_create_time: new Date().Format('yyyy-MM-dd'),
            min_create_time: formatTime(),
        };
        var _url = '/app/auth/kpi/sumSales.do';

        var api_versions = 'v2';
        Http.ajax({
            data: {},
            api_versions: 'v3',
            url: '/app/auth/kpi/getOSSRlsKpiSetting.do',
            success: function (res) {
                if (res.code == 200) {
                    if (res.object && res.object.switch_api_set == 'APP') {
                        api_versions = 'v3';
                    }
                }
                Http.ajax({
                    api_versions: api_versions,
                    data: _data,
                    url: _url,
                    success: function (ret) {
                        logger.log({ "Type": "operation", "action": "店长首页获取店员数据", "Win_name": api.winName, "data": _data, "message": ret, "requireURL": _url })
                        if (ret.code == 200 && ret.object) {
                            homeList.sales_kpi_price = ret.object.sales_kpi_price || 0;
                        } else {
                            _g.hideProgress();
                            _g.toast(ret.message);
                        }
                    },
                    error: function (err) {
                        _g.hideProgress();
                    },
                });
            },
            error: function (err) {
                Http.ajax({
                    api_versions: api_versions,
                    data: _data,
                    url: _url,
                    success: function (ret) {
                        logger.log({ "Type": "operation", "action": "店长首页获取店员数据", "Win_name": api.winName, "data": _data, "message": ret, "requireURL": _url })
                        if (ret.code == 200 && ret.object) {
                            homeList.sales_kpi_price = ret.object.sales_kpi_price;
                        } else {
                            _g.hideProgress();
                            _g.toast(ret.message);
                        }
                    },
                    error: function (err) {
                        _g.hideProgress();
                    },
                });
            }
        });

    }
    getPersonalData();

    //获取个人营业额
    var getStaff = function(){
		var date = new Date();
		var min_create_time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		var max_create_time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		var _data= {
				min_create_time : min_create_time,
				max_create_time:max_create_time,
				sum_type:"Staff"
			};
		var _url='/app/auth/page/retail/sumStaffRetail.do';
		Http.ajax({
			data:_data,
			api_versions: 'v2',
			url:_url,
			success: function(res) {
				logger.log({"Type":"operation","action":"店员功能获取提成明细","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
				if (res.code == 200 && res.object) {
					homeList.total_sale_price = res.object.total_sale_price || 0.00;    //个人营业额
				} else {
                    _g.hideProgress();
					_g.toast(res.message);
				}
			},
			error: function(err) {
                _g.hideProgress();
            }
		});

	};
	getStaff();
    //获取主题
    var getTheme = function () {
        var _data = {
            publish_status: 'ongoing'
        };
        var _url = '/app/auth/crm/care/latest.do';
        Http.ajax({
            data: _data,
            url: _url,
            api_versions: 'v2',
            success: function (ret) {
                logger.log({ "Type": "operation", "action": "店长首页获取主题", "Win_name": api.winName, "data": _data, "message": ret, "requireURL": _url })
                if (ret.code == 200) {
                    var type = ret.object || {};
                    setTimeout(function () {
                        if (type) {
                            homeList.care_count = type.care_count || 0;
                        }
                    }, 0);
                } else {
                    _g.hideProgress();
                    _g.toast(ret.message);
                }
                //console.log(homeList.homeHeader)
            },
            error: function (err) {

                _g.hideProgress();
            },
        });
    }
    getTheme();

    function formatTime(time) {
        return _.map(transDateRange().split('-'), function (value) {
            return value.length >= 2 ? value : '0' + value;
        }).join('-');
    }

    // 起始日期，区间
    function transDateRange() {
        var now = new Date();
        var timeStamp;
        if (homeList.type === 'DAY') {
            return now.Format('yyyy-MM-dd');
        } else if (homeList.type === 'WEEK') {
            if (now.getDay() == 0) {
                timeStamp = now.getTime() - (24 * 60 * 60 * 1000) * 6;
            } else {
                timeStamp = now.getTime() - (24 * 60 * 60 * 1000) * (now.getDay() - 1);
            }
            var weekDate = new Date(timeStamp);
            return weekDate.getFullYear() + '-' + (weekDate.getMonth() + 1) + '-' + weekDate.getDate();
        } else if (homeList.type === 'MONTH') {
            return now.getFullYear() + '-' + (now.getMonth() + 1) + '-01';
        }
    };
    var getTarget = function () {
        var _url = '/app/auth/goal/store/latest.do';
        Http.ajax({
            data: {},
            api_versions: 'v2',
            url: _url,
            success: function (res) {
                logger.log({ "Type": "operation", "action": "店长首页获取目标", "Win_name": api.winName, "message": res, "requireURL": _url })
                res.object = res.object || {};
                if (res.code == 200) {
                    homeList.goal_setting_count = res.object.goal_setting_count ? res.object.goal_setting_count : 0;
                } else {
                    _g.toast(res.message);
                }
            },
            error: function (err) {
            }
        });
    };
    getTarget();

    //底部切换回主页的时候 主页回到顶部
    api.addEventListener && api.addEventListener({
        name: 'memberIndexToTop',
    }, function (ret, err) {
        homeList.activeTab = 0;
        window.scrollTo(0,0);
    });
    //选择门店后刷新页面
    api.addEventListener && api.addEventListener({
        name: 'selectStore',
    }, function (ret, err) {
        getPersonalData();
        getStaff();
        getTheme();
        getTarget();
    });

    // 监听安卓返回按钮事件
    api.addEventListener && api.addEventListener({
        name: 'keyback'
    }, function (ret, err) {
        api.closeWidget();
    });
    // var addScrollEvent = function () {
    //     var content = document.getElementById('homeBody');
    //     content.addEventListener('touchmove', function (e) {
    //         homeList.judgeScroll();
    //         // var moveEndX = e.changedTouches[0].pageX;
    //         // homeList.judgeScroll(moveEndX);
    //     });
    //     window.addEventListener('scroll', function (e) {
    //         homeList.judgeScroll();
    //     });
    // };
    // addScrollEvent();

    _g.setPullDownRefresh(function () {
        setTimeout(function () {
            getPersonalData();
            getStaff();
            getTheme();
            getTarget();
            MemberRebuildService.ifUpdate(function(){   //是否更新多级菜单配置
                homeList.tableList = _g.getLS('taskConf') || [];
            });
            api && api.hideProgress();
            // 2018-7-5更新
            // 广播刷新事件，获取未读客服信息条数
            api && api.sendEvent({
                name: 'note_refresh',
                extra: {}
            });
        }, 0)
    });
    module.exports = {};
});
