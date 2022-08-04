import request from '../util/request'

export function login(data) {
   return request({
        url: '/api/v1/user/login.json',
        method: 'post',
        data
    })
}

export function addUser(data) {
    return request({
        url: '/api/v1/user/addUser.json',
        method: 'post',
        data
    })
}