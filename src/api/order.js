import request from '../util/request'

export function addOrder(data) {
    return request({
        url: '/api/v1/order/add.json',
        method: 'post',
        data
    })
}