import axios from "axios";


const restClient = axios.create({
    // baseURL: "http://127.0.0.1:8000"
    baseURL: "https://bookworms-project3.herokuapp.com/"
})

restClient.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem("token") || "";
    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`
    }
    // console.log("interceptor", token);
    return config;
}, function(error){
    return Promise.reject(error);
})

export default restClient;