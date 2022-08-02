import request from '../util/request'

export function scan(data) {
    return request({
        url: '/api/v1/goods/scan.json',
        method: 'post',
        data
    })
}