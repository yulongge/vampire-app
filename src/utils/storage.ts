// 缓冲工具函数
import Taro from "@tarojs/taro"

export const setStorageSync = (key, data) => {
  try{
    Taro.setStorageSync(key, data)
  }catch(e){
    console.error('setStorageSync', e)
  } 
}

export const getStorageSync = (key)=>{
  return Taro.getStorageSync(key)
}

export const removeStorageSync = (key)=>{
  return Taro.removeStorageSync(key)
}