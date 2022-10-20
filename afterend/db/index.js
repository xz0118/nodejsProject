// 连接数据库
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/project", err => {
    if (err) {
        console.log(err);
    }
    console.log("数据库连接成功");
});

module.exports = mongoose;
