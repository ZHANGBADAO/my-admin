<template>
  <el-form :model="editForm" label-width="80px">
    <el-row :gutter="24" justify="center">
      <el-col :span="11">
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="editForm.userName"
            disabled
            type="text"
            clearable />
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="手机号码" prop="userPhone">
          <el-input
            v-model="editForm.userPhone"
            disabled
            type="text"
            clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24" justify="center">
      <el-col :span="11">
        <el-form-item label="角色" prop="roleId">
          <el-select
            v-model="editForm.roleId"
            disabled
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
            disabled
            style="width: 100%"
            :default-expand-all="true"
            :data="departments"
            :props="treeConfig" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24" justify="center">
      <el-col :span="11">
        <el-form-item label="状态" prop="deleteFlag">
          <el-switch
            v-model="editForm.deleteFlag"
            disabled
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949" />
        </el-form-item>
      </el-col>
      <el-col :span="11"></el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { fetchUser } from '@/api'
import { consoleError } from '@/utils'

interface Props {
  userId: string
  roles: Api.RoleType[]
  departments: any[]
}
const props = defineProps<Props>()
const editForm = reactive({
  userName: '',
  userPhone: '',
  deleteFlag: 0,
  roleId: '',
  departmentId: '',
})
const treeConfig = shallowRef({
  label: 'name',
  value: 'id',
})
const getUserInfo = async () => {
  if (!props.userId) return
  try {
    const { data } = await fetchUser(props.userId)
    if (data) {
      editForm.userName = data.userName
      editForm.userPhone = data.userPhone
      editForm.deleteFlag = data.deleteFlag
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
</script>

<style scoped></style>
