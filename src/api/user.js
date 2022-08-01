import request from '../util/request'

export function login(data,callBack) {

    console.log(data)
   return request({
        url: 'user/login.json',
        method: 'post',
        data
    })
}