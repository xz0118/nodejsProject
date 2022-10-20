const express = require("express");
const md5 = require("MD5");
let router = express.Router();

let { updata } = require("../util/index.js");

//引入连接数据库
const userModel = require("../modules/index");
//添加
router.post("/addusers", async (req, res) => {
    try {
        let result = await updata(req);
        result.password = md5(result.password);
        result.time = new Date().toLocaleDateString();
        // console.log(result);
        await userModel.create(result);
        res.json({
            info: "添加成功",
            status: 1
        })
    } catch (error) {
        console.log(error);
    }
})

//查询
router.get("/getdata", async (req, res) => {
    try {
        let userlength = (await userModel.find()).length
        let page = 3;
        let pageshow = Math.ceil(userlength / page);

        let { p } = req.query;
        console.log(p);

        let data = await userModel.find().skip((p - 1) * pageshow).limit(page);
        // console.log(data);

        res.json({
            info: "获取用户信息成功",
            userdata: data,
            status: 1,
            pageshow
        })
    } catch (error) {
        res.json({
            info: "获取用户信息失败",
            err,
            status: 0
        })
    }
})

//删除
router.delete("/deluser", async (req, res) => {
    let { _id } = req.query;
    try {
        await userModel.deleteOne({ _id });
        res.json({
            info: "删除成功",
            status: 1,
        })
    } catch (error) {
        console.log(error);
        res.json({
            info: "删除失败",
            status: 0,
            error
        })
    }
})

module.exports = router;