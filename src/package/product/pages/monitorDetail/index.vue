<template>
  <view class="monitor-detail-wrap">
    <nut-cell-group title="设备信息">
      <nut-cell title="探针名称" desc="设备1"></nut-cell>
      <nut-cell title="探针位置" desc="xxx"></nut-cell>
      <nut-cell title="探针剩余厚度：" desc="30"></nut-cell>
      <nut-cell title="腐蚀效率：" desc="20%"></nut-cell>
      <nut-cell title="累计腐蚀效率：" desc="30%"></nut-cell>
    </nut-cell-group>
    <view class="options">
      <nut-button type="default" class="option-btn" @tap="delMonitor">删除</nut-button>
      <nut-button type="info" class="option-btn" @tap="editMonitor">修改</nut-button>
    </view>
    <nut-dialog
      teleport="#app"
      title="是否删除"
      content="设备如果删除，数据将会清空，确定要删除吗？"
      v-model:visible="delConfirmShow"
    >
    </nut-dialog>
  </view>
</template>
<script setup>
import { ref, onMounted, reactive, createVNode } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage } from '@tarojs/taro';
import { Dialog } from '@nutui/nutui-taro';
import "./index.scss";
let delConfirmShow = ref(false)
useShareAppMessage((res) => {
  return {
    title: '设备详情',
  }
})
const delMonitor = () => {
  delConfirmShow.value = true
}
const editMonitor = () => {

}
onMounted(() => {
  Taro.nextTick(() => {});
})
</script>