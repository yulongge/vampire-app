<template>
  <view class="dept-tree">
    <!-- <div v-for="node in treeData" :key="node.id" class="tree-node">  
      <div @click="toggle(node)">  
        {{ node.name }}  
        <span v-if="node.children && node.children.length > 0" :class="{ 'fa-rotate-90': node.isOpen }">&#9658;</span>  
        <span v-else>&nbsp;</span>  
      </div>  
      <div v-if="node.children && node.children.length > 0 && node.isOpen" class="tree-children">  
        <Tree :tree-data="node.children" />  
      </div>  
    </div>   -->
  </view>
</template>
<script lang="ts" setup name="Tree">
import { ref, onMounted, } from "vue";
import "./index.scss";

onMounted(() => {
  // const userInfo = getStorageSync('userInfo')
  // if (!userInfo?.id) {
  //   redirect({
  //     type: 'relaunch',
  //     url: '/package/mine/pages/login/index'
  //   })
  // }
});
</script>