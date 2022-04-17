<template>
  <div :class="login_register_card_box">
    <div class="register-card" v-show="show_login">
      <div class="register-content">
        <div class="register-card-head">
          <div class="register-result-error" v-if="register_result!==0">
            <img src="../assets/error.png" alt="" class="register-result-error-image">
            <div class="register-result-error-text">
              <span>register failed</span>
              <p class="register-result-error-text-details">This could be because the username already exist or the
                invitation code is incorrect.</p>
              <p class="register-result-error-text-details">However, login failures due to server or network problems
                cannot be ruled out.</p>
            </div>
          </div>
        </div>
        <form class="register-card-form">
          <div class="register-card-input-box">
            <input v-model.lazy="register_input_username" @blur="set_username_error"
                   placeholder=" username" title="username,special characters are not allowed"
                   class="register-card-input">
            <div class="register-error" v-show="username_error===true">
              <img src="../assets/error.png" alt="" class="register-error-image">
              <span class="register-error-details">{{ username_error_detail }}</span>
            </div>
          </div>
          <br>
          <div class="register-card-input-box">
            <input v-model.lazy="register_input_password" @blur="set_password_error"
                   placeholder=" password" title="password,special characters are not allowed"
                   class="register-card-input">
            <div class="register-error" v-show="password_error===true">
              <img src="../assets/error.png" alt="" class="register-error-image">
              <span class="register-error-details">{{ password_error_detail }}</span>
            </div>
          </div>
          <br>
          <div class="register-card-input-box">
            <input v-model.lazy="register_input_repassword" @blur="set_repassword_error"
                   placeholder=" retype password" title="retype the password you just input"
                   class="register-card-input">
            <div class="register-error" v-show="repassword_error===true">
              <img src="../assets/error.png" alt="" class="register-error-image">
              <span class="register-error-details">{{ repassword_error_detail }}</span>
            </div>
          </div>
          <br>
          <div class="register-card-input-box">
            <input v-model.lazy="register_input_realname" @blur="set_realname_error"
                   placeholder=" realname" title="a note of your identity,special characters are not allowed"
                   class="register-card-input">
            <div class="register-error" v-show="realname_error===true">
              <img src="../assets/error.png" alt="" class="register-error-image">
              <span class="register-error-details">{{ realname_error_detail }}</span>
            </div>
          </div>
          <br>
          <div class="register-card-input-box">
            <input v-model.lazy="register_input_invitationcode" @blur="set_invitationcode_error"
                   placeholder=" invitation code" title="contact me to get an invitation code"
                   class="register-card-input">
            <div class="register-error" v-show="invitationcode_error===true">
              <img src="../assets/error.png" alt="" class="register-error-image">
              <span class="register-error-details">{{ invitationcode_error_detail }}</span>
            </div>
          </div>
          <br>
          <div class="register-card-button-box">
            <button @click="register_submit" type="button" class="register-card-submit">
              Register
            </button>
            <button type="button" class="register-card-to-login-button" @click="change_login_register_card_box_state">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="login-card" v-show="!show_login">
      <div class="login-content">
        <div class="login-card-head">
          <div class="login-error" v-if="login_result!==0">
            <img src="../assets/error.png" alt="" class="login-error-image">
            <div class="login-error-text">
              <span>login failed</span>
              <p class="login-error-text-details">This could be because you entered the wrong username or password.</p>
              <p class="login-error-text-details">However, login failures due to server or network problems cannot be
                ruled out.</p>
            </div>
          </div>
        </div>
        <form class="login-card-form">
          <input v-model="login_input_username" placeholder="username" class="login-card-input">
          <br>
          <input v-model="login_input_password" type="password" placeholder="password" class="login-card-input">
          <br>
          <button @click="login_submit" type="button" class="login-card-submit">
            Login
          </button>
          <button type="button" class="login-card-to-register-button" @click="change_login_register_card_box_state">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
//import {useStore} from "vuex";
import axios from 'axios'

export default {
  name: "LoginRegisterPanel-Components",
  setup() {
    function sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    let show_login = ref(false)
    let card_box_1 = ref('login-register-card-box-font')
    let card_box_2 = 'login-register-card-box-back'

    function change_login_register_card_box_state() {

      let card_box_3 = card_box_1.value
      card_box_1.value = card_box_2
      card_box_2 = card_box_3
      sleep(150).then(() => {
        show_login.value = !show_login.value
      })
    }


    //设置注册提示框状态

    function check_invalid_char(str) {
      let pattern = new RegExp("[`~!@#$^&*()=|{}':;,\\[\\].<>/?！￥…（）—【】‘；：”“。，、？ ]")
      let ret = str.search(pattern)
      return !(ret === -1);
    }

    let register_input_username = ref('')
    let username_error = ref(false)
    let username_error_detail = ref('')

    function set_username_error() {
      let str = register_input_username.value
      if (str === '') {
        username_error_detail.value = 'username can not be empty'
        username_error.value = true
      } else {
        username_error_detail.value = 'special characters are not allowed'
        username_error.value = check_invalid_char(str)
      }
    }

    let register_input_password = ref('')
    let password_error = ref(false)
    let password_error_detail = ref('')

    function set_password_error() {
      let str = register_input_password.value
      if (str === '') {
        password_error_detail.value = 'password can not be empty'
        password_error.value = true
      } else {
        password_error_detail.value = 'special characters are not allowed'
        password_error.value = check_invalid_char(str)
      }
    }

    let register_input_repassword = ref('')
    let repassword_error = ref(false)
    let repassword_error_detail = ref('')

    function set_repassword_error() {
      if (register_input_repassword.value !== register_input_password.value) {
        repassword_error_detail.value = 'password mismatch'
        repassword_error.value = true
      } else {
        repassword_error.value = false
      }
    }

    let register_input_realname = ref('')
    let realname_error = ref(false)
    let realname_error_detail = ref('')

    function set_realname_error() {
      let str = register_input_realname.value
      if (str === '') {
        realname_error_detail.value = 'realname can not be empty'
        realname_error.value = true
      } else {
        realname_error_detail.value = 'special characters are not allowed'
        realname_error.value = check_invalid_char(str)
      }
    }

    let register_input_invitationcode = ref('')
    let invitationcode_error = ref(false)
    let invitationcode_error_detail = ref('')

    function set_invitationcode_error() {
      let str = register_input_invitationcode.value
      if (str === '') {
        invitationcode_error_detail.value = 'invitation code can not be empty'
        invitationcode_error.value = true
      } else {
        invitationcode_error.value = false
      }
    }

    //注册数据提交
    let register_result = ref(0)

    function register_submit() {
      set_username_error();
      set_password_error();
      set_repassword_error();
      set_realname_error();
      set_invitationcode_error();
      if (username_error.value ||
          password_error.value ||
          repassword_error.value ||
          realname_error.value ||
          invitationcode_error.value
      ) {
        return
      }

      axios({
        url: "/api/register",
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          username: register_input_username.value,
          password: register_input_password.value,
          realname: register_input_realname.value,
          invitationCode: register_input_invitationcode.value
        }),
      }).then(response => {
        let jsonResult = response.data;
        register_result.value = jsonResult.state
      }).catch(() => {
        register_result.value = 1
      })
    }


    //登录数据提交
    let login_input_username = ref('')
    let login_input_password = ref('')
    let login_result = ref(0)

    function login_submit() {
      if (login_input_username.value === '' || login_input_password.value === '') {
        return
      }

      axios({
        url: "/api/login",
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          username: login_input_username.value,
          password: login_input_password.value
        }),
      }).then(response => {
        let jsonResult = response.data;
        login_result.value = jsonResult.state
      }).catch(() => {
        login_result.value = 1
      })
    }


    return {
      change_login_register_card_box_state,
      show_login: show_login,
      login_register_card_box: card_box_1,
      set_username_error,
      set_password_error,
      set_repassword_error,
      set_realname_error,
      set_invitationcode_error,
      username_error,
      password_error,
      repassword_error,
      realname_error,
      invitationcode_error,
      username_error_detail,
      password_error_detail,
      repassword_error_detail,
      realname_error_detail,
      invitationcode_error_detail,
      register_input_username: register_input_username,
      register_input_password: register_input_password,
      register_input_repassword: register_input_repassword,
      register_input_realname: register_input_realname,
      register_input_invitationcode: register_input_invitationcode,
      register_submit,
      register_result,
      login_input_username,
      login_input_password,
      login_submit,
      login_result
    }
  }
}
</script>

<style scoped>
.login-register-card-box-font {
  background: rgba(200, 230, 230, 0.5);
  backdrop-filter: blur(15px);
  position: fixed;
  overflow: hidden;
  width: 30%;
  min-width: 300px;
  min-height: 260px;
  height: 38%;
  top: 20%;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 20px;
  box-shadow: 6px 6px 2px rgba(50, 50, 50, 0.6);
  transition: 1s;
  transform-style: preserve-3d;
}

.login-register-card-box-back {
  background: rgba(200, 230, 230, 0.5);
  backdrop-filter: blur(15px);
  position: fixed;
  overflow: hidden;
  width: 30%;
  min-width: 300px;
  height: 60%;
  top: 12%;
  min-height: 430px;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 20px;
  box-shadow: 6px 6px 2px rgba(50, 50, 50, 0.6);
  transition: 1s;
  transform-style: preserve-3d;
  transform: rotateY(360deg);
}

.login-card {
  position: absolute;
  width: 100%;
  height: 100%;
}

.login-content {
  height: 100%;
  position: relative;
}

.login-card-head {
  height: 12%;
  text-align: center;
}

.login-error {
  background-color: rgba(255, 200, 200, 0.6);
  color: black;
  display: inline-block;
  position: relative;
  overflow: hidden;
  width: 130px;
  text-align: left;
  height: 20px;
  border-radius: 12px;
  margin-top: 15px;
  box-shadow: 3px 3px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}

.login-error:hover {
  background-color: rgba(30, 12, 6, 0.8);
  backdrop-filter: blur(5px);
  border: rgba(255, 200, 200, 0.6) solid 2px;
  color: #e12222;
  display: inline-block;
  position: relative;
  overflow: hidden;
  width: 240px;
  height: 245px;
  text-align: left;
  border-radius: 12px;
  margin-top: 15px;
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}

.login-error-image {
  height: 16px;
  width: 16px;
  margin-top: 2px;
  margin-left: 2px;
}

.login-error-text {
  display: inline-block;
  position: absolute;
  margin-left: 10px;
  margin-top: 0;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu, sans-serif;
  font-weight: bold;
}

.login-error-text-details {
  font-family: "Bradley Hand ITC TT Italic", sans-serif;
  color: #39C5BB;
}

.login-card-form {
  height: 88%;
  text-align: center;
}

.login-card-input {
  border: #39C5BB solid 2px;
  background-color: rgba(255, 255, 255, 0.8);
  display: inline-block;
  width: 60%;
  min-width: 210px;
  font-size: 18px;
  height: 30px;
  border-radius: 10px;
  margin-top: 6%;
  padding-left: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  vertical-align: center;
  box-shadow: 3px 3px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}

.login-card-input:hover {
  border: #39C5BB solid 2px;
  background-color: rgba(200, 200, 200, 0.3);
  display: inline-block;
  width: 60%;
  min-width: 210px;
  font-size: 18px;
  height: 30px;
  border-radius: 10px;
  margin-top: 6%;
  padding-left: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
  cursor: url("../assets/miku_cursor.cur"), default;
}

.login-card-input:focus {
  border: #00ffea solid 2px;
  background-color: rgba(50, 50, 50, 0.8);
  display: inline-block;
  width: 60%;
  min-width: 210px;
  font-size: 18px;
  height: 30px;
  border-radius: 10px;
  margin-top: 6%;
  padding-left: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  color: #39C5BB;
  caret-color: #39C5BB;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}

.login-card-submit {
  border: #39C5BB solid 2px;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  display: inline-block;
  width: 28%;
  min-width: 105px;
  height: 40px;
  border-radius: 10px;
  margin-top: 8%;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 3px 3px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}

.login-card-submit:hover {
  border: #39C5BB solid 2px;
  background-color: rgba(200, 200, 200, 0.3);
  color: black;
  display: inline-block;
  width: 28%;
  min-width: 105px;
  height: 40px;
  border-radius: 10px;
  margin-top: 8%;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
  cursor: url("../assets/miku_cursor.cur"), default;
}

.login-card-submit:active {
  border: #00ffea solid 2px;
  background-color: rgba(50, 50, 50, 0.8);
  color: #39C5BB;
  display: inline-block;
  width: 28%;
  min-width: 105px;
  height: 40px;
  border-radius: 10px;
  margin-top: 8%;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 1px 1px 2px rgba(50, 50, 50, 0.6);
  transition: 1ms;
}

.login-card-to-register-button {
  border: #39C5BB solid 2px;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  display: inline-block;
  width: 28%;
  min-width: 105px;
  height: 40px;
  border-radius: 10px;
  margin-top: 8%;
  margin-left: 5%;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 3px 3px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}

.login-card-to-register-button:hover {
  border: #39C5BB solid 2px;
  background-color: rgba(200, 200, 200, 0.3);
  color: black;
  display: inline-block;
  width: 28%;
  min-width: 105px;
  height: 40px;
  border-radius: 10px;
  margin-top: 8%;
  margin-left: 5%;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
  cursor: url("../assets/miku_cursor.cur"), default;
}

.login-card-to-register-button:active {
  border: #00ffea solid 2px;
  background-color: rgba(50, 50, 50, 0.8);
  color: #39C5BB;
  display: inline-block;
  width: 28%;
  min-width: 105px;
  height: 40px;
  border-radius: 10px;
  margin-top: 8%;
  margin-left: 5%;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 1px 1px 2px rgba(50, 50, 50, 0.6);
  transition: 1ms;
}

.register-card {
  position: absolute;
  width: 100%;
  height: 100%;
}

.register-content {
  height: 100%;
  position: relative;
}

.register-card-head {
  height: 5%;
  text-align: center;
}

.register-result-error {
  background-color: rgba(255, 200, 200, 0.6);
  color: black;
  display: inline-block;
  position: relative;
  overflow: hidden;
  width: 150px;
  text-align: left;
  height: 20px;
  border-radius: 12px;
  margin-top: 12px;
  box-shadow: 3px 3px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}

.register-result-error:hover {
  background-color: rgba(30, 12, 6, 0.8);
  backdrop-filter: blur(5px);
  border: rgba(255, 200, 200, 0.6) solid 2px;
  color: #e12222;
  display: inline-block;
  position: relative;
  overflow: hidden;
  width: 240px;
  height: 270px;
  text-align: left;
  border-radius: 12px;
  margin-top: 2px;
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}

.register-result-error-image {
  height: 16px;
  width: 16px;
  margin-top: 2px;
  margin-left: 2px;
}

.register-result-error-text {
  display: inline-block;
  position: absolute;
  margin-left: 10px;
  margin-top: 0;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
}

.register-result-error-text-details {
  font-family: "Bradley Hand ITC TT Italic", sans-serif;
  color: #39C5BB;
}

.register-card-form {
  height: 95%;
  text-align: center;
}

.register-card-input-box {
  display: inline-block;
  width: 70%;
  margin-top: 6%;
  min-width: 240px;
  text-align: left;
}

.register-card-input {
  border: #39C5BB solid 2px;
  background-color: rgba(255, 255, 255, 0.8);
  display: inline-block;
  font-size: 18px;
  height: 30px;
  border-radius: 10px;
  width: 80%;
  min-width: 190px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  box-shadow: 3px 3px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}

.register-card-input:hover {
  border: #39C5BB solid 2px;
  background-color: rgba(200, 200, 200, 0.3);
  display: inline-block;
  font-size: 18px;
  height: 30px;
  border-radius: 10px;
  width: 80%;
  min-width: 190px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
  cursor: url("../assets/miku_cursor.cur"), default;
}

.register-card-input:focus {
  border: #00ffea solid 2px;
  background-color: rgba(50, 50, 50, 0.8);
  display: inline-block;
  font-size: 18px;
  height: 30px;
  border-radius: 10px;
  width: 80%;
  min-width: 190px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  color: #39C5BB;
  caret-color: #39C5BB;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}

.register-error {
  background-color: rgba(255, 200, 200, 0.6);
  position: absolute;
  display: inline-block;
  overflow: hidden;
  float: right;
  margin-top: 10px;
  margin-left: 5px;
  border-radius: 12px;
  height: 16px;
  width: 16px;
  box-shadow: 3px 3px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}

.register-error:hover {
  background-color: rgba(30, 12, 6, 0.8);
  backdrop-filter: blur(5px);
  border: rgba(255, 200, 200, 0.6) solid 2px;
  display: inline-block;
  overflow: hidden;
  position: absolute;
  float: right;
  text-align: center;
  margin-top: -6px;
  margin-left: -225px;
  border-radius: 12px;
  height: 35px;
  width: 250px;
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transform-origin: 100% 50%;
  transition: 0.3s;
}

.register-error-image {
  display: inline-block;
  float: right;
  height: 16px;
  width: 16px;
}

.register-error-details {
  font-family: "Bradley Hand ITC", sans-serif;
  color: #39C5BB;
}

.register-card-button-box {
  display: inline-block;
  width: 70%;
  margin-top: 6%;
  min-width: 240px;
  text-align: left;
}

.register-card-submit {
  border: #39C5BB solid 2px;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  display: inline-block;
  width: 38%;
  min-width: 100px;
  height: 40px;
  border-radius: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 3px 3px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}

.register-card-submit:hover {
  border: #39C5BB solid 2px;
  background-color: rgba(200, 200, 200, 0.3);
  color: black;
  display: inline-block;
  width: 38%;
  min-width: 100px;
  height: 40px;
  border-radius: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
  cursor: url("../assets/miku_cursor.cur"), default;
}

.register-card-submit:active {
  border: #39C5BB solid 2px;
  background-color: rgba(50, 50, 50, 0.8);
  color: #39C5BB;
  display: inline-block;
  width: 38%;
  min-width: 100px;
  height: 40px;
  border-radius: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 1px 1px 2px rgba(50, 50, 50, 0.6);
  transition: 1ms;
}

.register-card-to-login-button {
  border: #39C5BB solid 2px;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  display: inline-block;
  width: 38%;
  min-width: 100px;
  height: 40px;
  border-radius: 10px;
  margin-left: 6%;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 3px 3px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}

.register-card-to-login-button:hover {
  border: #39C5BB solid 2px;
  background-color: rgba(200, 200, 200, 0.3);
  color: black;
  display: inline-block;
  width: 38%;
  min-width: 100px;
  height: 40px;
  border-radius: 10px;
  margin-left: 6%;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
  cursor: url("../assets/miku_cursor.cur"), default;
}

.register-card-to-login-button:active {
  border: #39C5BB solid 2px;
  background-color: rgba(50, 50, 50, 0.8);
  color: #39C5BB;
  display: inline-block;
  width: 38%;
  min-width: 100px;
  height: 40px;
  border-radius: 10px;
  margin-left: 6%;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 1px 1px 2px rgba(50, 50, 50, 0.6);
  transition: 1ms;
}

input:hover::placeholder, input:focus::placeholder {
  color: white;
  font-weight: normal;
}
</style>
