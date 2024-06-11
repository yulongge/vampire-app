<template>
  <view class="product-wrap">
    <view class="filter">
      <nut-menu>
        <nut-menu-item v-model="state.value1" :options="state.options1" />
        <nut-menu-item v-model="state.value2" @change="handleChange" :options="state.options2" />
        <nut-menu-item v-model="state.value3" @change="handleChange" :options="state.options3" />
      </nut-menu>
    </view>
    <view class="equipment-list">
      <view class="equipment-item" v-for="item in list" :key="item.id" @tap="toDetail">
        <view class="equipment-info">
          <text class="name">加注设备{{ item.id }}</text>
          <text class="desc">状态：{{ item.checked ? '已开启' : '已关闭'}} 药剂：防腐剂, 药剂剩余量：30%</text>
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
import { useShareAppMessage } from '@tarojs/taro';
import CustomTabBar from '../../../../components/custom-tabbar/custom-tabbar'
import "./index.scss";
import { redirect } from '@/utils/redirect';
import { getStorageSync } from '@/utils/storage'
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
    { text: '腐蚀度', value: 4 },
    { text: '压力', value: 5 }
  ],
  options3: [
    { text: '默认排序', value: 'a' },
    { text: '腐蚀度', value: 'b' },
    { text: '厚度', value: 'c' },
  ],
  value1: 0,
  value2: 0,
  value3: 'a'
})
let list = ref([
  {checked: false, id: 1},
  {checked: true, id: 2},
  {checked: false, id: 3},
  {checked: true, id: 4},
  {checked: false, id: 5},
])
let checked = ref(false)
let noChecked = ref(true)
let showNav = ref(false)
const navList = ref()
const toDetail = () => {
  Taro.navigateTo({
    url: '/package/product/pages/add/index'
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
const changeSwitch = (val, e) => {
  console.log(val, e, 'changeSwitch')
}
const handleChange = () => {}
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