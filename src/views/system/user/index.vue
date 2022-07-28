<template>
  <div class="container-box">
    <el-form ref="searchFormRef" :inline="true" :model="searchForm">
      <el-form-item prop="userName">
        <el-input
          v-model="searchForm.userName"
          placeholder="用户名"
          clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="search"
          >查 询</el-button
        >
        <el-button type="default" :icon="RefreshLeft" @click="reset()"
          >重 置</el-button
        >
      </el-form-item>
      <el-form-item class="float-right">
        <el-button type="primary" :icon="Plus" @click="showAddUserDialog"
          >新增用户</el-button
        >
      </el-form-item>
    </el-form>
    <div class="table-wrapper">
      <el-table v-loading="tableLoading" :data="userList" stripe border>
        <el-table-column label="头像" width="100">
          <template #default="scope">
            <el-avatar
              :src="
                scope.row.avatar ??
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
              " />
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="120" />
        <el-table-column prop="userPhone" label="手机号码" />
        <el-table-column prop="ctime" label="创建时间" />
        <el-table-column prop="utime" label="修改时间" />
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag
              v-if="scope.row.deleteFlag === 1"
              effect="dark"
              type="success"
              >正常</el-tag
            >
            <el-tag v-else effect="dark" type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-tooltip content="查看用户详情">
              <el-button
                circle
                type="default"
                :icon="Document"
                @click="showDetailUserDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.deleteFlag" content="编辑用户信息">
              <el-button
                circle
                type="primary"
                :icon="Edit"
                @click="showEditUserDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-popconfirm
              v-if="scope.row.deleteFlag"
              title="您确定要删除该用户？"
              confirm-button-type="danger"
              @confirm="changeUserStatus(scope.row.id)">
              <template #reference>
                <el-button circle type="danger" :icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="state.pageNum"
        v-model:page-size="state.pageSize"
        :background="pager.background"
        :page-sizes="pager.pageSizes"
        :small="pager.small"
        :layout="pager.layout"
        :total="state.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <el-dialog
      v-model="dialogVisible"
      destroy-on-close
      draggable
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @open="loadBaseResource"
      @opened="changeContentLoading">
      <template #header>
        <span>{{ dialogTitle }}</span>
      </template>
      <div v-loading="dialogContentLoading">
        <component
          :is="currentComponent"
          ref="componentRef"
          :user-id="currentUserId"
          :roles="roleList"
          :departments="departmentList"
          @done="formDoneEvent">
        </component>
      </div>
      <template #footer>
        <el-button type="default" @click="closeDialog">取消</el-button>
        <el-button
          v-if="optionState === 'add'"
          type="primary"
          :loading="submitLoading"
          @click="saveForm"
          >保存</el-button
        >
        <el-button
          v-if="optionState === 'edit'"
          type="primary"
          :loading="submitLoading"
          @click="saveForm"
          >更新</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  Search,
  RefreshLeft,
  Edit,
  Document,
  Delete,
  Plus,
} from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import type { Component } from 'vue'
import { ElMessage } from 'element-plus'
import { consoleError, pager } from '@/utils'
import {
  fetchDeleteUser,
  fetchUsers,
  queryRoles,
  departmentFindAll,
} from '@/api'
import type { Tree } from '@/api'
import { AddUser, DetailUser, EditUser } from './components'

interface SearchType {
  userName: string
}
const tableLoading = ref<boolean>(false)
const searchFormRef = ref<FormInstance>()
const dialogVisible = ref<boolean>(false)
const dialogTitle = ref<string>('新增用户')
const optionState = ref<string>('add')
const submitLoading = ref<boolean>(false)
const componentRef = ref()
const currentUserId = ref<string>('')
const roleList = ref<Api.RoleType[]>([])
const departmentList = ref<Tree[]>([])
const dialogContentLoading = ref<boolean>(false)
const searchForm = reactive<SearchType>({
  userName: '',
})
const currentComponent = shallowRef<Component>(AddUser)
const userList = ref<Api.UserType[]>([])
const state = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const handleSizeChange = () => {
  state.pageNum = 1
  handleCurrentChange()
}
const handleCurrentChange = () => {
  search()
}
// 查询
const search = async () => {
  // 准备查询参数
  const params = {
    userName: searchForm.userName,
    pageNum: state.pageNum,
    pageSize: state.pageSize,
  }
  tableLoading.value = true
  try {
    const { data } = await fetchUsers(params)
    if (data) {
      userList.value = data.list
      state.total = data.total
    }
  } catch (error) {
    consoleError('查询用户列表失败', error)
  } finally {
    tableLoading.value = false
  }
}
// 重置
const reset = () => {
  if (!searchFormRef) return
  searchFormRef.value?.resetFields()
  state.pageNum = 1
  search()
}

onMounted(() => {
  search()
})
const showAddUserDialog = async () => {
  openDialog('add', '新增用户', AddUser)
}
const showEditUserDialog = async (userId: string) => {
  currentUserId.value = userId
  openDialog('edit', '编辑用户', EditUser)
}
const showDetailUserDialog = async (userId: string) => {
  currentUserId.value = userId
  openDialog('detail', '用户详情', DetailUser)
}

const loadBaseResource = async () => {
  dialogContentLoading.value = true
  await loadRoleList()
  await loadDepartmentList()
}

const changeContentLoading = () => {
  dialogContentLoading.value = false
}

// 获取角色列表
const loadRoleList = async () => {
  try {
    const { data } = await queryRoles()
    if (data) {
      roleList.value = data.filter((item) => !item.deleteFlag)
    }
  } catch (err) {
    consoleError('获取所有角色数据失败', err)
  }
}
// 获取部门列表
const loadDepartmentList = async () => {
  try {
    const { data } = await departmentFindAll()
    if (data) {
      departmentList.value = data[0].children!
    }
  } catch (err) {
    consoleError('获取所有部门数据失败', err)
  }
}
const openDialog = (
  state: 'add' | 'edit' | 'detail',
  title: string,
  com: Component,
) => {
  optionState.value = state
  dialogTitle.value = title
  currentComponent.value = com
  dialogVisible.value = !dialogVisible.value
}
const changeUserStatus = async (tenantId: string) => {
  const lmInstance = ElMessage({
    message: '处理中...',
    type: 'info',
    duration: 0,
  })
  try {
    const { data } = await fetchDeleteUser({ tenantId })
    if (data) {
      ElMessage.success('用户删除成功！')
      await search()
    }
  } catch (err) {
    consoleError('删除用户失败', err)
  } finally {
    lmInstance.close()
  }
}

const closeDialog = () => {
  dialogVisible.value = false
}
const saveForm = () => {
  submitLoading.value = true
  componentRef.value.submitForm()
}

const formDoneEvent = (val: boolean) => {
  submitLoading.value = false
  if (val) {
    closeDialog()
    reset()
  }
}
</script>

<style scoped lang="scss">
.table-wrapper {
  @apply mt-2;
}
</style>
