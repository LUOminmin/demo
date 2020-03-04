define(function(require, exports, module) {
    var Http = require('U/http');
    var MemberRebuildService = {
        defaultAction: '',  //在获取配置成功 或者 不需要更新配置的时候默认执行的方法
        ifUpdate: function(defaultCallback) {    //是否需要重新获取配置
            var self = this;
            self.defaultAction = defaultCallback ? defaultCallback : null;
            var confTime = '';
            var callback = function(res) {  //获取配置成功之后的回调
                var rebuild = self.rebuildData(res);
                _g.setLS('getTaskConfTime',confTime);   //缓存最后更新配置时间
                _g.setLS('taskConf',rebuild);   //缓存配置
                self.defaultAction && self.defaultAction();   //执行默认的方法
            };
            Http.ajax({
                data: {},
                api_versions: 'v2',
                url: '/app/auth/home/task/getLastUpdateTime.do',
                timeout: 2,
                success: function (ret) {
                    confTime = ret.object || 0;  //后台返回的时间
                    var localTime = _g.getLS('getTaskConfTime') || 0;   //本地最后一次更新配置的时间
                    if(confTime <= localTime) {
                        self.defaultAction && self.defaultAction();
                        // return;
                    }
                    self.getConf(callback);
                },
                error: function (err) { 
                    self.getConf(callback);
                },
            });
        },
        getConf: function(callback) { //从后台获取配置
            Http.ajax({
                data: {
                    parent_id: '0',     //一开始获取配置默认传0
                },
                api_versions: 'v2',
                url: '/app/auth/home/task/get.do',
                timeout: 2,
                success: function (ret) {
                    var result = ret.object || [];
                    callback && callback(result);
                },
                error: function (err) { 
                },
            });
        },
        rebuildData: function(list) { //重组配置数据
            var lastId;     //记录一级菜单id
            var index = -1; //记录某个一级菜单在newlist的位置
            var newList = []; //保存重组后的数据
            for(var i=0;i<list.length;i++) {
                if(lastId == list[i].parent_id) {   //一级菜单id相同 说明是同个分类下的不同行
                    newList[index].obj[i] = list[i].childList;
                }else {
                    var obj = {};
                    obj[i] = list[i].childList;
                    list[i].obj = obj;
                    newList.push(list[i]);
                    lastId = list[i].parent_id;
                    index++;
                }
            }
            return newList;
        }
    }; 

    module.exports = MemberRebuildService;

});