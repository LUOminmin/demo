define(function (require, exports, module) {
    var Http = require('U/http');
    var isWX = api.pageParam.isWX;
    var hideTopText = api.pageParam.hideTopText;
    //请求二维码基础参数字符串=======================
    var fetchPostData = Http.fetchPostData({});
    var app_versions = fetchPostData.app_versions;
    var device_code = fetchPostData.device_code;
    var platform = fetchPostData.platform;
    var session_key = fetchPostData.session_key;
    var user_id = fetchPostData.user_id;
    var timestamp = fetchPostData.timestamp;
    var token = fetchPostData.token;
    var basicParam = 'api_versions=v2&app_versions=' + app_versions + '&device_code=' + device_code + '&platform=' + platform + '&session_key=' + session_key + '&user_id=' + user_id + '&timestamp=' + timestamp + '&token=' + token;
    //=============================================
    var vm = new Vue({
        el: '#qrcode',
        template: _g.getTemplate('clerk/qrcode-body-V'),
        data: {
            qrcode: CONFIG.HOST + '/app/auth/shopGuide/getQrCode.do?' + basicParam,
            staff_name: '',
            company_name: '',
            store_name: '',
            staff_head: '../../image/member/callbackIcon.png',
            isWX: isWX,
            hideTopText: hideTopText
        },
        created: function () { },
        watch: {},
        filters: {},
        methods: {
            saveMediaToAlbum: function() {
                api.download({
                    url: vm.qrcode,
                    savePath: 'fs://http.jpg',
                    report: true,
                    cache: true,
                    allowResume: true
                }, function (ret, err) {
                    if (ret.state == 1) {
                        api.saveMediaToAlbum({
                            path: 'fs://http.jpg'
                        }, function (ret, err) {
                            if (ret && ret.status) {
                                _g.toast('保存成功');
                            } else {
                                _g.toast('保存失败');
                            }
                        });
                    } else {
                        
                    }
                });
            },
            share: function() {
                api.download({
                    url: vm.qrcode,
                    savePath: 'fs://shareImg/qrcode.png',
                    report: true,
                    cache: true,
                    allowResume: true
                }, function (ret, err) {
                    if (ret.state == 1) {
                        //下载成功
                        realPath = ret.savePath;
                        //wx模块
                        var wx = api.require('wx');
                        wx.isInstalled(function(ret, err){
                            if(ret.installed){
                                wx.shareImage({
                                    scene: 'session',
                                    thumb: 'fs://shareImg/qrcode.png',
                                    contentUrl: 'fs://shareImg/qrcode.png'
                                }, function(ret, err) {
                                    if (ret.status) {
                                        alert('分享成功');
                                    } else {
                                        alert(err.code);
                                    }
                                });
                            }else{
                                _g.toast('您还没有安装微信客户端');
                            }
                        });
                        //sharepics模块
                        // var share = api.require('sharePics');
                        // var array = new Array();
                        // array.push(realPath);
                        // var param = {
                        //     list: array
                        // };
                        // share.shareToTimeLine(param);
                        //inshare模块
                        // var inShare = api.require('inShare');
                        // alert(realPath)
                        // inShare.shareImgsTo({
                        //     imgPaths:realPath,
                        //     sendPattern: 'ALL',
                        //     app:'wxFriend',               
                        // },function(ret,err){
                        //     if(ret.status){
                        //         alert(JSON.stringify(ret));
                        //     }else{
                        //         alert(ret.errorMessage);
                        //     }
                        // });
                    }
                });
            },
        }
    });

    var getInfo = function (opts, callback) {
        opts = opts || {};
        var _data = {};
        var _url = '/app/auth/shopGuide/info.do';
        Http.ajax({
            data: _data,
            api_versions: 'v2',
            url: _url,
            success: function (res) {
                logger.log({ "Type": "operation", "action": "获取展示信息", "Win_name": api.winName, "data": _data, "message": res, "requireURL": _url, "line": "------------------------------------------------------" })
                if (res.success) {
                    vm.staff_name = res.object.staff_name;
                    vm.company_name = res.object.company_name;
                    vm.store_name = res.object.store_name;
                    console.log(res.object.store_name);
                } else {
                    _g.toast(res.message);
                }
            },
            error: function (err) {
                _g.hideProgress();
            }
        })
    };
    getInfo();

    module.exports = {};
});
