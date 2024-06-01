<template>
  <view class="add-dept-wrap">
    <view class="login-main">
      <nut-form
        :model-value="formData"
        :rules="rules"
        ref="ruleForm">
          <nut-form-item label="上级部门" prop="superiorsId" v-if="superiorsName">
            <span>{{ superiorsDeptName }}</span>
          </nut-form-item>
          <nut-form-item label="部门编号" prop="departmentNum" required>
            <input class="nut-input-text"
              @blur="customBlurValidate('departmentNum')"
              v-model="formData.departmentNum"
              placeholder="请输入部门编号"
              type="text" />
          </nut-form-item>
          <nut-form-item label="部门名称" prop="departmentName" required>
            <input class="nut-input-text"
              @blur="customBlurValidate('departmentName')"
              v-model="formData.departmentName"
              placeholder="请输入部门名称"
              type="text" />
          </nut-form-item>
      </nut-form>
      <div class="option-btns">
        <nut-button type="default" class="login-btn reset-btn" @click="reset">重置</nut-button>
        <nut-button type="info" class="login-btn" @click="submit">添加</nut-button>
      </div>
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
  addDept
} from '@/api/dept/dept.ts'
import { getCurrentInstance } from '@tarojs/taro';
const store = useStore()
const ruleForm = ref<any>(null);
let formData = ref({
  departmentNum: '',
  departmentName: '',
  superiorsId: null,
  companyId: 0
})
let superiorsDeptName = ref('')
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
        ...formData.value
      }
      const res = await addDept([params])
      console.log(res, 'submit add user')
      // Toast.success('注册成功!');
      redirect({
        type: 'goback'
      })
    } else {
      console.log('error submit!!', errors);
    }
  });
};
const reset = () => {
  formData.value = {
    departmentNum: '',
    departmentName: ''
  }
  ruleForm.value.reset();
};
// 函数校验
const nameLengthValidator = (val: string) => val?.length >= 2;
const rules = {
  departmentNum: [
    { required: true, message: '请填写部门编号' },
    { message: 'name 至少两个字符', validator: nameLengthValidator }
  ],
  departmentName: [
    { required: true, message: '请填写部门名称' },
    { message: 'name 至少两个字符', validator: nameLengthValidator }
  ],
}
const params = getCurrentInstance().router.params
const { superiorsId, superiorsName } = params
if (superiorsId) {
  Taro.setNavigationBarTitle({
    title: '添加子部门'
  })
  formData.value.superiorsId = superiorsId
  superiorsDeptName.value = superiorsName
}
</script>