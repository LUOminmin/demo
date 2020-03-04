define(function (require, exports, module) {
	var Http = require('U/http');
	var role = _g.getLS('UserInfo').notes;
	var vm = new Vue({
		el: '#targetManage',
		template: _g.getTemplate('assistant/mes-targetManage-body-V'),
		data: {
			list: [{
				title: '你有新的指标考核任务',
				text: '惠氏8月份销售目标(目标：5000.00元)',
				time: '13:58',
				imgUrl: '../../image/assistant/tar_03.jpg',
				httpUrl: '4226', //目标id
			}, {
				title: '指标考核结束，恭喜你获得',
				text: '"可瑞乐8月冲刺"指标考核已结束，你...',
				time: '昨天',
				imgUrl: '../../image/assistant/tar_06.jpg',
				httpUrl: '4217',
			}, {
				title: '指标考核结束，恭喜',
				text: '"可瑞乐8月冲刺"指标考核已结束，你...',
				time: '2018-09-55',
				imgUrl: '../../image/assistant/tar_08.jpg',
				httpUrl: '4226',
			}, {
				title: '指标考核结束，恭喜',
				text: '"可瑞乐8月冲刺"指标考核已结束，你...',
				time: '2018-09-55',
				imgUrl: '../../image/assistant/tar_10.png',
				httpUrl: '4226',
			}],
		},
		created: function () {
			var self = this;
			self.list = [];
		},
		methods: {
			goToPage: function (httpUrl, type, mes_title) {
				var opts = this.getPageOpts(httpUrl, type, mes_title);
				_g.openWin({
					header: {
						data: {
							title: opts.title,
							rightText: opts.rightText,
						}
					},
					name: opts.name,
					url: opts.url,
					pageParam: {
						entId: httpUrl,
						// cancel : opts.cancel
					},
					bounces: false,
					slidBackEnabled: false,
				});
			},
			// 后期建议让后台给每种消息体加跳转类型，判断跳到何种角色的编辑页，何种角色的详情页
			getPageOpts: function (httpUrl, type, mes_title) {
				if (type == 'Goal_Sprint') {
					if (role === 'company_admin') {
						return {
							title: '门店排行',
							rightText: '店员',
							name: 'targetShop-rank',
							url: '../assistant/targetShopRank.html'
						};
					} else if (role === 'store_admin') {
						return {
							title: '门店详情',
							rightText: '门店排行',
							name: 'targetShop-detail',
							url: '../assistant/shopDetails.html'
						};
					} else {
						return {
							title: '门店详情',
							rightText: '门店排行',
							name: 'targetShop-detail',
							url: '../assistant/shopDetails_clerk.html'
						};
					}
				} else if (type == 'Goal_Rankings') {
					return {
						title: '门店详情',
						rightText: '门店排行',
						name: 'targetShop-detail',
						url: '../assistant/shopDetails_clerk.html'
					};
				} else {
					if (role === 'company_admin') {
						if (httpUrl) {
							if (mes_title == '你有新的指标考核任务') {
								return {
									title: '门店详情',
									rightText: '门店排行',
									name: 'targetShop-detail',
									url: '../assistant/shopDetails_clerk.html'
								};
							} else {
								return {
									title: '门店排行',
									rightText: '店员',
									name: 'targetShop-rank',
									url: '../assistant/targetShopRank.html'
								};
							}
						} else if (httpUrl == '') {
							return {
								title: '目标管理',
								name: 'targetManage',
								url: '../boss/targetManage.html'
							};
						}
					} else if (role === 'store_admin') {
						if (httpUrl) {
							if (type == 'Goal_Access' && mes_title != '你有新的指标考核任务') {
								return {
									title: '编辑目标',
									rightText: null,
									name: 'targetShop-editTargetManager',
									url: '../../html/manager/editTarget_manager.html'
								};
							} else if (type == 'Goal_Access' && mes_title == '你有新的指标考核任务') {
								return {
									title: '门店详情',
									rightText: '门店排行',
									name: 'targetShop-detail',
									url: '../assistant/shopDetails_clerk.html'
								};
							} else {
								return {
									title: '门店详情',
									rightText: '门店排行',
									name: 'targetShop-detail',
									url: '../assistant/shopDetails.html'
								};
							}
						} else if (httpUrl == '') {
							return {
								title: '目标管理',
								name: 'targetManage_manager',
								url: '../manager/targetManage_manager.html'
							};
						}
					} else if (role === 'sales') {
						if (httpUrl) {
							return {
								title: '门店详情',
								rightText: '门店排行',
								name: 'targetShop-detail',
								url: '../assistant/shopDetails_clerk.html'
							};
						} else if (httpUrl == '') {
							return {
								title: '目标管理',
								name: 'targetManage_clerk',
								url: '../clerk/targetManage_clerk.html'
							};
						}
					}
				}
			}
		},
	});

	var getData = function (opts, callback) {
		var opts = opts || {};
		var _data = {
			total_page: 10,
			current_page: opts.page || 1,
		};
		var _url = '/app/auth/message/center/list.do';
		Http.ajax({
			data: _data,
			api_versions: 'v2',
			url: _url,
			success: function (res) {
				logger.log({ "Type": "operation", "action": "获取消息中心目标管理列表", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url })
				if (res.code == 200) {
					if (opts.page && opts.page > 1) {
						setTimeout(function () {
							callback && callback(res)
						}, 0)
					} else {
						if (res.object) {
							vm.noResult = false;
						} else {
							vm.noResult = true;
						}
						var list = [];
						res.object.list.forEach(function (item, i) {
							var theItem = JSON.parse(item.context);
							switch (theItem.type) {
								case 'Goal_Access':
									theItem.imgUrl = '../../image/assistant/tar_06.jpg';
									break;
								case 'Goal_Rankings':
									// theItem.imgUrl = '../../image/assistant/tar_03.jpg';
									break;
								case 'Goal_Encourage':
									theItem.imgUrl = '../../image/assistant/tar_03.jpg';
									break;
								case 'Goal_Sprint':
									theItem.imgUrl = '../../image/assistant/tar_08.jpg';
									break;
								case 'Goal_Strive':
									theItem.imgUrl = '../../image/assistant/tar_10.png';
									break;
							}
							theItem.time = item.create_time;
							list.push(theItem);
						});
						vm.list = list;
					}
				} else {
					_g.toast(res.message);
				}
			},
			error: function (err) { }
		});
	};

	getData();

	var loadmore = new Loadmore({
		callback: function (page) {
			getData({ page: page.page }, function (res) {
				if (!res.object.list || res.object.list.length === 0) {
					return loadmore.loadend(false);
				} else {
					var list = [];
					res.object.list.forEach(function (item, i) {
						var theItem = JSON.parse(item.context);
						switch (theItem.type) {
							case 'Goal_Access':
								theItem.imgUrl = '../../image/assistant/tar_06.jpg';
								break;
							case 'Goal_Rankings':
								// theItem.imgUrl = '../../image/assistant/tar_03.jpg';
								break;
							case 'Goal_Encourage':
								theItem.imgUrl = '../../image/assistant/tar_03.jpg';
								break;
							case 'Goal_Sprint':
								theItem.imgUrl = '../../image/assistant/tar_08.jpg';
								break;
							case 'Goal_Strive':
								theItem.imgUrl = '../../image/assistant/tar_10.png';
								break;
						}
						theItem.time = item.create_time;
						list.push(theItem);
					});
					vm.list = vm.list.concat(list);
					loadmore.loadend(true);
				}
			});
		}
	});

	_g.setPullDownRefresh(function () {
		setTimeout(function () {
			getData();
			loadmore.reset();
		}, 0)
	})

	//接收到阿里推送通知
	api && api.addEventListener({
		name: 'aliNotify'
	}, function (ret, err) {
		getData();
	});
})
