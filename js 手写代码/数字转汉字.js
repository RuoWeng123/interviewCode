// 将数字转为汉字
function tans(num) {
    var str = num.toString();
    var len = str.length - 1;
    var idxs = [0, 0, 0, 0, 0];
    var zero = true;
    for (var i = 0; i <= len; i++) {
        if (str[i] != '0') {
            zero = false;
        }
        idxs[len - i] = str[i];
    }
    var strArr = idxs.map(function (idx) {
        return toChinesNum(idx);
    });
    var idxZero = null;
    for (var i = 0; i < strArr.length; i++) {
        var item = strArr[i];
        if (item == '零') {
            idxZero = i;
            break;
        }
    }
    if (idxZero != null) {
        strArr.splice(idxZero, strArr.length - idxZero);
    }
    return strArr.join('');
}

function toChinesNum(num) {
    var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    var chnUnitChar = ["", "十", "百", "千"];
    var strIns = '', chnStr = '';
    var unitPos = 0;
    var zero = true;
    while (num > 0) {
        var v = num % 10;
        if (v === 0) {
            if (!zero) {
                zero = true;
                chnStr = chnNumChar[v] + chnStr;
            }
        } else {
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
        }
        unitPos++;
        num = Math.floor(num / 10);
    }
    return chnStr;
}