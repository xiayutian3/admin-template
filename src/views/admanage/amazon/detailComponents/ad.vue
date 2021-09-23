<template>
  <div class="amzn-ad-list">
    <div class="filtering md10">
      <el-button
        class="open-search title-btn"
        plain
        @click="handleSearchModalFilter(true)"
      >
        <span class="condition">条件筛选 </span>
        <i class="iconfont icon-a-NamesortTypeUserControl"></i>
      </el-button>
      <div class="search big-search" v-show="searchmodalfilter">
        <i
          class="el-icon-close close"
          @click="handleSearchModalFilter(false)"
        ></i>
        <div class="top">
          <div class="top-item">
            <div class="acount">
              <span class="name"> 状态</span>
              <el-select
                v-model="stateval"
                clearable
                collapse-tags
                class="width240"
                placeholder="请选择状态"
              >
                <el-option
                  v-for="item in selectstateOptons"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">ASIN/SKU</span>
              <div class="ad-inp width240">
                <el-input placeholder="输入ASIN/SKU" v-model="inputAsinOrSku" clearable>
                </el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">曝光</span>
              <div class="inp-type">
                <el-input
                  type="number"
                  class="inp"
                  v-model="exposure1"
                  placeholder="min"
                ></el-input>
                <span class="signal">-</span>
                <el-input
                  type="number"
                  class="inp"
                  v-model="exposure2"
                  placeholder="max"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">点击</span>
              <div class="inp-type">
                <el-input
                  type="number"
                  class="inp"
                  v-model="clickval1"
                  placeholder="min"
                ></el-input>
                <span class="signal">-</span>
                <el-input
                  type="number"
                  class="inp"
                  v-model="clickval2"
                  placeholder="max"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">花费($)</span>
              <div class="inp-type">
                <el-input
                  type="number"
                  class="inp"
                  v-model="spendVal1"
                  placeholder="min"
                ></el-input>
                <span class="signal">-</span>
                <el-input
                  type="number"
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
                  type="number"
                  class="inp"
                  v-model="budget1"
                  placeholder="min"
                ></el-input>
                <span class="signal">-</span>
                <el-input
                  type="number"
                  class="inp"
                  v-model="budget2"
                  placeholder="max"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">ACOS</span>
              <div class="inp-type">
                <el-input
                  type="number"
                  class="inp"
                  v-model="ACOSval1"
                  placeholder="min"
                ></el-input>
                <span class="signal">-</span>
                <el-input
                  type="number"
                  class="inp"
                  v-model="ACOSval2"
                  placeholder="max"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">CPC</span>
              <div class="inp-type">
                <el-input
                  type="number"
                  class="inp"
                  v-model="CPCval1"
                  placeholder="min"
                ></el-input>
                <span class="signal">-</span>
                <el-input
                  type="number"
                  class="inp"
                  v-model="CPCval2"
                  placeholder="max"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">CTR</span>
              <div class="inp-type">
                <el-input
                  type="number"
                  class="inp"
                  v-model="CTRval1"
                  placeholder="min"
                ></el-input>
                <span class="signal">-</span>
                <el-input
                  type="number"
                  class="inp"
                  v-model="CTRval2"
                  placeholder="max"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">CPA</span>
              <div class="inp-type">
                <el-input
                  type="number"
                  class="inp"
                  v-model="CPAval1"
                  placeholder="min"
                ></el-input>
                <span class="signal">-</span>
                <el-input
                  type="number"
                  class="inp"
                  v-model="CPAval2"
                  placeholder="max"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">广告订单</span>
              <div class="inp-type">
                <el-input
                  type="number"
                  class="inp"
                  v-model="orderval1"
                  placeholder="min"
                ></el-input>
                <span class="signal">-</span>
                <el-input
                  type="number"
                  class="inp"
                  v-model="orderval2"
                  placeholder="max"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">广告销售额</span>
              <div class="inp-type">
                <el-input
                  type="number"
                  class="inp"
                  v-model="adSalesval1"
                  placeholder="min"
                ></el-input>
                <span class="signal">-</span>
                <el-input
                  type="number"
                  class="inp"
                  v-model="adSalesval2"
                  placeholder="max"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <el-button type="primary" @click="searchFnFilter">查询</el-button>
          <el-button @click="resetSearchFnFilter">重置</el-button>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="title">
        <div class="left">
          <el-dropdown @command="handleCommand">
            <el-button plain>
              <span class="el-dropdown-link">
                批量操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu class="menu-list">
                <el-dropdown-item command="enabled">启用</el-dropdown-item>
                <el-dropdown-item command="paused">暂停</el-dropdown-item>
                <el-dropdown-item command="archived">归档</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
              </template>
              <div class="wrap">
                <div class="titles">
                  <span class="name">配置数据指标</span>
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
                          :disabled="item.choose == 2"
                          >{{ item.name }}</el-checkbox
                        >
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
                  <el-button type="primary" size="medium" @click="saveUserField"
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
        </div>
      </div>
      <div class="yy-table-wrap table-height">
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          stripe
          show-overflow-tooltip
          @selection-change="handleSelectionChange"
          :width="tableWidth"
          height="420"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            v-for="(item, idx) in tableFields"
            :key="'tableitem' + idx"
            :prop="item.value"
            :label="item.name"
          >
            <template #default="scope">
              <div v-if="item.name == '状态'">
                <el-select
                  v-model="scope.row[item.value]"
                  collapse-tags
                  size="small"
                  style="width: 100px;"
                >
                  <el-option
                    v-for="sItem in stateOptions"
                    :key="sItem.value"
                    :label="sItem.label"
                    :value="sItem.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div
                v-else-if="item.value == '价格'"
              >
                <span v-if="!scope.row[`act${item.value}`]"
                  >
                  <span>{{ scope.row[item.value] }}
                  </span>
                  <i
                    class="el-icon-edit"
                    @click="handKeyDblclick(scope.$index, `act${item.value}`)"
                  ></i
                ></span>
                <el-input
                  size="small"
                  v-focus
                  v-if="scope.row[`act${item.value}`]"
                  autofocus
                  v-model="scope.row[item.value]"
                  @blur="handKeyDblclickBlur(scope.$index, `act${item.value}`)"
                ></el-input>
              </div>
              <div v-else-if="item.value == '图片'">
                <el-image
                  style="width: 100px; height: 60px"
                  :src="scope.row[item.value]"
                  fit="scale-down"
                  :preview-src-list="[scope.row[item.value]]"
                ></el-image>
              </div>
              <span v-else>{{ scope.row[item.value] }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column label="操作" width="100">
            <template #default="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
              ></el-button>

              <el-dropdown @command="handleCommandItem">
                <i class="el-icon-s-operation themecolor"></i>
                <template #dropdown>
                  <el-dropdown-menu class="menu-list">
                    <el-dropdown-item command="1">启用</el-dropdown-item>
                    <el-dropdown-item command="4">暂停</el-dropdown-item>
                    <el-dropdown-item command="5">归档</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column> -->
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
    <!-- 修改广告设置弹层 -->
    <el-dialog
    v-model="dialogVisSet"
    title="修改广告组设置"
    width="460px"
    :close-on-click-modal="false"
    :before-close="handleCloseSetView"
    >
    <el-form
      :model="setsForm"
      ref="refSetViewForm"
      label-position="left"
      :rules="setViewRules"
      label-width="100px"
      class="demo-setsForm"
    >
      <el-form-item label="广告活动名称">
        {{setsForm.activeName}}
      </el-form-item>
      <el-form-item label="广告组名称" prop="groupName">
        <el-input v-model="setsForm.groupName" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="默认出价" prop="defaultPrice">
        <!-- <el-input v-model="setsForm.defaultPrice" type="number"></el-input> -->
        <el-input-number :precision="2" v-model="setsForm.defaultPrice" :controls="false" controls-position="right"></el-input-number>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisSet = false">取 消</el-button>
        <el-button type="primary" @click="onSaveSetting">保 存</el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script lang="ts">
import YyPagination from '@/components/common/YyPagination.vue'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs
} from 'vue'
import {
  GetCollectAccountSelect,
  onSaveUserField,
  getStatusOptions
} from '../../common/action/getCommonDate'
import {
  spAdList,
  spAdUpdateState,
  spAdListExport
} from '@/api/admanage'
import { HttpResponse } from '@/interface/interface'

export default defineComponent({
  name: '',
  props: {
    // 公共筛选条件
    commonFilter: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props, ctx) {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties
    // 校验默认价格
    const checkDefaultPrice = (rule: any, value: any, callback: any) => {
      if (value == '' || value === undefined) {
        return callback(new Error('请输入默认出价'))
      }
      if (value <= 0) {
        callback(new Error('默认出价必须大于0'))
      } else {
        callback()
      }
    }
    const state = reactive({
      tableLoading: false,
      tableWidth: '',

      stateval: '',
      selectstateOptons: [] as any,
      stateOptions: [
        { label: '启用', value: 'enabled' },
        { label: '暂停', value: 'paused' },
        { label: '归档', value: 'archived' }
      ],
      inputAsinOrSku: '',
      // 区间集合
      spendVal1: '',
      spendVal2: '',
      budget1: '',
      budget2: '',
      ACOSval1: '',
      ACOSval2: '',
      exposure1: '',
      exposure2: '',
      clickval1: '',
      clickval2: '',
      CTRval1: '',
      CTRval2: '',
      orderval1: '',
      orderval2: '',
      CPCval1: '',
      CPCval2: '',
      CPAval1: '',
      CPAval2: '',
      adSalesval1: '',
      adSalesval2: '',
      // 分页相关
      total: 0,
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 20,
      tableFields: [] as any,
      tableData: [] as any,
      tableDataOld: [] as any,
      multipleSelection: [] as any,

      metricList: [] as any,
      searchmodalfilter: false,
      metricListArr: [] as any,
      channelId: 3,
      // 设置表单相关
      dialogVisSet: false,
      setsForm: {
        activeName: '',
        groupName: '',
        defaultPrice: 0
      },
      setViewRules: {
        groupName: [
          { required: true, message: '请输入广告组名称', trigger: 'blur' }
        ],
        defaultPrice: [{ validator: checkDefaultPrice, trigger: 'blur', required: true }]
      }
    })

    // 请求参数
    const reqParams = {
      // 注释调的没调通 先放着
      // 公共条件
      site: props.commonFilter.site,
      storeId: props.commonFilter.storeId,
      // 当前页面
      state: state.stateval,
      asinAndsku: state.inputAsinOrSku,
      minImpressions: state.exposure1,
      maxImpressions: state.exposure2,
      minClicks: state.clickval1,
      maxClicks: state.clickval2,
      minSpend: state.spendVal1,
      maxSpend: state.spendVal2,
      minCtr: state.CTRval1,
      maxCtr: state.CTRval2,
      minCpc: state.CPCval1,
      maxCpc: state.CPCval2,
      minCostPerConversion: state.CPAval1,
      maxCostPerConversion: state.CPAval2,
      // 分页
      size: state.pageSize,
      current: state.currentPage
    }

    // table数据
    const getListData = async () => {
      state.tableLoading = true
      const res = (await spAdList(reqParams)) as HttpResponse
      state.tableData = res.data.records || []
      state.tableDataOld = JSON.parse(JSON.stringify(state.tableData))
      state.total = res.data.total

      state.tableLoading = false
      state.multipleSelection = []
    }
    // 数据配置项
    const getFieldsByCode = async () => {
      const params = {
        code: 'AD_AMZ_0005'
      }
      GetCollectAccountSelect(state, params, getListData)
    }

    const saveUserField = async () => {
      const params = {
        code: 'AD_AMZ_0005'
      }
      onSaveUserField(state, params, getFieldsByCode)
    }
    // 导出数据
    const exportReportCampaign = () => {
      spAdListExport(reqParams)
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

      if (val == 1) {
        //
      } else if (val == 2) {
        //
      } else if (val == 3) {
        //
      }
    }
    const handleCommand = (command: any) => {
      // 批量选中
      if (state.multipleSelection.length == 0) {
        return currentInstance.$message.warning({
          message: '请批量选中后再操作',
          type: 'warning'
        })
      }
      switch (command) {
        case 'enabled':
          changManyStatus(command)
          break
        case 'paused':
          changManyStatus(command)
          break
        case 'archived':
          changManyStatus(command)
          break
      }
    }
    // 修改状态请求
    const handleUpdateState = async (params: any) => {
      state.tableLoading = true
      const res = (await spAdUpdateState(params)) as HttpResponse

      getListData()
      state.tableLoading = false
    }
    // 修改单个状态
    const changStatus = async (val: any) => {
      const params = {
        state: val.state,
        site: props.commonFilter.site,
        storeId: props.commonFilter.storeId,
        amzAdUpdateStateDTOList: [val]
      }
      handleUpdateState(params)
    }
    // 修改多个状态
    const changManyStatus = async (status: any) => {
      const params = {
        state: status,
        site: props.commonFilter.site,
        storeId: props.commonFilter.storeId,
        amzAdUpdateStateDTOList: state.multipleSelection
      }
      handleUpdateState(params)
    }
    const handleCommandItem = (command: any) => {
      console.log('val: ', command)
    }

    // input双击编辑修改
    const handKeyDblclick = (index: number, name: string) => {
      console.log('handKeyDblclick--', name);
      //
      (state.tableData[index] as any)[name] = true
    }
    const handKeyDblclickBlur = (index: number, name: string) => {
      //
      (state.tableData[index] as any)[name] = false
    }

    // 分页相关处理
    const handleSizeChange = (val: any) => {
      state.currentPage = 1
      state.pageSize = val
      getListData()
    }
    const handleCurrentChange = (val: any) => {
      state.currentPage = val
      getListData()
    }
    // 配置数据指标
    const metricsHandle = () => {
      //
    }

    // 表格多选
    const handleSelectionChange = (val: any[]) => {
      state.multipleSelection = val
    }
    // 批量操作api
    const batchHandleSwitch = async (val: any) => {
      // collectBatchHandleSwitch(state, val)
      // getListData()
    }
    const batchHandleBudget = async (val: any) => {
      // collectBatchHandleBudget(state, val)
      // getListData()
    }

    // 搜索框-显示隐藏
    const handleSearchModalFilter = (val: boolean) => {
      state.searchmodalfilter = val
    }
    // 修改设置弹层相关
    const openSetview = () => {
      state.dialogVisSet = true
    }
    const handleCloseSetView = () => {
      state.dialogVisSet = false
    }
    const refSetViewForm = ref()
    const onSaveSetting = () => {
      refSetViewForm.value.validate(async (valid: boolean) => {
        if (valid) {
          alert(0)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    const resetFilter = () => {
      state.stateval = ''
      state.inputAsinOrSku = ''
      state.spendVal1 = ''
      state.spendVal2 = ''
      state.budget1 = ''
      state.budget2 = ''
      state.ACOSval1 = ''
      state.ACOSval2 = ''
      state.exposure1 = ''
      state.exposure2 = ''
      state.clickval1 = ''
      state.clickval2 = ''
      state.CTRval1 = ''
      state.CTRval2 = ''
      state.orderval1 = ''
      state.orderval2 = ''
      state.CPCval1 = ''
      state.CPCval2 = ''
      state.CPAval1 = ''
      state.CPAval2 = ''
      state.adSalesval1 = ''
      state.adSalesval2 = ''
    }

    const searchFnFilter = () => {
      state.currentPage = 1
      getListData()
    }
    const resetSearchFnFilter = () => {
      resetFilter()
    }

    const handleSwitch = async (val: any) => {
      // collectHandleSwitch(state, val)
      // getListData()
    }
    // 初始化请求
    onMounted(() => {
      // 下拉数据
      getStatusOptions(state)
      // 配置数据表头及列表数据
      getFieldsByCode()
    })
    return {
      refSetViewForm,
      ...toRefs(state),
      getFieldsByCode,
      saveUserField,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
      metricsHandle,
      hangdleBtn,
      handleSearchModalFilter,
      searchFnFilter,
      resetSearchFnFilter,
      handleSwitch,
      changStatus,
      changManyStatus,
      exportReportCampaign,
      handKeyDblclick,
      handKeyDblclickBlur,
      handleCommand,
      handleCommandItem,
      openSetview,
      handleCloseSetView,
      onSaveSetting
    }
  },
  components: {
    YyPagination
  }
})
</script>
<style lang="scss">
.amzn-ad-list {
  .filtering {
    margin-right: 18px;
    position: relative;
    display: flex;
    justify-content: space-between;
    .search {
      &.min-search {
        position: absolute;
        top: 0;
        left: 0;
        width: 400px;
        .top {
          .top-item {
            width: 100%;
            // margin-bottom: 20px;
          }
        }
      }
      &.big-search {
        position: absolute;
        top: 0;
        left: 0;
        width: 800px;
      }
      padding: 18px;
      background: #ffffff;
      box-shadow: 0px 4px 14px 2px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      box-sizing: border-box;
      z-index: 4;
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
  .list {
    max-width: 100%;
    overflow-x: auto;
    .title {
      display: flex;
      justify-content: space-between;
      margin-left: 18px;
      margin-right: 18px;
      margin-bottom: 15px;
      .title-btn {
        margin-left: 10px;
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
    .tag-list {
      padding-left: 18px;
      display: flex;
      align-items: center;
      .tag-title {
        margin-right: 10px;
      }
      .tag-btns {
        .el-button {
          border: 0;
        }
        .act {
          // .el-button.is-plain:focus,
          // .el-button.is-plain:hover {
          color: $themeColor;
          // }
        }
      }
    }
  }
  .themecolor {
    color: $themeColor;
  }
}
</style>
