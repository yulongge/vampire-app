<template>
  <view class="monitor-detail-analytis">
    <nut-cell
      :showIcon="true"
      title="选择日期区间"
      :desc="date ? `${date[0]}至${date[1]}` : '请选择'"
      @click="openSwitch('isVisible')"
    >
    </nut-cell>
    <nut-calendar
      v-model:visible="isVisible"
      :default-value="date"
      type="range"
      :start-date="`2019-12-22`"
      :end-date="moment().format('YYYY-MM-DD')"
      @close="closeSwitch('isVisible')"
      @choose="setChooseValue"
      @select="select"
    >
    </nut-calendar>
    <div class="filter-list">
      <div class="filter-list-container">
        <nut-radiogroup v-model="radioVal">
          <nut-radio label="1">全选</nut-radio>
        </nut-radiogroup>
        <nut-checkboxgroup v-model="checkedFilter" ref="group" @change="changeFilter" class="filter-list-con">
          <nut-checkbox v-for="item in filterItems" :key="item.label" :label="item.label" class="filter-list-item" @change="changeFilterItem">{{item.value}} </nut-checkbox>
        </nut-checkboxgroup>
      </div>
      <nut-button block type="info" class="option-btn" @click="toAnalysis">统计</nut-button>
    </div>
    <div class="analysis-canvas" v-if="showAnanysic">
      <nut-table :columns="columns" :data="data" :summary="summary"></nut-table>
    </div>
  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, createVNode } from "vue";
import Taro from "@tarojs/taro";
import moment from 'moment';
import "./index.scss";
import * as echarts from "echarts4taro3/lib/assets/echarts"; // 这里用了内置的，也可以用自定义的 echarts.js
import { EChart, loadEcharts } from "echarts4taro3";
loadEcharts(echarts);
import { redirect } from '@/utils/redirect';
const canvas = ref(null);
const date = ref([moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')])
let isVisible = ref(false)
const radioVal = ref('0');
let checkedFilter = ref(['1', '2', '3'])
let showAnanysic = ref(false)
let filterItems = ref([
  {label: '1', value: '部门'},
  {label: '2', value: '设备'},
])
const openSwitch = param => {
  isVisible.value = true;
};
const closeSwitch = param => {
  isVisible.value = false;
};
const setChooseValue= param => {
  date.value = [...[param[0][3], param[1][3]]];
};
const select = (param: string) => {
  console.log(param);
};
const group = ref(null);
const changeFilter = (label: any[]) => {
  console.log(label, 'label')
  checkedFilter.value = label
};
const changeFilterItem = (state, label) => {
  console.log(state, label, 'changeFilterItem')
}
const toggleAll = (f: boolean) => {
  (group.value as any).toggleAll(f);
};
const toggleReverse = () => {
  group.value.toggleReverse();
};
const columns =ref([
  {
    title: '设备名称',
    key: 'name'
  },
  {
    title: '加注药剂',
    key: 'sex'
  },
  // {
  //   title: '所属部门',
  //   key: 'record'
  // },
  {
    title: '药剂浓度',
    key: 'age'
  },
  {
    title: '计划完成度',
    key: 'address'
  }
])
const data = ref([
  {
    name: '设备1',
    sex: '明矾饱和水溶液',
    record: '工程部门',
    age: '30%',
    address: '40%'
  },
  {
    name: '设备2',
    sex: '饱和草酸',
    record: '工程部门',
    age: '30%',
    address: '40%'
  },
  {
    name: '设备3',
    sex: '三氯化铁',
    record: '工程部门',
    age: '30%',
    address: '40%'
  },
  {
    name: '设备4',
    sex: '盐酸',
    record: '工程部门',
    age: '30%',
    address: '40%'
  },
  {
    name: '设备5',
    sex: '饱和草酸',
    record: '工程部门',
    age: '30%',
    address: '40%'
  },
  {
    name: '设备6',
    sex: '饱和草酸',
    record: '工程部门',
    age: '30%',
    address: '40%'
  },
  {
    name: '设备7',
    sex: '明矾饱和水溶液',
    record: '工程部门',
    age: '30%',
    address: '40%'
  },
  {
    name: '设备8',
    sex: '明矾饱和水溶液',
    record: '工程部门',
    age: '30%',
    address: '40%'
  },
])
const summary = () => {
  return {
    value: '以上为本次统计',
    colspan: 5
  };
}
const toAnalysis = () => {
  // showAnanysic.value = true
  redirect({
    url: '/package/product/pages/table/index'
  })
}
onMounted(() => {
  Taro.nextTick(() => {
    // echartComponentInstance.refresh(option);
  });
})
</script>