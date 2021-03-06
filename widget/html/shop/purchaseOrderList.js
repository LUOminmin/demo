define(function(require, exports, module) {
    // var page = 0;
    // var next = true;
    // var audit_status = '00N';
    
    var Http = require('U/http');
    var purchaseOrderList = new Vue({
        el: '#purchaseOrderList',
        template: _g.getTemplate('shop/purchaseOrderList-list-V'),
        data: {
            isSeeBuyPrice:false,
            isFirstLoading:true,
            isNoResult:false,
            isSelect:false,
            supplierId:'',
            warehouseId:'',
            statusId:'',
            supplierName:'',
            warehouseName:'',
            isSearch:false,
            list:{
                "2017-03":[{
                    supplier_name:'供应商名称',
                    create_time:'2017-03-09 11:44:00',
                    order_total_price:'10000',
                    purchase_order_id:'1792',
                    purchase_order_no:'PO00501702271102590001',
                    supplier_name:'自采',
                    audit_status:'00N',
                },
                {
                    supplier_name:'供应商名称',
                    create_time:'2017-03-08 11:44:00',
                    order_total_price:'10000',
                    purchase_order_id:'1792',
                    purchase_order_no:'PO00501702271102590001',
                    supplier_name:'自采',
                    audit_status:'00P',
                },
              ],
                "2017-02":[{
                    supplier_name:'供应商名称',
                    create_time:'2017-02-27 11:44:00',
                    order_total_price:'10000',
                    purchase_order_id:'1792',
                    purchase_order_no:'PO00501702271102590001',
                    supplier_name:'自采',
                    audit_status:'00N',
                    purchase_order_id:'',
                },
                {
                    supplier_name:'供应商名称',
                    create_time:'2017-02-27 11:44:00',
                    order_total_price:'10000',
                    purchase_order_id:'1792',
                    purchase_order_no:'PO00501702271102590001',
                    supplier_name:'自采',
                    audit_status:'00N',
                    purchase_order_id:'',
                },
              ],
            },
            // noData: false,
            // tapList: [{
            //     text: '未审核',
            //     isSelect: 1,
            // }, {
            //     text: '已审核',
            //     isSelect: 0,
            // }],
            // list: [{
            //     purchaseNo: 'P549674102101210',
            //     status: '未审核',
            //     supplier: '天河供应商',
            //     entrepot: '天河仓',
            //     money: 500000,
            //     time: '2016-5-25 16:30:30',
            //     isCheck: 0,
            //     orderId: 1
            // }, {
            //     purchaseNo: 'P549674102101210',
            //     status: '已审核',
            //     supplier: '天河供应商',
            //     entrepot: '天河仓',
            //     money: 500000,
            //     time: '2016-5-25 16:30:30',
            //     isCheck: 1,
            //     orderId: 1
            // }, {
            //     purchaseNo: 'P549674102101210',
            //     status: '未审核',
            //     supplier: '天河供应商',
            //     entrepot: '天河仓',
            //     money: 500000,
            //     time: '2016-5-25 16:30:30',
            //     isCheck: 0,
            //     orderId: 1
            // }, {
            //     purchaseNo: 'P549674102101210',
            //     status: '已审核',
            //     supplier: '天河供应商',
            //     entrepot: '天河仓',
            //     money: 500000,
            //     time: '2016-5-25 16:30:30',
            //     isCheck: 1,
            //     orderId: 1
            // }, ],
        },
        created: function() {
            this.list = [];
        },
        ready: function () {
            //设置noResultWrap的高度
            var h = api.frameHeight || window.screen.height
            document.getElementById('noResultWrap').style.height = h + 'px'

        },
        computed:{
            isNoResult: function () {
                if(this.isFirstLoading) return false
                var sta = this.list.length === 0 ? true : false
                return sta
            }
        },
        filters:{
             formatDate: function (val) {
                 if(val){
                     var month = val.split('-')[1];
                     var beforeM = new Date().getMonth()+1;
                     if(month == beforeM){
                         return '本月'
                     }else{
                         if(month == '01'){
                             return '一月';
                         }else if(month == '02'){
                             return '二月';
                         }else if(month == '03'){
                             return '三月';
                         }else if(month == '04'){
                             return '四月';
                         }else if(month == '05'){
                             return '五月';
                         }else if(month == '06'){
                             return '六月';
                         }else if(month == '07'){
                             return '七月';
                         }else if(month == '08'){
                             return '八月';
                         }else if(month == '09'){
                             return '九月';
                         }else if(month == '10'){
                             return '十月';
                         }else if(month == '11'){
                             return '十一月';
                         }else if(month == '12'){
                             return '十二月';
                         }
                     }
                 }
             },
             formatType : function(res){
                 if(res == "00P"){
                     return 0;
                 }else{
                     return 1;
                 }
             },
             formatTime : function(res){
                 if(res){
                    //  alert()
                     var data = parseInt(res.split(" ")[0].split('-')[2]);
                     var dateTime = new Date().getDate();
                     var beforeDay = new Date().getMonth()+1;
                     var yesterday = (new Date(new Date().Format('yyyy-MM-dd')).getTime()) - 60*60*1000*24;
                     var dataYesterday = new Date(res.split(' ')[0]).getTime();
                     if(res.split("-")[1]==beforeDay){
                         if(data == dateTime){
                             return '今天';
                         }if(yesterday == dataYesterday){
                             return '昨天';
                         }else{
                             var time = new Date(res.split(' ')[0]).getDay();
                             switch(time){
                                 case 0:
                                     return '周日';
                                 case 1:
                                     return '周一';
                                 case 2:
                                     return '周二';
                                 case 3:
                                     return '周三';
                                 case 4:
                                     return '周四';
                                 case 5:
                                     return '周五';
                                 case 6:
                                     return '周六';
                             }
                         }
                     }else{
                         var time = new Date(res.split(' ')[0]).getDay();
                             switch(time){
                                 case 0:
                                     return '周日';
                                 case 1:
                                     return '周一';
                                 case 2:
                                     return '周二';
                                 case 3:
                                     return '周三';
                                 case 4:
                                     return '周四';
                                 case 5:
                                     return '周五';
                                 case 6:
                                     return '周六';
                             }
                     }

                 }
             },
             formatDay : function(res){
                 if(res){
                     var data = parseInt(res.split(" ")[0].split('-')[2]);
                     var dateTime = new Date().getDate();
                     var beforeDay = new Date().getMonth()+1;
                     var yesterday = (new Date(new Date().Format('yyyy-MM-dd')).getTime()) - 60*60*1000*24;
                     var dataYesterday = new Date(res.split(' ')[0]).getTime();
                     if(res.split("-")[1]==beforeDay){
                         if(data == dateTime || yesterday == dataYesterday){
                             var time =  res.split(' ')[1].split(':')[0] + ":" + res.split(' ')[1].split(':')[1];
                             return time;
                         }else{
                             var time2 = res.split(' ')[0].split('-')[1] + "-" + res.split(' ')[0].split('-')[2];
                             return time2;
                         }
                     }else{
                         var time3 = res.split(' ')[0].split('-')[1] + "-" + res.split(' ')[0].split('-')[2];
                         return time3;
                     }
                 }
             }
        },
        methods: {
                onDetailTap:function (orderId,status) {
                    var _data={
                        title: '采购订单详情'
                    };
                    logger.log({"Type":"operation","action":"点击采购订单列表具体采购单","Win_name":api.winName,"data":_data});
                    if(status == '00P' && _g.getLS('UserInfo').notes == "company_admin"){
                        _g.openWin({
                            header: {
                                data: _data,
                                template:'../html/header/header-purchaseOrderDetail-V'
                            },
                            name: 'shop-purchaseOrderDetail',
                            url: '../shop/purchaseOrderDetail.html',
                            bounces: false,
                            slidBackEnabled: false,
                            pageParam: {
                                order_id: orderId
                            }
                        });
                    }else{
                        _g.openWin({
                            header: {
                                data:_data
                            },
                            name: 'shop-purchaseOrderDetail',
                            url: '../shop/purchaseOrderDetail.html',
                            bounces: false,
                            slidBackEnabled: false,
                            pageParam: {
                                order_id: orderId
                            }
                        });
                    }

                }
            // onChangeTap: function(index) {
            //     _.each(this.tapList, function(n, i) {
            //         if (index == i) {
            //             n.isSelect = 1;
            //             if (index == 0) {
            //                 audit_status = '00N';
            //             } else if (index == 1) {
            //                 audit_status = '00P';
            //             } else {
            //                 audit_status = '';
            //             }
            //             page = 0;
            //             next = true;
            //             purchaseOrderList.list = [];
            //             getData(audit_status);
            //         } else {
            //             n.isSelect = 0;
            //         }
            //     });
            // },
            // onDetailTap: function(orderId) {
            //     if(audit_status == '00N'){
            //         _g.openWin({
            //             header: {
            //                 data: {
            //                     title: '采购订单详细'
            //                 },
            //                 // template:'../html/header/header-purchaseOrderDetail-V'
            //             },
            //             name: 'shop-purchaseOrderDetail',
            //             url: '../shop/purchaseOrderDetail.html',
            //             bounces: false,
            //             slidBackEnabled: false,
            //             pageParam: {
            //                 order_id: orderId
            //             }
            //         });
            //     }else if(audit_status == '00P'){
            //         _g.openWin({
            //             header: {
            //                 data: {
            //                     title: '采购订单详细'
            //                 },
            //                 template:'../html/header/header-purchaseOrderDetail-V'
            //             },
            //             name: 'shop-purchaseOrderDetail',
            //             url: '../shop/purchaseOrderDetail.html',
            //             bounces: false,
            //             slidBackEnabled: false,
            //             pageParam: {
            //                 order_id: orderId
            //             }
            //         });
            //     }
            //
            // }

        }
    });
    // getData = function(audit_status) {
    //     if (next) {
    //         _g.showProgress();
    //         page++;
    //         Http.ajax({
    //             data: {
    //                 displayRecord: 10,
    //                 page: page,
    //                 audit_status: audit_status
    //             },
    //             url: '/app/auth/page/erp/erpPurchaseOrderList.do',
    //             success: function(ret) {
    //                 if (ret.code == 200) {
    //                     setTimeout(function() {
    //                         if (ret.object) {
    //                             if (ret.object.lists.length < 1 && page == 1) {
    //                                 purchaseOrderList.noData = true;
    //                                 next = false;
    //                             } else if (ret.object.lists.length > 0 && page >= 1) {
    //                                 purchaseOrderList.noData = false;
    //                                 next = true;
    //                                 var list = getDataList(ret.object);
    //                                 if (purchaseOrderList.list) {
    //                                     purchaseOrderList.list = purchaseOrderList.list.concat(list);
    //                                 } else {
    //                                     purchaseOrderList.list = list;
    //                                 }
    //                             } else if (ret.object.lists.length < 1 && page > 1) {
    //                                 _g.toast('没有更多数据');
    //                                 purchaseOrderList.noData = false;
    //                                 next = false;
    //                             }
    //                         }
    //                         _g.hideProgress();
    //                     }, 0);
    //                 } else {
    //                     _g.hideProgress();
    //                     _g.toast(ret.message);
    //                 }
    //                 console.log(purchaseOrderList);
    //             },
    //             error: function(err) {
    //                 _g.hideProgress();
    //             },
    //         });
    //     }
    // }
    // getDataList = function(result) {
    //     var list = result ? result.lists : [];
    //     return _.map(list, function(item) {
    //         return {
    //             purchaseNo: item ? item.purchase_order_no : 0,
    //             status: item ? getStatus(item.audit_status) : '',
    //             supplier: item ? item.supplier_name : '',
    //             entrepot: item ? item.storehouse_name : '',
    //             money: item ? item.order_total_price : 000,
    //             time: item ? item.create_time : '',
    //             isCheck: item ? getCheck(item.audit_status) : 0,
    //             orderId: item ? item.purchase_order_id : 0
    //         }
    //     });
    // }
    // getStatus = function(result) {
    //     switch (result) {
    //         case '00N':
    //             return '未审核';
    //             break;
    //         case '00P':
    //             return '已审核';
    //             break;
    //     }
    // }
    // getCheck = function(result) {
    //     switch (result) {
    //         case '00P':
    //             return 1;
    //             break;
    //         case '00N':
    //             return 0;
    //             break;
    //     }
    // }
    // getData(audit_status);
    // // _g.setPullDownRefresh(function() {
    // //     purchaseOrderList.list = [];
    // //     next = true;
    // //     page = 0;
    // //     getData(audit_status);
    // // });
    // api && api.addEventListener({
    //     name: 'refresh-purchaseOrderList'
    // }, function(ret, err) {
    //     purchaseOrderList.onChangeTap(0);
    //
    // });
    // api.addEventListener({
    //     name: 'scrolltobottom',
    //     extra: {
    //         threshold: 200
    //     }
    // }, function(ret, err) {
    //     getData(audit_status);
    // });
    var getData = function (opts,callback) {
        var opts = opts || {};
        var _data={
                displayRecord:10,
                page:opts.page || 1,
                audit_status:purchaseOrderList.statusId || '',
                storehouse_id:purchaseOrderList.warehouseId || '',
                supplier_id:purchaseOrderList.supplierId || '',

            };
        var _url='/app/auth/erp/listPurchaseOrder.do';
        Http.ajax({
            data:_data,
            api_versions: 'v2',
            url:_url,
            success:function (res) {
                logger.log({"Type":"operation","action":"采购订单列表获取数据","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
                purchaseOrderList.isFirstLoading = false
                _g.hideProgress();
                if(res.success){
                    purchaseOrderList.isSearch = false
                    if (opts.page && opts.page > 1) {
                        setTimeout(function () {
                            callback && callback(res.object)
                        }, 0)
                    } else {
                        getStrategy(function () {
                            setTimeout(function () {
                                purchaseOrderList.list = res.object;
                                //console.log(res.object);
                            }, 0)
                        })
                    }
                    
                }else{
                    if(purchaseOrderList.isSearch){
                        purchaseOrderList.list = [];
                        purchaseOrderList.isSearch = false;
                    }
                    //_g.toast(res.message)
                    callback && callback(res.object)
                }
            },
            error:function (err) {
                purchaseOrderList.isFirstLoading = false
                _g.hideProgress();
            }
        })
    }
    var getStrategy = function (callback) { //获取价格策略
        var _url = '/app/auth/erp/getSucSettingConfig.do';
        Http.ajax({
            data: {},
            url: _url,
            success: function (ret) {
                logger.log({ "Type": "operation", "action": "获取价格策略", "Win_name": api.winName, "message": ret, "requireURL": _url })
                setTimeout(function () {
                    if (ret.success) {
                        if (ret.object && ret.object.priceSettingConfigVOList) {
                            var priceConfig = {
                                retail_price: false,
                                wholesale_price: false,
                                allocation_price: false,
                                buy_price: false,
                                user_level_price: false,
                            }
                            var i = 0;
                            var priceList = ret.object.priceSettingConfigVOList;
                            for (i = 0; i < priceList.length; i++) {
                                priceConfig[priceList[i].suc_setting_config_code] = !!priceList[i].isAbleSee;
                            }
                        }
                        purchaseOrderList.isSeeBuyPrice = !!priceConfig.buy_price;
                    }
                }, 0)
                callback && callback();
            },
            error: function (err) {
                callback && callback();
            }
        });
    }


    var loadmore = new Loadmore({
        callback: function(page){
            getData({page: page.page}, function(data){
                if(!data || _.isEmpty(data)){
                    return loadmore.loadend(false);
                }else{
                    _.map(data,function (item,i) {
                        var length = purchaseOrderList.list.length-1;
                        console.log(purchaseOrderList.list)
                        // console.log(purchaseOrderList.list[purchaseOrderList.list.length-1].month_time)
                        if(item.month_time == purchaseOrderList.list[length].month_time){
                            purchaseOrderList.list[length].list = purchaseOrderList.list[length].list.concat(item.list);
                        }else{
                            purchaseOrderList.list = purchaseOrderList.list.concat(item);
                        }
                    })
                    loadmore.loadend(true);
                }
            });
        }
    });

    getData()
    _g.setPullDownRefresh(function () {
        logger.log({"Type":"operation","action":"向下拉动刷新采购订单列表数据","Win_name":api.winName});
        setTimeout(function () {
            getData();
        },0)
        loadmore.reset();
    });
    //
    api.addEventListener&&api.addEventListener({
        name: 'shop-purchaseOrderList-openDrawerLayout'
    }, function(ret, err) {
        logger.log({"Type":"operation","action":"采购订单列表页面接收头部发送信息，打开筛选侧边栏","Win_name":api.winName});
        api.openDrawerPane({
            type: 'right'
        });
    });

    //接收搜索框信息，重新刷新页面
    api.addEventListener && api.addEventListener({
        name: 'shop-refresh'
    }, function(ret, err) {
        logger.log({"Type":"operation","action":"接收搜索框信息，重新刷新页面","Win_name":api.winName});
        purchaseOrderList.isSearch = true;
        purchaseOrderList.supplierId = ret.value.supplierId;
        purchaseOrderList.statusId = ret.value.statusId;
        purchaseOrderList.warehouseId = ret.value.warehouseId;
        purchaseOrderList.supplierName = ret.value.supplierName ? ret.value.supplierName : '全部';
        purchaseOrderList.isSelect = ret.value.isSelect;
        purchaseOrderList.warehouseName = ret.value.warehouseName ? ret.value.warehouseName : '全部';
        getData();
        loadmore.reset();
    });

    api.addEventListener && api.addEventListener({
        name: 'refresh-purchaseOrderList'
    }, function(ret, err) {
        logger.log({"Type":"operation","action":"采购订单详情页面返回刷新","Win_name":api.winName});
        getData();
        loadmore.reset();
    });
    module.exports = {};
});
