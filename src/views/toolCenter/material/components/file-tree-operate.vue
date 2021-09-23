<template>
  <div class="file-tree-view">
    <!-- <span @click="append({catalog: ''}, 0)" class="cur-p">
      <i class="el-icon-folder-add"></i>共享空间
    </span> -->
    <el-tree
      v-if="treeData.length"
      :data="treeData"
      :props="defaultProps"
      highlight-current
      @node-click="handleNodeClick"
    >
      <template #default="{ node }">
        <span class="custom-tree-node">
          <span><i class="el-icon-folder"></i>{{ node.label }}</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-tooltip class="item" effect="dark" content="新建" placement="left">
                  <el-dropdown-item @click="append(node, 0)" icon="el-icon-circle-plus-outline"></el-dropdown-item>
                </el-tooltip>
                <!-- <el-tooltip class="item" effect="dark" content="修改" placement="left">
                  <el-dropdown-item @click="append(node, 1)" icon="el-icon-edit"></el-dropdown-item>
                </el-tooltip> -->
                <el-tooltip v-if="node.data.catalog" class="item" effect="dark" content="删除" placement="left">
                  <el-dropdown-item @click="remove(node)" icon="el-icon-delete"></el-dropdown-item>
                </el-tooltip>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </template>
    </el-tree>
  </div>
  <el-dialog
    :title="upTitle"
    v-model="editDialogVisible"
    width="430px"
    :close-on-click-modal="false"
    :before-close="handleClose">
    <div>
      文件夹名称
      <el-input
      v-model="inputFileName"
      maxlength="15"
      class="w_300"
      placeholder="限15个字符"></el-input>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onUpFileName">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs
} from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { materialCatalogList, materialCatalogCreate, materialCatalogDel } from '@/api/toolCenter'
import { HttpResponse } from '@/interface/interface'
import { getYyTreeDTO } from '@/utils/utils'
export default defineComponent({
  name: '',
  // 定义抛出的事件名称
  emits: ['getClickNode', 'refreshData'],
  setup (props, ctx) {
    const state = reactive({
      upTitle: '新建文件夹',
      editDialogVisible: false,
      inputFileName: '',
      treeData: [
        {
          catalog: '',
          label: '共享空间',
          children: []
        }
      ],
      currentNode: {
        catalog: '',
        catalogName: ''
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    })
    // 获取文件目录列表
    const getMaterialCatalogList = async () => {
      const res = await materialCatalogList() as HttpResponse
      if (res.code == 0) {
        const result = getYyTreeDTO(res.data) as []
        state.treeData[0].children = result
        localStorage.setItem('YyTreeData', JSON.stringify(result))
      }
    }
    getMaterialCatalogList()
    // 树节点点击
    const handleNodeClick = (data: any) => {
      // console.log('tree-节点点击数据', data, data.catalog)
      ctx.emit('getClickNode', data.catalog)
    }
    // 文件操作
    const append = (data: any, type: number) => {
      type === 0 ? state.upTitle = '新建文件夹' : state.upTitle = '编辑文件夹'
      state.currentNode = data.data ? data.data : data
      state.editDialogVisible = true
    }
    const onUpFileName = async () => {
      if (state.inputFileName.trim() == '') {
        ElMessage({
          type: 'warning',
          message: '请输入文件夹名称'
        })
        return false
      }
      const params = {
        catalog: state.currentNode.catalog ? state.currentNode.catalog + '/' + state.inputFileName.trim() : state.inputFileName.trim(),
        catalogName: state.inputFileName.trim()
      }
      const res = await materialCatalogCreate(params) as HttpResponse
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '操作成功!'
        })
        setTimeout(() => {
          handleClose()
          ctx.emit('getClickNode', '')
          getMaterialCatalogList()
        }, 2000)
      }
    }
    const remove = (data: any) => {
      ElMessageBox.confirm(`删除该文件夹会删除其包含的所有文件夹与文件，确定删除 "${data.data.label}" ?`, '删除文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const params = {
            catalog: data.data.catalog
          }
          const res = await materialCatalogDel(params) as HttpResponse
          if (res.code === 0) {
            ElMessage({
              type: 'success',
              message: '已删除!'
            })
            setTimeout(() => {
              getMaterialCatalogList()
              ctx.emit('getClickNode', '')
              ctx.emit('refreshData')
            }, 2000)
          }
        })
        .catch()
    }
    const handleClose = () => {
      state.inputFileName = ''
      state.editDialogVisible = false
    }
    return {
      ...toRefs(state),
      handleNodeClick,
      append,
      remove,
      onUpFileName,
      handleClose
    }
  }
})
</script>
<style lang="scss" scoped>
.file-tree-view {
  .el-icon-folder-add,
  .el-icon-folder {
    margin-right: 4px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
.w_300{
  margin-left: 10px;
  width: 300px;
}
.cur-p{
  cursor: pointer;
}
</style>
