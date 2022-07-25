<template>
  <el-dialog
    v-model="active"
    :title="`给‘${state.roleInfo.roleName}’关联账号`"
    destroy-on-close
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    show-close
    fullscreen>
    <el-divider content-position="right"
      ><span class="text-red-600"
        >未勾选则不设置为当前角色，已勾选则设置为当前角色</span
      ></el-divider
    >
    <el-table
      ref="tableRef"
      v-loading="state.loading"
      :data="state.roleMember"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column type="index" label="序号" width="55" align="center" />
      <el-table-column property="userPhone" label="登录账号" align="center" />
      <el-table-column property="userName" label="用户名称" align="center" />
      <el-table-column property="userPhone" label="联系电话" align="center" />
    </el-table>
    <div class="flex justify-end mt-[20px]">
      <el-button :type="`${selectFlag ? 'primary' : ''}`" @click="handleSet"
        >设置角色</el-button
      >
      <el-button @click="active = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { queryRelateMember, roleRelateMember } from '@/api'
import { consoleError } from '@/utils'

const state = reactive<{
  roleInfo: Api.RoleType
  roleMember: Api.UserType[]
  selectedUids: string[]
  loading: boolean
}>({
  roleInfo: {},
  roleMember: [],
  selectedUids: [],
  loading: false,
})
const active = ref(false)
const tableRef = ref()
// 是否勾选‘人员列表’
const selectFlag = ref(false)
const emit = defineEmits(['refresh-list'])
const activate = (role: Api.RoleType) => {
  active.value = true
  state.roleInfo = JSON.parse(JSON.stringify(role))
  getRelateMember()
}
const handleSelectionChange = (val: any) => {
  selectFlag.value = !!val.length
  state.selectedUids = val.map((item: any) => {
    return item.id
  })
}
const handleSet = async () => {
  if (!state.selectedUids.length) {
    return
  }
  const args = {
    roleId: state.roleInfo.id,
    uidList: state.selectedUids,
  }
  const lmInstance = ElMessage.info('设定中...')
  try {
    const { data } = await roleRelateMember(args)
    if (data) {
      ElMessage({
        type: 'success',
        message: '角色设定成功',
      })
      active.value = false
      emit('refresh-list')
    }
  } catch (err) {
    consoleError('角色设定成功失败', err)
  } finally {
    lmInstance.close()
  }
}
const getRelateMember = async () => {
  const args = {
    roleId: state.roleInfo.id,
  }
  state.loading = true
  try {
    const { data } = await queryRelateMember(args)
    if (data) {
      state.roleMember = data as Api.UserType[]
      await nextTick(() => {
        state.roleMember.forEach((user) => {
          tableRef.value.toggleRowSelection(user, !!user.bindFlag)
        })
      })
    }
  } catch (err) {
    consoleError('获取用户列表数据失败', err)
  } finally {
    state.loading = false
  }
}

defineExpose({
  activate,
})
</script>

<style lang="scss" scoped>
.el-divider {
  margin: 0 0 24px;
}
</style>
