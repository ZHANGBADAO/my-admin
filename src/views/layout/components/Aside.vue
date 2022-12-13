<template>
  <el-aside
    class="aside-box"
    :style="{ width: isCollapse ? 'unset' : '250px' }">
    <div
      class="collapse-box"
      @click="changeCollapseFn"
      :title="isCollapse ? '展开菜单' : '收起菜单'">
      <Icon v-show="!isCollapse" icon="ep:fold" width="20" />
      <Icon v-show="isCollapse" icon="ep:expand" width="20" />
    </div>
    <el-scrollbar>
      <el-menu
        style="border-right: 0"
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
import { Icon } from '@iconify/vue'

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
function changeCollapseFn() {
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="scss" scoped>
.aside-box {
  margin-left: 20px;
  margin-bottom: 50px;
  padding-bottom: 30px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  .collapse-box {
    cursor: pointer;
    position: absolute;
    bottom: 6px;
    right: 22px;
  }
}
</style>
