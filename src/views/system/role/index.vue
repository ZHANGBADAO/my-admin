<template>
  <div class="container-box">
    <div class="ml-[12px]">
      <el-space
        v-loading="state.loading"
        direction="horizontal"
        :size="20"
        wrap>
        <el-card
          v-for="role in state.roleList"
          :key="role.id"
          class="box-card w-[280px]">
          <template #header>
            <div class="card-header flex justify-between">
              <div class="flex">
                <Icon icon="carbon:user-avatar" width="24" />&nbsp;&nbsp;<span
                  class="text-[#333] font-medium"
                  >{{ role.roleName }}</span
                >
              </div>
              <el-dropdown placement="bottom-end">
                <Icon icon="clarity:settings-solid" width="20" />
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="handleCheckAuth(role)"
                      >查看权限&nbsp;&nbsp;&nbsp;&nbsp;</el-dropdown-item
                    >
                    <el-dropdown-item @click="handleSetAuth(role)"
                      >配置权限&nbsp;&nbsp;&nbsp;&nbsp;</el-dropdown-item
                    >
                    <el-dropdown-item @click="handleDelete(role)"
                      >删除角色&nbsp;&nbsp;&nbsp;&nbsp;</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
          <div class="text-center">
            <el-tooltip :content="role.ext" placement="bottom" effect="light">
              <p class="text-2 text-[14px] text-[#666]">
                {{ role.ext }}
              </p>
            </el-tooltip>
            <p class="text-[14px] text-[#999] mt-[8px] mb-[40px]">
              {{
                !!role.userCount
                  ? `该角色已关联 ${role.userCount} 个账号`
                  : '该角色目前尚未关联账号'
              }}
            </p>
            <el-button @click="handleRelateMember(role)">关联账号</el-button>
          </div>
        </el-card>
        <el-card class="box-card w-[280px]">
          <template #header>
            <div class="card-header">
              <div class="flex">
                <Icon icon="carbon:user-avatar" width="24" />&nbsp;&nbsp;<span
                  class="text-[#333] font-medium"
                  >自定义角色</span
                >
              </div>
            </div>
          </template>
          <div class="text-center">
            <div class="flex justify-center">
              <Icon icon="carbon:add" color="#666" width="48" />
            </div>
            <p class="text-2 text-[14px] text-[#666] mb-[40px]">
              新增自定义角色，灵活管理平台权限
            </p>
            <el-button type="primary" plain @click="handleAdd"
              >新增角色</el-button
            >
          </div>
        </el-card>
      </el-space>
    </div>
    <add-role ref="addRef" @refresh-list="getRoleList"></add-role>
    <set-auth ref="setAuthRef" @refresh-list="getRoleList"></set-auth>
    <check-auth ref="checkAuthRef"></check-auth>
    <relate-member
      ref="relateMemberRef"
      @refresh-list="getRoleList"></relate-member>
  </div>
</template>

<script lang="ts">
export default {
  name: 'system_role',
}
</script>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { Icon } from '@iconify/vue'
import { AddRole, SetAuth, CheckAuth, RelateMember } from './components'
import { queryRoles, deleteRole } from '@/api'
import { consoleError } from '@/utils'

const state = reactive<{ roleList: Api.RoleType[]; loading: boolean }>({
  roleList: [],
  loading: false,
})
// open -> 添加角色
const addRef = ref<InstanceType<typeof AddRole> | null>(null)
const handleAdd = () => {
  addRef.value.activate()
}
// open -> 设置权限
const setAuthRef = ref<InstanceType<typeof SetAuth> | null>(null)
const handleSetAuth = (role: Api.RoleType) => {
  setAuthRef.value.activate(role)
}
// open -> 查看权限
const checkAuthRef = ref<InstanceType<typeof CheckAuth> | null>(null)
const handleCheckAuth = (role: Api.RoleType) => {
  checkAuthRef.value.activate(role)
}
// open -> 关联员工
const relateMemberRef = ref<InstanceType<typeof RelateMember> | null>(null)
const handleRelateMember = (role: Api.RoleType) => {
  relateMemberRef.value.activate(role)
}
// 删除角色
const handleDelete = (role: Api.RoleType) => {
  ElMessageBox.confirm(
    '角色删除将一并删除原本配置的权限和关联员工',
    `确认要删除“${role.roleName}”角色吗？`,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      await deleteRole({ roleId: role.id })
      await getRoleList()
      ElMessage({
        type: 'success',
        message: '已删除',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}
// 获取角色列表
const getRoleList = async () => {
  state.loading = true
  try {
    const { data } = await queryRoles()
    state.roleList = data as Api.RoleType[]
  } catch (err) {
    consoleError('获取角色列表数据失败', err)
  } finally {
    state.loading = false
  }
}

onMounted(() => {
  getRoleList()
})
</script>

<style lang="scss" scoped>
.text-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
