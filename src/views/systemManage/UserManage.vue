<template>
  <div class="user-mg">
    <div class="title">用户管理</div>
    <div class="tab">
      <div class="open-search" @click="handleSearchModal(true)">
        <span class="condition">条件筛选</span>
       <i class="iconfont icon-a-NamesortTypeUserControl"></i>
      </div>
      <el-button type="primary" @click="addUserFn">添加用户</el-button>
        <HeaderMg
        class="search-modal"
        v-if="searchmodal"
        @checkUserFn="checkUserFn"
        @addUserFn="addUserFn"
        @getState="getState"
        @closeFn ="closeFn"
        :hasEmail="true"
      ></HeaderMg>
    </div>

    <div class="yy-table-wrap content">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod"
          label="编号"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="220">
        </el-table-column>
        <el-table-column prop="groupName" label="用户组" width="120">
        </el-table-column>
        <el-table-column prop="statusName" label="状态"> </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small"
              >修改授权</el-button> -->
            <el-button type="text" size="small" @click="handleRemove(scope.row)">删除</el-button>
            <el-button type="text" size="small" v-if="scope.row.status !== 4" @click="handlAgainSend(scope.row)">重新发送邀请</el-button>
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
      :title="addUser ? '添加用户' : '修改授权'"
      v-model="dialogVisible"
      width="700px"
      :close-on-click-modal="false"
    >
      <div class="add-wrap">
        <div class="msg" v-if="addUser">
          <div class="email">
            邮箱：
            <el-input placeholder="请输入邮箱" v-model="input" clearable>
              <!-- @blur="handleBlur" -->
            </el-input>
          </div>
          <!-- <div class="user" v-if="user_name">用户名：{{user_name}}</div> -->
        </div>
        <div class="editer-msg" v-else>
          <div class="info">
            <div class="left">用户名：{{ userinfo.userName }}</div>
            <div class="right">
              邮箱：<span class="info-email">{{ userinfo.email }}</span>
            </div>
          </div>
          <div class="state">
            <span class="state-title">状态</span>
            <div>
              <el-radio v-model="radio" label="4">激活</el-radio>
              <el-radio v-model="radio" label="5">禁用</el-radio>
            </div>
          </div>
        </div>
        <!-- <div class="title">请为该用户添加用户组</div> -->
        <!-- <div class="permission">
          <el-transfer
            v-model="transferVal"
            filterable
            :titles="['用户组', '用户组']"
            :filter-method="filterMethod"
            filter-placeholder="请输入关键字"
            :data="transferData"
          />
        </div> -->
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addUserClose">取 消</el-button>
          <el-button type="primary" @click="addUserSure">保 存</el-button>
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
  toRefs
} from 'vue'
import { indexMethodFn } from './common/index'
import HeaderMg from './common/HeaderMg.vue'
import {
  allList,
  search,
  userDel,
  userInvite,
  userInviteDel,
  againInviteUser
} from '@/api/authority'
import { HttpResponse } from '@/interface/interface'
// import {
//   // mapArrObject
//   cycleMockData
// } from '@/utils/utils'

export default defineComponent({
  name: '',
  props: {},
  setup () {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties
    // 模拟数据 穿梭框
    // const generateData = (): any[] => {
    //   const data: any[] = []
    //   const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
    //   const spell = [
    //     'shanghai',
    //     'beijing',
    //     'guangzhou',
    //     'shenzhen',
    //     'nanjing',
    //     'xian',
    //     'chengdu'
    //   ]
    //   cities.forEach((city, index) => {
    //     data.push({
    //       label: city,
    //       key: index,
    //       spell: spell[index]
    //     })
    //   })
    //   return data
    // }

    const state = reactive({
      tableData: [] as any[],
      total: 0,
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 20,
      dialogVisible: false,
      input: '',
      user_name: '',
      // transferVal: [],
      // transferData: generateData(),
      addUser: true,
      userinfo: {},
      radio: '1',
      checkObj: {
        name: '',
        email: '',
        value: ''
      },
      status: 2,
      searchmodal: false
    })

    /// / 自定义index
    const indexMethod = (num: any) => {
      return indexMethodFn(num, state)
      // return num
    }

    // 获取表格列表
    const gettableList = async () => {
      const params = {
        user_name: state.checkObj.name,
        email: state.checkObj.email,
        status: state.checkObj.value || 2
        // is_admin: 2 // 是否管理员(必填) 0-不是，1-是，2-查询所有
      }
      const res = (await search(params)) as HttpResponse
      if (res.code == 0) {
        state.tableData = res.data.list
        state.total = res.data.total
      } else if (res.code == 1007) {
        // 无数据的时候
        state.tableData = []
        state.total = 0
      }
    }

    const handleBlur = async () => {
      if (!state.input) return
      const params = {
        email: state.input
      }
      const res = (await search(params)) as HttpResponse
      if (res.code == 0) {
        // state.user_name = res.data.
      }
      console.log('res: ', res)
    }
    const getState = (val: any) => {
      state.status = val
    }

    const handleClick = (row: any) => {
      console.log(row)
      state.dialogVisible = true
      state.addUser = false
      state.userinfo = row
      state.radio = row.status + ''
    }
    const handleRemove = (row: any) => {
      console.log(row)
      currentInstance
        .$confirm('在用户管理列表中移除该用户？', '删除用户', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          let res: any
          if (state.status == 1) {
            res = (await userInviteDel(row)) as HttpResponse
          } else if (state.status == 2) {
            res = (await userDel(row)) as HttpResponse
          }

          console.log('res: ', res)
          if (res.code == 0) {
            currentInstance.$message({
              type: 'success',
              message: '删除成功!'
            })
            gettableList()
          }
          // else {
          //   // currentInstance.$message({
          //   //   type: 'error',
          //   //   message: '操作失败!'
          //   // })
          // }
        })
        .catch(() => {
          // currentInstance.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        })
    }
    const handlAgainSend = async (data: any) => {
      const res = (await againInviteUser({ id: data.id })) as HttpResponse
      if (res.code == 0) {
        gettableList()
        currentInstance.$message({
          type: 'success',
          message: '已重新发送！'
        })
      }
    }
    const handleSizeChange = async (val: any) => {
      console.log(`每页 ${val} 条`, typeof val)
      state.pageSize = val
      console.log('state.currentPage: ', state.currentPage)
      const params = {
        page_no: state.currentPage,
        page_size: state.pageSize,
        user_name: state.checkObj.name,
        email: state.checkObj.email,
        status: state.checkObj.value
        // is_admin: 2 // 是否管理员(必填) 0-不是，1-是，2-查询所有
      }
      const res = (await allList(params)) as HttpResponse
      if (res.code == 0) {
        state.tableData = res.data.list
        state.total = res.data.total
      }
    }
    const handleCurrentChange = async (val: any) => {
      console.log(`当前页: ${val}`)
      state.currentPage = val

      const params = {
        page_no: state.currentPage,
        page_size: state.pageSize,
        user_name: state.checkObj.name,
        email: state.checkObj.email,
        status: state.checkObj.value
        // is_admin: 2 // 是否管理员(必填) 0-不是，1-是，2-查询所有
      }
      const res = (await allList(params)) as HttpResponse
      if (res.code == 0) {
        state.tableData = res.data.list
        state.total = res.data.total
      }
    }

    const checkUserFn = async (val: any) => {
      // 发起查询请求
      console.log(val)
      state.checkObj = { ...val }
      gettableList()
      state.searchmodal = false
    }

    const addUserFn = (val: boolean) => {
      console.log('邀请用户', val)
      state.dialogVisible = val
      state.addUser = true
    }

    // // 穿梭框过滤
    // const filterMethod = (query: string, item: any) => {
    //   return item.label.indexOf(query) > -1
    // }
    // 发送邮件
    // const sendEmail = () => {
    //   currentInstance
    //     .$confirm(
    //       '<div><div>尊敬的用户</div><div>管理员{用户名}，{邮箱}邀请你加入团队，点击下方“同意”，即可马上加入。</div></div>',
    //       '系统邀请邮件',
    //       {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning',
    //         dangerouslyUseHTMLString: true
    //       }
    //     )
    //     .then(() => {
    //       currentInstance.$message({
    //         type: 'success',
    //         message: '发送邮件成功'
    //       })
    //     })
    //     .catch(() => {
    //       currentInstance.$message({
    //         type: 'info',
    //         message: '已取消发送'
    //       })
    //     })
    // }
    // 添加用户关闭
    const addUserClose = () => {
      state.dialogVisible = false
    }
    const addUserSure = async () => {
      state.dialogVisible = false
      if (state.addUser) {
        // 添加
        // sendEmail()
        // const params = {

        // }
        if (!state.input) return
        const params = {
          email: state.input
        }
        const res = (await userInvite(params)) as HttpResponse
        if (res.code == 0) {
          gettableList()
          currentInstance.$message.success('邀请邮件发送成功')
        } else if (res.code == 2005) {
          // currentInstance.$message.error(res.msg)
        }
      } else {
        // 修改
        // const params = {
        //   ...state.userinfo,
        //   status: Number(state.radio)
        // }
        // const res1 = await userEdit(params)
        // console.log('res1: ', res1)
      }
    }
    // 数据加载

    const getdata = async () => {
      // if (state.checkObj.value === '已加入') {
      //   state.checkObj.value = '2'
      // }
      const params = {
        status: '2',
        page_no: state.currentPage,
        page_size: state.pageSize
      }
      const res = (await allList(params)) as HttpResponse
      if (res.code == 0) {
        // const newRes = mapArrObject(res.data.list, ['id', 'userName', 'realName'], ['id', 'userName'])
        // const newArr = cycleMockData(res.data.list, 40)
        // console.log(res.data.list, newArr)
        state.tableData = res.data.list
        state.total = res.data.total
      }
    }
    // 搜索框
    const handleSearchModal = (val: boolean) => {
      state.searchmodal = val
    }
    const closeFn = () => {
      state.searchmodal = false
    }

    onMounted(() => {
      getdata()
    })

    return {
      ...toRefs(state),
      handleClick,
      handleSizeChange,
      handleCurrentChange,
      checkUserFn,
      addUserFn,
      // filterMethod,
      addUserClose,
      addUserSure,
      handleRemove,
      handleBlur,
      getState,
      indexMethod,
      handleSearchModal,
      closeFn,
      handlAgainSend
    }
  },
  components: {
    HeaderMg
  }
})
</script>
<style lang="scss">
.user-mg {
  padding: 18px;
  height: 100%;
  border-radius: 20px;
  background-color: #fff;
  overflow-y: auto;
  @include clearScrollbar();
  box-sizing: border-box;

  .title{
    font-size:20px;
    margin-bottom: 20px;
  }
  .tab{
     position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-modal{
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
  .header-msg {
    // padding-top: 18px ;
    // padding: 18px 18px 0;
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
  .add-wrap {
    .msg {
      display: flex;
      align-items: center;
      .email {
        display: flex;
        align-items: center;
      }
      .el-input {
        width: auto;
      }
      .user {
        margin-left: 20px;
      }
    }
    .editer-msg {
      .info {
        height: 30px;
        display: flex;
        align-items: center;
        .left {
          margin-right: 10px;
          width: 300px;
        }
        .right {
        }
        .info-email {
        }
      }
      .state {
        display: flex;
        align-items: center;
        height: 30px;
        .state-title {
          margin-right: 10px;
        }
      }
    }
    .title {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .permission {
    }
  }
}
</style>
