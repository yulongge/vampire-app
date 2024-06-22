<template>
  <view class="monitor-detail-analytis">
    <nut-table :columns="columns" :data="data" :summary="summary"></nut-table>
  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import "./index.scss";
const columns =ref([
  {
    title: '设备名称',
    key: 'name',
    stylehead: 'background-color: #f5f5f5;font-size:16px;',
  },
  {
    title: '加注药剂',
    key: 'sex',
    stylehead: 'background-color: #f5f5f5;font-size:16px;',
  },
  {
    title: '所属部门',
    key: 'record',
    stylehead: 'background-color: #f5f5f5;font-size:16px;',
  },
  {
    title: '药剂浓度',
    key: 'age',
    stylehead: 'background-color: #f5f5f5;font-size:16px;',
  },
  {
    title: '计划完成度',
    key: 'address',
    stylehead: 'background-color: #f5f5f5;font-size:16px;color:blue;',
    stylecolumn: 'color:blue;'
  },
  {
    title: '报警提示',
    key: 'warn',
    stylehead: 'background-color: #f5f5f5;font-size:16px;color: red;',
    stylecolumn: 'color:red;'
  }
])
const data = ref([
  {
    name: '设备1',
    sex: '明矾饱和水溶液',
    record: '工程部门',
    age: '30%',
    address: '10%',
    warn: '网络离线'
  },
  {
    name: '设备2',
    sex: '饱和草酸',
    record: '工程部门',
    age: '40%',
    address: '20%',
    warn: '设备故障'
  },
  {
    name: '设备3',
    sex: '三氯化铁',
    record: '工程部门',
    age: '50%',
    address: '30%',
    warn: ''
  },
  {
    name: '设备4',
    sex: '盐酸',
    record: '工程部门',
    age: '60%',
    address: '50%',
    warn: '温度过低'
  },
  {
    name: '设备5',
    sex: '饱和草酸',
    record: '工程部门',
    age: '10%',
    address: '60%',
    warn: '温度过低'
  },
  {
    name: '设备6',
    sex: '饱和草酸',
    record: '工程部门',
    age: '20%',
    address: '70%',
    warn: ''
  },
  {
    name: '设备7',
    sex: '明矾饱和水溶液',
    record: '工程部门',
    age: '50%',
    address: '80%',
    warn: ''
  },
  {
    name: '设备8',
    sex: '明矾饱和水溶液',
    record: '工程部门',
    age: '90%',
    address: '90%',
    warn: '液位过低'
  },
])
const summary = () => {
  return {
    value: '以上为本次统计',
    colspan: 5
  };
}

onMounted(() => {
  Taro.nextTick(() => { });
})
</script>