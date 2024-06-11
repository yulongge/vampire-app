<template>
  <view class="product-option-wrap">
    <nut-form>
      <nut-form-item label="计划名称">
        <input class="nut-input-text" placeholder="请输入计划名称" type="text" />
      </nut-form-item>
      <nut-form-item label="开始时间1">
        <input class="nut-input-text" placeholder="请输入开始时间1" type="text" />
      </nut-form-item>
      <nut-form-item label="结束时间1">
        <input class="nut-input-text" placeholder="请输入结束时间1" type="text" />
      </nut-form-item>
      <nut-form-item label="加注流量1">
        <input class="nut-input-text" placeholder="请输入加注流量1" type="text" />
      </nut-form-item>
      <nut-form-item label="开始时间2">
        <input class="nut-input-text" placeholder="请输入开始时间2" type="text" />
      </nut-form-item>
      <nut-form-item label="结束时间2">
        <input class="nut-input-text" placeholder="请输入结束时间2" type="text" />
      </nut-form-item>
      <nut-form-item label="加注流量2">
        <input class="nut-input-text" placeholder="请输入加注流量2" type="text" />
      </nut-form-item>
      <nut-form-item label="重复天数">
        <input class="nut-input-text" placeholder="请输入重复天数" type="text" />
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