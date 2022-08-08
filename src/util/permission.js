import store from "../store";

export const hasRole = function () {
    const roles = store.state.user.roles
    for (const index in arguments) {
        const userRole = arguments[index]
        if (roles.some((r) => r === userRole)) {
            return true
        }
    }
    return false
}

export default {
    install(app, options) {
        app.config.globalProperties.$hasRole = hasRole
    }
}