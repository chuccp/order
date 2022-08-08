import { createStore } from 'vuex'
const store = createStore({
    state () {
        return {
            title: "店铺",
            user:{has:false,userName:"",userNo:"",roles:[]}
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
        },
        clearUser (state) {
            state.user.has = false
            state.user = {}
        }
    }
})
export default store