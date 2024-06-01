<template>
  <view class="dept-wrap">
    <div class="dept-content">
      <div class="dept-list" v-if="deptlist.length">
        <div v-for="item in deptlist" :key="item.id" class="dept-item">
          <div class="dept-name">
            <nut-icon name="triangle-down" v-if="item.children"></nut-icon>
            <span class="dept-name-value">{{ item.departmentName }}</span>
            <p class="options">
              <nut-icon name="edit" @click="editDept(item)"></nut-icon>
              <nut-icon name="plus" @click="addDept(item)"></nut-icon>
              <nut-icon name="del" @click="showDelConfirm(item)"></nut-icon>
            </p>
          </div>
          <div class="dept-sub-list" v-if="item.children">
            <div class="dept-sub-item" v-for="sub1 in item.children" :key="sub1.id">
              <div class="dept-sub-name">
                <nut-icon name="rect-right" v-if="sub1.children"></nut-icon>
                <span class="dept-sub-name-value">{{ sub1.departmentName }}</span>
                <p class="options">
                  <nut-icon name="edit" @click="editDept(sub1)"></nut-icon>
                  <!-- <nut-icon name="plus" @click="addDept(sub1)"></nut-icon> -->
                  <nut-icon name="del" @click="showDelConfirm(sub1)"></nut-icon>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nut-empty image="empty" description="暂无部门数据" v-else></nut-empty>
      <nut-button type="info" block @click="addDept" class="add-btn">添加部门</nut-button>
    </div>
    <nut-dialog
      teleport="#app"
      title="删除部门提示"
      content="删除部门，确定要删除吗？"
      v-model:visible="delConfirmShow"
      :onOk="toDel"
    >
    </nut-dialog>
  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import Taro from "@tarojs/taro";
import {
  useDidShow
} from "@tarojs/taro";
import "./index.scss";
import { redirect } from '@/utils/redirect';
import { getStorageSync } from '@/utils/storage'
import {
  allDept,
  delDept
} from '@/api/dept/dept.ts'
let deptlist = ref([])
let showNav = ref(true)
let delConfirmShow = ref(false)
let currentDept = ref({})
const computeDepts = (data) => {
  let tempData = Object.assign([], data)
  tempData = tempData.filter(item => !item.superiorsId).map(item => {
    const children = data.filter(tempItem => tempItem.superiorsId == item.id)
    item.children = children.length ? children : null
    return item
  })
  deptlist.value = tempData
}
const getDept = async () => {
  const res = await allDept({})
  computeDepts(res)
}
const showDelConfirm = (item) => {
  delConfirmShow.value = true
  currentDept.value = item
}
const toDel = async () => {
  const res = await delDept([currentDept.value.id])
  console.log(res, 'res')
  getDept()
}
const addDept = (item) => {
  redirect({
    type: 'navigate',
    url: `/package/dept/pages/addDept/index?superiorsId=${item.id}&superiorsName=${item.departmentName}`
  })
}
const editDept = () => {
  Taro.showToast({
    title: '待开发',
    icon: "none"
  })
}
useDidShow(() => {
  getDept()
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