define(function (require, exports, module) {
    console.log('api.pageParam.themeId ' + api.pageParam.themeId);
    var Http = require('U/http');
    var list = api.pageParam.list;
    var title = api.pageParam.title || '';
    var care_id = api.pageParam.care_id || '';
    var usualT = false;
    var isSelectedWay = false;
    var entId = api.pageParam.entId;//user id
    if (title == '日常关怀') {
        usualT = true;
        title = '';
    }

    // 设备码
    // 部分机型获取设备码可能出现问题
    // var deviceId = window.api.deviceId || ( + new Date());
    var user_id = list.user_id;
    var phone = list.tel;

    // 用于防止多次派发
    var uuid = _g.getUUID();

    var vm = new Vue({
        el: '#clerkThemeInput',
        template: _g.getTemplate('member/clerkThemeInput-body-V'),
        data: {
            isMemberDet: title ? false : true,//入口判断：从会员详情进入为真
            recallMan: _g.getLS('UserInfo').user_name,//营业员名字

            themeType: {
                onThemeName: title || '请选择',
                onThemeId: api.pageParam.themeId
            },//显示主题名称
            themeList: [
                {
                    text: '2月21主题',
                    value: 001
                },
                {
                    text: '测试消息推送',
                    value: 002
                },
            ],
            wayType: {
                onWayName: '请选择',
                onWayType: ''
            },//显示回访方式
            wayList: [
                {
                    text: '电话',
                    value: 'phone'
                },
                {
                    text: '微信',
                    value: 'wx'
                },
                {
                    text: '短信',
                    value: 'msg'
                },
                {
                    text: '其他',
                    value: 'other'
                },
            ],
            remindProductCount: 0,
            rememberCheckProductID: [],
            rememberCheckSkuCode: [],
            isSexShow: '',
            isShow: false,//会员信息下拉框
            nameIsShow: true,//会员信息横条
            tel: list && list.tel,
            uName: list && list.uName,
            uSex: list && list.sex,
            cartId: list && list.cardId,
            uBirthday: list && list.birthday ? list.birthday : "--",
            uYear: list && list.memberOld,
            uId: list && list.userid,
            content: '',
            isRed: false,
            wordNum: 0,
            goodsList: [],  // 商品id,条码列表

            // 卡券信息
            couponList: [
                {
                    // 卡券类型
                    count_rule_operation: 'AMOUNT',
                    // 卡券值
                    count_rule_operation_val: 0,
                    // 卡券标题
                    coupon_title: '',

                    // 使用时间
                    use_rule_val: '',

                    condition: '',


                    // 卡券详情
                    goodScope: '商品1、商品2',
                    scope: '部分门店、商城',
                    explain: '新客专用',



                    // 卡券是否能够被领取
                    is_receive: true,
                    reason_of_unreceive: '',

                    selected: true,
                    isSpread: true,
                }
            ],

            showDialog: false,

            currentCouponId: -1,
            currentIndex: -1,

            // 卡券派发状态
            is_dispensable: false,
            is_limit: false,
            limit_num: 0,
            residual_dispensable_num: 0,

            // 文案提示
            isReceiveUp: 'no',
            
            isConform: 'yes'
        },
        created: function () {
            this.recallMan = _g.getLS('UserInfo').user_name;
            this.themeList = [];
        },
        watch: {
            content: {
                handler: function (val) {
                    this.wordNum = val.length;
                    this.isRed = this.wordNum > 85 ? true : false;
                }
            },
            deep: true
        },
        computed: {
            isSexShow: function () {
                console.log(this.uSex)
                if(this.uSex === null || this.uSex === '' || this.uSex === undefined){
                    return false
                }else{
                    this.uSex = Number(this.uSex)
                    if(this.uSex === 2){
                        return false
                    }else{
                        return true
                    }
                }
            },

            // 卡券派发是否需要提示
            showTips: function () {
                var result = false;
                if (this.couponList.length === 0) result = true;
                return result;

                // return this.couponList.length === 0 ? true : false
            },
            selectedList: function () {
                var currentList = [];
                for (var i = 0; i < this.couponList.length; i++) {
                    if (this.couponList[i].selected) currentList.push(this.couponList[i]);
                }
                return currentList;
            },
            selectedAmount: function () {
                return this.selectedList.length;
            },
            btnText: function () {
                var text = '保存';
                if (this.selectedAmount === 0) return text;
                if (this.is_limit && this.selectedAmount > this.residual_dispensable_num) {
                    text = '保存并派券（超过当日派券上限）';
                } else {
                    text = '保存并派券（已选择 ' + this.selectedAmount + ' 张）';
                };
                return text;
            },
            forbinDispatchCoupon: function () {
                if (this.is_limit && this.selectedAmount > this.residual_dispensable_num) return true;
                return false;
            }
        },
        filters: {
            toSex: function (val) {
                if (val === null || val === '' || val === undefined) return
                val = Number(val)
                var arr = ['女', '男'];
                return arr[val];
            },
            encrept: function (val) {
                if (!val) return
                var str = val
                var a = str.slice(0, 3)
                var b = str.slice(7)
                str = a + '****' + b
                return str
            },
            clearSign: function (value) {
                if (!value) return '';
                var reg = /^、|、$/g;
                return value.replace(reg, '');
            }
        },
        methods: {
            // 卡券部分操作
            // 查看、收起详情
            onChangDetailedStatus: function (index, item) {
                // 查看详情
                // 已请求过的详情不再请求
                if (!item.isSpread && !item.isCache) {
                    this.currentCouponId = item.coupon_batch_id;
                    this.currentIndex = index;
                    ajax('getCouponDetail');
                    return;
                }
                item.isSpread = !item.isSpread;
            },
            // 改变选择状态
            onChangeSelectStatus: function (item) {
                // 卡券不能被派发
                if (!item.is_receive) return;
                item.selected = !item.selected;
            },
            onSaveAndDispatch: function () {
                var self = this;
                if (this.forbinDispatchCoupon) return;
                // 校验
                if (!check()) return;
                // 选择卡券，进行派发
                if (this.selectedAmount > 0) {
                    this.showDialog = true;
                } else {
                // 直接保存
                    var title = '确认保存？';
                    var message = '是否确认保存回访记录？';
                    _g.confirm(title, message, function () {
                        self.onThemeSave();
                    });
                    
                }
            },
            onDialogCancel: function () {
                this.showDialog = false;
            },
            onDialogEnter: function () {
                ajax('dispatchCoupon');
                this.showDialog = false;
            },

            onWaySelect: function () {
                if (!!isSelectedWay) return false;
                setTimeout(function () {
                    var otPicker = new mui.PopPicker();
                    otPicker.setData(this.wayList);
                    otPicker.show(function (selectItems) {
                        this.wayType.onWayName = selectItems[0].text;
                        this.wayType.onWayType = selectItems[0].value;
                        otPicker.dispose();
                    }.bind(this));
                }.bind(this), 260)
            },
            onThemeSelect: function () {
                if (!this.isMemberDet) return; //入口判断
                setTimeout(function () {
                    var otPicker = new mui.PopPicker();
                    otPicker.setData(this.themeList);
                    otPicker.show(function (selectItems) {
                        this.themeType.onThemeName = selectItems[0].text;
                        this.themeType.onThemeId = selectItems[0].value;
                        otPicker.dispose(this.themeType.onThemeId);
                    }.bind(this));
                }.bind(this), 260)
            },
            onTagList: function () {
                _g.openWin({
                    header: {
                        data: {
                            title: '选择商品'
                        }
                    },
                    pageParam: {
                        entId: entId,
                        rememberCheckProductID: this.rememberCheckProductID,
                        rememberCheckSkuCode: this.rememberCheckSkuCode,
                    },
                    name: 'clerk-remindAfterBuyList',
                    url: '../clerk/remindAfterBuyList.html',
                    bounces: false,
                    slidBackEnabled: false,
                });
            },
            onThemeSave: function () {
                var _data={
                    care_id: this.themeType.onThemeId,// 主题关怀
                    content: this.content.trim(),
                    type: this.wayType.onWayType,// string  phone电话 wx微信 msg短信 other其他
                    user_id: list.user_id,
                };
                if (this.themeType.onThemeId == 7) {
                    _data.product_info_list = JSON.stringify(this.goodsList);
                }
                var _url='/app/auth/crm/care/saveCrmCareVisit.do';
                // var title = '确认保存？';
                // var message = '是否确认保存回访记录？';
                //  _g.confirm(title,message,function(){
                    
                // })
                Http.ajax({
                    data: _data,
                    url:_url,
                    api_versions: 'v2',
                    isSync: true,
                    success: function (ret) {
                        logger.log({"Type":"operation","action":"回访录入保存","Win_name":api.winName,"data":_data,"message":ret,"requireURL":_url})
                        if (ret.success) {
                            api.sendEvent && api.sendEvent({
                                name: 'reload-visitList'
                            });
                            api.closeWin && api.closeWin();
                        } else {
                            _g.toast(ret.message);
                        }
                    },
                    error:function(err) {
                        _g.toast(err);
                    }
                });
            },
            onShowType: function () {
                this.nameIsShow = !this.nameIsShow;
                this.isShow = !this.isShow;
            }
        }
    });

    // alert(JSON.stringify(list));

    // 记录筛选方式
    if (api.pageParam.inputType !== undefined && api.pageParam.inputType == 0) {
        isSelectedWay = true;
        vm.wayType.onWayType = 'msg';
        vm.wayType.onWayName = '短信';
    } else if (api.pageParam.inputType !== undefined && api.pageParam.inputType == 1) {
        isSelectedWay = true;
        vm.wayType.onWayType = 'wx';
        vm.wayType.onWayName = '微信';
    } else if (api.pageParam.inputType !== undefined && api.pageParam.inputType == 2) {
        isSelectedWay = true;
        vm.wayType.onWayType = 'phone';
        vm.wayType.onWayName = '电话';
    }

    function check() {
        if (vm.themeType.onThemeId === undefined) {
            _g.toast('请选择回访主题');
            return false;
        } else if (vm.wayType.onWayType === '') {
            _g.toast('请选择回访方式');
            return false;
        } else if (vm.themeType.onThemeId == 7 && vm.remindProductCount<1){
            _g.toast('请选择提醒复购的商品');
            return false;
        }else if(vm.content===""){
            _g.toast('请输入回访内容');
            return false;
        }
        return true;
    };


    var getData = function () {
        var _data= {
                publish_status: 'ongoing'   //主题状态  string  值为：
            };
        var _url='/app/auth/crm/care/listAllCrmCare.do';
        Http.ajax({
            data:_data,
            api_versions: 'v2',
            url:_url,
            success: function (res) {
                logger.log({"Type":"operation","action":"店员获取主题关怀","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
                vm.themeList = getItem(res.object);
            },
            error: function (err) {
            }
        })

        //获取未提醒商品所需数据
        var _data2= {
                // displayRecord: 10,
                // page: opts.page || 1,
                user_id: entId,//   会员ID    number
            };
        var _url2='/app/auth/crm/multiConRedmind/listMCRemindProductDialog.do';
        Http.ajax({
            data:_data2,
            api_versions: 'v2',
            url:_url2,
            success: function (res) {
                logger.log({"Type":"operation","action":"获取选择商品数据","Win_name":api.winName,"data":_data2,"message":res,"requireURL":_url2,"line":"------------------------------------------------------"})
                if (res.code == 200) {
                    if(res.object) {
                        for(var i = 0; i < res.object.length; i++) {
                            var item = {};
                            item.product_id = res.object[i].product_id;
                            item.sku_code = res.object[i].sku_code;
                            vm.rememberCheckProductID.push(res.object[i].product_id);
                            vm.rememberCheckSkuCode.push(res.object[i].sku_code);
                            vm.remindProductCount = res.object.length;
                            vm.goodsList.push(item);
                        }
                    }
                } else {
                    // alert(_url + ' failed ' + JSON.stringify(res));
                    _g.toast(res.message);
                }
            },
            error: function (err) {
                // alert(_url + ' failed ' + JSON.stringify(res));
                _g.hideProgress();
            }
        })
    }
    var getDataUsual = function () {
        var _data= {
                type: 'usual'   //主题状态  string  值为：
            };
        if(care_id) {
            _data.care_id = care_id;
        }
        var _url='/app/auth/crm/care/listAllCrmCares.do';
        Http.ajax({
            data:_data,
            api_versions: 'v2',
            url:_url,
            success: function (res) {
                logger.log({"Type":"operation","action":"店员获取日常关怀","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
                vm.themeList = getItem(res.object);
                if(care_id && res.object.length>0) {
                    vm.themeType.onThemeName = res.object[0].title;
                    vm.themeType.onThemeId = res.object[0].care_id;
                }
            },
            error: function (err) {
            }
        })
    }
    var getItem = function (obj) {
        return _.map(obj, function (item) {
            return {
                text: item.title,
                value: item.care_id
            }
        })
    }


    // 卡券派发部分
    // 接口信息
    var interfaceInfo = {
        getCoupon: {
            baseInfo: {
                url: '/app/auth/crm/coupon/getCouponlist.do',
                api_versions: 'v1',
                isSync: true,
            },
            getParams: function () {
                return {
                    user_id: user_id
                };
            },
            success: function (result) {
                if (result.success && result.object) {
                    // 处理卡券派发状态
                    handleCouponDispatchStatus(result.object);
                    // 处理卡券列表数据
                    handleCouponData(result.object.couponBatchQueryResultToAppVo);
                }
            },
            error: function (err) {
                err && _g.toast(err.message || '派发失败,请联系相关人员');
            }
        },
        dispatchCoupon: {
            baseInfo: {
                url: '/app/auth/crm/coupon/distributeCoupon.do',
                api_versions: 'v1',
                isSync: true
            },
            getParams: function () {
                return {
                    coupon_batch_id: getCouponID(),
                    couponVo_list: [
                        {
                            phone: phone,
                            user_id: user_id,
                        }
                    ],
                    uuid: uuid,
                };
            },
            success: function (result) {
                if (result.success) {
                    // 卡券派发成功
                    // _g.toast('卡券派发成功！');
                    vm.onThemeSave();
                } else {
                    _g.toast(result.message);
                }
            },
            error: function (err) {
                _g.toast(err);
            }
        },
        getCouponDetail: {
            baseInfo: {
                url: '/app/auth/crm/coupon/getCouponDetail.do',
                api_versions: 'v1',
                isSync: true,
            },
            getParams: function () {
                return {
                    coupon_batch_id: vm.currentCouponId
                }
            },
            success: function (result) {
                if (result.success && result.object) {
                    // 获取卡券详情
                    handleCouponDetail(result.object);
                    vm.couponList[vm.currentIndex].isSpread = true;
                    vm.couponList[vm.currentIndex].isCache = true;
                }
            },
            error: function (err) {
                _g.toast(err);
            }
        }
    };

    // 获取选中卡券ID
    var getCouponID = function  () {
        var couponId = [];
        vm.couponList.forEach(function (item) {
            // 判断是否选中
            if (item.selected) return couponId.push(item.coupon_batch_id);
        });
        return couponId;
    };

    // 合并
    var merge = function (target, source) {
        for (var key in source) {
            target[key] = source[key];
        }
        return target;
    };

    // 请求接口
    var ajax = function (type) {
        // 请求参数
        var _data = {};
        // 请求参数
        merge(_data, interfaceInfo[type].getParams());
        
        var opts = {};
        // 合并参数
        merge(opts, interfaceInfo[type].baseInfo);

        opts.data = _data;
        opts.success = interfaceInfo[type].success;
        opts.error = interfaceInfo[type].error;

        Http.ajax(opts);
    };

    // 获取卡券
    var getCouponData = function (opts, callback) {
        callback({});
    };

    // 处理卡券派发状态
    var handleCouponDispatchStatus = function (object) {
        var keyList = [
            'is_dispensable', 
            'is_limit', 
            'limit_num',
            'residual_dispensable_num'
        ];
        for (var i = 0; i < keyList.length; i++) {
            var key = keyList[i];
            vm[key] = object[key];
        }

        // 当日卡券派发是否已达上限
        if(vm.is_limit && vm.residual_dispensable_num === 0) vm.isReceiveUp = 'yes';
    };

    // 处理卡券数据
    var handleCouponData = function (data) {
        if (!data || !data.count) {
            vm.isConform = 'no';
            return;
        }
        var conformCount = 0;
        data.detailList.forEach(function (item) {
            // vue收集依赖
            item.goodScope = '';
            item.scope = '';
            item.explain = '';
            item.condition = '';

            item.selected = false;
            item.isSpread = false;

            // 处理使用条件
            handleCouponUseCondition(item);

            if (item.is_receive) conformCount++;
        });
        vm.couponList = data.detailList;

        // 无符合会员条件的卡券
        if (conformCount === 0) vm.isConform = 'no';
    };

    // 处理卡券使用条件
    var handleCouponUseCondition = function (item) {
        if (item.count_rule_condition === 'LIBERTY') {
            item.condition = '满0元可用';
        } else if (item.count_rule_condition === 'QUOTA') {
            item.condition = '满' + (item.count_rule_condition_val / 100) + '元可用';
        }
    };

    // 处理卡券详情
    var handleCouponDetail = function (data) {
        // 商品范围
        var stores_good_name = data.store_products_name || '';
        var shop_good_name = data.shop_products_name || '';
        vm.couponList[vm.currentIndex].goodScope = stores_good_name + '、' + shop_good_name;

        // 适用范围
        var stores_name = data.stores_name_for_app || '';
        var shop_name = data.shops_name_brief || '';
        vm.couponList[vm.currentIndex].scope = stores_name + '、' + shop_name;

        // 说明
        vm.couponList[vm.currentIndex].explain = data.remark;
    };



    if (usualT) {
        getDataUsual()
    } else {
        getData()
        //复购商品数
        api.addEventListener({
            name: 'chooseProduct'
        }, function(ret){
            vm.remindProductCount = ret.value.count;
            vm.rememberCheckProductID = ret.value.rememberCheckProductID;
            vm.rememberCheckSkuCode = ret.value.rememberCheckSkuCode;
            vm.goodsList = ret.value.data;
        });
    }

    // 初始化操作
    var init = function () {
        vm.couponList = [];
        ajax('getCoupon');
    };
    init();

});
