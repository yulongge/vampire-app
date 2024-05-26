<template>
  <view class="monitor-detail-analytis">
    数据汇总
  </view>
</template>
<script setup>
import { ref, onMounted, reactive, createVNode } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage } from '@tarojs/taro';
import { Dialog } from '@nutui/nutui-taro';
import "./index.scss";
onMounted(() => {
  Taro.nextTick(() => {});
})
</script>