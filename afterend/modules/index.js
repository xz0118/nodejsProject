// 用户集合
const mongoose = require("../db/index")

let schema = mongoose.Schema({
    username: String,
    password: String,
    imgs: String,
    time: String
})

let userModel = mongoose.model('userdatas', schema);

module.exports = userModel;
