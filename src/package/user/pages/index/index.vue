<template>
  <view class="user-wrap">
    <div class="user-list">
      <nut-list :height="50" :listData="count" @scroll-bottom="handleScroll">
        <template v-slot="{ item, index }">
          <div class="list-item">
            <nut-avatar
              size="80"
              icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png">
            </nut-avatar>
            <div class="userinfo">
              <p>张三李四</p>
              <p>电话：xxxxx   部门: xxxxx</p>
              <p>备注</p>
            </div>
            <div class="option">
              <nut-icon name="edit" class="option-icon" size="24px"></nut-icon>
              <nut-icon name="del" class="option-icon" size="24px"></nut-icon>
            </div>
          </div>
        </template>
      </nut-list>
    </div>
  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import Taro from "@tarojs/taro";
import "./index.scss";
import { redirect } from '@/utils/redirect';
import { getStorageSync } from '@/utils/storage'
let count = ref(new Array(100).fill(0))
const handleScroll = () => {
  let arr = new Array(100).fill(0);
  const len = count.value.length;
  count.value = count.value.concat(arr.map((item: number, index: number) => len + index + 1));
};
onMounted(() => {
  const userInfo = getStorageSync('userInfo')
  if (!userInfo?.token) {
    redirect({
      type: 'relaunch',
      url: '/package/mine/pages/login/index'
    })
  }
  count.value = count.value.map((item: number, index: number) => index + 1);
});
</script>