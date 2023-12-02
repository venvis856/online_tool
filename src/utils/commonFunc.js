export function getSession(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

export function setSession(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}


export function changeHtmlTitle(title) {
    document.title = title;
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", "/favicon.ico");
    iframe.style.display = 'none';
    //iframe.setAttribute("id", "iframe");
    iframe.addEventListener('load', function () {
        setTimeout(function () {
            iframe.removeEventListener('load', function () {
            }, false);
            document.body.removeChild(iframe);
        }, 0);
    }, false);
    document.body.appendChild(iframe);
}

//获取前进、后退日期，根据diffDay变量而定
export function getDay(diffDay, fmt, defautlTime) {
    const date = defautlTime || new Date();
    if (diffDay) {
        date.setDate(date.getDate() + diffDay);//获取diffDay天后的日期
    }
    if (fmt) {
        return formatDate(date, fmt);
    }
    return date;
}

//日期格式化
export function formatDate(strTime, fmt) {
    let date = new Date();
    if (strTime) {
        date = new Date(strTime);
    }
    if (!fmt) {
        fmt = "yyyy-MM-dd hh:mm:ss";
    }
    const o = {
        "y+": date.getFullYear(),
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S+": date.getMilliseconds()             //毫秒
    };
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            if (k == "y+") {
                fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
            } else if (k == "S+") {
                let lens = RegExp.$1.length;
                lens = lens == 1 ? 3 : lens;
                fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
            } else {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    return fmt;
}

// 时间转时间戳 2020-02-01 -> 1580515200
export function strToTime(str) {
    if (!str) {
        return Date.parse(new Date()) / 1000
    }

    str = str.replace('T', ' ').replace('+08:00', '');
    var arr = str.split(' ');
    var arr1 = arr[0].split('-');
    var year = arr1[0];
    var month = arr1[1] - 1;
    var day = arr1[2];
    var hour = 0;
    var min = 0;
    var sec = 0;
    if (arr[1]) {
        let arr2 = arr[1].split(':');
        hour = arr2[0];
        min = arr2[1];
        sec = arr2[2];
    }
    var date = new Date(year, month, day, hour, min, sec);
    return Date.parse(date) / 1000;
}

/**
 * 大数组数据进行分页显示
 */
export function pagination(pageNo, pageSize, data) {
    let offset = (pageNo - 1) * pageSize;
    return (offset + pageSize >= data.length) ? data.slice(offset, data.length) : data.slice(offset, offset + pageSize);
}

/**
 * 数据导出到excel
 * @param object jsonData     源数据
 * @param array  headerList    第一行标题
 * @param string fileName     导出文件名（不带后缀）
 */
export function jsonToExcel(jsonData, headerList, fileName) {
    fileName = fileName || Date.parse(new Date());
    //先转化json
    let arrData = typeof jsonData != 'object' ? JSON.parse(jsonData) : jsonData;
    let excel = '<table>';
    //生成表头
    let row = "<tr>";
    for (let i = 0; i < headerList.length; i++) {
        row += "<td>" + headerList[i] + '</td>';
    }
    excel += row + "</tr>";
    //循环生成表身
    for (let i = 0; i < arrData.length; i++) {
        let row1 = "<tr>";
        for (let j in arrData[i]) {
            // let name = arrData[i][index].name === "." ? "" : arrData[i][index].name;
            row1 += '<td>' + arrData[i][j] + '</td>';
        }
        excel += row1 + "</tr>";
    }
    excel += "</table>";
    let excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " + "xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
    excelFile += '; charset=UTF-8">';
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "sheet";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "</html>";
    let uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
    let link = document.createElement("a");
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".xls";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * 计算字符串长度
 */
export function getStringLength(str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
}


// 校验是否纯数字
export function isNum(number) {
    let reg = /^[0-9]*$/;
    return reg.test(number);
}

export function getMappinglabel(map, value) {
    if (map.length <= 0) {
        return value;
    }

    for (let idx in map) {
        let m = map[idx];
        if (m['value'] == value) {
            return m.label;
        }
    }

    return value;
}

// 校验手机号
export function checkMobile(mobile = '') {
    if (!mobile) {
        return false;
    }

    let rule = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (rule.test(mobile)) {
        return true;
    }

    return false;
}

//生成从minNum到maxNum的随机数
export function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
        default:
            return 0;
            break;
    }
}
