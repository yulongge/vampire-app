<template>
  <view class="monitor-detail-analytis">
    <nut-cell
      :showIcon="true"
      title="选择日期区间"
      :desc="date ? `${date[0]}至${date[1]}` : '请选择'"
      @click="openSwitch('isVisible')"
    >
    </nut-cell>
    <nut-calendar
      v-model:visible="isVisible"
      :default-value="date"
      type="range"
      :start-date="`2019-12-22`"
      :end-date="moment().format('YYYY-MM-DD')"
      @close="closeSwitch('isVisible')"
      @choose="setChooseValue"
      @select="select"
    >
    </nut-calendar>
    <div class="filter-list">
      <div class="filter-list-container">
        <nut-radiogroup v-model="radioVal">
          <nut-radio label="1">全选</nut-radio>
        </nut-radiogroup>
        <nut-checkboxgroup v-model="checkedFilter" ref="group" @change="changeFilter" class="filter-list-con">
          <nut-checkbox v-for="item in filterItems" :key="item.label" :label="item.label" class="filter-list-item" @change="changeFilterItem">{{item.value}} </nut-checkbox>
        </nut-checkboxgroup>
      </div>
      <nut-button block type="info" class="option-btn" @click="toAnalysis">分析</nut-button>
    </div>
    <div class="analysis-canvas" v-if="showAnanysic">
      <EChart ref="canvas" />
    </div>
  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, createVNode } from "vue";
import Taro from "@tarojs/taro";
import moment from 'moment';
import "./index.scss";
import * as echarts from "echarts4taro3/lib/assets/echarts"; // 这里用了内置的，也可以用自定义的 echarts.js
import { EChart, loadEcharts } from "echarts4taro3";
loadEcharts(echarts);
const canvas = ref(null);
const date = ref([moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')])
let isVisible = ref(false)
const radioVal = ref('0');
let checkedFilter = ref(['1', '2', '3'])
let showAnanysic = ref(false)
let filterItems = ref([
  {label: '1', value: '效率'},
  {label: '2', value: 'ph值'},
  {label: '3', value: '厚度'},
])
const openSwitch = param => {
  isVisible.value = true;
};
const closeSwitch = param => {
  isVisible.value = false;
};
const setChooseValue= param => {
  date.value = [...[param[0][3], param[1][3]]];
};
const select = (param: string) => {
  console.log(param);
};
const group = ref(null);
const changeFilter = (label: any[]) => {
  console.log(label, 'label')
  checkedFilter.value = label
};
const changeFilterItem = (state, label) => {
  console.log(state, label, 'changeFilterItem')
}
const toggleAll = (f: boolean) => {
  (group.value as any).toggleAll(f);
};
const toggleReverse = () => {
  group.value.toggleReverse();
};
const toAnalysis = () => {
  console.log('ananlysis')
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
            show: true,
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