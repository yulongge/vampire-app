<template>
  <view class="bar-chart">
    <EChart ref="canvas" canvas-id="line-canvas" />
  </view>
</template>
<script setup>
import Taro from "@tarojs/taro";
import "./line-basic.less";
import * as echarts from "echarts4taro3/lib/assets/echarts"; // 这里用了内置的，也可以用自定义的 echarts.js
import { EChart, loadEcharts } from "echarts4taro3";
import { onMounted, ref } from "vue";
loadEcharts(echarts);

const canvas = ref(null);
onMounted(() => {
  const canvasInstance = canvas.value;
  const defaultOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "line"
      }
    ]
  };

  Taro.nextTick(() => {
    console.log(canvasInstance, 'canvasInstance')
    canvasInstance.refresh(defaultOption);
  });
});
</script>
