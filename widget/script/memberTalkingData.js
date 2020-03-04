var test=''; // 为了测试方便，可在事件名称增加后缀以作区分

var memberDeatilOpr = function(label,params){   //会员详情页操作
    console.log("memberDeatilOprTalkingData"); 
    var typeName = {
        special:'主题关怀',
        usual:'日常关怀'
    };
    var parameters = {};
    parameters.type = typeName[params]||'会员信息';
        // 定义统一页面的所有按钮为同一事件，通过不同label来区分
    _talkingData.onEvent({
        eventId:'会员详情页操作'+test,  
        eventLabel: label,  //  按钮事件名称：消费明细，基本信息....
        parameters: parameters  // 来源：主题关怀，会员信息，日常关怀
    })
}

var sortTalkingData = function(label,type){  // 会员排序
    console.log("sortTalkingData");
    if(!type) type="未知"
    _talkingData.onEvent({
        eventId:'会员排序'+test,  
        eventLabel: label,  // 所处页面：主题关怀，会员信息，日常关怀
        parameters: {
            type: type   // 具体值： 最近回访事件....
        }
    })
}

var screenTalkingData = function(label){   // 会员筛选
    console.log("screenTalkingData");
    _talkingData.onEvent({
        eventId:'会员筛选'+test,  
        eventLabel: label,   // 来源页面：主题关怀，会员信息，日常关怀
        parameters:''
    })
}

var userTypePoint = function(label){ // 会员用户类型
    console.log("userTypePointTalkingData");
    _talkingData.onEvent({
        eventId:'会员用户类型'+test,  
        eventLabel: label,  // 所处页面：主题关怀，会员信息，日常关怀
        parameters: ''
    })
}

var retrunVisitPoint = function(label,type){  // 回访操作
    console.log("retrunVisitPoint");
    if(!type) type="未知"
    _talkingData.onEvent({
        eventId:'会员回访'+test,  
        eventLabel: label,  // 所处页面：主题关怀，会员信息，日常关怀
        parameters: {
            type: type   // 具体值： 微信，电话，短信
        }
    })
}

var goMemberDetail = function(label){  //跳转进入会员详情页
    console.log("goMemberDetail");
    _talkingData.onEvent({
        eventId:'会员详情'+test,  
        eventLabel: label,  // 来源页面：主题关怀，会员信息，日常关怀
        parameters: ''
    })
}

var memberListPoint = function(label,type){  // 会员列表页
    console.log("memberListPoint");  
    _talkingData.onEvent({
        eventId:'会员列表'+test,  
        eventLabel: label,  // 来源页面：主题关怀，会员信息，日常关怀
        parameters: {
            type:type    // 具体事件：下拉刷新
        }
    })
}

var memberPhoneSearchPoint = function(label){
    console.log("memberPhoneSearchPoint");  
    _talkingData.onEvent({
        eventId:'会员手机搜索'+test,  
        eventLabel: label,  // 来源页面：主题关怀，会员信息，日常关怀
        parameters:''
    })
} 

var memberOprPoint = function(label){
    console.log("memberOprPonit");
    _talkingData.onEvent({
        eventId:'会员页面操作'+test,  
        eventLabel: label,  // 操作：会员信息，日常访问，复购提醒，任一注意关怀.....
        parameters:''
    })
}

var salesQrcodePoint = function(){
    console.log("salesQrcodePoint")
    _talkingData.onEvent({
        eventId:'导购二维码'+test,  
        eventLabel: '',  // 操作：会员信息，日常访问，复购提醒，任一注意关怀.....
        parameters:''
    })
}

