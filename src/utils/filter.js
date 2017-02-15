import Vue from 'vue'
let formatTime = function (value, parm) {
    let fmt = parm, time;
    if(!value || value == '') return '';
    if(typeof(value) == 'number') {
        value = new Date(value)
    }
    if(value.toGMTString) {
        time = value;
    } else {
        time = JSON.stringify(value).substring(1,20);
        time = new Date(time.replace(/-/g, "/").replace(/T/, ' '));
    }
    let o = {
        "M+": time.getMonth() + 1,                 //月份
        "d+": time.getDate(),                    //日
        "h+": time.getHours(),                   //小时
        "m+": time.getMinutes(),                 //分
        "s+": time.getSeconds(),                 //秒
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度
        "S": time.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//格式化日期
Vue.filter('date', function (value) {
    if(!value) return "";
    return formatTime(value, 'yyyy-MM-dd')
})

//格式化时间
Vue.filter('time', function (value) {
    if(!value) return "";
    return formatTime(value, 'yyyy-MM-dd hh:mm')
})

//格式化分秒
Vue.filter('minuteSecond', function (value) {
    if(!value) return "";
    value -= 0;
    if(value<60) return value + '秒';
    return Math.floor(value/60) + '分' + value%60 + '秒'
})

//格式化周
Vue.filter('week', function (value) {
    let day = (new Date(value)).getDay();
    let weekName = ['周日','周一','周二','周三','周四','周五','周六'];
    return weekName[day];
})

//保留两位小数
Vue.filter('toFixed2', function (value) {
    if(!value || value == '') return 0;
    return value.toFixed(2);
})

//格式化数量
Vue.filter('amount', function (value) {
    if(!value) return 0;
    let num = value - 0;
    if(num<=9999) return num;
    return Math.round(num/10000)+'万'
})