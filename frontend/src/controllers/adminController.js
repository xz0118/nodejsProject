//一级路由管理页面
import admin from "@/admin.ejs";

export default function (router) {
    router.route("/admin", (req, res, next) => {
        next(admin({ subRoute: res.subRoute(), url: req.url }))
        //切换菜单
        let li = document.querySelectorAll(".menu-left ul li");
        li.forEach((item, index) => {
            item.addEventListener("click", function () {
                if (index === 0) {
                    router.go("/admin/users")
                } else if (index === 1) {
                    router.go("/admin/adv")
                }
            })
        })
    })
}
