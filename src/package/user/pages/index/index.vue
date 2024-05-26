<template>
  <div class="demo">
    333
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage } from '@tarojs/taro';
import CustomTabBar from '../../../../components/custom-tabbar/custom-tabbar'
import "./index.scss";
import { redirect } from '@/utils/redirect';
import { getStorageSync } from '@/utils/storage'

onMounted(() => {
  const userInfo = getStorageSync('userInfo')
  if (!userInfo?.token) {
    redirect({
      type: 'relaunch',
      url: '/package/mine/pages/login/index'
    })
    return
  }
});
</script>