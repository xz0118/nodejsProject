const express = require("express");
let router = express.Router();
//引入form解析模块
let { updata } = require("../util/index.js");
//引入数据库
const advModel = require('../modules/adv.js');

//添加数据
router.post("/addadv", async (req, res) => {
    try {
        let data = await updata(req);

        data.time = new Date().toLocaleDateString();
        await advModel.create(data);
        // console.log(data);
        res.json({
            info: "添加成功",
            status: 1
        })
    } catch (error) {
        console.log(error);
    }
})

//返回数据
router.get("/getadv", async (req, res) => {
    let datalength = (await advModel.find()).length;
    let page = 3
    let pageshow = Math.ceil(datalength / page);
    // console.log(pageshow);
    let { p } = req.query;
    let data = await advModel.find().skip((p - 1) * pageshow).limit(page)

    // console.log(data);
    res.json({
        info: "查询广告成功",
        status: 1,
        advdata: data,
        pageshow
    });
})

//删除数据
router.delete("/deladv", async (req, res) => {
    let { _id } = req.query;
    await advModel.deleteOne({_id})
})


module.exports = router;