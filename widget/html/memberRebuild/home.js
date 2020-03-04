define(function (require, exports, module) {
    var Http = require('U/http');
    var MemberRebuildService = require('S/MemberRebuildService');
    var typeMap = ['DAY', 'WEEK', 'MONTH'];
    var homeList = new Vue({
        el: '#index',
        template: _g.getTemplate('memberRebuild/home-body-V'),
        data: {
            showList: [   //空对象为排版需要
                {
                    title: '需支出提成',
                    value: 'sum_kpi_price',
                    name: 'boss-shopRank',   //点击跳转页面名
                    url: '../boss/shopRank.html',  //点击跳转页面
                    headData: {   //头部参数
                        data: {
                            active: 0,
                            list: ['日', '周', '月'],
                            rightText: '店员'
                        },
                        template: '../html/header/header-date-V',
                    },
                    bounces: false,
                },
                {
                    title: '预估毛利 ',
                    value: 'estimate_profit'
                },
                {
                    title: '客单价 ',
                    value: 'avg_sale_price'
                },
                {
                    title: '来客数 ',
                    value: 'total_customer',
                    noDeal: true,
                },
                {
                    title: '企业新增会员 ',
                    value: 'userCount',
                    noDeal: true,
                    name: 'boss-memberIndex',
                    url: '../boss/memberIndex.html',
                    headData: {
                        data: {
                            title: '会员管理'
                        },
                    },
                }, {},
                // {
                //     title: '进行中的任务 ',
                //     value: 'goal_setting_count',
                //     noDeal: true,
                //     url: '../boss/targetManage.html',
                //     name: 'boss-targetManage',
                //     headData: {
                //         data: {
                //             title: '目标管理',
                //             rightText: '历史目标',
                //         }
                //     },
                //     bounces: true,
                // },
                // {
                //     title: '进行中的关怀 ',
                //     value: 'care_count',
                //     noDeal: true,
                //     url: '../boss/bossTheme.html',
                //     name: 'boss-bossTheme',
                //     headData: {
                //         data: {
                //             title: '主题关怀',
                //         }
                //     },
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
                    title: '企业目标',
                    count: 'goal_setting_count',
                    url: '../boss/targetManage.html',
                    name: 'boss-targetManage',
                    headData: {
                        data: {
                            title: '目标管理',
                            rightText: '历史目标',
                        }
                    },
                    bounces: true,
                },
                {
                    icon: "url('../../image/memberRebuild/royalty.png')",
                    title: '关怀任务',
                    count: 'care_count',
                    url: '../boss/bossTheme.html',
                    name: 'boss-bossTheme',
                    headData: {
                        data: {
                            title: '主题关怀',
                        }
                    },
                },
                {
                    icon: "url('../../image/memberRebuild/analysis.png')",
                    title: '企业销售',
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
            sum_kpi_price: 0,   //今日需支出提成
            total_sale_price: 0,    //企业营业额
            estimate_profit: 0, //预估毛利
            avg_sale_price: 0,  //客单价
            total_customer: 0,  //来客数
            userCount: 0,   //企业新增会员
            goal_setting_count: 0,    //进行中的任务
            care_count: 0,  //进行中的关怀
            shopName: null,
            type: "DAY", //头部日、周、月类型;
        },
        watch: {
            type: function () {
                getData();
            },
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
        // computed: {
        //     scrollHeight: {
        //         get: function() {
        //             alert( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
        //             return  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //         }
        //     }
        // },
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
                _g.openWin({
                    header: {
                        data: {
                            active: 0,
                            list: ['日', '周', '月'],
                            rightText: '筛选'
                        },
                        template: '../html/main/home-date-header-V',
                    },
                    name: 'statistics-bossWeekturnover',
                    url: '../statistics/bossWeekturnover.html',
                    pageParam: {
                        shopName: homeList.shopName
                    },
                    bounces: false,
                    slidBackEnabled: false
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
                // self.scrollAnima(tableOffsetTop);
                window.scrollTo(0, tableOffsetTop);  //移动到对应的菜单
            },
            // scrollAnima: function(targetPageY) { //滚动过渡动画
            //     var timer = setInterval(function () {
            //         var currentY = document.documentElement.scrollTop || document.body.scrollTop;//当前及滑动中任意时刻位置
            //         var distance = targetPageY > currentY ? targetPageY - currentY : currentY - targetPageY;//剩余距离
            //         var speed = Math.ceil(distance/10);//每时刻速度
            //         console.log(targetPageY+'===='+currentY)
            //         if (currentY - targetPageY <= 0.5) {
            //             console.log(targetPageY+'===='+currentY)
            //             clearInterval(timer);
            //         } else {
            //             console.log(targetPageY+'===='+currentY)
            //             window.scrollTo(0,targetPageY > currentY ? currentY + speed : currentY - speed);
            //         }
            //     },100);
            // },
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
                            title: child.task_config_menu_name || '回访进度'
                        }
                    },
                    name: 'boss-bossThemeCallBack2',
                    url: '../boss/bossThemeCallBack2.html',
                    rightPane: {
                        name: 'rightPane',
                        url: '../boss/bossThemeCallBackSide.html',
                    },
                    pageParam: {
                        themeType: 'usual',
                        careId: child.care_id
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
        };
        var _url = '/app/auth/page/retail/indexSumSaleV2.do';
        Http.ajax({
            data: _data,
            url: _url,
            api_versions: 'v2',
            success: function (ret) {
                logger.log({ "Type": "operation", "action": "获取老板首页营业数据", "Win_name": api.winName, "data": _data, "message": ret, "requireURL": _url })
                if (ret.code == 200) {
                    var dt = ret.object || {};
                    setTimeout(function () {
                        if (dt) {
                            homeList.estimate_profit = dt.estimate_profit || 0; //预估毛利
                            homeList.avg_sale_price = dt.avg_sale_price || 0;   //客单价
                            homeList.total_customer = dt.total_customer || 0;   //来客数
                            var n = dt.total_sale_price// 企业营业额
                            if (Number(n) > 0) {
                                numberGrow(n)
                            } else {
                                homeList.total_sale_price = n
                            }
                        }
                    }, 0);
                } else {
                    _g.hideProgress();
                    _g.toast(ret.message);
                }
            },
            error: function (err) {
                // homeList.homeHeader = {
                //     // isCheck:false,
                //     avg_sale_price: 000,
                //     current_date: '',
                //     estimate_profit: 000,
                //     total_customer: 000,
                //     total_sale_price: 000,
                //     total_sale_profit: 000,
                //     un_audit_num: 000,
                // }
                _g.hideProgress();
            },
        });
    };

    //获取新增会员数
    var getGraph = function () {
        var today = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime() + 1000*60*60*24;
        var week = today - 1000 * 60 * 60 * 24;
        Http.ajax({
            data: {
                endAt: today,
                startAt: week
            },
            api_versions: 'v2',
            url: '/app/auth/crm/user/listChart.do',
            success: function (res) {
                if (res.code == 200) {
                    var obj = res.object || {};
                    homeList.userCount = obj.userCount || 0; //今日新增会员数
                } else {
                    //_g.toast(res.message);
                }
            },
            error: function (err) {
            }
        })
    };
    getGraph();

    /**
     * 从0开始,在2s内增长到指定数值
     * @param [number]
     * */
    function numberGrow(number) {
        number = Number(number);
        if (isNaN(number)) number = 0;
        var timeStep = 24, // 每个step需要的时间
            time = 2000, // 总时间
            num = number, //要显示的真实数值
            step = num * timeStep / time, // 每24ms增加的数值
            start = 0, // 计数器
            interval, // 定时器
            showNum = '0';
        interval = setInterval(function () {
            start = start + step;
            if (start >= num) {
                start = num;
                clearInterval(interval);
                interval = null;
            }
            showNum = start | 0 //不能影响start的值
            homeList.total_sale_price = showNum;
        }, timeStep);
    }

    getData();

    //获取 今天需支出提成
    var getBonus = function () {
        var _data = {
            max_create_time: new Date().Format('yyyy-MM-dd'),
            min_create_time: new Date().Format('yyyy-MM-dd'),
            org_type: 'Company'
        };
        var _url = '/app/auth/kpi/sum.do';

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
                    data: _data,
                    api_versions: api_versions,
                    url: _url,

                    success: function (res) {
                        logger.log({ "Type": "operation", "action": "老板首页获取总营业额", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url })
                        if (res.code == 200) {
                            homeList.sum_kpi_price = res.object.sum_kpi_price || 0;  //今日需要支出的提成
                            homeList.shopName = res.object.store_name;
                            api && api.sendEvent({
                                name: 'getShopName',
                                extra: {
                                    name: res.object.store_name,
                                }
                            })
                        } else {
                            _g.toast(res.message);
                        }
                    },
                    error: function (err) {
                    }
                });
            },
            error: function (err) {
                Http.ajax({
                    data: _data,
                    api_versions: api_versions,
                    url: _url,

                    success: function (res) {
                        logger.log({ "Type": "operation", "action": "老板首页获取总营业额", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url })
                        if (res.code == 200) {
                            homeList.sum_kpi_price = res.object.sum_kpi_price || 0;
                            homeList.shopName = res.object.store_name;
                            api && api.sendEvent({
                                name: 'getShopName',
                                extra: {
                                    name: res.object.store_name,
                                }
                            })
                        } else {
                            _g.toast(res.message);
                        }
                    },
                    error: function (err) {
                    }
                });
            }
        });

    };
    getBonus();

    //进行中的任务
    var getTarget = function () {
        var _url = '/app/auth/goal/company/latest.do';
        Http.ajax({
            data: {},
            api_versions: 'v2',
            url: _url,
            success: function (res) {
                logger.log({ "Type": "operation", "action": "老板首页获取目标", "Win_name": api.winName, "message": res, "requireURL": _url })
                if (res.code == 200) {
                    res.object = res.object ? res.object : {};
                    homeList.goal_setting_count = res.object.goal_setting_count ? res.object.goal_setting_count : 0;    //进行中的任务
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
                logger.log({ "Type": "operation", "action": "老板首页获取主题", "Win_name": api.winName, "data": _data, "message": ret, "requireURL": _url })
                if (ret.code == 200) {
                    var type = ret.object || {};
                    setTimeout(function () {
                        if (type) {
                            homeList.care_count = type.care_count;    //进行中的关怀
                        }
                    }, 0);
                } else {
                    _g.hideProgress();
                    _g.toast(ret.message);
                }
                console.log(homeList.homeHeader)
            },
            error: function (err) {

                _g.hideProgress();
            },
        });
    }
    getTheme();

    _g.setPullDownRefresh(function () {
        setTimeout(function () {
            getData();
            getGraph();
            getBonus();
            getTarget();
            getTheme();
            MemberRebuildService.ifUpdate(function(){   //是否更新多级菜单配置
                homeList.tableList = _g.getLS('taskConf') || [];
            });
            // 广播刷新事件，获取未读客服信息条数
            api.sendEvent({
                name: 'note_refresh',
                extra: {}
            });
        }, 0)
    });

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
    }

    // 监听安卓返回按钮事件
    api && api.addEventListener({
        name: 'keyback'
    }, function (ret, err) {
        api.closeWidget();
    });
    //页面刷新数据
    api && api.addEventListener({
        name: 'selectStore',
    }, function (ret, err) {
        location.reload();
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
    module.exports = {};
});
