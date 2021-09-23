<template>
  <div class="role-mg">
    <div class="role-mg-title">角色管理</div>
    <div class="tab">
      <div class="open-search" @click="handleSearchModal(true)">
        <span class="condition">条件筛选</span>
       <i class="iconfont icon-a-NamesortTypeUserControl"></i>
      </div>
      <el-button type="primary" @click="addUserFn">添加角色</el-button>
      <HeaderMg
        class="search-modal"
        v-if="searchmodal"
        @checkUserFn="checkUserFn"
        @addUserFn="addUserFn"
        @getState="getState"
        @closeFn="closeFn"
        :propname="'角色名称'"
        :BtnText="'添加角色'"
      ></HeaderMg>
    </div>
    <!-- <HeaderMg
      @checkUserFn="checkUserFn"
      @addUserFn="addUserFn"
      :propname="'角色名称'"
      :BtnText="'添加角色'"
    ></HeaderMg> -->
    <div class="yy-table-wrap content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod"
          label="编号"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          class-name="maxString10"
          width="160"
        >
          <template #default="scope">
            <el-popover
              v-if="scope.row.name.length > 10"
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.name"
            >
              <template #reference>
                <div class="dy-cell">{{ scope.row.name }}</div>
              </template>
            </el-popover>
            <div v-else>{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="角色说明"
          class-name="maxString20"
          width="160"
        >
          <template #default="scope">
            <el-popover
              v-if="scope.row.desc.length > 20"
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.desc"
            >
              <template #reference>
                <div class="dy-cell">{{ scope.row.desc }}</div>
              </template>
            </el-popover>
            <div v-else>{{ scope.row.desc }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="groupName" label="绑定的用户组">
        </el-table-column>
        <el-table-column
          prop="statusName"
          label="状态"
          width="150"
        ></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="handleAuth(scope.row)" type="text" size="small"
              >授权</el-button
            >
            <el-button
              type="text"
              size="small"
              :disabled="scope.row.status == 1"
              @click="handleRemove(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="授权"
      v-model="dialogVisible"
      :before-close="dialogClose"
      width="900px"
    >
    <!-- :before-close="handleClose" -->
      <div class="add-role" v-loading="getloading">
        <div class="info">
          <div class="title">
            <span class="name">* 角色名称</span>
            <div>
              <!-- <el-input placeholder="请输入角色名称" v-model="name" clearable>
              </el-input> -->
              {{ authuser }}
            </div>
          </div>
          <!-- <div class="title status">
            <span class="name">* 状态</span>
            <div class="option">
              <el-radio v-model="stateRadio" label="1">备选项</el-radio>
              <el-radio v-model="stateRadio" label="2">备选项</el-radio>
            </div>
          </div> -->
        </div>
        <div class="detail"></div>
        <div class="hasauth">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="页面及功能权限" name="tab1"></el-tab-pane>
            <el-tab-pane label="数据权限" name="tab2"></el-tab-pane>
          </el-tabs>
          <div class="wrap" v-if="activeName == 'tab1'">
            <div class="left">
              <div class="titles">
                <div class="in-title">页面权限</div>
                <div class="in-title">功能权限</div>
              </div>
              <el-tree
                ref="tree"
                :data="data"
                show-checkbox
                node-key="id"
                :props="defaultProps"
                :default-checked-keys="defaultCheckedKeys"
                :expand-on-click-node="false"
              >
                <template #default="{ node, data }">
                  <span class="tree-wrap">
                    <span class="tree-label">{{ node.label }}</span>
                    <el-checkbox-group
                      v-if="data.frontRoute"
                      v-model="checkList"
                    >
                      <el-checkbox
                        v-for="item in data.auth"
                        :label="item.id"
                        :key="item.id"
                        >{{ item.name }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </span>
                </template>
              </el-tree>
            </div>
          </div>
          <div v-else class="data-autor-view">
            <ul>
              <li v-for="item in dataAuthorLists" :key="item.channelId">
                <p>{{item.channelName}}</p>
                <span class="check-box" v-for="it in item.authorityList" :key="it.value">
                  <el-checkbox
                  v-model="it.isCheck"
                  :label="it.value">{{it.name}} </el-checkbox>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="hasdata">
          <div class="title">* 数据权限配置（全局）</div>
          <div class="wrap">
            <el-checkbox-group v-model="selectDataArr">
              <div
                class="col"
                v-for="(item, index) in hasdataArr"
                :key="'data' + index"
              >
                <el-checkbox :label="index">{{ item }}</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div> -->
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogClose">取 消</el-button>
          <el-button type="primary" @click="dialogSure">保 存</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      width="900px"
      :title="isAddOrEdit ? '添加角色' : '编辑'"
      v-model="addUserFlag"
      :close-on-click-modal="false"
    >
      <div class="mg-roles-wrap">
        <div class="role">
          <div class="left">
            <span class="title">* 角色名称</span>
            <el-input
              class="left-inp"
              v-model="addusername"
              autocomplete="off"
              maxlength="15"
            >
            </el-input>
          </div>
          <div class="right">
            <div class="title">* 状态</div>
            <div class="group">
              <el-radio v-model="statusradio" label="1">激活</el-radio>
              <el-radio v-model="statusradio" label="2">禁用</el-radio>
            </div>
          </div>
        </div>
        <div class="detail">
          <span class="title">&nbsp;&nbsp;角色说明</span>
          <el-input
            v-model="adduserdetail"
            autocomplete="off"
            maxlength="50"
          ></el-input>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addUserFlag = false">取 消</el-button>
          <el-button type="primary" @click="dialogAddUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch
} from 'vue'
import { indexMethodFn } from './common/index'
import HeaderMg from './common/HeaderMg.vue'
import {
  roleSearch,
  roleEdit,
  roleAdd,
  roleDel,
  roleMenu,
  authSave,
  roleAuthSearch,
  dataAuthorList
} from '@/api/authority'
import { HttpResponse } from '@/interface/interface'
import { format } from '@/utils/utils'

export default defineComponent({
  name: '',
  props: {},
  setup () {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties
    // 节点 tree dom
    const tree = ref()

    const state = reactive({
      getloading: false,
      tableData: [] as any,
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 20,
      total: 0,
      dialogVisible: false,
      isAddOrEdit: true, // 默认添加
      stateRadio: '1',
      name: '',
      defaultDataAuthorLists: [] as any, // 默认全部数据权限Tab 初始化数据
      dataAuthorLists: [] as any, // 数据权限Tab 渲染数据
      data: [] as any,
      defaultProps: {
        children: 'list',
        label: 'name'
      },
      allMenuIds: [] as any[],
      defaultCheckedKeys: [] as any,
      authUserId: '',
      checkTreeList: [],
      checkList: [] as any[],
      hasdataArr: [
        'FB-广告账号A',
        'GG-广告账号A',
        'FB-广告账号A',
        'GG-广告账号A'
      ],
      selectDataArr: [],
      // selectDataAutorItem: [] as any, // 选择的数据权限Tab
      addUserFlag: false,
      statusradio: '1',
      addusername: '',
      adduserdetail: '',
      edituserId: '',
      checkInfo: {
        name: '',
        value: ''
      },
      authuser: '',
      searchmodal: false,
      activeName: 'tab1'
    })
    /// / 自定义index
    const indexMethod = (num: any) => {
      return indexMethodFn(num, state)
      // return num
    }

    // 获取表格数据
    const getTableList = async () => {
      const params = {
        page_no: state.currentPage,
        page_size: state.pageSize,
        name: state.checkInfo.name,
        status: state.checkInfo.value
      }
      const res = (await roleSearch(params)) as HttpResponse
      if (res.code == 0) {
        state.tableData = res.data.list
        state.total = res.data.total
      } else if (res.code == 1007) {
        // 无数据的时候
        state.tableData = []
        state.total = 0
      }
    }
    const checkUserFn = async (val: any) => {
      // 发起查询请求
      // console.log(val)
      state.checkInfo.name = val.name
      state.checkInfo.value = val.value
      getTableList()
      state.searchmodal = false
    }
    // 重置角色数据
    const resetUserData = () => {
      state.statusradio = '1'
      state.addusername = ''
      state.adduserdetail = ''
    }
    // 新增角色
    const addUserFn = (val: boolean) => {
      // console.log('添加用户', val)
      state.addUserFlag = val
      state.isAddOrEdit = true
      // 重置
      resetUserData()
    }

    const handleSizeChange = async (val: any) => {
      // console.log(`每页 ${val} 条`, typeof val)
      state.pageSize = val
      getTableList()
    }
    const handleCurrentChange = (val: any) => {
      // console.log(`当前页: ${val}`)
      state.currentPage = val
      getTableList()
    }
    // 编辑
    const handleClick = (row: any) => {
      // console.log(row)
      state.addUserFlag = true
      state.isAddOrEdit = false

      state.edituserId = row.id
      state.addusername = row.name
      state.statusradio = row.status + ''
      state.adduserdetail = row.desc
    }
    // 监听
    watch(
      () => state.checkList,
      (count, prevCount) => {
        // console.log('功能权限', count)
      }
    )
    // 查询用户已有的权限
    const getRoleAuthSearch = async () => {
      // 重置
      // state.defaultCheckedKeys = []
      // state.checkList = []
      state.getloading = true
      const params = {
        role_id: state.authUserId
        // data_type: 'menu_id'
      }
      const res = (await roleAuthSearch(params)) as HttpResponse
      // console.log('res:查询用户已有的权限 ', res.data.list)
      if (res.code === 0) {
        if (res.data.list.length > 0 && state.allMenuIds.length > 0) {
          // console.log('state.allMenuIds', state.allMenuIds)
          // 初始化 页面菜单权限Tab 数据
          const menuArr = res.data.list.filter((item: any) => {
            return item.dataType == 'menu_id'
          })
          const params: any[] = []
          const paramscheckList: any[] = []
          menuArr.forEach((item: any) => {
            const itemId: any = item.value
            // state.allMenuIds 所有的菜单ids
            if (state.allMenuIds.includes(+itemId)) {
              params.push(itemId)
              // console.log('params', params)
            } else {
              paramscheckList.push(+itemId)
              // console.log('paramscheckList', paramscheckList)
            }
          })
          state.defaultCheckedKeys = params
          state.checkList = paramscheckList
        }

        // 初始化 数据权限Tab 数据
        const siteArr = res.data.list.filter((item: any) => {
          return item.dataType == 'ad_store_id_site'
        }).map((item: any) => { return item.value })

        const newDataAutors = JSON.parse(JSON.stringify(state.defaultDataAuthorLists))
        newDataAutors.forEach((item: any, i: number) => {
          if (item.authorityList.length > 0) {
            item.authorityList.forEach((it2: any, i2: number) => {
              if (siteArr.includes(it2.value)) {
                newDataAutors[i].authorityList[i2].isCheck = true
              }
            })
          }
        })
        state.dataAuthorLists = newDataAutors
        // console.log('---数据权限', state.dataAuthorLists)
      }
      state.getloading = false
    }

    // 授权
    const handleAuth = async (row: any) => {
      state.dialogVisible = true
      state.authuser = row.name
      state.authUserId = row.id
      const params = {}
      // 获取所有的menus
      const res = (await roleMenu(params)) as HttpResponse
      if (res.code === 0) {
        state.data = (format(res.data.list, []) as any).newArr
        state.allMenuIds = (format(res.data.list, []) as any).newIdsArr
      }
      // 查询用户已有的权限
      getRoleAuthSearch()
    }
    const handleRemove = (row: any) => {
      // console.log(row)
      const flag = !!row.groupName
      if (flag) {
        // 绑定组的情况
        currentInstance.$alert(
          `该角色与 ${row.groupName} 用户组绑定，请对 ${row.groupName} 用户组绑定其他角色后再进行删除`,
          '删除角色',
          {
            confirmButtonText: '确定',
            callback: async () => {
              //
              const params = {
                id: row.id
              }
              const res = (await roleDel(params)) as HttpResponse
              if (res.code == 0) {
                getTableList()
              }
            }
          }
        )
      } else {
        // 没有绑定的组，正常删除
        currentInstance
          .$confirm('确定删除该角色？', '删除角色', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(async () => {
            const params = {
              id: row.id
            }
            const res = (await roleDel(params)) as HttpResponse
            if (res.code == 0) {
              currentInstance.$message({
                type: 'success',
                message: '删除成功!'
              })
              getTableList()
            } else {
              currentInstance.$alert(
                '该角色与**用户组绑定，请对**用户组绑定其他角色后再进行删除',
                '标题名称',
                {
                  confirmButtonText: '确定',
                  callback: () => {
                    //
                  }
                }
              )
            }
          })
          .catch(() => {
            currentInstance.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    }
    const handleClose = (done: any) => {
      currentInstance
        .$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {
          //
        })
    }

    // 树形节点选中的数组
    const getCheckedKeys = () => {
      // console.log(tree.value.getCheckedKeys())
      const authArr = tree.value.getCheckedKeys()
      state.checkTreeList = authArr
    }
    const dialogClose = () => {
      state.dialogVisible = false
      state.activeName = 'tab1'
    }
    const dialogSure = async () => {
      state.dialogVisible = false
      let params = {}

      // 数据权限配置arr选中
      // console.log(state.selectDataArr)

      // 提交请求
      if (state.activeName == 'tab1') {
        // 左侧树形菜单选中的数组
        getCheckedKeys()
        params = {
          role_id: state.authUserId,
          value: [...state.checkTreeList, ...state.checkList],
          data_type: 'menu_id'
        }
      } else {
        const ids = [] as any
        state.dataAuthorLists.forEach((item: any) => {
          if (item.authorityList.length > 0) {
            item.authorityList.forEach((i2: any) => {
              if (i2.isCheck) {
                ids.push(i2.value)
              }
            })
          }
        })
        if (!ids.length) {
          currentInstance.$message.error({
            message: '请勾选相关权限'
          })
          return false
        }
        params = {
          role_id: state.authUserId,
          value: ids,
          data_type: 'ad_store_id_site'
        }
      }
      const res = (await authSave(params)) as HttpResponse
      if (res.code == 0) {
        currentInstance.$message.success({
          message: '保存成功'
        })
      }
      // console.log('res: ', res)
    }
    //
    const resetTreeData = () => {
      // 重置
      state.data = []
      state.defaultCheckedKeys = []
    }
    const dialogAddUser = async () => {
      if (!state.addusername) {
        currentInstance.$message.error({
          message: '请输入角色名称'
        })
        return
      }
      let params
      // 新增或编辑
      let res
      if (state.isAddOrEdit) {
        params = {
          name: state.addusername,
          status: state.statusradio,
          desc: state.adduserdetail
        }
        res = (await roleAdd(params)) as HttpResponse
      } else {
        params = {
          name: state.addusername,
          status: state.statusradio,
          desc: state.adduserdetail,
          id: state.edituserId
        }
        res = (await roleEdit(params)) as HttpResponse
      }

      // console.log('res: ', res)
      if (res.code == 0) {
        currentInstance.$message.success({
          message: '操作成功',
          type: 'success'
        })
        getTableList()
      } else {
        currentInstance.$message.error({
          message: '操作失败'
        })
      }
      state.addUserFlag = false
    }

    // 搜索框
    const handleSearchModal = (val: boolean) => {
      state.searchmodal = val
    }
    const closeFn = () => {
      state.searchmodal = false
    }
    const getAuthorData = async () => {
      const res = (await dataAuthorList({})) as HttpResponse
      const result = res.data || []
      result.forEach((item: any, i: number) => {
        if (item.authorityList.length > 0) {
          item.authorityList.forEach((it2: any, i2: number) => {
            result[i].authorityList[i2].isCheck = false
          })
        }
      })
      state.defaultDataAuthorLists = result
    }
    watch(
      () => state.dialogVisible,
      (newval, oldval) => {
        resetTreeData()
      }
    )
    onMounted(async () => {
      getAuthorData()
      // 获取当前列表
      const params = {
        page_no: state.currentPage,
        page_size: state.pageSize
      }
      const res = (await roleSearch(params)) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        state.tableData = res.data.list
        state.total = res.data.total
      } else if (res.code == 1007) {
        state.tableData = []
        state.total = 0
      }
    })

    return {
      ...toRefs(state),
      checkUserFn,
      addUserFn,
      handleSizeChange,
      handleCurrentChange,
      handleClick,
      handleRemove,
      handleClose,
      tree,
      dialogSure,
      dialogClose,
      dialogAddUser,
      handleAuth,
      indexMethod,
      handleSearchModal,
      closeFn
    }
  },
  components: {
    HeaderMg
  }
})
</script>
<style lang="scss">
.mg-roles-wrap {
  .role {
    display: flex;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .left-inp {
        margin-left: 10px;
        width: 300px;
      }
    }
    .right {
      margin-left: 40px;
      display: flex;
      align-items: center;
      .title {
        margin-right: 10px;
      }
    }
  }
  .detail {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .title {
      margin-right: 10px;
    }
    .el-input {
      width: 700px;
    }
  }
}
.role-mg {
  padding: 18px;
  height: 100%;
  border-radius: 20px;
  background-color: #fff;
  overflow-y: auto;
  @include clearScrollbar();
  box-sizing: border-box;
  .content {
    // margin-top: 18px;
    // margin-left:0;
    // margin-right: 0;
    // height: 610px;
    // overflow-y: auto;
    // @include clearScrollbar();
    .el-table__header {
      width: 100% !important;
      table-layout: auto;
    }
    .el-table__body {
      width: 100% !important;
      table-layout: auto;
    }
    .el-table__empty-block {
      width: 100% !important;
    }
  }
  .role-mg-title {
    font-size: 20px;
    margin-bottom: 20px;
  }
    .open-search {
    // position: relative;
    display: flex;
    align-items: center;
    // position: absolute;
    // top: 30px;
    // right: 30px;
    font-size: 20px;
    cursor: pointer;
    .condition {
      margin-right: 5px;
      font-size: 16px;
    }
  }
  .tab {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-modal {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }
  }
  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .add-role {
    .info {
      display: flex;
      align-items: center;
      .title {
        display: flex;
        align-items: center;
      }
      .name {
        margin-right: 20px;
      }
      .status {
        margin-left: 40px;
      }
      .option {
      }
    }
    .detail {
    }
    .hasauth {
      .title {
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .wrap {
        display: flex;
        .left {
          width: 100%;
          .el-tree-node {
            position: relative;
          }
          .tree-wrap {
            display: flex;
            .el-checkbox-group {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          .titles {
            display: flex;
          }
          .in-title {
            flex: 1;
            text-align: center;
          }
          .tree-label {
            margin-right: 20px;
          }
        }
      }
    }
    .hasdata {
      .title {
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .wrap {
        .col {
          display: inline-block;
          width: 50%;
        }
      }
    }
  }

}
.data-autor-view{
  li{
    margin-bottom: 20px;
  }
  p{
    color: #666666;
    font-size: 14px;
  }
  .check-box{
    margin-right: 20px;
  }
}
</style>
