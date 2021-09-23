<template>
  <div class="negativeDelivery-list">
    <el-radio-group v-model="deliveryType">
      <el-radio-button label="keyWord">关键词投放</el-radio-button>
      <el-radio-button label="goods">商品投放</el-radio-button>
    </el-radio-group>
    <div class="header-msg">

    </div>
    <div class="yy-table-wrap">
      <el-table :data="keyWordTableData" v-show="deliveryType == 'keyWord'"
         @selection-change="handleSelectionChange"
        stripe style="width: 100%" height="400">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="否定关键词"> </el-table-column>
        <el-table-column prop="userName" label="创建时间">
        </el-table-column>
        <el-table-column prop="email" label="广告组">
        </el-table-column>
        <el-table-column prop="groupName" label="广告活动">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <!-- <template #default="scope">

          </template> -->
        </el-table-column>
      </el-table>
      <el-table :data="keyWordTableData" v-show="deliveryType == 'goods'"
         @selection-change="handleSelectionChange"
        stripe style="width: 100%" height="400">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="否定定位"> </el-table-column>
        <el-table-column prop="userName" label="创建时间">
        </el-table-column>
        <el-table-column prop="email" label="广告组">
        </el-table-column>
        <el-table-column prop="groupName" label="广告活动">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <!-- <template #default="scope">

          </template> -->
        </el-table-column>
      </el-table>
    </div>
    <div class="yy-pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs
} from 'vue'
import { allList, search, userDel, userInvite } from '@/api/authority'
import { HttpResponse } from '@/interface/interface'
export default defineComponent({
  name: 'AdAccountManage',
  props: {},
  setup () {
    // 获取当前实例
    const currentInstance: any =
    getCurrentInstance()?.appContext.config.globalProperties

    const state = reactive({
      deliveryType: 'keyWord',
      keyWordTableData: [] as any[],
      goodsTableData: [] as any[],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 50, 100],
      adChannel: '',
      adAccountName: '',
      adAccountId: '',
      sellerId: '',
      input: '',
      channelOptions: [{
        value: 1,
        label: 'Google'
      }, {
        value: 2,
        label: 'Facebook'
      }, {
        value: 3,
        label: 'Amazon'
      }]
    })

    // 获取表格列表
    const gettableList = async () => {
      //
    }

    const handleSearch = (row: any) => {
      state.pageSize = 1
      gettableList()
    }
    const handlDelItem = (row: any) => {
      currentInstance
        .$confirm('确定删除该广告账户？', '删除广告账户', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          const res = (await userDel(row)) as HttpResponse
          // console.log('res: ', res)
          // if (res.code == 0) {
          //   currentInstance.$message({
          //     type: 'success',
          //     message: '删除成功!'
          //   })
          // }
        })
        .catch(() => {
          //
        })
    }
    const handleSelectionChange = () => {
      //
    }
    // 分页相关处理
    const handleSizeChange = (val: any) => {
      state.pageSize = 1
      state.pageSize = val
      gettableList()
    }
    const handleCurrentChange = (val: any) => {
      state.pageIndex = val
      gettableList()
    }

    return {
      ...toRefs(state),
      handleSearch,
      handlDelItem,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange
    }
  }
})
</script>
<style lang="scss" scoped>
.negativeDelivery-list{
  padding: 18px;
}
.mr-10{
  margin-right: 10px;
}
.w-210{
  margin-right: 20px;
  width: 210px;
}
.radius-30{
  margin-left: 70px;
  border-radius: 30px;
}
</style>
