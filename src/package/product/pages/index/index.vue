<template>
  <view class="product-wrap">
    <view class="filter">
      <!-- <nut-menu>
        <nut-menu-item v-model="state.value1" :options="state.options1" />
        <nut-menu-item v-model="state.value2" @change="handleChange" :options="state.options2" />
        <nut-menu-item v-model="state.value3" @change="handleChange" :options="state.options3" />
      </nut-menu> -->
      <nut-searchbar v-model="keyword">
        <template v-slot:rightout>
          <span @click="toSearchDevice">搜索</span>
          <!-- <span class="add-con" @click="toAddUser"><nut-icon name="plus" ></nut-icon></span> -->
        </template>
      </nut-searchbar>
    </view>
    <view class="equipment-list">
      <view class="equipment-item" v-for="(item, index) in list" :key="item.id" @tap="toDetail(item)">
        <view class="equipment-info">
          <text class="name">{{ item.name }}</text>
          <text class="desc">编号：{{item.number}} ，  通信端口：{{ item.communicationPort }} ，  位置：{{ item.location }} </text>
          <text class="desc">网络是否在线: 离线 ，  流量: 30m ，  计划完成度: 30% </text>
          <view class="desc warn" v-if="warnText[index]">
            <nut-icon name="tips" color="#fa2c19" size="16px"></nut-icon>
            <text class="warn-tip"> {{ warnText[index] }}   </text>
          </view>
        </view>
        <view @click.stop>
          <nut-switch v-model="item.checked" active-text="开" inactive-text="关" size="40px" @change="changeSwitch"/>
          <!-- <nut-switch v-model="noChecked" active-text="开" inactive-text="关" v-else size="40px" @change="changeSwitch"/> -->
        </view>
      </view>
    </view>
    <CustomTabBar />
    <nut-fixednav :position="{bottom:'280px' }" type="right" v-model:visible="showNav">
      <template v-slot:list>
        <ul class="nut-fixednav__list">
            <li class="nut-fixednav__list-item" @tap="addProduct">添加设备</li>
            <li class="nut-fixednav__list-item" @tap="addPlanTemp">加注计划</li>
            <li class="nut-fixednav__list-item" @tap="toStatistics">统计报表</li>
        </ul>
      </template>
      <template v-slot:btn>
          <nut-icon name="retweet" color="#fff">
          </nut-icon>
          <span class="text">{{ showNav ? '操作设备' : '操作设备' }}</span>
      </template>
    </nut-fixednav>
  </view>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage, useDidShow } from '@tarojs/taro';
import CustomTabBar from '../../../../components/custom-tabbar/custom-tabbar'
import "./index.scss";
import { redirect } from '@/utils/redirect';
import { getStorageSync } from '@/utils/storage';
import {
  getDevices,
  searchDevices
} from '@/api/product/product.ts'
const warnText = {
  0: '网络离线',
  1: '设备故障',
  2: '',
  3: '温度过低',
  4: '液位过低',
}
const state = reactive({
  options1: [
    { text: '全部设备', value: 0 },
    { text: '开启状态', value: 1 },
    { text: '关闭状态', value: 2 }
  ],
  options2: [
    { text: '各项指标', value: 0 },
    { text: '流速', value: 1 },
    { text: '温度', value: 3 },
    { text: '效率', value: 4 },
    { text: '压力', value: 5 }
  ],
  options3: [
    { text: '默认排序', value: 'a' },
    { text: '效率', value: 'b' },
    { text: '厚度', value: 'c' },
  ],
  value1: 0,
  value2: 0,
  value3: 'a'
})
let list = ref([])
let checked = ref(false)
let noChecked = ref(true)
let showNav = ref(false)
let keyword = ref('')
const navList = ref()
let params = ref({
  pageNo: 1,
  pageSize: 10
})

const toDetail = (item) => {
  Taro.navigateTo({
    url: `/package/product/pages/add/index?id=${item.id}`
  })
}
useShareAppMessage((res) => {
  return {
    title: '设备列表',
  }
})
const addProduct = () => {
  Taro.navigateTo({
    url: '/package/product/pages/add/index'
  })
}
const addPlanTemp = () => {
  Taro.navigateTo({
    url: '/package/product/pages/planTemp/index'
  })
}
const toStatistics = () => {
  Taro.navigateTo({
    url: '/package/product/pages/statistics/index'
  })
}
const changeSwitch = (val, e) => {
  console.log(val, e, 'changeSwitch')
}
const handleChange = () => {}
const getList = async () => {
  const res = await getDevices({
    ...params.value,
  })
  console.log(res, 'getList')
  list.value = res.map((item) => {
    item.checked = false
    return item
  })
}
const toSearchDevice = async () => {
  const res = await searchDevices({
    keyword: keyword.value
  })
  list.value = res.map((item) => {
    item.checked = false
    return item
  })
}
useDidShow(() => {
  getList()
  showNav.value = false
})
onMounted(() => {
  const userInfo = getStorageSync('userInfo')
  if (!userInfo?.id) {
    redirect({
      type: 'relaunch',
      url: '/package/mine/pages/login/index'
    })
  }
});
</script>