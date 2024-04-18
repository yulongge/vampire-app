export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/product/index",
    "pages/echart/index",
  ],
  subpackages: [
    {
      "root": "package/bar-basic",
      "pages": [
        "pages/bar-basic/bar-basic"
      ]
    },
    {
      "root": "package/line-basic",
      "pages": [
        "pages/line-basic/line-basic"
      ]
    },
    {
      "root": "package/line-smooth",
      "pages": [
        "pages/line-smooth/line-smooth"
      ]
    },
    {
      "root": "package/line-area",
      "pages": [
        "pages/line-area/line-area"
      ]
    },
    {
      "root": "package/line-stack",
      "pages": [
        "pages/line-stack/line-stack"
      ]
    },
    {
      "root": "package/bar-negative",
      "pages": [
        "pages/bar-negative/bar-negative"
      ]
    },
    {
      "root": "package/bar-waterfall",
      "pages": [
        "pages/bar-waterfall/bar-waterfall"
      ]
    },
    {
      "root": "package/bar-stack",
      "pages": [
        "pages/bar-stack/bar-stack"
      ]
    },
    {
      "root": "package/mix-line-bar",
      "pages": [
        "pages/mix-line-bar/mix-line-bar"
      ]
    },
    {
      "root": "package/pie-basic",
      "pages": [
        "pages/pie-basic/pie-basic"
      ]
    },
    {
      "root": "package/pie-doughnut",
      "pages": [
        "pages/pie-doughnut/pie-doughnut"
      ]
    },
    {
      "root": "package/pie-roseType",
      "pages": [
        "pages/pie-roseType/pie-roseType"
      ]
    },
    {
      "root": "package/pie-nest",
      "pages": [
        "pages/pie-nest/pie-nest"
      ]
    },
    {
      "root": "package/candlestick-basic",
      "pages": [
        "pages/candlestick-basic/candlestick-basic"
      ]
    },
    {
      "root": "package/scatter-basic",
      "pages": [
        "pages/scatter-basic/scatter-basic"
      ]
    },
    {
      "root": "package/radar-basic",
      "pages": [
        "pages/radar-basic/radar-basic"
      ]
    },
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#ffffff",
    navigationBarTitleText: "DEMO",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    // custom: true,
    color: "#333",
    selectedColor: "#FFFFFF",
    borderStyle: "white",
    backgroundColor: "#72afd3",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "assert/01.png",
        selectedIconPath: "assert/01.png"
      },
      {
        pagePath: "pages/product/index",
        text: "设备列表",
        iconPath: "assert/02.png",
        selectedIconPath: "assert/02.png"
      },
      {
        pagePath: "pages/echart/index",
        text: "我的",
        iconPath: "assert/02.png",
        selectedIconPath: "assert/02.png"
      }
    ]
  }
});
