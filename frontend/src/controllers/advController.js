//广告二级路由
import adv from "@/adv.ejs";
//引入axios
import axios from "../api/index.js";

let baseURL = axios.defaults.baseURL;

async function getadv(res, p = 1) {
    let { data } = await axios.get("/adv/getadv", {
        params: { p }
    });
    console.log(data);
    res.render(adv({ adv: data.advdata, baseURL, pageshow: data.pageshow }));
}

async function upEvent(res) {
    let advEle = document.querySelector(".addadv");
    let advmodel = document.querySelector(".adduermodel");
    let mask = document.querySelector(".mask");
    //添加广告
    advEle.addEventListener("click", function () {
        advmodel.style.display = "block";
        mask.style.display = "block";
    })
    //关闭
    let closeEle = document.querySelector(".closebtn");
    closeEle.addEventListener('click', function () {
        advmodel.style.display = "none";
        mask.style.display = "none";
    })

    //上传图片
    let imgFile = document.querySelector(".imgFile");
    imgFile.addEventListener('change', function () {
        let files = imgFile.files[0];
        let filerader = new FileReader();
        filerader.readAsDataURL(files);
        filerader.onload = function () {
            let imgshow = document.querySelector(".imgshow");
            let img = document.createElement("img");
            imgshow.innerHTML = "";
            img.src = filerader.result;
            img.style.width = 100 + "px";
            imgshow.appendChild(img);
        }
    })

    //提交
    let btn = document.querySelector(".btn");
    let advnameEle = document.querySelector(".username");
    btn.addEventListener('click', async function () {
        let advname = advnameEle.value;
        let files = imgFile.files[0];
        if (advname == "") {
            return alert("广告名不能为空");
        }
        if (typeof files == 'undefined') {
            return alert("图片不能为空");
        }

        let form = new FormData();
        form.append('advname', advname);
        form.append('imgs', files);
        let { data } = await axios.post('/adv/addadv', form);
        if (data.status == 1) {
            alert("添加成功");
            advmodel.style.display = "none";
            mask.style.display = "none";
        }
        console.log(data);
        await getadv(res);
        await upEvent(res);
    })

    //删除
    let delBtns = document.querySelectorAll(".delBtn");
    delBtns.forEach(item => {
        item.addEventListener('click', async function () {
            let _id = this.getAttribute("_id")
            axios.delete("/adv/deladv", {
                params: { _id }
            })
            await getadv(res);
            await upEvent(res);
        })
    })

    //分页
    let pagings = document.querySelectorAll(".pagins a")
    pagings.forEach(item => {
        item.addEventListener("click", async function (e) {
            e.preventDefault()
            let p = this.innerHTML;
            await getadv(res, p);
            await upEvent(res);
        })
    })
}

export default function (router) {
    router.route("/admin/adv", async (req, res, next) => {
        await getadv(res);
        await upEvent(res)
    })
}
