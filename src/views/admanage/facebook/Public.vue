<template>
  <div class="fbpublic">
     <!-- @clilckstep="clilckstep" -->
    <progressbar
      class="mb18"
      :steps="steps"
      :activestep="activestep"
      @clilckstep="clilckstep"
    ></progressbar>
    <div class="part1" v-show="activestep == 0">
      <div class="yy-ad-title w555">广告发布</div>
      <div class="part-title">基础配置</div>
      <div class="content">
        <div class="item">
          <div class="name"><span class="point">*</span> 任务名称</div>
          <div class="bttom">
            <el-input
              class="w555"
              v-model="taskval"
              maxlength="50"
              placeholder="请输入任务名称"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 广告账号</div>
          <div class="bttom">
            <el-select
              v-model="selectvalad"
              clearable
              class="w555"
              placeholder="请选择广告账号"
              @change="handleAcountSelect"
            >
              <el-option
                v-for="item in selOptionsAd"
                :key="item.accountId"
                :label="item.accountName"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> FB主页</div>
          <div class="bttom">
            <el-select
              v-model="fbhome"
              clearable
              class="w555"
              placeholder="请选择FB主页"
              @change="handleFbhome"
            >
              <el-option
                v-for="item in fbhomeList"
                :key="item.pageId"
                :label="item.pageName"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point"></span> INS主页</div>
          <div class="bttom">
            <el-select
              v-model="insId"
              clearable
              class="w555"
              placeholder="请选择INS主页"
              @change="handleInsId"
            >
              <el-option
                v-for="item in insIdList"
                :key="item.instagramId"
                :label="item.instagramName"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 像素代码</div>
          <div class="bttom">
            <el-select
              v-model="pixelId"
              clearable
              class="w555"
              placeholder="请选择像素代码"
              @change="handlePixelId"
            >
              <el-option
                v-for="item in pixelIdList"
                :key="item.pixelId"
                :label="item.pixelName"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- <div class="item">
          <div class="name">
            <span class="point">*</span> 在哪个国家/地区销售
          </div>
          <div class="bttom">
            <el-autocomplete
              class="w555"
              v-model="place"
              :fetch-suggestions="querySearchAsyncPlace"
              value-key="countryName"
              placeholder="请输入在哪个国家/地区销售"
              @select="handleSelectPlace"
              clearable
            ></el-autocomplete>
          </div>
        </div> -->
      </div>
    </div>
    <div class="part1 part2" v-show="activestep == 1">
      <div class="yy-ad-title w555">广告发布</div>
      <div class="part-title">广告系列配置</div>
      <div class="content">
        <div class="item">
          <div class="name"><span class="point">*</span> 广告系列</div>
          <div class="bttom">
            <el-select
              v-model="adSeries"
              clearable
              class="w555"
              placeholder="请选择广告系列"
              @change="adSeries2Fn"
            >
              <el-option
                v-for="item in adSeriesList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="mg20">
              <div class="hasitem" v-if="adSeries == 1">
                <div class="name">
                  <span class="point">*</span> 广告系列名称
                </div>
                <el-input
                  class="w555"
                  v-model="adSeriesInput"
                  placeholder="如： apple-watch"
                  maxlength="100"
                ></el-input>
                <!-- <div class="config" @click="openDialog(2)">插入可配置参数</div> -->
              </div>
              <el-select
                v-if="adSeries == 2"
                v-model="hasSeries"
                clearable
                class="w555"
                placeholder="请选择广告系列"
                @change="hasSeriesListFn"
              >
                <el-option
                  v-for="item in hasSeriesList"
                  :key="item.campaignId"
                  :label="item.campaignName"
                  :value="item.campaignId"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 广告目标</div>
          <div class="bttom">
            <el-select
              v-model="adPurpose"
              clearable
              class="w555"
              placeholder="请选择广告目标"
              @change="adPurposeFn"
              :disabled="disableStep2"
            >
              <el-option
                v-for="item in adPurposeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 广告系列状态</div>
          <div class="bttom">
            <el-select
              v-model="adState"
              clearable
              class="w555"
              placeholder="请选择广告系列状态"
              :disabled="disableStep2"
            >
              <el-option
                v-for="item in aadStateList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 广告系列预算优化</div>
          <div class="bttom">
            <el-select
              v-model="adStateOptimize"
              clearable
              class="w555"
              placeholder="请选择广告系列状态"
              :disabled="disableStep2"
            >
              <el-option
                v-for="item in adStateOptimizeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item" v-show="adStateOptimize == 1">
          <div class="name"><span class="point">*</span> 广告系列预算$</div>
          <div class="bttom">
            <el-select
              v-model="adBudget"
              clearable
              class="w555"
              placeholder="请选择广告系列预算"
              :disabled="disableStep2"
            >
              <el-option
                v-for="item in adBudgetList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="mg20">
              <el-input
                class="w555"
                v-model="adBudgetInp"
                placeholder="输入预算"
                :disabled="disableStep2"
                oninput="value=value.replace(/^0+/,'').replace(/[^\d]/g,'')"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 广告竞价策略</div>
          <div class="bttom">
            <el-select
              v-model="bidding"
              clearable
              class="w555"
              placeholder="请选择广告竞价策略"
              @change="handleBidding"
              :disabled="disableStep2"
            >
              <!-- @change="handleBidding" -->
              <el-option
                v-for="item in biddingList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="mg20">
              <!-- <div class="hasitem" v-if="bidding == 2">
                <div class="name">
                  <span class="point">*</span> 各广告组费用上限 $
                </div>
                <el-input
                  class="w555"
                  v-model="biddingInp"
                  placeholder="广告组费用上限"
                ></el-input>
                <div class="msg">USD / 购物</div>
              </div>
              <div class="hasitem" v-if="bidding == 3">
                <div class="name">
                  <span class="point">*</span> 各广告组竞价上限 $
                </div>
                <el-input
                  class="w555"
                  v-model="biddingInp"
                  placeholder="广告组竞价上限"
                ></el-input>
                <div class="msg">USD / 购物</div>
              </div>
              <div class="hasitem" v-if="bidding == 4">
                <div class="name">
                  <span class="point">*</span> 广告花费回报保底值
                </div>
                <el-input
                  class="w555"
                  v-model="biddingInp"
                  placeholder="广告花费回报保底值"
                ></el-input>
                <div class="msg roas">ROAS值</div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="part1 part2 part3" v-show="activestep == 2">
      <div class="yy-ad-title w555">广告发布</div>
      <div class="part-title">广告组配置</div>
      <div class="content">
        <div class="item">
          <div class="name"><span class="point">*</span> 广告组</div>
          <div class="bttom">
            <el-select
              v-model="adSeries2"
              clearable
              class="w555"
              placeholder="请选择广告组"
              @change="adSeries2Group"
            >
              <el-option
                v-for="item in adSeriesList2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="mg20">
              <div class="hasitem" v-if="adSeries2 == 1">
                <div class="name"><span class="point">*</span> 广告组名称</div>
                <el-input
                  class="w555"
                  v-model="adSeriesInput2"
                  placeholder="如： apple-{受众性别}-{预算}-{转化事件}-{开启时间}-watch"
                  maxlength="100"
                ></el-input>
                <div class="mg20">
                  <el-button type="primary" @click="openDialog(3)">插入可配置参数</el-button>
                </div>
                <!-- <div class="config" @click="openDialog(3)">插入可配置参数</div> -->
              </div>
              <el-select
                v-if="adSeries2 == 2"
                v-model="hasSeries2"
                clearable
                class="w555"
                placeholder="请选择广告组"
                @change="hasSeriesList2Fn"
              >
                <el-option
                  v-for="item in hasSeriesList2"
                  :key="item.adsetId"
                  :label="item.adsetName"
                  :value="item.adsetId"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 广告组状态</div>
          <div class="bttom">
            <el-select
              v-model="step3state"
              clearable
              class="w555"
              placeholder="请选择广告组状态"
              :disabled="disableStep3"
            >
              <el-option
                v-for="item in step3stateList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="mg20">
              <div class="hasitem">
                <div class="name"><span class="point">*</span> 开启时间</div>
                <el-date-picker
                  class="w555"
                  v-model="step3starttime"
                  type="datetime"
                  placeholder="选择日期时间"
                  :disabled-date="disabledDate1"
                  :disabled="disableStep3"
                >
                </el-date-picker>
              </div>
              <div class="hasitem">
                <div class="name"><span class="point">*</span> 结束时间</div>
                <el-date-picker
                  class="w555"
                  v-model="step3endtime"
                  type="datetime"
                  placeholder="选择日期时间"
                  :disabled-date="disabledDate"
                  :disabled="disableStep3"
                >
                </el-date-picker>
              </div>
            </div>
          </div>
        </div>
        <div class="item" v-show="adPurpose == 7">
          <div class="name"><span class="point">*</span> 转化事件目的地</div>
          <div class="bttom">
            <el-select
              v-model="step3tothings"
              clearable
              class="w555"
              placeholder="请选择转化事件"
              @change="step3tothingsFn"
              :disabled="disableStep3"
            >
              <el-option
                v-for="item in step3tothingsList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item" v-show="adPurpose == 7 && step3tothings == 2">
          <div class="name"><span class="point"></span> 选择App</div>
          <div class="bttom">
            <el-select
              v-model="step3totimeApp"
              clearable
              class="w555"
              placeholder="请选择App"
              :disabled="disableStep3"
            >
              <el-option
                v-for="item in step3totimeAppList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item" v-show="adPurpose == 7 && step3tothings != 2">
          <div class="name"><span class="point"></span> 选择转化事件</div>
          <div class="bttom">
            <el-select
              v-model="step3totime"
              clearable
              class="w555"
              placeholder="请选择转化事件"
              :disabled="disableStep3"
            >
              <el-option
                v-for="item in step3totimeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item" v-show="adPurpose == 8">
          <div class="name"><span class="point">*</span> Product Set</div>
          <div class="bttom">
            <el-select
              v-model="step3AdProduct"
              clearable
              class="w555"
              placeholder="请选择APP"
              :disabled="disableStep3"
            >
              <el-option
                v-for="item in step3AdProductList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- <div class="item" v-show="adPurpose == 5">
          <div class="name"><span class="point">*</span> APP</div>
          <div class="bttom">
            <el-select
              v-model="step3AdApptype"
              clearable
              class="w555"
              placeholder="请选择APP"
            >
              <el-option
                v-for="item in step3AdApptypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item" v-show="adPurpose == 5">
          <div class="name">
            <span class="point"></span> 输入应用名称或应用商店的URL
          </div>
          <div class="bttom">
            <el-input
              class="w555"
              v-model="step3StoreOrUrl"
              placeholder="输入应用名称或应用商店的URL"
            ></el-input>
          </div>
        </div> -->
        <div class="item" v-show="adPurpose == 3">
          <div class="name"><span class="point">*</span> 目标位置</div>
          <div class="bttom">
            <el-select
              v-model="step3AdTarget"
              clearable
              class="w555"
              placeholder="请选择目标位置"
              @change="step3AdTargetFn"
              :disabled="disableStep3"
            >
              <el-option
                v-for="item in step3AdTargetList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="mg20" v-if="step3AdTarget == 2">
              <el-select
                v-model="step3AdApp"
                clearable
                class="w555"
                placeholder="请选择App"
              >
                <el-option
                  v-for="item in step3AdAppList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="item" v-show="adPurpose != 1">
          <div class="name"><span class="point">*</span> 广告投放优化目标</div>
          <div class="bttom">
            <el-select
              v-model="step3optimize"
              clearable
              class="w555"
              placeholder="请选择广告投放优化目标"
              :disabled="disableStep3"
            >
              <el-option
                v-for="item in step3optimizeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item" v-show="adPurpose != 1">
          <!-- <div class="hasitem" v-if="bidding == 2">
                <div class="name">
                  <span class="point">*</span> 各广告组费用上限 $
                </div>
                <el-input
                  class="w555"
                  v-model="biddingInp"
                  placeholder="广告组费用上限"
                ></el-input>
                <div class="msg">USD / 购物</div>
              </div>
              <div class="hasitem" v-if="bidding == 3">
                <div class="name">
                  <span class="point">*</span> 各广告组竞价上限 $
                </div>
                <el-input
                  class="w555"
                  v-model="biddingInp"
                  placeholder="广告组竞价上限"
                ></el-input>
                <div class="msg">USD / 购物</div>
              </div>
              <div class="hasitem" v-if="bidding == 4">
                <div class="name">
                  <span class="point">*</span> 广告花费回报保底值
                </div>
                <el-input
                  class="w555"
                  v-model="biddingInp"
                  placeholder="广告花费回报保底值"
                ></el-input>
                <div class="msg roas">ROAS值</div>
              </div> -->

          <div class="name">
            <span class="point">*</span> 单次目标费用控制额$
          </div>
          <div class="bttom">
            <el-input
              type="number"
              class="w555"
              v-model="step3cost"
              placeholder="单次目标费用控制额"
              :disabled="disableStep3"
              oninput="value=value.replace(/^0+/,'').replace(/[^\d]/g,'')"
            ></el-input>
          </div>
        </div>
        <div class="item" v-show="adStateOptimize == 2">
          <div class="name"><span class="point">*</span> 广告组预算</div>
          <div class="bttom">
            <el-select
              v-model="step3AdBudget"
              clearable
              class="w555"
              placeholder="请选择广告组预算"
              :disabled="disableStep3"
            >
              <el-option
                v-for="item in step3AdBudgetList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="mg20">
              <el-input
                type="number"
                class="w555"
                v-model="step3AdBudgetInp"
                placeholder="输入预算"
                :disabled="disableStep3"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- <div class="item">
          <div class="name"><span class="point">*</span> 像素代码</div>
          <div class="bttom">
            <el-select
              v-model="step3code"
              clearable
              class="w555"
              placeholder="请选择像素代码"
            >
              <el-option
                v-for="item in step3codeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div> -->
        <div class="control">
          <div class="title">已保存受众</div>
          <el-switch
            v-model="controlSwitch"
            active-color="#5563cb"
            inactive-color="#e8e8e8"
            @change="controlSwitchFn"
            :disabled="disableStep3"
          >
          </el-switch>
        </div>
        <div class="item" v-show="controlSwitch">
          <div class="name"><span class="point">*</span> 包含受众</div>
          <div class="bttom">
            <el-select
              v-model="step3IncludePenson"
              multiple
              collapse-tags
              class="w555 md20"
              placeholder="请选择"
              @change="step3IncludePensonFn"
              clearable
              :disabled="disableStep3"
            >
              <el-option
                v-for="item in step3IncludeOptions"
                :key="item.taskId"
                :label="item.audienceGroupName"
                :value="item.taskId"
              >
              </el-option>
            </el-select>
            <!-- <el-input
              class="w555"
              v-model="step3IncludePenson"
              placeholder="请添加之前创建的自定义受众或类似受众"
            ></el-input> -->
            <!-- <div class="mg20">
              <div class="hasitem">
                <div class="name"><span class="point">*</span> 排除受众</div>
                <el-input
                  class="w555"
                  v-model="step3ExcludePenson"
                  placeholder="排除受众"
                ></el-input>
              </div>
            </div> -->
            <!-- <div class="config" @click="handleCustomAudience">添加</div> -->
            <div class="tags w555">
              <div class="tags-in">
                <div class="tags-title">包含</div>
                <div class="tags-list">
                  <!-- v-for="tag in tagsinlist" -->
                  <el-tag
                    @close="deletetags(1, tag)"
                    v-for="tag in step3IncludePensonList"
                    :key="tag.taskId"
                    closable
                  >
                    {{ tag.audienceGroupName }}
                  </el-tag>
                </div>
              </div>
              <!-- <div class="tags-in">
                <div class="tags-title">排除</div>
                <div class="tags-list">
                  <el-tag
                    @close="deletetags(2, tag)"
                    v-for="tag in tagsexlist"
                    :key="tag.name"
                    closable
                    :type="tag.type"
                  >
                    {{ tag.name }}
                  </el-tag>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="control">
          <div class="title">新建受众</div>
          <el-switch
            v-model="newSwitch"
            active-color="#5563cb"
            inactive-color="#e8e8e8"
            @change="newSwitchFn"
            :disabled="disableStep3"
          >
          </el-switch>
        </div>
        <div class="item" v-show="newSwitch">
          <div class="name"><span class="point">*</span> 受众年龄</div>
          <div class="bttom">
            <div class="between">
              <el-input
                type="number"
                class="w188"
                v-model.number="ageVal1"
                @blur="handleLimit('ageVal1')"
                placeholder="请输入受众年龄"
                :disabled="disableStep3"
              ></el-input>
              <span class="cutup">-</span>
              <el-input
                type="number"
                class="w188"
                v-model.number="ageVal2"
                @blur="handleLimit('ageVal2')"
                placeholder="请输入受众年龄"
                :disabled="disableStep3"
              ></el-input>
              <div class="configline" @click="handleAddAge">
                添加受众年龄变量
              </div>
            </div>
            <div class="variables">
              <div
                class="variable"
                v-for="(item, index) in tagsAgelist"
                :key="'tagsAgelist' + index"
              >
                <div class="variable-name">变量{{ index + 1 }}</div>
                <div class="variable-val">
                  <el-tag closable @close="deletetags(3, item)">
                    {{ item.minAge }}-{{ item.maxAge }}
                  </el-tag>
                </div>
              </div>
            </div>
          </div>
          <div class="name"><span class="point">*</span> 受众性别</div>
          <div class="bttom">
            <div class="between">
              <el-select
                v-model="sexVal"
                class="w402"
                clearable
                placeholder="请选择"
                :disabled="disableStep3"
              >
                <el-option
                  v-for="item in sexValOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div class="configline" @click="handleAddSex">
                添加受众性别变量
              </div>
            </div>
            <div class="variables">
              <div
                class="variable"
                v-for="(item, index) in tagsSexlist"
                :key="'tagsSexlist' + index"
              >
                <div class="variable-name">变量{{ index + 1 }}</div>
                <div class="variable-val">
                  <el-tag closable @close="deletetags(4, item)">{{
                    item == 1 ? '男' : '女'
                  }}</el-tag>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item" v-show="newSwitch">
          <div class="name"><span class="point">*</span> 包含地区</div>
          <div class="bttom">
            <el-autocomplete
              class="w555"
              value-key="name"
              v-model="step3AddArea"
              :fetch-suggestions="querySearchAsyncAddArea"
              placeholder="请输入包含地区"
              @select="handleSelectAddArea"
              :disabled="disableStep3"
              :trigger-on-focus="false"
            ></el-autocomplete>
            <!-- <el-input
              class="w555"
              v-model="step3AddArea"
              placeholder="请输入包含地区"
            ></el-input> -->
            <div class="mg20">
              <div class="hasitem">
                <div class="name"><span class="point"></span> 排除地区</div>
                <el-autocomplete
                  class="w555"
                  value-key="name"
                  v-model="step3ExArea"
                  :fetch-suggestions="querySearchAsyncExArea"
                  placeholder="请输入排除地区"
                  @select="handleSelectExArea"
                  :disabled="disableStep3"
                  :trigger-on-focus="false"
                ></el-autocomplete>
                <!-- <el-input
                  class="w555"
                  v-model="step3ExArea"
                  placeholder="请输入排除地区"
                ></el-input> -->
              </div>
            </div>
            <div class="config" @click="handleAddArea">添加</div>
            <div class="tags w555">
              <div class="tags-in">
                <div class="tags-title">变量</div>
                <div class="tags-list" v-if="step3AddAreaList.length > 0">
                  <el-tag
                    @close="deletetags(6, tag)"
                    v-for="tag in step3AddAreaList"
                    :key="tag.key"
                    closable
                  >
                    {{ InterestFormat(tag.includeRegion, 'name') }}-{{
                      InterestFormat(tag.excludeRegion, 'name')
                    }}
                  </el-tag>
                </div>
              </div>
              <!-- <div class="tags-in">
                <div class="tags-title">排除</div>
                <div class="tags-list">
                  <el-tag
                    @close="deletetags(6, tag)"
                    v-for="tag in step3ExAreaList"
                    :key="tag.name"
                    closable
                    :type="tag.type"
                  >
                    {{ tag.name }}
                  </el-tag>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="item" v-show="newSwitch">
          <div class="name"><span class="point">*</span> 兴趣和行为</div>
          <div class="bttom">
            <el-autocomplete
              class="w555"
              value-key="name"
              v-model="step3AddInterest"
              :fetch-suggestions="querySearchAsyncLike"
              placeholder="请输入排除地区"
              @select="handleSelectLike"
              :disabled="disableStep3"
              :trigger-on-focus="false"
            ></el-autocomplete>
            <!-- <el-input
              class="w555"
              v-model="step3AddInterest"
              placeholder="请输入兴趣和行为"
            ></el-input> -->
            <div class="mg20">
              <div class="hasitem">
                <div class="name">
                  <span class="point"></span> 排除兴趣和行为
                </div>
                <el-autocomplete
                  class="w555"
                  value-key="name"
                  v-model="step3ExInterest"
                  :fetch-suggestions="querySearchAsyncDislike"
                  placeholder="请输入排除地区"
                  @select="handleSelectDislike"
                  :disabled="disableStep3"
                  :trigger-on-focus="false"
                ></el-autocomplete>
                <!-- <el-input
                  class="w555"
                  v-model="step3ExInterest"
                  placeholder="请输入排除兴趣和行为"
                ></el-input> -->
              </div>
            </div>
            <div class="config" @click="handleAddInterest">添加</div>
            <div class="tags w555">
              <div class="tags-in">
                <div class="tags-title">变量</div>
                <div class="tags-list" v-if="step3AddInterestList.length > 0">
                  <el-tag
                    @close="deletetags(5, tag)"
                    v-for="tag in step3AddInterestList"
                    :key="tag.name"
                    closable
                  >
                    {{ InterestFormat(tag.includeInterest, 'name') }}-{{
                      InterestFormat(tag.excludeInterest, 'name')
                    }}
                  </el-tag>
                </div>
              </div>
              <!-- <div class="tags-in">
                <div class="tags-title">排除</div>
                <div class="tags-list">
                  <el-tag
                    @close="deletetags(6, tag)"
                    v-for="tag in step3ExInterestList"
                    :key="tag.name"
                    closable
                    :type="tag.type"
                  >
                    {{ tag.name }}
                  </el-tag>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="item w555">
          <div class="name"><span class="point">*</span> 版位</div>
          <div class="bttom">
            <div class="selct-btns">
              <div
                class="selct-btn"
                :class="{ act: step3Slot === 1 }"
                @click="toggleClick(1)"
              >
                自动版位
              </div>
              <!-- <div
                class="selct-btn"
                :class="{ act: step3Slot === 2 }"
                @click="toggleClick(2)"
              >
                手动版位
              </div> -->
            </div>
            <!-- <div class="mg20">
              <div class="hasitem" v-if="step3Slot == 2">
                <div class="name"><span class="point"></span> 设备类型</div>
                <el-select
                  v-model="step3Equipment"
                  clearable
                  class="w555"
                  placeholder="请选择设备类型"
                >
                  <el-option
                    v-for="item in step3EquipmentList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="name mg20"><span class="point"></span> 平台</div>
                <el-select
                  v-model="step3platform"
                  clearable
                  class="w555"
                  placeholder="请选择平台"
                >
                  <el-option
                    v-for="item in step3platformList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="part1 part2 part4" v-show="activestep == 3">
      <div class="yy-ad-title w555">广告发布</div>
      <div class="part-title">广告配置</div>
      <div class="content">
        <div
          class="step4"
          v-for="(step4AdItem, idx) in step4AdList"
          :key="'step4AdItem' + idx"
        >
          <div class="step4-ad">广告{{ idx + 1 }}</div>

          <div class="item">
            <div class="name"><span class="point">*</span> 广告名称</div>
            <div class="bttom">
              <el-input
                class="w555"
                v-model="step4AdItem.variableName"
                placeholder="请输入广告名称"
                maxlength="100"
              ></el-input>
              <!-- <div class="config" @click="openDialog(4, idx)">
                插入可配置参数
              </div> -->
              <div class="mg20">
                <el-button type="primary" @click="openDialog(4, idx)">插入可配置参数</el-button>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="name"><span class="point">*</span> 广告状态</div>
            <div class="bttom">
              <el-select
                v-model="step4AdItem.adsStatus"
                clearable
                class="w555"
                placeholder="请选择广告状态"
              >
                <el-option
                  v-for="item in step4AdStateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="name"><span class="point">*</span> 广告格式</div>
            <div class="bttom">
              <el-select
                v-model="step4AdItem.advertType"
                clearable
                class="w555"
                placeholder="请选择广告状态"
              >
                <el-option
                  v-for="item in step4AdFormatList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="item">
            <div class="name"><span class="point">*</span> 正文</div>
            <div class="bttom">
              <el-input
                class="w555"
                v-model="step4AdItem.body"
                placeholder="请输入广告正文"
              ></el-input>
            </div>
          </div>
          <div class="item">
            <div class="name"><span class="point">*</span> 标题</div>
            <div class="bttom">
              <el-input
                class="w555"
                v-model="step4AdItem.title"
                placeholder="请输入广告标题"
              ></el-input>
            </div>
          </div>
          <div class="item">
            <div class="name"><span class="point"></span> 描述</div>
            <div class="bttom">
              <el-input
                class="w555"
                v-model="step4AdItem.des"
                placeholder="请输入广告描述"
              ></el-input>
            </div>
          </div>
          <div class="item">
            <div class="name"><span class="point">*</span> 网址</div>
            <div class="bttom">
              <el-input
                class="w555"
                v-model="step4AdItem.url"
                placeholder="请输入广告网址"
              ></el-input>
            </div>
          </div>
          <div class="item">
            <div class="name"><span class="point"></span> 网站深度链接</div>
            <div class="bttom">
              <el-input
                class="w555"
                v-model="step4AdItem.websiteLink"
                placeholder="请输入网站深度链接"
              ></el-input>
            </div>
          </div>

          <div class="item">
            <div class="name"><span class="point">*</span> 行动号召</div>
            <div class="bttom">
              <el-select
                v-model="step4AdItem.moveCall"
                clearable
                class="w555"
                placeholder="请选择行动号召"
              >
                <el-option
                  v-for="item in step4AdActionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="name">
              <span class="point">*</span> 选择图片或视频（{{
                step4AdItem.advertisementFacebookImg.length
              }}/10）
            </div>
            <!-- <div class="bttom">
              <el-upload
                action="#"
                accept="image/*,video/*"
                list-type="picture-card"
                multiple
                :limit="10"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :on-success="handleSuccess"
                :before-upload="handleBeforeUpload"
                :auto-upload="false"
                class="upload-list-wrap"
              > -->

            <!-- //注释起来的
               // :auto-upload="false"
               // show-file-list
              // :auto-upload="false"
              //  :file-list="step4AdItem.advertisementFacebookImg" -->

            <!-- <template #default>
                  <i class="el-icon-plus"></i>
                </template>
                <template #file="{ file }">
                  <div class="upload-item-wrap">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <div class="upload-item-name">{{ file.name }}</div>
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>

                </template>
              </el-upload>
            </div> -->
            <div class="bttom">
              <div class="media-list">
                <div
                  class="media"
                  v-for="(
                    pic, picIndex
                  ) in step4AdItem.advertisementFacebookImg"
                  :key="'pic' + picIndex"
                >
                  <div class="del" @click="delUploadImg(picIndex)">x</div>
                  <img
                    class="avtar"
                    :src="pic.imgType == 1 ? pic.imgUrl : pic.vedioImage"
                    alt=""
                  />
                  <div class="is-video" v-if="pic.imgType == 2">
                    <i class="el-icon-film"></i>
                  </div>
                  <!-- <div class="avtar-name">aaaa.png</div> -->
                </div>
                <div class="media-add" @click="selectHandle(idx)">
                  <div class="add-icon">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="config" @click="step4AddAd">新增广告</div> -->
    </div>
    <public-btn
      :steps="3"
      :activestep="activestep"
      :disabledVal="disabledVal"
      @nextFn="nextFn"
      @publicFn="publicFn"
      @publicSave="publicSave"
      @previousFn ="previousFn"
    ></public-btn>
    <el-dialog title="可配置参数" v-model="dialogOption" width="600px">
      <div class="dialog-option">
        <el-checkbox-group v-model="checkList1">
          <el-checkbox label="受众年龄"></el-checkbox>
          <el-checkbox label="受众性别"></el-checkbox>
          <el-checkbox label="兴趣和行为"></el-checkbox>
          <el-checkbox label="排除兴趣和行为"></el-checkbox>
          <el-checkbox label="包含地区"></el-checkbox>
          <el-checkbox label="排除地区"></el-checkbox>
          <el-checkbox v-if="controlSwitch" label="包含受众"></el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- <div class="dialog-option" v-if="dialogStep == 3">
        <el-checkbox-group v-model="checkList2">
          <el-checkbox label="转化事件(年月日)"></el-checkbox>
          <el-checkbox label="广告投放优化目标"></el-checkbox>
          <el-checkbox label="受众年龄"></el-checkbox>
          <el-checkbox label="受众性别"></el-checkbox>
          <el-checkbox label="广告组预算"></el-checkbox>
          <el-checkbox label="包含地区"></el-checkbox>
          <el-checkbox label="排除地区"></el-checkbox>
          <el-checkbox label="兴趣和行为"></el-checkbox>
          <el-checkbox label="排除兴趣和行为"></el-checkbox>
          <el-checkbox label="开启时间"></el-checkbox>
        </el-checkbox-group>
      </div> -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogHandle(1)">取 消</el-button>
          <el-button type="primary" @click="dialogHandle(0)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 文件上传 -->
    <upload-file-modal
      :uploadAdvertType="uploadAdvertType"
      :parentDialogMediaLib="parentDialogMediaLib"
      @UploadFileModalClose="UploadFileModalClose"
      @UploadFileModalSure="UploadFileModalSure"
    />
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import router from '@/router'
import { useRoute } from 'vue-router'
import { HttpResponse } from '@/interface/interface'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs,
  watch,
  watchEffect
} from 'vue'
import Progressbar from '../common/Progressbar.vue'
import PublicBtn from '../common/PublicBtn.vue'
import UploadFileModal from '../common/UploadFileModal.vue'
import {
  fbRegions,
  fbInfoAddOrUpd,
  fbGetAdCampaign,
  fbCampaignAddOrUpd,
  fbAdset,
  fbgetAdAdset,
  fbGetIncludeAudience,
  fbinterestOrBehaviors,
  fbadsAddOrUpd,
  fbtaskDetail,
  fbGetPageList,
  fbGetPixelList,
  fbGetInstagramList,
  fbGetCampaignDetail,
  fbGetAdsetDetail
} from '@/api/admanage'
import { collectGetAccountSelect } from '../common/action/index'
import { getKeyArray, isEmptyObject } from '@/utils/utils'

export default defineComponent({
  name: '',
  props: {},
  setup () {
    const route = useRoute()
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties
    // // console.log('date', dayjs().valueOf())
    // console.log('date', +dayjs())

    const state = reactive({
      steps: ['01/基础配置', '02/广告系列配置', '03/广告组配置', '04/广告配置'],
      activestep: 0,
      taskval: '',
      selectvalad: '',
      selectvaladItem: '' as any,
      selOptionsAd: [
        {
          accountId: '选项1',
          accountName: '黄金糕'
        }
      ],
      fbhome: '',
      fbhomeItem: '' as any,
      fbhomeList: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      insId: '',
      insIdItem: '' as any,
      insIdList: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      pixelId: '',
      pixelIdItem: '' as any,
      pixelIdList: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      place: '',
      placeItem: {} as any,
      adSeries: '1',
      adSeriesList: [
        {
          value: '1',
          label: '新建'
        },
        {
          value: '2',
          label: '选择已有的广告系列'
        }
      ],
      adSeriesInput: '',
      hasSeries: '',
      hasSeriesList: [] as any,
      adPurpose: '',
      adPurposeList: [
        {
          value: '1',
          label: ' 品牌认知-品牌知名度'
        },
        {
          value: '2',
          label: ' 品牌认知-覆盖人数'
        },
        {
          value: '3',
          label: ' 购买意向-访问量'
        },
        {
          value: '4',
          label: ' 购买意向-参与互动'
        },
        {
          value: '7',
          label: ' 行动转化-转化量'
        }
        // {
        //   value: '5',
        //   label: ' 购买意向-应用安装量'
        // },
        // {
        //   value: '6',
        //   label: ' 购买意向-视频观看量'
        // },
        // {
        //   value: '8',
        //   label: ' 行动转化-目录促销'
        // }
      ],
      adState: '1',
      aadStateList: [
        {
          value: '1',
          label: '开启'
        },
        {
          value: '2',
          label: '关闭'
        }
      ],
      adStateOptimize: '1',
      adStateOptimizeList: [
        {
          value: '1',
          label: '开启'
        },
        {
          value: '2',
          label: '关闭'
        }
      ],
      adBudget: '',
      adBudgetList: [
        {
          value: '0',
          label: ' 单日预算'
        },
        {
          value: '1',
          label: ' 总预算'
        }
      ],
      adBudgetInp: '',
      bidding: '',
      biddingList: [
        {
          value: '1',
          label: '最低费用'
        },
        {
          value: '2',
          label: '费用上限'
        },
        {
          value: '3',
          label: '竞价上限'
        }
        // {
        //   value: '4',
        //   label: '广告花费回报保底'
        // }
      ],
      biddingInp: '',
      biddingTop: '',
      biddingRoas: '',
      dialogOption: false,
      checkList1: [] as any,
      checkList2: ['转化事件(年月日)'],
      dialogStep: 2,
      adSeries2: '1',
      adSeriesList2: [
        {
          value: '1',
          label: '新建'
        },
        {
          value: '2',
          label: '选择已有的广告组'
        }
      ],
      adSeriesInput2: '',
      hasSeries2: '',
      hasSeriesList2: [
        {
          value: '1',
          label: 'sss'
        },
        {
          value: '2',
          label: 'ccccc'
        }
      ],
      step3state: '',
      step3stateList: [
        {
          value: '1',
          label: '开启'
        },
        {
          value: '2',
          label: '关闭'
        }
      ],
      step3starttime: '',
      step3endtime: '',
      step3tothings: '',
      step3tothingsList: [
        {
          value: 'WEBSITE',
          label: 'Website'
        },
        {
          value: 'MESSENGER',
          label: 'Messenger'
        }
      ],
      step3totimeApp: '',
      step3totimeAppList: [
        {
          value: '1',
          label: 'test'
        }
      ],
      step3totime: '',
      step3totimeList: [
        {
          value: 'ADD_PAYMENT_INFO',
          label: 'Add Payment Info'
        },
        {
          value: 'ADD_TO_CART',
          label: 'Add to Cart'
        },
        {
          value: 'ADD_TO_WISHLIST',
          label: 'Add to Wishlist'
        },
        {
          value: 'COMPLETE_REGISTRATION',
          label: 'Complete Registration'
        },
        {
          value: 'CONTACT',
          label: 'Contact'
        },
        {
          value: 'CUSTOMIZE_PRODUCT',
          label: 'Customize Product'
        },
        {
          value: 'DONATE',
          label: 'Donate'
        },
        {
          value: 'FIND_LOCATION',
          label: 'Find Location'
        },
        {
          value: 'INITIATED_CHECKOUT',
          label: 'Initiate Checkout'
        },
        {
          value: 'LEAD',
          label: 'Lead'
        },
        {
          value: 'PURCHASE',
          label: 'Purchase'
        },
        {
          value: 'SCHEDULE',
          label: 'Schedule'
        },
        {
          value: 'SEARCH',
          label: 'Search'
        },
        {
          value: 'START_TRIAL',
          label: 'Start Trail'
        },
        {
          value: 'SUBMIT_APPLICATION',
          label: 'Submit Application'
        },
        {
          value: 'SUBSCRIBE',
          label: 'Subscribe'
        },
        {
          value: 'CONTENT_VIEW',
          label: 'View Content'
        }
      ],
      step3AdProduct: '',
      step3AdProductList: [
        {
          value: '1',
          label: 'test'
        }
      ],
      step3StoreOrUrl: '',
      step3AdApptype: '',
      step3AdApptypeList: [
        {
          value: '1',
          label: 'Google Play'
        },
        {
          value: '2',
          label: 'iTunes'
        },
        {
          value: '3',
          label: 'iTunes for pad'
        },
        {
          value: '4',
          label: 'Windows Store'
        },
        {
          value: '5',
          label: 'Facebook Canvas'
        },
        {
          value: '6',
          label: 'Amazon Appstroe'
        },
        {
          value: '7',
          label: 'Instant Games'
        },
        {
          value: '8',
          label: 'Oculus App Store'
        },
        {
          value: '9',
          label: 'APKPure.com'
        },
        {
          value: '10',
          label: 'APKMonk.com'
        },
        {
          value: '11',
          label: 'Xiaomi'
        }
      ],
      step3AdTarget: '',
      step3AdTargetList: [
        {
          value: 'WEBSITE',
          label: 'Website'
        },
        {
          value: 'MESSENGER',
          label: 'Messenger'
        }
      ],
      step3AdApp: '',
      step3AdAppList: [
        {
          value: '1',
          label: 'test'
        }
      ],
      step3optimize: '',
      step3optimizeList: [
        {
          value: '1',
          label: '转化量'
        },
        {
          value: '2',
          label: '落地页浏览量'
        },
        {
          value: '3',
          label: '链接点击量'
        }
      ],
      step3cost: '',
      step3AdBudget: '',
      step3AdBudgetList: [
        {
          value: '0',
          label: ' 单日预算'
        },
        {
          value: '1',
          label: ' 总预算'
        }
      ],
      step3AdBudgetInp: '',
      step3code: '',
      step3codeList: [
        {
          value: '1',
          label: '*********的像素代码'
        }
      ],
      step3IncludePenson: [] as any,
      step3IncludePensonList: [] as any,
      step3IncludeOptions: [] as any,
      step3ExcludePenson: '',
      controlSwitch: false,
      tagsexlist: [] as any,
      newSwitch: true,
      ageVal1: '',
      ageVal2: '',
      tagsAgelist: [] as any,
      sexVal: '',
      sexValOptions: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        }
      ],
      tagsSexlist: ['1', '2'] as any,
      step3AddArea: '',
      step3AddAreaItem: '' as any,
      step3ExArea: '',
      step3ExAreaItem: '' as any,
      step3AddAreaList: [] as any,
      step3ExAreaList: [] as any,
      step3AddInterest: '',
      step3AddInterestItem: '',
      step3ExInterest: '',
      step3ExInterestItem: '',
      step3AddInterestList: [] as any,
      step3ExInterestList: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' }
      ] as any,
      step3Slot: 1,
      step3Equipment: '',
      step3EquipmentList: [
        {
          value: '1',
          label: '所有设备（推荐）'
        },
        {
          value: '2',
          label: 'PC'
        },
        {
          value: '3',
          label: 'iOS'
        },
        {
          value: '4',
          label: 'Android'
        }
      ],
      step3platform: '',
      step3platformList: [
        {
          value: '1',
          label: ' Facebook-动态'
        },
        {
          value: '2',
          label: ' Facebook-即阅文'
        },
        {
          value: '3',
          label: ' Facebook-视频插播位'
        },
        {
          value: '4',
          label: ' Facebook-右边栏'
        },
        {
          value: '5',
          label: ' Facebook-推荐视频'
        },
        {
          value: '6',
          label: ' Facebook-Marketplace'
        },
        {
          value: '7',
          label: ' Instagram-动态'
        },
        {
          value: '8',
          label: ' Instagram-快拍'
        },
        {
          value: '9',
          label: ' Audience Network-原生、横幅和插屏版位'
        },
        {
          value: '10',
          label: ' Audience Network-视频插播位'
        },
        {
          value: '11',
          label: ' Audience Network-奖励式视频广告'
        },
        {
          value: '12',
          label: ' Messenger-首页'
        },
        {
          value: '13',
          label: ' Messenger-赞助消息'
        }
      ],
      step4AdStateList: [
        {
          value: 1,
          label: '开启'
        },
        {
          value: 2,
          label: '关闭'
        }
      ],
      step4AdFormatList: [
        {
          value: '1',
          label: '图片'
        },
        {
          value: '2',
          label: '视频'
        },
        {
          value: '3',
          label: '轮播图片'
        }
        // {
        //   value: '4',
        //   label: '轮播'
        // },
        // {
        //   value: '5',
        //   label: '幻灯片'
        // },
        // {
        //   value: '6',
        //   label: '精品栏'
        // }
      ],
      step4AdActionList: [
        {
          value: 'VALUE_NO_BUTTON',
          label: ' 无按钮'
        },
        {
          value: 'VALUE_LEARN_MORE',
          label: ' 详细了解'
        },
        {
          value: 'VALUE_APPLY_NOW',
          label: ' 立即申请'
        },
        {
          value: 'VALUE_BOOK_TRAVEL',
          label: ' 立即预订'
        },
        {
          value: 'VALUE_CONTACT_US',
          label: ' 联系我们'
        },
        {
          value: 'VALUE_DOWNLOAD',
          label: ' 下载'
        },
        {
          value: 'VALUE_GET_SHOWTIMES',
          label: ' 查看场次'
        },
        {
          value: 'VALUE_LISTEN_NOW',
          label: ' 立即收听'
        },
        {
          value: 'VALUE_PLAY_GAME',
          label: ' 玩游戏'
        },
        {
          value: 'VALUE_SHOP_NOW',
          label: ' 去逛逛'
        },
        {
          value: 'VALUE_SIGN_UP',
          label: ' 立即注册'
        },
        {
          value: 'VALUE_SUBSCRIBE',
          label: ' 订阅'
        },
        {
          value: 'VALUE_WHATSAPP_MESSAGE',
          label: '发送WhatsApp消息'
        }
      ],
      step4AdList: [
        {
          variableName: '',
          adsStatus: '',
          advertType: '',
          body: '',
          title: '',
          des: '',
          url: '',
          websiteLink: '',
          moveCall: '',
          advertisementFacebookImg: [
            // {
            //   imgId: '1',
            //   imgName: '2',
            //   imgUrl: '',
            //   imgType: 0,
            //   vedioImage: '',
            //   sort: 0
            // }
          ] as any
        }
      ],
      tempStep4AdItemIndex: 0,
      parentDialogMediaLib: false,
      channelId: 1,
      taskId: '',
      pictureCheckIdex: 0,
      disabledDate (time:any) {
        return time.getTime() < ((+dayjs(state.step3starttime)) + 3600 * 1000 * 24)
      },
      disabledDate1 (time:any) {
        return time.getTime() < (+new Date() - 3600 * 1000 * 24)
      },
      detailObj: '' as any,
      disabledVal: false,
      disableStep2: false,
      disableStep3: false,
      uploadAdvertType: '1'
    })

    // 步骤切换
    const clilckstep = (val: number) => {
      state.activestep = val
    }
    // 第一步
    const getFbhomeList = async () => {
      const params = {
        adAccountId: state.selectvaladItem.accountId
      }
      const res = (await fbGetPageList(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.fbhomeList = res.data
      }
    }
    const getFbInsIdList = async () => {
      const params = {
        pageId: state.fbhomeItem.pageId
      }
      const res = (await fbGetInstagramList(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.insIdList = res.data
      }
    }
    const getFbGetPixelList = async () => {
      const params = {
        adAccountId: state.selectvaladItem.accountId
      }
      const res = (await fbGetPixelList(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.pixelIdList = res.data
      }
    }

    const getAcount = () => {
      collectGetAccountSelect(state)
    }
    const handleAcountSelect = (item: any) => {
      // // console.log('item: ', item)
      state.selectvalad = item.accountName
      state.selectvaladItem = item
      getFbhomeList()
      getFbGetPixelList()
    }
    const handleFbhome = (item: any) => {
      state.fbhome = item.pageName
      state.fbhomeItem = item
      getFbInsIdList()
    }
    const handleInsId = (item: any) => {
      state.insId = item.instagramName
      state.insIdItem = item
    }
    const handlePixelId = (item: any) => {
      state.pixelId = item.pixelName
      state.pixelIdItem = item
    }

    // 第二步
    const getAdCampaign = async () => {
      const params = {
        accountId: state.selectvaladItem.accountId
      }
      const res = (await fbGetAdCampaign(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.hasSeriesList = res.data || []
      }
    }
    const adSeries2Fn = (item: any) => {
      console.log(123456)
      if (item == 2) {
        getAdCampaign()
      } else {
        state.disableStep2 = false
      }
    }
    // 请选择广告目标下拉
    const adPurposeFn = () => {
      switch (state.adPurpose) {
        case '1':
          // 广告竞价策略
          state.biddingList = [
            {
              value: '1',
              label: '最低费用'
            }
          ]
          // 广告投放优化目标
          state.step3optimizeList = [
            {
              value: '1',
              label: 'Ad Recall Lift'
            }
          ]
          state.step3optimize = ''

          break
        case '2':
          // 广告竞价策略
          state.biddingList = [
            {
              value: '1',
              label: '最低费用'
            },
            {
              value: '3',
              label: '竞价上限'
            }
          ]
          // 广告投放优化目标
          state.step3optimizeList = [
            {
              value: '3',
              label: '覆盖人数'
            },
            {
              value: '4',
              label: '展示次数'
            }
          ]
          state.step3optimize = ''
          break
        case '3':
          // 广告竞价策略
          state.biddingList = [
            {
              value: '1',
              label: '最低费用'
            },
            {
              value: '3',
              label: '竞价上限'
            }
          ]
          // 广告投放优化目标
          state.step3optimizeList = [
            {
              value: '5',
              label: '落地页浏览量'
            },
            {
              value: '6',
              label: '链接点击量'
            },
            {
              value: '3',
              label: '每日独立人数触达'
            },
            {
              value: '4',
              label: '展示次数'
            }
          ]
          state.step3optimize = ''
          break
        case '4':
          // 广告竞价策略
          state.biddingList = [
            {
              value: '1',
              label: '最低费用'
            },
            {
              value: '2',
              label: '费用上限'
            },
            {
              value: '3',
              label: '竞价上限'
            }
          ]
          // 广告投放优化目标
          state.step3optimizeList = [
            {
              value: '12',
              label: '帖子参与度'
            },
            {
              value: '3',
              label: '每日独立人数触达'
            },
            {
              value: '4',
              label: '展示次数'
            }
          ]
          state.step3optimize = ''
          // 广告格式
          state.step4AdFormatList = [
            {
              value: '1',
              label: '图片'
            },
            {
              value: '2',
              label: '视频'
            }
          ]
          break
        case '7':
          // 广告竞价策略
          state.biddingList = [
            {
              value: '1',
              label: '最低费用'
            },
            {
              value: '2',
              label: '费用上限'
            },
            {
              value: '3',
              label: '竞价上限'
            }
            // {
            //   value: '4',
            //   label: '广告花费回报保底'
            // }
          ]
          // 广告投放优化目标
          state.step3optimizeList = [
            {
              value: '11',
              label: '转化量'
            },
            {
              value: '5',
              label: '落地页浏览量'
            },
            {
              value: '6',
              label: '链接点击量'
            },
            {
              value: '3',
              label: '每日独立人数触达'
            },
            {
              value: '4',
              label: '展示次数'
            },
            {
              value: '2',
              label: 'value'
            }
          ]
          state.step3optimize = ''
          break
      }
    }

    // 解决广告投放优化list目标
    const HandleOptimizeListFn = () => {
      // 广告目标
      if (state.adPurpose == '1') {
        // 广告竞价策略
        switch (state.bidding) {
          case '1':
            // 广告投放优化目标
            state.step3optimizeList = [
              {
                value: '1',
                label: 'Ad Recall Lift'
              }
            ]
            break
        }
      }
      // 广告目标
      if (state.adPurpose == '2') {
        // 广告竞价策略
        switch (state.bidding) {
          case '1':
            // 广告投放优化目标
            state.step3optimizeList = [
              {
                value: '3',
                label: '覆盖人数'
              },
              {
                value: '4',
                label: '展示次数'
              }
            ]
            break
          case '3':
            state.step3optimizeList = [
              {
                value: '3',
                label: '覆盖人数'
              },
              {
                value: '4',
                label: '展示次数'
              }
            ]
            break
        }
      }
      // 广告目标
      if (state.adPurpose == '3') {
        // 广告竞价策略
        switch (state.bidding) {
          case '1':
            // 转换事件目的地
            if (state.step3tothings == 'WEBSITE') {
              // 广告投放优化目标
              state.step3optimizeList = [
                {
                  value: '5',
                  label: '落地页浏览量'
                },
                {
                  value: '6',
                  label: '链接点击量'
                },
                {
                  value: '3',
                  label: '每日独立人数触达'
                },
                {
                  value: '4',
                  label: '展示次数'
                }

              ]
            } else if (state.step3tothings == 'MESSENGER') {
              state.step3optimizeList = [
                {
                  value: '6',
                  label: '链接点击量'
                },
                {
                  value: '3',
                  label: '每日独立人数触达'
                }
              ]
            }
            break
          case '3':
            if (state.step3tothings == 'WEBSITE') {
              // 广告投放优化目标
              state.step3optimizeList = [
                {
                  value: '5',
                  label: '落地页浏览量'
                },
                {
                  value: '6',
                  label: '链接点击量'
                },
                {
                  value: '3',
                  label: '每日独立人数触达'
                },
                {
                  value: '4',
                  label: '展示次数'
                }

              ]
            } else if (state.step3tothings == 'MESSENGER') {
              state.step3optimizeList = [
                {
                  value: '6',
                  label: '链接点击量'
                },
                {
                  value: '3',
                  label: '每日独立人数触达'
                }
              ]
            }
            break
        }
      }
      // 广告目标
      if (state.adPurpose == '4') {
        // 广告竞价策略
        switch (state.bidding) {
          // 转换事件目的地
          case '1':
            // 广告投放优化目标
            state.step3optimizeList = [
              {
                value: '12',
                label: '帖子参与度'
              },
              {
                value: '3',
                label: '每日独立人数触达'
              },
              {
                value: '4',
                label: '展示次数'
              }

            ]
            break
          case '2':
            state.step3optimizeList = [
              {
                value: '12',
                label: '帖子参与度'
              }
            ]
            break
          case '3':
            state.step3optimizeList = [
              {
                value: '12',
                label: '帖子参与度'
              },
              {
                value: '3',
                label: '每日独立人数触达'
              },
              {
                value: '4',
                label: '展示次数'
              }

            ]
            break
        }
      }

      // 广告目标
      if (state.adPurpose == '7') {
        // 广告竞价策略
        switch (state.bidding) {
          case '1':
            // 转换事件目的地
            if (state.step3tothings == 'WEBSITE') {
              // 广告投放优化目标
              state.step3optimizeList = [
                {
                  value: '11',
                  label: '转化量'
                },
                {
                  value: '5',
                  label: '落地页浏览量'
                },
                {
                  value: '6',
                  label: '链接点击量'
                },
                {
                  value: '3',
                  label: '每日独立人数触达'
                },
                {
                  value: '4',
                  label: '展示次数'
                }
                // {
                //   value: '2',
                //   label: 'value'
                // }

              ]
            } else if (state.step3tothings == 'MESSENGER') {
              state.step3optimizeList = [
                {
                  value: '11',
                  label: '转化量'
                },
                {
                  value: '6',
                  label: '链接点击量'
                },
                {
                  value: '3',
                  label: '每日独立人数触达'
                },
                {
                  value: '4',
                  label: '展示次数'
                }

              ]
            }
            break
          case '2':
            if (state.step3tothings == 'WEBSITE') {
              // 广告投放优化目标
              state.step3optimizeList = [
                {
                  value: '11',
                  label: '转化量'
                },
                {
                  value: '5',
                  label: '落地页浏览量'
                },
                {
                  value: '6',
                  label: '链接点击量'
                }

              ]
            } else if (state.step3tothings == 'MESSENGER') {
              state.step3optimizeList = [
                {
                  value: '11',
                  label: '转化量'
                },
                {
                  value: '6',
                  label: '链接点击量'
                }

              ]
            }
            break
          case '3':
            if (state.step3tothings == 'WEBSITE') {
              // 广告投放优化目标
              state.step3optimizeList = [
                {
                  value: '11',
                  label: '转化量'
                },
                {
                  value: '5',
                  label: '落地页浏览量'
                },
                {
                  value: '6',
                  label: '链接点击量'
                },
                {
                  value: '3',
                  label: '每日独立人数触达'
                },
                {
                  value: '4',
                  label: '展示次数'
                }

              ]
            } else if (state.step3tothings == 'MESSENGER') {
              state.step3optimizeList = [
                {
                  value: '11',
                  label: '转化量'
                },
                {
                  value: '6',
                  label: '链接点击量'
                },
                {
                  value: '3',
                  label: '每日独立人数触达'
                },
                {
                  value: '4',
                  label: '展示次数'
                }
              ]
            }
            break
          case '4':
            if (state.step3tothings == 'WEBSITE') {
              // 广告投放优化目标
              state.step3optimizeList = [
                {
                  value: '2',
                  label: 'value'
                }

              ]
            } else if (state.step3tothings == 'MESSENGER') {
              // 广告投放优化目标
              state.step3optimizeList = [
                {
                  value: '2',
                  label: 'value'
                }

              ]
            }
            break
        }
      }
    }

    // 请选择转化事件
    const step3tothingsFn = () => {
      HandleOptimizeListFn()

      // switch (state.step3tothings) {
      //   case 'WEBSITE':
      //     // 广告投放优化目标
      //     state.step3optimizeList = [
      //       {
      //         value: '11',
      //         label: '转化量'
      //       },
      //       {
      //         value: '5',
      //         label: '落地页浏览量'
      //       },
      //       {
      //         value: '6',
      //         label: '链接点击量'
      //       },
      //       {
      //         value: '3',
      //         label: '每日独立人数触达'
      //       },
      //       {
      //         value: '4',
      //         label: '展示次数'
      //       },
      //       {
      //         value: '2',
      //         label: 'value'
      //       }
      //     ]
      //     break
      //   case 'MESSENGER':
      //     // 广告投放优化目标
      //     state.step3optimizeList = [
      //       {
      //         value: '11',
      //         label: '转化量'
      //       },
      //       {
      //         value: '6',
      //         label: '链接点击量'
      //       },
      //       {
      //         value: '3',
      //         label: '每日独立人数触达'
      //       },
      //       {
      //         value: '4',
      //         label: '展示次数'
      //       }
      //     ]

      //     break
      // }
    }
    // 请选择目标位置
    const step3AdTargetFn = () => {
      switch (state.step3AdTarget) {
        case 'WEBSITE':
          // 广告投放优化目标
          state.step3optimizeList = [
            {
              value: '5',
              label: '落地页浏览量'
            },
            {
              value: '6',
              label: '链接点击量'
            },
            {
              value: '3',
              label: '每日独立人数触达'
            },
            {
              value: '4',
              label: '展示次数'
            }
          ]
          break
        case 'MESSENGER':
          // 广告投放优化目标
          state.step3optimizeList = [
            {
              value: '6',
              label: '链接点击量'
            },
            {
              value: '3',
              label: '每日独立人数触达'
            }
          ]
          break
      }
    }

    // 广告竞价策略
    const handleBidding = () => {
      HandleOptimizeListFn()
    }
    // 选择已有广告系列
    const hasSeriesListFn = async () => {
      const params = {
        campaignId: state.hasSeries
      }
      const res = await fbGetCampaignDetail(params) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        // 禁用第二步的输入
        state.disableStep2 = true

        state.adPurpose = res.data.objective
        state.adState = res.data.campaignStatus + ''
        state.adStateOptimize = res.data.budgetOptimizationType + ''
        state.bidding = res.data.bidStrategy
        state.biddingInp = res.data.bidStrategyValue
        state.adBudget = res.data.dailyBudgetStrategy
        state.adBudgetInp = res.data.dailyBudgetValue
      }
    }
    // 选择已有广告组
    const hasSeriesList2Fn = async () => {
      const params = {
        adsetId: state.hasSeries2
      }
      const res = await fbGetAdsetDetail(params) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        // 第三步输入禁用
        state.disableStep3 = true
        // 广告投放优化目标
        HandleOptimizeListFn()

        state.step3state = res.data.adsetStatus + ''
        state.step3starttime = res.data.startTime
        state.step3endtime = res.data.endTime
        state.step3AdBudget = res.data.dailyBudgetStrategy
        state.step3AdBudgetInp = res.data.dailyBudgetValue
        state.step3IncludePensonList = res.data.containAudience
        state.tagsAgelist = res.data.ageList || []
        state.tagsSexlist = res.data.genderList
        state.step3AddInterestList = res.data.interestList || []
        state.step3AddAreaList = res.data.regionList || []
        state.step3Slot = res.data.position
        state.step3optimize = res.data.launchTarget + ''
        state.step3cost = res.data.targeQuota
        state.step3AdTarget = res.data.targetLocationType
        state.step3tothings = res.data.conversionsEventTarget
        state.step3totime = res.data.conversionsEvent
      }
    }

    // 第三步
    // 数字限制
    const handleLimit = (val:string) => {
      if (!(state as any)[val]) return
      if ((state as any)[val] < 13) {
        (state as any)[val] = 13
      }
      if ((state as any)[val] > 65) {
        (state as any)[val] = 65
      }
    }
    const getIncludeAudience = async () => {
      const params = {
        accountId: state.selectvaladItem.accountId
      }
      const res = (await fbGetIncludeAudience(params)) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        state.step3IncludeOptions = res.data || []
      }
    }
    const step3IncludePensonFn = async (includeArr:any[]) => {
      // console.log('includeArr: ', includeArr)
      state.step3IncludePensonList = state.step3IncludeOptions.filter((item:any) => {
        if (includeArr.includes(item.taskId)) { return item }
      })
      console.log('state.step3IncludePensonList', state.step3IncludePensonList)
    }
    // 获取已有广告组
    const getHasGroup = async () => {
      const params = {
        campaignId: state.hasSeries
      }
      const res = (await fbgetAdAdset(params)) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        state.hasSeriesList2 = res.data || []
      }
    }
    const adSeries2Group = (item: any) => {
      //
      if (item == 2) {
        getHasGroup()
      } else {
        state.disableStep3 = false
      }
    }
    const controlSwitchFn = (val: any) => {
      // state.controlSwitch = val
      state.newSwitch = !val
    }
    const newSwitchFn = (val: any) => {
      state.controlSwitch = !val
    }

    // 地理位置远程输入框
    let timeout: any
    const querySearchAsyncAddArea = async (queryString: string, cb: any) => {
      if (!queryString) return
      const params = {
        keyword: queryString
      }
      const res = (await fbRegions(params)) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        if (!res.data) {
          // eslint-disable-next-line standard/no-callback-literal
          cb([])
          return
        }
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          cb(res.data)
        }, 300)
      }
    }
    const handleSelectAddArea = (item: any) => {
      // console.log('item: ', item)
      state.step3AddAreaItem = item
    }
    const querySearchAsyncExArea = async (queryString: string, cb: any) => {
      if (!queryString) return
      const params = {
        keyword: queryString
      }
      const res = (await fbRegions(params)) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        if (!res.data) {
        // eslint-disable-next-line standard/no-callback-literal
          cb([])
          return
        }
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          cb(res.data)
        }, 300)
      }
    }
    const handleSelectExArea = (item: any) => {
      // console.log('item: ', item)
      state.step3ExAreaItem = item
    }

    // 兴趣和行为
    // const getFbinterestOrBehaviors = async (key: string) => {
    //   const params = {
    //     keyword: key
    //   }
    //   const res = await fbinterestOrBehaviors(params) as HttpResponse
    //   console.log('res: ', res)
    //   if (res.code == 0) {

    //   }
    // }
    const querySearchAsyncDislike = async (queryString: string, cb: any) => {
      if (!queryString) return
      const params = {
        keyword: queryString
      }
      const res = (await fbinterestOrBehaviors(params)) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        if (!res.data) {
        // eslint-disable-next-line standard/no-callback-literal
          cb([])
          return
        }
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          cb(res.data)
        }, 300)
      }
    }
    const handleSelectDislike = (item: any) => {
      // console.log('item: ', item)
      state.step3ExInterestItem = item
    }
    const querySearchAsyncLike = async (queryString: string, cb: any) => {
      if (!queryString) return
      const params = {
        keyword: queryString
      }
      const res = (await fbinterestOrBehaviors(params)) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        if (!res.data) {
        // eslint-disable-next-line standard/no-callback-literal
          cb([])
          return
        }
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          cb(res.data)
        }, 300)
      }
    }
    const handleSelectLike = (item: any) => {
      // console.log('item: ', item)
      state.step3AddInterestItem = item
    }

    // 请求api
    const step0 = async () => {
      const params = {
        taskId: state.taskId,
        taskName: state.taskval,
        accountId: state.selectvaladItem.accountId,
        accountName: state.selectvaladItem.accountName,
        page: state.fbhomeItem,
        instagram: state.insIdItem,
        pixel: state.pixelIdItem
      }

      const res = (await fbInfoAddOrUpd(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.taskId = res.data.taskId
        state.activestep++
      }
    }
    const step1 = async () => {
      // console
      const params = {
        taskId: state.taskId,
        campaignName: state.adSeries == '1' ? state.adSeriesInput : '',
        quoteType: state.adSeries,
        quoteCampaignId: state.hasSeries,
        objective: state.adPurpose,
        campaignStatus: state.adState,
        budgetOptimizationType: state.adStateOptimize,
        bidStrategy: state.bidding,
        bidStrategyValue: state.biddingInp,
        dailyBudgetStrategy: state.adBudget,
        dailyBudgetValue: state.adBudgetInp
      }

      const res = (await fbCampaignAddOrUpd(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.activestep++
      }
    }
    const step2 = async () => {
      // console
      let params:any = {
        taskId: state.taskId,
        quoteType: state.adSeries2,
        variableName: state.adSeries2 == '1' ? state.adSeriesInput2 : '',
        quoteAdsetId: state.hasSeries2,
        adsetStatus: state.step3state,
        startTime: state.step3starttime,
        endTime: state.step3endtime,
        dailyBudgetStrategy: state.step3AdBudget,
        dailyBudgetValue: state.step3AdBudgetInp,
        containAudience: state.controlSwitch ? getKeyArray('id', state.step3IncludePensonList) : '',
        launchTarget: state.step3optimize,
        targeQuota: state.step3cost,
        targetLocationType: state.step3AdTarget,
        conversionsEventTarget: state.step3tothings,
        conversionsEvent: state.step3totime

        // ageList: state.tagsAgelist,
        // genderList: state.tagsSexlist,
        // interestList: state.step3AddInterestList,
        // regionList: state.step3AddAreaList,
        // position: state.step3Slot,
        // launchTarget: state.step3optimize,
        // targeQuota: state.step3cost,
        // targetLocationType: state.step3AdTarget,
        // conversionsEventTarget: state.step3tothings,
        // conversionsEvent: state.step3totime
      }
      if (!state.controlSwitch) {
        params = {
          ...params,
          ageList: state.tagsAgelist,
          genderList: state.tagsSexlist,
          interestList: state.step3AddInterestList,
          regionList: state.step3AddAreaList,
          position: state.step3Slot

        }
      }

      const res = (await fbAdset(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.activestep++
      }
    }
    // 判断素材长度是否超过10个
    const ifLengthOver10 = (arr: any[]) => {
      if (arr.length == 0) return false
      let flag = false
      arr.forEach((item) => {
        if (item.advertisementFacebookImg.length > 10) {
          flag = true
        }
        if (item.advertisementFacebookImg.length === 0) {
          flag = true
        }
      })
      return flag
    }

    // 判断是否为图片格式--img标签可打开的
    const isImage = (str: any) => {
      if (!str) return false
      var reg = /\.(png|jpg|jpeg)$/
      return reg.test(str.toLowerCase())
    }
    const isMedia = (str: any) => {
      if (!str) return false
      var reg = /\.mp4$/
      return reg.test(str.toLowerCase())
    }
    // 判断上传图片或者视频
    const ifPictureOrMedia = (type: any, selectList: any) => {
      console.log('selectList: ', selectList)
      console.log('type: ', type)
      let flag = false
      if (type == '1' || type == '3') {
        if (selectList.length > 0) {
        // 选择图片 1 图片  2视频
          selectList.forEach((item: any) => {
            if (item.imgType == 2) {
            // 类型是媒体
              flag = true
            }
            if (!isImage(item.imgName)) {
            // 图片格式不正确
              flag = true
            }
          })
        }
      } else if (type == '2') {
        // 选择媒体
        if (selectList.length > 0) {
          selectList.forEach((item: any) => {
            if (!isMedia(item.imgName)) {
              // 不是MP4类型
              flag = true
            }
          })
        }
      }

      return flag
    }

    const step3 = async (num?: number) => {
      if (ifLengthOver10(state.step4AdList)) {
        currentInstance.$message.error({
          message: '图片数量限制，请确认后重试'
        })
        return
      }
      // state.step4AdList[state.pictureCheckIdex].advertisementFacebookImg
      if (state.step4AdList[state.pictureCheckIdex].advertisementFacebookImg.length > 0) {
        // let type

        const uploadFlag = ifPictureOrMedia(state.step4AdList[state.pictureCheckIdex].advertType, state.step4AdList[state.pictureCheckIdex].advertisementFacebookImg)
        console.log('uploadFlag: ', uploadFlag, state.step4AdList[state.pictureCheckIdex].advertType)
        if (uploadFlag) {
          if (state.step4AdList[state.pictureCheckIdex].advertType == '2') {
            return currentInstance.$message.warning('请选择视频，类型为mp4')
          } else {
            return currentInstance.$message.warning('请选择图片，类型为png,jpg')
          }
        }
        // state.step4AdList[state.pictureCheckIdex].advertisementFacebookImg.forEach((item: any) => {
        //   if(){

        //   }

        // })
      }
      const params = {
        taskStatus: num || 1,
        taskId: state.taskId,
        advertisementFacebookAds: state.step4AdList
      }
      const res = (await fbadsAddOrUpd(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        router.push('/home/fbtaskad')
      }
    }

    // 发布保存
    const nextFn = () => {
      // 下一步
      // state.activestep++
      switch (state.activestep) {
        case 0:
          step0()
          break
        case 1:
          step1()
          break
        case 2:
          step2()
          break
        case 3:
          step3(2)
          break
      }
    }
    const previousFn = () => {
      if (state.activestep) {
        state.activestep--
      }
    }
    const publicFn = () => {
      //
      step3()
    }
    const publicSave = () => {
      //
      // step3(2)
      nextFn()
    }

    // 可配置参数
    const openDialog = (val: number, index?: any) => {
      console.log('val: ', val)
      state.dialogOption = true
      state.dialogStep = val
      state.tempStep4AdItemIndex = index
      // if (val == 2) {
      //   state.dialogStep = val
      // }
    }
    // 变量广告名
    const formatname = () => {
      let resStr = ''
      const len = state.checkList1.length
      if (len != 0) {
        state.checkList1.forEach((item: string, index: number) => {
          resStr += `{${item}}${index == len - 1 ? '' : '-'}`
        })
      }
      return resStr
    }
    const dialogHandle = (val: number) => {
      // 0 确认 1取消
      if (val == 0) {
        const len = state.checkList1.length
        if (state.dialogStep == 3) {
          const resStr = formatname()
          state.adSeriesInput2 =
            state.adSeriesInput2 +
            (!state.adSeriesInput2 || len == 0 ? '' : '-') +
            resStr
        } else if (state.dialogStep == 4) {
          const resStr = formatname()
          state.step4AdList[state.tempStep4AdItemIndex].variableName =
            state.step4AdList[state.tempStep4AdItemIndex].variableName +
            (!state.step4AdList[state.tempStep4AdItemIndex].variableName ||
            len == 0
              ? ''
              : '-') +
            resStr
        }
      }
      state.dialogOption = false
    }

    // 自定义受众添加
    const handleCustomAudience = () => {
      //
      // const params = {
      // }
      // state.step3IncludePensonList.push()
    }

    // 标签删除
    const deletetags = (num: number, tag: any) => {
      switch (num) {
        case 1:
          // 自定义 受众
          state.step3IncludePensonList.splice(state.step3IncludePensonList.indexOf(tag), 1)
          break
        case 2:
          state.tagsexlist.splice(state.tagsexlist.indexOf(tag), 1)
          break
        case 3:
          // 受众年龄 变量1
          state.tagsAgelist.splice(state.tagsAgelist.indexOf(tag), 1)
          break
        case 4:
          // 受众性别
          state.tagsSexlist.splice(state.tagsSexlist.indexOf(tag), 1)
          break
        case 5:
          state.step3AddInterestList.splice(
            state.step3AddInterestList.indexOf(tag),
            1
          )
          break
        case 6:
          state.step3AddAreaList.splice(state.step3AddAreaList.indexOf(tag), 1)
          break
      }

      if (num == 1) {
      } else if (num == 2) {
      } else if (num == 3) {
      } else if (num == 4) {
      }
    }

    const handleAddAge = () => {
      //
      if (!state.ageVal1 || !state.ageVal2) {
        return
      }
      const params = {
        minAge: state.ageVal1,
        maxAge: state.ageVal2
      }

      state.tagsAgelist.push(params)
      state.ageVal1 = ''
      state.ageVal2 = ''
    }
    const handleAddSex = () => {
      //
      state.tagsSexlist.push(state.sexVal)
      state.sexVal = ''
      state.tagsSexlist = Array.from(new Set(state.tagsSexlist))
    }
    const handleAddArea = () => {
      //
      if (!state.step3AddAreaItem) return
      // console.log('state.step3AddAreaItem', state.step3AddAreaItem)
      const step3AddAreaItemArr = []
      const step3ExAreaItemArr = []

      if (state.step3AddAreaItem) {
        step3AddAreaItemArr.push(state.step3AddAreaItem)
      }
      if (state.step3ExAreaItem) {
        step3ExAreaItemArr.push(state.step3ExAreaItem)
      }

      const params = {
        includeRegion: step3AddAreaItemArr,
        excludeRegion: step3ExAreaItemArr
      }

      state.step3AddAreaList.push(params)
      state.step3AddArea = ''
      state.step3ExArea = ''
    }
    const InterestFormat = (arr: any[], field: string) => {
      if (!arr) return
      if (arr.length == 0) return
      let str = ''
      arr.forEach((item, index) => {
        str += item[field] + (index ? ',' : '')
      })
      return str
    }
    const handleAddInterest = () => {
      //
      // console.log('state.step3AddInterestItem', state.step3AddInterestItem)
      if (!state.step3AddInterestItem) return
      const step3AddInterestItemArr = []
      const step3ExInterestItemArr = []
      if (state.step3AddInterestItem) {
        step3AddInterestItemArr.push(state.step3AddInterestItem)
      }
      if (state.step3ExInterestItem) {
        step3ExInterestItemArr.push(state.step3ExInterestItem)
      }
      const params = {
        includeInterest: step3AddInterestItemArr,
        excludeInterest: step3ExInterestItemArr
      }
      console.log('params', params)
      state.step3AddInterestList.push(params)
      state.step3AddInterest = ''
      state.step3ExInterest = ''
    }

    // 版位切换
    const toggleClick = (val: number) => {
      state.step3Slot = val
    }

    // 新增广告
    const step4AddAd = () => {
      state.step4AdList.push({
        variableName: '',
        adsStatus: '1',
        advertType: '',
        body: '',
        title: '',
        des: '',
        url: '',
        websiteLink: '',
        moveCall: '',
        advertisementFacebookImg: [
          // {
          //   name: 'food.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // },
          {
            imgId: '',
            imgUrl: '',
            imgName: '',
            sort: '',
            imgType: '',
            vedioImage: ''
          }
        ]
      })
    }

    // 选择文件上传
    const selectHandle = (idx: number) => {
      state.parentDialogMediaLib = true
      state.pictureCheckIdex = idx
      state.uploadAdvertType = state.step4AdList[state.pictureCheckIdex].advertType
    }
    const delUploadImg = (index: number) => {
      state.step4AdList[state.pictureCheckIdex].advertisementFacebookImg.splice(
        index,
        1
      )
    }

    // 上传文件的modal关闭
    const UploadFileModalClose = (value: boolean) => {
      state.parentDialogMediaLib = value
    }
    const UploadFileModalSure = (value: any) => {
      const arr = value.map((item: any) => {
        const temp = {
          imgId: item.id,
          imgUrl: item.awsUrl,
          imgName: item.name,
          sort: '',
          imgType: item.mediaType,
          vedioImage: item.imageUrl
        }
        return temp
      })
      state.step4AdList[state.pictureCheckIdex].advertisementFacebookImg.push(...arr)
    }

    // 下一步，发布 按钮 禁用状态
    const isBtnDisable = (value: number) => {
      if (value == 1 || value == 2) {
        return true
      }
      return false
    }
    const ifDisabledFn = (detailObj: any) => {
      if (!state.detailObj) {
        return false
      }
      switch (state.activestep) {
        case 0:
          state.disabledVal = isBtnDisable(detailObj.advertisementFacebookInfo.launchStatus)
          break
        case 1:
          state.disabledVal = isBtnDisable(detailObj.advertisementFacebookCampaign.launchStatus)
          break
        case 2:
          state.disabledVal = isBtnDisable(detailObj.advertisementFacebookAdset.launchStatus)
          break
        case 3:
          state.disabledVal = isBtnDisable(detailObj.advertisementFacebookAds.launchStatus)
          break
      }
    }

    // 查看广告详情
    const getItemDetail = async () => {
      console.log('router.params', route.params)
      if (isEmptyObject(route.params)) return
      console.log('router123456')
      const params = {
        taskId: JSON.parse(route.params.item as any).taskId
      }
      const res = (await fbtaskDetail(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.detailObj = res.data
        state.taskId = res.data.taskId
        // 第一步
        if (res.data.advertisementFacebookInfo) {
          let tempObj = res.data.advertisementFacebookInfo
          let tempAccount: any = {
            accountId: tempObj.accountId,
            accountName: tempObj.accountName
          }
          state.taskval = tempObj.taskName
          state.selectvalad = tempObj.accountName
          state.selectvaladItem = tempAccount
          state.fbhome = tempObj.page.pageName
          state.fbhomeItem = tempObj.page
          state.insId = tempObj.instagram ? tempObj.instagram.instagramName : ''
          state.insIdItem = tempObj.instagram ? tempObj.instagram : ''
          state.pixelId = tempObj.pixel.pixelName
          state.pixelIdItem = tempObj.pixel

          tempObj = null
          tempAccount = null
        }
        // 第2步
        if (res.data.advertisementFacebookCampaign) {
          let tempObj = res.data.advertisementFacebookCampaign
          // console.log('步骤二 ', tempObj)
          state.adSeriesInput = tempObj.campaignName
          state.adSeries = tempObj.quoteType + ''
          state.hasSeries = tempObj.quoteCampaignId
          state.adPurpose = tempObj.objective
          state.adState = tempObj.campaignStatus + ''
          state.adStateOptimize = tempObj.budgetOptimizationType + ''
          state.bidding = tempObj.bidStrategy
          state.biddingInp = tempObj.bidStrategyValue
          state.adBudget = tempObj.dailyBudgetStrategy
          state.adBudgetInp = tempObj.dailyBudgetValue
          // 下拉联动选择
          adPurposeFn()
          // console.log(typeof state.adPurpose, state.adPurpose)
          step3tothingsFn()
          step3AdTargetFn()
          HandleOptimizeListFn()
          // 查看已有的系列
          getAdCampaign()
          getHasGroup()

          tempObj = null
        }

        // 第3步
        if (res.data.advertisementFacebookAdset) {
          let tempObj = res.data.advertisementFacebookAdset
          //
          state.adSeries2 = tempObj.quoteType + ''
          state.adSeriesInput2 = tempObj.variableName
          state.hasSeries2 = tempObj.quoteAdsetId
          state.step3state = tempObj.adsetStatus + ''
          state.step3starttime = tempObj.startTime
          state.step3endtime = tempObj.endTime
          state.step3AdBudget = tempObj.dailyBudgetStrategy
          state.step3AdBudgetInp = tempObj.dailyBudgetValue
          // state.step3IncludePenson = tempObj.containAudience
          state.step3IncludePensonList = tempObj.advertisementAudienceGroup
          state.tagsAgelist = tempObj.ageList
          state.tagsSexlist = tempObj.genderList
          state.step3AddInterestList = tempObj.interestList
          state.step3AddAreaList = tempObj.regionList
          state.step3Slot = tempObj.position
          state.step3optimize = tempObj.launchTarget
          state.step3cost = tempObj.targeQuota
          state.step3AdTarget = tempObj.targetLocationType
          state.step3tothings = tempObj.conversionsEventTarget
          state.step3totime = tempObj.conversionsEvent

          tempObj = null
        }

        // 第4步
        if (res.data.advertisementFacebookAds) {
          let tempObj = res.data.advertisementFacebookAds
          //
          state.step4AdList = tempObj

          tempObj = null
        }
      }
    }

    watch(
      () => [state.controlSwitch],
      ([newval, oldval]) => {
        if (newval) {
          getIncludeAudience()
        }
      }
    )
    watchEffect(() => {
      console.log('hasSeries', state.hasSeries)
      if (isEmptyObject(route.params)) return
      ifDisabledFn(state.detailObj)
    })

    onMounted(() => {
      getAcount()
      getItemDetail()
    })

    return {
      ...toRefs(state),
      clilckstep,
      nextFn,
      previousFn,
      publicFn,
      publicSave,
      dialogHandle,
      openDialog,
      handleCustomAudience,
      deletetags,
      handleAddAge,
      handleAddSex,
      handleAddArea,
      handleAddInterest,
      toggleClick,
      step4AddAd,
      selectHandle,
      UploadFileModalClose,
      UploadFileModalSure,
      // querySearchAsyncPlace,
      // handleSelectPlace,
      handleAcountSelect,
      adSeries2Fn,
      adSeries2Group,
      controlSwitchFn,
      newSwitchFn,
      querySearchAsyncAddArea,
      handleSelectAddArea,
      querySearchAsyncExArea,
      handleSelectExArea,
      querySearchAsyncDislike,
      handleSelectDislike,
      querySearchAsyncLike,
      handleSelectLike,
      InterestFormat,
      adPurposeFn,
      step3tothingsFn,
      step3AdTargetFn,
      delUploadImg,
      handleFbhome,
      handleInsId,
      handlePixelId,
      handleLimit,
      handleBidding,
      hasSeriesListFn,
      hasSeriesList2Fn,
      step3IncludePensonFn
    }
  },
  components: {
    Progressbar,
    UploadFileModal,
    PublicBtn
  }
})
</script>
<style lang="scss">
.fbpublic {
  height: 100%;
  overflow-y: auto;
  @include clearScrollbar();
  .w555 {
    width: 555px;
  }
  .w188 {
    width: 188px;
  }
  .w402 {
    width: 402px;
  }
  .yy-ad-title {
    margin-bottom: 20px;
    padding-bottom: 5px;
    font-size: 16px;
    border-bottom: 1px solid #2d2d2d;
  }
  .mb18 {
    margin-bottom: 18px;
  }
  .mg20 {
    margin-top: 20px;
  }
  .mr20 {
    margin-right: 20px;
  }
  .md20 {
    margin-bottom: 20px;
  }
  .part1 {
    margin-bottom: 18px;
    padding: 18px;
    // height: 210px;
    background: #ffffff;
    border-radius: 20px;
    box-sizing: border-box;
    .part-title {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 500;
      color: #333333;
    }
    .content {
      .item {
        // &:first-child{
        //   margin-bottom: 0px;
        // }
        margin-bottom: 30px;
      }
      .name {
        margin-bottom: 10px;
        .point {
          color: #ff1c1c;
        }
      }
      .bttom {
        .hasitem {
          &:first-child {
            margin-top: 0;
          }
          margin-top: 20px;
          position: relative;
          .msg {
            position: absolute;
            top: 43px;
            left: 468px;
          }
          .roas {
            left: 488px;
          }
        }
        .media-list {
          display: flex;
          flex-wrap: wrap;
          .media {
            margin-right: 20px;
            position: relative;
            width: 100px;
            height: 100px;
            border-radius: 4px;
            overflow: hidden;
          }
          .del {
            position: absolute;
            top: 0;
            right: 8px;
            cursor: pointer;
          }
          .is-video {
            position: absolute;
            bottom: 0;
            right: 5px;
            font-size: 18px;
          }
          .avtar {
            height: 100%;
            width: 100%;
          }
          .avtar-name {
          }
          .media-add {
            position: relative;
            width: 100px;
            height: 100px;
            border-radius: 4px;
            background: #f4f6f7;
            border: 1px dashed #cccccc;
            cursor: pointer;
            .add-icon {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate3d(-50%, -50%, 0);
              font-size: 30px;
              color: #c4c4c4;
            }
          }
        }
      }
      .control {
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        .title {
          margin-right: 20px;
          font-size: 20px;
          color: #2d2d2d;
        }
      }
      .tags {
        .tags-in {
          display: flex;
        }
        .tags-title {
          margin-right: 20px;
          flex-shrink: 0;
        }
        .tags-list {
        }
        .el-tag {
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
      .between {
        display: flex;
        align-items: center;
        .cutup {
          margin-left: 10px;
          margin-right: 10px;
        }
      }
      .variables {
        .variable {
          margin-top: 10px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
        }
        .variable-name {
          margin-right: 20px;
        }
        .variable-val {
        }
      }
      .selct-btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .selct-btn {
          &.act {
            // border: 1px solid #393C45;
            background-color: $themeColor;
            color: #fff;
          }
          width: 270px;
          height: 40px;
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          border-radius: 4px;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
        }
      }
    }
  }
  .part2 {
    .config {
      margin-top: 10px;
      margin-bottom: 20px;
      width: 186px;
      height: 60px;
      line-height: 60px;
      background: $themeColor;
      border-radius: 4px;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
    }
    .configline {
      margin-left: 10px;
      padding-left: 10px;
      padding-right: 10px;
      line-height: 40px;
      background: $themeColor;
      border-radius: 4px;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
    }
  }
  .part3 {
  }
  .part4 {
    .step4 {
      .step4-ad {
        margin-bottom: 20px;
        font-size: 20px;
        color: #2d2d2d;
      }
    }
  }
  .public {
    margin-top: 20px;
    // padding-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .common {
      width: 156px;
      height: 50px;
      font-size: 16px;
      // border-radius: 3px;
      // border: 1px solid $themeColor;
      // box-sizing: border-box;
      // text-align: center;
      // line-height: 50px;
      // cursor: pointer;
    }
    .commonborder {
      border: 1px solid $themeColor;
      color: $themeColor;
    }
    .pub-btn {
      color: #fff;
      background: $themeColor;
    }
    .save {
      margin-left: 20px;
      background: #ffffff;
      color: $themeColor;
    }
  }
  .dialog-option {
    color: red;
  }
}
</style>
