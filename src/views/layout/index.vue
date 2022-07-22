<template>
  <el-container direction="vertical" class="big-box">
    <Header height="50px" />

    <el-container style="height: calc(100vh - 50px)">
      <Aside />
      <el-container>
        <TabBar />
        <MainView />
        <el-footer height="50px" class="flex justify-center items-center"
          >底部信息</el-footer
        >
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Header, MainView, Aside, TabBar } from './components'
</script>

<style scoped lang="scss">
@import '@/styles/variable.scss';
.big-box {
  background: $gray-color-1;
}
</style>
