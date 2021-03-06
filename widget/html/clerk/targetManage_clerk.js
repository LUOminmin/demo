define(function (require,exports,module) {
	var Http = require('U/http');
	var vm = new Vue({
		el:'#targetManage',
		template:_g.getTemplate('clerk/targetManage_clerk-body-V'),
		data:{
			bonus:"2,000.00",
			item:[
				{
					target_name:"十一月第一阶段目标",
					stage:"进行中",
					target_num:'￥100,000.00',
					target_achievement:"50%",
					time:'2015-05-05至2015-06-05',
					target_type:'全场目标',
					id:'',
					saleId:'',
					entId:0
				}
			],
			isFirstLoading:true,
			isNoResult:false,
		},
		created:function () {
          this.item = [];
		},
		ready:function(){
			//设置noResultWrap的高度
			var h = api.frameHeight || window.screen.height
			document.getElementById('noResultWrap').style.height = h + 'px'
		},
		computed: {
			isNoResult: function () {
				if(this.isFirstLoading) return false
				var sta = this.item.length === 0 ? true : false
				return sta
			}
		},
		methods:{
			onTargetShop:function(type,entId){
				var opts = turnToPage(type);
				_g.openWin({
					header: {
						data: {
							title: opts.title,
							rightText:opts.rightText,
						}
					},
					name: opts.name,
					url:  opts.url,
					pageParam: {
						entId : entId
					},
					bounces: false,
					slidBackEnabled: false,
				})
			}
		}
	});

	var getData = function(opts,callback){
		opts = opts || {};
		var _data= {
				displayRecord : 30,
				page : opts.page || 1,
				goal_manager_status : 'manager',
				goal_rang:null
			};
		var _url='/app/auth/goal/sales/listByStatus.do';
		Http.ajax({
			data:_data,
			api_versions: 'v2',
			url:_url,

			success: function(res) {
				logger.log({"Type":"operation","action":"targetManage_clerk获取数据","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
				vm.isFirstLoading = false
				if (res.code == 200) {
					if(opts.page && opts.page > 1){
						setTimeout(function(){
							callback && callback(res);
						}, 0);
					}else{
						setTimeout(function(){
							vm.item = getDetail(res);
						},0)
					}
				} else {
					_g.toast(res.message);
				}
			},
			error: function(err) {
				vm.isFirstLoading = false
			}
		});
	};
	var getDetail = function(res){

		return _.map(res.object,function(item){
			return{
				target_name:item.goal_name,
				stage:targetStage(item.goal_status),
				target_num:item.pre_sales_total_amount ? item.pre_sales_total_amount : 0,
				target_achievement:item.goal_achieved_rate ? item.goal_achieved_rate : 0,
				start_time:item.goal_start_time ? item.goal_start_time.split(' ')[0] : ' '.split(' ')[0],
				end_time:item.goal_end_time ? item.goal_end_time.split(' ')[0] : ' '.split(' ')[0],
				target_type:targetType(item.goal_rang),
				target_code:item.goal_status,
				entId : item.sales_goal_setting_id,
				goal_sales_type: item.goal_sales_type,
			}
		})
	};
	getData();
	var targetType = function(type){
		switch(type){
			case 'Overall':
				return '全场目标';
			case 'Goods':
				return '单品目标';
			case 'Brand':
				return '品牌目标';
			case 'USESTORE':
				return '储值目标';
			case 'ALLUSESTORE':
				return '全场储值目标';
			default:
				return '品类目标';
		}
	};
	var targetStage = function(stage){
		switch (stage){
			case 'doing':
				return '进行中';
			case 'un_pulish':
				return '未发布';
			case 'un_allocate':
				return '待分配';
			case 'allocated':
				return '已分配';
			case 'end':
				return '已完成';
			case 'cancel':
				return '被撤销';
			default:
				return '已失效'
		}
	};

	//boss:未发布（编辑目标）；等待分配，已分配，被撤销（目标详情）；进行中，已完成，已失效（企业排行）;
	//shop:等待分配（编辑目标）;已分配，被撤销（目标详情）；进行中，已完成，已失效（门店详情）;
	//sale:已分配，被撤销（目标详情）；进行中，已完成，已失效（门店详情）;
	var turnToPage = function(type){
		if(type == 'doing' || type == 'end' || type == 'expired'){
			return {
				title: '门店详情',
				rightText:'门店排行',
				name: 'targetShop-detail',
				url: '../assistant/shopDetails_clerk.html'};
		}else if(type == 'allocated' || type == 'cancel'){
			return {
				title: '目标详情',
				rightText:null,
				name: 'targetShop-targetDetailsClerk',
				url: '../clerk/targetDetails_clerk.html'};
		}
	};
	_g.setPullDownRefresh(function() {
			getData();
			loadmore.reset();
	});
	var loadmore = new Loadmore({
		callback: function(page){
			getData({page: page.page}, function(data){
				if(!data.object || data.object.length === 0){
					return loadmore.loadend(false);
				}else{
					vm.item = vm.item.concat(getDetail(data));
					loadmore.loadend(true);
				}
			});
		}
	});
});
