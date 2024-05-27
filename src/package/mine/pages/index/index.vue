<template>
  <view class="mine-wrap">
    <view class="info-card">
      <!-- <button v-if="!avatarUrl" open-type="chooseAvatar" @chooseavatar="getUserInfo" class="avatar">授权</button>
      <view v-else>
        <image :src="avatarUrl" class="avatar"></image>
        <input type="nickname" placeholder="请输入昵称"/>
      </view> -->
      <nut-avatar
        size="100"
        icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png">
      </nut-avatar>
      <view class="nickname">GYL</view>
      <view class="profile">苏家坨镇，镇长</view>
    </view>

    <view class="mine-item" @click="toUserInfo">
      <nut-icon name="people"></nut-icon>
      <view class="item-title">个人信息</view>
      <nut-icon name="rect-right"></nut-icon>
    </view>
    <view class="mine-item">
      <nut-icon name="setting"></nut-icon>
      <view class="item-title">部门设置</view>
      <nut-icon name="rect-right"></nut-icon>
    </view>
    <view class="mine-item" @click="toUsePage">
      <nut-icon name="setting"></nut-icon>
      <view class="item-title">用户管理</view>
      <nut-icon name="rect-right"></nut-icon>
    </view>
    <view class="mine-options">
      <view class="mine-options-title">通用</view>
      <view class="mine-options-item">
        <nut-icon name="service"></nut-icon>
        <view class="item-title">Customer</view>
        <nut-switch v-model="checked" />
      </view>
      <view class="mine-options-item">
        <nut-icon name="service"></nut-icon>
        <view class="item-title">Theme</view>
        <nut-switch v-model="checked" />
      </view>
    </view>

    
    <!-- <view class="info-msg">
      <view class="info-item">
        <text class="info-item-label">所属公司:</text>
        <text class="info-item-val">劳改所</text>
      </view>
      <view class="info-item">
        <text class="info-item-label">公司职位:</text>
        <text class="info-item-val">总经理</text>
      </view>
      <view class="info-item">
        <text class="info-item-label">地址:</text>
        <text class="info-item-val">苏家坨什么鬼地方</text>
      </view>
    </view> -->
    <CustomTabBar />
    <!-- <button class="echart-btn" @tap="toEchart">图形分析</button> -->
  </view>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import CustomTabBar from '../../../../components/custom-tabbar/custom-tabbar'
import "./index.scss";
import { redirect } from '@/utils/redirect';
import { getStorageSync } from '@/utils/storage'
let userInfo = ref(null)
let avatarUrl = ref('')
let checked = ref(false)
const getUserInfo = (e) => {
  console.log(e)
  avatarUrl.value = e.detail.avatarUrl
  // userInfo.value = e.detail.userInfo
}
const toEchart = () => {
  console.log('comgin...')
  Taro.navigateTo({
    url: '/pages/echart/index',
  })
}
const toUserInfo = () => {
  redirect({
    type: 'navigate',
    url: '/package/mine/pages/userInfo/index'
  })
}
const toUsePage = () => {
  redirect({
    type: 'navigate',
    url: '/package/user/pages/index/index'
  })
}
onMounted(() => {
  const userInfo = getStorageSync('userInfo')
  if (!userInfo?.token) {
    redirect({
      type: 'relaunch',
      url: '/package/mine/pages/login/index'
    })
  }
});
</script>