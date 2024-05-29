<template>
  <view class="login-wrap">
    <view class="login-tip">
      <view class="login-tip-title">账户注册</view>
      <view class="login-tip-desc">注册登录后可以查看设备信息，进行设备操控</view>
    </view>
    <view class="login-main">
      <nut-form
        :model-value="formData"
        :rules="rules"
        ref="ruleForm">
          <nut-form-item label="姓名" prop="username" required>
            <input class="nut-input-text"
              @blur="customBlurValidate('username')"
              v-model="formData.username"
              placeholder="请输入姓名"
              type="text" />
          </nut-form-item>
          <nut-form-item label="联系电话" prop="phoneNum" required>
            <input class="nut-input-text" v-model="formData.phoneNum" placeholder="请输入联系电话" type="text" />
          </nut-form-item>
          <nut-form-item label="密码" prop="password" required>
            <input class="nut-input-text" v-model="formData.password" placeholder="请输入密码" type="text" />
          </nut-form-item>
          <nut-form-item label="部门" prop="departmentId" required>
            <input class="nut-input-text"
              v-model="formData.departmentId"
              placeholder="请输入部门"
              type="text" />
          </nut-form-item>
          <nut-form-item label="角色" required>
            <nut-radiogroup direction="horizontal" v-model="formData.permission">
                <nut-radio :label="1">普通员工</nut-radio>
                <nut-radio :label="2">部门经理</nut-radio>
                <nut-radio :label="3">管理员</nut-radio>
            </nut-radiogroup>
          </nut-form-item>
          <nut-form-item label=" 备注" prop="remark" >
            <nut-textarea v-model="formData.remark" class="nut-input-text"  placeholder="请输入备注" rows="2"/>
          </nut-form-item>
      </nut-form>
      <nut-button block type="info" class="login-btn" size="large" @click="submit">注册</nut-button>
      <nut-button block type="default" class="login-btn reset-btn" size="large" @click="reset">重置</nut-button>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { useStore } from 'vuex'
import Taro from "@tarojs/taro";
import regUtil from "@/utils/regexp"
import { redirect } from '@/utils/redirect';
import "./index.scss";
import { Toast } from '@nutui/nutui-taro';
import {
  addUser
} from '@/api/user/user.ts'
const store = useStore()
const ruleForm = ref<any>(null);
let formData = ref({
  username: '',
  password: '',
  phoneNum: '',
  departmentId: '',
  departmentName: '',
  remark: '',
  permission: 1,
})
const validate = (item: any) => {
    console.log(item);
};
// 失去焦点校验
const customBlurValidate = (prop: string) => {
  ruleForm.value.validate(prop).then(({ valid, errors }: any) => {
    if (valid) {
      console.log('success', formData);
    } else {
      console.log('error submit!!', errors);
    }
  });
};
const submit = () => {
  ruleForm.value.validate().then(async ({ valid, errors }: any) => {
    if (valid) {
      console.log('success', formData);
      const params = {
        ...formData.value,
        chineseName: formData.value.username,
        departmentName: '测试部门'
      }
      const res = await addUser(params)
      console.log(res, 'submit add user')
      // Toast.success('注册成功!');
    } else {
      console.log('error submit!!', errors);
    }
  });
};
const reset = () => {
  formData.value = {
    username: '',
    password: '',
    phoneNum: '',
    departmentId: '',
    departmentName: '',
    remark: '',
    permission: 1,
  }
  ruleForm.value.reset();
};
// 函数校验
const telValidator = (val: string) => regUtil.telReg.test(val);
const nameLengthValidator = (val: string) => val?.length >= 2;
const rules = {
  username: [
    { required: true, message: '请填写姓名' },
    { message: 'name 至少两个字符', validator: nameLengthValidator }
  ],
  phoneNum: [
    { required: true, message: '请填写联系电话' },
    { validator: telValidator, message: '电话格式不正确' }
  ],
  password: [
    { required: true, message: '请填写密码' }
  ],
  departmentId: [
    { required: true, message: '请选择部门' }
  ]
}
const toRegist = () => {
  redirect({
    type: 'navigate',
    url: '/package/mine/pages/userInfo/index'
  })
}
</script>