<template>
  <div class="scroll-wrapper">
    <div class="left-btn" @click="moveFn('left')">
      <Icon icon="ep:arrow-left" width="20" />
    </div>

    <div class="scroll-box" ref="scrollRef">
      <div class="scroll-content">
        <div
          class="tab-item"
          ref="tabItemRef"
          v-for="item in useRouterStore.tabList"
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
              icon="material-symbols:close" />
          </div>
        </div>
      </div>
    </div>

    <div class="right-btn" @click="moveFn('right')">
      <Icon icon="ep:arrow-right" width="20" />
    </div>

    <el-dropdown>
      <el-button>菜单</el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="batchCloseTab('左')"
            >关闭左侧所有页签</el-dropdown-item
          >
          <el-dropdown-item @click="batchCloseTab('右')"
            >关闭右侧所有页签</el-dropdown-item
          >
          <el-dropdown-item @click="batchCloseTab('所有')"
            >关闭所有页签</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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
  // 首页是布局页面, 打开的是首页不需要添加到tabList
  if ($route.meta.title !== '首页') {
    const tab = {
      title: $route.meta.title,
      routeName: $route.name,
      icon: $route.meta.icon,
    }
    useRouterStore.setTabActivated(tab as Route.tabType)
    useRouterStore.setTabList(tab as Route.tabType, '增加')
  }

  initScroll()
})

// better-scroll 处理tab的横向滚动
let bs: BScroll
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
    if (!val) {
      return
    }

    const tabActivatedIndex = useRouterStore.tabList.findIndex(
      (item) => item.routeName === val!.routeName,
    )
    nextTick(() => {
      bs &&
        bs.scrollToElement(tabItemRef.value[tabActivatedIndex], 500, true, true)
    })
  },
)
//监听当前路由页面的变化, 高亮对应的顶部tab和左侧menu
watch($route, () => {
  const tab = {
    title: $route.meta.title,
    routeName: $route.name,
    icon: $route.meta.icon,
  }
  useRouterStore.setTabActivated(tab as Route.tabType)
})

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

  // 所有tab都关闭了
  if (useRouterStore.tabList.length === 0) {
    // 激活的tab设为null
    useRouterStore.setTabActivated(null)
    $router.push('/home')
    return
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

//批量关闭标签页
function batchCloseTab(type: '左' | '右' | '所有') {
  if (!useRouterStore.tabActivated) {
    return
  }

  if (type === '所有') {
    useRouterStore.deleteAllTab()
    // 激活的tab设为null
    useRouterStore.setTabActivated(null)
    $router.push('/home')
    return
  }

  //当前打开的标签页索引
  const tabActivatedIndex = useRouterStore.tabList.findIndex(
    (item) => item.routeName === useRouterStore.tabActivated!.routeName,
  )

  const tabClosedArr = [] //要关闭的tab

  if (type === '左') {
    //依次拿出左边的tab
    for (let i = 0; i < tabActivatedIndex; i++) {
      tabClosedArr.push(useRouterStore.tabList[i])
    }
  }

  if (type === '右') {
    //依次拿出右边的tab
    const length = useRouterStore.tabList.length
    for (let i = tabActivatedIndex + 1; i < length; i++) {
      tabClosedArr.push(useRouterStore.tabList[i])
    }
  }

  tabClosedArr.forEach((item) => {
    //TabList中删除tab
    useRouterStore.setTabList(item, '删除')
  })
}

//左右移动标签
function moveFn(direction: 'left' | 'right') {
  if (direction === 'left') {
    bs.scrollBy(100, 0, 200)
  } else {
    bs.scrollBy(-100, 0, 200)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';

.scroll-wrapper {
  display: flex;
  padding-bottom: 5px;
  .left-btn,
  .right-btn {
    cursor: pointer;
    display: flex;
    padding-top: 4px;
    width: 30px;
  }
  .scroll-box {
    flex: 1;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
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
}
</style>
