// 用户集合
const mongoose = require("../db/index")

let schema = mongoose.Schema({
    advname: String,
    imgs: String,
    time: String
})

let advModel = mongoose.model('advdatas', schema);

module.exports = advModel;
