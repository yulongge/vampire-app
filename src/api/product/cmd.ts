import { request } from "@/utils/request"

/**
 * 指令发送通用接口
 * @param data
 * @returns
 */
export const sendCmd = (data: any) => {
  return request({
    url: `/cmd`,
    method: "post",
    data,
    mock: false
  })
}