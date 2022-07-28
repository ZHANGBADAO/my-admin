<template>
  <el-form
    ref="editFormRef"
    :model="editForm"
    :rules="formRules"
    label-width="80px">
    <el-row :gutter="24" justify="center">
      <el-col :span="11">
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="editForm.userName"
            type="text"
            placeholder="请输入用户名"
            clearable />
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="手机号码" prop="userPhone">
          <el-input
            v-model="editForm.userPhone"
            disabled
            type="text"
            placeholder="请输入手机号码"
            clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24" justify="center">
      <el-col :span="11">
        <el-form-item label="角色" prop="roleId">
          <el-select
            v-model="editForm.roleId"
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
            v-model="editForm.departmentId"
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
import { ElMessage } from 'element-plus'
import { fetchModifyUser, fetchUser } from '@/api'
import { consoleError } from '@/utils'

interface Props {
  userId: string
  roles: Api.RoleType[]
  departments: any[]
}
interface Emits {
  (e: 'done', val: boolean): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const editForm = reactive({
  userName: '',
  userPhone: '',
  roleId: '',
  departmentId: '',
})
const formRules = reactive<FormRules>({
  userName: { required: true, message: '用户名不能为空', trigger: 'blur' },
  roleId: { required: true, message: '请授予用户角色', trigger: 'change' },
  departmentId: {
    required: true,
    message: '请分配用户所属部门',
    trigger: 'change',
  },
})
const editFormRef = ref<FormInstance>()
const treeConfig = shallowRef({
  label: 'name',
  value: 'id',
})
const submitForm = async () => {
  if (!editFormRef.value) return
  await editFormRef.value.validate(async (valid) => {
    if (valid) {
      // 组织请求参数，处理完毕发送done事件
      const params = {
        id: props.userId,
        userName: editForm.userName,
        roleId: editForm.roleId,
        departmentId: editForm.departmentId,
      }
      try {
        const { data } = await fetchModifyUser(params)
        if (data) {
          ElMessage.success('编辑用户信息成功！')
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
const getUserInfo = async () => {
  if (!props.userId) return
  try {
    const { data } = await fetchUser(props.userId)
    if (data) {
      editForm.userName = data.userName
      editForm.userPhone = data.userPhone
      editForm.roleId = data.roleId || ''
      editForm.departmentId = data.departmentId || ''
    }
  } catch (err) {
    consoleError('加载用户信息失败', err)
  }
}
onMounted(() => {
  getUserInfo()
})
defineExpose({ submitForm })
</script>

<style scoped></style>
