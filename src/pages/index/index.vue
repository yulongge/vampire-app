<template>
  <view class="app">
    <view class="app-top"></view>
    <view class="equipment-list">
      <view class="equipment-item" v-for="item in 5" :key="item"></view>
    </view>
  </view>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue';
// import * as echarts from 'echarts';
import echarts from "./echarts";

export default {
  name: 'Index',
  components: {
    
  },
  setup(){
    const state = reactive({
      msg: '欢迎使用 Vampire App',
      msg2: '你成功了～',
      type: 'text',
      show: false,
      cover: false
    });
    onMounted(() => {
      
    })

    return {
      ...toRefs(state),
    }
  },
  mounted () {
    // this.initChart()
  },
}
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
