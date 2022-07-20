<template>
  <el-main>
    <div class="content-box">
      <el-scrollbar>
        <RouterView v-slot="{ Component, route }">

          <el-breadcrumb separator="/" style="pointer-events:none; margin-bottom: 20px;">
            <el-breadcrumb-item v-for="item in route.meta.breadCrumb"
                                :key="item.routeName"
                                :to="{name: item.routeName}"
            >
              {{ item.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>

          <transition name="fade-bottom" mode="out-in" appear>
            <keep-alive :include="keepAliveComponents">
              <component :is="Component" :key="route.name"></component>
            </keep-alive>
          </transition>

        </RouterView>
      </el-scrollbar>
    </div>
  </el-main>
</template>

<script lang="ts" setup>
import {routerStore} from '@/store/modules'

const asyncRouterStore = routerStore()

const keepAliveComponents = computed(() => {
  return asyncRouterStore.keepAliveComponents
})
</script>

<style lang="scss" scoped>
.content-box {
  height: 100%;
  background: #f6f6f6;
  border-radius: 10px;
  padding: 10px;
}

/*底部消退*/
.fade-bottom-enter-active,
.fade-bottom-leave-active {
  transition: opacity 0.25s, transform 0.3s;
}

.fade-bottom-enter-from {
  opacity: 0;
  transform: translateY(-10%);
}

.fade-bottom-leave-to {
  opacity: 0;
  transform: translateY(10%);
}
</style>
