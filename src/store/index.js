import {createStore} from "vuex";

const store = createStore({
    state:{
        isLogin:window.sessionStorage.getItem('username') != null,
        currentUser:window.sessionStorage.getItem('username')
    },
    mutations:{
        changeLoginState(state, data) {
            window.sessionStorage.setItem('username', data)
        }
    }
})

export default store