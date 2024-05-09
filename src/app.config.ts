export default {
  pages: [
    'pages/index/index',
    'pages/bar-basic/bar-basic',
    "pages/product/index",
    "pages/mine/index"
  ],
  subpackages: [
    {
      "root": "package/product",
      "pages": [
        "pages/index/index",
        "pages/detail/index",
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
  }
}