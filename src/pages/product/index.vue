<template>
  <view class="product-wrap">
    <view class="filter">
      <nut-menu>
        <nut-menu-item v-model="state.value1" :options="state.options1" />
        <nut-menu-item v-model="state.value2" @change="handleChange" :options="state.options2" />
      </nut-menu>
    </view>
    <view class="equipment-list">
      <view class="equipment-item" v-for="item in 20" :key="item" @tap="toDetail">
        设备 {{ item }}
      </view>
    </view>
    <!-- <nut-tabbar :bottom="true" :safe-area-inset-bottom="true" active-color="#1E90FF" @tab-switch="tabSwitch">
      <nut-tabbar-item tab-title="首页" to="/pages/index/index" icon="home"></nut-tabbar-item>
      <nut-tabbar-item tab-title="设备" to="/pages/product/index" icon="category"></nut-tabbar-item>
      <nut-tabbar-item tab-title="我的" to="/pages/mine/index" icon="my"></nut-tabbar-item>
    </nut-tabbar> -->
  </view>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage } from '@tarojs/taro';
import "./index.scss";
const state = reactive({
  options1: [
    { text: '全部设备', value: 0 },
    { text: '正常设备', value: 1 },
    { text: '废弃设备', value: 2 }
  ],
  options2: [
    { text: '默认排序', value: 'a' },
    { text: '腐蚀度', value: 'b' },
    { text: '厚度', value: 'c' },
  ],
  value1: 0,
  value2: 'a'
})
const toDetail = () => {
  Taro.navigateTo({
    url: '/package/line-area/pages/line-area/line-area'
  })
}
const tabSwitch = (item, index) => {
  console.log(item, index, 'val')
  const tablist = [
    `/pages/index/index`,
    `/pages/product/index`,
    `/pages/mine/index`
  ]
  Taro.navigateTo({
    url: tablist[index]
  });
}
useShareAppMessage((res) => {
  return {
    title: '设备列表',
  }
})
</script>