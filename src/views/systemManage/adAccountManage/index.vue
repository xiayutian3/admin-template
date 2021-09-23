<template>
  <div class="ad-account-manage yy-contet-wrap">
    <div class="header-msg">
      <div class="inlineblock">
        <span class="mr-10">广告渠道</span>
        <el-select
          class="w-210"
          v-model="adChannel"
          placeholder="请选择"
          @change="gettableList"
        >
          <el-option
            v-for="item in channelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="inlineblock">
        <span class="mr-10">账号名称</span>
        <el-input
          class="w-210"
          clearable
          v-model="adAccountName"
          placeholder="请输入广告账户名称"
        ></el-input>
      </div>
      <div class="inlineblock">
        <span class="mr-10">账号ID</span>
        <el-input
          class="w-210"
          clearable
          v-model="adAccountId"
          placeholder="请输入广告账号ID"
        ></el-input>
      </div>

      <!-- <div class="inlineblock">
        <span class="mr-10">卖家ID</span>
        <el-input
          class="w-210"
          clearable
          v-model="sellerId"
          placeholder="请输入卖家ID"
        ></el-input>
      </div> -->
      <div class="inlineblock">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button class="radius-30" type="primary" @click="toAuthors"
              >快速授权</el-button
            >
      </div>
    </div>
    <div class="yy-table-wrap">
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        style="width: 100%"
        height="610"
      >
        <el-table-column type="index" label="编号" width="100"> </el-table-column>
        <el-table-column prop="channelName" label="广告渠道"> </el-table-column>
        <el-table-column prop="accountId" label="账号ID"> </el-table-column>
        <el-table-column prop="accountName" label="账户名称">
        </el-table-column>
        <template v-if="adChannel == 3">
          <el-table-column prop="site" label="亚马逊站点">
          </el-table-column>
          <el-table-column prop="authType" label="亚马逊授权类型">
          </el-table-column>
        </template>
        <!-- <el-table-column prop="storeId" label="卖家ID"></el-table-column> -->
        <el-table-column
          prop="authorizationName"
          label="授权人"
        ></el-table-column>
        <el-table-column
          prop="authorizationTime"
          label="授权时间"
          width="150"
        ></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="text" size="small" @click="handlDelItem(scope.row)"
              >删除</el-button
            >
          </template>
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
  <channel-check ref="refChannelCheck"></channel-check>
  <el-dialog
    v-model="isAuthorVisible"
    top="30vh"
    width="400px"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div class="yy-authour-icon">
      <img
        v-if="authorState == 1"
        class="compare-tr-icon"
        src="../../../assets/svg/succes-icon.svg"
        alt=""
      />
      <img
        v-else
        class="compare-tr-icon"
        src="../../../assets/svg/fai-iconl.svg"
        alt=""
      />
      <p class="p-state">{{ authorState == 1 ? '授权成功!' : '授权失败!' }}</p>
      <p class="p-des" v-if="eroMsg">{{ eroMsg }}</p>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router'
import { adCcountList, adCcountDel, adCcountAmazonList, adCcountAmazonDel, amazonSalesAuthorCallback } from '@/api/admanage'
import { HttpResponse } from '@/interface/interface'
import channelCheck from './components/check-channel.vue'
export default defineComponent({
  name: 'AdAccountManage',
  components: { channelCheck },
  props: {},
  setup () {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties

    const state = reactive({
      loading: false,
      isAuthorVisible: false,
      authorState: null, // 1成功 2失败
      eroMsg: '', // 授权错误信息
      tableData: [] as any[],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 50, 100],
      adChannel: 1,
      adAccountName: '',
      adAccountId: '',
      sellerId: '',
      channelOptions: [
        {
          value: 1,
          label: 'Facebook'
        },
        {
          value: 2,
          label: 'Google'
        },
        {
          value: 3,
          label: 'Amazon'
        }
      ]
    })
    const router = useRouter()
    const succesState = (router.currentRoute.value.query.state as any) || ''
    const errorMsg = (state.eroMsg =
      (router.currentRoute.value.query.msg as string) || '')

    const spId = (router.currentRoute.value.query.selling_partner_id as any) || ''
    const spCode = (router.currentRoute.value.query.spapi_oauth_code as any) || ''
    const spState = (router.currentRoute.value.query.state as any) || ''

    const onCallbackSpApiAuth = async () => {
      const params = {
        selling_partner_id: spId,
        spapi_oauth_code: spCode,
        state: spState
      }
      const res = await amazonSalesAuthorCallback(params) as HttpResponse
      if (res.code == 0 && res.data) {
        state.authorState = 1 as any
      } else {
        state.authorState = 2 as any
        state.eroMsg = res.msg as string
      }
      state.isAuthorVisible = true
      setTimeout(() => {
        router.push('/home/adAccountManage')
      }, 2000)
    }
    // 是否亚马逊 亚马逊销售授权
    if (spId) {
      state.adChannel = 3
      onCallbackSpApiAuth()
    } else {
      if (succesState) {
        state.authorState = succesState
        state.eroMsg = errorMsg
        state.isAuthorVisible = true
        setTimeout(() => {
          router.push('/home/adAccountManage')
        }, 2000)
      }
    }
    // 获取表格列表
    const gettableList = async () => {
      state.loading = true
      const params = {
        channelId: state.adChannel,
        accountName: state.adAccountName,
        accountId: state.adAccountId,
        storeId: state.sellerId,
        current: state.pageIndex,
        size: state.pageSize
      }
      const res = state.adChannel == 3 ? (await adCcountAmazonList(params)) as HttpResponse : (await adCcountList(params)) as HttpResponse
      state.tableData = res.data.records
      state.total = res.data.total
      state.loading = false
    }
    gettableList()

    const refChannelCheck = ref()
    const toAuthors = () => {
      refChannelCheck.value.handleOpen()
    }
    const handleClose = () => {
      state.isAuthorVisible = false
      gettableList()
    }
    const handleSearch = (row: any) => {
      state.pageIndex = 1
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
          const res = state.adChannel == 3 ? (await adCcountAmazonDel({ ids: [row.id] })) as HttpResponse : (await adCcountDel({ ids: [row.id] })) as HttpResponse
          if (res.code == 0) {
            currentInstance.$message({
              type: 'success',
              message: '删除成功!'
            })
            gettableList()
          }
        })
        .catch(() => {
          //
        })
    }
    const handleSizeChange = (val: any) => {
      state.pageIndex = 1
      state.pageSize = val
      gettableList()
    }
    const handleCurrentChange = (val: any) => {
      state.pageIndex = val
      gettableList()
    }

    return {
      ...toRefs(state),
      refChannelCheck,
      handleSearch,
      toAuthors,
      handlDelItem,
      handleSizeChange,
      handleCurrentChange,
      handleClose,
      gettableList
    }
  }
})
</script>
<style lang="scss" scoped>
.ad-account-manage{
  .inlineblock{
    padding-top: 10px;
    margin-right: 20px;
    display: inline-block;
  }
}
.mr-10 {
  margin-right: 10px;
}
.w-210 {
  margin-right: 20px;
  width: 210px;
}
.radius-30 {
  margin-left: 70px;
  border-radius: 30px;
}
.yy-authour-icon {
  margin: 0 auto;
  text-align: center;
  .p-state {
    margin-top: 20px;
    font-size: 18px;
  }
  .p-des {
    line-height: 1;
    font-size: 14px;
    color: #666666;
  }
}
</style>
