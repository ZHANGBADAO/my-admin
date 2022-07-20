<template>
  <el-main>
    <div class="" style="height: calc(100vh - 160px)">
      <el-scrollbar>
        <RouterView v-slot="{ Component, route }">
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
import { routerStore } from '@/store/modules'

const asyncRouterStore = routerStore()

const keepAliveComponents = computed(() => {
  return asyncRouterStore.keepAliveComponents
})
</script>

<style lang="scss" scoped>

</style>
