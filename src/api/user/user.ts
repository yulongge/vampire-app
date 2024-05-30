import { request } from "@/utils/request"

/**
 * 登录信息
 * @param data
 * @returns
 */
export const login = (data: any) => {
  return request({
    url: `/user/login`,
    method: "POST",
    data,
    mock: false
  })
}

/**
 * 获取所有用户列表
 * @param data
 * @returns
 */
export const allUsers = (data: any) => {
  return request({
    url: `/user`,
    method: "GET",
    data,
    mock: false
  })
}
/**
 * 分页所有用户列表
 * @param data
 * @returns
 */
export const getUsers = (data: any) => {
  return request({
    url: `/user/${data.pageNo}/${data.pageSize}`,
    method: "GET",
    data: {},
    mock: false
  })
}
/**
 * 注册
 * @param data
 * @returns
 */
export const addUser = (data: any) => {
  return request({
    url: `/user`,
    method: "POST",
    data,
    mock: false
  })
}

/**
 * 获取用户信息
 * @param data
 * @returns
 */
export const getUserInfo = (data: any) => {
  return request({
    url: `/user/${data.userId}`,
    method: "GET",
    data,
    mock: false
  })
}

/**
 * 删除用户
 * @param data
 * @returns
 */
export const delUser = (data: any) => {
  return request({
    url: `/user/${data.userId}`,
    method: "delete",
    data,
    mock: false
  })
}

/**
 * 修改用户
 * @param data
 * @returns
 */
export const updateUser = (data: any) => {
  return request({
    url: `/user`,
    method: "put",
    data,
    mock: false
  })
}