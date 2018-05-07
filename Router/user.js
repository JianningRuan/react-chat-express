const express = require('express');
const router = express.Router();
const model = require('./../model');
const User = model.getModel('user');
const addMd5 = require('./../unit');


router.get('/info', function (req, res) {
        res.json({code: 0})
});

router.post('/login', function (req, res) {
    console.log(req.body);
    const {user, password } = req.body;
    console.log(user);
    User.findOne({user}, function (err, doc) {
        console.log('login-msg', doc);
        if (doc){ // 有账号
            let passwordToMd5 = addMd5(password);
            if (doc.password === passwordToMd5){ // 密码正确
                let data = doc;
                console.log(typeof (data));
                console.log(data['password']);
                delete data['password'];
                console.log(data);
                return res.json({code: 1, data: data})
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
        let registerUser = new User({user, password: addMd5(password), type});
        registerUser.save(function (e, d) {
            if (e) {
                return res.join({code: 0, errMsg: '保存错误'})
            }
            const {user, type, _id} = d;
            res.json({code: 1, data: {user, type, _id}})
        });
    });


});

module.exports = router;