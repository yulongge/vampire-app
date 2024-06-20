<template>
  <view class="app">
    <!-- 自定义头部导航 -->
    <CustomNavBar :showBg="showBg" title="智能药剂加注系统"/>
    <!-- 头部内容 -->
    <view class="app-top">
      <view class="static-data">
        <nut-swiper
          :init-page="2"
          :auto-play="3000"
          pagination-visible
          pagination-color="#426543"
          pagination-unselected-color="#808080"
        >
          <nut-swiper-item v-for="(item, index) in list" :key="index" style="height: 150px">
            <img :src="item" alt="" style="height: 100%; width: 100%" draggable="false" />
          </nut-swiper-item>
        </nut-swiper>
      </view>
      <!-- 关注设备信息-饼状图 -->
      <view class="app-main-top">
        <map
          id="map"
          style="width: 100%; height: 300px;"
          :longitude="nowLocation.longitude"
          :latitude="nowLocation.latitude"
          scale="14"
          :markers="markers"
          :show-location="true"
          @regionchange="regionchange"
          @markertap="markertap"
        />
      </view>
    </view>
    <view class="app-main">
      <!-- <view class="equipment-list">
        <view class="equipment-title">关注设备</view>
        <view class="equipment-item" v-for="item in 5" :key="item" @tap="toDetail">
          <view class="equipment-info">
            <text class="name">设备{{ item }}</text>
            <text class="desc">压力：22，温度：50度,腐蚀效率：30%</text>
          </view>
          <nut-circleprogress :progress="item * 10" color="#1E90FF"> </nut-circleprogress>
        </view>
      </view> -->
      
    </view>
    
    <view class="line-canvas">
      <view class="equipment-title">加注数据分析</view>
      <EChart ref="canvas" />
    </view>
    <CustomTabBar />
  </view>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage, usePageScroll } from '@tarojs/taro'
import CustomNavBar from '../../components/custom-nav-bar/custom-nav-bar'
import CustomTabBar from '../../components/custom-tabbar/custom-tabbar'
import "./index.scss";
import * as echarts from "echarts4taro3/lib/assets/echarts"; // 这里用了内置的，也可以用自定义的 echarts.js
import { EChart, loadEcharts } from "echarts4taro3";
loadEcharts(echarts);
const canvas = ref(null);
let showBg = ref(false)
let showInit = ref(false)
let nowLocation = ref({})
const list = ref([
  'https://yulongge.github.io/images/fushi/banner1.jpeg',
  'https://yulongge.github.io/images/fushi/banner2.jpeg',
  'https://yulongge.github.io/images/fushi/banner3.jpeg',
  'https://yulongge.github.io/images/fushi/banner4.jpeg',
  'https://yulongge.github.io/images/fushi/banner5.jpeg'
])
const toDetail = () => {
  Taro.navigateTo({
    url: '/package/product/pages/detail/index'
  })
}
const markers = ref([])
const regionchange = (e) =>  {
  console.log(e.type)
}
const markertap = (e) => {
  console.log("markertap:", e.detail.markerId)
}
const initLocation = () => {
  Taro.getLocation({
    type: 'wgs84',
    success: function (res) {
      nowLocation.value = {
        ...res
      }
      markers.value.push({
        iconPath: "https://avatars2.githubusercontent.com/u/1782542?s=460&u=d20514a52100ed1f82282bcfca6f49052793c889&v=4",
        id: 0,
        latitude: res.latitude,
        longitude: res.longitude,
        width: 50,
        height: 50
      })
    }
  })
}
initLocation()
onMounted(() => {
  const echartComponentInstance = canvas.value;
  let base = +new Date(2024, 4, 5);
  let oneDay = 24 * 3600 * 1000;
  let valueBase = Math.random() * 300;
  let valueBase2 = Math.random() * 50;
  let data = [];
  let data2 = [];
  for (var i = 1; i < 10; i++) {
    var now = new Date((base += oneDay));
    var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');
    valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
    valueBase <= 0 && (valueBase = Math.random() * 300);
    data.push([dayStr, valueBase]);
    valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
    valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
    data2.push([dayStr, valueBase2]);
  }
  let option = {
    // title: {
    //   left: 'center',
    //   text: 'Tootip and dataZoom on Mobile Device'
    // },
    legend: {
      top: 'bottom',
      data: ['Intention']
    },
    tooltip: {
      triggerOn: 'none',
      position: function (pt) {
        return [pt[0], 130];
      }
    },
    // toolbox: {
    //   left: 'center',
    //   itemSize: 25,
    //   top: 55,
    //   feature: {
    //     dataZoom: {
    //       yAxisIndex: 'none'
    //     },
    //     restore: {}
    //   }
    // },
    xAxis: {
      type: 'time',
      axisPointer: {
        value: '2025-5-14',
        snap: true,
        lineStyle: {
          color: '#7581BD',
          width: 2
        },
        label: {
          show: true,
          formatter: function (params) {
            return echarts.format.formatTime('yyyy-MM-dd', params.value);
          },
          backgroundColor: '#7581BD'
        },
        handle: {
          show: false,
          color: '#7581BD'
        }
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisTick: {
        inside: true
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        inside: true,
        formatter: '{value}\n'
      },
      z: 10
    },
    grid: {
      top: 110,
      left: 15,
      right: 15,
      height: 160
    },
    dataZoom: [
      {
        type: 'inside',
        throttle: 50
      }
    ],
    series: [
      {
        name: '厚度',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        sampling: 'average',
        itemStyle: {
          color: '#0770FF'
        },
        stack: 'a',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(58,77,233,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(58,77,233,0.3)'
            }
          ])
        },
        data: data
      },
      {
        name: 'PH',
        type: 'line',
        smooth: true,
        stack: 'a',
        symbol: 'circle',
        symbolSize: 5,
        sampling: 'average',
        itemStyle: {
          color: '#F2597F'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(213,72,120,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(213,72,120,0.3)'
            }
          ])
        },
        data: data2
      }
    ]
  };
  Taro.nextTick(() => {
    echartComponentInstance.refresh(option);
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
    title: '检测系统',
  }
})
</script>
