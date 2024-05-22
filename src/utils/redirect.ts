import Taro from "@tarojs/taro"

export const redirect = ({
  type = 'navigate',
  url = ''
}) => {
  switch(type) {
    case 'switchtap':
      Taro.switchTab({
        url
      })
      break;
    case 'redirectTo':
      Taro.redirectTo({
        url
      })
      break;
    case 'relaunch':
      Taro.reLaunch({
        url
      })
      break;
    case 'goback': 
      Taro.navigateBack({
        delta: 1
      })
      break;
    default:
      Taro.navigateTo({url})
  }
  
}