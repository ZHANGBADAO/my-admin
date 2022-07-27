<template>
  <div class="container-box">
    <div class="top-box flex justify-between">
      <div class="left flex">
        <el-input
          v-model="departmentName"
          placeholder="输入部门名称"
          style="margin-right: 30px" />
        <el-button
          type="primary"
          round
          style="margin-right: 10px"
          @click="getChildDepartmentByName"
          >搜索
        </el-button>
        <el-button round @click="resetHandler">重置</el-button>
      </div>
      <div class="right">
        <el-button type="primary" @click="addDepartmentHandler"
          >添加部门</el-button
        >
      </div>
    </div>

    <div class="bottom-box" style="padding-top: 50px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="box-card">
            <el-tree
              ref="treeRef"
              v-loading="treeLoading"
              :filter-node-method="filterNode"
              :default-expand-all="true"
              :expand-on-click-node="false"
              :data="departmentTree"
              :props="{
                children: 'children',
                label: 'name',
              }"
              @node-click="handleNodeClick" />
          </el-card>
        </el-col>
        <el-col :span="18">
          <div class="top" style="margin-bottom: 20px">
            <el-tag>部门列表</el-tag>
            <el-table
              v-loading="departmentTableData.loading"
              :data="departmentTableData.data"
              style="width: 100%">
              <el-table-column prop="name" label="名称" />
              <el-table-column prop="ctime" label="创建时间" />
              <el-table-column label="操作" width="400">
                <template #default="scope">
                  <el-button
                    type="primary"
                    text
                    style="margin-left: -15px"
                    @click="handleDepartmentEdit(scope.$index, scope.row)">
                    修改
                  </el-button>
                  <el-button
                    type="danger"
                    text
                    @click="handleDepartmentDelete(scope.$index, scope.row)"
                    >删除
                  </el-button>
                  <el-button
                    type="primary"
                    text
                    @click="handleDepartmentAdd(scope.$index, scope.row)"
                    >添加子部门
                  </el-button>
                  <el-button
                    type="primary"
                    text
                    @click="handleDepartmentView(scope.$index, scope.row)"
                    >查看员工
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="bottom">
            <el-tag>部门员工</el-tag>
            <el-table
              v-loading="departmentStuffTableData.loading"
              :data="departmentStuffTableData.data"
              style="width: 100%"
              @selection-change="handleStuffTableCheckChange">
              <el-table-column type="selection" width="55" />
              <el-table-column prop="userName" label="姓名" />
              <el-table-column prop="department" label="所属部门" />
              <el-table-column
                label="操作"
                width="400"
                style="margin-left: -15px">
                <template #default="scope">
                  <el-button
                    type="danger"
                    text
                    @click="handleRemovePositiveClick(scope.$index, scope.row)"
                    >移除
                  </el-button>
                  <el-button
                    type="primary"
                    text
                    @click="handleChangeDepartment(scope.$index, scope.row)"
                    >切换部门
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="btn-box" style="padding-top: 20px">
              <el-popconfirm
                title="确定从当前部门中移除?"
                confirm-button-text="确定"
                cancel-button-text="取消"
                @confirm="handleBatchRemove">
                <template #reference>
                  <el-button>批量移除</el-button>
                </template>
              </el-popconfirm>
              <el-button @click="handleBatchChangeDepartment"
                >批量切换</el-button
              >
            </div>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="
                  departmentStuffTableData.pagination.pageIndex
                "
                v-model:page-size="departmentStuffTableData.pagination.pageSize"
                :background="pager.background"
                :page-sizes="pager.pageSizes"
                :small="pager.small"
                :layout="pager.layout"
                :total="departmentStuffTableData.pagination.total"
                @size-change="handleQueryMemberSizeChange"
                @current-change="onQueryMember" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <AddOrEditDepartment
      ref="addOrEditDepartmentRef"
      :dept-tree="departmentTree"
      @addDone="getDepartmentTree" />
    <ToggleDepartment
      ref="toggleDepartmentRef"
      :dept-tree="departmentTree"
      @addDone="onQueryMember" />
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTree } from 'element-plus'
import {
  departmentFindAll,
  findByDepartmentName,
  findUserByDepartmentId,
  removeDepartmentMember,
  deleteDepartment,
} from '@/api'
import type { Tree, DepartmentInfo } from '@/api'
import { AddOrEditDepartment, ToggleDepartment } from './components'
import { pager } from '@/utils'

onMounted(() => {
  getDepartmentTree() // 左侧树
})

// 顶部===========================
const addOrEditDepartmentRef = ref<typeof AddOrEditDepartment>()
const toggleDepartmentRef = ref<typeof ToggleDepartment>()
const departmentName = ref('')
// 添加部门
const addDepartmentHandler = () => {
  addOrEditDepartmentRef.value?.editDepartment('添加部门')
}
const resetHandler = () => {
  departmentName.value = ''
  getChildDepartmentByName()
}

// 左侧===========================
const departmentTree = ref<Tree[]>()
const treeLoading = ref(false)
const selectedIdInDepartmentTree = ref('') // 部门树选中的id
// 部门树
const treeRef = ref<InstanceType<typeof ElTree>>()
const filterNode = (value: string, data: any) => {
  if (!value) return true
  return data.name.includes(value)
}

// 获取部门树
const getDepartmentTree = (isRefresh?: boolean) => {
  treeLoading.value = true
  departmentFindAll()
    .then(({ data }) => {
      if (data) {
        departmentTree.value = [
          {
            name: 'root',
            id: '-1',
            children: data[0].children,
          },
        ]
      }

      if (isRefresh) {
        _queryType === '通过id查询'
          ? getChildDepartmentById()
          : getChildDepartmentByName()
      }
    })
    .catch(() => {
      departmentTree.value = [
        {
          name: 'root',
          id: '-1',
          children: [],
        },
      ]
    })
    .finally(() => {
      treeLoading.value = false
    })
}
// 获取子节点的部门列表
const getChildDepartmentById = () => {
  const args = {
    departmentIdlist: [selectedIdInDepartmentTree.value],
  }
  getChildDepartment(args, '通过id查询')
}
const getChildDepartmentByName = () => {
  const args = {
    departmentName: departmentName.value,
  }
  getChildDepartment(args, '通过name查询')

  treeRef.value!.filter(departmentName.value)
}
let _queryType = ''
const getChildDepartment = (args: any, type: string) => {
  _queryType = type
  departmentTableData.loading = true
  findByDepartmentName(args)
    .then(({ data }) => {
      if (data) {
        departmentTableData.data = data
      }
      departmentStuffTableData.data = []
    })
    .finally(() => {
      departmentTableData.loading = false
    })
}
// 点击节点获取右侧部门列表
const handleNodeClick = (data: { id: string }) => {
  selectedIdInDepartmentTree.value = data.id as string
  getChildDepartmentById()
}

// 右侧===========================
// 部门列表
const departmentTableData = reactive<{
  loading: boolean
  data: DepartmentInfo[]
}>({
  loading: false,
  data: [],
})

const handleDepartmentEdit = (idx: number, row: any) => {
  addOrEditDepartmentRef.value?.editDepartment('修改', row)
}
const handleDepartmentDelete = (idx: number, row: any) => {
  ElMessageBox.confirm('确定删除吗?', '提示', {
    type: 'warning',
  }).then(() => {
    deleteDepartment({
      id: row.id,
    }).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getDepartmentTree(true)
    })
  })
}
const handleDepartmentAdd = (idx: number, row: any) => {
  addOrEditDepartmentRef.value?.editDepartment('添加子部门', row)
}
const handleDepartmentView = (idx: number, row: any) => {
  departmentStuffTableData.departmentId = row.id
  onQueryMember()
}
// 部门员工
const departmentStuffTableData = reactive<any>({
  loading: false,
  data: [],
  selectedRowKeys: [],
  departmentId: '',
  pagination: {
    pageIndex: 1,
    pageSize: 10,
    total: 0,
  },
})
// 查询部门下员工
const onQueryMember = () => {
  departmentStuffTableData.selectedRowKeys = []
  const args = {
    departmentIdlist: [departmentStuffTableData.departmentId],
    page: departmentStuffTableData.pagination.pageIndex,
    size: departmentStuffTableData.pagination.pageSize,
  }
  departmentStuffTableData.loading = true
  findUserByDepartmentId(args)
    .then(({ data }) => {
      if (data) {
        departmentStuffTableData.data = data.list
        departmentStuffTableData.pagination.total = data.total
      }
    })
    .catch(() => {
      departmentStuffTableData.data = []
      departmentStuffTableData.pagination.total = 0
    })
    .finally(() => {
      departmentStuffTableData.loading = false
    })
}
const handleQueryMemberSizeChange = (size: number) => {
  departmentStuffTableData.pagination.pageSize = size
  onQueryMember()
}
// 获取选择的员工
const handleStuffTableCheckChange = (selectedRow: any) => {
  departmentStuffTableData.selectedRowKeys = selectedRow.map(
    (item: any) => item.id,
  )
}
// 移除员工
const handleRemovePositiveClick = (idx: number, row: any) => {
  ElMessageBox.confirm('确定移除吗?', '提示', {
    type: 'warning',
  }).then(() => {
    departmentStuffTableData.selectedRowKeys = [row.id]
    handleBatchRemove()
  })
}
// 批量移除员工
const handleBatchRemove = () => {
  if (departmentStuffTableData.selectedRowKeys.length === 0) {
    ElMessage({
      type: 'warning',
      message: '请选择要移除的员工',
    })
    return
  }
  const args = {
    departmentId: departmentStuffTableData.departmentId,
    userIdList: departmentStuffTableData.selectedRowKeys,
  }
  removeDepartmentMember(args).then(() => {
    ElMessage({
      type: 'success',
      message: '移除成功',
    })
    departmentStuffTableData.pagination.pageIndex = 1
    onQueryMember()
  })
}
// 切换部门
const handleChangeDepartment = (idx: number, row: any) => {
  toggleDepartmentRef.value?.init([row.id])
}
// 批量切换部门
const handleBatchChangeDepartment = () => {
  if (departmentStuffTableData.selectedRowKeys.length === 0) {
    ElMessage({
      type: 'warning',
      message: '请选择要切换的员工',
    })
    return
  }
  toggleDepartmentRef.value?.init(departmentStuffTableData.selectedRowKeys)
}
</script>

<style scoped lang="scss">
.el-card {
  min-height: 375px;
  box-shadow: none !important;
}
</style>
