import { createStore } from 'vuex'
const store = createStore({
    state () {
        return {
            title: "店铺"
        }
    },
    mutations: {
        increment (state,title) {
            state.title = title
        }
    }
})
export default store