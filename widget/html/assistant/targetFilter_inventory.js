define(function(require, exports, module) {
    var Http = require('U/http'),
        title = api.pageParam.title,
        type = api.pageParam.type;
        ids = api.pageParam.ids;
        storehouse_id = api.pageParam.storehouse_id;
        idList = [];
    console.log("显示分类"+JSON.stringify(api.pageParam.ids));
    if(ids && ids.length>0) {
        idList = ids.split(',');
    }
    console.log('api.pageParam.ids=======' + JSON.stringify(api.pageParam.ids));
    var vm = new Vue({
        el: '#targetFilter', 
        template: _g.getTemplate('assistant/targetFilter_inventory-body-V'),
        data: {
            isFirstLoading:true,
            searchText:"",
            placeholder:"请输入内容",
            isInput:false,
            title:title,
            isShowBox:false,
            type: type,
            idsArray: idList,
            isNoResult:false,
            // 选择的个数
            selected_num: 0,
            // 多选
            multiSel: false,
            multiSelMax: 1000,
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
                //     id: 0
                // }
            ],
            selectedList:{
                ids: '',
                names: '',
            },
        },
        created: function(){
            this.resultList = [];
            this.selected_num = this.idsArray.length;
        },
        ready: function () {
            //设置noResultWrap的高度
            var h = api.frameHeight || window.screen.height
            document.getElementById('noResultWrap').style.height = h + 'px'
        },
        watch:{

        },
        computed:{
            isNoResult: function () {
                if(this.isFirstLoading) return false
                var sta = this.resultList.length === 0 ? true : false
                return sta
            }
        },
        methods: {
            // 单选
            chooseItem_old : function(id,item_name){
                api.sendEvent({
                    name: 'choose_2', 
                    extra: {
                        ids: id + '',
                        names: item_name 
                    }
                });
                api && api.closeWin();
            },
            // 多选确认按钮
            chooseItem_btn: function(id,item_name) {
                var self = this;
                self.resultList.forEach(function(item) {
                    if(item.is_selected) {
                        self.selectedList.ids += item.id+',';
                        self.selectedList.names += item.name + ',';
                    }
                });
                self.selectedList.ids = self.selectedList.ids.slice(0, self.selectedList.ids.length - 1);
                self.selectedList.names = self.selectedList.names.slice(0, self.selectedList.names.length - 1);
                console.log('selectedList: ' + JSON.stringify(self.selectedList));
                api.sendEvent({
                    name: 'choose_2',
                    extra: {
                        ids: self.selectedList.ids,
                        names: self.selectedList.names
                    }
                });
                api && api.closeWin();
            },
            // 多选
            chooseItem: function(idx) {
                if (!vm.multiSel) { //判断是否多选
                    vm.chooseItem_old(this.resultList[idx].id, this.resultList[idx].name);
                }

                if (!this.resultList[idx].is_selected) {
                    // if (this.selected_num + 1 > vm.multiSelMax) { //判断选中是否超过最大数
                    //     _g.toast('最大选择不能超过' + vm.multiSelMax + '个');
                    //     return;
                    // }
                    this.selected_num++;
                } else {
                    if (this.selected_num > 0)
                        this.selected_num--;
                }
                this.resultList[idx].is_selected = !this.resultList[idx].is_selected;
                console.log('targetFilter chooseItem: ' + JSON.stringify(this.resultList[idx]));


            },
            onSearch:function () {
                loadmore.reset();
                getData();
            },
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
                        res.object.forEach(function(item) {
                            item.is_selected = false;
                            if (vm.idsArray.indexOf(item.id.toString()) != -1) {
                                item.is_selected = true;
                            }
                        });
                        vm.resultList = res.object;
                        console.log('vm.idsArray ' + JSON.stringify(vm.idsArray));
                    }
                }else{
                    vm.isFirstLoading = false
                    _g.toast(res.message);
                }
            }
        });

    }
    // 获取多选配置信息
    function getSettingsData() {
        var settingList = [
            {
                query_type: "erp_check_more_data_brand_class",
                query_key: "erp_check_more_data_brand_class"
            },
            {
                query_type: "erp_check_more_data_brand_class_amount",
                query_key: "erp_check_more_data_brand_class_amount"
        }];
        var _data = {
            storehouse_id: api.pageParam.storehouse_id,
            query_input_list: JSON.stringify(settingList)
        };
        var _url = '/app/auth/erp/getO2oAdminConfigResult.do';
        console.log('请求数据： ', _data);
        Http.ajax({
            url: _url,
            data: _data,
            success: function(res) {
                logger.log({ "Type": "operation", "action": "多选配置信息查询", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url })
                console.log('多选配置信息查询 ', res);
                if(res.success) {
                    var list = res.object && res.object.resultList;
                    var multi = {
                        erp_check_more_data_brand_class: 0,
                        erp_check_more_data_brand_class_amount: 1000
                    }
                    list.forEach(function(item) {
                        multi[item.query_key] = item.query_result;
                    });
                    
                    if(multi.erp_check_more_data_brand_class == 2) {
                        vm.multiSel = true;
                        vm.multiSelMax = multi.erp_check_more_data_brand_class_amount;
                    }
                    console.log("multiSel, multiSelMax: " + vm.multiSel + vm.multiSelMax);
                }else {
                    _g.toast(res.message);
                }
            }
        });
    }

    var loadmore = new Loadmore({
        callback: function(page){
            getData({page: page.page}, function(data){
                console.log(data);
                if(!data || data.length === 0){
                    return loadmore.loadend(false);
                }else{
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
    getSettingsData();

    module.exports = {};
});
