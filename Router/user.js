const express = require('express');
const router = express.Router();


router.get('/info', function (req, res) {
        res.json({code: 0})
});

router.get('/login', function (req, res) {
        res.json({code: 1})
});

router.post('/register', function (req, res) {
    console.log(req.body);
    const {user, password, type} = req.body;
    res.json({code: 1, user: user})
});

module.exports = router;