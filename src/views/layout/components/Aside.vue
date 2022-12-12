<template>
  <el-aside :style="{ width: isCollapse ? 'unset' : '250px' }">
    <el-scrollbar style="padding-left: 20px">
      <el-menu
        style="border-right: 0; border-radius: 10px; overflow: hidden"
        :collapse="isCollapse"
        :default-active="defaultActive">
        <AsideMenuItem :menuArr="menuArr" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts" setup>
import { routerStore } from '@/store/modules'
import AsideMenuItem from './AsideMenuItem.vue'
import { useRoute } from 'vue-router'

const useRouteStore = routerStore()

//菜单数据
const menuArr = computed(() => {
  return useRouteStore.menus
})

const $route = useRoute()
//高亮打开的页面对应的菜单
const defaultActive = ref($route.name)
//监听激活的tab,高亮对应的菜单
watch(
  () => useRouteStore.tabActivated,
  (val) => {
    defaultActive.value = val?.routeName
  },
)

// 折叠菜单
const isCollapse = ref(false)
</script>

<style lang="scss" scoped></style>
