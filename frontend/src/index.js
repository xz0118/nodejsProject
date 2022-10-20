import SMERouter from "sme-router";
const router = new SMERouter("app", "html5");

//引入登录一级路由
import loginControllers from "./controllers/loginController";
loginControllers(router);

//引入管理一级路由
import adminControllers from "./controllers/adminController";
adminControllers(router);

//引入用户二级路由
import usersControllers from "./controllers/usersController";
usersControllers(router);

//引入广告二级路由
import advControllers from "./controllers/advController";
advControllers(router);