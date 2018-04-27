const express = require('express');
const router = express.Router();

router.get('/info', function (req, res) {
        res.json({code: 0})
});

router.get('/login', function (req, res) {
        res.json({code: 1})
});

module.exports = router;