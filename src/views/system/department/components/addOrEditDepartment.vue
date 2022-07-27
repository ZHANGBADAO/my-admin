<template>
  <el-dialog v-model="showModal" :title="modalTitle" width="500px">
    <el-form
      ref="formRef"
      :model="userForm"
      :rules="rules"
      label-width="120px"
      :inline="true">
      <el-form-item label="父节点" prop="pid">
        <el-tree-select
          v-model="userForm.pid"
          :disabled="modalTitle === '添加子部门'"
          :data="deptTree"
          :props="{
            children: 'children',
            label: 'name',
            value: 'id',
          }"
          :default-expand-all="true"
          :expand-on-click-node="false"
          @node-click="handleNodeClick" />
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="userForm.name" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showModalFn(false)">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { addDepartmentApi, editDepartmentApi } from '@/api'

const emit = defineEmits(['addDone'])
const props = defineProps({
  deptTree: {
    type: Array,
  },
})

// 控制弹窗显示
const showModal = ref(false)
const showModalFn = (show: boolean) => {
  showModal.value = show
}

// 控制弹窗标题
const formRef = ref<FormInstance>()
const modalTitle = ref('')

// 弹窗的数据
const userForm = reactive({
  name: '',
  pid: '',
  id: '',
})
const rules: FormRules = {
  pid: {
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择父节点',
  },
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入部门名称',
  },
}

// 添加部门/修改/添加子部门
const editDepartment = (
  type: '修改' | '添加子部门' | '添加部门',
  row?: any,
) => {
  modalTitle.value = type
  formRef.value?.resetFields()

  if (type === '添加部门') {
    userForm.pid = ''
    userForm.name = ''
    userForm.id = ''
  }

  if (type === '添加子部门') {
    userForm.pid = row.id
    userForm.name = ''
    userForm.id = ''
  }

  if (type === '修改') {
    userForm.pid = row.pid
    userForm.name = row.name
    userForm.id = row.id
  }
  showModalFn(true)
}

// 获取部门树形下拉选择
const handleNodeClick = (data: { id: string }) => {
  userForm.pid = data.id
}

// 保存
const handleSubmit = () => {
  formRef.value?.validate((valid) => {
    if (!valid) {
      return
    }

    const params = {
      pid: userForm.pid,
      name: userForm.name,
      id: userForm.id,
    }
    if (['添加部门', '添加子部门'].includes(modalTitle.value)) {
      addDepartmentApi(params).then(() => {
        showModalFn(false)
        ElMessage.success('添加成功')
        emit('addDone', true)
      })
    } else {
      editDepartmentApi(params).then(() => {
        showModalFn(false)
        ElMessage.success('操作成功')
        emit('addDone', true)
      })
    }
  })
}

defineExpose({
  showModalFn,
  editDepartment,
})
</script>
