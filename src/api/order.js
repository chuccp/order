import request from '../util/request'

export function addOrder(data) {
    return request({
        url: '/api/v1/order/add.json',
        method: 'post',
        data
    })
}



export function orderList(data) {
    return request({
        url: '/api/v1/order/orderList.json',
        method: 'post',
        data
    })
}


export function order2List(data) {
    return request({
        url: '/api/v1/order/order2List.json',
        method: 'post',
        data
    })
}