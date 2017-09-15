//
var mongodb = require('mongodb');
var config = require('./config.js');
var db = require('./db.js');

// 输出模块
module.exports.get = {};
module.exports.post = {};
// 
module.exports.get.index = function (req, res) {
  res.render('index');
};

// 渲染学生列表
module.exports.get.students = function (req, res) {
  // 数据库请求数据 渲染列表页面
  db.findAll('students', config.url, function (err, items) {
    if (err)
      throw err;
    res.render('students', {
      list: items
    });
  });
};

//查看学员列表
module.exports.get.info = function (req, res) {
  //通过_id 获取对应的学员信息
  var objID = mongodb.ObjectID(req.query._id);
  db.findOne('students', config.url, objID, function (err, doc) {
    if (err)
      throw err;
    console.log(doc);
    res.render('info', {
      item: doc[0]
    });
  });
};

//渲染添加页面
module.exports.get.add = function (req, res) {

  db.findAll('cities', config.url, function (err, cities) {
    if (err)
      throw err;
    db.findAll('majors', config.url, function (err, majors) {
      if (err)
        throw err;
      res.render('add', {
        majors: majors,
        cities: cities
      });
    });
  });
};

//添加学员
module.exports.post.add = function (req, res) {
  var model = {
    sno: req.body.sno,
    sname: req.body.sname,
    sgender: req.body.sgender == 'M' ? '男' : '女',
    sbirthday: req.body.sbirthday,
    sphone: req.body.sphone,
    saddr: req.body.saddr,
    smajor: req.body.smajor
  };
  db.addOne(model, config.url, function (err, r) {
    if (err)
      throw err;
    res.redirect('/students');
  });
};

//删除学员
module.exports.get.delete = function (req, res) {
  var objID = mongodb.ObjectID(req.query._id);
  db.deleteOne(config.url, objID, function (err, doc) {
    if (err)
      throw err;
    res.redirect('/students');
  })
};

//进入编辑页面
module.exports.get.edit = function (req, res) {
  var objID = mongodb.ObjectID(req.query._id);
  db.findOne('students', config.url, objID, function (err, doc) {
    //找到城市和学院列表并渲染
    db.findAll('cities', config.url, function (err, cities) {
      db.findAll('majors', config.url, function (err, majors) {
        res.render('edit', {
          cities: cities,
          majors: majors,
          item: doc[0]
        });
      });
    });
  });
};

//编辑修改数据库
module.exports.post.edit = function (req, res) {
  console.log(req.body._id);
  var objID = mongodb.ObjectID(req.body._id);
  var model = {
    sno: req.body.sno,
    sname: req.body.sname,
    sgender: req.body.sgender === 'M' ? '男' : '女',
    sbirthday: req.body.sbirthday,
    sphone: req.body.sphone,
    saddr: req.body.saddr,
    smajor: req.body.smajor
  };
  db.editOne(config.url, objID, model, function (err, doc) {
    console.log(doc);
    if (err)
      throw err;
    res.redirect('/students');
  });
};


