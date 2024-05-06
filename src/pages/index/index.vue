<template>
  <view class="app">
    <!-- 自定义头部导航 -->
    <CustomNavBar :showBg="showBg" title="腐蚀监测分析平台"/>
    <!-- 头部内容 -->
    <view class="app-top">
      <view class="static-data">
        <!-- <nut-swiper
          :init-page="2"
          :auto-play="3000"
          pagination-visible
          pagination-color="#426543"
          pagination-unselected-color="#808080"
        >
          <nut-swiper-item v-for="(item, index) in list" :key="index" style="height: 150px">
            <img :src="item" alt="" style="height: 100%; width: 100%" draggable="false" />
          </nut-swiper-item>
        </nut-swiper> -->
      </view>
    </view>
    <view class="app-main">
      <view class="app-main-top">
        <!-- <EChart ref="canvas" /> -->
        <!-- 关注设备信息-饼状图 -->
      </view>
      <view class="equipment-list">
        <view class="equipment-item" v-for="item in 5" :key="item" @tap="toDetail">
          <!-- 常用设备 {{ item }} -->
        </view>
      </view>
    </view>
    <view class="app-bottom" v-if="showInit">
      <EChart ref="canvas2" />
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage, usePageScroll } from '@tarojs/taro'
import * as echarts from "echarts4taro3/lib/assets/echarts"; // 这里用了内置的，也可以用自定义的 echarts.js
import { EChart, loadEcharts } from "echarts4taro3";
import CustomNavBar from '../../components/custom-nav-bar/custom-nav-bar'

import "./index.scss";
loadEcharts(echarts);
let showBg = ref(false)
let showInit = ref(false)
const canvas = ref(null);
const canvas2 = ref(null)
const list = ref([
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
])
const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    show: false,
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '55%'],
      // adjust the start and end angle
      startAngle: 180,
      endAngle: 360,
      data: [
        { value: 1048, name: '腐蚀度' },
        { value: 735, name: '厚度' },
        { value: 580, name: '深度' },
      ]
    }
  ]
};
const option2 = {
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: {
    text: '设备状态图'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    show: false,
    data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [140, 232, 101, 264, 90, 340, 250]
    },
    {
      name: 'Line 2',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 282, 111, 234, 220, 340, 310]
    },
    {
      name: 'Line 3',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(55, 162, 255)'
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 132, 201, 334, 190, 130, 220]
    },
    {
      name: 'Line 4',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 0, 135)'
          },
          {
            offset: 1,
            color: 'rgb(135, 0, 157)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 402, 231, 134, 190, 230, 120]
    },
    {
      name: 'Line 5',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 191, 0)'
          },
          {
            offset: 1,
            color: 'rgb(224, 62, 76)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 302, 181, 234, 210, 290, 150]
    }
  ]
};
const toDetail = () => {
  Taro.navigateTo({
    url: '/package/line-area/pages/line-area/line-area'
  })
}

onMounted(() => {
  const canvasInstance = canvas.value;
  const canvasInstance2 = canvas2.value;
  Taro.nextTick(() => {
    // canvasInstance.refresh(option);
    // canvasInstance2.refresh(option2);
  });
});
usePageScroll((payload) => {
  const { scrollTop } = payload
  if(scrollTop >= 1) {
    showBg.value = true
  } else {
    showBg.value = false
  }
})
useShareAppMessage((res) => {
  return {
    title: '腐蚀检测系统',
  }
})
</script>
