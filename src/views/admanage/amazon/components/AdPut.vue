<template>
  <div class="amzn-adactive">
    <div class="puttab">
      <el-radio-group v-model="putRadio" @change="putRadioFn">
        <el-radio-button label="关键词"></el-radio-button>
        <el-radio-button label="商品投放"></el-radio-button>
      </el-radio-group>
      <el-button
        style="margin-left: 20px;"
        class="open-search title-btn"
        plain
        @click="handleSearchModalFilter(true)"
      >
        <span class="condition">条件筛选 </span>
        <i class="iconfont icon-a-NamesortTypeUserControl"></i>
      </el-button>
    </div>
    <div class="filtering md10">
      <!-- <el-button type="primary" round @click="newAdFn">创建广告活动</el-button> -->
      <!-- 原来的条件筛选按钮占位 -->
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
          <div class="top-item" v-if="putRadio == '商品投放'">
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
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name"> 广告活动</span>
              <el-select
                v-model="activeId"
                clearable
                class="width240"
                placeholder=" 所有广告活动"
                @change="onChangeActivity"
              >
                <el-option
                  v-for="item in activeOptions"
                  :key="item.id"
                  :label="item.campaignName"
                  :value="item.campaignId"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name"> 广告组</span>
              <el-select
                v-model="adGroupId"
                clearable
                class="width240"
                placeholder=""
              >
                <el-option
                  v-for="item in adGroupOptions"
                  :key="item.adgroupId"
                  :label="item.adgroupName"
                  :value="item.adgroupId"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="top-item" v-if="putRadio == '关键词'">
            <div class="acount">
              <span class="name"> 匹配类型</span>
              <el-select
                v-model="droptype"
                clearable
                class="width240"
                placeholder=" 匹配类型"
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
          </div>
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
              <span class="name"> 状态</span>
              <el-select
                v-model="allads"
                clearable
                class="width240"
                placeholder=" 状态"
              >
                <el-option
                  v-for="item in alladslist"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="top-item" v-if="putRadio == '关键词'">
            <div class="acount">
              <span class="name">关键词搜索</span>
              <div class="ad-inp width240">
                <el-input placeholder="关键词搜索" v-model="inputKeyWord" clearable>
                </el-input>
              </div>
            </div>
          </div>
          <div class="top-item" v-if="putRadio == '商品投放'">
            <div class="acount">
              <span class="name">商品或类目</span>
              <div class="ad-inp width240">
                <el-input
                  placeholder="输入商品或类目"
                  v-model="input"
                  clearable
                >
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
    <div v-show="putRadio == '关键词'">
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
                  <!-- <el-dropdown-item command="9"
                    >添加到否定关键词</el-dropdown-item
                  > -->
                  <el-dropdown-item command="7">调整竞价</el-dropdown-item>
                  <el-dropdown-item command="8">应用建议出价</el-dropdown-item>
                  <!-- <el-dropdown-item command="6">移动到广告组合</el-dropdown-item> -->
                  <!-- <el-dropdown-item command="2">调整预算</el-dropdown-item> -->
                  <el-dropdown-item command="enabled">启用</el-dropdown-item>
                  <!-- <el-dropdown-item command="3">删除</el-dropdown-item> -->
                  <el-dropdown-item command="paused">暂停</el-dropdown-item>
                  <el-dropdown-item command="archived">归档</el-dropdown-item>
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
                    <el-button
                      type="primary"
                      size="medium"
                      @click="saveUserField"
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
        <div class="tag-list">
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
              >有点击无成交</el-button
            >
            <!-- <el-button
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
          > -->
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
            height="361"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              v-for="(item, idx) in tableFields"
              :key="'tableitem' + idx"
              :prop="item.value"
              :label="item.name"
              :width="((item.name.length -2) * 20 + 100)"
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
                <div v-if="item.name == '出价'">
                  <span v-if="!scope.row[`act${item.value}`]"
                    ><span @click="checkDetail(scope.row)"
                      >{{ scope.row[item.value] }}
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
                    @blur="
                      handKeyDblclickBlur(scope.$index, `act${item.value}`)
                    "
                  ></el-input>
                </div>

                <!-- 下拉切换 -->
                <div v-else-if="item.name == '状态'">
                  <el-select
                    v-model="scope.row[item.value]"
                    size="small"
                    @change="changStatus(scope.row)"
                  >
                    <el-option
                      v-for="item in statuslist"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <!-- 刷新获取最新值情况 -->
                <div v-else-if="item.name == '建议出价'" class="sugget-price">
                  <div>
                    <span>0.78</span>
                    <i
                      class="el-icon-refresh refreshlocal"
                      @click="refreshFn"
                    ></i>
                  </div>
                  <div>(0.35 ~ 0.98)</div>
                </div>

                <span v-else>{{ scope.row[item.value] }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <!-- <template #default="scope">
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
                      <el-dropdown-item command="9"
                        >添加到否定关键词</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template> -->
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div v-show="putRadio == '商品投放'">
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
                  <el-dropdown-item command="10"
                    >添加到否定投放</el-dropdown-item
                  >
                  <!-- <el-dropdown-item command="9"
                    >添加到否定关键词</el-dropdown-item
                  > -->
                  <el-dropdown-item command="7">调整竞价</el-dropdown-item>
                  <el-dropdown-item command="8">应用建议出价</el-dropdown-item>
                  <!-- <el-dropdown-item command="6">移动到广告组合</el-dropdown-item> -->
                  <!-- <el-dropdown-item command="2">调整预算</el-dropdown-item> -->
                  <el-dropdown-item command="enabled">启用</el-dropdown-item>
                  <!-- <el-dropdown-item command="3">删除</el-dropdown-item> -->
                  <el-dropdown-item command="paused">暂停</el-dropdown-item>
                  <el-dropdown-item command="archived">归档</el-dropdown-item>
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
                    <el-button
                      type="primary"
                      size="medium"
                      @click="saveUserField"
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
        <div class="tag-list">
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
              >有点击无成交</el-button
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
        </div>
        <div class="yy-table-wrap table-height">
          <el-table
            v-loading="tableLoading"
            :data="tableData"
            stripe
            show-overflow-tooltip
            @selection-change="handleSelectionChange"
            style="width: 100%"
            height="361"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              v-for="(item, idx) in tableFieldsShop"
              :key="'tableitem' + idx"
              :prop="item.value"
              :label="item.name"
              :width="((item.name.length -2) * 20 + 100)"
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
                <div v-if="item.name == '出价'">
                  <span v-if="!scope.row[`act${item.value}`]"
                    ><span @click="checkDetail(scope.row)"
                      >{{ scope.row[item.value] }}
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
                    @blur="
                      handKeyDblclickBlur(scope.$index, `act${item.value}`)
                    "
                  ></el-input>
                </div>

                <!-- 下拉切换 -->
                <div v-else-if="item.name == '状态'">
                  <el-select
                    v-model="scope.row[item.value]"
                    size="small"
                    @change="changStatus(scope.row)"
                  >
                    <el-option
                      v-for="item in statuslist"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <!-- 刷新获取最新值情况 -->
                <div v-else-if="item.name == '建议出价'" class="sugget-price">
                  <div>
                    <span>0.78</span>
                    <i
                      class="el-icon-refresh refreshlocal"
                      @click="refreshFn"
                    ></i>
                  </div>
                  <div>(0.35 ~ 0.98)</div>
                </div>

                <span v-else>{{ scope.row[item.value] }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <!-- <template #default="scope">
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
                      <el-dropdown-item command="9"
                        >添加到否定关键词</el-dropdown-item
                      >
                      <el-dropdown-item command="10"
                        >添加到否定投放</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template> -->
            </el-table-column>
          </el-table>
        </div>
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
  spPutKeyWrodList,
  spPutKeyWrodExport,
  spPutKeyWrodUpdateState,
  spPutKeyWrodUpdateBid
} from '@/api/admanage'
import { HttpResponse } from '@/interface/interface'
import {
  GetCollectAccountSelect,
  onSaveUserField,
  getAmActivityFn,
  getAmActiviGroupFn
} from '../../common/action/getCommonDate'
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
    const state = reactive({
      tableLoading: false,
      tableWidth: '',

      activeId: '',
      activeOptions: [] as any,
      adGroupId: '',
      adGroupOptions: [] as any,
      alltype: '',
      alltypelist: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: 'sp'
        },
        {
          value: 2,
          label: 'sb'
        },
        {
          value: 3,
          label: 'sd'
        }
      ],
      autoOrdo: '1',
      autoOrdolist: [
        {
          value: '1',
          label: 'all广告组'
        },
        {
          value: '2',
          label: '广告组1'
        }
      ],
      droptype: '',
      droptypelist: [
        {
          value: '1',
          label: '所有匹配类型'
        },
        {
          value: '2',
          label: '精准'
        },
        {
          value: '3',
          label: '广泛'
        },
        {
          value: '4',
          label: '词组'
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
      alladslist: [] as any,
      inputKeyWord: '',
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
          value: 'campaignName'
        },
        {
          name: '关键词',
          value: 'active',
          width: 120
        },
        {
          name: '匹配类型',
          value: 'launchStatus'
        },
        {
          name: '广告活动',
          value: 'purchaseRoas'
        },
        {
          name: '广告组',
          value: 'dailyBudget'
        },
        {
          name: '建议出价',
          value: 'impressions',
          width: 120
        },
        {
          name: '出价',
          value: 'clicks'
        },
        {
          name: '曝光',
          value: 'ctr'
        },
        {
          name: '点击数',
          value: 'ctr'
        },
        {
          name: 'CTR',
          value: 'cpc'
          // width: 120
        },
        {
          name: 'CPC',
          value: 'cpc'
        },
        {
          name: '花费',
          value: 'cpc'
          // width: 120
        },
        {
          name: '广告销售额',
          value: 'cpc',
          width: 120
        },

        {
          name: 'ACOS',
          value: 'impressions'
        },
        {
          name: 'RoAS',
          value: 'impressions'
        },
        {
          name: '广告订单',
          value: 'impressions'
        },
        {
          name: 'CPA',
          value: 'impressions'
        },
        {
          name: 'CVR',
          value: 'impressions'
        }
      ] as any,
      tableFieldsShop: [
        {
          name: '状态',
          value: 'campaignName'
        },
        {
          name: '商品定位',
          value: 'active',
          width: 120
        },
        {
          name: '匹配类型',
          value: 'launchStatus'
        },
        {
          name: '广告活动',
          value: 'purchaseRoas'
        },
        {
          name: '广告组',
          value: 'dailyBudget'
        },
        {
          name: '建议出价',
          value: 'impressions',
          width: 120
        },
        {
          name: '出价',
          value: 'clicks'
        },
        {
          name: '曝光',
          value: 'ctr'
        },
        {
          name: '点击数',
          value: 'ctr'
        },
        {
          name: 'CTR',
          value: 'cpc'
          // width: 120
        },
        {
          name: 'CPC',
          value: 'cpc'
        },
        {
          name: '花费',
          value: 'cpc'
          // width: 120
        },
        {
          name: '广告销售额',
          value: 'cpc',
          width: 120
        },

        {
          name: 'ACOS',
          value: 'impressions'
        },
        {
          name: 'RoAS',
          value: 'impressions'
        },
        {
          name: '广告订单',
          value: 'impressions'
        },
        {
          name: 'CPA',
          value: 'impressions'
        },
        {
          name: 'CVR',
          value: 'impressions'
        }
      ] as any,
      tableData: [] as any,
      tableDataOld: [] as any, // 旧数据来保存提交前的状态数据
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
      putRadio: '关键词',

      statuslist: [] as any
    })
    // 请求参数
    const reqParams = {
      // 注释调的没调通 先放着
      // 公共条件
      site: props.commonFilter.site,
      storeId: props.commonFilter.storeId,
      // 当前页面
      // campaignId: state.,
      // adgroupId: state.,
      state: state.allads,
      keywordText: state.inputKeyWord,
      // matchType: state.droptype,
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
    // 给tabledata添加 广告活动 预算 可改变状态
    const editeData = (list: any, fields: any) => {
      fields.forEach((value: any) => {
        list.forEach((item: any) => {
          item[fields] = false
        })
      })
      return list
    }
    // table数据
    const getData = async () => {
      state.tableLoading = true
      if (state.putRadio == '关键词') {
        const res = (await spPutKeyWrodList(reqParams)) as HttpResponse
        state.tableData = editeData(res.data.records || [], ['actbid'])
        state.tableDataOld = JSON.parse(JSON.stringify(state.tableData))
        state.total = res.data.total
      }
      state.tableLoading = false
      state.multipleSelection = []
    }

    // 数据配置项
    const getFieldsByCode = async () => {
      const params = {
        code: state.putRadio == '关键词' ? 'AD_AMZ_0006' : 'AD_AMZ_0007'
      }
      GetCollectAccountSelect(state, params, getData)
    }

    const saveUserField = async () => {
      const params = {
        code: state.putRadio == '关键词' ? 'AD_AMZ_0006' : 'AD_AMZ_0007'
      }
      onSaveUserField(state, params, getFieldsByCode)
    }

    // 查看详情
    const checkDetail = (val: any) => {
      console.log('val: ', val)
    }

    // 获取状态下拉数据
    const getStatusList = async () => {
      const res = (await azGetFieldsByCode({ code: 'AD_AMZ_0015' })) as HttpResponse
      state.alladslist = res.data || []
      state.statuslist = res.data.filter((item: any) => {
        return item.choose == 1
      })
    }

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

    // 导出数据
    const exportReportCampaign = async () => {
      if (state.putRadio == '关键词') {
        await spPutKeyWrodExport(reqParams)
      }
    }
    // 选择活动 获取活动下的广告组选项
    const onChangeActivity = (val: any) => {
      const params = {
        campaignId: val,
        site: props.commonFilter.site,
        storeId: props.commonFilter.storeId
      }
      getAmActiviGroupFn(state, params)
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
        case 'enabled':
          changManyStatus(command)
          break
        case 'paused':
          changManyStatus(command)
          break
        case 'archived':
          changManyStatus(command)
          break
        case '2':
          state.dialogVisible = true
          state.dialogTitle = '批量调整预算'
          state.dialogShow = 2
          state.dialogWidth = '500px'
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
        case '9':
          state.dialogVisible = true
          state.dialogTitle = '添加到否定关键词'
          state.dialogShow = 9
          state.dialogWidth = '800px'
          break
        case '10':
          state.dialogVisible = true
          state.dialogTitle = '添加到否定投放'
          state.dialogShow = 10
          state.dialogWidth = '800px'
          break
      }
    }
    // 操作栏相关操作
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
        case '9':
          state.dialogVisible = true
          state.dialogTitle = '添加到否定关键词'
          state.dialogShow = 9
          state.dialogWidth = '800px'
          break
        case '10':
          state.dialogVisible = true
          state.dialogTitle = '添加到否定投放'
          state.dialogShow = 10
          state.dialogWidth = '800px'
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
    const putRadioFn = (val: any) => {
      console.log('val: ', val)
    }
    const refreshFn = async () => {
      //
    }
    // 修改状态请求
    const handleSpPutKeyWrodUpdateState = async (params: any) => {
      state.tableLoading = true
      const res = (await spPutKeyWrodUpdateState(params)) as HttpResponse

      getData()
      state.tableLoading = false
    }
    // 修改单个状态
    const changStatus = async (val: any) => {
      if (state.putRadio == '关键词') {
        const params = {
          state: val.state,
          site: props.commonFilter.site,
          storeId: props.commonFilter.storeId,
          amzKeywordUpdateStateDTOList: [val]
        }
        handleSpPutKeyWrodUpdateState(params)
      }
    }
    // 修改多个状态
    const changManyStatus = async (status: any) => {
      if (state.putRadio == '关键词') {
        const params = {
          state: status,
          site: props.commonFilter.site,
          storeId: props.commonFilter.storeId,
          amzKeywordUpdateStateDTOList: state.multipleSelection
        }

        handleSpPutKeyWrodUpdateState(params)
      }
    }
    // 修改竞价
    const handleSpPutKeyWrodUpdateBid = async (params: any) => {
      state.tableLoading = true
      const res = (await spPutKeyWrodUpdateBid(params)) as HttpResponse

      getData()
      state.tableLoading = false
    }
    // input双击编辑修改状态
    const handKeyDblclick = (index: number, field: string) => {
      (state.tableData[index] as any)[field] = true
    }
    // input失去焦点 修改单个出价
    const handKeyDblclickBlur = (index: number, field: string) => {
      (state.tableData[index] as any)[field] = false
      if (state.putRadio == '关键词') {
        const params = {
          bid: state.tableData[index].bid * 1,
          updateBidType: 3, // 页面修改的写死
          site: props.commonFilter.site,
          storeId: props.commonFilter.storeId,
          amzKeywordUpdateBidDTOList: [state.tableDataOld[index]]
        }

        handleSpPutKeyWrodUpdateBid(params)
      }
    }

    // 表格多选
    const handleSelectionChange = (val: any[]) => {
      state.multipleSelection = val
    }
    // 批量操作api
    const batchHandleSwitch = async (val: any) => {
      // collectBatchHandleSwitch(state, val)
      // getData()
    }
    // 批量修改竞价
    const batchHandleBudget = async (val: any) => {
      console.log('更改类型', val)
      state.tableLoading = true
      if (state.putRadio == '关键词') {
        const params = {
          bid: val.value,
          updateBidType: val.type,
          site: props.commonFilter.site,
          storeId: props.commonFilter.storeId,
          amzKeywordUpdateBidDTOList: state.multipleSelection
        }

        handleSpPutKeyWrodUpdateBid(params)
      }
      state.tableLoading = false
    }
    const batchHandleDel = async () => {
      // collectBatchHandleDel(state)
      // getData()
    }

    // 弹层框-逻辑
    const dialogHandleClose = () => {
      state.dialogVisible = false
    }
    const dialogHandleSure = (val: any) => {
      console.log('val-t弹层返回: ', val)
      switch (state.dialogShow) {
        case 1:
          batchHandleSwitch(val)
          break
        case 3:
          batchHandleDel()
          break
        case 7:
          batchHandleBudget(val)
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

    // 分页相关处理
    const handleSizeChange = (val: any) => {
      // console.log('页size: ', val)
      state.currentPage = 1
      state.pageSize = val
      getData()
    }
    const handleCurrentChange = (val: any) => {
      // console.log('页码: ', val)
      state.currentPage = val
      getData()
    }
    const resetFilter = () => {
      state.alltype = ''
      state.activeId = ''
      state.adGroupId = ''
      state.droptype = ''
      state.bidstrategies = ''
      state.allads = ''
      state.inputKeyWord = ''
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
      getStatusList()
      getAmActivityFn(state, {
        site: props.commonFilter.site,
        storeId: props.commonFilter.storeId
      })
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
      onChangeActivity,
      handleSwitch,
      exportReportCampaign,
      selectBusinessType,
      handleCommand,
      quickFilter,
      newAdFn,
      handleCommandItem,
      changStatus,
      handKeyDblclick,
      handKeyDblclickBlur,
      getFieldsByCode,
      saveUserField,
      checkDetail,
      putRadioFn,
      refreshFn
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
  .puttab {
    margin-left: 18px;
    margin-bottom: 10px;
  }
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
    .table-height {
      .sugget-price {
        position: relative;
        .refreshlocal {
          position: absolute;
          top: 4px;
          right: 10px;
          cursor: pointer;
        }
      }
    }
  }
  .themecolor {
    color: $themeColor;
  }
}
</style>
