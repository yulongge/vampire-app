export default {
  pages: [
    'pages/index/index'
  ],
  subpackages: [
    {
      "root": "package/mine",
      "pages": [
        "pages/index/index",
        "pages/login/index",
        "pages/regist/index",
      ]
    },
    {
      "root": "package/user",
      "pages": [
        "pages/index/index",
        "pages/userInfo/index",
      ]
    },
    {
      "root": "package/dept",
      "pages": [
        "pages/index/index",
        "pages/addDept/index",
      ]
    },
    {
      "root": "package/product",
      "pages": [
        "pages/index/index",
        "pages/detail/index",
        "pages/options/index",
        "pages/add/index",
        "pages/planTemp/index",
        "pages/addPlanTemp/index",
      ]
    },
    {
      "root": "package/monitor",
      "pages": [
        "pages/index/index",
        "pages/monitorDetail/index",
        "pages/addMonitor/index",
        "pages/monitorAnalysic/index",
        "pages/analysicAll/index",
      ]
    },
  ],
  // tabBar: {
  //   color: "#333",
  //   selectedColor: "#FFFFFF",
  //   borderStyle: "black",
  //   backgroundColor: "#ffffff",
  //   list: [
  //     {
  //       pagePath: "pages/index/index",
  //       text: "",
  //       iconPath: "assert/shouye1.png",
  //       selectedIconPath: "assert/shouye1.png"
  //     },
  //     {
  //       pagePath: "pages/product/index",
  //       text: "",
  //       iconPath: "assert/electronics1.png",
  //       selectedIconPath: "assert/electronics1.png"
  //     },
  //     {
  //       pagePath: "pages/mine/index",
  //       text: "",
  //       iconPath: "assert/my1.png",
  //       selectedIconPath: "assert/my1.png"
  //     }
  //   ]
  // },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'NutUI',
    navigationBarTextStyle: 'black'
  },
  "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示" // 高速公路行驶持续后台定位
    }
  },
  requiredPrivateInfos: [
    "getLocation"
  ]
}