import request from '../util/request'


export function addCategory(data) {

    return request({
        url: 'user/addCategory.json',
        method: 'post',
        data
    })
}

export function scan(data) {

    return request({
        url: 'user/addCategory.json',
        method: 'post',
        data
    })
}