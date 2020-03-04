define(function (require,exports,module) {
    var Http = require('U/http');
    var type = api.pageParam.type;
    var tday = api.pageParam.day;
    var clerk = api.pageParam.clerk||"";

    var vm = new Vue({
		el:'#managerExpenditureDetails',
		template:_g.getTemplate('manager/managerExpenditureDetails-body-V'),
		data:{
            isFirstLoading:true,
            isNoResult:false,
			isClerk:_g.getLS('UserInfo').notes,
            isLook:false,
            time:"",
            chooseType:"",
            // 模式
            mode: 'order',
            month_time: '',
			list:[
                {
                    month_time:"",
                    lists:[
                        {
                            kpi_name:"",
                            kpi_price:null,
                            kpi_store_name:"",
                            kpi_time:"",
                            kpi_type:"",
                            sales_name:"",
                            sales_price:null,
                            store_id:1,
                            week_time:""
                        }
                    ]
                }
            ],
            isNewKPI: false,
            total_kpi_value: 0,
            isNewKPIList: [],
		},
        computed:{
            isNoResult: function () {
                console.log(this.list)
                if(this.isFirstLoading) return false
                if(this.list === null) return true
                var sta = this.list[0].lists.length === 0 ? true : false

                return sta
            },
            isSelectedByOrder: function () {
                return this.mode === 'order';
            },
            isNewKPIList: function () {
                return this.isNewKPI ? [0] : [];
            }
        },
		methods:{
            switch: function (mode) {
                if (mode === this.mode) return;
                this.mode = mode;
                api.showProgress && api.showProgress({
                    style: 'default',
                    animationType: 'fade', 
                    title: '努力加载中...'
                });
                this.total_kpi_value = 0;
                vm.list = [];
                getData();
                loadmore.reset();
            }
        },
		created:function () {
		  this.list=[];
        },
        ready: function () {
            //设置noResultWrap的高度
            var h = api.frameHeight || window.screen.height
            document.getElementById('noResultWrap').style.height = h + 'px'
        },

        filters:{
        	formatDate: function (val) {
                if (!val) return;
                var year = val.split('-')[0];
                var month = val.split('-')[1];
                var beforeM = new Date().getMonth()+1;
                var date = new Date();

                var currentYear = date.getFullYear();
                if (year < currentYear) return val;
                var list = ['本月', '今日'];
                if (list.indexOf(val) !== -1) return val;
                var reg = /^\d{2}-\d{2}$/;
                if (reg.test(val)) return val;
                if(val){
                    if(month == beforeM){
                        return '本月'
                    }else{
                        if(month == '01'){
                            return '一月';
                        }else if(month == '02'){
                            return '二月';
                        }else if(month == '03'){
                            return '三月';
                        }else if(month == '04'){
                            return '四月';
                        }else if(month == '05'){
                            return '五月';
                        }else if(month == '06'){
                            return '六月';
                        }else if(month == '07'){
                            return '七月';
                        }else if(month == '08'){
                            return '八月';
                        }else if(month == '09'){
                            return '九月';
                        }else if(month == '10'){
                            return '十月';
                        }else if(month == '11'){
                            return '十一月';
                        }else if(month == '12'){
                            return '十二月';
                        }
                    }
                }
            },
            formatTime : function(res){
                 if(res){
                    //  alert()
                     var data = parseInt(res.split(" ")[0].split('-')[2]);
                     var dateTime = new Date().getDate();
                     var beforeDay = new Date().getMonth()+1;
                     var yesterday = (new Date(new Date().Format('yyyy-MM-dd')).getTime()) - 60*60*1000*24;
                     var dataYesterday = new Date(res.split(' ')[0]).getTime();
                     if(res.split("-")[1]==beforeDay){
                         if(data == dateTime){
                             return '今天';
                         }if(yesterday == dataYesterday){
                             return '昨天';
                         }else{
                             var time = new Date(res.split(' ')[0]).getDay();
                             switch(time){
                                 case 0:
                                     return '周日';
                                 case 1:
                                     return '周一';
                                 case 2:
                                     return '周二';
                                 case 3:
                                     return '周三';
                                 case 4:
                                     return '周四';
                                 case 5:
                                     return '周五';
                                 case 6:
                                     return '周六';
                             }
                         }
                     }else{
                         var time = new Date(res.split(' ')[0]).getDay();
                             switch(time){
                                 case 0:
                                     return '周日';
                                 case 1:
                                     return '周一';
                                 case 2:
                                     return '周二';
                                 case 3:
                                     return '周三';
                                 case 4:
                                     return '周四';
                                 case 5:
                                     return '周五';
                                 case 6:
                                     return '周六';
                             }
                     }

                 }
             },
            formatDay : function(res){
                 var data = parseInt(res.split(" ")[0].split('-')[2]);
                 var dateTime = new Date().getDate();
                 var beforeDay = new Date().getMonth()+1;
                 var yesterday = (new Date(new Date().Format('yyyy-MM-dd')).getTime()) - 60*60*1000*24;
                 var dataYesterday = new Date(res.split(' ')[0]).getTime();
                 if(res.split("-")[1]==beforeDay){
                     if(data == dateTime || yesterday == dataYesterday){
                         var time =  res.split(' ')[1].split(':')[0] + ":" + res.split(' ')[1].split(':')[1];
                         return time;
                     }else{
                         var time2 = res.split(' ')[0].split('-')[1] + "-" + res.split(' ')[0].split('-')[2];
                         return time2;
                     }
                 }else{
                     var time3 = res.split(' ')[0].split('-')[1] + "-" + res.split(' ')[0].split('-')[2];
                     return time3;
                 }
             },
         formatType:function(val){
         	switch(val){
         		case "001":
         			return "单品";
         		case "002":
         			return "品牌";
         		case "003":
         			return "分类";
         		case "004":
         			return "新客开发";
         		case "005":
         			return "新会员";
         		case "006":
         			return "总额";
                case "007":
                    return "调整";
                case "":
                    return "全部类型";
         	}
         },
         formatType1:function(val){
            switch(val){
                case "001":
                    return "单品提成";
                case "002":
                    return "品牌提成";
                case "003":
                    return "品类提成";
                case "004":
                    return "新客开发提成";
                case "005":
                    return "新会员提成";
                case "006":
                    return "总额提成";
                case "":
                    return "全部类型";
            }
         },
        }
	});

    var getTypeName = function (val) {
        var typeConfig = {
            '001': '单品',
            '002': '品牌',
            '003': '分类',
            '004': '新客开发',
            '005': '新会员',
            '006': '总额',
            '007': '调整',
        }
        var typeName = typeConfig[val] || '全部类型';
        return typeName;
    };
    var getTimeScope = function (type) {
        var timeScope = '';

        if(type == "today"){
            var date = new Date();
            var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            timeScope = today + '至' + today;
        }else if(type == "Month"){
            var date = new Date();
            var day = new Date(date.getFullYear(),date.getMonth()+1,0);

            timeScope = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+"01" + '至' + date.getFullYear()+"-"+(date.getMonth()+1)+"-"+day.getDate();
        }else if(type == "yesMonth"){
            var date = new Date();
            var day = new Date(date.getFullYear(),date.getMonth(),0);

            timeScope = date.getFullYear()+"-"+date.getMonth()+"-"+"01" + '至' + date.getFullYear()+"-"+date.getMonth()+"-"+day.getDate();
        }else if(type == "yestoday"){
            var date = new Date();
            date.setTime(date.getTime()-24*60*60*1000);

            timeScope = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate() + '至' + date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        }

        return timeScope;
    };
    
    var initData = function () {
        vm.total_kpi_value = 0;
        // vm.month_time = '';
        vm.list = [];
    };
    var kpi_start_time = "";
    var kpi_end_time = "";
    var kpi_type = "";
    var class_id = null;
    var brand_id = null;
    var class_level=null;
	var getData = function(opts,callback, isSearch){
        if (!isSearch) {
            if(type == "today"){
                var date = new Date();
                vm.month_time = '今日';
                kpi_start_time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+"00:00:00";
                kpi_end_time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+"23:59:59";
            }else if(type == "Month"){
                var date = new Date();
                vm.month_time = '本月';
                var day = new Date(date.getFullYear(),date.getMonth()+1,0);
                kpi_start_time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+"01"+" "+"00:00:00";
                kpi_end_time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+day.getDate()+" "+"23:59:59";
            }else if(type == "yesMonth"){
                var date = new Date();
                vm.month_time = date.getFullYear()+"-"+date.getMonth();
                var day = new Date(date.getFullYear(),date.getMonth(),0);
                kpi_start_time = date.getFullYear()+"-"+date.getMonth()+"-"+"01"+" "+"00:00:00";
                kpi_end_time = date.getFullYear()+"-"+date.getMonth()+"-"+day.getDate()+" "+"23:59:59";
            }else if(type == "yestoday"){
                var date = new Date();
                date.setTime(date.getTime()-24*60*60*1000);
                vm.month_time = (date.getMonth()+1)+"-"+date.getDate();
                kpi_start_time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+"00:00:00";
                kpi_end_time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+"23:59:59";
            }else if(type == "001"){
                kpi_type = "001";
            }
            else if(type == "002"){
                kpi_type = "002";
            }
            else if(type == "003"){
                kpi_type = "003";
            }
            else if(type == "004"){
                kpi_type = "004";
            }
            else if(type == "005"){
                kpi_type = "005";
            }
            else if(type == "006"){
                kpi_type = "006";
            }
            else if(type == "007"){
                kpi_type = "007";
            } else {
                if (tday) {
                    var date = new Date();
                    var today = date.getFullYear()+"-"+(
                        (date.getMonth()+1) > 10 ? (date.getMonth()+1) : ('0' + (date.getMonth()+1))
                        )+"-" + (
                        date.getDate() > 10 ? date.getDate() : ('0' + date.getDate())
                        );
                    if (tday == today) {
                        vm.month_time = '今日';
                    } else {
                        var arr = tday.split('-');
                        vm.month_time = arr[1] + '-' + arr[2];
                    } 
                } else {
                    vm.month_time = '今日';
                }
            }
        }

        if(clerk=="clerk"){
            if(tday){
                if(tday.split("~").length==1){
                    kpi_start_time = tday.split("~")[0]+" "+"00:00:00";
                    kpi_end_time = tday.split("~")[0]+" "+"23:59:59";
                }else if(tday.split("~").length>1){
                    kpi_start_time = tday.split("~")[0]+" "+"00:00:00";
                    kpi_end_time = tday.split("~")[1]+" "+"23:59:59";
                }
            }
        }
        opts = opts || {};
        var _data={
                displayRecord : 10,
                page : opts.page || 1,
                kpi_start_time:kpi_start_time,
                kpi_end_time:kpi_end_time,
                kpi_type:kpi_type,
                class_id:class_id,
                brand_id:brand_id,
                sales_id:_g.getLS('UserInfo').user_id,
                class_level:class_level
            };
        var _url='/app/auth/kpi/listStoreDetailV2.do';

        var api_versions = 'v2';
        Http.ajax({
            data: {},
            api_versions: 'v3',
            url: '/app/auth/kpi/getOSSRlsKpiSetting.do',
            success: function (res) {
                if (res.code == 200) {
                    if (res.object && res.object.switch_api_set == 'APP') {
                        api_versions = 'v3';
                        vm.isNewKPI = true;
                        _data.setting_rule_model = vm.mode;
                    }
                }
                Http.ajax({
                    data:_data,
                    api_versions: api_versions,
                    url:_url,
                    isSync: true,
                    success: function(res) {
                        logger.log({"Type":"operation","action":"店长的提成明细列表","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
                        _g.hideProgress();
                        vm.isFirstLoading = false
                         //console.log(res);
                        if (res.success) {
                            if (api_versions === 'v3') {
                                if (res.object && res.object[0]) vm.total_kpi_value = res.object[0].total_kpi_value ? res.object[0].total_kpi_value : 0;
                            }
                            if(opts.page && opts.page > 1){
                                setTimeout(function(){
                                    callback && callback(res);
                                }, 0);
                            }else{
                                setTimeout(function(){
                                    vm.list = res.object;
                                    // if (res.object && res.object[0]) vm.month_time = res.object[0].month_time;
                                },0)
                            }
                        } else {
                            _g.toast(res.message);
                        }
                        //console.log(res.object)

                    },
                    error: function(err) {
                        vm.isFirstLoading = false
                        _g.hideProgress();
                        _g.toast(err.message);

                    }
                });
            },
            error: function(err) {
                Http.ajax({
                    data:_data,
                    api_versions: api_versions,
                    url:_url,
                    isSync: true,
                    success: function(res) {
                        logger.log({"Type":"operation","action":"店长的提成明细列表","Win_name":api.winName,"data":_data,"message":res,"requireURL":_url})
                        _g.hideProgress();
                        vm.isFirstLoading = false
                         //console.log(res);
                        if (res.success) {
                            if (api_versions === 'v3') {
                                if (res.object && res.object[0]) vm.total_kpi_value = res.object[0].total_kpi_value ? res.object[0].total_kpi_value : 0;
                            }
                            if(opts.page && opts.page > 1){
                                setTimeout(function(){
                                    callback && callback(res);
                                }, 0);
                            }else{
                                setTimeout(function(){
                                    vm.list = res.object;
                                    // if (res.object && res.object[0]) vm.month_time = res.object[0].month_time;
                                },0)
                            }
                        } else {
                            _g.toast(res.message);
                        }
                        //console.log(res.object)

                    },
                    error: function(err) {
                        vm.isFirstLoading = false
                        _g.hideProgress();
                        _g.toast(err.message);

                    }
                });
            }
        });

    };

    // 将搜索参数同步到侧边栏
    var paramBringedRightSide = function () {
        // 获取页面进来的参数
        // 提成类型、搜索时间
        var sales_type = '';

        var time = '';

        var sales_type_id = '';

        // 传递进来的type

        var timeType = [
            'today',
            'Month',
            'yesMonth',
            'yestoday'
        ];

        if (tday) {
            time = tday + '至' + tday;
        };

        if (timeType.indexOf(type) !== -1) {
            // 时间类型
            time = getTimeScope(type);
        } else {
            sales_type = getTypeName(type);
            sales_type_id = type;
        }
        
        // 同步数据
        api.sendEvent && api.sendEvent({
            name: 'param-bringed-right-side',
            extra: {
                sales_type: sales_type,
                time: time,
                sales_type_id: sales_type_id
            }
        })
    };

    getData();
    paramBringedRightSide();
     var loadmore = new Loadmore({
        callback: function(page){
            getData({page: page.page}, function(data){
                if(!data.object || _.isEmpty(data.object)){
                    return loadmore.loadend(false);
                }else{
                    for(var i = 0;i<data.object.length;i++){
                        if(vm.list[vm.list.length-1].month_time == data.object[i].month_time){
                            vm.list[vm.list.length-1].lists = vm.list[vm.list.length-1].lists.concat(data.object[i].lists);
                        }else{
                            vm.list = vm.list.concat(data.object[i]);
                        }
                    }
                    loadmore.loadend(true);
                }
            }, true);
        }
    });
    _g.setPullDownRefresh(function() {
        vm.isLook = false;
        kpi_start_time = "";
        kpi_end_time = "";
        kpi_type = "";
        class_id = null;
        brand_id = null;
        class_level=null;
        getData();
        loadmore.reset();
        api.sendEvent && api.sendEvent({
            name: 'clear-selected-data',
        });
        paramBringedRightSide();
    });

     api.addEventListener && api.addEventListener({
        name: 'manager-sideList'
    }, function (ret, err) {
        api.sendEvent && api.sendEvent({
            name: 'manager-kpi-class',
            extra: {
                isNewKPI: vm.isNewKPI
            }
        })
        api.openDrawerPane({
            type: 'right'
        });
    });
     api.addEventListener && api.addEventListener({
        name: 'manager-saveScreen1'
    }, function (ret, err) {
        // alert(ret.value.key1);
        vm.isLook=true;
        vm.time = ret.value.key2?ret.value.key2:""; //全部时间
        vm.chooseType = ret.value.key1?ret.value.key1:"";
        var temp = type;
        type = null;
        kpi_type = ret.value.key1;
        var time = ret.value.key2;
        class_id = ret.value.key3|| null;
        brand_id = ret.value.key4|| null;
        class_level=ret.value.class_level||null;

        if(time){
            if(time.split("至").length==2){
            kpi_start_time = time.split("至")[0]+" "+"00:00:00";
            kpi_end_time = time.split("至")[1]+" "+"23:59:59";
            }else if(time.split("至").length==1){
                kpi_start_time = time+" "+"00:00:00";
                kpi_end_time = time+" "+"23:59:59";
            }
        } else {
            kpi_start_time = '';
            kpi_end_time = '';
        }
        initData();
        getData();
        type = temp;
        loadmore.reset();
    });

})
