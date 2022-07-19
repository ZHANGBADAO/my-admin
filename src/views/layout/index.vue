<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <div class="flex bg-amber-300">
        <el-button type="success">按钮</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { routerStore } from '@/store/modules'
const useRouterStore = routerStore()
useRouterStore.getUserResourceAndTransform().then((res) => {
  console.log('路由', res)
})
</script>

<style scoped lang="scss"></style>
