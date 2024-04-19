<template>
  <view class="mine-wrap">
    <view class="info-card">
      <button v-if="!avatarUrl" open-type="chooseAvatar" @chooseavatar="getUserInfo" class="avatar">授权</button>
      <view v-else>
        <image :src="avatarUrl" class="avatar"></image>
        <input type="nickname" placeholder="请输入昵称"/>
      </view>
    </view>
    <view class="info-msg">
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
    </view>

    <button class="echart-btn" @tap="toEchart">图形分析</button>
  </view>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import "./index.less";
let userInfo = ref(null)
let avatarUrl = ref('')
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
</script>