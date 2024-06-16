<template>
  <view class="product-option-wrap">
    <nut-form :model-value="deviceForm" ref="deviceFormRef" :rules="rules">
      <nut-form-item label="设备名称" prop="name" required>
        <input class="nut-input-text" v-model="deviceForm.name" placeholder="请输入设备名称" type="text" />
      </nut-form-item>
      <nut-form-item label="编号" prop="number" required>
        <input class="nut-input-text" v-model="deviceForm.number" placeholder="请输入编号" type="text" />
      </nut-form-item>
      <nut-form-item label="通信端口" prop="communicationPort" required>
        <input class="nut-input-text" v-model="deviceForm.communicationPort" placeholder="请输入通信端口" type="text" />
      </nut-form-item>
      <nut-form-item label="位置" prop="location" required>
        <input class="nut-input-text" v-model="deviceForm.location" placeholder="请输入位置" type="text" />
      </nut-form-item>
      <nut-form-item label="所属部门" prop="departmentId" required>
        <input class="nut-input-text" placeholder="请选择门店" type="text" v-model="deviceForm.departmentId" @click="showPickerDept"/>
        <nut-picker
          v-model="deviceForm.departmentId"
          v-model:visible="showDept"
          :columns="columns"
          title="部门选择"
          @confirm="confirm"
        >
        </nut-picker>
      </nut-form-item>
      <nut-form-item label="备注" prop="remark">
        <input class="nut-input-text" v-model="deviceForm.remark" placeholder="请输入备注" type="text" />
      </nut-form-item>
    </nut-form>
    <nut-cell>
      <nut-button block type="info" size="large" style="margin-right: 10px" @click="submit">{{ isEidt ? '修改' : '添加' }}</nut-button>
    </nut-cell>
    <nut-cell v-if="isEidt" >
      <nut-button block type="danger" size="large" style="margin-right: 10px" @click="delDevice">删除</nut-button>
    </nut-cell>
  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, computed } from "vue";
import Taro from "@tarojs/taro";
import { useShareAppMessage } from '@tarojs/taro';
import "./index.scss";
import {
  allDept,
} from '@/api/dept/dept.ts'
import {
  addDevice,
  getDeviceInfo,
  removeDevice,
  updateDevice,
} from '@/api/product/product.ts'
import { redirect } from '@/utils/redirect';
import { getCurrentInstance } from '@tarojs/taro';
import { getStorageSync } from '@/utils/storage'

const deviceFormRef = ref<any>(null);
let deviceForm = ref({
  name: '',
  number: '',
  communicationPort: '', // 通信端口
  location: '',
  departmentId: '',
  departmentName: '',
  remark: ''
});
let showDept = ref(false)
const columns = ref([]);
const selectedValue = ref([]);
const nameLengthValidator = (val: string) => val?.length >= 2;
const rules = {
  name: [
    { required: true, message: '请填部门名称' },
    { message: 'name 至少两个字符', validator: nameLengthValidator }
  ],
  number: [
    { required: true, message: '请填写部门编号' },
  ],
  communicationPort: [
    { required: true, message: '请填写通信端口' }
  ],
  departmentId: [
    { required: true, message: '请选择部门' }
  ],
  location: [
    { required: true, message: '请填写位置' }
  ]
}
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
  selectedValue.value = [deviceForm.value.departmentId]
  showDept.value = true
}
const confirm = ( { selectedValue, selectedOptions })=>{
  deviceForm.value.departmentName = selectedOptions[0].text
  deviceForm.value.departmentId = selectedOptions[0].value
}

const submit = () => {
  deviceFormRef.value.validate().then(async ({ valid, errors }: any) => {
    if (valid) {
      console.log('success', deviceForm.value);
      const params = {
        ...deviceForm.value,
      }
      // const res = 
      if (deviceForm.value.id) {
        await updateDevice(params)
      } else {
        await addDevice([params])
      }
      // console.log(res, 'submit add device')
      redirect({
        type: 'goback'
      })
    } else {
      console.log('error submit!!', errors);
    }
  });
}
const getDetail = async (id) => {
  const res = await getDeviceInfo({id})
  deviceForm.value = res
}
const isEidt = computed(() => {
  const params = getCurrentInstance().router.params
  const { id } = params
  const userInfo = getStorageSync('userInfo')
  return id && userInfo.permission == 3
})
const delDevice = async () => {
  const res = await removeDevice([
    deviceForm.value.id
  ])
  console.log(res, 'res')
  redirect({
    type: 'goback'
  })
}
onMounted(() => {
  const params = getCurrentInstance().router.params
  const { id } = params
  Taro.nextTick(() => {
    if (id) {
      getDetail(id)
    }
  });
})
</script>