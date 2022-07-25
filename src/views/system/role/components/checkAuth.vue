<template>
  <el-dialog
    v-model="active"
    :title="`查看权限 - ${state.roleInfo.roleName}`"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    show-close
    destroy-on-close>
    <div class="flex justify-between">
      <div class="w-2/3" style="max-height: 445px; overflow: scroll">
        <el-tree
          ref="treeRef2"
          :data="menuTree2"
          node-key="value"
          show-checkbox
          multiple
          default-expand-all />
      </div>
      <div
        class="w-1/3 p-4"
        style="background-color: #f5f5f5; max-height: 445px; overflow: scroll">
        <h2>已选权限</h2>
        <div class="p-4">
          <div v-for="i in state.hasSelectMenu" :key="i.id">
            <span
              class="inline-block px-3.5 py-1.5 border mb-4 bg-white rounded-md"
              >{{ i.label }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="active = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { ElTree } from 'element-plus'
import { type TreeNodeData } from 'element-plus/es/components/tree-v2/src/types'
import { routerStore } from '@/store/modules'

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
const menuTree2 = JSON.parse(JSON.stringify(routerStore().menus))
const treeRef2 = ref<InstanceType<typeof ElTree>>()

const activate = (role: Api.RoleType) => {
  active.value = true
  state.roleInfo = JSON.parse(JSON.stringify(role))
  state.menuIds = JSON.parse(state.roleInfo?.menuIds)
  disabledTree(menuTree2)
  nextTick(() => {
    treeRef2.value?.setCheckedKeys(state.menuIds)
    state.hasSelectMenu = treeRef2.value?.getCheckedNodes()
  })
}
const disabledTree = (data: any[]) => {
  data?.forEach((item) => {
    item.disabled = true
    if (item.children?.length) {
      disabledTree(item.children)
    }
  })
}

defineExpose({
  activate,
})
</script>

<style lang="scss" scoped></style>
