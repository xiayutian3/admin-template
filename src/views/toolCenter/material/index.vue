<template>
  <div class="materialManneg">
    <div class="m-header">
      <h2>素材库</h2>
      <el-input
        class="w188 mr20"
        clearable
        placeholder="请输入素材名称"
        suffix-icon="el-icon-search"
        v-model="mediaIName"
      >
      </el-input>
      <el-select
        class="w188 mr20"
        v-model="mediaSort"
        placeholder=""
        @change="getCurrentList"
      >
        <el-option
          v-for="item in mediaSortOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="onSearch">搜索</el-button>
      <el-button
        type="primary"
        icon="el-icon-upload "
        @click="openUplodView"
        >上传文件</el-button
      >
      <el-button type="primary" @click="openRemoveFileTree">批量移动</el-button>
      <el-button type="primary" @click="onDeletes">批量删除</el-button>
    </div>
    <div class="m-conten-wrap">
      <div class="m-file">
        <h2>文件夹</h2>
        <file-tree-operate
          @getClickNode="onGetClickNode"
          @refreshData="onSearch"
        ></file-tree-operate>
      </div>
      <div class="m-conten-box">
        <div class="m-conten">
          <div class="m-items" v-loading="loading">
            <fileItem
              :soueceList="soueceList"
              @onGetClickItem="onGetClickItem"
              @onGeteleteItems="onGeteleteItems"
              ref="refFileItem"
            ></fileItem>
          </div>
          <div class="m-show">
            <fileView :itemD="currentClickItme"></fileView>
          </div>
        </div>
        <div class="m-btn">
          <!-- 分页 -->
          <div class="yy-pagination">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="pageIndex"
              :page-size="pageSize" :page-sizes="[20,50,100]"
              :total="totalPage"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
  <yy-upload ref="refYyUpload"
    :fromDataParma="{catalog: mediaCatalog}"
    @refreshData="onSearch"
  ></yy-upload>
  <file-tree ref="refFileTree" @onConfirm="onRemoveFilePlace"></file-tree>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { materialList, materialDel, materialMovePlace } from '@/api/toolCenter'
import { HttpResponse } from '@/interface/interface'
import yyUpload from '@/components/yy-upload.vue'
import fileView from './components/file-info-view.vue'
import fileItem from './components/file-item.vue'
import fileTree from './components/file-tree.vue'
import fileTreeOperate from './components/file-tree-operate.vue'
export default defineComponent({
  name: 'materialManneg',
  props: {},
  components: {
    yyUpload,
    fileView,
    fileItem,
    fileTree,
    fileTreeOperate
  },
  setup (props, ctx) {
    const state = reactive({
      loading: false,
      isCheckedNode: false,
      pageIndex: 1,
      pageSize: 20,
      totalPage: 0,
      mediaIName: '',
      mediaSort: 0,
      mediaCatalog: '',
      deleteItems: [],
      currentClickItme: {},
      mediaSortOptions: [
        {
          value: 0,
          label: '按照上传时间降序'
        },
        {
          value: 1,
          label: '按照上传时间升序'
        },
        {
          value: 2,
          label: '按文件大小降序'
        },
        {
          value: 3,
          label: '按文件大小升序'
        }
      ],
      soueceList: []
    })
    const refFileItem = ref()
    // 获取列表信息
    const getCurrentList = async () => {
      state.loading = true
      const params = {
        isDesc: state.mediaSort,
        catalog: state.mediaCatalog,
        name: state.mediaIName,
        pageNo: state.pageIndex,
        pageSize: state.pageSize
      }
      const res = await materialList(params) as HttpResponse
      state.soueceList = res.data.list || []
      state.totalPage = res.data.total
      state.loading = false
      // 清空选择
      state.deleteItems = []
      refFileItem.value.cleanCkeckList()
    }
    getCurrentList()
    // 左侧文件选择
    const onGetClickNode = (data: any) => {
      state.isCheckedNode = true
      state.mediaCatalog = data
      getCurrentList()
    }
    // 中间文件item 相关事件
    const onGeteleteItems = (data: any) => {
      state.deleteItems = data
    }
    const onGetClickItem = (data: any) => {
      state.currentClickItme = data
    }
    // 头部按钮相关事件
    const onSearch = () => {
      state.pageIndex = 1
      getCurrentList()
    }
    const onDeletes = () => {
      if (state.deleteItems.length === 0) {
        ElMessage({
          type: 'warning',
          message: '请先勾选要删除的素材'
        })
        return false
      }
      ElMessageBox.confirm('确认删除所选素材?', '批量删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const params = {
            guids: state.deleteItems
          }
          const res = await materialDel(params) as HttpResponse
          if (res.code == 0) {
            ElMessage({
              type: 'success',
              message: '删除成功!'
            })
            getCurrentList()
          }
        })
        .catch()
    }
    const refYyUpload = ref()
    const openUplodView = () => {
      if (!state.isCheckedNode) {
        ElMessage({
          type: 'warning',
          message: '请先选择或创建文件目录'
        })
        return false
      }
      refYyUpload.value.handleOpen()
    }
    const refFileTree = ref()
    const openRemoveFileTree = () => {
      if (state.deleteItems.length === 0) {
        ElMessage({
          type: 'warning',
          message: '请先勾选要移动的素材'
        })
        return false
      }
      refFileTree.value.handleOpen()
    }
    const onRemoveFilePlace = async (catalog: any) => {
      const params = {
        guids: state.deleteItems,
        targetCatalog: catalog
      }
      const res = await materialMovePlace(params) as HttpResponse
      if (res.code == 0) {
        ElMessage({
          type: 'success',
          message: '移动成功!'
        })
        getCurrentList()
        refFileTree.value.handleClose()
      }
    }
    // 分页
    const handleSizeChange = (val: number) => {
      state.pageIndex = 1
      state.pageSize = val
      getCurrentList()
    }
    const handleCurrentChange = (val: number) => {
      state.pageIndex = val
      getCurrentList()
    }
    return {
      ...toRefs(state),
      refYyUpload,
      refFileTree,
      refFileItem,
      getCurrentList,
      onSearch,
      onGetClickNode,
      onDeletes,
      onGetClickItem,
      onGeteleteItems,
      onRemoveFilePlace,
      openUplodView,
      openRemoveFileTree,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style lang="scss" scoped>
.w188{
  width: 188px;
}
.mr20{
  margin-right: 20px;
}
.materialManneg {
  box-sizing: border-box;
  height: 100%;
  border-radius: 20px;
  background-color: #fff;
  overflow-y: auto;
  .m-header{
    display: flex;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #C4C4C4;
    h2{
      margin-right: 100px;
      font-size: 20px;
    }
  }
  .m-conten-wrap{
    display: flex;
    width: 100%;
    height: calc(100% - 60px);
    .m-file{
      flex: 1;
      padding: 12px 16px;
      height: 100%;
      border-right: 1px solid #C4C4C4;
      h2{
        font-size: 16px;
      }
    }
    .m-conten-box{
      flex: 6.5;
      height: 100%;
    }
    .m-conten{
      display: flex;
      width: 100%;
      height: calc(100% - 60px);
      border-bottom: 1px solid #C4C4C4;
      .m-items{
        flex: 3.5;
        min-height: 100%;
      }
      .m-show{
        flex: 1;
        height: 100%;
        border-left: 1px solid #C4C4C4;
      }
    }
    .m-btn{
      display: flex;
      align-items: center;
      padding: 0 20px;
      width: 100%;
      height: 60px;
    }
  }
  .yy-pagination{
    width: 100%;
    overflow: hidden;
    .el-pagination{
      float: right;
    }
  }
}
</style>
