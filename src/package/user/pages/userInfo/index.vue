<template>
  <view class="userinfo-wrap">
    <nut-form :model-value="userForm" ref="userFormRef" :rules="rules">
      <nut-form-item label="姓名" prop="xingming" >
        <input class="nut-input-text" placeholder="请输入姓名" type="text" v-model="userForm.chineseName" :disabled="!isEidt"/>
      </nut-form-item>
      <nut-form-item label="用户名" prop="username" >
        <input class="nut-input-text" placeholder="请输入用户名" type="text" v-model="userForm.username" :disabled="!isEidt"/>
      </nut-form-item>
      <nut-form-item label="密码" prop="password" >
        <input class="nut-input-text" placeholder="请输入密码" type="text" v-model="userForm.password" :disabled="!isEidt"/>
      </nut-form-item>
      <nut-form-item label="电话" prop="dianhua" >
        <input class="nut-input-text" placeholder="请输入电话" type="text" v-model="userForm.phoneNum" :disabled="!isEidt"/>
      </nut-form-item>
      <nut-form-item label="权限" prop="quanxian" >
        <nut-radiogroup direction="horizontal" class="nut-input-text" v-model="userForm.permission">
          <nut-radio label="1" :disabled="!isEidt">浏览</nut-radio>
          <nut-radio label="2" :disabled="!isEidt">操作</nut-radio>
          <nut-radio label="3" :disabled="!isEidt">系统管理员</nut-radio>
        </nut-radiogroup>
      </nut-form-item>
      <nut-form-item label="所属部门" prop="departmentId" >
        <input class="nut-input-text" placeholder="请选择门店" type="text" v-model="userForm.departmentName" :disabled="!isEidt" @click="showPickerDept"/>
        <nut-picker
          v-model="selectedValue"
          v-model:visible="showDept"
          :columns="columns"
          title="部门选择"
          @confirm="confirm"
        >
        </nut-picker>
      </nut-form-item>
      <nut-form-item label="备注" prop="beizhu" >
        <nut-textarea class="nut-input-text"  placeholder="请输入备注" type="text" v-model="userForm.remark" :disabled="!isEidt"/>
      </nut-form-item>
    </nut-form>
    <nut-cell v-if="isEidt">
      <nut-button block type="info" @click="updateInfo">修改</nut-button>
    </nut-cell>
  </view>
</template>
<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage, getCurrentInstance } from '@tarojs/taro';
import "./index.scss";
import {
  getUserInfo,
  updateUser,
} from '@/api/user/user.ts'
import { getStorageSync } from '@/utils/storage'
import {
  allDept,
} from '@/api/dept/dept.ts'
import { redirect } from '@/utils/redirect';

let memberId = ref('')
const userFormRef = ref<any>(null);
let showDept = ref(false)
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
const rules = {}
const getInfo = async (userId) => {
  const res = await getUserInfo({userId})
  userForm.value = res
}
const updateInfo = async () => {
  const res = await updateUser({
    ...userForm.value
  })
  redirect({
    type: 'goback',
  })
}
const selectedValue = ref([]);
const columns = ref([]);
const getDept = async () => {
  const res = await allDept({})
  columns.value = res.map(item => {
    let tempItem = {
      text: item.departmentName,
      value: item.id
    }
    return tempItem
  })
}
const showPickerDept = () => {
  getDept()
  selectedValue.value = [userForm.value.departmentId]
  showDept.value = true
}
const confirm = ( { selectedValue,selectedOptions })=>{
  userForm.value.departmentName = selectedOptions[0].text
  userForm.value.departmentId = selectedOptions[0].value
}
const change = ({ selectedValue,selectedOptions }) => {
  console.log(selectedValue);
};
const isEidt = computed(() => {
  const params = getCurrentInstance().router.params
  const { userId } = params
  const userInfo = getStorageSync('userInfo')
  memberId.value = userInfo.id
  return userId == userInfo.id || userInfo.permission == 3
})
onMounted(() => {
  const params = getCurrentInstance().router.params
  const { userId } = params
  const userInfo = getStorageSync('userInfo')
  memberId.value = userInfo.id
  getInfo(userId)
})
</script>