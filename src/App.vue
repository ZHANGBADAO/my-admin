<template>
  <el-config-provider :locale="elConfig.locale" :size="elConfig.size">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const elConfig = reactive({
  locale: zhCn,
  size: 'default',
})
</script>

<style lang="scss">
@use '@/styles/common.scss';
//@use '@/styles/tailwindcss.scss';
</style>
