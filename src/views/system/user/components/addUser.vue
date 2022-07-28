<template>
  <el-form
    ref="addFormRef"
    :model="addForm"
    :rules="formRules"
    label-width="80px">
    <el-row :gutter="24" justify="center">
      <el-col :span="11">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="手机号码" prop="userPhone">
          <el-input v-model="addForm.userPhone" type="text" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24" justify="center">
      <el-col :span="11">
        <el-form-item label="角色" prop="roleId">
          <el-select
            v-model="addForm.roleId"
            style="width: 100%"
            placeholder="请选择角色">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="所属部门" prop="departmentId">
          <el-tree-select
            v-model="addForm.departmentId"
            style="width: 100%"
            :default-expand-all="true"
            :data="departments"
            :props="treeConfig" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus/es'
import { fetchAddUser } from '@/api'
import { checkPhone } from '@/utils'

interface Props {
  roles: Api.RoleType[]
  departments: any[]
}
interface Emits {
  (e: 'done', val: boolean): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const addForm = reactive({
  userName: '',
  userPhone: '',
  roleId: '',
  departmentId: '',
})
const verifyPhone = (rule: any, value: any, callback: any) => {
  if (!value.trim()) {
    return callback(new Error('手机号码不能为空'))
  }
  if (!checkPhone(value)) {
    return callback(new Error('手机号码格式有误'))
  }
  callback()
}
const formRules = reactive<FormRules>({
  userName: { required: true, message: '用户名不能为空', trigger: 'blur' },
  userPhone: { required: true, validator: verifyPhone, trigger: 'change' },
  roleId: { required: true, message: '请授予用户角色', trigger: 'change' },
  departmentId: {
    required: true,
    message: '请分配用户所属部门',
    trigger: 'change',
  },
})

const treeConfig = shallowRef({
  label: 'name',
  value: 'id',
})
const addFormRef = ref<FormInstance>()
const submitForm = async () => {
  if (!addFormRef.value) return
  await addFormRef.value.validate(async (valid) => {
    if (valid) {
      // 组织请求参数，处理完毕发送done事件
      const params = {
        userName: addForm.userName,
        userPhone: addForm.userPhone,
        roleId: addForm.roleId,
        departmentId: addForm.departmentId,
      }
      try {
        const { data } = await fetchAddUser(params)
        if (data) {
          ElMessage.success('新增用户信息成功！')
          emit('done', true)
        }
      } catch (e) {
        emit('done', false)
      }
    } else {
      // 表单验证未通过
      emit('done', false)
    }
  })
}
defineExpose({ submitForm })
</script>

<style scoped></style>
