import axios from 'axios';

const request = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: 'http://localhost:9009',
    headers: {
        'Content-Type' : 'application/json;charset=utf-8'
    },
    // 超时
    timeout: 1800000
})

export default request
