<template>
  <view class="plan-wrap">
    <view class="plan-list">
      <view class="plan-item" v-for="item in planlist" :key="item.id">
        <view class="item-lf">
          <view class="item-title">加注计划{{ item }}</view>
          <view class="item-info">
            <text>加注编号: {{ item }}</text>
            <text>重复天数: {{ item }}</text>
          </view>
        </view>
        <div class="option">
          <nut-icon name="edit" class="option-icon" size="22px" @click.stop="editPlan(item)"></nut-icon>
          <nut-icon name="del" class="option-icon" size="22px" @click.stop="removePlan(item)"></nut-icon>
        </div>
      </view>
    </view>
    <view class="option-footer" @click.stop="addPlan">
      添加计划
    </view>
    <nut-dialog
      teleport="#app"
      title="删除模版提示"
      content="确定要删除加注模版吗？"
      v-model:visible="delConfirmShow"
      :onOk="toDel"
    >
    </nut-dialog>
  </view>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage } from '@tarojs/taro';
import "./index.scss";
import { redirect } from '@/utils/redirect';
import { getStorageSync } from '@/utils/storage'
let planlist = ref(4)
let delConfirmShow = ref(false)
let currentTemp = ref({})
const editPlan = () => {
  redirect({
    url: '/package/product/pages/addPlanTemp/index'
  })
}
const addPlan = () => {
  redirect({
    url: '/package/product/pages/addPlanTemp/index'
  })
}
const removePlan = (item) => {
  delConfirmShow.value = true
  currentTemp.value = item
}
const toDel = async () => {
  // await delUser({userId: currentUser.value.id})
  // getUserList()
}
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