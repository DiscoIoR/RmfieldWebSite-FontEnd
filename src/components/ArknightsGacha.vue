<template>
  <div class="gacha-table-box">
    <div class="arknights_gacha_table_head_box">
      <table class="gacha-table">
        <thead class="arknights_gacha_table_head">
        <tr>
          <th class="arknights-gacha-table-time-column-head">时间</th>
          <th class="arknights-gacha-table-pool-column-head">卡池</th>
          <th class="arknights-gacha-table-name-column-head">干员</th>
          <th class="arknights-gacha-table-rarity-column-head">
            <select v-model="filter_val" class="arknights-gacha-table-rarity-filter-select">
              <option value="0" >All</option>
              <option value="5" >6星</option>
              <option value="4" >5星</option>
              <option value="3" >4星</option>
              <option value="2" >3星</option>
            </select>
          </th>
        </tr>
        </thead>
      </table>
    </div>

    <div class="arknights_gacha_table_body_box">
      <table class="gacha-table">
        <tbody>
        <template v-for="(item, index) in results" :key="index">
          <tr v-if="item.rarity===parseInt(filter_val)||parseInt(filter_val)===0"
              :class="[{'ak_gacha_six_rarity':Number(item.rarity)===5,
                      'ak_gacha_five_rarity':Number(item.rarity)===4,
                      'ak_gacha_four_rarity':Number(item.rarity)===3,
                      'ak_gacha_three_rarity':Number(item.rarity)===2},
                      {arknights_gacha_table_item:'arknights_gacha_table_item'}]">
            <td class="arknights-gacha-table-time-column-body">{{ tsToTime(item.ts) }}</td>
            <td class="arknights-gacha-table-pool-column-body">{{ item.pool }}</td>
            <td class="arknights-gacha-table-name-column-body">{{ item.isNew === true ? item.name + '[New]' : item.name }}</td>
            <td class="arknights-gacha-table-rarity-column-body">{{ item.rarity + 1 }}星</td>
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
  name: "ArknightsGacha-Components",
  setup(){

    let results = ref([])

    axios({
      url:"/user/api/arknights/gacha",
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

    let filter_val = ref('0')

    return{
      tsToTime,
      results:results,
      filter_val:filter_val
    }
  }
}
</script>

<style scoped>

.gacha-table-box{
  display: inline-block;
  width: 90%;
  margin-top: 20px;
  text-align: center;
}
.gacha-table{
  width: 100%;
  height: 100%;
  border-spacing: 0 1px;
  position: relative;
  text-align: center;
  font-family: Consolas, "Microsoft YaHei UI", sans-serif;
  font-weight: lighter;
}

.arknights_gacha_table_head_box{
  overflow: hidden;
  background-color: rgba(0,0,0,0.8);
  border: #c9c9c9 solid 1px;
  border-radius: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
  box-shadow: 3px 5px 4px rgba(50, 50, 50, 0.6);
}
.arknights_gacha_table_head{
  width: 100%;
  color: #39C5BB;
  font-size: 16px;
}

.arknights_gacha_table_body_box{
  position: absolute;
  overflow-x: visible;
  overflow-y: scroll;
  width: 90%;
  max-height: 80%;
  border-radius: 5px;
}
.arknights_gacha_table_body_box::-webkit-scrollbar{
  display: none;
}
.arknights_gacha_table_item{
  background-color: rgba(0,0,0,0.7);
}
.ak_gacha_six_rarity{
  color: #ff5b20;
}
.ak_gacha_five_rarity{
  color: #ffc722;
}
.ak_gacha_four_rarity{
  color: #ca8dff;
}
.ak_gacha_three_rarity{
  color: #ffffff;
}

.arknights-gacha-table-time-column-head{
  width: 30%;
}
.arknights-gacha-table-pool-column-head{
  width: 20%;
}
.arknights-gacha-table-name-column-head{
  width: 25%;
}
.arknights-gacha-table-rarity-column-head{
  width: 15%;
}
.arknights-gacha-table-rarity-filter-select{
  background-color: rgba(255,255,255,0.2);
  color: #39C5BB;
  font-size: 16px;
  height: 100%;
  border-radius: 5px;
  text-align: center;
}
.arknights-gacha-table-time-column-body{
  border-radius: 5px 0 0 5px;
  width: 30%;
  height: 25px;
  padding-top: 3px;
  font-size: 14px;
}
.arknights-gacha-table-pool-column-body{
  width: 20%;
  padding-top: 3px;
  font-size: 14px;
}
.arknights-gacha-table-name-column-body{
  width: 25%;
  padding-top: 3px;
  font-size: 16px;
}
.arknights-gacha-table-rarity-column-body{
  border-radius: 0 5px 5px 0;
  width: 15%;
  padding-top: 3px;
  font-size: 14px;
}

</style>