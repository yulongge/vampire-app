<template>
  <view class="plan-compare">
    <view class="planlist">
      <div
        class="plan-item"
        :class="{'plan-item-select': selectPlanList.includes(item)}"
        @click="selectPlan(item)"
        v-for="(item, index) in planlist" :key="index" >
        <span class="plan-name">加注计划 {{ index + 1 }}</span>
        <nut-icon name="Check" v-if="selectPlanList.includes(item)" color="blue"></nut-icon>
      </div>
    </view>
    <div class="filter-list">
      <nut-button block type="info" class="option-btn" @click="toAnalysis">分析</nut-button>
    </div>
    <div class="analysis-canvas" v-if="showAnanysic">
      <view class="equipment-title">加注计划1和加注计划3：腐蚀数据对比</view>
      <EChart ref="canvas" />
    </div>
  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, createVNode } from "vue";
import Taro from "@tarojs/taro";
import "./index.scss";
import * as echarts from "echarts4taro3/lib/assets/echarts"; // 这里用了内置的，也可以用自定义的 echarts.js
import { EChart, loadEcharts } from "echarts4taro3";
loadEcharts(echarts);
const canvas = ref(null);
let showAnanysic = ref(false)
const planlist = ref(4)
let selectPlanList = ref([])
const selectPlan = (item) => {
  if (selectPlanList.value.includes(item)) {
    let findIndex = selectPlanList.value.indexOf(item)
    selectPlanList.value.splice(findIndex, 1)
  } else {
    selectPlanList.value.push(item)
  }
}
const toAnalysis = () => {
  showAnanysic.value = true
  Taro.nextTick(() => {
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
          name: 'ph',
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
    echartComponentInstance.refresh(option);
  });
}
onMounted(() => {
  Taro.nextTick(() => {
    // echartComponentInstance.refresh(option);
  });
})
</script>