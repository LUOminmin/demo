define(function(require, exports, module) {
    var Http = require('U/http'),
        title = api.pageParam.title,
        type = api.pageParam.type;
        ids = api.pageParam.ids;
        storehouse_id = api.pageParam.storehouse_id;
        idList = [];
    // 当前已选储值卡
    var card_list = api.pageParam.card_list || [];
    // 已选储值卡id集合
    var card_id_list = [];
    var card_list_obj = {};
    card_list.forEach(function (item) {
        card_id_list.push(item.goal_store_card_id);
        card_list_obj[item.goal_store_card_id] = item;
    });
    console.log("显示分类"+JSON.stringify(api.pageParam.ids));
    if(ids && ids.length>0) {
        idList = ids.split(',');
    }
    console.log('api.pageParam.ids=======' + JSON.stringify(api.pageParam.ids));
    var vm = new Vue({
        el: '#targetFilter_storedCard', 
        template: _g.getTemplate('assistant/targetFilter_storedCard-body-V'),
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
            // selected_num: 0,
            // 多选
            multiSel: true,
            multiSelMax: 1000,
            card_list: card_list,
            card_id_list: card_id_list,
            card_list_obj: card_list_obj,
            resultList: [],
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
            },
            selected_num: function () {
                return this.card_id_list.length;
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
                var cardList = [];
                var cardIdList = [];
                self.selectedList.ids = '';
                self.selectedList.names = '';
                for (var key in vm.card_list_obj) {
                    self.selectedList.ids += vm.card_list_obj[key].goal_store_card_id+',';
                    self.selectedList.names += vm.card_list_obj[key].goal_store_card_name + ',';
                    cardIdList.push(vm.card_list_obj[key].goal_store_card_id);
                    cardList.push({
                        goal_store_card_name: vm.card_list_obj[key].goal_store_card_name,
                        goal_store_card_id: vm.card_list_obj[key].goal_store_card_id
                    });
                }
                if (vm.card_id_list.length === 0) {
                    api.alert({
                        title: '提示', 
                        msg: '请先选择储值卡'
                    });
                    return;
                }
                var _data = {
                    cardIdList: cardIdList
                };
                var _url = '/app/auth/storecard/getStoreIntersectionByCard.do';
                var storeIdList = [];
                Http.ajax({
                    url:_url,
                    api_versions: 'v1',
                    data:_data,
                    success: function(res){
                        logger.log({"Type":"operation","action":"查询储值卡交集","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
                        api.hideProgress && api.hideProgress();
                        vm.isFirstLoading = false;
                        if(res.success){
                            storeIdList = res.object || [];

                            self.selectedList.ids = self.selectedList.ids.slice(0, self.selectedList.ids.length - 1);
                            self.selectedList.names = self.selectedList.names.slice(0, self.selectedList.names.length - 1);
                            console.log('selectedList: ' + JSON.stringify(self.selectedList));
                            api.sendEvent({
                                name: 'choose_2',
                                extra: {
                                    ids: self.selectedList.ids,
                                    names: self.selectedList.names,
                                    cardList: cardList,
                                    storeIdList: storeIdList
                                }
                            });
                            api && api.closeWin();
                        }else{
                            vm.isFirstLoading = false
                            _g.toast(res.message);
                        }
                    }
                });
                // self.selectedList.ids = self.selectedList.ids.slice(0, self.selectedList.ids.length - 1);
                // self.selectedList.names = self.selectedList.names.slice(0, self.selectedList.names.length - 1);
                // console.log('selectedList: ' + JSON.stringify(self.selectedList));
                // api.sendEvent({
                //     name: 'choose_2',
                //     extra: {
                //         ids: self.selectedList.ids,
                //         names: self.selectedList.names
                //     }
                // });
                // api && api.closeWin();
            },
            // 多选
            chooseItem: function(idx) {
                if (!vm.multiSel) { //判断是否多选
                    vm.chooseItem_old(this.resultList[idx].card_id, this.resultList[idx].card_name);
                }
                var id = this.resultList[idx].card_id;
                var index = this.card_id_list.indexOf(id);

                if (!this.resultList[idx].is_selected) {
                    // this.selected_num++;
                    if (index === -1) {
                        this.card_id_list.push(id);
                        this.card_list_obj[id] = {
                            goal_store_card_name: this.resultList[idx].card_name,
                            goal_store_card_id: this.resultList[idx].card_id
                        };
                    } 
                } else {
                    // if (this.selected_num > 0)  this.selected_num--;
                    if (index !== -1) {
                        this.card_id_list.splice(index, 1);
                        delete this.card_list_obj[id];
                    }
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
                card_name: vm.searchText || ''
            };
        var _url='/app/auth/storecard/getUserfulStoreCardList.do';
        Http.ajax({
            url:_url,
            api_versions: 'v1',
            data:_data,
            success: function(res){
                logger.log({"Type":"operation","action":"目标查询","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
                api.hideProgress && api.hideProgress();
                vm.isFirstLoading = false;
                if(res.success){
                    if(opts.page && opts.page > 1){
                        callback && callback(res.object);
                    }else{
                        if(res.object === null){
                            res.object = []
                        }
                        res.object.forEach(function(item) {
                            if (vm.card_id_list.indexOf(item.card_id) !== -1) {
                                item.is_selected = true;
                            } else {
                                item.is_selected = false;
                            }
                        });
                        vm.resultList = res.object;
                        vm.selected_num = 0;
                        console.log(JSON.stringify(vm.resultList));
                        console.log('vm.idsArray ' + JSON.stringify(vm.idsArray));
                    }
                }else{
                    vm.isFirstLoading = false
                    _g.toast(res.message);
                }
            }
        });

    };
   
    var loadmore = new Loadmore({
        callback: function(page){
            getData({page: page.page}, function(data){
                console.log(data);
                if(!data || data.length === 0){
                    return loadmore.loadend(false);
                }else{
                    data.forEach(function (item) {
                        if (vm.card_id_list.indexOf(item.card_id) !== -1) {
                            item.is_selected = true;
                        } else {
                            item.is_selected = false;
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
        name: 'assistant-targetFilter-storedCard-search'
    }, function (data) {
        vm.searchText = data.value.searchText || '';
        vm.onSearch();
    });

    api.addEventListener && api.addEventListener({
        name: 'assistant-targetFilter-storedCard-search-change'
    }, function (data) {
        vm.searchText = data.value.searchText || '';
        loadmore.loadend(false);
    })

    vm.onSearch();
    window.app = vm;
    module.exports = {};
});
