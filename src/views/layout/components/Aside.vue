<template>
  <el-aside width="250px">
    <el-scrollbar style="padding-left: 20px">
      <el-menu
        style="border-right: 0; border-radius: 10px; overflow: hidden"
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
const menuArr = computed(() => {
  return useRouteStore.menus
})

const $route = useRoute()
const defaultActive = ref($route.name)

watch(
  () => useRouteStore.tabActivated,
  (val) => {
    if (!val) return
    defaultActive.value = val.routeName
  },
)
</script>

<style lang="scss" scoped></style>
