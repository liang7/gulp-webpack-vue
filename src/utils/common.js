//时间格式化
let format = function(){
    var fmt = arguments, time;
    if(!fmt.length) return;
    fmt = arguments[0];
    if(this.toGMTString) {
        time = this;
    } else {
        time = JSON.stringify(this).substring(1,20);
        time = new Date(time.replace(/-/g, "/").replace(/T/, ' '));
    }
    var o = {
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
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Date.prototype.format = format;
String.prototype.format = format;

//时间加减
Date.prototype.DateAdd = function (strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's': return new Date(Date.parse(dtTmp) + (1000 * Number)); //秒
        case 'm': return new Date(Date.parse(dtTmp) + (60000 * Number)); //分
        case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number)); //时
        case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number)); //日
        case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number)); //周
        case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); //季度
        case 'M': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); //月
        case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); //年
    }
}

// 时间间隔计算(间隔月数)
let getMonthDiff = function(startTime, endTime){
    if(!startTime || !endTime) return;
    startTime = new Date(startTime);
    endTime = new Date(endTime);
    let month = (startTime.getFullYear()*12 + startTime.getMonth()) - (endTime.getFullYear()*12 + endTime.getMonth());
    return Math.abs(month)+1;
}

// 时间间隔计算(间隔天数)
let getDateDiff = function(startTime, endTime){
    if(!startTime || !endTime) return;
    let start = startTime;
    let end = endTime;
    if(start.getTime) {
        start = start.getTime();
    } else {
        start = new Date(Date.parse(startTime.replace(/-/g,   "/"))).getTime();
    }
    if(end.getTime) {
        end = end.getTime();
    } else {
        end = new Date(Date.parse(endTime.replace(/-/g,   "/"))).getTime();
    }
    let days = Math.ceil((Math.abs((start - end))/(1000*60*60*24) + 1));
    return days;
}

// element-ui 分页组件bug
let paginationBug = function(isTrigger, page){
    if(!isTrigger && !page) return false;
    let index = page?page-1:0;
    let _li = document.getElementsByClassName('el-pager')[0].getElementsByClassName('number')[index];
    if(_li && _li.className.indexOf('active')<0) {
        _li && _li.click();
        return true;
    }
    return false;
}

//有坐标图标配置
let chartOpts1 = {
    chart: {
        type: 'spline',
        style: {
            fontFamily: 'Microsoft YaHei'
        }
    },
    credits: {
        enabled: false
    },
    title: {
        style: {
            color: 'rgba(0,0,0,0)'
        }
    },
    legend: {
        align: 'center',
        verticalAlign: 'bottom',
        borderWidth: 0,
        itemMarginBottom: 8,
        itemStyle: {
            fontWeight: 'lighter'
        }
    },
    xAxis: {
        categories: [],
        title: { align: 'high', offset: 0, rotation: 0, x: 10, y: 20 },
    },
    yAxis: {
        title: {
            text: '', align: 'high', offset: 0, rotation: 0, y: -20, x: -10
        },
        allowDecimals: false,
    },
    tooltip: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        borderWidth: 0,
        borderRadius: 10,
        shadow: false,
        style: {
            color: '#eee',
            lineHeight: 22,
            padding: 15
        },
        shared: true,
    },
    series: [],
    exporting: {
        enabled: false
    }
};

//无坐标图标配置
let chartOpts2 = {
    chart: {
        type: 'spline',
        backgroundColor: 'rgba(0,0,0,0)',
        style: {
            fontFamily: 'Microsoft YaHei',
        }
    },
    credits: {
        enabled: false
    },
    title: {
        style: {
            color: 'rgba(0,0,0,0)'
        }
    },
    legend: {
        enabled: false
    },
    xAxis: {
        categories: [],
        lineWidth: 0,
        tickLength: 0,
    },
    yAxis: {
        title: {
            text: ''
        },
        gridLineWidth: 0,
        labels: {
            enabled: false
        },
    },
    tooltip: {
        backgroundColor: 'rgba(0,0,0,0.85)',
        borderWidth: 0,
        borderRadius: 10,
        shadow: false,
        style: {
            color: '#eee',
            lineHeight: 22,
            padding: 15
        },
        shared: true,
    },
    series: [],
    exporting: {
        enabled: false
    }
};

// //继承
// Object.create = Object.create || function(obj) {
//     var F =function(){};
//     F.prototype = obj;
//     return new F();
// }

//深度拷贝对象
let deepCopy = function(p, c){
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
                deepCopy(p[i], c[i]);
            } else {
                c[i] = p[i];
        }
    }
    return c;
};

let chartOpts3 = deepCopy(chartOpts2);
chartOpts3.xAxis = {        
    categories: [],
    lineWidth: 0,
    tickLength: 0,
    labels: { enabled: false}
};
chartOpts3.yAxis.maxPadding = 0.25;
chartOpts3.yAxis.endOnTick = false;

export default {
    getMonthDiff: getMonthDiff,
    getDateDiff: getDateDiff,
    paginationBug: paginationBug,
    deepCopy: deepCopy,
    getChartOpts1: function(){
        return deepCopy(chartOpts1);
    },
    getChartOpts2: function(){
        return deepCopy(chartOpts2);
    },
    getChartOpts3: function(){
        return deepCopy(chartOpts3);
    },
    //获取链接参数
    getQueryString:function (name, url){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = (url || window.location.hash).substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
};