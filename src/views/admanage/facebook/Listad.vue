<template>
  <div class="fb-ad">
    <div class="yy-ad-top">
      <!-- <yy-breadcrumb :breadcrumbList="breadcrumbList"></yy-breadcrumb> -->
      <el-button
        class="open-search title-btn"
        size="medium"
        plain
        @click="handleSearchModal(true)"
      >
        <span class="condition">条件筛选</span>
        <i class="iconfont icon-a-NamesortTypeUserControl"></i>
      </el-button>
      <div class="search" v-show="searchmodal">
        <i class="el-icon-close close" @click="handleSearchModal(false)"></i>
        <div class="top">
          <!-- <div class="top-item">
            <div class="acount">
              <span class="name">广告系列名称</span>
              <el-select
                v-model="selectval"
                clearable
                class="width240"
                placeholder="广告系列名称"
              >
                <el-option
                  v-for="item in selOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                   @change="selectBusinessType"
                >
                </el-option>
              </el-select>
            </div>
          </div> -->
          <div class="top-item" v-if="businessType == 2">
            <div class="acount">
              <span class="name">广告系列名称</span>
              <div class="ad-inp width240">
                <el-input
                  placeholder="广告系列名称查询"
                  v-model="input"
                  suffix-icon="el-icon-search"
                  clearable
                >
                </el-input>
              </div>
            </div>
          </div>
          <div class="top-item" v-if="businessType == 3">
            <div class="acount">
              <span class="name">广告组名称</span>
              <div class="ad-inp width240">
                <el-input
                  placeholder="广告组名称查询"
                  v-model="input"
                  suffix-icon="el-icon-search"
                  clearable
                >
                </el-input>
              </div>
            </div>
          </div>
          <div class="top-item" v-if="businessType == 4">
            <div class="acount">
              <span class="name">广告名称</span>
              <div class="ad-inp width240">
                <el-input
                  placeholder="广告名称查询"
                  v-model="input"
                  suffix-icon="el-icon-search"
                  clearable
                >
                </el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">广告账号</span>
              <el-select
                v-model="selectvalad"
                clearable
                class="width240"
                placeholder="全部"
              >
                <el-option
                  v-for="item in selOptionsAd"
                  :key="item.accountId"
                  :label="item.accountName"
                  :value="item.accountId"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">运行时间</span>
              <el-date-picker
                class="dateselect"
                popper-class="date-style"
                v-model="runtime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">上线时间</span>
              <el-date-picker
                class="dateselect"
                popper-class="date-style"
                v-model="onlinetime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">状态</span>
              <el-select
                v-model="selstatus"
                clearable
                class="width240"
                placeholder="投放状态"
              >
                <el-option
                  v-for="item in ststusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">花费($)</span>
              <div class="inp-type">
                <el-input
                  class="inp"
                  v-model="spendVal1"
                  placeholder="min"
                ></el-input>
                <span class="signal">-</span>
                <el-input
                  class="inp"
                  v-model="spendVal2"
                  placeholder="max"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">预算($)</span>
              <div class="inp-type">
                <el-input
                  class="inp"
                  v-model="budget1"
                  placeholder="min"
                ></el-input>
                <span class="signal">-</span>
                <el-input
                  class="inp"
                  v-model="budget2"
                  placeholder="max"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">ROAS</span>
              <div class="inp-type">
                <el-input
                  class="inp"
                  v-model="ROASval1"
                  placeholder="min"
                ></el-input>
                <span class="signal">-</span>
                <el-input
                  class="inp"
                  v-model="ROASval2"
                  placeholder="max"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">展示广告任务</span>
              <el-select
                v-model="selectad"
                clearable
                class="width240"
                placeholder="仅展示广告任务"
              >
                <el-option
                  v-for="item in adOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="bottom">
          <el-button type="primary" @click="searchFn"
            >查询</el-button
          >
          <el-button @click="resetSearchFn">重置</el-button>
        </div>
      </div>
    </div>
    <div class="yy-ad-content">
      <div class="ad-list">
        <div class="yy-ad-title">广告列表</div>
        <!-- <div class="ad-add" @click="adPublish">广告发布</div> -->
      </div>
      <div class="tabs">
        <el-button
          class="tab-btn"
          :type="businessType == 2 ? 'primary' : ''"
          @click="changeBusinessType(2)"
          >广告系列</el-button
        >
        <el-button
          class="tab-btn"
          :type="businessType == 3 ? 'primary' : ''"
          @click="changeBusinessType(3)"
          >广告组</el-button
        >
        <el-button
          class="tab-btn"
          :type="businessType == 4 ? 'primary' : ''"
          @click="changeBusinessType(4)"
          >广告</el-button
        >
      </div>
      <div class="list">
        <div class="title">
          <div class="left">
            <!-- <el-button class="title-btn" size="medium" type="primary">批量开关</el-button> -->
            <el-button
              class="title-btn"
              size="medium"
              plain
              @click="hangdleBtn(1)"
            >
              <i class="iconfont icon-toll"></i>
              批量开关
            </el-button>
            <el-button
              class="title-btn"
              size="medium"
              plain
              @click="hangdleBtn(2)"
            >
              <i class="iconfont icon-money-recive"></i>
              批量调整预算
            </el-button>
            <el-button
              class="title-btn"
              size="medium"
              plain
              @click="hangdleBtn(3)"
            >
              <i class="iconfont icon-Delete"></i>
              批量删除
            </el-button>
          </div>
          <div class="rigth">
            <div class="filter">
              <el-popover
                popper-class="metrics-popover"
                :width="500"
                trigger="hover"
              >
                <template #reference>
                  <el-button plain
                    ><i class="iconfont icon-a-MultiSelect"></i>
                    配置数据指标</el-button
                  >
                  <!-- <div class="metrics">
                    <i class="iconfont icon-a-MultiSelect"></i> 配置数据指标
                  </div> -->
                </template>
                <div class="wrap">
                  <div class="titles">
                    <span class="name">配置数据指标</span>
                    <!-- <el-button class="tab-btn" size="medium"
                      >广告系列</el-button
                    >
                    <el-button class="tab-btn" size="medium">广告组</el-button>
                    <el-button class="tab-btn" size="medium">广告组</el-button> -->
                  </div>
                  <div class="selects">
                    <div class="left">
                      <div class="title">全部选项</div>
                      <div class="list">
                        <el-checkbox-group v-model="metricList">
                          <el-checkbox
                            v-for="(item, idx) in metricListArr"
                            :key="'metric' + idx"
                            class="metric-check"
                            :label="item"
                            :disabled="item.disabled"
                            >{{ item.name }}</el-checkbox
                          >
                          <!-- <el-checkbox label="复选框 B"></el-checkbox>
                          <el-checkbox label="复选框 C"></el-checkbox>
                          <el-checkbox label="禁用" disabled></el-checkbox>
                          <el-checkbox
                            label="选中且禁用"
                            disabled
                          ></el-checkbox> -->
                        </el-checkbox-group>
                      </div>
                    </div>
                    <div class="right">
                      <div class="right-sle">
                        <div class="title">已选</div>
                        <div class="list">
                          <div
                            v-for="(item, idx) in metricList"
                            :key="'select' + idx"
                          >
                            <i class="el-icon-document"></i>
                            {{ item.name }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="btns">
                    <el-button
                      type="primary"
                      size="medium"
                      @click="metricsHandle"
                      >保存</el-button
                    >
                    <el-button size="medium">取消</el-button>
                  </div>
                </div>
              </el-popover>
            </div>
            <el-button
              class="down title-btn"
              size="medium"
              plain
              @click="exportReportCampaign"
            >
              <i class="iconfont icon-vertical-align-bottom"></i>
              下载数据
            </el-button>
            <!-- <div class="down" @click="exportReportCampaign">
              <i class="iconfont icon-vertical-align-bottom"></i>
              下载数据
            </div> -->
          </div>
        </div>
        <div class="yy-table-wrap table-height">
          <el-table
            :data="tableData"
            stripe
            show-overflow-tooltip
            @selection-change="handleSelectionChange"
            style="width: 100%"
            height="500"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              v-for="(item, idx) in tableFields"
              :key="'tableitem' + idx"
              :prop="item.field"
              :label="item.name"
              :width="item.width"
            >
              <template #default="scope">
                <el-switch
                  v-if="item.name == '开关'"
                  v-model="scope.row.launchStatus"
                  :active-value="1"
                  :inactive-value="2"
                  active-color="#5563cb"
                  inactive-color="#cccccc"
                  @click="handleSwitch(scope.row)"
                >
                </el-switch>
                <span v-else-if="item.name == '状态'">{{
                  scope.row[item.field] == 1 ? '投放中' : '暂停'
                }}</span>
                <span v-else>{{ scope.row[item.field] }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column> -->
          </el-table>
        </div>
      </div>
      <yy-pagination
        :total="total"
        :currentPage="currentPage"
        :pageSize="pageSize"
        :pageSizes="pageSizes"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></yy-pagination>
    </div>
    <yy-adbatchmodal
      :dialogTitle="dialogTitle"
      :dialogShow="dialogShow"
      :dialogVisible="dialogVisible"
      @dialogHandleClose="dialogHandleClose"
      @dialogHandleSure="dialogHandleSure"
    ></yy-adbatchmodal>
  </div>
</template>

<script lang="ts">
// import { useRouter } from 'vue-router'
import router from '@/router'
// import { useStore } from 'vuex'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs,
  watch
} from 'vue'
// import YyBreadcrumb from '@/components/common/YyBreadcrumb.vue'
import YyPagination from '@/components/common/YyPagination.vue'
import YyAdbatchmodal from '@/components/common/YyAdbatchmodal.vue'
import {
  collectExportReportCampaign,
  collectGetData,
  collectGetAccountSelect,
  collectChangeBusinessType,
  collectBatchHandleSwitch,
  collectBatchHandleBudget,
  collectBatchHandleDel,
  collectResetSearchFn,
  collectHandleSwitch
} from '../common/action/index'

export default defineComponent({
  name: '',
  props: {},
  setup () {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties

    // const store = useStore()
    const breadcrumbList = ['Facebook', '广告列表']
    const state = reactive({
      selOptions: [
        {
          value: 'campaignName',
          label: '广告系列名称'
        },
        {
          value: 'adsetName',
          label: '广告组名称'
        },
        {
          value: 'adsName',
          label: '广告名称'
        }
        // {
        //   value: 'taskName',
        //   label: '任务名称'
        // }
      ],
      selectval: '',
      input: '',
      selOptionsAd: [] as any,
      selectvalad: '',
      runtime: [],
      onlinetime: [],
      ststusOptions: [
        {
          value: '1',
          label: '投放中'
        },
        {
          value: '2',
          label: '暂停'
        }
      ],
      selstatus: '',
      spendVal1: '',
      spendVal2: '',
      budget1: '',
      budget2: '',
      ROASval1: '',
      ROASval2: '',
      selectad: '',
      adOptions: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '2',
          label: '否'
        },
        {
          value: '3',
          label: '仅展示广告任务'
        }
      ],
      total: 0,
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 20,
      tableFields: [
        {
          name: '开关',
          field: 'launchStatus',
          width: 120
        },
        {
          name: '任务名称',
          field: 'adsName'
        },
        {
          name: '广告系列名称',
          field: 'campaignName'
        },
        {
          name: '状态',
          field: 'launchStatus'
        },
        {
          name: 'ROAS',
          field: 'purchaseRoas'
        },
        {
          name: '触达用户数',
          field: 'reach'
        },
        {
          name: '展现量',
          field: 'impressions'
        },
        {
          name: '点击数',
          field: 'clicks'
        },
        {
          name: 'CPC',
          field: 'cpc'
        },
        {
          name: 'CTR',
          field: 'ctr'
        }
        // {
        //   name: 'CPM',
        //   field: 'cpm'
        // }
      ] as any,
      tableData: [],
      multipleSelection: [] as any,
      metricList: [] as any,
      dialogVisible: false,
      dialogShow: 3,
      dialogTitle: '批量开关',
      searchmodal: false,
      businessType: 2,
      metricListArr: [] as any,
      channelId: 1
    })

    // const breadcrumbList = computed(() => store.state.common.breadcrumbList)

    const selectBusinessType = (value: any) => {
      // console.log('value: ', value)
      let num
      switch (value) {
        case 'campaignName':
          num = 2
          break
        case 'adsetName':
          num = 3
          break
        case 'adsName':
          num = 4
          break
        // case 'campaignName':
        //   num = 2
        //   break;
      }
      state.businessType = num || 2
    }

    // 搜索广告下拉列表
    const getAccountSelect = async () => {
      collectGetAccountSelect(state)
    }

    // table数据
    const getData = async () => {
      collectGetData(state)
    }

    // 导出数据
    const exportReportCampaign = () => {
      collectExportReportCampaign(state)
    }

    const changeBusinessType = (val: number) => {
      collectChangeBusinessType(state, val)
      getData()
    }

    // 批量按钮
    const hangdleBtn = (val: number) => {
      // 批量选中
      if (state.multipleSelection.length == 0) {
        return currentInstance.$message.warning({
          message: '请批量选中后再操作',
          type: 'warning'
        })
      }
      state.dialogVisible = true
      // console.log(123456, state.dialogVisible)

      if (val == 1) {
        state.dialogTitle = '批量开关'
        state.dialogShow = 1
      } else if (val == 2) {
        state.dialogTitle = '批量调整预算'
        state.dialogShow = 2
      } else if (val == 3) {
        state.dialogTitle = '批量删除'
        state.dialogShow = 3
      }
    }

    // 分页相关处理
    const handleSizeChange = (val: any) => {
      // console.log('页size: ', val)
      state.pageSize = val
      getData()
    }
    const handleCurrentChange = (val: any) => {
      // console.log('页码: ', val)
      state.currentPage = val
      getData()
    }
    // 配置数据指标
    const metricsHandle = () => {
      //
      state.tableFields = state.metricList
    }

    // 表格多选
    const handleSelectionChange = (val: any[]) => {
      console.log('val: ', val)
      state.multipleSelection = val
    }
    // 批量操作api
    const batchHandleSwitch = async (val: any) => {
      collectBatchHandleSwitch(state, val)
      // getData()
    }
    const batchHandleBudget = async (val: any) => {
      collectBatchHandleBudget(state, val)
      // getData()
    }
    const batchHandleDel = async () => {
      collectBatchHandleDel(state)
      // getData()
    }

    // 模态框逻辑
    const dialogHandleClose = () => {
      console.log('132456')
      state.dialogVisible = false
    }
    const dialogHandleSure = (val: any) => {
      switch (state.dialogShow) {
        case 1:
          batchHandleSwitch(val)
          break
        case 2:
          batchHandleBudget(val)
          break
        case 3:
          batchHandleDel()
          break
      }
      state.dialogVisible = false
    }

    // 广告发布按钮
    const adPublish = () => {
      router.push({ name: 'FbPublic' })
    }
    // 搜索框
    const handleSearchModal = (val: boolean) => {
      state.searchmodal = val
    }
    const searchFn = () => {
      getData()
    }
    const resetSearchFn = () => {
      collectResetSearchFn(state)
    }
    const handleSwitch = async (val: any) => {
      collectHandleSwitch(state, val)
      // getData()
    }

    onMounted(() => {
      getData()
      getAccountSelect()
    })

    // watch(
    //   () => state.metricList,
    //   (newval, oldval) => {
    //     console.log('newval: ', newval)
    //   }
    // )
    return {
      breadcrumbList,
      ...toRefs(state),
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
      metricsHandle,
      dialogHandleClose,
      dialogHandleSure,
      hangdleBtn,
      adPublish,
      handleSearchModal,
      searchFn,
      resetSearchFn,
      changeBusinessType,
      handleSwitch,
      exportReportCampaign,
      selectBusinessType
    }
  },
  components: {
    // YyBreadcrumb,
    YyPagination,
    YyAdbatchmodal
  }
})
</script>
<style lang="scss">
.fb-ad {
  height: 100%;
  .yy-ad-top {
    position: relative;
    // margin-bottom: 18px;
    // padding: 18px;
    // height: 220px;
    // background: #ffffff;
    // border-radius: 20px;
    // box-sizing: border-box;
    .open-search {
      position: absolute;
      top: 30px;
      right: 30px;
      .condition {
        margin-right: 5px;
        font-size: 16px;
      }
    }
    .search {
      position: absolute;
      top: 0;
      right: 0;
      padding: 18px;
      width: 800px;
      background: #ffffff;
      box-shadow: 0px 4px 14px 2px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      box-sizing: border-box;
      z-index: 2;
      .close {
        position: absolute;
        top: 12px;
        right: 15px;
        font-size: 18px;
        cursor: pointer;
      }
      .top {
        margin-top: 20px;
        // margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        align-items: center;
        .top-item {
          width: 50%;
          margin-bottom: 20px;
        }
        .el-input__inner {
          height: 38px;
          line-height: 38px;
          // background: #f5f5f5;
        }
        .width240 {
          width: 240px;
        }
        .acount {
          display: flex;
          align-items: center;
        }
        .name {
          width: 100px;
          margin-right: 10px;
          font-size: 14px;
          // font-weight: 400;
          text-align: right;
          color: #333333;
        }
        .dateselect {
          width: 240px;
          .el-range-input {
            // background-color: #f5f5f5;
          }
        }
        .inp-type {
          .signal {
            margin-left: 10px;
            margin-right: 10px;
          }
          .inp {
            width: 108px;
          }
        }
      }
      .bottom {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
  .yy-ad-content {
    // padding: 15px;
    padding-top: 18px;
    padding-bottom: 18px;
    height: 100%;
    // height: calc(100% - 238px);
    border-radius: 20px;
    box-sizing: border-box;
    background-color: #fff;
    // overflow-y: auto;
    // @include clearScrollbar();
    .ad-list {
      margin-bottom: 35px;
      margin-left: 18px;
      display: flex;
      align-items: center;
    }
    .yy-ad-title {
      font-size: 30px;
      color: #2d2d2d;
    }
    .ad-add {
      margin-left: 35px;
      width: 137px;
      height: 56px;
      line-height: 56px;
      font-size: 16px;
      text-align: center;
      color: #fff;
      background: $themeColor;
      border-radius: 30px;
      cursor: pointer;
    }
    .tabs {
      margin-bottom: 15px;
      padding-left: 18px;
      padding-bottom: 18px;
      // border-bottom: 1px solid #e1e1e1;
      .tab-btn {
        margin-right: 20px;
        width: 156px;
        height: 50px;
        font-size: 16px;
        // &.el-button:hover {
        //   border-color: #dcdfe6;
        //   background-color: #fff;
        // }
        &.el-button:focus {
          color: white;
          background-color: $themeColor;
        }
        // &.act{
        //   color: white;
        //   background-color: $themeColor;
        //   border-color: $themeColor;
        // }
      }
    }
    .list {
      .title {
        display: flex;
        justify-content: space-between;
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 15px;
        .title-btn {
          // &.el-button {
          //   border: 0px;
          // }
          &.el-button:focus {
            color: #606266;
          }
          // width:110px;
          // &.el-button--primary{
          //   background: #8f6cc9;
          //   border-color:#8f6cc9;
          // }
          // &.el-button--primary:focus{
          //   // background: $themeColor;
          //   background: #fff;
          // }
          // &.el-button--primary:hover{
          //   // background: $themeColor;
          //    background: #fff;
          // }
        }
        .rigth {
          display: flex;
        }
        .filter {
          line-height: 36px;
          color: $themeColor;
          cursor: pointer;
          .metrics {
            box-sizing: border-box;
            border-bottom: 2px solid #fff;
            &:hover {
              border-bottom: 2px solid $themeColor;
            }
          }
        }
        .down {
          margin-left: 30px;
        }
      }
    }
  }
  .table-height {
    // height: 435px;
    // overflow-y: auto;
    // @include clearScrollbar();
  }
}
.date-style {
  table th,
  table td {
    border: 0px;
    text-align: center;
  }
}
.metrics-popover {
  .metrics {
  }
  .wrap {
    .titles {
      .name {
        margin-right: 25px;
      }
      .tab-btn {
        &.el-button:hover {
          border-color: #dcdfe6;
          background-color: #fff;
        }
        &.el-button:focus {
          color: white;
          background-color: $themeColor;
        }
      }
    }
    .selects {
      margin-top: 15px;
      margin-bottom: 15px;
      display: flex;
      max-height: 250px;
      overflow-y: auto;
      // @include clearScrollbar();
      border-top: 1px solid #e1e1e1;
      border-bottom: 1px solid #e1e1e1;
      .left {
        width: 400px;
        padding: 20px;
        .title {
          margin-bottom: 20px;
          font-size: 16px;
          color: #333333;
        }
        .list {
          //  border-right:1px solid #ccc ;
          .metric-check {
            margin-right: 0;
            width: 50%;
          }
        }
      }
      .right {
        width: 200px;
        .right-sle {
          border-left: 1px solid #ccc;
          padding: 20px;
        }
        .title {
          margin-bottom: 20px;
          font-size: 16px;
          color: #333333;
        }
        .list {
          font-size: 14px;
          color: #333333;
        }
      }
    }
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
