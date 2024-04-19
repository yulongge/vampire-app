<template>
  <view class="product-wrap">
    <view class="equipment-list">
      <view class="equipment-item" v-for="item in 10" :key="item" @tap="toDetail">
        设备 {{ item }}
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import "./index.less";
const toDetail = () => {
  Taro.navigateTo({
    url: '/package/line-area/pages/line-area/line-area'
  })
}
</script>