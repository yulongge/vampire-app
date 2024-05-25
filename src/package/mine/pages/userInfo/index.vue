<template>
  <view class="userinfo-wrap">
    <nut-form :model-value="userForm" ref="userFormRef" :rules="rules">
      <nut-form-item label="姓名" prop="xingming" >
        <input class="nut-input-text" placeholder="请输入姓名" type="text" v-model="userForm.xingming"/>
      </nut-form-item>
      <nut-form-item label="用户名" prop="username" >
        <input class="nut-input-text" placeholder="请输入用户名" type="text" />
      </nut-form-item>
      <nut-form-item label="密码" prop="password" >
        <input class="nut-input-text" placeholder="请输入密码" type="text" />
      </nut-form-item>
      <nut-form-item label="电话" prop="dianhua" >
        <input class="nut-input-text" placeholder="请输入电话" type="text" />
      </nut-form-item>
      <nut-form-item label="权限" prop="quanxian" >
        <!-- <input class="nut-input-text" placeholder="请输入权限" type="text" /> -->
        <nut-radiogroup direction="horizontal" class="nut-input-text">
          <nut-radio label="1">选项1</nut-radio>
          <nut-radio label="2">选项2</nut-radio>
          <nut-radio label="3">选项3</nut-radio>
        </nut-radiogroup>
      </nut-form-item>
      <nut-form-item label="所属部门" prop="bumen" >
        <input class="nut-input-text" placeholder="请输入编号" type="text" />
      </nut-form-item>
      <nut-form-item label="备注" prop="beizhu" >
        <nut-textarea class="nut-input-text"  placeholder="请输入备注" type="text" />
      </nut-form-item>
    </nut-form>
    <nut-cell>
      <!-- <nut-button size="small" style="margin-right: 10px">修改</nut-button> -->
      <nut-button block type="info">修改</nut-button>
    </nut-cell>
  </view>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage } from '@tarojs/taro';
import "./index.scss";
const userFormRef = ref<any>(null);
const userForm = reactive({
  xingming: '',
  username: '',
  password: '',
  dianhua: '',
  quanxian: '',
  bumen: '',
  beizhu: ''
});
const rules = {
  "xingming": [
    { required: true, message: '请填写姓名' }
  ]
}
onMounted(() => {
  Taro.nextTick(() => {
    
  });
})
</script>