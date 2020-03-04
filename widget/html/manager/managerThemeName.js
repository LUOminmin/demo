define(function (require, exports, module) {
    var Http = require('U/http');
    var dialogBox = api.require('dialogBox');

    /**===== parameter & status =====**/
    var title =  (type == '日常关怀' || type =='复购提醒') ? '日常关怀' : '主题关怀';
    var type = api.pageParam.title
    type = (type == '日常关怀' || type =='复购提醒') ? 'usual' : 'special'
    var entId = api.pageParam.themeId || api.pageParam.careId;
    var flag = api.pageParam.flag || false; //标识是否是由新会员首页跳过来的
    var crm_task_param_id = api.pageParam.crm_task_param_id;    //任务参数id
    var care_id = api.pageParam.care_id;    //任务主题id
    //manager & clerk不需要orgId
    var orgId = '';

    var vm = new Vue({
        el: '#managerThemeName',
        template: _g.getTemplate('manager/managerThemeName-body-V'),
        data: {
            flag: flag,
            careId: entId,
            lastTime: "",
            isNoResult:false,
            isFirstLoading:true,
            list: [
                {
                    tel: '188 1234 1234',
                    uName: '徐佳莹',
                    hasRecall: false,
                    cardId: '123456789',
                    themeEnd: false,
                    recallTime: '02-08 10:05',
                    user_id: ''
                },
                {
                    tel: '188 1234 1234',
                    uName: '徐佳莹',
                    hasRecall: true,
                    cardId: '123456789',
                    themeEnd: false,
                    recallTime: '02-08 10:05',
                    user_id: ''
                },
                {
                    tel: '188 1234 1234',
                    uName: '',
                    hasRecall: false,
                    cardId: '123456789',
                    themeEnd: false,
                    recallTime: '02-08 10:05',
                    user_id: ''
                },
            ],
            ifSelect: false,
            selectorValue: "提醒状态",
            redmind_status: {
                '不限': '',
                '已提醒': 'visited',
                '未提醒': 'no_visit'
            },
            selItem1: false,
            selItem2: false,
            selItem3: false,
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
            this.list=[]
        },
        ready: function () {
            //设置noResultWrap的高度
            var h = api.frameHeight || window.screen.height
            document.getElementById('noResultWrap').style.height = h + 'px'
        },
        watch: {},
        computed:{
            isNoResult: function () {
                if(this.isFirstLoading) return false
                var sta = this.list.length === 0 ? true : false
                return sta
            },
            maskShow: function () {
                return this.typeListShow || this.sortListShow;
            }
        },
        filters: {
            toBtn: function (val) {
                var str = '';
                if (val) {
                    str = '回访记录';
                } else {
                    str = '未回访';
                }
                return str;
            },
            strName: function (val) {
                var str = val || "无姓名"
                return str;
            },
            encrept: function (val) {
                if(!val) return
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
                userTypePoint(title);
                getData();
            },
            //用户类型列表获取
            getTypeListValue: function (id) {
                this.typeListValue = this.typeListValue.concat({
                    typeNameValue: '宝ggrb宝',
                    typeValueID: '1',
                    checked: false,
                });
                // var _data = {
                //     //搜索用的参数
                //     id: id
                // };

                // var _url = '';
                // Http.ajax({
                //     data: _data,
                //     api_versions: 'v2',
                //     url: _url,

                //     success: function (res) {
                //         logger.log({ "Type": "operation", "action": "获取用户类型列表值", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url })
                //         if (res.success) {
                //             if(res.object && res.object.length > 0) {
                //                 var typeListValue = [];
                //                 for(var i = 0; i < res.object.length; i++) {
                //                     var item = {};
                //                     item.typeNameKey = res.object[i].xxx;
                //                     item.typeKeyID = res.object[i].xxx;
                //                     item.checked = false;
                //                     typeListValue.push(item);
                //                 }
                //                 vm.typeListValue = typeListValue;
                //             }
                //         } else {
                //             _g.toast(res.message);
                //         }
                //     },
                //     error: function (err) {
                //         _g.hideProgress();
                //         _g.toast(err.message);
                //     }
                // });
            },
            openSelector: function () {
                vm.selItem1 = false;
                vm.selItem2 = false;
                vm.selItem3 = false;
                vm.ifSelect = !vm.ifSelect;
            },
            selectStatus: function (name, index) {
                vm.selectorValue = name;
                vm['selItem' + index] = true;
                console.log('值  '+vm.selItem1+vm.selItem2+vm.selItem3);
                setTimeout(function () {
                    vm.ifSelect = false;
                    getData();
                    loadmore.reset();
                }, 100);
            }, 
            onThemeInput: function (i,user_id) {
                var self = this;
                event.stopPropagation()
                dialogBox.actionMenu({
                    rect: {
                        h: 130
                    },
                    items: [
                        {
                            text: '短信',
                            icon: 'widget://image/manager/alertDx.png'
                        },
                        {
                            text: '微信',
                            icon: 'widget://image/manager/alertWx.png'
                        },
                        {
                            text: '电话',
                            icon: 'widget://image/manager/alertPhone.png'
                        }
                    ],
                    styles: {
                        bg: '#FFF',
                        column: 3,
                        itemText: {
                            color: '#000',
                            size: 12,
                            marginT: 8
                        },
                        itemIcon: {
                            size: 60
                        }
                    },
                    tapClose: true
                }, function (ret) {
                    //记录最后一次弹出的时间
                    var myDate = new Date();
                    var day = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate()
                    var time = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds()
                    var data = day + " " + time;
                    vm.lastTime = data;
                    var visitType = '';
                    //调出底层通讯录
                    if (ret.index == 2) {
                        visitType = '电话';
                        dialogBox.close({
                            dialogName: 'actionMenu'
                        });
                        api.call({
                            type: 'tel_prompt',
                            number: this.list[i].tel
                        })

                    }
                    //调出微信
                    if (ret.index == 1) {
                        visitType = '微信';
                        dialogBox.close({
                            dialogName: 'actionMenu'
                        });
                        if (api.systemType == 'android') {//安卓
                            api.openApp({
                                androidPkg: 'com.tencent.mm',
                                mimeType: 'text/html',
                                uri: 'http://test.com'
                            }, function (ret, err) {
                            });
                        } else {//ios
                            api.openApp({
                                iosUrl: 'weixin://test.com', //打开微信的，其中weixin为微信的URL Scheme
                                appParam: {}
                            });
                        }
                    }
                    //调出短信
                    if (ret.index == 0) {
                        visitType = '短信';
                        dialogBox.close({
                            dialogName: 'actionMenu'
                        });
                        api.sms({
                            numbers: [this.list[i].tel],
                            text: ''
                        }, function (ret, err) {
                            if (ret && ret.status) {
                                //已发送
                            } else {
                                //发送失败
                            }
                        });

                    }
                    retrunVisitPoint(title,visitType);
                    _g.openWin({
                        header: {
                            data: {
                                title: '回访录入'
                            }
                        },
                        pageParam:{
                            entId: user_id,
                            list:self.list[i],
                            title:api.pageParam.title || '',
                            themeId: api.pageParam.themeId || api.pageParam.careId,
                            inputType: ret.index, //2--电话 1--微信 0--短信
                            care_id: care_id
                        },
                        name: 'member-clerkThemeInput',
                        url: '../member/clerkThemeInput.html',
                    });
                }.bind(this))
            },
            //入口---回访记录
            onReturnRecord: function (bVal,i) {
                if (!bVal) return;
                event.stopPropagation(); 
                _g.openWin({
                    header: {
                        data: {
                            title: '回访记录',
                            rightText: '回访'
                        }
                    },
                    pageParam:{
                        list:this.list[i],
                        title:api.pageParam.title || '',
                        themeId:this.list[i].themeId,
                        type:type
                    },
                    name: 'member-memberReturnRecord',
                    url: '../member/memberReturnRecord.html',
                });
                return false;
            },
            openDrawer: function () {
                api && api.openDrawerPane({
                    type: 'right'
                });
                this.typeListShow = false;
                this.sortListShow = false;
            }, 
            onMerberItem: function (memberId,i) {
                var _headerTitle = '会员详情';
                var _url = '../member/memberDetails.html';
                var _name = 'member-memberDetails';
                var _params = {
                    entId: memberId,
                    title: api.pageParam.title,
                    themeId: this.list[i].themeId,
                    type: type
                }
                goMemberDetail(title);
                if (vm.careId == 7) {
                    _headerTitle = '复购提醒'
                    _url = '../member/memberRePu.html';
                    _name = 'member-memberRePu';
                }
                _g.openWin({
                    header: {
                        data: {
                            title: _headerTitle
                        }
                    },
                    name: _name,
                    url: _url,
                    pageParam: _params,
                    bounces: false,
                    slidBackEnabled: false,
                });
            },
            onListShow: function (str, str1) {
                if(this.flag) return;
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
                    if(item.checked) {
                        list[0].checked = false;
                    }
                }
            },
            onSelect: function (item, list) {
                for (var i = 0; i < list.length; i++) {
                    list[i].checked = false;
                }
                item.checked = true;
            },
            onFold: function () {
                this.sortListShow = false;
            },
            blur: function() {
                this.sortListShow = this.typeListShow = false;
            },
            onSort: function(item) {
                sort_flag = item.sort_flag;
                sortTalkingData(title,item.sortName);
                getData();
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



    //获取会员信息
    var endNum = '',
        startNum = '',
        search = '';
        user_type = '';
        product_id = '';
        sku_code = '';
        brand_id = '';
        class_id = '';
        residue_day_start = '';
        residue_day_end = '';
        sort_flag = '';
        type_list = [];
        var start_consume_time = '';
        var end_consume_time = '';
        var start_buy_time = '';
        var end_buy_time = '';
        var tag_list = '';
        var start_integral = '';
        var end_integral = '';
        var user_level_id = '';
        var phoneSearch = '';
    var getData = function (opts, callback) {
        var _url = '/app/auth/crm/user/listCrmCareUser.do';
        opts = opts || {};
        var _data = {
            care_id: entId, //entId,//主题ID	number
            displayRecord: 10,//	行数	number
            page: opts.page || 1,//	页数	number
            start_num: startNum,//    开始编号    number
            end_num: endNum,// 结束编号    number
            search: search || '',//	会员手机/姓名/卡号	string
            type: type,

            user_type: user_type,
            product_id: product_id,
            sku_code: sku_code,
            brand_id: brand_id,
            class_id: class_id,
            sort_flag: sort_flag,
            type_list: (type_list && '[' + type_list.toString() + ']') || "",//  类型ID    array<number>   type_list:"[127,126]"
            end_integral: end_integral,//   结束积分    number
            start_integral: start_integral,//   开始积分    number
            start_consume_time: start_consume_time,
            start_buy_time: start_buy_time,
            end_buy_time: end_buy_time,
            end_consume_time: end_consume_time,
            tag_list: (tag_list && '[' + tag_list.toString() + ']') || "",//  标签ID    array<number>   格式：tag_list:"[127,126]"
            user_level_id: user_level_id,// 会员等级ID
            // redmind_status: vm.redmind_status[vm.selectorValue] || '',
            // user_type: user_type || 'all_user', //会员类型
            // product_id: product_id || '', //商品id
            // sku_code: sku_code || '', //规格编码
            // brand_id: brand_id || '', //品牌
            // class_id: class_id || '', //分类
            // residue_day_start: residue_day_start || '', //剩余天数开始
            // residue_day_end: residue_day_end || '', //剩余天数结束

        };
        if (entId == 7) { //复购提醒参数
            _data.redmind_status = vm.redmind_status[vm.selectorValue] || '';
            _data.user_type = user_type || 'all_user';
            _data.product_id = product_id || '';
            _data.sku_code = sku_code || '';
            _data.brand_id = brand_id || '';
            _data.class_id = class_id || '';
            _data.residue_day_start = residue_day_start || '';
            _data.residue_day_end = residue_day_end || '';
        }
        if(flag) {
            _url = '/app/auth/crm/user/listTaskCrmCareUser.do';  //新会员首页 新获取数据接口
            _data.crm_task_param_id = crm_task_param_id;
            _data.care_id = care_id;
            _data.gender = '-2';
            if(!_data.user_level_id) _data.user_level_id = '-2';
        }
        vm.typeListKey.forEach(function(v, i) {
            _data[v.user_data_custom] = [];
            v.typeListValue.forEach(function(v1, i1) {
                if(v1.checked) {
                    _data[v.user_data_custom].push({"comstom_value": v1.comstom_value});
                }
            });
            _data[v.user_data_custom] = JSON.stringify(_data[v.user_data_custom]) != '[{}]' && JSON.stringify(_data[v.user_data_custom]) != '[]' ? JSON.stringify(_data[v.user_data_custom]) : '';
        });

        Http.ajax({
            data: _data,
            api_versions: 'v2',
            url: _url,
            isSync: true,
            success: function (res) {
                logger.log({ "Type": "operation", "action": "获取主题关怀数据", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url })
                vm.isFirstLoading = false
                console.log(res)
                if (res.success) {
                    if(opts.page && opts.page > 1){
                        setTimeout(function () {
                            callback && callback(res)
                        },0)
                    }else{
                        /*if(_g.isEmpty(res.object)){
                            vm.isNoResult = true
                            return
                        }
                        vm.isNoResult = false*/
                        vm.list = getItem(res)
                    }

                } else {
                    _g.toast(res.message);
                    setTimeout(function () {
                        callback && callback(res)
                    },0)
                }
            },
            error: function (err) {
                vm.isFirstLoading = false
                _g.hideProgress();
                _g.toast(err.message);
            }
        })
    };
    var getUserTypeData = function() {
        if(flag) return;
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
    var getItem = function (res) {
        return _.map(res.object, function (item,i) {
                return {
                    cardId: item.card_no,	//会员卡号	string
                    hasRecall: item.is_visit,//	是否已经回访	number
                    recallTime: item.last_visit_time,//最后回访时间	string
                    tel: item.phone,	//会员手机号	string
                    themeEnd: item.status === 'end' ? true : false,	//主题状态	string	未发布undeploy 进行中ongoing 已结束end 已回访visited
                    user_id: item.user_id, //会员ID	number
                    uName: item.user_name,	//会员名称	string
                    sex:item.sex,
                    themeId:item.care_id,
                    num:item.num || i
                }
            }
        )
    }

    var loadmore = new Loadmore({
        callback: function(page){
            getData({page: page.page}, function(data){
                if(!data.object || data.object.length === 0){
                    return loadmore.loadend(false);
                }else{
                    vm.list = vm.list.concat(getItem(data));
                    loadmore.loadend(true);
                }
            });
        }
    });

    _g.setPullDownRefresh(function () {
        setTimeout(function(){
            memberListPoint(title,'下拉刷新');
            getData();
            loadmore.reset();
        },0)
    });
    api.addEventListener && api.addEventListener({
        name: 'ThemeCallBack1'
    }, function (ret, err) {
        //如果是日常主题入口，和会员共用一套日常主题页面
        _g.openWin({
            header: {
                data: {
                    title: '回访进度',
                }
            },
            pageParam:{
                entId:entId,
                title:api.pageParam.title
            },
            name: 'manager-managerThemeCallBack1',
            url: '../manager/managerThemeCallBack1.html',
        });
    });
    //搜索响应
    api.addEventListener && api.addEventListener({
        // name: 'themeNameSearch'
        name: 'search'
    }, function (ret, err) {
        // endNum = ret.value.endNum;
        // startNum = ret.value.startNum;
        // search = ret.value.pNumber;
        // user_type = ret.value.user_type || '';
        // product_id = ret.value.product_id || '';
        // sku_code = ret.value.sku_code || '';
        // brand_id = ret.value.brand_id || '';
        // class_id = ret.value.class_id || '';
        // residue_day_start = ret.value.leftDaysFrom || '';
        // residue_day_end = ret.value.leftDaysTo || '';
        //
        screenTalkingData(title);
        logger.log({ "Type": "operation", "action": "搜索会员信息", "Win_name": api.winName });
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
            sku_code = ret.value.product_code || "";
            brand_id = '';
            class_id = '';
        }else if(ret.value.PBC_type == '2') {
            brand_id = ret.value.PBC_id || "";
            product_id = '';
            sku_code = '';
            class_id = '';
        }else if(ret.value.PBC_type == '3') {
            class_id = ret.value.PBC_id || "";
            brand_id = '';
            product_id = '';
            sku_code = '';
        }
        getData();
    });

    api.addEventListener && api.addEventListener({
        name: 'reload-visitList'
    }, function(ret, err) {
        getData();
    });

    getData();
    getUserTypeData();

});
