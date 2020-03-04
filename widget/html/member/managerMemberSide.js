define(function (require, exports, module) {
    var Http = require('U/http');
    var dtPicker = new mui.DtPicker({
        type: 'date'
    });
    var vm = new Vue({
        el: '#managerMemberSide',
        template: _g.getTemplate('member/managerMemberSide-body-V'),
        data: {
            clerkName: '',//营业员 暂时不用
            clerkId: null,
            sideTime: '',
            startTime: '',//筛选条件
            endTime: '',//筛选条件
            idx: '',
            memberLevel: '',
            memberLevelId: null,//筛选条件
            memberTag: [],
            tag_list: [],//筛选条件
            start_integral: '',//筛选条件
            end_integral: '',//筛选条件
            start_buy_time: '',
            end_buy_time: '',
            tagList: null,
            user_type_name: '全部会员',
            user_type: 'all_user',
            PBC: '单品',
            PBCType: '1',
            PBCName: '',
            PBCId: '',
            PBCMes: '请输入单品信息',
            productCode: '',
            notes: _g.getLS('UserInfo').notes,
        },
        filters: {
            formatTime: function (val) {
                if (val === '') {
                    return '全部时间'
                } else {
                    return val
                }
            },
            formatLevel: function (val) {
                if (val === '') {
                    return '全部等级'
                } else {
                    return val
                }
            }
        },
        methods: {
            //消费时间
            onMemberTime: function () {
                var self = this;
                openSubFrame({
                    name: 'member-managerMemberSideTime',
                    url: '../member/managerMemberSideTime.html',
                    pageParam:{
                        sideTime: self.sideTime,
                        idx: self.idx
                    }
                });
            },
            //等级
            onMemberLevel: function (id) {
                var self = this;
                openSubFrame({
                    name: 'member-managerMemberSideLevel',
                    url: '../member/managerMemberSideLevel.html',
                    pageParam:{
                        Id: id || ''
                    }
                });
            },
            //全部标签
            onMemberTag: function () {
                var self = this;
                openSubFrame({
                    name: 'member-managerMemberSideTag',
                    url: '../member/managerMemberSideTag.html',
                    pageParam:{
                        tagList: self.tagList
                    }
                });
            },
            onAgreeClose: function () {
                /*if (this.start_integral > this.end_integral) {
                    this.start_integral = ''
                    this.end_integral = ''
                    return
                }else if (this.start_integral===''&&this.end_integral!==''){
                    this.start_integral = ''
                    this.end_integral = ''
                    return
                }else if (this.start_integral!==''&&this.end_integral===''){
                    this.start_integral = ''
                    this.end_integral = ''
                    return
                }*/
                if(this.start_integral!==''&&this.end_integral!==''){
                    if(!/^[0-9]*$/.test(this.start_integral) || !/^[0-9]*$/.test(this.end_integral)){
                        _g.toast("请输入数字!");
                    }
                    if (Number(this.start_integral) > Number(this.end_integral)) {
                        this.start_integral = '';
                        this.end_integral = '';
                        _g.toast('起始积分不能大于终止积分')
                        return
                    }
                }

                api.sendEvent && api.sendEvent({
                    name: 'search',
                    extra: {
                        start_consume_time: this.startTime,//筛选条件
                        end_consume_time: this.endTime,//筛选条件
                        tag_list: this.tag_list,//筛选条件
                        start_integral: this.start_integral,//筛选条件
                        end_integral: this.end_integral,//筛选条件
                        user_level_id: this.memberLevelId,//筛选条件
                        user_type: this.user_type,
                        PBC_type: this.PBCType,
                        PBC_id: this.PBCId,
                        product_code: this.productCode,
                        start_buy_time: this.start_buy_time,
                        end_buy_time: this.end_buy_time,
                    }
                });
                api.closeDrawerPane && api.closeDrawerPane();
            },
            onCloseDrawer: function () {
                api.closeDrawerPane();
            },
            onReset: function () {
                this.clerkName = '';//营业员 暂时不用
                this.clerkId = null;
                this.sideTime = '';
                this.startTime = '';//筛选条件
                this.endTime = '';//筛选条件
                this.start_buy_time = '';//筛选条件
                this.end_buy_time = '';//筛选条件
                this.idx = '';
                this.memberLevel = '';
                this.memberLevelId = null;//筛选条件
                this.memberTag = [];
                this.tag_list = [];//筛选条件
                this.start_integral = '';//筛选条件
                this.end_integral = '';//筛选条件
                this.tagList = null;
                this.user_type_name= '全部会员';
                this.user_type= 'all_user';
                this.PBC= '单品';
                this.PBCType= '1';
                this.PBCName= '';
                this.PBCId= '';
                this.PBCMes= '请输入单品信息';
                this.productCode= '';
            },
            onChooseSth:function (type) {
                api.openFrame && api.openFrame({
                    name: "manager-chooseSthSideBar",
                    url: '../manager/chooseSthSideBar.html',
                    rect: {
                        x: 0,
                        y: 0,
                        w: 'auto',
                        h: 'auto'
                    },
                    pageParam: {
                        type: type
                    },
                    bounces: false,
                    animation:{
                        type: 'push',
                        subType: 'from_right',
                        duration: 300
                    }
                });
            },
            onChoosePBC:function (PBC) {
                api.openFrame && api.openFrame({
                    name: "manager-choosePBC",
                    url: "../manager/choosePBC.html",
                    rect: {
                        x: 0,
                        y: 0,
                        w: 'auto',
                        h: 'auto'
                    },
                    pageParam: {
                        PBC: PBC
                    },
                    bounces: false,
                    animation:{
                        type: 'push',
                        subType: 'from_right',
                        duration: 300
                    }
                });
            },
            onSelectStart: function () {
                dtPicker.show(function (selectItems) {
                    this['start_buy_time'] = selectItems.value;
                }.bind(this));
            },
            onSelectEnd: function () {
                dtPicker.show(function (selectItems) {
                    this['end_buy_time'] = selectItems.value;
                    if (this.start_buy_time === '') {
                        this['end_buy_time'] = ''
                        _g.toast('请选择起始时间')
                        return
                    }
                    var star = new Date(this.start_buy_time).getTime();
                    var end = new Date(this.end_buy_time).getTime();
                    if (star > end) {
                        this.start_buy_time = ''
                        this.end_buy_time = ''
                        _g.toast('起始时间不能大于等于结束时间')
                        return
                    }
                }.bind(this));
            }
        }
    });

    //获得单品，品牌，分类ID
    api.addEventListener({
        name: 'chooseOnePBC'
    }, function(ret, err) {
        vm.PBCId = ret.value.PBCId;
        vm.productCode = ret.value.skuCode;
        vm.PBCName = ret.value.goodsName;
        console.log(JSON.stringify(ret));
    });

    //chooseSth
    api.addEventListener({
        name: 'chooseSth'
    }, function(ret, err) {
        if(ret.value.chooseType == 1) {
            vm.user_type_name = ret.value.statusName;
            vm.user_type = ret.value.statusId;
        }else if(ret.value.chooseType == 2){
            vm.PBCName = '';
            vm.PBCId = '';
            vm.productCode = '';
            vm.PBC = ret.value.statusName;
            if(ret.value.statusName == '单品') {
                vm.PBCMes = '请输入条码';
                vm.PBCType = '1';
            }else if(ret.value.statusName == '品牌') {
                vm.PBCMes = '请输入品牌';
                vm.PBCType = '2';
            }else if(ret.value.statusName == '分类') {
                vm.PBCMes = '请输入分类';
                vm.PBCType = '3';
            }
        }
    });

    api.addEventListener && api.addEventListener({
        name: 'level'
    }, function (ret, err) {
        if (ret.value.key1 === '') {
            vm.memberLevel = '';
            vm.memberLevelId = '';
        } else {
            vm.memberLevel = ret.value.key1;
            vm.memberLevelId = ret.value.key2;
        }

    });

    api.addEventListener && api.addEventListener({
        name: 'tagList'
    }, function (ret, err) {
        if (ret.value.key1 === '') {
            vm.tagList = []
            vm.tag_list = []
        } else {
            var tagListArr = ret.value.key1.split("},");
            var tagList = []
            for (var i = 0; i < tagListArr.length - 1; i++) {
                tagListArr[i] = tagListArr[i] + "}";

            }
            for (var j = 0; j < tagListArr.length; j++) {
                var data = JSON.parse(tagListArr[j]);
                tagList.push(data);
            }
            vm.tagList = tagList;
            var arr = [];
            var jsonStr = '[' + ret.value.key1 + ']'
            var jArr = JSON.parse(jsonStr)
            for (key in jArr) {
                arr.push(jArr[key].index)
            }
            vm.tag_list = arr;
        }

    });
    //消费时间响应
    api.addEventListener && api.addEventListener({
        name: 'sideTime'
    }, function (ret, err) {
        vm.sideTime = ret.value.key1;
        vm.idx = ret.value.key2;
        if(ret.value.key1==''){
            vm.startTime = '';
            vm.endTime = '';
            return
        }
        var str = String(ret.value.key1)
        var star = str.slice(0, 10);
        var end = str.slice(11);
        if (end == '') {
            end = star;
        }
        star = star + " " + "00:00:00"
        end = end + " " + "23:59:59"
        vm.startTime = star;
        vm.endTime = end;
    });

    /**
     * [打开新的子页面]
     * @return {[type]} [description]
     */
    function openSubFrame(opts, callback){
        api.openFrame && api.openFrame({
            name: opts.name,
            url: opts.url,
            rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
            },
            pageParam: opts.pageParam,
            bounces: false,
            animation:{
                type: 'push',
                subType: 'from_right',
                duration: 300
            }
        });
        callback && callback();
    }
});
