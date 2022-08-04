import axios from 'axios'
import {Dialog} from "vant";
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API+import.meta.env.VITE_APP_BASE_URL, // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})
service.interceptors.response.use((response)=>{

    if(response.status!==200){
        Dialog.alert({message: '请求错误'}).then(() => {

        });
    }else{
        if(response.data.responseHeader.code !== 200){
            Dialog.alert({message: response.data.responseBody}).then(() => {

            });
            return Promise.reject(new Error(response.data.responseBody || 'Error'))
        }else{
            return response
        }
    }
})

export default service