<template>
  <el-container direction="vertical" class="big-box">
    <Header height="50px" />

    <el-container style="height: calc(100vh - 50px)">
      <Aside />
      <el-container>
        <el-header style="height: unset">
          <TabBar />
        </el-header>
        <el-main style="padding-top: 0; padding-bottom: 0">
          <MainView />
        </el-main>
        <el-footer height="50px" class="flex justify-center items-center">
          <span>底部信息</span>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Header, MainView, Aside, TabBar } from './components'
</script>

<style scoped lang="scss">
.big-box {
  background: var(--gray-color-1);
}
</style>
