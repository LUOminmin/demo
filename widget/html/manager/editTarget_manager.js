define(function (require,exports,module) {
	var Http = require('U/http');
	// entry 1 --- targetManage_manager (manager)
	var entId = api.pageParam.entId;
	var vm = new Vue({
		el:'#editTarget_manager',
		template:_g.getTemplate('manager/editTarget_manager-body-V'),
		data:{
			target_name:null,
			saleTypeOption: [{text: '销售额', value: 'sales_price'}, {text: '销量', value: 'sales_volume'}],
			typeOption:[{text:'全场目标',value:'Overall'},{text:'品类目标',value:'Category'},{text:'品牌目标',value:'Brand'},{text:'单品目标',value:'Goods'}],
			target_range:'请选择',
			sale_type_text: '销售额',
            sale_type_value: 'sales_price',
            goal_type_id_list: [],
            goal_type_name_list: [],
			target_details:'请选择',
			target_details_id:'',
			ent_goal_setting_id:'',
			startDay:'2017-02-04 00:00:00',
			endDay:'2017-02-04 23:59:59',
			target_cycle:1,
			shop_target:'',
			confirm_target:'',
			goal_rang:null,
			complete:null,
			list:[
			{
				store_name:'店员1',
				each_goal:'',
			},
			{
				store_name:'店员2',
				each_goal:'',
			},
			{
				store_name:'店员3',
				each_goal:'',
			},
			],
			preinstall_goal:'',
			preinstall_goal_id:'',
			allNone : true,
		},
		created:function () {
      		this.target_range = '';
			this.startDay='';
			this.endDay='';
			this.target_details = '';
			this.target_cycle=null;
			this.target_name= '';
			this.complete = null;
			this.list = [];
		},
		methods:{
			onSelectDate:function (type) {
				var self = this;
				dtPicker.show(function (selectItems) {
					if(type.toString() == 'startDay'){
					 	self[type.toString()] = selectItems.value +' ' + '00:00:00';
					}else if(type.toString() == 'endDay'){
						self[type.toString()] = selectItems.value +' ' + '23:59:59';
					}
                    if(self.startDay != '请输入' && self.endDay != '请输入'){
                    	var start = Date.parse(new Date(self.startDay.substring(0, 10)));
                    	var end = Date.parse(new Date(self.endDay.substring(0, 10)));
                    	self.target_cycle = Math.floor(((end - start)/1000/60/60/24) + 1);
                    	if(self.target_cycle <= 0){
                    		_g.toast("开始时间不能大于结束时间")
                    		self[type.toString()] = '请输入';
                    		self.target_cycle = null;
                    	}
                    }
                });
			},
			onSelectType:function () {
				var self = this;
				otPicker.setData(this.typeOption);
				otPicker.show(function (selectItems) {
					self.target_range = selectItems[0].text;
					self.goal_rang = selectItems[0].value;
					if(self.goal_rang=='Overall'){
						vm.specific_target="";
					}
				})
				if(this.goal_rang != "Goods") {
                    this.sale_type_value = 'sales_price';
                    this.sale_type_text = '销售额';
                    this.goal_type_id_list = [];
                    this.goal_type_name_list = [];
                }

			},
			onSelectSaleType: function () {
                setTimeout(function () {
					var otPicker = new mui.PopPicker();
					var oldValue = vm.sale_type_value;
                    $(".mui-poppicker").show();
                    otPicker.setData(vm.saleTypeOption);
                    otPicker.show(function (selectItems) {
                        vm.sale_type_text = selectItems[0].text;
						vm.sale_type_value = selectItems[0].value;
						if(oldValue != vm.sale_type_value) {
							vm.goal_type_id_list = [];
							vm.goal_type_name_list = [];
							vm.specific_target = '';
							vm.specific_target_id = '';
						}
                        otPicker.dispose();
                    })
                    for(var i = 0;i<vm.saleTypeOption.length;i++){
                        if(self.sale_type_value == vm.saleTypeOption[i].value){
                            otPicker.pickers[0].setSelectedIndex(i, 100);
                        }
                    }
                }, 260)

            },
			onTargetFilter:function () {


				if(this.goal_rang!='Overall'&&this.goal_rang){
					_g.openWin({
	                    header: {
	                        data: {
	                            title: '具体目标',
	                        }
	                    },
	                    name: 'assistant-targetFilter',
	                    url: '../assistant/targetFilter.html',
	                    bounces: false,
	                    slidBackEnabled: false,
	                });
				}

			},
			onSumTotal:function () {
				var sum = 0;
				var each = 0;
				_.map(this.list,function (item) {
					if(Number(item.each_goal) && item.each_goal != null){
						if(item.each_goal.toString().indexOf('.') != -1){
							_g.toast('不允许输入小数点');
						}else{
							sum += parseFloat(item.each_goal? item.each_goal : 0);
						}
					}
				});
				this.shop_target = sum ? sum * 100 : 0;
			},

			onAddItem:function(){
				if(!check()) return false;
				if(vm.confirm_target == vm.shop_target/100){
					if(vm.confirm_target==""){
						_g.toast("确认门店目标不可为空");
						return false;
					}
					var store_list = [];
					var _data={
						ent_goal_setting_id:vm.ent_goal_setting_id,
						goal_end_time:vm.endDay,
						goal_name:vm.target_name,
						goal_period:vm.target_cycle,
						goal_rang:vm.goal_rang,
						goal_start_time:vm.startDay,
						goal_type_id:vm.target_details_id,
						goal_type_name:vm.target_details,
						pre_store_total_amount:vm.preinstall_goal,
						sales_goal_list:store_list,
						store_goal_amount:vm.shop_target,
						store_goal_setting_id:vm.preinstall_goal_id,
						goal_sales_type: vm.sale_type_value,
						// goal_type_name_list: "[" + vm.goal_type_name_list + "]",
						goal_type_name_list: JSON.stringify(vm.goal_type_name_list),
						// goal_type_id_list: "[" + vm.goal_type_id_list + "]",
						goal_type_id_list: JSON.stringify(vm.goal_type_id_list),
					};
                    var _url='/app/auth/goal/store/edit.do';
					if(_g.isIOS){
						api && api.confirm({
						 title: '确认保存？',
						 msg: '是否确认保存',
						 buttons: ['取消','确定']
				 		 }, function(ret, err) {
				 		 	logger.log({"Type":"operation","action":"确定保存","Win_name":api.winName,"data":_data});
							if(ret.buttonIndex == 2){
							//	var store_list = [];
								api.showProgress && api.showProgress({
				 		 			style: 'default',
				 		 			animationType: 'fade', 
				 		 			title: '正在保存中...'
				 		 		});
								_.map(vm.list,function (item) {
									var goal_list = {
										sales_name:item.store_name,
										sales_id:item.store_id,
										sales_goal_setting_id:item.store_goal_setting_id,
										pre_sales_total_amount:item.each_goal ? item.each_goal*100 : 0
									};
									store_list.push(goal_list);
								});
								Http.ajax({
									data: _data,
									api_versions: 'v2',
									url:_url,
									success: function(res) {
										logger.log({"Type":"operation","action":"店长编辑目标保存数据","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
										_g.hideProgress();
										if (res.code == 200) {
											api.sendEvent && api.sendEvent({
											    name: 'refresh-targetManager',
											});
											api.sendEvent && api.sendEvent({
											    name: 'refresh-messageCenter',
											});
											api && api.closeWin();

										} else {
											_g.toast(res.message);
										}
									},
									error: function(err) {
										_g.hideProgress();
									}
								})
							 }
						});
					}else if(_g.isAndroid){
						api && api.confirm({
						 title: '确认保存？',
						 msg: '是否确认保存',
						 buttons: ['确定','取消']
				 		 }, function(ret, err) {
				 		 	logger.log({"Type":"operation","action":"确定保存","Win_name":api.winName,"data":_data});
							if(ret.buttonIndex == 1){
							//	var store_list = [];
								api.showProgress && api.showProgress({
				 		 			style: 'default',
				 		 			animationType: 'fade', 
				 		 			title: '正在保存中...'
				 		 		});
								_.map(vm.list,function (item) {
									var goal_list = {
										sales_name:item.store_name,
										sales_id:item.store_id,
										sales_goal_setting_id:item.store_goal_setting_id,
										pre_sales_total_amount:item.each_goal ? item.each_goal*100 : 0
									};
									store_list.push(goal_list);
								});
								Http.ajax({
									data: _data,
									api_versions: 'v2',
									url:_url,
									success: function(res) {
										_g.hideProgress();
										logger.log({"Type":"operation","action":"店长编辑目标保存数据","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
										if (res.code == 200) {
											api.sendEvent && api.sendEvent({
											    name: 'refresh-targetManager',
											});
											api.sendEvent && api.sendEvent({
											    name: 'refresh-messageCenter',
											});
											api && api.closeWin();

										} else {
											_g.toast(res.message);
										}
									},
									error: function(err) {
										_g.hideProgress();
									}
								})
							 }
						});
					}

				}else{
					_g.toast("确认门店目标与门店目标不一致");
				}

			}
		}
	});
	var getchoose = function(){
		api.addEventListener && api.addEventListener({
		    name: 'choose'
		}, function(ret, err) {
		    chooseName = ret.value;
		    vm.target_details = chooseName.key2;
		    vm.target_details_id = chooseName.key1;
		});
	};
	var getData = function(){
		var _data= {
				store_goal_setting_id:entId
			};
		var _url='/app/auth/goal/store/get.do';
		Http.ajax({
			data:_data,
			api_versions: 'v2',
			url:_url,
			success: function(res) {
				logger.log({"Type":"operation","action":"店长编辑目标获取数据","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
				if (res.code == 200) {
					if(res.object != null && res.object.goal_status != 'un_allocate') {
						setTimeout(function() {
							_g.openWin({
								header: {
									data: {
										title: '门店详情',
										rightText: '门店排行',
									}
								},
								name: 'targetShop-detail',
								url: '../assistant/shopDetails.html',
								pageParam: {
									entId: entId,
									closeEdit : true
								},
								bounces: false,
								slidBackEnabled: false,
							});
						}, 200);
					}
					setTimeout(function(){
						vm.target_name = res.object.goal_name;
						vm.target_range = targetRange(res.object.goal_rang);
						vm.goal_rang = res.object.goal_rang;
						vm.target_details = res.object.goal_type_name;
						vm.target_details_id = res.object.goal_type_id;
						vm.startDay = res.object.goal_start_time;
						vm.endDay = res.object.goal_end_time;
						vm.target_cycle = res.object.goal_period;
						if(res.object.sales_goal_list==""){
								getPeople();
						}else{
							vm.list = getStore(res.object.sales_goal_list);
						}
						vm.shop_target = res.object.store_goal_amount;
						vm.preinstall_goal = res.object.pre_store_total_amount;
						vm.preinstall_goal_id = res.object.store_goal_setting_id;
						vm.ent_goal_setting_id = res.object.ent_goal_setting_id;
						vm.sale_type_value = res.object.goal_sales_type;
                        vm.sale_type_text = typeText(res.object.goal_sales_type);
                        vm.goal_type_id_list = JSON.parse(res.object.goal_specific_value);

                        if (res.object.goal_sales_type == 'store_price') {
                            vm.specific_target_card_list = res.object.store_card_list || [];
                            var nameList = [];
                            if (res.object.goal_rang == 'ALLUSESTORE') {
                                vm.target_details = '全场储值目标';
                            } else {
                                res.object.store_card_list.forEach(function (item) {
                                    nameList.push(item.goal_store_card_name);
                                });
                                vm.target_details = nameList.join(',');
                            }
                        } else {
                            vm.goal_type_name_list = res.object.goal_type_name.split(',');
                        }

					}, 0);
				} else {
					_g.toast(res.message);
				}
			},
			error: function(err) {
				_g.hideProgress();
			}
		})
	};
	var getStore = function(res){
		return _.map(res,function(item){

			return{
				store_name:item.sales_name,
				store_id:item.sales_id,
				each_goal:item.pre_sales_total_amount/100,
				store_goal_setting_id:item.sales_goal_setting_id
			}
		})
	};
	var getPeople = function(){
		api.showProgress && api.showProgress({
            style: 'default',
            animationType: 'fade', 
            title: '努力加载中...'
        });
		var _data={
				displayRecord:10,
				org_id:entId,
				include_company_admin:false,
				page:1
			};
		var _url='/app/auth/sales/list.do';
		Http.ajax({
			data:_data,
			api_versions: 'v2',
			url:_url,
			success: function(res) {
				logger.log({"Type":"operation","action":"店长编辑目标获取店员数据","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
				api.hideProgress && api.hideProgress();
				if (res.code == 200) {
					setTimeout(function(){
						var peopleList = [];
						_.map(res.object,function (item) {

						var people_list = {
							store_name:item.sales_name,
							store_id:item.sales_id,
							store_goal_setting_id:0,
							each_goal:""
						};
						peopleList.push(people_list);
					})
					vm.list = peopleList;
					}, 0);
				} else {
					_g.toast(res.message);
				}
			},
			error: function(err) {
				api.hideProgress && api.hideProgress();
			}
		})
	};
	var targetRange = function(stage){
       switch (stage){
		   case 'Overall':
			   return '全场目标';
		   case 'Goods':
			   return '单品目标';
		   case 'Brand':
			   return '品牌目标';
		   case 'Category':
			   return '品类目标';
			case 'USESTORE':
				return '储值目标';
			case 'ALLUSESTORE':
				return '全场储值目标';

	   }
	};
	var typeText = function (type) {
        switch (type) {
            case 'sales_price':
                return '销售额';
            case 'sales_volume':
                return '销量';
            case 'store_price':
                return '会员储值'
        }
    }
	getData();
	getchoose();
	api.addEventListener({
        name: 'chooseMany'
    }, function (ret, err) {
        // alert(JSON.stringify(ret));
        vm.goal_type_id_list = ret.value.goal_type_id_list;
        vm.goal_type_name_list = ret.value.goal_type_name_list;
        // alert(vm.goal_type_id_list);
        vm.specific_target = '' + ret.value.goal_type_name_list;
    });

    var check = function(){
		var allNone = true;
		_.map(vm.list,function (item) {
			if(Number(item.each_goal) && item.each_goal != null){
				if(item.each_goal.toString().indexOf('.') != -1){
					allNone = false;
				}
			}
		});
		var allPositive = true;
		_.map(vm.list,function (item) {
			if(Number(item.each_goal) < 0){
				allPositive = false;
			}
		});
		if(vm.target_name.length>10){
			_g.toast("目标名称不可超过10位");
			return false;
		}
		if(vm.target_name==""){
			_g.toast("目标名称不可为空");
			return false;
		}
		if(!vm.target_range){
			_g.toast("目标范围不可为空");
			return false;
		}
		if(vm.startDay=="" || vm.startDay=="请输入" || !vm.startDay){
			_g.toast("开始时间不可为空");
			return false;
		}
		if(vm.endDay=="" || vm.endDay=="请输入" || !vm.endDay){
			_g.toast("结束时间不可为空");
			return false;
		}
		if(vm.target_cycle==""){
			console.log(this.target_cycle);
			_g.toast("目标周期不可为空");
			return false;
		}

		if(!allNone){
			_g.toast("不允许输入小数点");
			return false;
		}
		if(!allPositive){
			_g.toast("不允许输入负数");
			return false;
		}
		return true;
	};
	/*
	 屏蔽输入框小数点
	 */
	$(document).on('keydown',function(e){
		e = e || event;
		if(e.keyCode == 190) return false;
	});

	window.app = vm;

})
