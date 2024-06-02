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

/**
 * 获取部门信息
 * @param data
 * @returns
 */
export const getDeptInfo = (data: any) => {
  return request({
    url: `/dep/${data.id}`,
    method: "get",
    mock: false
  })
}

/**
 * 修改部门信息
 * @param data
 * @returns
 */
export const updateDept = (data: any) => {
  return request({
    url: `/dep`,
    method: "put",
    data,
    mock: false
  })
}

/**
 * 模糊搜索部门列表
 * @param data
 * @returns
 */
export const searchDepts = (data: any) => {
  return request({
    url: `/dep/fuzzy`,
    method: "get",
    data,
    mock: false
  })
}