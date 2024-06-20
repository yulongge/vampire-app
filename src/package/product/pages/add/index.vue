<template>
  <view class="product-option-wrap">
    <nut-form :model-value="deviceForm" ref="deviceFormRef" :rules="rules">
      <nut-form-item label="设备名称" prop="name" required label-width="130px">
        <input class="nut-input-text" v-model="deviceForm.name" placeholder="请输入设备名称" type="text" />
      </nut-form-item>
      <nut-form-item label="编号" prop="number" required label-width="130px">
        <input class="nut-input-text" v-model="deviceForm.number" placeholder="请输入编号" type="text" />
      </nut-form-item>
      <nut-form-item label="通信端口" prop="communicationPort" required label-width="130px">
        <input class="nut-input-text" v-model="deviceForm.communicationPort" placeholder="请输入通信端口" type="text" />
      </nut-form-item>
      <nut-form-item label="位置" prop="location" required label-width="130px">
        <input class="nut-input-text" v-model="deviceForm.location" placeholder="请输入位置" type="text" />
      </nut-form-item>
      <nut-form-item label="所属部门" prop="departmentId" required label-width="130px">
        <input class="nut-input-text" placeholder="请选择门店" type="text" v-model="deviceForm.departmentName" @click="showPickerDept"/>
        <nut-picker
          v-model="selectedValue"
          v-model:visible="showDept"
          :columns="columns"
          title="部门选择"
          @confirm="confirm"
        >
        </nut-picker>
      </nut-form-item>
      <!-- <nut-form-item label="网络是否在线" prop="location" required label-width="130px">
        <span class="nut-input-text">在线</span>
      </nut-form-item> -->
      <nut-form-item label="网络是否在线" prop="location" required label-width="130px">
        <nut-switch v-model="checked" active-text="开" inactive-text="关" size="40px" />
      </nut-form-item>
      <nut-form-item label="流量" prop="location" required label-width="130px">
        <span class="nut-input-text">100M</span>
      </nut-form-item>
      <nut-form-item label="计划完成度" prop="location" required label-width="130px">
        <span class="nut-input-text">40%</span>
      </nut-form-item>
      <nut-form-item label="加注药剂的厂家" prop="location" required label-width="130px">
        <span class="nut-input-text">河南龙旗公司</span>
      </nut-form-item>
      <nut-form-item label="药剂浓度" prop="location" required label-width="130px">
        <span class="nut-input-text">50%</span>
      </nut-form-item>
      <nut-form-item label="药剂的液位" prop="location" required label-width="130px">
        <span class="nut-input-text">30mm</span>
      </nut-form-item>
      <nut-form-item label="药剂的温度" prop="location" required label-width="130px">
        <span class="nut-input-text">40度</span>
      </nut-form-item>
      <nut-form-item label="备注" prop="remark" label-width="130px">
        <input class="nut-input-text" v-model="deviceForm.remark" placeholder="请输入备注" type="text" />
      </nut-form-item>
    </nut-form>
    <nut-cell>
      <nut-button type="info" size="normal" style="margin-right: 10px" @click="submit">{{ isEidt ? '修改' : '添加' }}</nut-button>
      <nut-button color="#7232dd" type="danger" size="normal" style="margin-right: 10px" @click="operateDevice" v-if="isEidt">操控</nut-button>
      <nut-button type="danger" size="normal" style="margin-right: 10px" @click="delDevice" v-if="isEidt">删除</nut-button>
    </nut-cell>
    <nut-dialog
      teleport="#app"
      title="删除设备提示"
      content="确定要删除设备吗？"
      v-model:visible="delConfirmShow"
      :onOk="toDel"
    >
    </nut-dialog>
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
let delConfirmShow = ref(false)
const deviceFormRef = ref<any>(null);
let checked = ref(true)
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
  // const params = getCurrentInstance().router.params
  // const { id } = params
  // if (id) {

  // }
}
getDept()
const showPickerDept = () => {
  // getDept()
  selectedValue.value = [deviceForm.value.departmentId]
  showDept.value = true
}
const confirm = ( { selectVal, selectedOptions })=>{
  deviceForm.value.departmentName = selectedOptions[0].text
  deviceForm.value.departmentId = selectedOptions[0].value
  console.log(selectedValue.value, 'selectedValue.value')
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
  selectedValue.value = [deviceForm.value.departmentId]
  const tempDepts = columns.value.filter(item => item.value == deviceForm.value.departmentId)
  if (tempDepts.length) {
    deviceForm.value.departmentName = tempDepts[0].text
  }
}
const isEidt = computed(() => {
  const params = getCurrentInstance().router.params
  const { id } = params
  const userInfo = getStorageSync('userInfo')
  return id && userInfo.permission == 3
})
const delDevice = async () => {
  delConfirmShow.value = true
}
const toDel = async () => {
  const res = await removeDevice([
    deviceForm.value.id
  ])
  console.log(res, 'res')
  redirect({
    type: 'goback'
  })
}
const operateDevice = () => {
  redirect({
    url: '/package/product/pages/options/index'
  })
}
onMounted(() => {
  const params = getCurrentInstance().router.params
  const { id } = params
  Taro.nextTick(() => {
    if (id) {
      Taro.setNavigationBarTitle({
        title: '设备信息'
      })
      getDetail(id)
    }
  });
})
</script>