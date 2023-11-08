export function fmtNum(numstr) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return numstr.toString().replace(regexp, ',');
}
export function pureNum(numstr) {
    return numstr.replace(/,/g, '')
}
export function isNumChar(ch) {
    // Only ASCII character in that range allowed
    if(ch >= 48 && ch <= 57) {
        return true;
    }
    return false;
}

export function isHexChar(ch) {
    if( (ch >= 48 && ch <= 57) || // 0 ~ 9
        (ch >= 65 && ch <= 70) || // A ~ F
        (ch >= 97 && ch <= 102))  // a ~ f
    {
        return true;
    }
    return false;
}

export function shortString(str, head = 6, tail = 6) {
    let ret = str.slice(0, head) + "...";
    if(tail > 0) {
        ret += str.slice(-tail, str.length);
    }
    return ret;
}

export function b64ToU8Array(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}