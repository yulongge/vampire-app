<template>
  <view class="add-dept-wrap">
    <view class="login-main">
      <nut-form
        :model-value="formData"
        :rules="rules"
        ref="ruleForm">
          <nut-form-item label="上级部门" prop="superiorsId" v-if="superiorsDeptName">
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
        <nut-button v-if="isEdit" type="default" class="login-btn reset-btn" @click="showDelConfirm">删除</nut-button>
        <nut-button type="info" class="login-btn" @click="submit">{{}}{{ isEdit ? '更新' : '添加'}}</nut-button>
      </div>
    </view>
    <nut-dialog
      teleport="#app"
      title="删除部门提示"
      content="删除部门，确定要删除吗？"
      v-model:visible="delConfirmShow"
      :onOk="remove"
    >
    </nut-dialog>
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
  addDept,
  getDeptInfo,
  updateDept,
  delDept,
} from '@/api/dept/dept.ts'
import { getCurrentInstance } from '@tarojs/taro';
const store = useStore()
const ruleForm = ref<any>(null);
let delConfirmShow = ref(false)
let isEdit = ref(false)
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
      let res = {}
      if (isEdit.value) {
        res = await updateDept(params)
      } else {
        res = await addDept([params])
      }
      console.log(res, 'submit add user')
      Taro.showToast({
        title: isEdit.value ? '更新成功' : '添加成功!',
        icon: "none"
      })
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
const showDelConfirm = (item) => {
  delConfirmShow.value = true
}
const remove = async () => {
  await delDept([formData.value.id])
  redirect({
    type: 'goback'
  })
}
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
const getDeptDetail = async (id) => {
  const res = await getDeptInfo({id})
  console.log(res, 'getDeptDetail')
  formData.value = res
  if (res.superiorsId) {
    const superiorsDept = await getDeptInfo({id: res.superiorsId})
    superiorsDeptName.value = superiorsDept.departmentName || ''
  }
}
const params = getCurrentInstance().router.params
const { superiorsId, superiorsName, id } = params
if (superiorsId) {
  Taro.setNavigationBarTitle({
    title: '添加子部门'
  })
  formData.value.superiorsId = superiorsId
  superiorsDeptName.value = superiorsName || ''
}
if (id) {
  Taro.setNavigationBarTitle({
    title: '部门信息'
  })
  getDeptDetail(id)
  isEdit.value = true
}
</script>