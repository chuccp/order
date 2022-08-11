import { createStore } from 'vuex'
const store = createStore({
    state () {
        return {
            title: "店铺",
            user:{has:false,userName:"",userNo:"",roles:[],storeGoodsName:""},
            viewHeight:0,
            bottomHeight:0,
            clientHeight:0
        }
    },
    mutations: {
        increment (state,title) {
            state.title = title
        },
        updateUser (state,user) {
            state.user.has = true
            state.user.userName = user.userName
            state.user.userNo = user.userNo
            state.user.roles = user.roles
            state.user.storeGoodsName = user.userNo+"_store_goodObj"
        },
        clearUser (state) {
            state.user.has = false
            state.user = {}
        },
        updateViewHeight (state,height) {
            state.viewHeight = height
        },
        updateClientHeight (state,height) {
            state.clientHeight = height
        },
        updateBottomHeight (state,height) {
            state.bottomHeight = height
        }
    }
})
export default store