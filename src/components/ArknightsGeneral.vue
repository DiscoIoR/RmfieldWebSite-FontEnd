<template>
  <div :class="arknights_general_dev">

    <div :class="arknights_qurery_box">
      <div :class="[arknights_user_info_box,arknights_user_info_box_bg_img]">
        <div class="arknights-user-info">
          <div class="arknights-username">
            Dr.{{ username }}
          </div>
          <div class="arknights-uid">
            uid:{{ uid }}
          </div>
        </div>
      </div>

      <div class="arknights-data-update-box">
        <div class="arknights_data_update_tips">
          <p>先去
            <a href="https://ak.hypergryph.com/" class="arkbights_website_link">官网</a>
            登录<br>然后点
            <a href="https://as.hypergryph.com/user/info/v1/token_by_cookie" target="_blank" class="arkbights_website_link">这里</a>
            获取token
          </p>
          <p>复制字段token:"xxxx"引号中间的部分</p>
        </div>
        <div class="arknights_data_update_submit_box">
          <input class="arknights_data_update_input" placeholder="粘贴token到此处">
          <div class="arknights_data_update_submit_state">{{ update_submit_state }}</div>
          <button @click="arknights_data_update_submit" class="arknights_data_update_submit_button">更新</button>
        </div>
      </div>

      <div class="arknights-general-info-box">
        <div class="arknights-last-update-time-box">
          <div class="arknights-last-update-time">
            数据更新时间<br>
            {{ last_update_time }}
          </div>
        </div>
        <div class="arknights-general-info-box-2">
          <span class="arknights-general-info">源石总收入: {{ diamond_income }}</span>
        </div>
        <div class="arknights-general-info-box-2">
          <span class="arknights-general-info">源石总支出: {{ diamond_expenses }}</span>
        </div>
        <div class="arknights-general-info-box-2">
          <span class="arknights-general-info">充值总额: ¥{{ order_total }}</span>
        </div>
      </div>

      <div id="character_proportion" class="character-echarts-box"></div>

      <div id="pools_proportion" class="pools-echarts-box"></div>

      <div id="dates_proportion" class="dates-echarts-box"></div>

    </div>
    <div :class="arknights_query_switch">
      <button type="button" class="arknights_query_switch_button" @click="general_button_onclick">概况</button>
      <router-link to="/user/arknights-analysis/general" id="arknights-general" style="display: none" target="_self"></router-link>
      <button type="button" class="arknights_query_switch_button" @click="gacha_button_onclick">寻访</button>
      <router-link to="/user/arknights-analysis/gacha" id="arknights-gacha" style="display: none" target="_self"></router-link>
      <button type="button" class="arknights_query_switch_button" @click="diamond_button_onclick">源石</button>
      <router-link to="/user/arknights-analysis/diamond" id="arknights-diamond" style="display: none" target="_self"></router-link>
      <button type="button" class="arknights_query_switch_button" @click="order_button_onclick">充值</button>
      <router-link to="/user/arknights-analysis/order" id="arknights-order" style="display: none" target="_self"></router-link>
    </div>
  </div>

</template>

<script>
import {inject, onMounted, ref} from "vue";
import axios from "axios";

export default {
  name: "ArknightsGeneral-Components",
  setup() {

    let echarts = inject('echarts')
    let deviceType = ref('')
    let arknights_general_dev = ref('')
    let arknights_qurery_box = ref('')
    let arknights_query_switch = ref('')


    function general_button_onclick(){
      document.getElementById("arknights-general").click()
    }
    function gacha_button_onclick(){
      document.getElementById("arknights-gacha").click()
    }
    function diamond_button_onclick(){
      document.getElementById("arknights-diamond").click()
    }
    function order_button_onclick(){
      document.getElementById("arknights-order").click()
    }

    function _isMobile() {
      return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    }
    if (_isMobile()) {
      deviceType.value = 'mobile'
      arknights_general_dev.value = 'arknights-general-mobile'
      arknights_qurery_box.value = 'arknights-qurery-box-mobile'
      arknights_query_switch.value = 'arknights-query-switch-mobile'
    } else {
      deviceType.value = 'pc'
      arknights_general_dev.value = 'arknights-general-pc'
      arknights_qurery_box.value = 'arknights-qurery-box-pc'
      arknights_query_switch.value = 'arknights-query-switch-mobile'
    }


    // 设置方舟用户信息卡片背景
    let arknights_user_info_box_bg_img = ref('')
    let arknights_user_info_box= ref('arknights-user-info-box')
    function set_ak_user_info_bg(){
      let ran_num = Math.floor(Math.random()*5)+1;
      let bg_img = ''
      switch (ran_num){
        case 1: bg_img="arknights-user-info-box_bg_img_1"
          break;
        case 2: bg_img="arknights-user-info-box_bg_img_2"
          break;
        case 3: bg_img="arknights-user-info-box_bg_img_3"
          break;
        case 4: bg_img="arknights-user-info-box_bg_img_4"
          break;
        case 5: bg_img="arknights-user-info-box_bg_img_5"
          break;
        case 6: bg_img="arknights-user-info-box_bg_img_6"
          break
        default: bg_img="arknights-user-info-box_bg_img_7"
      }
      return bg_img
    }

    arknights_user_info_box_bg_img.value=set_ak_user_info_bg()



    // axios数据解析
    let username = ref('')
    let uid = ref('')
    let six_num = 0
    let five_num = 0
    let four_num = 0
    let three_num = 0
    let pools_name = []
    let pools_val = []
    let dates_name = []
    let dates_val = []
    let characters_chart = ''
    let pools_chart = ''
    let dates_chart = ''
    let diamond_income = ref(0)
    let diamond_expenses = ref(0)
    let order_total = ref(0)
    let last_update_time = ref('')

    function get_general_data(){
      axios({
        url: "/user/api/arknights/general",
        method: "get",
      }).then(response => {
        let result = response.data;
        let state = result.state;
        let data = result.data
        if(state===0){
          username.value = data.username;
          uid.value = data.uid;
          six_num = data.six_num;
          five_num = data.five_num;
          four_num = data.four_num;
          three_num = data.three_num;
          let res_pools = data.pools;
          res_pools.forEach((element)=>{
            pools_name.push(element.pool)
            pools_val.push(element.gacha_num)
          })
          let res_dates = data.dates;
          res_dates.forEach((element)=>{
            dates_name.push(element.date)
            dates_val.push(element.gacha_num)
          })
          diamond_income.value = data.diamond_income;
          diamond_expenses.value = data.diamond_expenses;
          order_total.value = data.order_total;
          last_update_time.value = new Date().toLocaleString('chinese', {hour12: false})

          let character_total = six_num + five_num + four_num +three_num
          characters_chart.setOption({
            series:[
              {
                label: {
                  show: true,
                  position: 'center',
                  formatter: '{total|total}'+ '\n\r' + '{active|'+ character_total +'}',
                  rich: {
                    total:{
                      fontSize: 16,
                      color:'#00000073'
                    },
                    active: {
                      fontSize: 20,
                      color:'#000',
                      lineHeight:44,
                    },
                  }
                },
                data: [
                  {value: six_num, name: '6星'},
                  {value: five_num, name: '5星'},
                  {value: four_num, name: '4星'},
                  {value: three_num, name: '3星'}
                ]
              }
            ]
          })

          pools_chart.setOption({
            xAxis: [
              {
                data: pools_name,
              }
            ],
            series: [
              {
                data: pools_val
              }
            ]
          })

          dates_chart.setOption({
            xAxis: [
              {
                data: dates_name,
              }
            ],
            series: [
              {
                data: dates_val
              }
            ]
          })

        }
      })
    }

    get_general_data()



    onMounted(() => {
      characters_chart = echarts.init(document.getElementById("character_proportion"))
      characters_chart.setOption({
        tooltip: {
          trigger: 'item',
          borderWidth: 2,
          formatter: function (val) {
            return `<div>
      <span style="font-size:14px; float: left;">${val.marker}  ${val.name}</span>
      &nbsp;&nbsp;&nbsp;
      <span style="font-size:14px; font-weight: bold; float: right;"> ${val.value}</span><br>
      <span style="font-size:14px; font-weight: bold; float: right;"> ${val.percent}%</span>
      </div>`
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: ['40%','70%'],
            color: [
              '#ff3600',
              '#fbc600',
              '#d685ff',
              '#94daff',
              '#91cc75',
              '#ea7ccc',
              '#5470c6'
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 20,
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                shadowColor: 'rgba(0, 0, 0, 0.4)'
              }
            },
            label: {
              show: true,
              position: 'center',
              formatter: '{total|total}'+ '\n\r' + '{active|'+ 0 +'}',
              rich: {
                total:{
                  fontSize: 16,
                  color:'#00000073'
                },
                active: {
                  fontSize: 20,
                  color:'#000',
                  lineHeight:44,
                },
              }
            },
            data: [
              {value: 0, name: '6星'},
              {value: 0, name: '5星'},
              {value: 0, name: '4星'},
              {value: 0, name: '3星'}
            ]
          }
        ]
      })

      pools_chart = echarts.init(document.getElementById("pools_proportion"))
      pools_chart.setOption({
        title: {
          text: '按月统计',
          top:10,
          left:20
        },
        grid: {
          top: 50,
          height: '50%'
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 0, 0, 1)"
              }
            },
            z:5
          }
        ],
        yAxis: [
          {
            show:true,
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 0, 0, 1)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(50, 50, 50, 0)",
                type: "dashed",
                width: 1.5,
              }
            },
            z:5
          }
        ],
        dataZoom: [
          {
            show: true,
            bottom: 'auto',
            height: 16,
            start: 0,
            end: 100,
            brushSelect: false,
            handleStyle: {
              color: "#256b66",
            },
            handleSize: '150%',
            borderColor:'rgba(0,0,0,0.25)',
            backgroundColor: 'rgba(0,0,0,0)',
            dataBackground: {
              lineStyle: {
                color: "rgba(0, 115, 255, 1)"
              },
              areaStyle: {
                color: "rgb(121,121,121)"
              }
            },
            fillerColor: 'rgba(0,0,0,0.1)',
            selectedDataBackground:{
              lineStyle:{
                color:'#39C5BB'
              },
              areaStyle:{
                color:'#66CCFF'
              }
            }
          },
          {
            type: 'inside',
            zoomOnMouseWheel: false,
            moveOnMouseWheel: false,
            preventDefaultMouseMove: false
          }
        ],
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              textBorderColor: "rgba(0, 0, 0, 0)",
              fontSize: 9
            },
            tooltip: {
              trigger: 'axis'
            },
            data: [],
            itemStyle:{
              color: '#66ccff'
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }],
              symbol:['none','circle'],
              symbolSize: 3,
              lineStyle:{
                color: 'rgba(65,94,154,0.5)',
                type:'solid',
                width:1.8,
              },
              label:{
                textBorderColor: "rgba(0, 0, 0, 0)",
                color: 'rgba(65,94,154,1)',
                fontSize: 9
              }
            }
          }
        ]
      })

      dates_chart = echarts.init(document.getElementById("dates_proportion"))
      dates_chart.setOption({
        title: {
          text: '按卡池统计',
          top:10,
          left:20
        },
        grid: {
          top: 50,
          height: '50%'
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 0, 0, 1)"
              }
            },
            z:5
          }
        ],
        yAxis: [
          {
            show:true,
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 0, 0, 1)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(50, 50, 50, 0)",
                type: "dashed",
                width: 1.5,
              }
            },
            z:5
          }
        ],
        dataZoom: [
          {
            show: true,
            bottom: 'auto',
            height: 16,
            start: 0,
            end: 100,
            brushSelect: false,
            handleStyle: {
              color: "#256b66",
            },
            handleSize: '150%',
            borderColor:'rgba(0,0,0,0.25)',
            backgroundColor: 'rgba(0,0,0,0)',
            dataBackground: {
              lineStyle: {
                color: "rgba(0, 115, 255, 1)"
              },
              areaStyle: {
                color: "rgb(121,121,121)"
              }
            },
            fillerColor: 'rgba(0,0,0,0.1)',
            selectedDataBackground:{
              lineStyle:{
                color:'#39C5BB'
              },
              areaStyle:{
                color:'#66CCFF'
              }
            }
          },
          {
            type: 'inside',
            zoomOnMouseWheel: false,
            moveOnMouseWheel: false,
            preventDefaultMouseMove: false
          }
        ],
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              textBorderColor: "rgba(0, 0, 0, 0)",
              fontSize: 9
            },
            tooltip: {
              trigger: 'axis'
            },
            data: [],
            itemStyle:{
              color: '#66ccff'
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }],
              symbol:['none','circle'],
              symbolSize: 3,
              lineStyle:{
                color: 'rgba(65,94,154,0.5)',
                type:'solid',
                width:1.8,
              },
              label:{
                textBorderColor: "rgba(0, 0, 0, 0)",
                color: 'rgba(65,94,154,1)',
                fontSize: 9
              }
            }
          }
        ]
      })

      window.onresize = function () {//自适应大小
        characters_chart.resize();
        pools_chart.resize();
        dates_chart.resize();
      }

    })

    return {
      deviceType: deviceType,
      arknights_general_dev: arknights_general_dev,
      arknights_qurery_box:arknights_qurery_box,
      arknights_query_switch:arknights_query_switch,
      general_button_onclick,
      gacha_button_onclick,
      diamond_button_onclick,
      order_button_onclick,
      arknights_user_info_box_bg_img:arknights_user_info_box_bg_img,
      arknights_user_info_box:arknights_user_info_box,
      username:username,
      uid:uid,
      last_update_time:last_update_time,
      diamond_income:diamond_income,
      diamond_expenses:diamond_expenses,
      order_total:order_total
    }
  }
}
</script>

<style scoped>

.arknights-general-pc {
  background: rgba(200, 230, 230, 0.5);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 6px 6px 2px rgba(50, 50, 50, 0.6);
  position: fixed;
  top: 10%;
  left: 0;
  right: 0;
  margin: auto;
  width: 65%;
  min-width: 340px;
  height: 80%;
}
.arknights-general-mobile {
  background: rgba(200, 230, 230, 0.5);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 6px 6px 2px rgba(50, 50, 50, 0.6);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 80%;
  min-width: 340px;
  height: 80%;
  min-height: 600px;
  vertical-align: bottom;
}

.arknights-qurery-box-pc{
  overflow-x: hidden;
  overflow-y: visible;
  width: 100%;
  height: 90%;
  text-align: center;
}
.arknights-qurery-box-pc::-webkit-scrollbar{
  display: none;
  width: 5px;
  height:10px;
  background-color:#b5b1b1;
}
.arknights-qurery-box-pc::-webkit-scrollbar-track{
  display: none;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color:black;
}
.arknights-qurery-box-pc::-webkit-scrollbar-thumb{
  display: none;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color:#b5b1b1;
}
.arknights-qurery-box-mobile{
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  height: 90%;
}

.arknights-user-info-box{
  background-color: rgba(100,100,100,0.15);
  box-shadow: 2px 2px 4px rgba(50, 50, 50, 0.6);
  /*background-image: url("../assets/arknights_logos/5.png");*/
  background-size: contain;
  background-position: left;
  background-repeat: no-repeat;
  display: inline-block;
  position: relative;
  vertical-align: top;
  border-radius: 20px;
  width: 30%;
  min-width: 300px;
  height: 26%;
  min-height: 225px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
}
.arknights-user-info-box_bg_img_1{
  background-image: url('../assets/arknights_logos/1.png')
}
.arknights-user-info-box_bg_img_2{
  background-image: url('../assets/arknights_logos/2.png')
}
.arknights-user-info-box_bg_img_3{
  background-image: url('../assets/arknights_logos/3.png')
}
.arknights-user-info-box_bg_img_4{
  background-image: url('../assets/arknights_logos/4.png')
}
.arknights-user-info-box_bg_img_5{
  background-image: url('../assets/arknights_logos/5.png')
}
.arknights-user-info-box_bg_img_6{
  background-image: url('../assets/arknights_logos/6.png')
}
.arknights-user-info{
  background-color: rgba(0,0,0,0.35);
  box-shadow: 2px 2px 2px rgba(50, 50, 50, 0.6);
  border-radius: 10px;
  float: right;
  display: inline-block;
  margin-top: 7%;
  margin-right: 7%;
  padding: 3% 3%;
  transform-origin: center;
  transform: skew(-10deg,0);
}
.arknights-username{
  width: 70%;
  font-family: Consolas,"Microsoft YaHei UI",sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: white;
  text-shadow: 2px 2px 0 rgba(57, 197, 187, 0.6);
}
.arknights-uid{
  margin-top: 1%;
  width: 70%;
  font-family: Consolas,"Microsoft YaHei UI",sans-serif;
  font-weight: normal;
  font-size: 16px;
  color: white;
  text-shadow: 1px 1px 0 rgba(57, 197, 187, 0.6);
}

.arknights-data-update-box{
  background-color: rgba(100,100,100,0.15);
  display: inline-block;
  vertical-align: top;
  border-radius: 20px;
  width: 30%;
  min-width: 300px;
  height: 26%;
  min-height: 225px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  box-shadow: 2px 2px 4px rgba(50, 50, 50, 0.6);
  text-align: center;
}
.arknights_data_update_tips{
  font-size: 15px;
  display: inline-block;
  margin-top: 5px;
  text-align: left;
  font-family: Consolas,"Microsoft YaHei UI",sans-serif;
}
.arkbights_website_link, .arkbights_website_link:visited{
  text-decoration: none;
  color: #00c3e7;
  font-weight: bold;
}
.arkbights_website_link:hover{
  text-decoration: none;
  color: #00a2e7;
  font-weight: bold;
}
.arknights_data_update_input{
  border: #39C5BB solid 2px;
  background-color: rgba(255, 255, 255, 0.8);
  display: inline-block;
  width: 90%;
  min-width: 210px;
  font-size: 18px;
  height: 30px;
  border-radius: 10px;
  padding-left: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: normal;
  vertical-align: center;
  box-shadow: 3px 3px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}
.arknights_data_update_input:hover{
  border: #39C5BB solid 2px;
  background-color: rgba(200, 200, 200, 0.3);
  display: inline-block;
  width: 90%;
  min-width: 210px;
  font-size: 18px;
  height: 30px;
  border-radius: 10px;
  padding-left: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: normal;
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}
.arknights_data_update_input:focus{
  border: #00ffea solid 2px;
  background-color: rgba(50, 50, 50, 0.8);
  display: inline-block;
  width: 90%;
  min-width: 210px;
  font-size: 18px;
  height: 30px;
  border-radius: 10px;
  padding-left: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: normal;
  color: #39C5BB;
  caret-color: #39C5BB;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}
.arknights_data_update_submit_box{
  display: inline-block;
  width: 85%;
  text-align: right;
}
.arknights_data_update_submit_state{
  display: inline-block;
  float: left;
  margin-top: 17px;
  margin-left: 25px;
}
.arknights_data_update_submit_button{
  border: #39C5BB solid 2px;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  display: inline-block;
  width: 30%;
  height: 35px;
  margin-top: 13px;
  border-radius: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: normal;
  font-size: 18px;
  box-shadow: 3px 3px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}
.arknights_data_update_submit_button:hover{
  border: #39C5BB solid 2px;
  background-color: rgba(200, 200, 200, 0.3);
  color: black;
  display: inline-block;
  width: 30%;
  height: 35px;
  margin-top: 13px;
  border-radius: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: normal;
  font-size: 18px;
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}
.arknights_data_update_submit_button:active{
  border: #00ffea solid 2px;
  background-color: rgba(50, 50, 50, 0.8);
  color: #39C5BB;
  display: inline-block;
  width: 30%;
  height: 35px;
  margin-top: 13px;
  border-radius: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: normal;
  font-size: 18px;
  box-shadow: 1px 1px 2px rgba(50, 50, 50, 0.6);
  transition: 1ms;
}

.arknights-general-info-box{
  background-color: rgba(100,100,100,0.15);
  display: inline-block;
  vertical-align: top;
  border-radius: 20px;
  width: 30%;
  min-width: 300px;
  height: 26%;
  min-height: 225px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  box-shadow: 2px 2px 4px rgba(50, 50, 50, 0.6);
  text-align: center;
}
.arknights-last-update-time-box{
  width: 100%;
  height: 20%;
  margin-top: 5%;
  margin-bottom: 3%;
}
.arknights-last-update-time{
  font-size: 14px;
  color: rgba(0,0,0,0.7);
  font-family: Consolas,"Microsoft YaHei UI",sans-serif;
}
.arknights-general-info-box-2 {
  width: 100%;
  height: 15%;
  margin-top: 2%;
}
.arknights-general-info{
  float: left;
  margin-left: 30%;
  font-size: 16px;
  font-family: Consolas,"Microsoft YaHei UI",sans-serif;
}

.character-echarts-box {
  background-color: rgba(100,100,100,0.15);
  display: inline-block;
  vertical-align: top;
  border-radius: 20px;
  width: 30%;
  min-width: 300px;
  height: 26%;
  min-height: 225px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  box-shadow: 2px 2px 4px rgba(50, 50, 50, 0.6);
}

.pools-echarts-box{
  background-color: rgba(100,100,100,0.15);
  display: inline-block;
  vertical-align: top;
  border-radius: 20px;
  width: 30%;
  min-width: 300px;
  height: 26%;
  min-height: 225px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  box-shadow: 2px 2px 4px rgba(50, 50, 50, 0.6);
}

.dates-echarts-box{
  background-color: rgba(100,100,100,0.15);
  display: inline-block;
  vertical-align: top;
  border-radius: 20px;
  width: 30%;
  min-width: 300px;
  height: 26%;
  min-height: 225px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  box-shadow: 2px 2px 4px rgba(50, 50, 50, 0.6);
}

.arknights-query-switch-pc{
  width: 100%;
  height: 10%;
  text-align: center;
}
.arknights-query-switch-mobile {
  width: 100%;
  height: 10%;
  text-align: center;
}
.arknights_query_switch_button{
  border: #39C5BB solid 2px;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  display: inline-block;
  width: 22%;
  height: 40px;
  margin-top: 6px;
  margin-left: 1%;
  margin-right: 1%;
  border-radius: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: normal;
  font-size: 18px;
  box-shadow: 3px 3px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}
.arknights_query_switch_button:hover{
  border: #39C5BB solid 2px;
  background-color: rgba(200, 200, 200, 0.3);
  color: black;
  display: inline-block;
  width: 22%;
  height: 40px;
  margin-top: 6px;
  margin-left: 1%;
  margin-right: 1%;
  border-radius: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: normal;
  font-size: 18px;
  box-shadow: 7px 7px 2px rgba(50, 50, 50, 0.6);
  transition: 0.3s;
}
.arknights_query_switch_button:active{
  border: #00ffea solid 2px;
  background-color: rgba(50, 50, 50, 0.8);
  color: #39C5BB;
  display: inline-block;
  width: 22%;
  height: 40px;
  margin-top: 6px;
  margin-left: 1%;
  margin-right: 1%;
  border-radius: 10px;
  font-family: Bradley Hand ITC, Consolas, NewFontXingshu_2, sans-serif;
  font-weight: normal;
  font-size: 18px;
  box-shadow: 1px 1px 2px rgba(50, 50, 50, 0.6);
  transition: 1ms;
}

input:hover::placeholder, input:focus::placeholder {
  color: white;
  font-weight: normal;
}

</style>