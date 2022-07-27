<template>
  <el-dialog v-model="showModal" :title="modalTitle" width="500px">
    <el-tree-select
      v-model="selectedDeptId"
      :data="deptTree"
      :props="{
        children: 'children',
        label: 'name',
        value: 'id',
      }"
      :default-expand-all="true"
      :expand-on-click-node="false"
      @node-click="handleTreeSelectValue" />

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
import { switchDepartment } from '@/api'

const props = defineProps({
  deptTree: {
    type: Array,
  },
})
const emit = defineEmits(['addDone'])

// 控制弹窗标题
const modalTitle = ref('切换部门')
// 控制弹窗显示
const showModal = ref(false)
const showModalFn = (show: boolean) => {
  showModal.value = show
}

// 初始化
const userIds = ref([])
const init = (ids: []) => {
  showModalFn(true)
  userIds.value = ids
}

// 获取部门树形下拉选择
const selectedDeptId = ref('')
const handleTreeSelectValue = (data: { id: string }) => {
  selectedDeptId.value = data.id
}

// 提交
const handleSubmit = async () => {
  if (!selectedDeptId.value) {
    ElMessage.error('请选择部门')
    return
  }

  const args = {
    departmentId: selectedDeptId.value,
    userIdList: userIds.value,
  }
  switchDepartment(args).then(() => {
    ElMessage.success('切换部门成功')
    showModalFn(false)
    emit('addDone')
  })
}

defineExpose({
  init,
})
</script>

<style scoped></style>
