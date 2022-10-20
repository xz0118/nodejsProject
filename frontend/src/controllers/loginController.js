//登录路由
import login from "@/login.ejs";
import axios from "../api/index"
export default function (router) {
    router.route("/login", (req, res, next) => {
        res.render(login());

        let usernameEle = document.querySelector(".username");
        let passWordEle = document.querySelector(".pwd");
        let loginStyle = document.querySelector(".loginStyle");

        loginStyle.addEventListener("click", async function (e) {
            e.preventDefault();
            let username = usernameEle.value;
            let pwd = passWordEle.value;
            let { data } = await axios.post("/checkuser", { username, pwd });

            if (data.status == 1) {
                // console.log(data);
                localStorage.setItem("token",data.token);
                router.go("/admin/users");
            } else {
                alert("用户名或者密码错误");
            }
        });
    })
}
