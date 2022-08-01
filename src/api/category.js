import request from '../util/request'


export function addCategory(data) {

    return request({
        url: 'user/addCategory.json',
        method: 'post',
        data
    })
}