import { request } from "@/utils/request"

/**
 * 分页获取设备列表
 * @param data
 * @returns
 */
export const getDevices = (data: any) => {
  return request({
    url: `/device/${data.pageNo}/${data.pageSize}`,
    method: "get",
    data,
    mock: false
  })
}

/**
 * 添加设备
 * @param data
 * @returns
 */
export const addDevice = (data: any) => {
  return request({
    url: `/device`,
    method: "post",
    data,
    mock: false
  })
}

/**
 * 获取设备信息
 * @param data
 * @returns
 */
export const getDeviceInfo = (data: any) => {
  return request({
    url: `/device/${data.id}`,
    method: "get",
    data,
    mock: false
  })
}

/**
 * 删除设备
 * @param data
 * @returns
 */
export const removeDevice = (data: any) => {
  return request({
    url: `/device`,
    method: "delete",
    data,
    mock: false
  })
}

/**
 * 更新设备信息
 * @param data
 * @returns
 */
export const updateDevice = (data: any) => {
  return request({
    url: `/device`,
    method: "put",
    data,
    mock: false
  })
}