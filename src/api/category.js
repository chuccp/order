import request from '../util/request'


export function addCategory(data) {
    return request({
        url: '/api/v1/category/add.json',
        method: 'post',
        data
    })
}

export function updateCategory(data) {
    return request({
        url: '/api/v1/category/update.json',
        method: 'post',
        data
    })
}
export function deleteCategory(data) {
    return request({
        url: '/api/v1/category/delete.json',
        method: 'post',
        data
    })
}

export function getCategory(data) {
    return request({
        url: '/api/v1/category/get.json',
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

export function allCategory(data) {

    return request({
        url: '/api/v1/category/all.json',
        method: 'post',
        data
    })
}