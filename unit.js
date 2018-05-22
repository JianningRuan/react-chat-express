const utility = require('utility');

const unit = {
    addMd5: function (val) {
        const addFont = 'Kimning-Ryan-9090@qee%';
        return utility.md5(utility.md5(val + addFont));
    }
};

module.exports = unit;

