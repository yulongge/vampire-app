import { request } from "@/utils/request"

/**
 * 全局配置
 * @param data
 * @returns
 */

 export const initConfig = (data: any) => {
  return request({
    url: `/fillsystem/init`,
    method: "POST",
    data,
    mock: false
  })
}