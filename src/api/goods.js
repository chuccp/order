import request from '../util/request'

export function scan(data) {
    return request({
        url: '/api/v1/goods/scan.json',
        method: 'post',
        data
    })
}
export function orderGoods(data) {
    return request({
        url: '/api/v1/goods/orderGoods.json',
        method: 'post',
        data
    })
}

export function addGoods(data){
    return request({
        headers:{"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        url: '/api/v1/goods/add.json',
        method: 'post',
        data
    })
}

export function orderList(data) {
    return request({
        url: '/api/v1/goods/orderList.json',
        method: 'post',
        data
    })
}

export function allOrderList(data) {
    return request({
        url: '/api/v1/goods/allOrderList.json',
        method: 'post',
        data
    })
}