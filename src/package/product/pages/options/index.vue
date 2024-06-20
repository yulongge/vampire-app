<template>
  <view class="product-option-wrap">
    <nut-form>
      <nut-form-item label="开关">
        <nut-switch v-model="checked" active-text="开" inactive-text="关" size="40px" />
      </nut-form-item>
      <nut-form-item label="加注流量">
        <input class="nut-input-text" placeholder="请输入加注流量" type="text" />
      </nut-form-item>
      <nut-form-item label="药剂温度">
        <input class="nut-input-text" placeholder="请输入药剂温度" type="text" />
      </nut-form-item>
      <nut-form-item label="药剂液位">
        <input class="nut-input-text" placeholder="请输入药剂液位" type="text" />
      </nut-form-item>
      <nut-form-item label="药剂名称">
        <input class="nut-input-text" placeholder="请输入药剂名称" type="text" />
      </nut-form-item>
      <nut-form-item label="药剂加热">
        <input class="nut-input-text" placeholder="请输入药剂加热" type="text" />
      </nut-form-item>
      <nut-form-item label="更换药剂">
        <input class="nut-input-text" placeholder="请输入药剂" type="text" />
      </nut-form-item>
      <nut-form-item label="执行计划">
        <nut-switch v-model="checked" active-text="开" inactive-text="关" size="40px" />
      </nut-form-item>
    </nut-form>
    <nut-cell>
      <nut-button size="large" type="info">提交</nut-button>
      <!-- <nut-button size="small" style="margin-right: 10px" >删除</nut-button> -->
      <!-- <nut-button type="primary" style="margin-right: 10px" size="small" >提交</nut-button> -->
      <!-- <nut-button size="small" >重置提示状态</nut-button> -->
    </nut-cell>
  </view>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage } from '@tarojs/taro';
import "./index.scss";
let checked = ref(false)
onMounted(() => {
  Taro.nextTick(() => {
    
  });
})
</script>