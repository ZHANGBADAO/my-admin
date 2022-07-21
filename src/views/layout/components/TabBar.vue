<template>
  <div>
    <el-scrollbar>
      <div class="tab-box">
        <div
          v-for="(item, index) in useRouterStore.tabList"
          :key="item.routeName"
          @click="jumpPage(item)"
          class="tab-item"
          :class="{
            active: tabActivatedComputed.routeName === item.routeName,
          }">
          <div class="l">
            <Icon :icon="item.icon" />
            <span>{{ item.title }}</span>
          </div>
          <Icon
            @click.stop="closeTab(item)"
            v-if="index > 0"
            class="r"
            icon="material-symbols:close" />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { routerStore } from '@/store/modules'
import { Route } from '@/declare/route'
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()

onMounted(() => {
  // 页面第一次打开或刷新页面后, tabList 默认加入当前打开的页面
  if (useRouterStore.tabList.length === 0) {
    const tab = {
      title: $route.meta.title,
      routeName: $route.name,
      icon: $route.meta.icon,
    }
    useRouterStore.setTabActivated(tab as Route.tabType)
    useRouterStore.setTabList(tab as Route.tabType, '增加')
  }
})

const useRouterStore = routerStore()
const tabActivatedComputed = computed(() => useRouterStore.tabActivated)

// 打开tab对应的页面
function jumpPage(tab: Route.tabType) {
  $router.push({ name: tab.routeName })
  useRouterStore.setTabActivated(tab)
}

// 关闭tab对应的页面
function closeTab(tab: Route.tabType) {
  const closedIndex = useRouterStore.tabList.findIndex(
    (item) => item.routeName === tab.routeName,
  )
  //TabList中删除tab
  useRouterStore.setTabList(tab, '删除')

  //当前tab删除后,closedIndex为后一个tab的index
  let lastTab = useRouterStore.tabList[closedIndex]
  if (!lastTab) {
    // 被删除的tab后没有tab,拿到最后一个tab
    lastTab = useRouterStore.tabList[useRouterStore.tabList.length - 1]
  }

  // 打开tab对应的页面
  $router.replace({
    name: lastTab.routeName,
  })
  // 打开的tab设为激活
  useRouterStore.setTabActivated(lastTab)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';

.tab-box {
  display: flex;
  margin-left: 20px;
}

.tab-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  height: 26px;
  padding: 0 10px;
  margin-right: 3px;
  border-radius: 5px 5px 0 0;
  background: $gray-color-1;
  color: $gray-color-5;
  font-size: 14px;
  cursor: pointer;
  &.active {
    color: $main-color-1;
  }
  .l {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
}
</style>
