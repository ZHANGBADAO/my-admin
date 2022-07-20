<template>
  <el-container direction="vertical">

    <Header />

    <el-container style="height: calc(100vh - 60px)">
      <Aside />
      <el-container>
        <MainView />
        <el-footer class="">底部信息</el-footer>
      </el-container>
    </el-container>

  </el-container>
</template>

<script lang="ts" setup>
import {Header, MainView,Aside} from './components'

</script>

<style scoped lang="scss"></style>
