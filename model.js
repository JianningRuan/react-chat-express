const models = {
    user: {
        user: {type: String, require: true},
        password: {type: String, require: true},
        type: {type: String, require: true},
        headPic: {type: String, require: true}, // 头像
        desc: {type: String, require: true} // 自我介绍
    },
    chat: {}
};