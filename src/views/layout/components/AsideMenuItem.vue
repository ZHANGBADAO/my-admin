<template>
  <template v-for="menuItem in props.menuArr" :key="menuItem.key">

    <template v-if="menuItem.children?.length > 0">
      <el-sub-menu :index="menuItem.key">
        <template #title>
          <div @click="redirectHandle(menuItem)" style="flex: 1;display: flex;align-items: center">
            <Icon class="mr-2" :icon="menuItem.icon" />
            <span>{{menuItem.label}}</span>
          </div>
        </template>

        <AsideMenuItem :menuArr="menuItem.children" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="menuItem.key" @click="pageJump(menuItem.key)">
        <Icon class="mr-2" :icon="menuItem.icon" />
        <span>{{menuItem.label}}</span>
      </el-menu-item>
    </template>

  </template>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import {useRouter} from 'vue-router'
import {Route} from "@/declare/route";
const router = useRouter()

const props = defineProps({
  menuArr: {
    type: Array,
    default: () => []
  }
})

function pageJump(routeName: string) {
  router.push({name: routeName})
}

// 菜单配置重定向时,跳转到配置的子菜单
function redirectHandle(menuItem: Route.MenuType) {
  if (!menuItem.redirect) {
    return
  }

  router.push(menuItem.redirect)
}
</script>

<style lang="scss" scoped>

</style>
