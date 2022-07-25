<template>
  <el-dialog
    v-model="active"
    :title="`配置权限 - ${state.roleInfo.roleName}`"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    show-close
    destroy-on-close>
    <div class="flex justify-between">
      <div class="w-2/3" style="max-height: 445px; overflow: scroll">
        <el-tree
          ref="treeRef"
          :data="menuTree"
          node-key="value"
          :default-checked-keys="state.menuIds"
          show-checkbox
          multiple
          default-expand-all
          @check="handleCheck" />
      </div>
      <div
        class="w-1/3 p-4"
        style="background-color: #f5f5f5; max-height: 445px; overflow: scroll">
        <h2>已选权限</h2>
        <div class="p-4">
          <div v-for="i in state.hasSelectMenu" :key="i.value">
            <el-button
              class="button-new-tag mb-4"
              @click="handleRemoveMenu(i)"
              >{{ i.label + '   X' }}</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer flex justify-end">
        <el-button @click="handleSelectAll">全选</el-button>
        <el-button @click="handleSelectNone">全不选</el-button>
        <el-button @click="active = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { ElTree } from 'element-plus'
import { ElMessage } from 'element-plus'
import { type TreeNodeData } from 'element-plus/es/components/tree-v2/src/types'
import { routerStore } from '@/store/modules'
import { updateRole } from '@/api'

const active = ref(false)
const state = reactive<{
  roleInfo: Api.RoleType
  menuIds: string[]
  hasSelectMenu: TreeNodeData[] | undefined
}>({
  roleInfo: {},
  menuIds: [],
  hasSelectMenu: [],
})
const menuTree = JSON.parse(JSON.stringify(routerStore().menus))
const emit = defineEmits(['refresh-list'])
const allTreeKeys: string[] = []
const treeRef = ref<InstanceType<typeof ElTree>>()

const activate = (role: Api.RoleType) => {
  active.value = true
  getAllTreeKeys(menuTree)
  state.roleInfo = JSON.parse(JSON.stringify(role))
  state.menuIds = JSON.parse(role?.menuIds)
  nextTick(() => {
    treeRef.value?.setCheckedKeys(state.menuIds, false)
    state.hasSelectMenu = treeRef.value?.getCheckedNodes(true)
  })
}
const handleCheck = (a: any, b: any) => {
  state.hasSelectMenu = b.checkedNodes
}
const handleRemoveMenu = (item: any) => {
  state.menuIds = state.menuIds.filter((i) => i !== item.value)
  state.hasSelectMenu = state.hasSelectMenu!.filter(
    (i) => i.value !== item.value,
  )
  treeRef.value?.setCheckedKeys(state.menuIds, false)
}
const handleSelectAll = () => {
  treeRef.value?.setCheckedKeys(allTreeKeys, false)
  state.hasSelectMenu = treeRef.value?.getCheckedNodes(true)
}
const handleSelectNone = () => {
  treeRef.value?.setCheckedKeys([], false)
  state.hasSelectMenu = treeRef.value?.getCheckedNodes(true)
}
const handleSubmit = async () => {
  const args = {
    roleId: state.roleInfo.id,
    roleName: state.roleInfo.roleName,
    ext: state.roleInfo.ext,
    menuIds: treeRef.value?.getCheckedKeys(true) as string[],
  }
  await updateRole(args)
  ElMessage({
    message: '角色权限设置成功！',
    type: 'success',
  })
  active.value = false
  emit('refresh-list')
}
const getAllTreeKeys = (data: any[]) => {
  data?.map((item) => {
    allTreeKeys.push(item.value)
    if (item.children?.length) {
      getAllTreeKeys(item.children)
    }
    return allTreeKeys
  })
}

defineExpose({
  activate,
})
</script>

<style lang="scss" scoped></style>
