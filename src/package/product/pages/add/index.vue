<template>
  <view class="product-option-wrap">
    <nut-form>
      <nut-form-item label="设备名称">
          <input class="nut-input-text" placeholder="请输入设备名称" type="text" />
      </nut-form-item>
      <nut-form-item label="编号">
          <input class="nut-input-text" placeholder="请输入编号" type="text" />
      </nut-form-item>
    </nut-form>
    <nut-cell>
      <nut-button size="small" style="margin-right: 10px">添加</nut-button>
    </nut-cell>
  </view>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage } from '@tarojs/taro';
import "./index.scss";

onMounted(() => {
  Taro.nextTick(() => {
    
  });
})
</script>