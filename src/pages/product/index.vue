<template>
  <view class="product-wrap">
    <view class="equipment-list">
      <view class="equipment-item" v-for="item in 10" :key="item"></view>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import "./index.less";

</script>