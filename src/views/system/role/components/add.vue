<template>
  <el-dialog
    v-model="active"
    title="新增角色"
    width="30%"
    destroy-on-close
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    show-close>
    <el-form ref="formRef" :model="addForm" :rules="rules" label-width="100px">
      <el-form-item label="角色名称：" prop="roleName">
        <el-input
          v-model="addForm.roleName"
          placeholder="请输入角色名称，最多15个字" />
      </el-form-item>
      <el-form-item label="角色描述：" prop="ext">
        <el-input
          v-model="addForm.ext"
          type="textarea"
          placeholder="请输入角色描述，最多30个字" />
      </el-form-item>
      <el-form-item label="权限配置：" prop="menuIds">
        <el-tree-select
          v-model="addForm.menuIds"
          :data="menuTree"
          multiple
          show-checkbox
          default-expand-all />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel(formRef)">取消</el-button>
        <el-button type="primary" @click="handleSubmit(formRef)"
          >提交</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { routerStore } from '@/store/modules'
import { createRole } from '@/api'

const active = ref(false)
const activate = () => {
  active.value = true
}
const menuTree = routerStore().menus
const emit = defineEmits(['refresh-list'])
const formRef = ref<FormInstance>()
const addForm = reactive<Api.RoleType>({
  roleName: '',
  ext: '',
  menuIds: [],
})
const rules = reactive<FormRules>({
  roleName: [
    { required: true, message: '角色名称必填！', trigger: 'blur' },
    {
      min: 2,
      max: 15,
      message: '角色名称长度在2到15个字之间！',
      trigger: 'blur',
    },
  ],
  ext: [
    { required: true, message: '角色描述必填！', trigger: 'blur' },
    { max: 30, message: '角色描述最多50个字！', trigger: 'blur' },
  ],
  menuIds: [{ required: true, message: '权限设置必填！', trigger: 'change' }],
})
// 取消
const handleCancel = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  active.value = false
}
// 创建角色
const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await createRole(addForm)
      ElMessage({
        message: '角色创建成功！',
        type: 'success',
      })
      active.value = false
      emit('refresh-list')
    } else {
      console.log('error submit!', fields)
    }
  })
}

defineExpose({
  activate,
})
</script>

<style lang="scss" scoped></style>
