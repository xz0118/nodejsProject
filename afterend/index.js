const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//校验token
const { expressjwt } = require("express-jwt");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("static"));

app.use(expressjwt({ secret: "mytoken", algorithms: ['HS256'] }).unless({ path: [/\.png$/, '/checkuser'] }));

//引入添加用户路由
let userouter = require("./routes/usersRouter");
app.use("/users", userouter);

//引入校验用户路由
let loginrouter = require("./routes/loginRouter");
app.use(loginrouter);

//引入广告路由
let advrouter = require("./routes/advRouter");
app.use('/adv',advrouter);

app.listen(8585);