const http = require('http')
const fs = require('fs')
const path = require('path')
const child_process = require("child_process")

function app(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    response.setHeader("Access-control-max-age", "1000");

    //处理复杂请求的预检请求
    if (request.method === 'OPTIONS') {
        response.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With,yourHeaderFeild,sessionToken',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
        });
        response.end();
        return false;
    };

    var pathname = request.url;
    if(/(^.+\/$|^\/$)/.test(pathname)){
        pathname+='index.html'
    }
    var filepath = path.join(__dirname, decodeURI(pathname));
    fs.stat(filepath, function (err, stat) {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/plain' })
            response.end('404');
        } else {
            fs.readFile(filepath, function (err, res) {
                if (err) {
                    console.log(err);
                    console.log('1111');
                }
                response.writeHead(200)
                response.end(res);
            })
        }
    })
}

http.createServer(app).listen(80, () => {
    console.log('端口：80，服务已启动！');
});

// //打开默认浏览器
// const openUrl = "http://localhost"
// const port = 80
// let cmd = ''
// switch (process.platform) {
//     case 'wind32':
//         cmd = 'start';
//         break;

//     case 'linux':
//         cmd = 'xdg-open';
//         break;

//     case 'darwin':
//         cmd = 'open';
//         break;
// }
// child_process.exec(cmd + ' ' + openUrl + ':' + port);