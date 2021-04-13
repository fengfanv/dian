const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

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

    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(__dirname, decodeURI(pathname));
    fs.stat(filepath, function (err, stat) {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/plain' })
            response.end('404');
        } else {
            fs.readFile(filepath, function (err, res) {
                if (err) {
                    console.log(err);
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