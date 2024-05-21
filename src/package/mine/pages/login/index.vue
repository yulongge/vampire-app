<template>
  <view class="login-wrap">
    <view class="login-tip">
      <view class="login-tip-title">手机快捷登录</view>
      <view class="login-tip-desc">未注册过的手机号，将自动创建账号</view>
    </view>
    <view class="login-main">
      <nut-input 
        :placeholder="telPlaceholder" 
        v-model="tel" 
        type="tel" 
        class="login-input"
        :error="telError"
        :error-message="telErrorTip"
      />
      <nut-input 
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
      </nut-input>
      <nut-button block type="info" class="login-btn" size="large" @click="toLogin">登录</nut-button>
    </view>
    <view class="other-login">
      <nut-divider>第三方登录</nut-divider>
      <image src="https://yulongge.github.io/images/fushi/wechat.png" class="other-icon"></image>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import regUtil from "@/utils/regexp"
import "./index.scss";
let tel = ref('')
let smsCode = ref('')
let telPlaceholder = ref('请输入手机号')
let telErrorTip = ref('')
let telError = ref(false)
let codeError = ref(false)
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
  if (!smsCode.value) {
    codeError.value = true
    return
  }
  telError.value = false
  codeError.value = false
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
</script>