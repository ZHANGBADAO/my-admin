<template>
  <el-aside width="250px">
    <el-scrollbar>
      <el-menu style="border-right: 0;" :default-active="defaultActive">
        <AsideMenuItem :menuArr="menuArr" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts" setup>
import {routerStore} from '@/store/modules'
import AsideMenuItem from './AsideMenuItem.vue'
import {useRoute} from 'vue-router'

const useRouteStore = routerStore()
const menuArr = computed(() => {
  return useRouteStore.menus
})

const $route = useRoute()
const defaultActive = $route.name
</script>

<style lang="scss" scoped>

</style>
