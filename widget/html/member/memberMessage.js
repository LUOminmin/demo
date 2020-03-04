define(function (require, exports, module) {
    var Http = require('U/http');
    var vm = new Vue({
        el: '#memberMessage',
        template: _g.getTemplate('member/memberMessage-body-V'),
        data: {
            isFirstLoading: true,
            isNoResult: false,
            list: [
                {
                    memberPhone: '18800000000',
                    memberCard: '123456789',
                    memberName: '方先生',
                    memberSex: 1,
                    memberOld: '80后',
                    memberVip: 1,
                    memberIntegral: 520,
                    tagList: ['80后', '小清新', '测试一下']
                },
                {
                    memberPhone: '18811111111',
                    memberCard: '123456789',
                    memberName: '薛小姐',
                    memberSex: 2,
                    memberOld: '90后',
                    memberVip: 1,
                    memberIntegral: 300,
                    tagList: ['80后', '老不死', '测试一下']
                }
            ],
            sortList: [
                {
                    sortName: '最近回访时间',
                    sort_flag: '',
                    checked: true
                },
                {
                    sortName: '注册时间优先',
                    sort_flag: '1',
                    checked: false
                },
                {
                    sortName: '最后消费时间优先',
                    sort_flag: '2',
                    checked: false
                },
                {
                    sortName: '高积分优先',
                    sort_flag: '3',
                    checked: false
                }
            ],
            typeListKey: [
                {
                    typeNameKey: '宝宝阶段',
                    checked: true,
                    user_data_custom: 'baby_grow_stages',
                    typeListValue: [
                        // {
                        //     typeNameValue: '宝宝111',
                        //     comstom_value: 'asd',
                        //     checked: false,
                        // },
                    ],
                },
                {
                    typeNameKey: '孕妈妈',
                    checked: false,
                    user_data_custom: 'pregnant_mother_stages',
                    typeListValue: [],
                },
                {
                    typeNameKey: '新会员',
                    checked: false,
                    user_data_custom: 'new_member_stages',
                    typeListValue: [],
                },
                {
                    typeNameKey: '宝宝生日',
                    checked: false,
                    user_data_custom: 'baby_birthdays',
                    typeListValue: [],
                },
            ],
            typeListShow: false,
            sortListShow: false,

        },
        created: function () {
            this.list = [];
        },
        ready: function () {
            //设置noResultWrap的高度
            var h = api.frameHeight || window.screen.height
            document.getElementById('noResultWrap').style.height = h + 'px'
        },
        watch: {},
        computed: {
            isNoResult: function () {
                if (this.isFirstLoading) return false
                var sta = this.list.length === 0 ? true : false
                return sta
            },
            maskShow: function () {
                return this.typeListShow || this.sortListShow;
            }
        },
        filters: {
            encrept: function (val) {
                if (!val) return
                var str = val
                var a = str.slice(0, 3)
                var b = str.slice(7)
                str = a + '****' + b
                return str
            }
        },
        methods: {
            //用户类型筛选确定
            ensure: function() {
                this.typeListShow = false;
                userTypePoint("会员信息");
                getData();
                loadmore.reset();
            },
            onMemberFiller: function () {
                api.openDrawerPane({
                    type: 'right'
                });
                this.typeListShow = false;
                this.sortListShow = false;
            },
            onMerberItem: function (memberId) {
                goMemberDetail("会员信息");
                _g.openWin({
                    header: {
                        data: {
                            title: '会员详情'
                        }
                    },
                    pageParam: {
                        entId: memberId
                    },
                    name: 'member-memberDetails',
                    url: '../member/memberDetails.html',
                    bounces: false,
                    slidBackEnabled: false,
                });
            },
            onListShow: function (str, str1) {
                this[str] = !this[str];
                if (this[str]) {
                    this[str1] = false;
                }
            },
            onChecked: function (i, item, list) {
                if(i == 0 && !item.checked) {
                    list.forEach(function(v1, i1) {
                        v1.checked = false;
                    });
                    item.checked = !item.checked;
                }
                if(i > 0) {
                    item.checked = !item.checked;
                    for(var j = 1; j < list.length; j++) {
                        if(list[j].checked) {
                            list[0].checked = false;
                            break;
                        }
                        if(j == list.length - 1) {
                            list[0].checked = true;
                        }
                    }
                }
            },
            onSelect: function (item, list) {
                for (var i = 0; i < list.length; i++) {
                    list[i].checked = false;
                }
                item.checked = true;
                sortTalkingData('会员信息',item.sortName);
            },
            blur: function() {
                this.sortListShow = this.typeListShow = false;
            },
            onSort: function(item) {
                sort_flag = item.sort_flag;
                this.sortListShow = false;
                getData();
                loadmore.reset();
            },
            reset: function() {
                for(var i = 0; i < this.typeListKey.length; i++) {
                    for(var j = 0; j < this.typeListKey[i].typeListValue.length; j++) {
                        this.typeListKey[i].typeListValue[j].checked = false;
                    }
                    this.typeListKey[i].typeListValue[0].checked = true;
                }
            }
        }
    });
    var start_consume_time = '';
    var end_consume_time = '';
    var start_buy_time = '';
    var end_buy_time = '';
    var user_type = '';
    var product_id = '';
    var product_code = '';
    var brand_id = '';
    var class_id = '';
    var tag_list = '';
    var start_integral = '';
    var end_integral = '';
    var user_level_id = '';
    var phoneSearch = '';
    var sort_flag = '';
    var getData = function (opts, callback) {
        var opts = opts || {};
        var _data = {
            displayRecord: 10,
            page: opts.page || 1,
            //搜索用的参数
            end_integral: end_integral,//   结束积分    number
            start_integral: start_integral,//   开始积分    number
            start_consume_time: start_consume_time,
            end_consume_time: end_consume_time,
            start_buy_time: start_buy_time,
            end_buy_time: end_buy_time,
            user_type: user_type,
            product_id: product_id,
            sku_code: product_code,
            brand_id: brand_id,
            class_id: class_id,
            sort_flag: sort_flag,
            tag_list: (tag_list && '[' + tag_list.toString() + ']') || "",//  标签ID    array<number>   格式：tag_list:"[127,126]"
            user_level_id: user_level_id,// 会员等级ID
            search: phoneSearch
        };
        vm.typeListKey.forEach(function(v, i) {
            _data[v.user_data_custom] = [];
            v.typeListValue.forEach(function(v1, i1) {
                if(v1.checked) {
                    _data[v.user_data_custom].push({"comstom_value": v1.comstom_value});
                }
            });
            _data[v.user_data_custom] = JSON.stringify(_data[v.user_data_custom]) != '[{}]' && JSON.stringify(_data[v.user_data_custom]) != '[]' ? JSON.stringify(_data[v.user_data_custom]) : '';
        });

        var _url = '/app/auth/crm/user/listCrmUser.do';
        // logger.log({ "Type": "operation", "action": "获取会员数据", "Win_name": api.winName, "data": _data, "message": '====', "requireURL": _url })
        Http.ajax({
            data: _data,
            api_versions: 'v2',
            url: _url,

            success: function (res) {
                logger.log({ "Type": "operation", "action": "获取会员数据", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url })
                vm.isFirstLoading = false
                if (res.success) {
                    if (opts.page && opts.page > 1) {
                        setTimeout(function () {
                            callback && callback(res);
                        }, 0);
                    } else {
                        /*if(_g.isEmpty(res.object)){
                            vm.isNoResult = true
                            return
                        }
                        vm.isNoResult = false*/
                        setTimeout(function () {
                            vm.list = getItemList(res);
                        }, 0);
                    }
                } else {
                    _g.toast(res.message);
                    callback && callback(res);
                }
            },
            error: function (err) {
                vm.isFirstLoading = false
                _g.hideProgress();
                _g.toast(err.message);
            }
        });
    };
    var getUserTypeData = function() {
        var _data = {};

        var _url = '/app/auth/crm/user/listUserDataCustom.do';
        Http.ajax({
            data: _data,
            api_versions: 'v2',
            url: _url,

            success: function (res) {
                logger.log({ "Type": "operation", "action": "获取用户类型数据", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url })
                if (res.success) {
                    vm.typeListKey.forEach(function(v, i) {
                        var arr = [{
                            typeNameValue: '全部',
                            // comstom_value: '',
                            checked: true,
                        }];
                        for(var key in res.object) {
                            if(v.user_data_custom == key) {
                                res.object[key].forEach(function(v1, i1) {
                                    var obj = {};
                                    obj.typeNameValue = v1.comstom_name;
                                    obj.comstom_value = v1.comstom_value;
                                    obj.checked = false;
                                    arr.push(obj);
                                });
                            }
                        }
                        v.typeListValue = arr;
                    });
                    
                } else {
                    _g.toast(res.message);
                }
            },
            error: function (err) {
                _g.hideProgress();
                _g.toast(err.message);
            }
        });
    };

    //格式化列表
    var getItemList = function (res) {
        return _.map(res.object, function (item) {
            return {
                memberPhone: item.phone,//手机
                memberCard: item.card_no,//卡号
                memberName: item.user_name,//名称
                memberOld: getMemberOld(item.birthday),//几零后
                memberId: item.user_id,//会员ID
                memberSex: item.sex,//性别
                memberVip: getVip(item.user_level_name),//会员等级
                memberIntegral: item.integral ? item.integral : 0,//积分
                tagList: getTagList(item.tag_list)//标签列表

            }
        })
    };

    var getVip = function (res) {
        switch (res) {
            case 'V1':
                return 1;
            case 'V2':
                return 2;
            case 'V3':
                return 3;
            case 'V4':
                return 4;
            case 'V5':
                return 5;
            case 'V6':
                return 6;
            case 'V7':
                return 7;
            case 'V8':
                return 8;
            case 'V9':
                return 9;
            case 'V10':
                return 10;
            case 'V11':
                return 11;

        }
    }
    //标签列表
    var getTagList = function (res) {
        return _.map(res, function (item) {
            return {
                tag_name: item.tag_name,//标签名称
                tag_id: item.tag_id,//标签Id
                is_selected: item.is_selected//是否选中
            }
        })
    };
    //格式化是几零后
    var getMemberOld = function (res) {
        if (res) {
            var selfYear = res.split("-")[0];
            var num = selfYear.split("");
            return num[2] + "0后";
        }
    }
    //分页
    var loadmore = new Loadmore({
        callback: function (page) {
            getData({ page: page.page }, function (data) {
                if (!data.object || data.object.length === 0) {
                    return loadmore.loadend(false);
                } else {
                    vm.list = vm.list.concat(getItemList(data));
                    loadmore.loadend(true);
                }
            });
        }
    });
    //搜索会员信息
    api.addEventListener && api.addEventListener({
        name: 'search'
    }, function (ret, err) {
        logger.log({ "Type": "operation", "action": "搜索会员信息", "Win_name": api.winName });
        screenTalkingData("会员信息");
        start_consume_time = ret.value.start_consume_time || "";
        end_consume_time = ret.value.end_consume_time || "";
        start_buy_time = ret.value.start_buy_time || "";
        end_buy_time = ret.value.end_buy_time || "";
        tag_list = (ret.value.tag_list && ret.value.tag_list.length > 0) ? ret.value.tag_list : '';
        start_integral = ret.value.start_integral || "";
        end_integral = ret.value.end_integral || "";
        user_level_id = ret.value.user_level_id || "";
        user_type = ret.value.user_type || "";
        if(ret.value.PBC_type == '1') {
            product_id = ret.value.PBC_id || "";
            product_code = ret.value.product_code || "";
            brand_id = '';
            class_id = '';
        }else if(ret.value.PBC_type == '2') {
            brand_id = ret.value.PBC_id || "";
            product_id = '';
            product_code = '';
            class_id = '';
        }else if(ret.value.PBC_type == '3') {
            class_id = ret.value.PBC_id || "";
            brand_id = '';
            product_id = '';
            product_code = '';
        }
        getData();
        loadmore.reset();
    });

    //搜索手机号码卡号
    api.addEventListener && api.addEventListener({
        name: 'search-input'
    }, function (ret, err) {
        memberPhoneSearchPoint('会员信息');
        logger.log({ "Type": "operation", "action": "搜索手机号码卡号", "Win_name": api.winName });
        phoneSearch = ret.value.searchInput || "";
        getData();
        loadmore.reset();
    });

    _g.setPullDownRefresh(function () {
        setTimeout(function () {
            memberListPoint('会员信息','下拉刷新');
            getData();
            loadmore.reset();
        }, 0)
    });
    //标签返回刷新
    api.addEventListener && api.addEventListener({
        name: 'memberTagReload'
    }, function (ret, err) {
        getData();
        loadmore.reset();
    })
    //会员信息新增刷新
    api.addEventListener && api.addEventListener({
        name: 'refresh-addMember'
    }, function (ret, err) {
        getData();
        loadmore.reset();
    });
    //编辑刷新
    api.addEventListener && api.addEventListener({
        name: 'refresh-editMember'
    }, function (ret, err) {
        getData();
        loadmore.reset();
    })

    getData();
    loadmore.reset();
    getUserTypeData();

    module.exports = {};
});
