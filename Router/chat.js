const express = require('express');
const router = express.Router();
const model = require('./../model');
const Chat = model.getModel('chat');
const User = model.getModel('user');

router.get('/getMsgList', function (req, res) {
    const userId = req.cookies.userId;
    User.find({}, function (userErr, userDoc) {
        let users = {};
        userDoc.forEach(v=>{
            users[v._id] = {name: v.user, headPic: v.headPic}
        });

        Chat.find({$or: [{from: userId}, {to: userId}]}, function (err, doc) {
            if (err){
                return res.json({code: 0, errMsg: '数据出错'})
            }
            res.json({code: 1, data: doc, users: users})
        })

    });

});

router.post('/readMsg', function (req, res) {
    const userId = req.cookies.userId;
    const from = req.body;
    Chat.update({from, to: userId}, {'$set': {read: true}}, {multi: true}, function (err, doc) {
        if (!err){
            return res.json({code: 1, num: doc.nModified})
        }
        res.json({code: 0, errMsg: '数据库出错'})
    })
});

module.exports = router;