var mongodb = require('mongodb');

//1. 查找数据库所有数据并返回
module.exports.findAll = function (collectionname, url, callback) {
  var MongoClient = mongodb.MongoClient;

  MongoClient.connect(url, function (err, db) {
    // Create a collection we want to drop later
    db.collection(collectionname).find().toArray(function (err, items) {
      db.close();
      //返回err和db
      callback(err, items);
    });
  });
};

//2. 根据_id查找对应的数据
module.exports.findOne = function (collectionname, url, id, callback) {
  var MongoClient = mongodb.MongoClient;

  MongoClient.connect(url, function (err, db) {
    // Create a collection we want to drop later
    db.collection(collectionname).find({
      _id: id
    }).toArray(function (err, items) {
      db.close();
      //返回err和db
      callback(err, items);
    });
  });
};

//3. 添加学员
module.exports.addOne = function (model, url, callback) {
  var MongoClient = mongodb.MongoClient;

  MongoClient.connect(url, function (err, db) {
    // Create a collection we want to drop later
    db.collection('students').insertOne(model, function (err, r) {
      // Finish up test
      db.close();
      callback(err, r);
    });
  });
};

//4. 删除学员
module.exports.deleteOne = function (url, objID, callback) {
  var MongoClient = mongodb.MongoClient;

  MongoClient.connect(url, function (err, db) {
    // Create a collection we want to drop later
    var model = db.collection('students').findOne({
      _id: objID
    }, function (err, model) {
      db.collection('students').deleteOne(model, function (err, r) {
        // Finish up test
        db.close();
        callback(err, r);
      });
    })

  });
}

//5. 编辑
module.exports.editOne = function (url, objID, model, callback) {
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(url, function (err, db) {
    // Get the collection
    db.collection('students').updateOne({
      _id: objID
    }, model, function (err, r) {
      // Finish up test
      db.close();
      callback(err, r);
    });
  });
};