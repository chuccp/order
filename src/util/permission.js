import store from "../store";

const hasRole = function (){
    const role = store.state.user.role
    for (const index in arguments) {
        const userRole = arguments[index]
        if (userRole == role) {
            return true
        }
    }
    return false
}

export default {
    install(app,options){
        app.config.globalProperties.$hasRole = hasRole
    }
}