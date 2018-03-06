import axios from 'axios'
import route from '@/router'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000, // 请求超时时间
    headers: {
        phone_no: '',
        uid: '',
        client: '',
        token: ''
    }
})

// respone拦截器
//axios请求拦截器

service.interceptors.request.use(function(config) {
    config.headers = {
        phone_no: localStorage.getItem('phone_no'),
        uid: localStorage.getItem('uid'),
        client: localStorage.getItem('client'),
        token: localStorage.getItem('token')
    }
    return config;
}, function(err) {
    return Promise.reject(error);
});

service.interceptors.response.use(function(res) {
    if (res.data.meta.code == '6001') {
        route.push({ name: '登陆' })
    }
    return res;
}, function(err) {
    //Do something with response error
    return Promise.reject(error);
})

export default service