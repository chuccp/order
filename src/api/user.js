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

export function listUser(data) {
    return request({
        url: '/api/v1/user/list.json',
        method: 'post',
        data
    })
}
export function getUser(data) {
    return request({
        url: '/api/v1/user/get.json',
        method: 'post',
        data
    })
}

export function updateUser(data) {
    return request({
        url: '/api/v1/user/update.json',
        method: 'post',
        data
    })
}

export function deleteUser(data) {
    return request({
        url: '/api/v1/user/delete.json',
        method: 'post',
        data
    })
}