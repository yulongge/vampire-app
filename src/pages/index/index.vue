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
loadEcharts(echarts);
const canvas = ref(null);
const options = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
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
      type: "bar"
    }
  ]
};
onMounted(() => {
  const echartComponentInstance = canvas.value; // 组件实例
  Taro.nextTick(() => {
    // 初始化图表
    echartComponentInstance.refresh(options).then((myChart) => {
      /** 异步更新图表数据 */
      setInterval(() => {
        let firstValue = options.series[0].data.shift();
        options.series[0].data.push(firstValue);
        myChart.setOption(options); // myChart 即为 echarts 实例，可使用的实例方法，具体可参考 echarts 官网
      }, 2000);
    });
  });
});
</script>

<style lang="scss">
.app {
  padding: 200rpx 32rpx 0rpx 32rpx;
  box-sizing: border-box;
  min-height: 100vh;
  // background-color: #efefef;
  // background-image: linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%);
  // background-image: linear-gradient(-225deg, #B7F8DB 0%, #50A7C2 100%);
  // background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
  // background-image: linear-gradient(to top, #88d3ce 0%, #6e45e2 100%);
  // background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
  background-image: linear-gradient(to top, #72afd3 0%, #37ecba 100%);
  .app-top {
    width: 100%;
    height: 320rpx;
    border: 4rpx solid #fff;
    border-radius: 10rpx;
  }
  .equipment-list {
    width: 100%;
    // height: 320rpx;
    border: 4rpx solid #fff;
    border-radius: 10rpx;
    margin-top: 40rpx;
    min-height: 100rpx;
    padding: 20rpx;
    box-sizing: border-box;
    .equipment-item {
      background-color: #fff;
      height: 100rpx;
      margin-bottom: 20rpx;
      border-radius: 10rpx;
    }
    .equipment-item:last-child {
      margin-bottom: unset;
    }
  }
}
</style>
