const utility = require('utility');

const unit = {
    addMd5: function (val) {
        const addFont = 'Kimning-Ryan-9090@qee%';
        return utility.md5(utility.md5(val + addFont));
    },
    delJsonEle: function (a, b) {
        let c = {};
        for (let i in a){
            // console.log(typeof (a[i]));
            let type = typeof (a[i]);
            if (type !== undefined && type !== 'function' && i !== b){
                c.i = a[i];
            }
        }
        return c;
    }
};

module.exports = unit;

