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


export function orderGroupList(data) {
    return request({
        url: '/api/v1/goods/orderGroupList.json',
        method: 'post',
        data
    })
}

export function allOrderGroupList(data) {
    return request({
        url: '/api/v1/goods/allOrderGroupList.json',
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
export function goodsList(data) {
    return request({
        url: '/api/v1/goods/list.json',
        method: 'post',
        data
    })
}
export function getGoods(data) {
    return request({
        url: '/api/v1/goods/get.json',
        method: 'post',
        data
    })
}
export function updateGoods(data) {
    return request({
        url: '/api/v1/goods/update.json',
        method: 'post',
        data
    })
}

export function updateAndImage(data){
    return request({
        url: '/api/v1/goods/updateAndImage.json',
        headers:{"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        method: 'post',
        data
    })
}

export function deleteGoods(data) {
    return request({
        url: '/api/v1/goods/remove.json',
        method: 'post',
        data
    })
}