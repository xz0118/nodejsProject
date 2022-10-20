//用户二级路由
import users from "@/users.ejs";
//引入axios实例
import axios from "../api/index.js";

let baseURL = axios.defaults.baseURL;
async function getdata(res, p = 1) {
    let { data } = await axios.get("/users/getdata", {
        params: {
            p
        }
    });
    console.log(data);
    res.render(users({ users: data.userdata, baseURL, pageshow: data.pageshow }))
}

async function upEvent(res) {
    //点击添加用户显示
    let adduser = document.querySelector(".adduer");
    let adduermodel = document.querySelector(".adduermodel");
    let mask = document.querySelector(".mask");
    adduser.addEventListener("click", function () {
        mask.style.display = "block";
        adduermodel.style.display = "block";
    })
    //点击隐藏
    let closebtn = document.querySelector(".closebtn");
    closebtn.addEventListener("click", function () {
        mask.style.display = "none";
        adduermodel.style.display = "none";
    })
    //上传文件
    let imgFile = document.querySelector(".imgFile");
    imgFile.addEventListener("change", function () {
        let imgs = this.files[0];
        let filerader = new FileReader();
        filerader.readAsDataURL(imgs);
        filerader.onload = function () {
            let imgshow = document.querySelector(".imgshow");
            imgshow.innerHTML = "";
            let img = document.createElement("img");
            img.src = filerader.result;
            imgshow.appendChild(img);
            img.style.width = 100 + "px";
        }
    })

    //提交数据
    let btn = document.querySelector(".btn");
    let usernameEle = document.querySelector(".username");
    let passwordEle = document.querySelector(".pwd");
    let repeatpwdEle = document.querySelector(".repeatpwd")
    btn.onclick = async function () {
        let username = usernameEle.value;
        let password = passwordEle.value;
        let files = imgFile.files[0];
        let repeatpwd = repeatpwdEle.value;
        //校验数据
        if (username == "") {
            return alert("名字不能为空");
        }

        if (password == "") {
            return alert("密码不能为空");
        }

        if (repeatpwd !== password) {
            alert("密码需要一致")
        }

        if (typeof files == 'undefined') {
            return alert("图片不能为空");
        }

        let form = new FormData();//模拟空的form表单
        form.append('username', username);
        form.append('password', password);
        form.append('imgs', files);

        let { data } = await axios.post("/users/addusers", form)
        console.log(data);
        if (data.status == 1) {
            alert("添加成功");
            mask.style.display = "none";
            adduermodel.style.display = "none";
            await getdata(res);
            await upEvent(res)
        }
    }

    //删除
    let delbtns = document.querySelectorAll(".delBtn");
    delbtns.forEach(item => {
        item.onclick = async function () {
            let _id = this.getAttribute("ids");
            let bool = confirm("确定要删除吗");
            if (bool) {
                await axios.delete("/users/deluser", {
                    params: {
                        _id
                    }
                })
                await getdata(res);
                await upEvent(res);
            }
        }
    })


    //分页

    let pagings = document.querySelectorAll(".pagings a");
    pagings.forEach(item => {
        item.addEventListener("click", async function (e) {
            e.preventDefault();
            let p = this.innerHTML;
            await getdata(res, p);
            await upEvent(res);
        })
    })
}

export default function (router) {
    router.route("/admin/users", async (req, res, next) => {
        await getdata(res);
        await upEvent(res);
    })
}