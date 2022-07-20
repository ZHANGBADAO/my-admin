<template>
  <el-container direction="vertical">
    <Header height="50px" />

    <el-container style="height: calc(100vh - 50px)">
      <Aside />
      <el-container>
        <MainView />
        <el-footer height="50px">底部信息</el-footer>
      </el-container>
    </el-container>

  </el-container>
</template>

<script lang="ts" setup>
import {Header, MainView,Aside} from './components'

</script>

<style scoped lang="scss"></style>
