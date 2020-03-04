define(function (require,exports,module) {
	var Http = require('U/http');
	var startNum;
	var endNum;
	var chooseName;
	var dtPicker = new mui.DtPicker({
		type:'date'
	});
	var otPicker = new mui.PopPicker();
	var vm = new Vue({
		el:'#addTarget',
		template:_g.getTemplate('boss/addTarget-body-V'),
		data:{
			isDetail:true,
			isComplete:false,
			saleTypeOption: [],
			storedTypeOption: [
				{
					text: '储值目标',
					value: 'USESTORE'
				},
				{
					text: '全场储值目标',
					value: 'ALLUSESTORE'
				}
			],
			typeOption:[
				{text:'全场目标',value:'Overall'},
				{text:'品类目标',value:'Category'},
				{text:'品牌目标',value:'Brand'},
				{text:'单品目标',value:'Goods'},
			],
			target_range:'请选择',
			sale_type_text: '',
            sale_type_value: null,
            goal_type_id_list: [],
            goal_type_name_list: [],
            good_id_list: [],
			startDay:'请输入',
			endDay:'请输入',
			target_cycle:null,
			complete:1000,
			target_name: '',
			goal_rang : null,
			specific_target:'',
			specific_target_id:'',
			// 会员储值
			specific_target_list: [],
			specific_target_id_list: [],
			specific_target_card_list: [],
			store_id_list: [],
			list:[
			{
				store_name:'门店1',
				store_id:1,
				each_goal:'请输入',
			},
			{
				store_name:'门店3',
				store_id:3,
				each_goal:'请输入',
			},
			],
			preinstall_goal:'',
			disMask : false,
			allNone : true
		},
		created:function () {
			this.target_range = '';
			this.specific_target='';
			this.startDay='';
			this.endDay='';
			this.target_cycle='';
			this.target_name= '';
			this.list = [];
		},
		methods:{
			onSelectDate:function (type) {
				var self = this;
				setTimeout(function(){
					var dtPicker = new mui.DtPicker({
						type:'date'
					});
					dtPicker.show(function (selectItems) {
						if(type.toString() == 'startDay'){
							self[type.toString()] = selectItems.value +' ' + '00:00:00';
							startNum = selectItems.value;
						}else if(type.toString() == 'endDay'){
							self[type.toString()] = selectItems.value +' ' + '23:59:59';
							endNum = selectItems.value;
						}
						if(self.startDay != '请输入' && self.endDay != '请输入'){
							var start = Date.parse(new Date(startNum));
							var end = Date.parse(new Date(endNum));
							self.target_cycle = Math.floor(((end - start)/1000/60/60/24) + 1);
							if(self.target_cycle <= 0){
								_g.toast("开始时间不能大于结束时间");
								self[type.toString()] = '请输入';
								self.target_cycle = null;
							}
						}
						dtPicker.dispose();
					});
				},260);
			},
			onSelectType:function () {
				var self = this;
				if (this.sale_type_value === 'sales_volume' && this.goal_rang === 'Goods') return;
				setTimeout(function(){
					var otPicker = new mui.PopPicker();
					$('.ui-addTarget__textRight').blur();
					$('.ui-addTarget__detail').blur();
					// 目标范围区分
					if (vm.sale_type_value === 'store_price') {
						otPicker.setData(vm.storedTypeOption);
					} else {
						otPicker.setData(vm.typeOption);
					}
					otPicker.show(function (selectItems) {
						vm.target_range = selectItems[0].text;
						vm.goal_rang = selectItems[0].value;
						if(self.goal_rang == 'Overall'){
							vm.specific_target = "全场目标";
						}else if (self.goal_rang == 'ALLUSESTORE') {
							vm.specific_target = '全场储值目标';
							vm.list.forEach(function (item) {
								item.is_able_edit = true;
							});
						} else {
							vm.specific_target = "";
						}
						otPicker.dispose();
					});
					for(var i = 0;i<vm.typeOption.length;i++){
	                    if(self.goal_rang == vm.typeOption[i].value){
	                        otPicker.pickers[0].setSelectedIndex(i, 100);
	                    }
	                }

				},260);
				// if(this.goal_rang != "Goods") {
                //     this.sale_type_value = 'sales_price';
                //     this.sale_type_text = '销售额';
                //     this.goal_type_id_list = [];
                //     this.goal_type_name_list = [];
                // }
			},
			onSelectSaleType: function () {
                setTimeout(function () {
					var otPicker = new mui.PopPicker();
					var oldValue = vm.sale_type_value;
					var _data = {};
					var _url = '/app/auth/goal/getAllGoalSalesType.do';
					Http.ajax({
						data: _data,
						api_versions: 'v2',
						isSync: true,
						url: _url,
						success: function (res) {
							logger.log({ "Type": "operation", "action": "新建目标保存", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url });
							if (res.code == 200) {
								vm.saleTypeOption = [];
								for (var i = 0; i < res.object.length; i++) {
									vm.saleTypeOption.push({
										text: res.object[i].goal_sales_type_name,
										value: res.object[i].goal_sales_type
									})
								}
								$(".mui-poppicker").show();
								otPicker.setData(vm.saleTypeOption);
								otPicker.show(function (selectItems) {
									vm.sale_type_text = selectItems[0].text;
									vm.sale_type_value = selectItems[0].value;
									console.log(vm.sale_type_value);
									// 根据目标类型
									if (vm.sale_type_value === 'store_price') {
										vm.target_range = '储值目标';
										vm.goal_rang = 'USESTORE';
									} else if (vm.sale_type_value === 'sales_volume') {
										vm.target_range = '单品目标';
										vm.goal_rang = 'Goods';
									} else {
										vm.target_range = '';
										vm.goal_rang = '';
									}
									otPicker.dispose();
								})
								for (var i = 0; i < vm.saleTypeOption.length; i++) {
									if (self.sale_type_value == vm.saleTypeOption[i].value) {
										otPicker.pickers[0].setSelectedIndex(i, 100);
									}
								}
							} else {
								_g.toast(res.message);
							}
						},
						error: function (err) {
							_g.hideProgress();
						}
					});
                    
                }, 260)

            },
			onFocus:function (index) {
				$('input').eq(index).focus();
			},
			onTargetFilter:function () {
				console.log(this.sale_type_value);
				console.log(this.goal_rang);
				// 如果当前选中的为全场储值目标，则不可选储值卡
				if (this.goal_rang == 'ALLUSESTORE') {
					return;
				}
				if (this.sale_type_value == 'store_price' && this.goal_rang) {
					_g.openWin({
						header: {
							data: {
								title: '新增目标',
								typeText: this.goal_rang,
								placeholder: '请输入内容',
								isInput: false,
								isShopIn: false,
								isAddTargetIn: false
							},
							template: '../html/main/search-header-storedCard-V',
						},
						name: 'assistant-targetFilter-storedCard-search',
						url: '../assistant/targetFilter_storedCard.html',
						pageParam: {
							title: this.goal_rang,
							type: this.goal_rang,
							sales_type: this.sale_type_value,
							card_list: this.specific_target_card_list
						},
						bounces: false,
						slidBackEnabled: false,
					});
				} else if (this.goal_rang!='Overall' && this.goal_rang){
					_g.openWin({
	                    header: {
	                        data: {
	                            title: '新增目标',
								typeText:targetRange(vm.goal_rang).substring(0,2),
								placeholder:'请输入内容',
								isInput:false,
								isShopIn:false,
								isAddTargetIn:true
	                        },
							template: '../html/main/scan-header-V'
	                    },
	                    name: 'assistant-targetFilter',
	                    url: '../assistant/targetFilter.html',
						pageParam : {
							title : targetRange(this.goal_rang).substring(0,2),
							type : this.goal_rang,
							sales_type : this.sale_type_value,
							good_id_list: this.goal_type_id_list,
							good_name_list: this.goal_type_name_list,
							good_list: this.good_list
						},
	                    bounces: false,
	                    slidBackEnabled: false,
	                });
				}
			},
			onSumTotal:function () {
				var sum = 0;
				_.map(this.list,function (item) {
					if(Number(item.each_goal) && item.each_goal !== null){
						if(item.each_goal.toString().indexOf('.') !== -1){
							_g.toast('不允许输入小数点');
						}else{
							sum += parseFloat(item.each_goal? item.each_goal : 0);
						}
					}
				});
				this.preinstall_goal = sum;
			},
			//hidePick : function(){
			//	$(".mui-dtpicker").hide();
			//	$(".mui-poppicker").hide();
            //},
			//displayMask : function(){
			//	vm.disMask = !vm.disMask;
			//	console.log(vm.disMask);
			//},
			//onCancelItem:function () {
			//	api && api.confirm({
			//	    title: '确认撤销？',
			//	    msg: '撤销后不能恢复',
			//	    buttons: ['确定','取消']
			//	}, function(ret, err) {
			//	   	var index = ret.buttonIndex;
			//	});
			//},
	
		
			onAddItem:function (){

				if(!check()) return false;
				_g.confirm('确定保存？','是否确定保存',function(){	
					var store_list = [];
					var _data={
						goal_name:vm.target_name,
						goal_rang:vm.goal_rang,
						goal_type_name:vm.specific_target,
						goal_type_id:vm.specific_target_id,
						goal_start_time:vm.startDay,
						goal_end_time:vm.endDay,
						goal_period:vm.target_cycle,
						store_goal_list:store_list,
						pre_ent_total_amount:vm.preinstall_goal*100,
						goal_sales_type: vm.sale_type_value,
						// goal_type_name_list: "[" + vm.goal_type_name_list + "]",
						goal_type_name_list: JSON.stringify(vm.goal_type_name_list),
						// goal_type_id_list: "[" + vm.goal_type_id_list + "]",
						goal_type_id_list: JSON.stringify(vm.goal_type_id_list),
					};
					// 如果为会员储值
					if (vm.sale_type_value === 'store_price') {
						delete _data.goal_type_name;
						delete _data.goal_type_id;
						_data.store_card_list = vm.specific_target_card_list
					}
					var _url='/app/auth/goal/company/save.do';
					_.map(vm.list,function (item) {
						var goal_list = {
							store_name:item.store_name,
							store_id:item.store_id,
							pre_store_total_amount:item.each_goal ? item.each_goal*100 : 0,
						};
						store_list.push(goal_list);
					});
					Http.ajax({
						data: _data,
						api_versions: 'v2',
						isSync: true,
						url:_url,
						success: function(res) {
							logger.log({"Type":"operation","action":"新建目标保存","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url});
							if (res.code == 200) {
								api.sendEvent && api.sendEvent({
									name: 'refresh-targetManager'
								});
								api.closeWin && api.closeWin();
							} else {
								_g.toast(res.message);
							}
						},
						error: function(err) {
							_g.hideProgress();
						}
					});
				})
			}
		}
	});

	function check(){
		var allNone = true;
		_.map(vm.list,function (item) {
			if(Number(item.each_goal) && item.each_goal !== null){
				if(item.each_goal.toString().indexOf('.') !== -1){
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
		if(!vm.specific_target){
			_g.toast("具体目标不可为空");
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
	}
	/*
		获取企业门店列表
	 */
	var getData = function(){
		var _url='/app/auth/store/list.do';
		Http.ajax({
			data: {},
			api_versions: 'v2',
			url:_url,
			success: function(res) {
				logger.log({"Type":"operation","action":"获取企业门店列表","Win_name":api.winName,"message":res,"requireURL":_url})
				if (res.code == 200) {
					setTimeout(function(){
						vm.list = getDetail(res);
					}, 0);
				} else {
					_g.toast(res.message);
				}
			},
			error: function(err) {}
		});
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
	/*
		过滤企业门店列表
	 */
	var getDetail = function(res){
		return _.map(_.filter(res.object, function(item){
			return item.org_type === '002';
		}), function(item){
			return{
				store_name:item.org_name,
				store_id:item.org_id,
				real_store_id: item.store_id,
				is_able_edit: true
			};
		});
	};
	getData();
	
    api.addEventListener({
        name: 'chooseMany'
    }, function (ret, err) {
        // alert(JSON.stringify(ret));
        vm.goal_type_id_list = ret.value.goal_type_id_list;
        vm.goal_type_name_list = ret.value.goal_type_name_list;
        // alert(vm.goal_type_id_list);
        vm.specific_target = '' + ret.value.goal_type_name_list;
        // vm.good_list = ret.value.good_list;
        var temp = [];
        ret.value.good_list.forEach(function (item) {
        	temp.push({
        		id: item.id,
        		name: item.name
        	})
        });
        vm.good_list = temp;
	});
	
	// 监听选择目标返回的数据信息
	api.addEventListener && api.addEventListener({
	    name: 'choose'
	}, function(ret, err) {
	    chooseName = ret.value;
	    vm.specific_target = chooseName.key2;
	    vm.specific_target_id = chooseName.key1;
	    vm.list.forEach(function (item) {
			item.is_able_edit = true;
		})
	});
	api.addEventListener && api.addEventListener ({
		name: 'choose_2'
	}, function (ret, err) {
		chooseName = ret.value;
		vm.specific_target_list = chooseName.names;
		vm.specific_target = chooseName.names;
		vm.specific_target_id = chooseName.ids;
		
		vm.store_id_list = chooseName.storeIdList;
		console.log(chooseName.storeIdList);
		console.log(vm.store_id_list);
		// 这里需要更新可使用门店
		// vm.list
		vm.list.forEach(function (item) {
			if (vm.store_id_list.indexOf(item.real_store_id) !== -1) {
				item.is_able_edit = true;
			} else {
				item.is_able_edit = false;
				// 清空不在使用范围门店已输入的金额
				item.each_goal = '';
			}
		});
		// 重算预设目标
		vm.onSumTotal();
		
		vm.specific_target_card_list = chooseName.cardList;
	});
	api.addEventListener && api.addEventListener({
	    name: 'publish'
	}, function(ret, err) {
		var store_list = [];
		var _data={
			goal_status:'un_allocate',
			goal_name:vm.target_name,
			goal_rang:vm.goal_rang,
			goal_type_name:vm.specific_target,
			goal_type_id:vm.specific_target_id,
			goal_start_time:vm.startDay,
			goal_end_time:vm.endDay,
			goal_period:vm.target_cycle,
			store_goal_list:store_list,
			pre_ent_total_amount:vm.preinstall_goal*100
		};
		logger.log({"Type":"operation","action":"发布","Win_name":api.winName,"data":_data});
		if(!check()) return false;
		var store_list = [];
		var _data={
			goal_status:'un_allocate',
			goal_name:vm.target_name,
			goal_rang:vm.goal_rang,
			goal_type_name:vm.specific_target,
			goal_type_id:vm.specific_target_id,
			goal_start_time:vm.startDay,
			goal_end_time:vm.endDay,
			goal_period:vm.target_cycle,
			store_goal_list:store_list,
			pre_ent_total_amount:vm.preinstall_goal*100,
			goal_sales_type: vm.sale_type_value,
			// goal_type_name_list: "[" + vm.goal_type_name_list + "]",
			goal_type_name_list: JSON.stringify(vm.goal_type_name_list),
			// goal_type_id_list: "[" + vm.goal_type_id_list + "]",
			goal_type_id_list: JSON.stringify(vm.goal_type_id_list),
		};
		if (vm.sale_type_value === 'store_price') {
			delete _data.goal_type_name;
			delete _data.goal_type_id;
			_data.store_card_list = vm.specific_target_card_list
		}
		logger.log({"Type":"operation","action":"确认发布","Win_name":api.winName,"data":_data})
		//做按钮左右位置兼容
		if(_g.isIOS){
			api && api.confirm({
		    title: '确认发布？',
		    msg: '是否确认发布',
		    buttons: ['取消','确定']
			}, function(ret, err) {
				if(ret.buttonIndex == 2){
					_.map(vm.list,function (item) {
						var goal_list = {
							store_name:item.store_name,
							store_id:item.store_id,
							pre_store_total_amount:item.each_goal ? item.each_goal*100 : 0
						};
						store_list.push(goal_list);
					});
                 var _url='/app/auth/goal/company/save.do';
					Http.ajax({
						data: _data,
						api_versions: 'v2',
						isSync: true,
						url:_url,
						success: function(res) {
							logger.log({"Type":"operation","action":"发布目标","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
							if (res.code == 200) {
								api.sendEvent && api.sendEvent({
									name: 'refresh-targetManager'
								});
								api.closeWin && api.closeWin();
							} else {
								_g.toast(res.message);
							}
						},
						error: function(err) {}
					});
				}
			});
		}else if(_g.isAndroid){
			api && api.confirm({
		    title: '确认发布？',
		    msg: '是否确认发布',
		    buttons: ['确定','取消']
			}, function(ret, err) {
				if(ret.buttonIndex == 1){
					_.map(vm.list,function (item) {
						var goal_list = {
							store_name:item.store_name,
							store_id:item.store_id,
							pre_store_total_amount:item.each_goal ? item.each_goal*100 : 0,
							goal_sales_type: vm.sale_type_value,
							// goal_type_name_list: "[" + vm.goal_type_name_list + "]",
							goal_type_name_list: JSON.stringify(vm.goal_type_name_list),
							// goal_type_id_list: "[" + vm.goal_type_id_list + "]",
							goal_type_id_list: JSON.stringify(vm.goal_type_id_list),
						};
						store_list.push(goal_list);
					});
                   var _url='/app/auth/goal/company/save.do';
					Http.ajax({
						data: _data,
						api_versions: 'v2',
						isSync: true,
						url:_url,
						success: function(res) {
							logger.log({"Type":"operation","action":"安卓发布目标","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
							if (res.code == 200) {
								api.sendEvent && api.sendEvent({
									name: 'refresh-targetManager'
								});
								api.closeWin && api.closeWin();
							} else {
								_g.toast(res.message);
							}
						},
						error: function(err) {}
					});
				}
			});
		}

	});

	/*
	  屏蔽输入框小数点
	 */
	$(document).on('keydown',function(e){
		e = e || event;
		if(e.keyCode == 190) return false;
	});
	window.app = vm;
})
