<template>
  <view class="user-wrap">
    <nut-searchbar v-model="keyword">
      <template v-slot:rightout>
        <span>搜索</span>
        <span class="add-con" @click="toAddUser"><nut-icon name="plus" ></nut-icon></span>
      </template>
    </nut-searchbar>
    <div class="dept-list">
    </div>
    <p v-if="!pageParam.hasMore" class="bottom-tip"> 到底啦 ~</p>
    <nut-dialog
      teleport="#app"
      title="删除用户提示"
      content="删除用户，用户将无法登录平台，确定要删除吗？"
      v-model:visible="delConfirmShow"
      :onOk="toDel"
    >
    </nut-dialog>
  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import Taro from "@tarojs/taro";
import "./index.scss";
import { redirect } from '@/utils/redirect';
import { getStorageSync } from '@/utils/storage'
import {
  allUsers,
  delUser,
  getUsers
} from '@/api/user/user.ts'
let userlist = ref([])
let keyword = ref('')
let delConfirmShow = ref(false)
let currentUser = ref({})
let pageParam = ref({
  pageNo: 0,
  pageSize: 10,
  hasMore: true
})
const toUserInfo = (user) => {
  redirect({
    url: `/package/user/pages/userInfo/index?userId=${user.id}`
  })
}
const getUserList = async () => {
  const res = await getUsers({
    ...pageParam.value
  })
  console.log(res, 'res userlist 33')
  if (res.length < pageParam.value.pageSize) {
    pageParam.value.hasMore = false
  }
  userlist.value = userlist.value.concat(res)
}
const handleScroll = () => {
  if (!pageParam.value.hasMore) return
  pageParam.value.pageNo = pageParam.value.pageNo + 1
  getUserList()
};
const toAddUser = () => {
  redirect({
    type: 'navigate',
    url: '/package/mine/pages/regist/index?type=add'
  })
}
const removeUser = async (user) => {
  delConfirmShow.value = true
  currentUser.value = user
}
const toDel = async () => {
  await delUser({userId: currentUser.value.id})
  getUserList()
}
onMounted(() => {
  const userInfo = getStorageSync('userInfo')
  if (!userInfo?.id) {
    redirect({
      type: 'relaunch',
      url: '/package/mine/pages/login/index'
    })
  }
  getUserList()
});
</script>