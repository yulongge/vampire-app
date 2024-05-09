<template>
  <nut-tabbar :bottom="true" :safe-area-inset-bottom="true" active-color="#1E90FF" @tab-switch="tabSwitch">
    <nut-tabbar-item tab-title="首页" to="/pages/index/index" icon="home"></nut-tabbar-item>
    <nut-tabbar-item tab-title="设备" to="/pages/product/index" icon="category"></nut-tabbar-item>
    <nut-tabbar-item tab-title="我的" to="/pages/mine/index" icon="my"></nut-tabbar-item>
  </nut-tabbar>
</template>
<script lang="ts" setup>
import Taro from "@tarojs/taro";

const tabSwitch = (item, index) => {
  console.log(item, index, 'val')
  const tablist = [
    `/pages/index/index`,
    `/pages/product/index`,
    `/pages/mine/index`
  ]
  Taro.redirectTo({
    url: tablist[index]
  });
}
</script>