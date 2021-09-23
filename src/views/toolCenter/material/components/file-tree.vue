<template>
  <el-dialog
    title="批量移动素材到"
    v-model="dialogVisible"
    width="30%"
    :close-on-click-modal="false"
    :before-close="handleClose">
    <el-tree
      :data="treeData"
      highlight-current
      :props="defaultProps"
      @node-click="handleNodeClick"
    >
      <template #default="{ node }">
        <span><i class="el-icon-folder"></i>{{ node.label }}</span>
      </template>
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs
} from 'vue'
import { ElMessage } from 'element-plus'
import { materialCatalogList } from '@/api/toolCenter'
import { getYyTreeDTO } from '@/utils/utils'
import { HttpResponse } from '@/interface/interface'
export default defineComponent({
  name: '',
  emits: ['onConfirm'],
  setup (props, ctx) {
    const dialogVisible = ref(false)
    const state = reactive({
      treeData: [],
      currentNodeCatalog: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    })
    const handleOpen = () => {
      // 检测是否有目录缓存 有就拿没有则请求
      const treeData = localStorage.getItem('YyTreeData')
      if (treeData) {
        state.treeData = JSON.parse(treeData) as []
      } else {
        getYyTreeData()
      }
      dialogVisible.value = true
    }
    const handleClose = () => {
      state.currentNodeCatalog = ''
      dialogVisible.value = false
    }
    const onConfirm = () => {
      if (!state.currentNodeCatalog) {
        ElMessage({
          type: 'warning',
          message: '请先勾选要移动的目录'
        })
        return false
      }
      ctx.emit('onConfirm', state.currentNodeCatalog)
    }
    // 树节点点击
    const handleNodeClick = (data: any) => {
      state.currentNodeCatalog = data.catalog
      // console.log('tree-节点点击数据', state.currentNodeCatalog)
    }
    const getYyTreeData = async () => {
      const res = await materialCatalogList() as HttpResponse
      state.treeData = getYyTreeDTO(res.data) as []
    }
    return {
      ...toRefs(state),
      dialogVisible,
      handleClose,
      onConfirm,
      handleNodeClick,
      handleOpen
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
