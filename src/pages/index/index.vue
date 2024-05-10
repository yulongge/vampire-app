<template>
  <view class="app">
    <!-- 自定义头部导航 -->
    <CustomNavBar :showBg="showBg" title="智能药剂加注系统"/>
    <!-- 头部内容 -->
    <view class="app-top">
      <view class="static-data">
        <nut-swiper
          :init-page="2"
          :auto-play="3000"
          pagination-visible
          pagination-color="#426543"
          pagination-unselected-color="#808080"
        >
          <nut-swiper-item v-for="(item, index) in list" :key="index" style="height: 150px">
            <img :src="item" alt="" style="height: 100%; width: 100%" draggable="false" />
          </nut-swiper-item>
        </nut-swiper>
      </view>
      <!-- 关注设备信息-饼状图 -->
      <view class="app-main-top">
        <EChart ref="canvas" />
      </view>
    </view>
    <view class="app-main">
      <view class="equipment-list">
        <view class="equipment-item" v-for="item in 5" :key="item" @tap="toDetail">
          <!-- 常用设备 -->
          <view class="equipment-info">设备{{ item }}</view>
          <nut-circleprogress :progress="20" color="#1E90FF"> </nut-circleprogress>
        </view>
      </view>
    </view>
    <CustomTabBar />
  </view>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage, usePageScroll } from '@tarojs/taro'
import * as echarts from "echarts4taro3/lib/assets/echarts"; // 这里用了内置的，也可以用自定义的 echarts.js
import { EChart, loadEcharts } from "echarts4taro3";
import CustomNavBar from '../../components/custom-nav-bar/custom-nav-bar'
import CustomTabBar from '../../components/custom-tabbar/custom-tabbar'
import "./index.scss";
loadEcharts(echarts);
let showBg = ref(false)
let showInit = ref(false)
const canvas = ref(null);
const list = ref([
  'https://yulongge.github.io/images/fushi/banner1.png',
  'https://yulongge.github.io/images/fushi/banner2.png',
  'https://yulongge.github.io/images/fushi/banner3.png',
  'https://yulongge.github.io/images/fushi/banner4.png'
])
const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    show: false,
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '55%'],
      // adjust the start and end angle
      startAngle: 180,
      endAngle: 360,
      data: [
        { value: 1048, name: '流量' },
        { value: 735, name: '压力' },
        { value: 580, name: '温度' },
        { value: 580, name: '腐蚀速率' },
        { value: 580, name: '介质流速' },
      ]
    }
  ]
};
const toDetail = () => {
  Taro.navigateTo({
    url: '/package/product/pages/detail/index'
  })
}
onMounted(() => {
  const canvasInstance = canvas.value;
  Taro.nextTick(() => {
    canvasInstance.refresh(option);
  });
});
usePageScroll((payload) => {
  const { scrollTop } = payload
  if(scrollTop >= 1) {
    showBg.value = true
  } else {
    showBg.value = false
  }
})
useShareAppMessage((res) => {
  return {
    title: '腐蚀检测系统',
  }
})
</script>
