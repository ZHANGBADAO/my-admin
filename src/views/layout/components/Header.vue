<template>
  <el-header class="flex justify-between items-center">
    <div class="left-box">
      <img src="" alt="" />
      <span>窗口售票系统</span>
    </div>
    <div class="middle-box"></div>
    <div class="right-box">
      <el-dropdown>
        <div class="flex items-center">
          <div class="mr-2">{{ useAuthStore.getUserInfo.userName }}</div>
          <el-image
            :src="useAuthStore.getUserInfo.avatar"
            style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              cursor: pointer;
            "
            fit="cover" />
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item @click="logOutHandle">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { authStore } from '@/store/modules'
const useAuthStore = authStore()

function logOutHandle() {
  useAuthStore.manualLoginOut()
}
</script>

<style lang="scss" scoped></style>
