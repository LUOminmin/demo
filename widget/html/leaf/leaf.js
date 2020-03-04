define(function (require, exports, module) {
    var Http = require('U/http');
    var list = api.pageParam.list;
    var role = api.pageParam.role;
    var jumpConf = {
        'company_admin': {
            header: {
                data: {
                    title: '回访进度'
                }
            },
            name: 'boss-bossThemeCallBack2',
            url: '../boss/bossThemeCallBack2.html',
            rightPane: {
                name: 'rightPane',
                url: '../boss/bossThemeCallBackSide.html',
            },
            pageParam: {
                themeType: 'usual',
                careId: ''
            }
        },
        'store_admin': {
            header: {
                data: {
                    title: '日常关怀',
                    rightText: '进度',
                }
            },
            pageParam: {
                themeId: '',
                title: '日常关怀',
                flag: true,
                crm_task_param_id: '', //任务参数id
                care_id: ''  //主题id
            },
            name: 'manager-managerThemeName',
            url: '../manager/managerThemeName.html',
            rightPane: {
                name: 'rightPane',
                url: '../member/managerMemberSide.html'
            }
        },
        'sales': {
            header: {
                data: {
                    title: '日常关怀'
                }
            },
            pageParam:{
                themeId:'',
                statue:'special',
                title: '日常关怀',
                flag: true, //是否是由新会员首页进行跳转
                crm_task_param_id: '', //任务参数id
                care_id: ''  //主题id
            },
            name: 'clerk-clerkThemeName',
            url: '../clerk/clerkThemeName.html',
            rightPane: {
                name: 'rightPane',
                url: '../member/managerMemberSide.html'
            }
        }
    };

    var vm = new Vue({
        el: '#content',
        template: _g.getTemplate('leaf/home-body-v'),
        data: {
            list: []
        },
        created: function () {
            this.list = list.childList;
        },
        watch: {},
        methods: {
            goChild: function(item) {
                if(!item.isLeaf) { //继续打开子级页面
                    Http.ajax({
                        data: {
                            parent_id: item.task_config_menu_id,     //一开始获取配置默认传0
                        },
                        api_versions: 'v2',
                        url: '/app/auth/home/task/get.do',
                        success: function (ret) {
                            var result = ret.object[0] || {};
                            //打开二级菜单页面
                            _g.openWin({
                                name: 'leaf',
                                url: '../leaf/leaf.html',
                                header: {
                                    data: {
                                        title: item.task_config_menu_name,
                                    }
                                },
                                pageParam: {
                                    role: item.role_note,  //角色
                                    list: result    //子级菜单列表
                                }
                            });
                        },
                        error: function (err) { 
                            _g.toast('获取子级菜单出错');
                        },
                    });
                    return;
                }
                //跳到对应的关怀
                var opts = jumpConf[role];
                opts.pageParam.care_id = item.care_id;
                opts.pageParam.crm_task_param_id = item.crm_task_param_id;
                if(item.task_config_menu_name) {
                    opts.header.data.title = item.task_config_menu_name;
                }
                _g.openDrawerLayout(opts);
            }
        },
    });
});
