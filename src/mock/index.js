import  Mock from 'mockjs'

// Mock.mock(/\.json/, {
//     'list|1-10': [{
//         'id|+1': 1
//     }]
// })

Mock.mock(/user\/login\.json/, {

        responseHeader:{
            code:200,
            msg:"成功"
        },
        responseBody:true

})
Mock.mock(/user\/addCategory\.json/, {
        responseHeader:{
            code:200,
            msg:"成功"
        },
        responseBody:true
})