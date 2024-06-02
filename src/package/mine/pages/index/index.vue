<template>
  <view class="mine-wrap">
    <view class="info-card">
      <nut-avatar
        size="100"
        icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png">
      </nut-avatar>
      <view class="nickname">{{userInfo.username}}</view>
      <view class="profile">{{userInfo.remark}}</view>
    </view>
    <view class="mine-item" @click="toUserInfo">
      <nut-icon name="people"></nut-icon>
      <view class="item-title">个人信息</view>
      <nut-icon name="rect-right"></nut-icon>
    </view>
    <view class="mine-item" @click="toUserPage">
      <nut-icon name="setting"></nut-icon>
      <view class="item-title">用户管理</view>
      <nut-icon name="rect-right"></nut-icon>
    </view>
    <view class="mine-item" @click="toDeptPage">
      <nut-icon name="setting"></nut-icon>
      <view class="item-title">部门管理</view>
      <nut-icon name="rect-right"></nut-icon>
    </view>
    <view class="mine-options">
      <view class="mine-options-title">通用</view>
      <!-- <view class="mine-options-item">
        <nut-icon name="service"></nut-icon>
        <view class="item-title">Customer</view>
        <nut-switch v-model="checked" />
      </view>
      <view class="mine-options-item">
        <nut-icon name="service"></nut-icon>
        <view class="item-title">Theme</view>
        <nut-switch v-model="checked" />
      </view> -->
    </view>
    <view class="mine-item" @click="logout">
      <nut-icon name="failure"></nut-icon>
      <view class="item-title">退出登录</view>
    </view>
    <CustomTabBar />
  </view>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import CustomTabBar from '../../../../components/custom-tabbar/custom-tabbar'
import "./index.scss";
import { redirect } from '@/utils/redirect';
import { getStorageSync } from '@/utils/storage'
import { useStore } from 'vuex'
let userInfo = ref({})
const store = useStore()
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
    url: `/package/user/pages/userInfo/index?userId=${userInfo.value.id}`
  })
}
const toUserPage = () => {
  redirect({
    type: 'navigate',
    url: '/package/user/pages/index/index'
  })
}
const toDeptPage = () => {
  redirect({
    type: 'navigate',
    url: '/package/dept/pages/index/index'
  })
}
const logout = () => {
  store.dispatch('global/logout', {})
  .then(res => {
    redirect({
      type: 'relaunch',
      url: '/pages/index/index'
    })
  })
}
onMounted(() => {
  userInfo.value = getStorageSync('userInfo') || {}
  if (!userInfo.value?.id) {
    redirect({
      type: 'relaunch',
      url: '/package/mine/pages/login/index'
    })
  }
});
</script>