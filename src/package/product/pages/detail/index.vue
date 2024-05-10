<template>
  <view class="product-detail-wrap">
    <view class="line-canvas">
      <EChart ref="canvas" canvas-id="line-canvas" />
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage } from '@tarojs/taro';
import "./index.scss";
import * as echarts from "echarts4taro3/lib/assets/echarts"; // 这里用了内置的，也可以用自定义的 echarts.js
import { EChart, loadEcharts } from "echarts4taro3";
loadEcharts(echarts);
const canvas = ref(null);
onMounted(() => {
  const echartComponentInstance = canvas.value;
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        areaStyle: {}
      }
    ]
  };
  Taro.nextTick(() => {
    echartComponentInstance.refresh(option);
  });
})
useShareAppMessage((res) => {
  return {
    title: '设备详情',
  }
})
</script>