<template>
  <view class="app">
    <view class="app-top">
      <EChart ref="canvas" />
    </view>
    <view class="equipment-list">
      <view class="equipment-item" v-for="item in 5" :key="item"></view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import * as echarts from "echarts4taro3/lib/assets/echarts"; // 这里用了内置的，也可以用自定义的 echarts.js
import { EChart, loadEcharts } from "echarts4taro3";
import "./index.less";
loadEcharts(echarts);
const canvas = ref(null);
const option = {
  tooltip: {
    trigger: "item"
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['A', 'B', 'C',]
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center"
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "40",
          fontWeight: "bold"
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: "厚度" },
        { value: 735, name: "腐蚀度" },
        { value: 580, name: "其他" },
      ]
    }
  ]
};

onMounted(() => {
  const canvasInstance = canvas.value;
  Taro.nextTick(() => {
    canvasInstance.refresh(option);
  });
});
</script>
