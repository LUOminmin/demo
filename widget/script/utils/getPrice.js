define(function(require, exports, module) {

    var Http = require('U/http');
    var isSeeBuyPrice = false;
    var priceConfig = { //价格策略
        retail_price: false,
        wholesale_price: false,
        allocation_price: false,
        buy_price: false,
        user_level_price: false,
    }
    function getPrice(){
        Http.ajax({
            url:'/app/auth/erp/getSucSettingConfig.do',
            success:function(ret){
                if (ret.success) {
                    if (ret.object && ret.object.priceSettingConfigVOList) {
                        var i = 0;
                        var priceList = ret.object.priceSettingConfigVOList;
                        for (i = 0; i < priceList.length; i++) {
                            priceConfig[priceList[i].suc_setting_config_code] = !!priceList[i].isAbleSee;
                        }
                    }
                    isSeeBuyPrice = !!priceConfig.buy_price;
                    priceConfig.isSeeBuyPrice = priceConfig.buy_price;
                    return priceConfig;
                } else {
                    _g.toast(ret.message);
                }
            }
        })
    }
    module.exports = getPrice;
});

