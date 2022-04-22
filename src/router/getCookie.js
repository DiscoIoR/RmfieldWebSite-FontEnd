export function getCookie(key) {
    if (document.cookie.length > 0) {
        let arr = document.cookie.split(";");
        for (let i = 0; i < arr.length; i++) {
            let t = arr[i].trim().split("=");
            if (t[0] === key) {
                return t[1];
            }
        }
    }
    return "";
}



