<template>
  <el-header class="flex justify-between items-center">
    <div class="left-box">
      <img src="" alt="" />
      <span>窗口售票系统</span>
    </div>
    <div class="middle-box"></div>
    <div class="right-box flex items-center">
      <el-switch
        v-model="themeStatus"
        active-value="light"
        inactive-value="dark"
        class="mr-4"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="Moon" />

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
import { Sunny, Moon } from '@element-plus/icons-vue'
import { authStore } from '@/store/modules'
const useAuthStore = authStore()

function logOutHandle() {
  useAuthStore.manualLoginOut()
}

//切换主题
const themeStatus = ref(localStorage.getItem('theme') || 'light')
const htmlNode = document.querySelector('html')
htmlNode!.classList.add(themeStatus.value)

watch(themeStatus, () => {
  changeThemeFn()
})
function changeThemeFn() {
  if (htmlNode!.classList.contains('light')) {
    htmlNode!.classList.remove('light')
    htmlNode!.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    htmlNode!.classList.remove('dark')
    htmlNode!.classList.add('light')
    localStorage.setItem('theme', 'light')
  }
}
</script>

<style lang="scss" scoped></style>
