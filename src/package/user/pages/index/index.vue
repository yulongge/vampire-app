<template>
  <view class="user-wrap">
    <nut-searchbar v-model="keyword">
      <template v-slot:rightout>
        <span>搜索</span>
        <span class="add-con" @click="toAddUser"><nut-icon name="plus" ></nut-icon></span>
      </template>
    </nut-searchbar>
    <div class="user-list">
      <nut-list :height="50" :listData="userlist" @scroll-bottom="handleScroll">
        <template v-slot="{ item, index }">
          <div class="list-item" @click="toUserInfo(item)">
            <nut-avatar
              size="80"
              icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png">
            </nut-avatar>
            <div class="userinfo">
              <p class="username">{{ item.username }}</p>
              <p class="phone-dept">电话：{{ item.phoneNum }}</p>
              <p class="phone-dept" v-if="item.departmentName">部门: {{ item.departmentName || '--' }}</p>
              <p class="remark" v-if="item.remark">备注：{{ item.remark }}</p>
            </div>
            <div class="option">
              <nut-icon name="edit" class="option-icon" size="22px"></nut-icon>
              <nut-icon name="del" class="option-icon" size="22px" @click.stop="removeUser(item)"></nut-icon>
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
import {
  allUsers,
  delUser,
} from '@/api/user/user.ts'
let count = ref(new Array(100).fill(0))
let userlist = ref([])
let keyword = ref('')
const handleScroll = () => {
  // let arr = new Array(100).fill(0);
  // const len = count.value.length;
  // count.value = count.value.concat(arr.map((item: number, index: number) => len + index + 1));
};
const toUserInfo = (user) => {
  redirect({
    url: `/package/mine/pages/userInfo/index?userId=${user.id}`
  })
}
const getUserList = async () => {
  const res = await allUsers({})
  console.log(res, 'res userlist 33')
  userlist.value = res
}
const toAddUser = () => {
  redirect({
    type: 'navigate',
    url: '/package/mine/pages/regist/index'
  })
}
const removeUser = async (user) => {
  await delUser({userId: user.id})
  getUserList()
}
onMounted(() => {
  const userInfo = getStorageSync('userInfo')
  if (!userInfo?.token) {
    redirect({
      type: 'relaunch',
      url: '/package/mine/pages/login/index'
    })
  }
  getUserList()
  count.value = count.value.map((item: number, index: number) => index + 1);
});
</script>