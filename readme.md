#crud-students.manger

Node.js 实现增删改查,页面简陋,功能齐全,转载请注明出处,谢谢!
1.  引入 express 框架, 简化代码;
```js
var express = require('express');
var app = express();
app.use(router);//引入路由模块
app.listen(config.port,function(){
  console.log('http://localhost:'+confog.port);//引入config模块
});
```
2. 引入 ejs 插件, 配合 express 使用,做模板引擎渲染页面
```js
// 1. 先设置模板引擎的文件后缀
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//后续直接调用res.render()渲染页面,参数:'index'和对象
res.render('edit', {
          cities: cities,
          majors: majors,
          item: doc[0]
        });
```
3. 引入 body-parser 插件,挂载后,可直接使用 `req.body` 拿到请求体;
```js
var bodyParser = require('body-parser');
// 3. 挂载一个 body-parser 的中间件
app.use(bodyParser.urlencoded({
  extended: false
}));
//将参数_id提取出来并转化为对象
var objID = mongodb.ObjectID(req.body._id);
```
4. 引入 mongodb 模块, api网站有很多方法可供使用,依照需求直接查看文档
```js
//[案例](http://mongodb.github.io/node-mongodb-native/2.2/api/) :
var MongoClient = require('mongodb').MongoClient,
  test = require('assert');
// Connection url
var url = 'mongodb://localhost:27017/test';
// Connect using MongoClient
MongoClient.connect(url, function(err, db) {
  // Create a collection we want to drop later
  var col = db.collection('createIndexExample1');
  // Show that duplicate records got dropped
  col.find({}).toArray(function(err, items) {
    test.equal(null, err);
    test.equal(4, items.length);
    db.close();
  });
});
```
