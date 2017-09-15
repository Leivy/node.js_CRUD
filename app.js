var express = require('express');
var app = express();
// 引入核心模块
var path = require('path');
// 引入各个模块
var router = require('./router.js');
var config = require('./config.js');
var bodyParser = require('body-parser');

// 1. 先设置模板引擎的文件后缀
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// 3. 挂载一个 body-parser 的中间件
app.use(bodyParser.urlencoded({
  extended: false
}));
// 2. 引入路由
app.use(router);




// 结束响应
app.listen(config.port, function () {
  console.log('http://localhost:' + config.port);
})