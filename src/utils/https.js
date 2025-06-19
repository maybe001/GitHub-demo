//axios基础的封装
import axios from 'axios'
const httpinistance = axios.create({
    baseURL: 'https://api.github.com',
    //超时时间
    timeout: 5000
})
export default httpinistance