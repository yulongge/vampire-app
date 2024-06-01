import { request } from "@/utils/request"

/**
 * 获取所有用部门
 * @param data
 * @returns
 */
export const allDept = (data: any) => {
  return request({
    url: `/dep`,
    method: "GET",
    data,
    mock: false
  })
}

/**
 * 添加部门
 * @param data
 * @returns
 */
export const addDept = (data: any) => {
  return request({
    url: `/dep`,
    method: "post",
    data,
    mock: false
  })
}

/**
 * 删除部门
 * @param data
 * @returns
 */
export const delDept = (data: any) => {
  return request({
    url: `/dep`,
    method: "delete",
    data,
    mock: false
  })
}