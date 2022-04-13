const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:80,
    proxy:{
      "/api": {
        //  接口请求路径
        target: "http://127.0.0.1:10492",//反向代理的目标地址
        changeOrigin: true
      }
    }
  }
})
