const utility = require('utility');
function addMd5(val) {
    const addFont = 'Kimning-Ryan-9090@qee%';
    return utility.md5(utility.md5(val + addFont));
}

function delJsonEle(a, b){
    let c = {};
    for (let i in a){

    }
}

module.exports = addMd5;