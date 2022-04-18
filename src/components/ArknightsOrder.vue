<template>
  <div class="order-table-box">
    <div class="arknights_order_table_head_box">
      <table class="order-table">
        <thead class="arknights_order_table_head">
          <tr>
            <th class="arknights-order-table-id-column-head">交易编号</th>
            <th class="arknights-order-table-platform-column-head">平台</th>
            <th class="arknights-order-table-amount-column-head">金额</th>
            <th class="arknights-order-table-name-column-head">项目</th>
            <th class="arknights-order-table-time-column-head">时间</th>
          </tr>
        </thead>
      </table>
    </div>

    <div class="arknights_order_table_body_box">
      <table class="order-table">
        <tbody>
          <template v-for="(item, index) in results" :key="index">
            <tr class="arknights_order_table_item">
              <td class="arknights-order-table-id-column-body">{{ item.orderId }}</td>
              <td class="arknights-order-table-platform-column-body">{{  item.platform }}</td>
              <td class="arknights-order-table-amount-column-body">¥{{ (item.amount/100).toFixed(2) }}</td>
              <td class="arknights-order-table-name-column-body">{{ item.productName }}</td>
              <td class="arknights-order-table-time-column-body">{{ tsToTime(item.payTime) }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";

export default {
  name: "ArknightsOrder-Components",
  setup(){

    let results = ref([])

    axios({
      url:"/user/api/arknights/order",
      method:"get"
    }).then(response => {
      let state = response.data.state;
      if(state===0){
        results.value = response.data.data
      }
    }).catch(()=>{
      console.log('从服务器拉取数据失败')
    })

    function tsToTime(timestamp) {
      let date = new Date(timestamp * 1000);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds();
      return Y+M+D+h+m+s;
    }

    return{
      tsToTime,
      results:results
    }
  }
}
</script>

<style scoped>

.order-table-box{
  display: inline-block;
  width: 90%;
  margin-top: 20px;
  text-align: center;
}
.order-table{
  width: 100%;
  height: 100%;
  border-spacing: 0 1px;
  position: relative;
  text-align: center;
  font-family: Consolas, "Microsoft YaHei UI", sans-serif;
  font-weight: lighter;
}

.arknights_order_table_head_box{
  overflow: hidden;
  background-color: rgba(0,0,0,0.8);
  border: #c9c9c9 solid 1px;
  border-radius: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
}
.arknights_order_table_head{
  width: 100%;
  color: #39C5BB;
  font-size: 14px;
}
.arknights-order-table-id-column-head{
  width: 23%;
}
.arknights-order-table-platform-column-head{
  width: 17%;
}
.arknights-order-table-amount-column-head{
  width: 16%;
}
.arknights-order-table-name-column-head{
  width: 24%;
}
.arknights-order-table-time-column-head{
  width: 20%;
}


.arknights_order_table_body_box{
  position: absolute;
  overflow-x: hidden;
  overflow-y: visible;
  width: 90%;
  max-height: 80%;
  border-radius: 5px;
}
.arknights_order_table_body_box::-webkit-scrollbar{
  display: none;
}
.arknights_order_table_item{
  background-color: rgba(0,0,0,0.7);
  color: white;
}
.arknights-order-table-id-column-body{
  border-radius: 5px 0 0 5px;
  width: 23%;
  height: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
  word-break: break-word;
  font-weight: lighter;
  font-size: 13px;
}
.arknights-order-table-platform-column-body{
  width: 17%;
}
.arknights-order-table-amount-column-body{
  width: 16%;
  font-size: 16px;
}
.arknights-order-table-name-column-body{
  width: 24%;
  font-weight: normal;
  font-size: 16px;
}
.arknights-order-table-time-column-body{
  border-radius: 0 5px 5px 0;
  width: 20%;
  font-weight: lighter;
  font-size: 14px;
}
</style>