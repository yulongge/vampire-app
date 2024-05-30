<template>
  <view class="userinfo-wrap">
    <nut-form :model-value="userForm" ref="userFormRef" :rules="rules">
      <nut-form-item label="姓名" prop="xingming" >
        <input class="nut-input-text" placeholder="请输入姓名" type="text" v-model="userForm.chineseName" :disabled="userForm.id != memberId"/>
      </nut-form-item>
      <nut-form-item label="用户名" prop="username" >
        <input class="nut-input-text" placeholder="请输入用户名" type="text" v-model="userForm.username" :disabled="userForm.id != memberId"/>
      </nut-form-item>
      <nut-form-item label="密码" prop="password" >
        <input class="nut-input-text" placeholder="请输入密码" type="text" v-model="userForm.password" :disabled="userForm.id != memberId"/>
      </nut-form-item>
      <nut-form-item label="电话" prop="dianhua" >
        <input class="nut-input-text" placeholder="请输入电话" type="text" v-model="userForm.phoneNum" :disabled="userForm.id != memberId"/>
      </nut-form-item>
      <nut-form-item label="权限" prop="quanxian" >
        <!-- <input class="nut-input-text" placeholder="请输入权限" type="text" /> -->
        <nut-radiogroup direction="horizontal" class="nut-input-text" v-model="userForm.permission">
          <nut-radio label="1" :disabled="userForm.id != memberId">浏览</nut-radio>
          <nut-radio label="2" :disabled="userForm.id != memberId">操作</nut-radio>
          <nut-radio label="3" :disabled="userForm.id != memberId">系统管理员</nut-radio>
        </nut-radiogroup>
      </nut-form-item>
      <nut-form-item label="所属部门" prop="bumen" >
        <input class="nut-input-text" placeholder="请输入编号" type="text" v-model="userForm.departmentId" :disabled="userForm.id != memberId"/>
      </nut-form-item>
      <nut-form-item label="备注" prop="beizhu" >
        <nut-textarea class="nut-input-text"  placeholder="请输入备注" type="text" v-model="userForm.remark" :disabled="userForm.id != memberId"/>
      </nut-form-item>
    </nut-form>
    <nut-cell v-if="userForm.id == memberId">
      <!-- <nut-button size="small" style="margin-right: 10px">修改</nut-button> -->
      <nut-button block type="info" @click="updateInfo">修改</nut-button>
    </nut-cell>
  </view>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage, getCurrentInstance } from '@tarojs/taro';
import "./index.scss";
import {
  getUserInfo,
  updateUser,
} from '@/api/user/user.ts'
import { getStorageSync } from '@/utils/storage'
let memberId = ref('')
const userFormRef = ref<any>(null);
let userForm = ref({
  username: '',
  password: '',
  chineseName: '',
  phoneNum: '',
  departmentId: '',
  departmentName: '',
  permission: '',
  remark: ''
});
const rules = {
  "xingming": [
    { required: true, message: '请填写姓名' }
  ]
}
const getInfo = async (userId) => {
  const res = await getUserInfo({userId})
  userForm.value = res
}
const updateInfo = async () => {
  const res = await updateUser({
    ...userForm.value
  })
  console.log(res, 'updateInfo')
}
onMounted(() => {
  const params = getCurrentInstance().router.params
  const { userId } = params
  const userInfo = getStorageSync('userInfo')
  memberId.value = userInfo.id
  getInfo(userId)
})
</script>