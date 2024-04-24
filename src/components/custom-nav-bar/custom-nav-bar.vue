<template>
  <view class="navbar-component" :style="{ 'height': navbarHeight + 'px'}" :class="props.showBg ? 'navbar-bg' : ''">
    <view class="status-bar" :style="[statusBarSytle]"></view>
    <view class="content-bar" :style="[navBarContentStyle]">
      <view class="content-bar-title">{{ title }}</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed } from 'vue'
import { getSystemInfoSync, getMenuButtonBoundingClientRect } from "@tarojs/taro"

import './custom-nav-bar.less'
const props = defineProps(['title', 'showBg']);
// let navbarHeight = ref(0)
const getWeChatCapsuleInfo = () => {
  const { width, height, left, top, right } = getMenuButtonBoundingClientRect()
  return {
    width: width,
    height: height,
    left: left,
    top: top,
    right: right
  }
}
const getNavigationBarInfo = () => {
  const sysInfo = getSystemInfoSync()
  const capsuleInfo = getWeChatCapsuleInfo()
  // 标题栏高度
  const titleBarHeight = capsuleInfo.height + (capsuleInfo.top - sysInfo.statusBarHeight) * 2
  // 导航栏合适高度
  const appHeaderHeight = titleBarHeight + sysInfo.statusBarHeight
  // 自定义导航栏的可用宽度
  const marginWidth = sysInfo.screenWidth - capsuleInfo.right
  // 导航栏标题宽度
  const titleBarWidth = sysInfo.screenWidth - capsuleInfo.width - marginWidth * 3
  // 去掉导航栏，屏幕的高度
  const contentHeight = sysInfo.screenHeight - appHeaderHeight

  const navigationBarInfo = {
    appHeaderHeight,
    titleBarWidth,
    titleBarHeight,
    contentHeight,
    statusBarHeight: sysInfo.statusBarHeight
  }
  return navigationBarInfo
}
const navbarHeight = computed(() => {
  const navbarInfo = getNavigationBarInfo()
  return navbarInfo.appHeaderHeight
})
// navbarHeight.value = initNavbarHeight()
// 状态栏样式设置
const statusBarSytle = computed(() => {
  const navbarInfo = getNavigationBarInfo()
  return {
    'width': '100%',
    'height': navbarInfo.statusBarHeight + 'px'
  }
})
// 自定义内容区域样式设置
const navBarContentStyle = computed(() => {
  const navbarInfo = getNavigationBarInfo()
  return {
    'height':(navbarInfo.appHeaderHeight - navbarInfo.statusBarHeight) + 'px',
    // 'width': navbarInfo.titleBarWidth + 'px'
  }
})
</script>
