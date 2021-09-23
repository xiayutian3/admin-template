<template>
  <div class="amzn-adactive">
    <div class="filtering md10">
      <el-button
        class="open-search title-btn"
        plain
        @click="handleSearchModalFilter(true)"
      >
        <span class="condition">条件筛选 </span>
        <i class="iconfont icon-a-NamesortTypeUserControl"></i>
      </el-button>
      <!-- <el-button type="primary" round @click="newAdFn">创建广告活动</el-button> -->
      <div class="search big-search" v-show="searchmodalfilter">
        <i
          class="el-icon-close close"
          @click="handleSearchModalFilter(false)"
        ></i>
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
          <div class="top-item">
            <div class="acount">
              <span class="name"> 全部类型</span>
              <el-select
                v-model="alltype"
                clearable
                class="width240"
                placeholder=" 全部类型"
              >
                <el-option
                  v-for="item in alltypelist"
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
              <span class="name"> 关键词/商品</span>
              <el-select
                v-model="autoOrdo"
                clearable
                class="width240"
                placeholder=" 全部类型"
              >
                <el-option
                  v-for="item in autoOrdolist"
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
              <span class="name"> 状态</span>
              <el-select
                v-model="stateval"
                clearable
                multiple
                collapse-tags
                class="width240"
                placeholder="请选择状态"
              >
                <el-option
                  v-for="item in statelist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <!-- <div class="top-item">
            <div class="acount">
              <span class="name"> 投放类型</span>
              <el-select
                v-model="droptype"
                clearable
                class="width240"
                placeholder=" 选择投放类型"
              >
                <el-option
                  v-for="item in droptypelist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div> -->
          <!-- <div class="top-item">
            <div class="acount">
              <span class="name"> 竞价策略</span>
              <el-select
                v-model="bidstrategies"
                clearable
                class="width240"
                placeholder=" 选择竞价策略"
              >
                <el-option
                  v-for="item in bidstrategieslist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div> -->
          <div class="top-item">
            <div class="acount">
              <span class="name"> 广告发布</span>
              <el-select
                v-model="allads"
                clearable
                class="width240"
                placeholder=" 选择广告发布"
              >
                <el-option
                  v-for="item in alladslist"
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
              <span class="name">广告组名称</span>
              <div class="ad-inp width240">
                <el-input placeholder="广告组名称" v-model="input" clearable>
                </el-input>
              </div>
            </div>
          </div>
          <!-- <div class="top-item">
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
            </div> -->
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
          <!-- <el-button class="title-btn" size="medium" type="primary">批量开关</el-button> -->
          <el-dropdown @command="handleCommand">
            <el-button plain>
              <span class="el-dropdown-link">
                批量操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            </el-button>
            <!-- <span class="el-dropdown-link">
                批量操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span> -->
            <template #dropdown>
              <el-dropdown-menu class="menu-list">
                <el-dropdown-item command="7">调整出价</el-dropdown-item>
                <el-dropdown-item command="8">应用建议出价</el-dropdown-item>
                <!-- <el-dropdown-item command="6">移动到广告组合</el-dropdown-item> -->
                <!-- <el-dropdown-item command="2">调整预算</el-dropdown-item> -->
                <el-dropdown-item command="1">启用</el-dropdown-item>
                <!-- <el-dropdown-item command="3">删除</el-dropdown-item> -->
                <el-dropdown-item command="4">暂停</el-dropdown-item>
                <el-dropdown-item command="5">归档</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- <el-button
              v-if="tabsActiveIndex !== 1"
              class="title-btn"
              size="medium"
              plain
              @click="hangdleBtn(1)"
            >
              <i class="iconfont icon-toll"></i>
              批量开关
            </el-button> -->
          <!-- <el-button
              class="title-btn"
              size="medium"
              plain
              @click="hangdleBtn(2)"
              >批量调整预算</el-button
            > -->
          <!-- <el-button
              class="title-btn"
              size="medium"
              plain
              @click="hangdleBtn(3)"
            >
              <i class="iconfont icon-Delete"></i>
              批量删除
            </el-button> -->
          <!-- <el-button class="title-btn" plain>
              <i class="iconfont icon-Delete"></i>
              同步数据
            </el-button> -->
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

          <!-- <div class="down" @click="exportReportCampaign">
              <i class="iconfont icon-vertical-align-bottom"></i>
              下载数据
            </div> -->
        </div>
      </div>
      <!-- <div class="tag-list">
        <div class="tag-title">标签：</div>
        <div class="tag-btns">
          <el-button
            :class="{ act: quickIndex == 1 }"
            plain
            @click="quickFilter(1)"
            >全部
          </el-button>
          <el-button
            :class="{ act: quickIndex == 2 }"
            plain
            @click="quickFilter(2)"
            >有成交</el-button
          >
          <el-button
            :class="{ act: quickIndex == 3 }"
            plain
            @click="quickFilter(3)"
            >有点急无成交</el-button
          >
          <el-button
            :class="{ act: quickIndex == 4 }"
            plain
            @click="quickFilter(4)"
            >有曝光无成交</el-button
          >
          <el-button
            :class="{ act: quickIndex == 5 }"
            plain
            @click="quickFilter(5)"
            >无曝光</el-button
          >
        </div>
      </div> -->
      <div class="yy-table-wrap table-height">
        <el-table
          :data="tableData"
          stripe
          show-overflow-tooltip
          @selection-change="handleSelectionChange"
          style="width: 100%"
          height="420"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            v-for="(item, idx) in tableFields"
            :key="'tableitem' + idx"
            :prop="item.field"
            :label="item.name"
            :width="getItemWidth(tableFields)"
          >
            <template #default="scope">
              <!-- <el-switch
                v-if="item.name == '开关' && tabsActiveIndex != 1"
                v-model="scope.row.launchStatus"
                :active-value="1"
                :inactive-value="2"
                active-color="#5563cb"
                inactive-color="#cccccc"
                @click="handleSwitch(scope.row)"
              >
              </el-switch> -->

              <!-- %比相关处理 -->
              <!-- <span v-else-if="item.name == 'ACOS'">{{(scope.row.acos*100 ).toFixed(2)}}</span> -->

              <!-- 编辑情况 -->
              <div
                v-if="
                  item.name == '广告组' ||
                  item.name == '默认出价'
                "
              >
               <!-- item.name == '建议出价' || -->
                <span v-if="!scope.row[`act${item.value}`]">
                  <span @click="checkDetail(item.value, scope.row)"
                    >{{ scope.row[item.value] }}
                  </span>
                  <i
                    v-if="
                      scope.row.launchStatus != 3 &&
                      scope.row.adTypeValue != '汇总'
                    "
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
                  @blur="handKeyDblclickBlur(scope, `act${item.value}`)"
                ></el-input>
              </div>

              <!-- 下拉切换 -->
              <div v-else-if="item.name == '状态'">
                <el-select
                  v-if="
                    scope.row.launchStatus == 1 ||
                    scope.row.launchStatus == 2 ||
                    scope.row.launchStatus == 3
                  "
                  v-model="scope.row.launchStatus"
                  size="small"
                  @change="changStatus(scope.row)"
                  :disabled="scope.row.launchStatus == 3"
                >
                  <el-option
                    v-for="item in statuslist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <span v-else>{{ scope.row.launchStatusValue }}</span>
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
                    <el-dropdown-item command="6"
                      >移动到广告组合</el-dropdown-item
                    >
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
    <amznbatchmodal
      :suggestbidList="suggestbidList"
      :dialogWidth="dialogWidth"
      :dialogTitle="dialogTitle"
      :dialogShow="dialogShow"
      :dialogVisible="dialogVisible"
      @dialogHandleClose="dialogHandleClose"
      @dialogHandleSure="dialogHandleSure"
      @suggestbidHandle="addsuggestbid"
    ></amznbatchmodal>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import YyPagination from '@/components/common/YyPagination.vue'
import Amznbatchmodal from './Amznbatchmodal.vue'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs
} from 'vue'
import {
  azGetFieldsByCode,
  azSaveUserField,
  azGroupList,
  azReportAdgroup,
  azbatchHandleBid,
  azAdgroupBatchSwitch,
  azamzAdgroupedit
} from '@/api/admanage'
import {
  collectExportReportCampaign,
  collectGetData,
  collectChangeBusinessType,
  collectBatchHandleSwitch,
  collectBatchHandleBudget,
  collectBatchHandleDel,
  collectResetSearchFn,
  collectHandleSwitch,
  collectAzStoreSelecList
} from '../../common/action/index'
import { HttpResponse } from '@/interface/interface'
import { getKeyArray } from '@/utils/utils'

export default defineComponent({
  name: '',
  props: {
    // 公共筛选条件
    commonFilter: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties
    const state = reactive({
      alltype: '',
      alltypelist: [],
      autoOrdo: '',
      autoOrdolist: [
        {
          value: 3,
          label: '关键词/商品'
        },
        {
          value: 2,
          label: '关键词'
        },
        {
          value: 1,
          label: '商品'
        }
      ],
      stateval: [1, 2],
      statelist: [
        {
          value: 1,
          label: '投放中'
        },
        {
          value: 2,
          label: '暂停'
        },
        {
          value: 3,
          label: '归档'
        },
        {
          value: 4,
          label: '审核中'
        },
        {
          value: 5,
          label: '草稿箱'
        },
        {
          value: 6,
          label: '发布失败'
        },
        {
          value: 7,
          label: '发布中'
        }
      ],
      droptype: '',
      droptypelist: [
        {
          value: 1,
          label: '关键词'
        },
        {
          value: 2,
          label: '商品'
        },
        {
          value: 3,
          label: '关键词/商品'
        }
      ],
      bidstrategies: '',
      bidstrategieslist: [
        {
          value: 2,
          label: '动态竞价-只降低'
        },
        {
          value: 3,
          label: '动态竞价-提高和降低'
        },
        {
          value: 1,
          label: '固定竞价'
        }
      ],
      allads: '',
      alladslist: [
        {
          value: 0,
          label: '非亚马逊发布'
        },
        {
          value: 1,
          label: '亚马逊后台发布'
        }
      ],
      input: '',
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
      quickIndex: 1,
      total: 0,
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 20,
      tableFields: [
        {
          name: '状态',
          field: 'launchStatusValue'
        },
        {
          name: '广告组',
          field: 'adgroupName',
          width: 120
        },
        {
          name: '广告活动',
          field: 'campaignName'
        },
        {
          name: '类型',
          field: 'adType'
        },
        {
          name: '建议出价',
          field: 'suggestedStr'
        },
        {
          name: '默认竞价',
          field: 'bid'
        },
        {
          name: '曝光',
          field: 'impressions'
        },
        {
          name: '点击数',
          field: 'clicks'
        },
        {
          name: 'CTR',
          field: 'ctr'
        },
        {
          name: 'CPC',
          field: 'cpc'
          // width: 120
        },
        {
          name: '花费',
          field: 'spend'
        },
        {
          name: '广告销售额',
          field: 'attributedSales',
          width: 120
        },

        {
          name: 'ACOS',
          field: 'acos'
        },
        {
          name: 'RoAS',
          field: 'purchaseRoas'
        },
        {
          name: '广告订单',
          field: 'attributedUnitsOrdered'
        },
        {
          name: 'CPA',
          field: 'cpa'
        }
      ] as any,
      tableData: [],
      multipleSelection: [] as any,
      metricList: [] as any,
      dialogVisible: false,
      dialogShow: 3,
      dialogTitle: '批量开关',
      searchmodalfilter: false,
      businessType: 2,
      metricListArr: [] as any,
      channelId: 3,
      dialogWidth: '500px',
      statusval: 1,
      statuslist: [
        {
          value: 1,
          label: '开启'
        },
        {
          value: 2,
          label: '暂停'
        },
        {
          value: 3,
          label: '归档'
        }
      ],
      suggestbidList: [] as any
    })

    // const breadcrumbList = computed(() => store.state.common.breadcrumbList)
    // 公共请求参数
    const getfilterparams = () => {
      const params: any = {
        // 公共条件
        ...props.commonFilter,
        // 筛选条件1
        adType: state.alltype,
        locationStrategy: state.autoOrdo,
        launchStatusList: state.stateval,
        // spManualLaunchType: state.droptype,
        // bidStrategy: state.bidstrategies,
        isAmazonReleased: state.allads,
        compaignName: state.input,
        // 筛选条件2-双输入
        spendMin: state.spendVal1,
        spendMax: state.spendVal2,
        dailyBudgetMin: state.budget1,
        dailyBudgetMax: state.budget2,
        acosMin: state.ACOSval1,
        acosMax: state.ACOSval2,
        impressionsMin: state.exposure1,
        impressionsMax: state.exposure2,
        clicksMin: state.clickval1,
        clicksMax: state.clickval2,
        ctrMin: state.CTRval1,
        ctrMax: state.CTRval2,
        attributedUnitsOrderedMin: state.orderval1,
        attributedUnitsOrderedMax: state.orderval2,
        cpcMin: state.CPCval1,
        cpcMax: state.CPCval2,
        cpaMin: state.CPAval1,
        cpaMax: state.CPAval2,
        attributedSalesMin: state.adSalesval1,
        attributedSalesMax: state.adSalesval2,
        // 额外条件
        current: state.currentPage,
        size: state.pageSize,
        isExport: 2
      }
      return params
    }

    // 给tabledata添加 广告活动 预算 可改变状态
    const editeData = (list: any, fields: any) => {
      fields.forEach((field: any) => {
        list.forEach((item: any) => {
          item[field] = false
        })
      })
      // console.log('value: ', list)
      return list
    }

    // table数据
    const getData = async () => {
      // collectGetData(state)
      const params = getfilterparams()
      const res = (await azGroupList(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.tableData = editeData(res.data.records, [
          'actadgroupName',
          // 'actsuggestedStr',
          'actbid'
        ])
        state.currentPage = res.data.pageNum
        state.pageSize = res.data.size
        state.total = res.data.total
      }
      // console.log('state.tableData,', state.tableData)
    }

    // 导出数据
    const exportReportCampaign = async () => {
      // collectExportReportCampaign(state)
      let params = getfilterparams()
      params = {
        ...params,
        isExport: 1
      }

      await azReportAdgroup(params)
    }

    // 根据所有字段长度，修改每项的宽度
    const getItemWidth = (arr: any[]) => {
      if (arr.length > 10) {
        return 120
      } else {
        const o: any = document.getElementsByClassName('yy-table-wrap')[0]
        const w = o.offsetWidth // 宽度
        // console.log('w: ', w)
        return (w - 150) / arr.length
      }
    }
    // 数据配置项
    // 过滤已选字段
    const getselectArr = (arr: any[]) => {
      if (arr.length == 0) return []
      const newArr = arr.filter((item, index) => {
        if (item.choose != 0) {
          return item
        }
      })

      return newArr
    }

    // 获取全部类型
    const getalltype = async () => {
      const params = {
        code: 'AD_AMZ_0001'
      }
      const res = (await azGetFieldsByCode(params)) as HttpResponse
      console.log('getalltype: ', res)
      if (res.code == 0) {
        state.alltypelist = res.data || []
      }
    }

    // 数据配置项
    const getFieldsByCode = async () => {
      //
      console.log(132456)
      const params = {
        code: 'AD_AMZ_0004'
      }
      const res = (await azGetFieldsByCode(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        // 选中
        state.metricList = getselectArr(res.data)
        // 全部
        state.metricListArr = res.data
        // 表头
        state.tableFields = state.metricList

        // 请求数据table
        getData()
      }
    }
    const saveUserField = async () => {
      // state.tableFields = state.metricList
      //
      const params = {
        code: 'AD_AMZ_0004',
        columns: getKeyArray('value', state.metricList)
      }
      const res = (await azSaveUserField(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        getFieldsByCode()
      }
    }
    // 批量开关 1-全部开启 2-全部关闭 3-全部归档
    const getazAdgroupBatchSwitch = async (handleType: number) => {
      const ids = getKeyArray('id', state.multipleSelection)
      const params = {
        ids,
        handleType
      }

      const res = (await azAdgroupBatchSwitch(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        getData()
      }
    }
    // 应用亚马孙出价
    const addsuggestbid = (field: string) => {
      let suggestbidList = [...state.multipleSelection]
      suggestbidList = suggestbidList.map((item: any) => {
        item.input = item[field]
        return item
      })
      state.suggestbidList = suggestbidList
    }

    // 查看详情
    const checkDetail = (val: any) => {
      console.log('val: ', val)
    }
    // 修改预算，状态，名称
    const getazamzAdgroupedit = async (field: string, item:any) => {
      let params
      if (field == 'launchStatus') { // 状态
        params = {
          id: item.id,
          launchStatus: item.launchStatus
        }
      } else if (field == 'bid') { // 预算
        params = {
          id: item.id,
          budgetValue: item.bid
        }
      } else if (field == 'adgroupName') { // 名称
        params = {
          id: item.id,
          name: item.adgroupName
        }
      }

      const res = await azamzAdgroupedit(params) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        getData()
      }
    }
    // 每项中单独修改状态
    const changStatus = async (item: any) => {
      getazamzAdgroupedit('launchStatus', item)
    }
    // 编辑 预算，名称
    const editeItemValue = (item: any, field: any) => {
      // console.log('item: ', item)
      field = field.replace('act', '')
      // console.log('field: ', field)

      getazamzAdgroupedit(field, item.row)
    }

    // // 搜索广告下拉列表

    const getStoreAccountList = () => {
      // collectAzStoreSelecList(state)
    }
    // const getAccountSelect = async () => {
    //   collectGetAccountSelect(state)
    // }
    //
    const newAdFn = async () => {
      router.push('/home/amznspad')
    }
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
    const handleCommand = (command: any) => {
      console.log('command: ', command)
      // 批量选中
      if (state.multipleSelection.length == 0) {
        return currentInstance.$message.warning({
          message: '请批量选中后再操作',
          type: 'warning'
        })
      }
      switch (command) {
        case '1':
          getazAdgroupBatchSwitch(1)
          break
        case '2':
          state.dialogVisible = true
          state.dialogTitle = '批量调整预算'
          state.dialogShow = 2
          state.dialogWidth = '500px'
          break
        case '3':
          break
        case '4':
          getazAdgroupBatchSwitch(2)
          break
        case '5':
          getazAdgroupBatchSwitch(3)
          break
        case '6':
          state.dialogVisible = true
          state.dialogTitle = '批量移动到广告组合'
          state.dialogShow = 6
          state.dialogWidth = '500px'
          break
        case '7':
          state.dialogVisible = true
          state.dialogTitle = '批量调整出价'
          state.dialogShow = 7
          state.dialogWidth = '500px'
          break
        case '8':
          state.dialogVisible = true
          state.dialogTitle = '应用亚马逊建议出价'
          state.dialogShow = 8
          state.dialogWidth = '800px'
          addsuggestbid('suggested')
          break
      }
    }
    const handleCommandItem = (command: any) => {
      console.log('val: ', command)
      switch (command) {
        case '1':
          break
        case '2':
          break
        case '3':
          break
        case '4':
          break
        case '5':
          break
        case '6':
          state.dialogVisible = true
          state.dialogTitle = '移动到广告组合'
          state.dialogShow = 6
          state.dialogWidth = '500px'
          break
      }
    }
    // 标签：
    const quickFilter = (val: number) => {
      state.quickIndex = val
      switch (val) {
        case 1:
          break
        case 2:
          break
        case 3:
          break
        case 4:
          break
        case 5:
          break
      }
    }

    // input双击编辑修改
    const handKeyDblclick = (index: number, field: string) => {
      //
      // console.log('handKeyDblclick', index, field);
      (state.tableData[index] as any)[field] = true
    }
    const handKeyDblclickBlur = (item: any, field: string) => {
      console.log('handKeyDblclickBl', item, field)
      //
      ;(state.tableData[item.$index] as any)[field] = false
      // 发请求
      editeItemValue(item, field)
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

    // 表格多选
    const handleSelectionChange = (val: any[]) => {
      console.log('val: ', val)
      state.multipleSelection = val
    }
    // 批量操作api
    const batchHandleSwitch = async (val: any) => {
      // collectBatchHandleSwitch(state, val)
      // getData()
    }
    const batchHandleBudget = async (val: any) => {
      // collectBatchHandleBudget(state, val)
      // getData()
    }
    const batchHandleDel = async () => {
      // collectBatchHandleDel(state)
      // getData()
    }

    // 批量调整出价
    const getazbatchHandleBid = async (item: any) => {
      //
      const ids = getKeyArray('id', state.multipleSelection)
      const params = {
        ids,
        bid: item.value,
        handleType: item.type
      }
      const res = (await azbatchHandleBid(params)) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        getData()
      }
    }

    // 模态框逻辑
    const dialogHandleClose = () => {
      // console.log('132456')
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
        case 7:
          getazbatchHandleBid(val)
          break
      }
      state.dialogVisible = false
    }

    // 广告发布按钮
    const adPublish = () => {
      router.push({ name: 'GgSearchad' })
    }
    // 搜索框
    const handleSearchModalFilter = (val: boolean) => {
      state.searchmodalfilter = val
    }

    const resetFilter = () => {
      state.alltype = ''
      state.autoOrdo = ''
      state.stateval = [1, 2]
      state.droptype = ''
      state.bidstrategies = ''
      state.allads = ''
      state.input = ''
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
      getData()
      state.searchmodalfilter = false
    }
    const resetSearchFnFilter = () => {
      // collectResetSearchFn(state)
      resetFilter()
    }

    const handleSwitch = async (val: any) => {
      // collectHandleSwitch(state, val)
      // getData()
    }

    onMounted(() => {
      // getData()
      // getStoreAccountList()
      // getAccountSelect()
      getFieldsByCode()
      getalltype()
    })

    return {
      ...toRefs(state),
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
      dialogHandleClose,
      dialogHandleSure,
      hangdleBtn,
      adPublish,
      handleSearchModalFilter,
      searchFnFilter,
      resetSearchFnFilter,
      handleSwitch,
      exportReportCampaign,
      selectBusinessType,
      handleCommand,
      quickFilter,
      newAdFn,
      handleCommandItem,
      handKeyDblclick,
      handKeyDblclickBlur,
      // getFieldsByCode,
      saveUserField,
      checkDetail,
      getItemWidth,
      addsuggestbid,
      changStatus
    }
  },
  components: {
    // YyBreadcrumb,
    YyPagination,
    Amznbatchmodal
  }
})
</script>
<style lang="scss">
.amzn-adactive {
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
        // &.el-button {
        //   border: 0px;
        // }
        // &.el-button:focus {
        //   color: #606266;
        // }
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
