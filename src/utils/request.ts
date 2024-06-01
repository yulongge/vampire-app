import Taro from "@tarojs/taro"
/**
 * 
 * @param param
 * @returns code 0表示成功
 */
export const request = ({
  host = `http://124.70.59.96`,//`http://gy1618.cn`,
  url = '',
  data = {},
  method = 'POST',
  headers = {
    'content-type': 'application/json',
  },
  mock = false,
}) => {
  let params = {}
  if (Array.isArray(data)) {
    params = Object.assign([], data)
  } else {
    params = Object.assign({}, {...data})
  }
  url = `${host}${url}`
  let newHeader = Object.assign({}, headers)
  return Taro.request({
    url,
    data: params,
    header: newHeader,
    method: method,
    dataType: 'json',
  }).then(res => {
    console.log(url, res.data?.data, 'request result')
    if(res.data.code != 0 && (url.indexOf('login') == -1)) {
      Taro.showToast({
        title: res.data.msg || '网络错误',
        icon: "error"
      })
      throw new Error(res.data.msg || '网络错误')
    }
    return res.data?.data
  })
}