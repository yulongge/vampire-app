<template>
  <view class="login-wrap">
    <view class="login-tip">
      <view class="login-tip-title">账户登录</view>
      <view class="login-tip-desc">登录后可以查看设备信息，进行设备操控</view>
    </view>
    <view class="login-main">
      <nut-input
        label="手机号" 
        :placeholder="telPlaceholder" 
        v-model="tel" 
        type="tel" 
        class="login-input"
        :error="telError"
        :error-message="telErrorTip"
      />
      <!-- <nut-input 
        v-model="smsCode" 
        placeholder="请输入短信验证码"
        clearable 
        center
        class="login-input"
        :error="codeError"
      >
        <template #button>
          <nut-button size="small" type="info" @click="sendCode">发送验证码</nut-button>
        </template>
      </nut-input> -->
      <nut-input 
        label="密码" 
        placeholder="请输入密码" 
        v-model="password" 
        type="password"
        :error="pwdError"
      />
      <view class="regest">
        <a href="#" :style="{ color: '#1989fa' }">忘记密码</a>
        <!-- <nut-divider direction="vertical" />
        <a href="#" :style="{ color: '#1989fa' }" @click="toRegist">注册</a> -->
      </view>
      <nut-button block type="info" class="login-btn" size="large" @click="toLogin">登录</nut-button>
      
    </view>
    <view class="other-login">
      <nut-divider>如果您还没有账户，请注册</nut-divider>
      <!-- <button open-type="getPhoneNumber" @getphonenumber="getphonenumber" class="wechat-btn">
        <image src="https://yulongge.github.io/images/fushi/wechat.png" class="other-icon"></image>
      </button> -->
      <nut-button type="info" @click="toRegist">注册</nut-button>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useStore } from 'vuex'
import Taro from "@tarojs/taro";
import regUtil from "@/utils/regexp"
import { redirect } from '@/utils/redirect';
import "./index.scss";
const store = useStore()
let tel = ref('')
// let smsCode = ref('')
let password = ref('')
let telPlaceholder = ref('请输入手机号')
let telErrorTip = ref('')
let telError = ref(false)
let codeError = ref(false)
let pwdError = ref(false)
const toLogin = () => {
  if (!tel.value) {
    telError.value = true
    return
  }
  if (!regUtil.telReg.test(tel.value)) {
    telError.value = true
    telErrorTip.value = '请输入正确手机号'
    return
  }
  if (!password.value) {
    pwdError.value = true
    return
  }
  telError.value = false
  codeError.value = false
  store.dispatch('global/initConfig', {
    tel: tel.value,
    password: password.value
  }).then(res => {
    redirect({
      type: 'relaunch',
      url: '/pages/index/index'
    })
  })
}
const sendCode = () => {
  if (!tel.value) {
    telError.value = true
    return
  }
  if (!regUtil.telReg.test(tel.value)) {
    telError.value = true
    telErrorTip.value = '请输入正确手机号'
    return
  }
}
const getphonenumber = (detail) => {
  console.log(detail, 'detail')
  store.dispatch('global/initConfig', {
    tel: tel.value,
    password: password.value
  }).then(res => {
    redirect({
      type: 'relaunch',
      url: '/pages/index/index'
    })
  })
}
const toRegist = () => {
  redirect({
    type: 'navigate',
    url: '/package/mine/pages/regist/index'
  })
}
</script>