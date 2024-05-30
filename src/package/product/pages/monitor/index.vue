<template>
  <view class="product-wrap">
    <view class="filter">
      <nut-button type="info" @tap="toAnalysisData">数据分析</nut-button>
      <nut-button type="info" @tap="addMonitor">添加监测设备</nut-button>
    </view>
    <view class="equipment-list">
      <view class="equipment-item" v-for="item in 20" :key="item" @tap="toDetail">
        <view class="equipment-info">
          <text class="name">监测设备{{ item }}</text>
          <view class="desc">探针编号：xxx  按照位置：xxx</view>
          <view class="desc">所属部门：xxx</view>
        </view>
        <nut-circleprogress :progress="item * 10" color="#fa2c19" stroke-width="6">
          <p class="progress-tip">腐蚀度</p>
          <p class="progress-tip"> {{item * 10}} %</p>
        </nut-circleprogress>
      </view>
    </view>
    <CustomTabBar />
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
const toDetail = () => {
  Taro.navigateTo({
    url: '/package/product/pages/monitorDetail/index'
  })
}
useShareAppMessage((res) => {
  return {
    title: '设备列表',
  }
})
const addMonitor = () => {
  Taro.navigateTo({
    url: '/package/product/pages/addMonitor/index'
  })
}
const toAnalysisData = () => {
  Taro.navigateTo({
    url: '/package/product/pages/analysicAll/index'
  })
}
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