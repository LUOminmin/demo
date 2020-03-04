define(function (require, exports, module) {
  var Http = require('U/http');
  var name = _g.getLS('UserInfo').user_name;
  var StoreName = _g.getLS('StoreName') || _g.getLS('UserInfo').store_name;
  var user_id = '';
  var noteMes = {
    name: '',
    tel: '',
    comment: '',
    '企业编码': _g.getLS('UserInfo').company_code || '',
    '企业名称': _g.getLS('UserInfo').company_name || '',
    '门店编码': _g.getLS('UserInfo').store_code || '',
    '门店名称': StoreName
  };
  if (_g.getLS("UserInfo")) {
    noteMes.name = _g.getLS('UserInfo').user_name;
    noteMes.tel = _g.getLS('UserInfo').user_phone;
    user_id = _g.getLS('UserInfo').user_id;
  }
  var clientIdParam = {
    id: '000000' + user_id
  }

  var vm = new Vue({
    el: '#messageCenter',
    template: _g.getTemplate('assistant/messageCenter-body-V'),
    data: {
      noteCount: 0,
      target_title: '',
    },
    created: function () {
      this.list = {};
    },
    methods: {
      //打开在线客服
      onMeiQia: function () {
        // meiQia设置自定义信息
        console.log('noteMes ' + JSON.stringify(noteMes));
        window.meiqia.setClientInfo(noteMes);
        // 设置登录用户
        window.meiqia.setLoginCustomizedId(clientIdParam);
        window.console.log('打开meiqia成功!--------------');
        // 打开meiQia
        window.meiqia.show();
      },
      //打开目标管理
      ontargetManage: function () {
        _g.openWin({
          header: {
            data: {
              title: '目标管理',
            },
          },
          name: 'assistant-mes-targetManage',
          url: '../assistant/mes-targetManage.html',
          bounces: true,
          slidBackEnabled: false,
        })

      },
      //打开服务通知
      onseviceNotice: function () {

      },
      //打开主题关怀
      onthemeCare: function () {
        // _g.openWin({
        //   header: {
        //     data: {
        //       title: '未开发',
        //     },
        //   },
        //   name: 'empty',
        //   url: '../assistant/empty.html',
        //   bounces: true,
        //   slidBackEnabled: false,
        // })
      },
    },
  });

  var getData = function (opts, callback) {
		var opts = opts || {};
		var _data = {
			total_page: 10,
			current_page: 1,
		};
		var _url = '/app/auth/message/center/list.do';
		Http.ajax({
			data: _data,
			api_versions: 'v2',
			url: _url,
			success: function (res) {
				logger.log({ "Type": "operation", "action": "获取消息中心目标管理列表的标题", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url })
				if (res.code == 200) {
					if(res.object.list && res.object.list.length) {
            vm.target_title = res.object.list[0].title;
          }
				} else {
					_g.toast(res.message);
				}
			},
			error: function (err) { }
		});
  };
  
  getData();
  
  //计算未读消息
  function noteCount() {
    window.meiqia.getUnreadMessageCount(function (ret) {
      vm.noteCount = ret.count;
    });
  }
  window.app = vm;

  //监听从后台进入app事件
  api && api.addEventListener({
    name: 'resume'
  }, function (ret, err) {
    noteCount();
  });
  //监听打开window事件
  _g.viewAppear(function (ret, err) {
    noteCount();
  });
  api && api.addEventListener({
    name: 'note_refresh'
  }, function (ret, err) {
    noteCount();
  });

  api && api.addEventListener({
    name: 'note_refresh'
  }, function (ret, err) {
    noteCount();
  });

  // 接收到阿里推送通知
  api && api.addEventListener({
    name: 'aliNotify'
  }, function (ret, err) {
		vm.target_title = ret.value.target_title;
  });

  // 断网监听
  api.addEventListener && api.addEventListener({
    name: 'offline'
  }, function (ret, err) {
    vm.target_title = '网络异常，获取消息失败';
  });

  // 联网监听
  api.addEventListener && api.addEventListener({
    name: 'online'
  }, function (ret, err) {
    getData();
  });
})



