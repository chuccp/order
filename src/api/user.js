import request from '../util/request'

export function login(data,callBack) {
   return request({
        url: '/api/v1/user/login.json',
        method: 'post',
        data
    })
}