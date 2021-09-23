<template>
  <div class="group-mg">
    <div class="title">用户组管理</div>
    <div class="tab">
      <div class="open-search" @click="handleSearchModal(true)">
        <span class="condition">条件筛选</span>
        <i class="iconfont icon-a-NamesortTypeUserControl"></i>
      </div>
      <el-button type="primary" @click="addUserFn">添加用户组</el-button>
      <HeaderMg
        class="search-modal"
        v-if="searchmodal"
        @checkUserFn="checkUserFn"
        @addUserFn="addUserFn"
        @getState="getState"
        @closeFn="closeFn"
        :propname="'用户组名称'"
        :BtnText="'添加用户组'"
      ></HeaderMg>
    </div>

    <!-- <HeaderMg
      @checkUserFn="checkUserFn"
      @addUserFn="addUserFn"
      :propname="'用户组名称'"
      :BtnText="'添加用户组'"
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
          prop="groupName"
          label="用户组名称"
          class-name="maxString10"
          width="160"
        >
          <template #default="scope">
            <el-popover
              v-if="scope.row.groupName.length > 10"
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.groupName"
            >
              <template #reference>
                <div class="dy-cell">{{ scope.row.groupName }}</div>
              </template>
            </el-popover>
            <div v-else>{{ scope.row.groupName }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="用户组说明"
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
        <el-table-column prop="roleName" label="绑定的角色"> </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="handleRemove(scope.row)"
              >删除</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleAuthorize(scope.row)"
              >授权用户</el-button
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
      :title="isAddOrEdit ? '添加用户组' : '编辑'"
      v-model="dialogVisible"
      width="900px"
      :close-on-click-modal="false"
    >
      <div class="add-group">
        <div class="name">
          * 用户组名称
          <div class="group-inp">
            <el-input
              placeholder="请输入用户组名称"
              v-model="userGroupName"
              clearable
              maxlength="15"
            >
            </el-input>
          </div>
        </div>
        <div class="msg">
          用户组说明
          <div class="group-inp" style="width: 600px">
            <el-input
              placeholder="用户组说明描述"
              v-model="remark"
              clearable
              maxlength="50"
            >
            </el-input>
          </div>
        </div>
        <div class="bind-role">
          * 绑定角色
          <div class="select-role">
            <el-select v-model="selectVal" placeholder="请选择">
              <el-option
                v-for="item in selectOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogClose">取 消</el-button>
          <el-button type="primary" @click="dialogSure">保 存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 授权用户 模态框 -->
    <el-dialog
      title="授权用户"
      :close-on-click-modal="false"
      v-model="dialogAuth"
      :before-close="dialogAuthColse"
      width="635px"
    >
      <div class="auth-content" v-loading="hasGroupLoding">
        <el-transfer
          v-model="transferVal"
          :titles="['待授权用户', '已授权用户']"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入搜索关键字"
          :data="transferData"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogAuthColse">取 消</el-button>
          <el-button type="primary" @click="dialogAuthSure">保 存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { indexMethodFn } from './common/index'
import HeaderMg from './common/HeaderMg.vue'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs
} from 'vue'
import { HttpResponse } from '@/interface/interface'
import {
  groupRoleSearch,
  groupUserSave,
  useAllList,
  userList,
  groupRoleSave,
  roleList,
  roleSearch,
  groupRoleEdit,
  groupRoleDel,
  groupUserDel,
  getUserGroupNum
} from '@/api/authority'
// import { mapArrObject } from '@/utils/utils'

export default defineComponent({
  setup () {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties

    // 模拟数据 穿梭框
    const generateData = () => {
      const data: any[] = []
      const cities: any = []
      const spell: any = []
      cities.forEach((city: any, index: any) => {
        data.push({
          label: city,
          key: index,
          spell: spell[index]
        })
      })
      return data
    }

    const state = reactive({
      tableData: [] as any,
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 20,
      total: 0,
      hasGroupLoding: false,
      dialogVisible: false,
      isAddOrEdit: true, // 默认 添加
      userGroupName: '',
      remark: '',
      selectOptions: [],
      selectVal: '',
      dialogAuth: false,
      transferVal: [] as any,
      alltransferVal: [] as any,
      transferData: generateData(),
      checkUserGroup: '',
      editRow: {} as any,
      group_id: '',
      searchmodal: false
    })
    /// / 自定义index
    const indexMethod = (num: any) => {
      return indexMethodFn(num, state)
      // return num
    }

    // 获取用户组all列表
    const getAllList = async () => {
      const params = {
        page_no: state.currentPage,
        page_size: state.pageSize,
        group_name: state.checkUserGroup
      }
      const res = (await groupRoleSearch(params)) as HttpResponse
      // console.log('res: ', res)
      const { code, data } = res
      if (code == 0) {
        // const newArr = mapArrObject(, ['id', 'userName', 'realName'], ['key', 'label', 'spell'])
        state.tableData = data.list
        state.total = res.data.total
      } else if (res.code == 1007) {
        // 无数据的时候
        state.tableData = []
        state.total = 0
      }
    }
    const checkUserFn = (val: any) => {
      // 发起查询请求
      console.log(val)
      state.checkUserGroup = val.name.trim()
      getAllList()
      state.searchmodal = false
    }

    // 用户已有的组
    const getHasList = async (id: any) => {
      state.hasGroupLoding = true
      const params = {
        group_id: id
      }
      const res = (await userList(params)) as HttpResponse
      console.log('res用户已有的组: ', res)
      if (res.code == 0) {
        const data: any[] = []
        res.data.list.forEach((item: any) => {
          data.push(item.userId)
        })
        state.alltransferVal = data
        state.transferVal = data
      }
      state.hasGroupLoding = false
    }
    // 角色列表
    const getRoles = async () => {
      const params = {
        status: 1
      }
      const res = (await roleList(params)) as HttpResponse
      if (res.code == 0) {
        state.selectOptions = res.data.list
      }
    }

    // 新增用户组
    const addUserFn = (val: boolean) => {
      console.log('新增用户组', val)
      state.dialogVisible = val
      state.isAddOrEdit = true

      getRoles()
      getAllList()
    }

    // table button 编辑
    const handleClick = (row: any) => {
      console.log('row: ', row)
      state.isAddOrEdit = false
      state.dialogVisible = true
      getRoles()

      state.editRow = row
      state.userGroupName = row.groupName
      state.selectVal = row.roleId
      state.remark = row.desc
    }
    const handleRemove = async (row: any) => {
      console.log('row: ', row, row.groupId)
      // 获取用户数
      const res1 = await getUserGroupNum({ id: row.groupId }) as HttpResponse
      const userNum = res1.data || 0
      currentInstance
        .$confirm(
          '该用户组与 "' +
            userNum +
            '" 个用户绑定，删除用户组会使这些用户损失相关权限，确认删除用户组?',
          '删除用户组',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            type: 'warning'
          }
        )
        .then(async () => {
          const params = {
            id: row.groupId
          }
          const res = (await groupRoleDel(params)) as HttpResponse
          if (res.code == 0) {
            currentInstance.$message({
              type: 'success',
              message: '删除成功!'
            })
            getAllList()
          }
        })
        .catch(() => {
          currentInstance.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    // 获取所有用户
    const getAllUsers = async () => {
      const res = (await useAllList({})) as HttpResponse
      console.log('res获取所有用户: ', res)
      if (res.code == 0) {
        const data: any[] = []
        res.data.list.forEach((item: any) => {
          data.push({
            label: item.userName,
            key: item.id,
            spell: item.realName
          })
        })

        state.transferData = data
      }
    }
    const handleAuthorize = async (row: any) => {
      console.log('row: ', row)
      state.dialogAuth = true
      state.group_id = row.groupId
      // 获取所有用户
      getAllUsers()
      getHasList(row.groupId)
    }
    // 页码相关
    const handleSizeChange = (val: any) => {
      console.log(`每页 ${val} 条`, typeof val)
      state.pageSize = val
      getAllList()
    }
    const handleCurrentChange = (val: any) => {
      console.log(`当前页: ${val}`)
      state.currentPage = val
      getAllList()
    }
    // 模态框
    const dialogClose = () => {
      state.dialogVisible = false
    }
    const dialogSure = async () => {
      if (!state.userGroupName) {
        currentInstance.$message({
          type: 'error',
          message: '请填写用户组名称'
        })
        return
      }
      if (!state.selectVal) {
        currentInstance.$message({
          type: 'error',
          message: '请填写绑定角色'
        })
        return
      }
      state.dialogVisible = false
      if (state.isAddOrEdit) {
        // 添加情况
        const params = {
          group_name: state.userGroupName,
          role_id: state.selectVal,
          desc: state.remark
        }
        const res1 = (await groupRoleSave(params)) as HttpResponse
        if (res1.code == 0) {
          getAllList()
        }
      } else {
        // 编辑
        const params = {
          group_name: state.userGroupName,
          role_id: state.selectVal,
          desc: state.remark,
          id: state.editRow.groupId
        }
        const res1 = (await groupRoleEdit(params)) as HttpResponse
        if (res1.code == 0) {
          getAllList()
        }
      }
    }

    // 授权用户 模态框
    const dialogAuthColse = () => {
      state.dialogAuth = false
      state.transferData = generateData()
    }
    function getArrDifference (arr1: any[], arr2: any) {
      return arr1.concat(arr2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v)
      })
    }

    const dialogAuthSure = async () => {
      state.dialogAuth = false

      const addArr: any[] = []
      const lessArr: any[] = []
      const diffArr = getArrDifference(state.transferVal, state.alltransferVal)
      diffArr.forEach((item: any) => {
        if (state.transferVal.includes(item)) {
          // 新增
          addArr.push(item)
        } else {
          // 删除
          lessArr.push(item)
        }
      })
      if (addArr.length > 0) {
        const params = {
          group_id: state.group_id,
          user_id: addArr
        }
        const res = (await groupUserSave(params)) as HttpResponse
        // console.log('res: ', res)
      }
      if (lessArr.length > 0) {
        const params = {
          group_id: state.group_id,
          user_id: lessArr
        }
        const res = (await groupUserDel(params)) as HttpResponse
        // console.log('res: ', res)
      }
    }

    // 穿梭框过滤
    const filterMethod = (query: any, item: any) => {
      return item.label.indexOf(query) > -1
    }

    // 搜索框
    const handleSearchModal = (val: boolean) => {
      state.searchmodal = val
    }
    const closeFn = () => {
      state.searchmodal = false
    }

    onMounted(() => {
      getAllList()
    })
    return {
      ...toRefs(state),
      checkUserFn,
      addUserFn,
      handleClick,
      handleRemove,
      handleAuthorize,
      handleSizeChange,
      handleCurrentChange,
      dialogSure,
      dialogClose,
      dialogAuthColse,
      dialogAuthSure,
      filterMethod,
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
.group-mg {
  padding: 18px;
  height: 100%;
  border-radius: 20px;
  background-color: #fff;
  overflow-y: auto;
  @include clearScrollbar();
  .title {
    font-size: 20px;
    margin-bottom: 20px;
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
  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .add-group {
    .name {
      display: flex;
      align-items: center;
      .group-inp {
        margin-left: 20px;
        display: inline-block;
      }
    }
    .msg {
      margin-top: 15px;
      margin-bottom: 15px;
      .group-inp {
        margin-left: 26px;
        display: inline-block;
      }
    }
    .bind-role {
      display: flex;
      align-items: center;
      .select-role {
        margin-left: 34px;
      }
    }
  }
}
</style>
