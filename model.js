const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/react-chat';
mongoose.connect(DB_URL);

const models = {
    user: {
        user: {type: String, require: true},
        password: {type: String, require: true},
        type: {type: String, require: true},
        headPic: {type: String, require: true}, // 头像
        desc: {type: String, require: true}, // 自我介绍
        title: {type: String, require: true}, // 职位名称
        // 如果是boss，则增加两个
        company: {type: String, require: true},
        money: {type: String, require: true}
    },
    chat: {}
};

for (let m in models){
    console.log(m);
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
};