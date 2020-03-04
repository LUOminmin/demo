define(function(require, exports, module) {
    var Http = require('U/http'),
        title = api.pageParam.title,
        type = api.pageParam.type,
        sales_type = api.pageParam.sales_type;

    // 当前已选商品
    var good_list = api.pageParam.good_list || [];
    var  good_id_list = [];
    var good_list_obj = {};
    good_list.forEach(function (item) {
        good_id_list.push(item.id);
        good_list_obj[item.id] = item;
    });
    var vm = new Vue({
        el: '#targetFilter',
        template: _g.getTemplate('assistant/targetFilter-body-V'),
        data: {
            isMulSelect: true,
            isFirstLoading:true,
            searchText:"",
            placeholder:"请输入内容",
            isInput:false,
            title:title,
            isShowBox:false,
            type: type,
            sales_type: sales_type,
            isNoResult:false,
            options:[
                {
                    title:"分类",
                    isSelected:true,
                    type: 'Category',
                },
                {
                    title:"单品",
                    isSelected:false,
                    type: 'Goods',
                },
                {
                    title:"品牌",
                    isSelected:false,
                    type: 'Brand',
                },
            ],
            resultList:[
                // {
                //     name: '模糊匹配',
                //     id: 0,
                //     checked: false,
                // }
            ],

            good_id_list: good_id_list,
            good_name_list: [],
            good_list_obj: good_list_obj
        },
        created: function(){
            this.resultList = [];
        },
        ready: function () {
            //设置noResultWrap的高度
            var h = api.frameHeight || window.screen.height
            document.getElementById('noResultWrap').style.height = h + 'px';
            if (type === 'Goods' && sales_type === 'sales_price') {
                this.isMulSelect = false;
            }
        },
        watch:{
            // searchText:function () {
            //     if(this.searchText == ""){
            //         this.isInput = false;
            //         console.log(this.isInput);
            //     }else{
            //         this.isInput = true;
            //     }
            // }
        },
        computed:{
            isNoResult: function () {
                if(this.isFirstLoading) return false
                var sta = this.resultList.length === 0 ? true : false
                return sta
            },
            selected_num: function () {
                return this.good_id_list.length;
            }
        },
        methods: {
            chooseItem : function(id,item_name,item){
                
                item.checked = !item.checked;
                if (type === 'Goods' && sales_type === 'sales_price') {
                    api.sendEvent({
                        name: 'choose',
                        extra: {
                            key1: id,
                            key2: item_name
                        }
                    });
                    api && api.closeWin();
                }
                if(type != 'Goods' || sales_type != 'sales_volume') {
                    api.sendEvent({
                        name: 'choose',
                        extra: {
                            key1: id,
                            key2: item_name
                        }
                    });
                    api && api.closeWin();
                }
            },
            selectedItem: function (idx) {
                if (type === 'Goods' && sales_type === 'sales_price') {
                    this.chooseItem(this.resultList[idx].id, this.resultList[idx].name, this.resultList[idx]);
                }

                var id = this.resultList[idx].id;
                var index = this.good_id_list.indexOf(id);

                if (!this.resultList[idx].checked) {
                    if (index === -1) {
                        this.good_id_list.push(id);
                        this.good_list_obj[id] = {
                            id: this.resultList[idx].id,
                            name: this.resultList[idx].name
                        };
                    }
                } else {
                    if (index !== -1) {
                        this.good_id_list.splice(index, 1);
                        delete this.good_list_obj[id];
                    }
                }

                this.resultList[idx].checked = !this.resultList[idx].checked;
            },
            // onActionStatistics: function(id,item_name){
            //     _g.openWin({
            //         header: {
            //             data: {
            //                 active: dimensionType(),
            //                 list:['日', '周', '月'],
            //             },
            //             template: '../html/main/home-date-header-V',
            //         },
            //         name: 'statistics-filterResult',
            //         url: '../statistics/filterResult.html',
            //         pageParam: {
            //             id: id,
            //             name: item_name,
            //             sum_type: vm.type
            //         }
            //     });
            // },
            onSearch:function () {
                loadmore.reset();
                getData();
            },
            ensure: function() {
                
                if (vm.good_id_list.length === 0) {
                    api.alert({
                        title: '提示', 
                        msg: '请先选择商品'
                    });
                    return;
                }
                var goal_type_id_list = [];
                var goal_type_name_list  = [];
                var good_list_result = [];

                for (var key in vm.good_list_obj) {
                    goal_type_id_list.push(vm.good_list_obj[key].id);
                    goal_type_name_list.push(vm.good_list_obj[key].name);
                    good_list_result.push({
                        id: vm.good_list_obj[key].id,
                        name: vm.good_list_obj[key].name
                    })
                }

                api.sendEvent({
                    name: 'chooseMany',
                    extra: {
                        goal_type_id_list: goal_type_id_list,
                        goal_type_name_list: goal_type_name_list,
                        good_list: good_list_result
                    }
                });
                api && api.closeWin();
                
            }
        },
    });

    function getData(opts, callback){
        var self = this;
        var opts = opts || {};
        api.showProgress && api.showProgress({
            style: 'default',
            animationType: 'fade',
            title: '努力加载中...'
        });
        var _data= {
                displayRecord: 20,
                page: opts.page || 1,
                type: vm.type,
                name: vm.searchText
            };
        var _url='/app/auth/page/retail/listByType.do';
        Http.ajax({
            url:_url,
            data:_data,
            success: function(res){
                logger.log({"Type":"operation","action":"目标查询","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
                api.hideProgress && api.hideProgress();
                vm.isFirstLoading = false
                if(res.success){
                    if(opts.page && opts.page > 1){
                        callback && callback(res.object);
                    }else{
                        if(res.object === null){
                            res.object = []
                        }
                        res.object.forEach(function (item) {
                            if (vm.good_id_list.indexOf(item.id) !== -1) {
                                item.checked = true;
                            } else {
                                item.checked = false;
                            }
                        });
                        vm.resultList = res.object;
                    }
                }else{
                    vm.isFirstLoading = false
                    _g.toast(res.message);
                }
            }
        });

    }

    // function dimensionType(){
    //     var map = ['DAY', 'WEEK', 'MONTH'];
    //     var dimensionType = _g.getLS('dimensionType') || 'DAY';
    //     for(var key in map){
    //         if(map[key] === dimensionType) return key;
    //     }
    // }

    var loadmore = new Loadmore({
        callback: function(page){
            getData({page: page.page}, function(data){
                console.log(data);
                if(!data || data.length === 0){
                    return loadmore.loadend(false);
                }else{
                    data.forEach(function (item) {
                        if (vm.good_id_list.indexOf(item.id) !== -1) {
                            item.checked = true;
                        } else {
                            item.checked = false;
                        }
                    });
                    vm.resultList = vm.resultList.concat(data);
                    loadmore.loadend(true);
                }
            });
        }
    });
    /**
     * 搜索响应
     **/
    //从头部菜单栏获取type&text值
    api.addEventListener && api.addEventListener({
        name: 'assistant-targetFilter-search'
    }, function (data) {
        vm.searchText = data.value.searchText || '';
        vm.onSearch();
    })

    vm.onSearch();
    window.app = vm;

    module.exports = {};
});
