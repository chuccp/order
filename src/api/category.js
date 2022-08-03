import request from '../util/request'


export function addCategory(data) {

    return request({
        url: '/api/v1/category/add.json',
        method: 'post',
        data
    })
}

export function listCategory(data) {

    return request({
        url: '/api/v1/category/list.json',
        method: 'post',
        data
    })
}