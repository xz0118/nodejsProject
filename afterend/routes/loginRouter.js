const express = require("express");
let router = express.Router();
let userModel = require("../modules/index");
const md5 = require("md5");
const jwt = require('jsonwebtoken');

router.post("/checkuser", async (req, res) => {
    let { username, pwd } = req.body;
    let data = await userModel.find({ username, pwd: md5(pwd) });
    try {
        if (data) {

            let token = jwt.sign({ myvalue: "鸡哥哥哥" }, "mytoken", { expiresIn: "6h" });

            res.json({
                info: "校验成功",
                status: 1,
                token
            })
        } else {
            res.json({
                info: "校验失败",
                status: 0
            })
        }
    } catch (error) {
        console.log(error);
    }

})




module.exports = router;