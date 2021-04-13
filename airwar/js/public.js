//js公共方法
//检查浏览器环境
function checkBrowser() {
    let system = {
        win: false,
        mac: false,
        xll: false,
        ipad: false
    };
    //检测平台
    let p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
    if (system.win || system.mac || system.xll || system.ipad) {
        //alert("当前为PC环境");
        return 'pc';
    } else {
        let ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            //alert("当前为手机端微信环境");
            return 'phoneWechat'
        } else {
            //alert("当前为手机端非微信环境");
            return 'phone'
        }
    }
}