<template>
  <view class="product-wrap">
    <view class="filter">
      <nut-menu>
        <nut-menu-item v-model="state.value1" :options="state.options1" />
        <nut-menu-item v-model="state.value2" @change="handleChange" :options="state.options2" />
        <nut-menu-item v-model="state.value3" @change="handleChange" :options="state.options3" />
      </nut-menu>
    </view>
    <view class="equipment-list">
      <view class="equipment-item" v-for="item in 20" :key="item" @tap="toDetail">
        <view class="equipment-info">
          <text class="name">加注设备{{ item }}</text>
          <text class="desc">压力：22，温度：50度,腐蚀效率：30%</text>
        </view>
        <nut-switch v-model="checked" active-text="开" inactive-text="关" v-if="item > 3" size="40px" @change="changeSwitch"/>
        <nut-switch v-model="noChecked" active-text="开" inactive-text="关" v-else size="40px" @change="changeSwitch"/>
        <!-- <nut-circleprogress :progress="item * 10" color="#1E90FF"> </nut-circleprogress> -->
      </view>
    </view>
    <CustomTabBar />
    <!-- <view class="add-btn" @tap="addProduct">
      <nut-icon name="uploader" color="#1E90FF" size="40px"></nut-icon>
    </view> -->
    <nut-fixednav :position="{bottom:'280px' }" type="right" v-model:visible="showNav">
      <template v-slot:list>
        <!-- <view class="option-list">
          <view class="option-item">添加设备</view>
          <view class="option-item">加注模版</view>
          <view class="option-item">远程操控</view>
        </view> -->
        <ul class="nut-fixednav__list">
            <li class="nut-fixednav__list-item">添加设备</li>
            <li class="nut-fixednav__list-item">加注模版</li>
            <li class="nut-fixednav__list-item">远程操控</li>
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
import { useShareAppMessage } from '@tarojs/taro';
import CustomTabBar from '../../../../components/custom-tabbar/custom-tabbar'
import "./index.scss";
const state = reactive({
  options1: [
    { text: '全部设备', value: 0 },
    { text: '正常设备', value: 1 },
    { text: '废弃设备', value: 2 }
  ],
  options2: [
    { text: '各项指标', value: 0 },
    { text: '流速', value: 1 },
    { text: '温度', value: 3 },
    { text: '腐蚀度', value: 4 },
    { text: '压力', value: 5 }
  ],
  options3: [
    { text: '默认排序', value: 'a' },
    { text: '腐蚀度', value: 'b' },
    { text: '厚度', value: 'c' },
  ],
  value1: 0,
  value2: 0,
  value3: 'a'
})
let checked = ref(false)
let noChecked = ref(true)
let showNav = ref(false)
const navList = ref()
const toDetail = () => {
  Taro.navigateTo({
    url: '/package/product/pages/detail/index'
  })
}
useShareAppMessage((res) => {
  return {
    title: '设备列表',
  }
})
const addProduct = () => {
  Taro.navigateTo({
    url: '/package/product/pages/add/index'
  })
}
const changeSwitch = (val, e) => {
  e.stopPropagation()
}
onMounted(() => {
  
});
</script>