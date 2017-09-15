var express = require('express');
var router = express.Router();
// 引入模块
var handler = require('./handler.js');

// 设置路由
router.get('/', handler.get.index);
router.get('/index', handler.get.index);
router.get('/students', handler.get.students);
router.use('/info', handler.get.info);
router.get('/add', handler.get.add);
router.post('/add', handler.post.add);
router.use('/delete', handler.get.delete);
router.use('/edit', handler.get.edit);
router.post('/edit', handler.post.edit);


// 输出 router 模块
module.exports = router;