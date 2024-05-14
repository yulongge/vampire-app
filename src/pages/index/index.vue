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
        <map
          id="map"
          style="width: 100%; height: 300px;"
          :longitude="nowLocation.longitude"
          :latitude="nowLocation.latitude"
          scale="14"
          :markers="markers"
          :show-location="true"
          @regionchange="regionchange"
          @markertap="markertap"
        />
      </view>
    </view>
    <view class="app-main">
      <view class="equipment-list">
        <view class="equipment-title">关注设备</view>
        <view class="equipment-item" v-for="item in 5" :key="item" @tap="toDetail">
          <!-- 常用设备 -->
          <view class="equipment-info">
            <text class="name">设备{{ item }}</text>
            <text class="desc">压力：22，温度：50度,腐蚀效率：30%</text>
          </view>
          <nut-circleprogress :progress="item * 10" color="#1E90FF"> </nut-circleprogress>
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
import CustomNavBar from '../../components/custom-nav-bar/custom-nav-bar'
import CustomTabBar from '../../components/custom-tabbar/custom-tabbar'
import "./index.scss";
let showBg = ref(false)
let showInit = ref(false)
let nowLocation = ref({})
const list = ref([
  'https://yulongge.github.io/images/fushi/banner1.jpeg',
  'https://yulongge.github.io/images/fushi/banner2.jpeg',
  'https://yulongge.github.io/images/fushi/banner3.jpeg',
  'https://yulongge.github.io/images/fushi/banner4.jpeg',
  'https://yulongge.github.io/images/fushi/banner5.jpeg'
])
const toDetail = () => {
  Taro.navigateTo({
    url: '/package/product/pages/detail/index'
  })
}
const markers = ref([])
// const polyline = [{
//   points: [{
//     longitude: 113.3245211,
//     latitude: 23.10229
//   }, {
//     longitude: 113.324520,
//     latitude: 23.21229
//   }],
//   color:"#FF0000DD",
//   width: 2,
//   dottedLine: true
// }]
const regionchange = (e) =>  {
  console.log(e.type)
}
const markertap = (e) => {
  console.log("markertap:", e.detail.markerId)
}
const initLocation = () => {
  Taro.getLocation({
    type: 'wgs84',
    success: function (res) {
      nowLocation.value = {
        ...res
      }
      markers.value.push({
        iconPath: "https://avatars2.githubusercontent.com/u/1782542?s=460&u=d20514a52100ed1f82282bcfca6f49052793c889&v=4",
        id: 0,
        latitude: res.latitude,
        longitude: res.longitude,
        width: 50,
        height: 50
      })
      // const latitude = res.latitude
      // const longitude = res.longitude
      // const speed = res.speed
      // const accuracy = res.accuracy
    }
  })
}
initLocation()
onMounted(() => {
  Taro.nextTick(() => {});
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
