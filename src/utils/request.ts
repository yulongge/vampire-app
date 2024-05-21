import Taro from "@tarojs/taro"
/**
 * 
 * @param param
 * @returns code 200表示成功
 */
export const request = ({
  host = `http://gy1618.cn`,
  url = '',
  data = {},
  method = 'POST',
  headers = {
    'content-type': 'application/json',
    // "accessToken": getStorageSync(STORERAGE_KEYS.USERINFO) && getStorageSync(STORERAGE_KEYS.USERINFO).access_token || '',

  },
  mock = false,
}) => {
  // console.log(host, url, data, method, headers, mock, 'request params')
  let params = Object.assign({}, {...data})
  
  // console.log(params, 'request params')

  if (mock) {
    const apiIndex = url.lastIndexOf('/')
    const apiName = url.substring(apiIndex + 1, url.length)
    // console.log(apiIndex, apiName, 'request url')
    const result = require(`@/api/mock/${apiName}.ts`)
    return new Promise((resolve)=>{
      // console.log(result, 'result')
      resolve(result)
    })
  } else {
    url = `${host}${url}`
  }

  let newHeader = Object.assign({}, headers)
  // const userInfo = getStorageSync(STORERAGE_KEYS.USERINFO)
  // newHeader.accessToken = userInfo.access_token
  return Taro.request({
    url,
    data: params,
    header: newHeader,
    method: method,
    dataType: 'json',
    success(res) {
      console.log(url, res, res.data.code != 200 && (url.indexOf('login') == -1), 'request result')
      if(res.data.code != 200 && (url.indexOf('login') == -1)) {
        Taro.showToast({
          title: res.data.message || '网络错误',
          icon: "error"
        })
        throw new Error(res.data.message || '网络错误')
      }
      return res
    }
  })
}