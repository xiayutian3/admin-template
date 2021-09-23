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
          <!-- <div class="top-item">
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
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div> -->
          <!-- <div class="top-item">
            <div class="acount">
              <span class="name"> 手动/自动</span>
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
          </div> -->
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
          <!-- <div class="top-item">
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
          </div> -->

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
                <el-dropdown-item command="11">广告活动设置</el-dropdown-item>
                <el-dropdown-item command="7">调整竞价</el-dropdown-item>
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
            :width="idx == 0 ? 100 : item.width"
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
                  item.name == '建议出价' ||
                  item.name == '默认竞价'
                "
              >
                <span v-if="!scope.row[`act${item.field}`]"
                  ><span @click="checkDetail(scope.row)"
                    >{{ scope.row[item.field] }}
                  </span>
                  <i
                    class="el-icon-edit"
                    @click="handKeyDblclick(scope.$index, `act${item.field}`)"
                  ></i
                ></span>
                <el-input
                  size="small"
                  v-focus
                  v-if="scope.row[`act${item.field}`]"
                  autofocus
                  v-model="scope.row[item.field]"
                  @blur="handKeyDblclickBlur(scope.$index, `act${item.field}`)"
                ></el-input>
              </div>

              <!-- 下拉切换 -->
              <div v-else-if="item.name == '状态'">
                <el-select
                  v-model="statusval"
                  size="small"
                  @change="changStatus(scope.row)"
                >
                  <el-option
                    v-for="item in statuslist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <span v-else>{{ scope.row[item.field] }}</span>
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
      :dialogWidth="dialogWidth"
      :dialogTitle="dialogTitle"
      :dialogShow="dialogShow"
      :dialogVisible="dialogVisible"
      @dialogHandleClose="dialogHandleClose"
      @dialogHandleSure="dialogHandleSure"
    ></amznbatchmodal>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import YyPagination from '@/components/common/YyPagination.vue'
import Amznbatchmodal from '../components/Amznbatchmodal.vue'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs
} from 'vue'
import { azGetFieldsByCode, azSaveUserField } from '@/api/admanage'
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

export default defineComponent({
  name: '',
  props: {
    // 公共筛选条件
    commonFilter: {
      type: Object,
      default: () => ({})
    }
  },
  setup () {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties
    const state = reactive({
      alltype: '1',
      alltypelist: [
        {
          value: '1',
          label: '全部类型'
        },
        {
          value: '2',
          label: 'SP'
        },
        {
          value: '3',
          label: 'SB'
        },
        {
          value: '4',
          label: 'SD'
        }
      ],
      autoOrdo: '1',
      autoOrdolist: [
        {
          value: '1',
          label: '手动/自动'
        },
        {
          value: '2',
          label: '手动'
        },
        {
          value: '3',
          label: '自动'
        }
      ],
      stateval: ['1', '2'],
      statelist: [
        {
          value: '1',
          label: '投放中'
        },
        {
          value: '2',
          label: '暂停'
        },
        {
          value: '3',
          label: '归档'
        },
        {
          value: '4',
          label: '审核中'
        },
        {
          value: '5',
          label: '草稿箱'
        },
        {
          value: '6',
          label: '发布失败'
        },
        {
          value: '7',
          label: '发布中'
        }
      ],
      droptype: '1',
      droptypelist: [
        {
          value: '1',
          label: '全部投放'
        },
        {
          value: '2',
          label: '关键词'
        },
        {
          value: '3',
          label: '商品'
        },
        {
          value: '4',
          label: '关键词/商品'
        }
      ],
      bidstrategies: '1',
      bidstrategieslist: [
        {
          value: '1',
          label: '全部竞价策略'
        },
        {
          value: '2',
          label: '动态竞价-只降低'
        },
        {
          value: '3',
          label: '动态竞价-提高和降低'
        },
        {
          value: '4',
          label: '固定竞价'
        }
      ],
      allads: '',
      alladslist: [
        {
          value: '1',
          label: '全部广告'
        },
        {
          value: '2',
          label: '非亚马逊发布'
        },
        {
          value: '3',
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
          field: 'campaignName'
        },
        {
          name: '广告组',
          field: 'active',
          width: 120
        },
        {
          name: '广告活动',
          field: 'launchStatus'
        },
        {
          name: '投放类型',
          field: 'purchaseRoas'
        },
        {
          name: '建议出价',
          field: 'dailyBudget'
        },
        {
          name: '默认竞价',
          field: 'impressions'
        },
        {
          name: '曝光',
          field: 'clicks'
        },
        {
          name: '点击数',
          field: 'ctr'
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
          field: 'cpc'
        },
        {
          name: '广告销售额',
          field: 'cpc',
          width: 120
        },

        {
          name: 'ACOS',
          field: 'impressions'
        },
        {
          name: 'RoAS',
          field: 'impressions'
        },
        {
          name: '广告订单',
          field: 'impressions'
        },
        {
          name: 'CPA',
          field: 'impressions'
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
      statusval: '1',
      statuslist: [
        {
          value: '1',
          label: '开启'
        },
        {
          value: '2',
          label: '暂停'
        },
        {
          value: '3',
          label: '归档'
        }
      ]
    })

    // const breadcrumbList = computed(() => store.state.common.breadcrumbList)

    // 数据配置项
    const getFieldsByCode = async () => {
      //
      console.log(132456)
      const params = {
        code: 'AD_AMZ_0002'
      }
      const res = (await azGetFieldsByCode(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
      }
    }
    const saveUserField = async () => {
      // state.tableFields = state.metricList
      //
      const params = {}
      const res = (await azSaveUserField(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        getFieldsByCode()
      }
    }

    // 查看详情
    const checkDetail = (val: any) => {
      console.log('val: ', val)
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
      const data = [
        {
          taskName: 'heelo',
          active: 123456,
          purchaseRoas: 123,
          dailyBudget: 789,
          impressions: 453
        }
      ]
      state.tableData = editeData(data, [
        'actactive',
        'actdailyBudget',
        'actimpressions'
      ])
      // console.log('state.tableData,', state.tableData)
    }

    // 导出数据
    const exportReportCampaign = () => {
      collectExportReportCampaign(state)
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
          break
        case '5':
          break
        case '6':
          state.dialogVisible = true
          state.dialogTitle = '批量移动到广告组合'
          state.dialogShow = 6
          state.dialogWidth = '500px'
          break
        case '7':
          state.dialogVisible = true
          state.dialogTitle = '批量调整竞价'
          state.dialogShow = 7
          state.dialogWidth = '500px'
          break
        case '8':
          state.dialogVisible = true
          state.dialogTitle = '应用亚马逊建议出价'
          state.dialogShow = 8
          state.dialogWidth = '800px'
          break
        case '11':
          state.dialogVisible = true
          state.dialogTitle = '广告活动设置'
          state.dialogShow = 11
          state.dialogWidth = '800px'
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
    const handKeyDblclickBlur = (index: number, field: string) => {
      //
      (state.tableData[index] as any)[field] = false
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
      router.push({ name: 'GgSearchad' })
    }
    // 搜索框
    const handleSearchModalFilter = (val: boolean) => {
      state.searchmodalfilter = val
    }

    const resetFilter = () => {
      state.alltype = ''
      state.autoOrdo = ''
      state.stateval = ['1', '2']
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
      getData()
      getStoreAccountList()
      // getAccountSelect()
      getFieldsByCode()
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
      checkDetail
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
