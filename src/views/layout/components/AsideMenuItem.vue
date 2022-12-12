<template>
  <template v-for="menuItem in props.menuArr" :key="menuItem.key">
    <template v-if="menuItem.children?.length > 0">
      <el-sub-menu :index="menuItem.key">
        <template #title>
          <Icon class="mr-2" :icon="menuItem.icon" />
          <span @click="redirectHandle(menuItem)">{{ menuItem.label }}</span>
        </template>

        <AsideMenuItem :menuArr="menuItem.children" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="menuItem.key" @click="pageJump(menuItem)">
        <Icon class="mr-2" :icon="menuItem.icon" />
        <span>{{ menuItem.label }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { Route } from '@/declare/route'
import { routerStore } from '@/store/modules'
const $router = useRouter()
const useRouterStore = routerStore()

const props = defineProps({
  menuArr: {
    type: Array,
    default: () => [],
  },
})

//点击具体的菜单, 跳转页面
function pageJump(menuItem: Route.MenuType) {
  $router.push({ name: menuItem.key })
  saveTab(menuItem)
}

// 点击菜单的目录, 配置重定向时,跳转到配置的子菜单
function redirectHandle(menuItem: Route.MenuType) {
  if (!menuItem.redirect) {
    return
  }

  $router.push(menuItem.redirect)
  saveTab(menuItem)
}

// 保存打开的页面到 tabList
function saveTab(menuItem: Route.MenuType) {
  const tab = {
    title: menuItem.label,
    routeName: menuItem.key,
    icon: menuItem.icon!,
  }
  useRouterStore.setTabList(tab, '增加')
  useRouterStore.setTabActivated(tab)
}
</script>

<style lang="scss" scoped></style>
