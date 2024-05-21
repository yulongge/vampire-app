import { request } from "@/utils/request"

/**
 * 获取登录信息
 * @param data
 * @returns
 */
export const authLogin = (data: any) => {
  return request({
    // url: `/as-user/api/v1/auth/wxapp-login`,
    url: `/cuser/api/wxapp/login`,
    method: "POST",
    data,
    mock: false
  })
}