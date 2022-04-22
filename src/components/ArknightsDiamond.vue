<template>
  <div class="diamond-table-box">
    <div class="arknights_diamond_table_head_box">
      <table class="diamond-table">
        <thead class="arknights_diamond_table_head">
        <tr>
          <th class="arknights-diamond-table-time-column-head">时间</th>
          <th class="arknights-diamond-table-operation-column-head">项目</th>
          <th class="arknights-diamond-table-platform-column-head">平台</th>
          <th class="arknights-diamond-table-change-column-head">变更</th>
          <th class="arknights-diamond-table-current-column-head">剩余</th>
        </tr>
        </thead>
      </table>
    </div>

    <div class="arknights_diamond_table_body_box">
      <table class="diamond-table">
        <tbody>
        <template v-for="(item, index) in results" :key="index">
          <tr class="arknights_diamond_table_item">
            <td class="arknights-diamond-table-time-column-body">{{ tsToTime(item.ts) }}</td>
            <td class="arknights-diamond-table-operation-column-body">{{ item.operation }}</td>
            <td class="arknights-diamond-table-platform-column-body">{{  item.platform }}</td>
            <td class="arknights-diamond-table-change-column-body">{{ item.changeNum > 0 ? '+'+String(item.changeNum) : item.changeNum }}</td>
            <td class="arknights-diamond-table-current-column-body">{{ item.currentNum }}</td>
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
import {getCookie} from "@/router/getCookie";

export default {
  name: "ArknightsDiamond-Components",
  setup(){
    let token = getCookie('token')

    let results = ref([])

    axios({
      url:"/user/api/arknights/diamond",
      method:"get",
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    }).then(response => {
      let status = response.data.status;
      if(status===0){
        results.value = response.data.data.diamond_list
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

.diamond-table-box{
  display: inline-block;
  width: 90%;
  margin-top: 20px;
  text-align: center;
}
.diamond-table{
  width: 100%;
  height: 100%;
  border-spacing: 0 1px;
  position: relative;
  text-align: center;
  font-family: Consolas, "Microsoft YaHei UI", sans-serif;
  font-weight: lighter;
}

.arknights_diamond_table_head_box{
  overflow: hidden;
  background-color: rgba(0,0,0,0.8);
  border: #c9c9c9 solid 1px;
  border-radius: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
  box-shadow: 3px 5px 4px rgba(50, 50, 50, 0.6);
}
.arknights_diamond_table_head{
  width: 100%;
  color: #39C5BB;
  font-size: 14px;
}
.arknights-diamond-table-time-column-head{
  width: 25%;
}
.arknights-diamond-table-operation-column-head{
  width: 30%;
}
.arknights-diamond-table-platform-column-head{
  width: 19%;
}
.arknights-diamond-table-change-column-head{
  width: 13%;
}
.arknights-diamond-table-current-column-head{
  width: 13%;
}


.arknights_diamond_table_body_box{
  position: absolute;
  overflow-x: visible;
  overflow-y: scroll;
  width: 90%;
  max-height: 80%;
  border-radius: 5px;
}
.arknights_diamond_table_body_box::-webkit-scrollbar{
  display: none;
}
.arknights_diamond_table_item{
  background-color: rgba(0,0,0,0.7);
  color: white;
}
.arknights-diamond-table-time-column-body{
  border-radius: 5px 0 0 5px;
  width: 25%;
  height: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: lighter;
  font-size: 14px;
}
.arknights-diamond-table-operation-column-body{
  width: 30%;
  font-size: 15px;
  font-weight: lighter;
}
.arknights-diamond-table-platform-column-body{
  width: 19%;
  font-weight: lighter;
  font-size: 15px;
}
.arknights-diamond-table-change-column-body{
  width: 13%;
}
.arknights-diamond-table-current-column-body{
  border-radius: 0 5px 5px 0;
  width: 13%;
}

</style>