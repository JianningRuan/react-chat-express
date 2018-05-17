const express = require('express');
const router = express.Router();
const model = require('./../model');
const User = model.getModel('user');


const unit = require('./../unit');


router.get('/info', function (req, res) {
    const { userId } = req.cookies; // 获取cookie
    if (!userId) {
        return res.json({code: 0})
    }
    User.findOne({_id: userId}, {password: 0, __v: 0}, function (err, doc) {
        console.log(doc);
        if (err){
            return res.json({code: 0, errMsg: '账号校验错误'})
        }
        res.json({code: 1, data: doc})
    })
    
});

router.post('/login', function (req, res) {
    const {user, password } = req.body;
    User.findOne({user}, function (err, doc) {
        if (doc){ // 有账号
            let passwordToMd5 = unit.addMd5(password);
            if (doc.password === passwordToMd5){ // 密码正确
                const {user, type, _id, headPic, desc, title, company, money} = doc;
                // 保存cookie
                res.cookie('userId', _id, {maxAge: 1000 * 60 * 60 * 24}); // cookie时长设为一天
                return res.json({code: 1, data: {user, type, _id, headPic, desc, title, company, money}})
            }
        }
        res.json({code: 0, errMsg: '账号或密码错误'})
    });
});

router.post('/register', function (req, res) {
    const {user, password, type} = req.body;
    User.findOne({user}, function (err, doc) {
        if (doc){
            return res.json({code: 0, errMsg: '已存在该用户'})
        }
        let registerUser = new User({user, password: unit.addMd5(password), type});
        registerUser.save(function (e, d) {
            if (e) {
                return res.join({code: 0, errMsg: '保存错误'})
            }
            const {user, type, _id} = d;
            res.json({code: 1, data: {user, type, _id}})
        });
    });
});

router.post('/updateInfo', function (req, res) {
    const userId = req.cookies.userId;
    if (!userId){
        return res.json({code: 0, errMsg: '没有登录'})
    }
    // const {desc, title, company, money} = req.body;
    User.findByIdAndUpdate(userId, req.body, function (err, doc) {
        if (err){
            return res.json({code: 0, errMsg: '保存错误'})
        }
        return res.json({code: 1, data: Object.assign({}, {user: doc.user, type: doc.type}, req.body)})
    })
});

router.get('/list', function (req, res) {
    const type = req.query;
    User.find(type, function (err, doc) {
        if (err){
            return res.json({code: 0, errMsg: '数据库出错'})
        }
        return res.json({code: 1, data: doc})
    })
});

module.exports = router;