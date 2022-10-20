//引入axios
let axios = require("axios").default;
//创建实例
let instance = axios.create({
    timeout: 5000,
    baseURL: "/api"
})

instance.interceptors.request.use(config => {
    let token = localStorage.getItem("token");
    config.headers['Authorization'] = 'Bearer ' + token
    return config;
})

export default instance;