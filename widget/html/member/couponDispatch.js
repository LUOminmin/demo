define(function (require, exports, module) {
	var Http = require('U/http');

	// 获取页面传递过来参数
	var title = api.pageParam.title;
	var phone = api.pageParam.phone;
	var user_id = api.pageParam.user_id

	// 获取UUID
	// 企业id4位，用户id + 随机字符串（12）
	// var getUUID = function (len, radix) {
	// 	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	// 	var uuid = [], i;
 //        radix = radix || chars.length;
 //        len = len || 16;

 //        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        	
 //        return uuid.join('');
	// }

	// // 设备码
	// // 部分机型获取设备码可能出现问题
	// var deviceId = window.api.deviceId || getUUID();

	// 用于防止多次派发
	var uuid = _g.getUUID();

	var vm = new Vue({
		el: '#couponDispatch',
		template: _g.getTemplate('member/couponDispatch-body-V'),
		data: {
			list: [
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
			tipType: false,

			currentCouponId: -1,
			currentIndex: -1,

			noneCouponDataStatus: false,
			showCoupon: true,
			// 卡券派发状态
			is_dispensable: false,
			is_limit: false,
			limit_num: 0,
			residual_dispensable_num: 0,
		},
		create: function () {

		},
		computed: {
			selectedList: function () {
				var currentList = [];
				for (var i = 0; i < this.list.length; i++) {
					if (this.list[i].selected) currentList.push(this.list[i]);
				}
				return currentList;
			},
			selectedAmount: function () {
				return this.selectedList.length;
			},
			isAbleDispatchCoupon: function () {
				var result = true;
				if (this.is_limit && (this.selectedAmount > this.residual_dispensable_num || this.residual_dispensable_num === 0)) {
					result = false;
				}
				return result;
			}
		},
		methods: {
			onDispatchCouupon: function () {
				if (this.selectedList.length === 0) return _g.toast('请先选择卡券');
				this.showDialog = true;
			},
			// 查看、收起详情
			onChangDetailedStatus: function (index, item) {
				// 查看详情
				// 已请求过的详情不再请求
				if (!item.isSpread && !item.isCache) {
					this.currentCouponId = item.coupon_batch_id;
					this.currentIndex = index;
					requestInterface('getCouponDetail');
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
			onDialogCancel: function () {
				this.showDialog = false;
			},
			onDialogEnter: function () {
				requestInterface('dispatchCoupon');
				this.showDialog = false;
			}
		},
		filters: {
			clearSign: function (value) {
				if (!value) return '';
				var reg = /^、|、$/g;
				return value.replace(reg, '');
			}
		}
	});

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
				_g.toast(err);
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
					var browser = window.api.require('webBrowser');
					browser.historyBack(
						function(ret, err) {
							if (!ret.status) {
								api.closeWin();
								api.sendEvent && api.sendEvent({
									name: 'dispatch-coupon-success'
								});
							}
						}
					);
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
					vm.list[vm.currentIndex].isSpread = true;
					vm.list[vm.currentIndex].isCache = true;
				}
			},
			error: function (err) {
				_g.toast(err);
			}
		}
	};

	// 获取选中卡券ID
	var getCouponID = function	() {
		var couponId = [];
		vm.list.forEach(function (item) {
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
	var requestInterface = function	(type) {
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
	};

	// 处理卡券数据
	var handleCouponData = function	(data) {
		if (!data || !data.count) {
			vm.showCoupon = false;
			vm.noneCouponDataStatus = true;
			return;
		}
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
		});
		vm.list = data.detailList;
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
		vm.list[vm.currentIndex].goodScope = stores_good_name + '、' + shop_good_name;

		// 适用范围
		var stores_name = data.stores_name_for_app || '';
		var shop_name = data.shops_name_brief || '';
		vm.list[vm.currentIndex].scope = stores_name + '、' + shop_name;

		// 说明
		vm.list[vm.currentIndex].explain = data.remark;
	};

 	// 初始化操作
 	var init = function () {
 		vm.list = [];
 		requestInterface('getCoupon');
 	};

 	init();
	module.exports = {};
})