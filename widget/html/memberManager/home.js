define(function (require, exports, module) {
    var Http = require('U/http');
    var MemberRebuildService = require('S/MemberRebuildService');
    var homeList = new Vue({
        el: '#index',
        template: _g.getTemplate('memberManager/home-body-V'),
        data: {
            showList: [   //空对象为排版需要
                {
                    title: '门店客单价',
                    value: 'avg_sale_price' //数据对应的data属性值
                },
                {
                    title: '门店来客数 ',
                    value: 'total_customer',
                    noDeal: true
                },
                {
                    title: '门店新增会员 ',
                    value: 'userCount',
                    noDeal: true,   //数据是否需要过滤
                    name: 'menber-home-frame',
                    url: '../manager/memberIndex.html',
                    headData: {
                        data: {
                            title: '会员管理'
                        },
                    },
                    bounces: true,
                },
                {
                    title: '个人营业额 ',
                    value: 'total_sale_price',
                    name: 'statistics-weekturnover',
                    url: '../statistics/weekturnover.html',
                    headData: {
                        data: {
                            active: 0,
                            list: ['日', '周', '月'],
                            rightText: '筛选'
                        },
                        template: '../html/main/home-date-header-V',
                    }
                },
                {
                    title: '个人提成 ',
                    value: 'sales_kpi_price',
                    name: 'manager-managerCommission',
                    url: '../manager/managerCommission.html',
                    headData: {
                        data: {
                            title: '我的提成',
                        }
                    },
                    bounces: true,
                }, {},
                // {
                //     title: '进行中的任务 ',
                //     value: 'goal_setting_count',
                //     noDeal: true,
                //     name: 'manager-targetManage',
                //     url: '../manager/targetManage_manager.html',
                //     headData: {
                //         data: {
                //             title: '目标管理',
                //             rightText: '历史目标',
                //         }
                //     },
                // },
                // {
                //     title: '进行中的关怀 ',
                //     value: 'care_count',
                //     noDeal: true,
                //     name: 'manager-managerTheme',
                //     url: '../manager/managerTheme.html',
                //     headData: {
                //         data: {
                //             title: '主题关怀',
                //         }
                //     }
                // }, {}
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
                    title: '门店目标',
                    count: 'goal_setting_count',
                    name: 'manager-targetManage',
                    url: '../manager/targetManage_manager.html',
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
                    name: 'manager-managerTheme',
                    url: '../manager/managerTheme.html',
                    headData: {
                        data: {
                            title: '主题关怀',
                        }
                    }
                },
                {
                    icon: "url('../../image/memberRebuild/analysis.png')",
                    title: '门店销售',
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
            tableList: [],  //菜单列表
            activeTab: 0,  //当前选中的一级菜单
            tabOffSetHeight: 0,  //tab距离顶部的高度
            isFixScroll: false,
            store_total_sale_price: 0,  //门店营业额
            total_customer: 0,  //门店来客数
            avg_sale_price: 0,   //门店客单价
            userCount: 0,   //新增会员数
            total_sale_price: 0,    //个人营业额
            sales_kpi_price: 0, //个人提成
            goal_setting_count: 0,    //进行中的任务
            care_count: 0,  //进行中的关怀
            flag: true,
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
                var self = this;
                self.jumpUrl('showList',3); //后面传的序号为营业额在showList的位置
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
            childClick: function (child) {  //二级菜单点击
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
                _g.openDrawerLayout({   //跳转到日常关怀页面
                    header: {
                        data: {
                            title: child.task_config_menu_name || '日常关怀',
                            rightText: '进度',
                        }
                    },
                    pageParam: {
                        themeId: '',
                        title: '日常关怀',
                        flag: true,
                        crm_task_param_id: child.crm_task_param_id, //任务参数id
                        care_id: child.care_id  //主题id
                    },
                    name: 'manager-managerThemeName',
                    url: '../manager/managerThemeName.html',
                    rightPane: {
                        name: 'rightPane',
                        url: '../member/managerMemberSide.html'
                    }
                })
            }
        }
    });
    var getData = function () {
        var _data = {
            date_type: homeList.type,
            max_create_time: new Date().Format('yyyy-MM-dd'),
            min_create_time: formatTime(),
            org_type: 'Store'
        };
        var _url = '/app/auth/page/retail/indexSumSaleV2.do';
        Http.ajax({
            data: _data,
            url: _url,
            api_versions: 'v2',
            success: function (ret) {
                logger.log({ "Type": "operation", "action": "店长首页数据获取", "Win_name": api.winName, "data": _data, "message": ret, "requireURL": _url })
                if (ret.code == 200) {
                    var dt = ret.object;
                    if (dt) {
                        homeList.avg_sale_price = dt.avg_sale_price || 0;    //门店客单价
                        homeList.total_customer = dt.total_customer || 0;    //门店来客数
                        homeList.store_total_sale_price = dt.total_sale_price || 0;  //门店营业额
                    }
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
    getData()

    //获取目标
    var getTarget = function () {
        var _url = '/app/auth/goal/store/latest.do';
        Http.ajax({
            data: {},
            api_versions: 'v2',
            url: _url,
            success: function (res) {
                logger.log({ "Type": "operation", "action": "店长首页获取目标", "Win_name": api.winName, "message": res, "requireURL": _url })
                res.object = res.object || {};
                if (res.code == 200 && res.object) {
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
                        if (type) {
                            homeList.care_count = type.care_count;
                        }
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
    getTheme();

    // 获取个人营业额
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
				logger.log({"Type":"operation","action":"店长的店员功能提成数据获取","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
				if (res.code == 200 && res.object) {
					homeList.total_sale_price = res.object.total_sale_price || 0;    //个人营业额
				} else {
					_g.hideProgress();
                    _g.toast(ret.message);
				}
			},
			error: function(err) {
                _g.hideProgress();
			}
		});

	};
    getStaff();
    
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

    //获取新增会员数
    var getGraph = function () {
        //new Date().toLocalDateString 会有格式化的问题
        var today = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime()+ 1000*60*60*24
        var week = today - 1000 * 60 * 60 * 24;
        var _data= {
                endAt: today,
                startAt: week
            };
        var _url='/app/auth/crm/user/listChart.do';
        Http.ajax({
            data:_data,
            api_versions: 'v2',
            url:_url,
            success: function (res) {
                logger.log({"Type":"operation","action":"获取七天新增会员曲线图数据","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
                if (res.code == 200 && res.object) {
                    homeList.userCount = res.object.userCount || 0;
                } else {
                    _g.toast(res.message);
                    _g.hideProgress();
                }
            },
            error: function (err) {
                _g.hideProgress();
            }
        })
    };
    getGraph();


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
        getData();
        getTarget();
        getTheme();
        getStaff();
        getPersonalData();
        getGraph();
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
            getData();
            getTarget();
            getTheme();
            getStaff();
            getPersonalData();
            getGraph();
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
