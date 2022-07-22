<template>
  <div class="scroll-wrapper" ref="scrollRef">
    <div class="scroll-content">
      <div
        class="tab-item"
        ref="tabItemRef"
        v-for="(item, index) in useRouterStore.tabList"
        :key="item.routeName"
        @click="jumpPage(item)">
        <div
          class="inner"
          :class="{
            active: useRouterStore.tabActivated.routeName === item.routeName,
          }">
          <div class="l">
            <Icon :icon="item.icon" />
            <span>{{ item.title }}</span>
          </div>
          <Icon
            class="r"
            @click.stop="closeTab(item)"
            v-if="index > 0"
            icon="material-symbols:close" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { routerStore } from '@/store/modules'
import { Route } from '@/declare/route'
import { useRouter, useRoute } from 'vue-router'
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'

const $router = useRouter()
const $route = useRoute()
const useRouterStore = routerStore()

onMounted(() => {
  // 页面第一次打开或刷新页面后, tabList 默认加入当前打开的页面
  const tab = {
    title: $route.meta.title,
    routeName: $route.name,
    icon: $route.meta.icon,
  }
  useRouterStore.setTabActivated(tab as Route.tabType)
  useRouterStore.setTabList(tab as Route.tabType, '增加')

  initScroll()
})

// better-scroll 处理tab的横向滚动
let bs: any
const scrollRef = ref<HTMLElement>()
function initScroll() {
  BScroll.use(ScrollBar)

  bs = new BScroll(scrollRef.value!, {
    scrollX: true,
    scrollY: false,
    probeType: 1,
    //@ts-ignore
    scrollbar: {
      fade: false,
      interactive: true,
      scrollbarTrackClickable: true,
      scrollbarTrackOffsetType: 'clickedPoint', // can use 'step'
    },
  })
}
// 监听tabList的长度,发生改变刷新滚动条
watch(
  () => useRouterStore.tabList.length,
  () => {
    nextTick(() => {
      bs.refresh()
    })
  },
)
//监听激活的tab, 把激活的tab滚动到视野内
const tabItemRef = ref<HTMLElement[]>([])
watch(
  () => useRouterStore.tabActivated,
  (val) => {
    const tabActivatedIndex = useRouterStore.tabList.findIndex(
      (item) => item.routeName === val!.routeName,
    )
    nextTick(() => {
      bs && bs.scrollToElement(tabItemRef.value[tabActivatedIndex])
    })
  },
)

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

  // 缓存的组件数组中删除当前tab的name
  const aliveComponentsArr = useRouterStore.keepAliveComponents
  if (aliveComponentsArr.includes(tab.routeName)) {
    const index = aliveComponentsArr.indexOf(tab.routeName)
    aliveComponentsArr.splice(index, 1)
    useRouterStore.setKeepAliveComponents(aliveComponentsArr)
  }

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

.scroll-wrapper {
  margin: 0 20px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  padding-bottom: 5px;
  .scroll-content {
    display: inline-block;
    .tab-item {
      display: inline-block;
      margin-right: 3px;
      border-radius: 5px 5px 0 0;
      background: #fff;
      cursor: pointer;

      .inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 150px;
        height: 26px;
        padding: 0 10px;
        color: $gray-color-5;
        font-size: 14px;
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
    }
  }
  :deep(.bscroll-indicator) {
    background: rgba(0, 0, 0, 0.2) !important;
  }
}
</style>
