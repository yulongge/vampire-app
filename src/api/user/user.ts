import { request } from "@/utils/request"

/**
 * 获取登录信息
 * @param data
 * @returns
 */
export const authLogin = (data: any) => {
  return request({
    // url: `/as-user/api/v1/auth/wxapp-login`,
    url: `/fillsystem/login`,
    method: "POST",
    data,
    mock: false
  })
}

/**
 * 获取登录信息
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