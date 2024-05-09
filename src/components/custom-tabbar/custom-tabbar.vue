<template>
  <nut-tabbar v-model:visible="currnetIndex" :bottom="true" :safe-area-inset-bottom="true" active-color="#1E90FF" @tab-switch="tabSwitch">
    <nut-tabbar-item tab-title="首页" to="/pages/index/index" icon="home"></nut-tabbar-item>
    <nut-tabbar-item tab-title="设备" to="/pages/product/index" icon="category"></nut-tabbar-item>
    <nut-tabbar-item tab-title="我的" to="/pages/mine/index" icon="my"></nut-tabbar-item>
  </nut-tabbar>
</template>
<script lang="ts" setup>
import Taro from "@tarojs/taro";
import { ref, onMounted } from "vue";

const tablist = [
  `/pages/index/index`,
  `/package/product/pages/index/index`,
  `/pages/mine/index`
]
let currnetIndex = ref(0)
const currentPage =  Taro.getCurrentInstance().router?.path || ''
console.log(currentPage, 'currentPage')
onMounted(() => {
  currnetIndex.value = tablist.indexOf(currentPage)
})
const tabSwitch = (item, index) => {
  console.log(item, index, 'val')
  Taro.redirectTo({
    url: tablist[index]
  });
}
</script>