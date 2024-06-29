<template>
  <view class="product-wrap">
    <!-- <view class="filter">
      <nut-button type="info" @tap="toAnalysisData">数据分析</nut-button>
      <nut-button type="info" @tap="addMonitor">添加监测设备</nut-button>
    </view> -->
    <view class="filter">
      <nut-searchbar v-model="keyword">
        <template v-slot:rightout>
          <span @click="toSearchMonitor">搜索</span>
          <!-- <span class="add-con" @click="toAddUser"><nut-icon name="plus" ></nut-icon></span> -->
        </template>
      </nut-searchbar>
    </view>
    <view class="equipment-list">
      <view class="equipment-item" v-for="item in 20" :key="item" @tap="toDetail">
        <view class="equipment-info">
          <text class="name">监测设备{{ item }}</text>
          <view class="desc">探针编号：xxx  按照位置：xxx</view>
          <view class="desc">所属部门：xxx</view>
        </view>
        <nut-circleprogress :progress="item * 10" color="#fa2c19" stroke-width="6">
          <p class="progress-tip">腐蚀速率</p>
          <p class="progress-tip"> {{item * 10}} mm/y</p>
        </nut-circleprogress>
      </view>
    </view>
    <CustomTabBar />
    <nut-fixednav :position="{bottom:'280px' }" type="right" v-model:visible="showNav">
      <template v-slot:list>
        <ul class="nut-fixednav__list">
            <li class="nut-fixednav__list-item" @tap="toAnalysisData">数据分析</li>
            <li class="nut-fixednav__list-item" @tap="addMonitor">添加设备</li>
            <!-- <li class="nut-fixednav__list-item" @tap="toStatistics">统计报表</li> -->
        </ul>
      </template>
      <template v-slot:btn>
          <nut-icon name="retweet" color="#fff">
          </nut-icon>
          <span class="text">{{ showNav ? '操作设备' : '操作设备' }}</span>
      </template>
    </nut-fixednav>
  </view>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage, useDidShow } from '@tarojs/taro';
import CustomTabBar from '@/components/custom-tabbar/custom-tabbar'
import "./index.scss";
import { redirect } from '@/utils/redirect';
import { getStorageSync } from '@/utils/storage'
let keyword = ref('')
let showNav = ref(false)
const toDetail = () => {
  Taro.navigateTo({
    url: '/package/monitor/pages/monitorDetail/index'
  })
}
useShareAppMessage((res) => {
  return {
    title: '设备列表',
  }
})
const addMonitor = () => {
  Taro.navigateTo({
    url: '/package/monitor/pages/addMonitor/index'
  })
}
const toAnalysisData = () => {
  Taro.navigateTo({
    url: '/package/monitor/pages/analysicAll/index'
  })
}
const toSearchMonitor = () => {

}
useDidShow(() => {
  showNav.value = false
})
onMounted(() => {
  const userInfo = getStorageSync('userInfo')
  if (!userInfo?.id) {
    redirect({
      type: 'relaunch',
      url: '/package/mine/pages/login/index'
    })
  }
});
</script>