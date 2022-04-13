import {createStore} from "vuex";

const store = createStore({
    state:{
        back_end_address:'192.168.31.104:10492',
        //初始时候给一个 isLogin='0' 表示用户未登录
        isLogin:window.sessionStorage.getItem('user') == null ? '0' : window.sessionStorage.getItem('user')
    },
    mutations:{
        changeLogin(state, data) {
            window.sessionStorage.setItem('user', data)
        }
    }
})

export default store