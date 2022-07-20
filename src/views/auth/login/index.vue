<template>
  <div class="flex justify-center items-center h-[100vh]" style="">
    <div class="login-box w-[500px]">
      <el-form
        label-width="100px"
        ref="formRef"
        :model="formModel"
        :rules="rules"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="formModel.account"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formModel.password" type="password"/>
        </el-form-item>

        <div class="flex justify-center">
          <el-button type="primary" @click="submit">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {FormInstance, FormRules} from 'element-plus'
import {ElMessage} from "element-plus";
import {useRouter} from 'vue-router'
import { authStore } from '@/store/modules'

const useAuthStore = authStore()
const router = useRouter()

const formRef = ref<FormInstance>()
const formModel = reactive({
  account: '',
  password: '',
})

const rules = reactive<FormRules>({
  account: [
    {required: true, message: '请输入', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入', trigger: 'blur'},
  ],
})

function submit() {
  formRef.value!.validate((valid) => {
    if (!valid) return

    useAuthStore.login({
      userPhone: formModel.account,
      password: formModel.password,
      verifyCode: '',
      platform: '',
    }).then(res => {
      ElMessage.success('登录成功')
      router.push('/home')
    })
  })
}
</script>

<style scoped>

</style>
