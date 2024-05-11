<template>
  <view class="product-option-wrap">
    <nut-form>
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
      <nut-form-item label="污水名称">
          <nut-textarea  placeholder="请输入污水名称" type="text" />
      </nut-form-item>
    </nut-form>
    <nut-cell>
      <nut-button size="small" style="margin-right: 10px">添加</nut-button>
      <nut-button size="small" style="margin-right: 10px" >删除</nut-button>
      <nut-button type="primary" style="margin-right: 10px" size="small" >提交</nut-button>
      <nut-button size="small" >重置提示状态</nut-button>
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