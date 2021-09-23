<template>
  <div class="az-sdad">
    <progressbar
      class="mb18"
      :steps="steps"
      :activestep="activestep"
      @clilckstep="clilckstep"
    ></progressbar>
    <div class="part1 h570" v-show="activestep == 0">
      <div class="yy-ad-title w555">SD商品推广</div>
      <div class="part-title">基础配置</div>
      <div class="content">
        <div class="item">
          <div class="name"><span class="point">*</span> 任务名称</div>
          <div class="bttom">
            <el-input
              class="w555"
              maxlength="50"
              v-model="taskval"
              placeholder="请输入任务名称"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 店铺名称</div>
          <div class="bttom">
            <el-select
              v-model="selstore"
              clearable
              class="w555"
              placeholder="请选择店铺名称"
              @change="selstoreChange"
            >
              <el-option
                v-for="item in storeOptions"
                :key="item.shopAccount"
                :label="item.shopName"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div class="part1 part2" v-show="activestep == 1">
      <div class="yy-ad-title w555">SD商品推广</div>
      <div class="part-title">广告系列配置</div>
      <div class="content">
        <div class="item">
          <div class="name"><span class="point">*</span> 广告系列名称</div>
          <div class="bttom">
            <el-input
              class="w555"
              v-model="adSeriesName"
              maxlength="100"
              placeholder="限100字符"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <!-- <div class="name">
            <span class="point">*</span> 开始时间和结束时间
          </div> -->
          <div class="bttom">
            <div class="mg20">
              <div class="hasitem">
                <div class="name"><span class="point">*</span> 开启时间</div>
                <el-date-picker
                  class="w555"
                  v-model="step2starttime"
                  :disabled-date="disabledDate1"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </div>
              <div class="hasitem">
                <div class="name">结束时间</div>
                <el-date-picker
                  class="w555"
                  v-model="step2endtime"
                  :disabled-date="disabledDate"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 每日预算（$）</div>
          <div class="bttom">
            <!-- <el-input
              class="w555"
              v-model="adBudgetInp"
              placeholder="输入预算"
            ></el-input> -->
            <el-input-number :precision="2" v-model="adBudgetInp" :controls="false" :min="0" controls-position="right"></el-input-number>
          </div>
        </div>
      </div>
    </div>
    <div class="part1 part2 part3" v-show="activestep == 2">
      <div class="yy-ad-title w555">SD商品推广</div>
      <div class="part-title">广告组配置</div>
      <div class="content">
        <div class="item">
          <div class="name"><span class="point">*</span> 广告组名称</div>
          <div class="bttom">
            <el-input
              class="w555"
              v-model="adGroupName"
              placeholder="限100字符"
              maxlength="100"
            ></el-input>
          </div>
        </div>
        <div class="item w555">
          <div class="name"><span class="point">*</span> 投放类型</div>
          <div class="bttom">
            <div class="selct-btns">
              <div
                class="selct-btn"
                :class="{ act: step2Position === 1 }"
                @click="toggleClick(1)"
              >
                商品投放
              </div>
              <div
                class="selct-btn"
                :class="{ act: step2Position === 2 }"
                @click="toggleClick(2)"
              >
                受众投放
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 广告组默认竞价</div>
          <div class="bttom">
            <!-- <el-input
              type="number"
              class="w555"
              v-model="adDefaultBid"
              placeholder="请输入默认竞价"
            ></el-input> -->
            <el-input-number
              :precision="2"
              v-model="adDefaultBid" :controls="false"
              @blur="changeKeysAndGoodsPrice"
              :min="0" placeholder="最小值0.02" controls-position="right">
            </el-input-number>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 选择新商品</div>
          <div class="bttom">
            <div class="between">
              <el-select
                v-model="commodity"
                clearable
                class="w150"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in commodityList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                class="w266 ml10"
                v-model="commodityInp"
                placeholder="按照店铺商品、ASIN或SKU进行搜索"
              ></el-input>
              <div class="configline search-btn" @click="handleSearch">
                搜索
              </div>
            </div>
            <div class="bttom-list mg20">
              <div class="left w555">
                <div class="left-name">搜索结果</div>
                <div class="left-wrap">
                  <div
                    class="left-item"
                    v-for="(item, idx) in commoditySearchList"
                    :key="'commoditySearch' + idx"
                  >
                    <div class="img-wrap">
                      <img class="img" :src="item.imageUrl" alt="" />
                      <div class="detail">{{ item.asin }}：{{ item.sku }}</div>
                    </div>
                    <el-button
                      class="btn"
                      type="primary"
                      round
                      @click="add(item)"
                      >添加</el-button
                    >
                  </div>
                </div>
                <div class="page-btn">
                  <div class="dy-page">
                    <div class="dy-pre" @click="dyPrePage(1)">上一页</div>
                    <div class="dy-current">{{ dyCurrent }}</div>
                    <div class="dy-next" @click="dyNextPage(2)">下一页</div>
                  </div>
                </div>
              </div>
              <div class="left w555 ml10">
                <div class="left-name">已选商品</div>
                <div class="left-wrap">
                  <div
                    class="left-item"
                    v-for="(item, idx) in commoditySelectList"
                    :key="'commoditySelect' + idx"
                  >
                    <div class="img-wrap">
                      <img class="img" :src="item.imageUrl" alt="" />
                      <div class="detail">{{ item.asin }}：{{ item.sku }}</div>
                    </div>
                    <el-button
                      class="btn"
                      type="primary"
                      round
                      @click="remove(idx)"
                      >移除</el-button
                    >
                  </div>
                </div>
                <!-- <div class="page-btn">
                  <el-pagination
                    small
                    @current-change="handleCurrentChange(2)"
                    :current-page="currentPageAdd2"
                    layout="total,prev, pager, next"
                    :total="total2"
                  >
                  </el-pagination>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="item" v-show="step2Position == 1">
          <div class="name">
            <span class="point">*</span>
            <span class="mr20">投放在商品下</span>
          </div>
          <div class="bttom w555">
            <div class="shop-delivery-wrap">
              <div class="tabs md20">
                <!-- <div
                  class="tab"
                  :class="{ act: tabActiveName == 1 }"
                  @click="tabClick(1)"
                >
                  分类
                </div> -->
                <div
                  class="tab"
                  :class="{ act: tabActiveName == 2 }"
                  @click="tabClick(2)"
                >
                  商品
                </div>
              </div>
              <div class="tab-list-wrap" v-show="tabActiveName == 1">
                <div class="tab-left">
                  <div class="tab-list">
                    <div
                      class="tab-left-item"
                      v-for="(item, idx) in commoditySelectList"
                      :key="'commodityf' + idx"
                    >
                      <div class="item-name">{{ item.category }}</div>
                      <div class="item-add" @click="shopDeliveryAdd(item)">添加</div>
                    </div>
                  </div>
                  <div class="tab-list-page">
                    <div class="add-all" @click="shopDeliveryAddAll">
                      添加全部
                    </div>
                    <!-- <el-pagination
                      small
                      @current-change="shopDeliveryPageChange"
                      :current-page="shopDeliveryPage"
                      :page-size="5"
                      layout="total,prev, pager, next"
                      :total="shopDeliveryPageTotal"
                    >
                    </el-pagination> -->
                  </div>
                </div>
              </div>
              <div class="tab-textarea" v-show="tabActiveName == 2">
                <el-input
                  type="textarea"
                  :rows="5"
                  v-model="shopDeliveryInp"
                  placeholder="输入ASIN列表，每行一个"
                ></el-input>
                <div
                  class="configline search-btn ml0 mg20"
                  @click="addShopDelivery"
                >
                  添加
                </div>
              </div>
            </div>
            <div class="select-wrap mg20">
              <!-- <div class="select-name">已选分类/商品</div> -->
              <div class="select-name">{{step2Position == 1? '已选商品':'已选受众'}}</div>
              <div class="select-list">
                <div class="select-top select-item">
                  <!-- <div class="sel-item">分类/商品</div> -->
                  <div class="sel-item">{{step2Position == 1? '商品':'受众'}}</div>
                  <div class="sel-item">类型</div>
                  <div class="sel-item">使用广告组默认出价（双击修改）</div>
                  <div class="sel-item">操作</div>
                </div>
                <div
                  class="select-item"
                  v-for="(item, idx) in shopDeliveryList"
                  :key="'shopDeliveryList' + idx"
                >
                  <div class="sel-item">{{ item.classifyName }}</div>
                  <div class="sel-item">
                    {{
                      item.classifyType == 'asinCategorySameAs'
                        ? '分类'
                        : '商品'
                    }}
                  </div>
                  <div
                    class="sel-item themeColor"
                    @dblclick="shopHandKeyDblclick(idx)"
                  >
                    <span v-if="!item.change">${{ item.bid }}</span>
                    <el-input
                      v-focus
                      v-if="item.change"
                      autofocus
                      v-model="item.bid"
                      @blur="shopHandKeyDblclickBlur(idx)"
                    ></el-input>
                  </div>
                  <div
                    class="sel-item themeColor"
                    @click="shopDeliveryListRemove(idx)"
                  >
                    删除
                  </div>
                </div>
              </div>
              <div class="select-list-page">
                <div class="del-all" @click="delShopAllDelivery">删除全部</div>
                <!-- <el-pagination
                  small
                  @current-change="selectDeliveryPageChange"
                  :current-page="selectDeliveryPage"
                  :page-size="5"
                  layout="total,prev, pager, next"
                  :total="selectDeliveryTotal"
                >
                </el-pagination> -->
              </div>
            </div>
          </div>
        </div>
        <div class="item" v-show="step2Position == 2">
          <div class="name"><span class="point">*</span> 受众选择</div>
          <div class="bttom w1000">
            <div class="top-select">
              <div class="name">再营销受众</div>
              <div class="selct-btns selct-audience">
                <div
                  class="selct-btn"
                  :class="{ act: audiencePosition === 'views' }"
                  @click="toggleAudienceClick('views')"
                >
                  买家购买过与您商品相关的商品
                </div>
                <div
                  class="selct-btn"
                  :class="{ act: audiencePosition === 'audience' }"
                  @click="toggleAudienceClick('audience')"
                >
                  买家浏览过与您商品相关的详情页
                </div>
                <div
                  class="selct-btn"
                  :class="{ act: audiencePosition === 'purchases' }"
                  @click="toggleAudienceClick('purchases')"
                >
                  买家搜索过与您商品相关的关键词
                </div>
              </div>
              <div class="name mg20">亚马逊买家行为和兴趣</div>
              <div class="between">
                <el-select
                  v-model="selAudience"
                  clearable
                  class="w396"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in selAudienceList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  class="w266 ml10"
                  v-model="audienceInp"
                  placeholder="搜索亚马逊买家"
                ></el-input>
                <div
                  class="configline search-btn"
                  @click="handleAudienceSearch"
                >
                  查询
                </div>
                <!-- <div class="configline search-btn" @click="handleAudienceAdd">
                  添加
                </div> -->
              </div>
            </div>
            <div class="select-wrap mg20">
              <div class="left-name">搜索结果</div>
              <div class="left-wrap height300">
                <div
                  class="left-item"
                  v-for="(item, idx) in searchAudienceList"
                  :key="'searchAudienceList' + idx"
                >
                  <div class="name">{{ item.audienceName }}</div>
                  <el-button
                    class="btn"
                    type="primary"
                    round
                    @click="handleAudienceAdd(item)"
                    >添加</el-button
                  >
                </div>
              </div>
              <!-- <div class="page-btn">
                <div class="dy-page">
                  <div class="dy-pre" @click="audiencedyPrePage(1)">上一页</div>
                  <div class="dy-current">{{ audiencedyCurrent }}</div>
                  <div class="dy-next" @click="audiencedyNextPage(2)">
                    下一页
                  </div>
                </div>
              </div> -->
            </div>
            <div class="select-wrap mg20">
              <div class="select-name">{{step2Position == 1? '已选商品':'已选受众'}}</div>
              <div class="select-list">
                <div class="select-top select-item">
                  <div class="sel-item-aud">{{step2Position == 1? '商品':'受众'}}</div>
                  <div class="sel-item-aud">潜在消费者数</div>
                  <div class="sel-item-aud">使用广告组默认出价（双击修改）</div>
                  <div class="sel-item-aud">操作</div>
                </div>
                <div
                  class="select-item"
                  v-for="(item, idx) in selectAudienceList"
                  :key="'selectAudienceList' + idx"
                >
                  <div class="sel-item-aud">{{ item.audience }}</div>
                  <div class="sel-item-aud">{{ item.consumerCount }}</div>
                  <div
                    class="sel-item-aud themeColor"
                    @dblclick="audienceDblclick(idx)"
                  >
                    <span v-if="!item.change">${{ item.bid }}</span>
                    <el-input
                      v-focus
                      v-if="item.change"
                      autofocus
                      v-model="item.bid"
                      @blur="audienceDblclickBlur(idx)"
                    ></el-input>
                  </div>
                  <div
                    class="sel-item-aud themeColor"
                    @click="handleAudienceRemove(idx)"
                  >
                    删除
                  </div>
                </div>
              </div>
              <div class="select-list-page">
                <div class="del-all" @click="delAudienceAll">删除全部</div>
                <!-- <el-pagination
                  small
                  @current-change="audiencePageChange"
                  :current-page="audiencePage"
                  :page-size="5"
                  layout="total,prev, pager, next"
                  :total="audienceTotal"
                >
                </el-pagination> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="public">
         <el-button @click="nextFn" v-if="activestep != 2" type="primary" class="common">
        下一步</el-button
      >
      <el-button @click="publicFn" v-if="activestep == 2" type="primary" class="common">
        发布任务</el-button
      >
      <el-button class=" common commonborder" @click="publicSave" plain
        >保存草稿</el-button
      >
      <div class="pub-btn common" @click="nextFn" v-if="activestep != 2">
        下一步
      </div>
      <div class="pub-btn common" @click="publicFn" v-if="activestep == 2">
        发布任务
      </div>
      <div class="save common" @click="publicSave">保存草稿</div>
    </div> -->
    <public-btn
      :steps="2"
      :activestep="activestep"
      :disabledVal="disabledVal"
      @nextFn ="nextFn"
      @publicFn ="publicFn"
      @publicSave ="publicSave"
    ></public-btn>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import Progressbar from '../common/Progressbar.vue'
import PublicBtn from '../common/PublicBtn.vue'
import { defineComponent, getCurrentInstance, onMounted, reactive, toRefs, watchEffect } from 'vue'
import {
  collectAzSdCommodity,
  collectAzAudienceList,
  collectAzStoreSelecList
} from '../common/action/index'
import { azInfo, azSdCampaign, azSdAdset, azSdDetail } from '@/api/admanage'
import { HttpResponse } from '@/interface/interface'
import { isEmptyObject, uniqueArray, validateKeyValFn } from '@/utils/utils'
import dayjs from 'dayjs'

export default defineComponent({
  name: '',
  props: {},
  setup () {
    const route = useRoute()
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties

    const state = reactive({
      disabledVal: false,
      detailObj: '' as any,
      isEdit: false,
      steps: ['01/基础配置', '02/广告系列配置', '03/广告组配置'],
      activestep: 0,
      taskval: '',
      selstore: '',
      selstoreItem: {
        shopAccount: '3349421960',
        shopName: ''
      } as any,
      storeOptions: [
        {
          shopAccount: '3349421960',
          shopName: ''
        }
      ],
      adSeriesName: '',
      step2starttime: '',
      step2endtime: '',
      disabledDate (time:any) {
        return time.getTime() < (+dayjs(state.step2starttime))
      },
      disabledDate1 (time:any) {
        return time.getTime() < new Date((Date.now() - 3600 * 1000 * 24))
      },
      adBudgetInp: 0,
      adGroupName: '',
      step2Position: 2, // 默认受众投放
      adDefaultBid: 0,
      commodity: 'asins',
      commodityList: [
        {
          value: 'asins',
          label: 'ASIN'
        },
        {
          value: 'sku',
          label: '店铺SKU'
        },
        {
          value: 'searchStr',
          label: '产品名称'
        }
      ],
      commodityInp: '',
      commoditySearchList: [] as any,
      commoditySelectList: [] as any,
      currentPageAdd2: 2,
      total2: 10,
      tabActiveName: 2,
      shopDeliveryPage: 1,
      shopDeliveryPageTotal: 10,
      shopDeliveryInp: '',
      shopDeliveryNum: false,
      shopDeliveryNumInp: 18,
      shopDeliveryList: [] as any,
      selectDeliveryPage: 2,
      selectDeliveryTotal: 10,
      audiencePosition: 'views',
      selAudience: 'audienceSameAs',
      selAudienceList: [
        {
          value: 'audienceSameAs',
          label: '所有受众'
        },
        {
          value: 'Lifestyle',
          label: '生活方式'
        },
        {
          value: 'Life event',
          label: '兴趣'
        },
        {
          value: 'In-market',
          label: '生活事件'
        },
        {
          value: 'Interest',
          label: '场内客群'
        }
      ],
      searchAudienceList: [] as any,
      audiencedyCurrent: 1,
      selectAudienceList: [] as any,
      audienceInp: '',
      audienceNum: false,
      audienceNumInp: '',
      audiencePage: 1,
      audienceTotal: 10,
      dyCurrent: 1,
      adType: 6,
      taskId: '',
      channelId: 3
    })
    const getStoreAccountList = () => {
      collectAzStoreSelecList(state)
    }

    const selstoreChange = (item: any) => {
      state.selstoreItem = item
    }
    // 步骤切换
    const clilckstep = (val: number) => {
      state.activestep = val
    }

    const step0 = async () => {
      const flag = validateKeyValFn(['taskval', 'selstore'], state)
      if (flag) {
        currentInstance.$message({
          message: '请把必填字段填写完整',
          type: 'error'
        })
        return
      }

      const params = {
        taskId: state.taskId,
        taskName: state.taskval,
        adType: state.adType,
        shopAccount: state.selstoreItem.shopAccount,
        shopName: state.selstoreItem.shopName
      }
      const res = (await azInfo(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.taskId = res.data.taskId
        state.activestep++
      }
    }
    const step1 = async () => {
      const flag = validateKeyValFn(['adSeriesName', 'step2starttime', 'adBudgetInp'], state)
      if (flag) {
        currentInstance.$message({
          message: '请把必填字段填写完整',
          type: 'error'
        })
        return
      }
      const params = {
        taskId: state.taskId,
        campaignName: state.adSeriesName,
        startTime: state.step2starttime,
        endTime: state.step2endtime,
        dailyBudgetValue: state.adBudgetInp
      }
      const res = (await azSdCampaign(params)) as HttpResponse
      if (res.code == 0) {
        state.activestep++
      }
    }

    const step2 = async (num?: number) => {
      let flag = validateKeyValFn(['adGroupName', 'step2Position', 'commoditySelectList'], state)
      if (state.step2Position == 1) {
        // 商品投放
        flag = validateKeyValFn(['shopDeliveryList'], state)
      } else if (state.step2Position == 2) {
        // 受众投放
        flag = validateKeyValFn(['selectAudienceList'], state)
      }
      if (flag) {
        currentInstance.$message({
          message: '请把必填字段填写完整',
          type: 'error'
        })
        return
      }
      const adDienceArr = state.selectAudienceList.map((item: any) => {
        return Object.assign(item, {
          audienceMode: state.selAudience,
          audienceType: state.audiencePosition
        })
      })
      const params = {
        taskStatus: num || 1,
        taskId: state.taskId,
        adsetName: state.adGroupName,
        launchType: state.step2Position,
        bid: state.adDefaultBid,
        advertisementRelationCommodity: state.commoditySelectList,
        advertisementRelationClassify: state.shopDeliveryList,
        advertisementaudience: adDienceArr
      }
      const res = (await azSdAdset(params)) as HttpResponse
      if (res.code == 0) {
        router.push('/home/amzntaskad')
      }
    }
    const changeKeysAndGoodsPrice = () => {
      if (state.shopDeliveryList.length && state.step2Position == 1) {
        state.shopDeliveryList.forEach((item: any, index: number) => {
          state.shopDeliveryList[index].bid = state.adDefaultBid
        })
      }
      if (state.selectAudienceList.length && state.step2Position == 2) {
        state.selectAudienceList.forEach((item: any, index: number) => {
          state.selectAudienceList[index].bid = state.adDefaultBid
        })
      }
    }
    // 发布保存
    const nextFn = () => {
      // 下一步
      switch (state.activestep) {
        case 0:
          step0()
          break
        case 1:
          step1()
          break
        case 2:
          step2(2)
          break
      }
    }
    const publicFn = () => {
      //
      step2()
    }
    const publicSave = () => {
      //
      // step2(2)
      nextFn()
    }

    // 投放类型切换
    const toggleClick = (val: number) => {
      state.step2Position = val
    }

    // 搜索 根据Asin sku 产品名称查询商品
    const handleSearch = async (num?: number) => {
      collectAzSdCommodity(state, num)
    }
    const dyPrePage = async () => {
      handleSearch(1)
    }
    const dyNextPage = async () => {
      handleSearch(2)
    }

    const add = (item: any) => {
      //
      state.commoditySelectList.push(item)
    }
    const remove = (index: number) => {
      //
      state.commoditySelectList.splice(index, 1)
    }
    const shopDeliveryAdd = (item: any) => {
      const isHaved = state.shopDeliveryList.some((i: any) => i.sku == item.sku)
      if (isHaved) return
      const params = {
        sku: item.sku,
        classifyName: item.category,
        classifyType: 'asinCategorySameAs',
        bid: (state.adDefaultBid ? state.adDefaultBid : 0.02),
        change: false
      }
      // 这里能直接通过sku去重，因为手动ASIN的商品没sku 则需要判断是否存在而是否添加
      state.shopDeliveryList.push(params)
      // state.shopDeliveryList = uniqueArray(
      //   state.shopDeliveryList,
      //   'sku'
      // )
    }
    const shopDeliveryAddAll = () => {
      // const tempArr = state.commoditySelectList.map((item: any) => {
      //   return {
      //     sku: item.sku,
      //     classifyName: item.category,
      //     classifyType: 'asinCategorySameAs',
      //     bid: (state.adDefaultBid ? state.adDefaultBid : 0.01),
      //     change: false
      //   }
      // })
      // state.shopDeliveryList.push(...tempArr)
      // state.shopDeliveryList = uniqueArray(
      //   state.shopDeliveryList,
      //   'sku'
      // )
      state.commoditySelectList.forEach((item: any) => {
        const isHaved = state.shopDeliveryList.some((i: any) => i.sku == item.sku)
        if (!isHaved) {
          state.shopDeliveryList.push({
            sku: item.sku,
            classifyName: item.category,
            classifyType: 'asinCategorySameAs',
            bid: state.adDefaultBid,
            change: false
          })
        }
      })
    }
    const shopDeliveryListRemove = (index: number) => {
      state.shopDeliveryList.splice(index, 1)
    }

    const handleCurrentChange = (val: number) => {
      //
      // switch(val){
      //   case 1:
      //   break;
      // }
    }

    // 广告组 -受众
    const toggleAudienceClick = (val: string) => {
      state.audiencePosition = val
    }
    const handleAudienceSearch = () => {
      //
      collectAzAudienceList(state)
    }
    const audiencedyPrePage = () => {
      //
      collectAzAudienceList(state, 1)
    }
    const audiencedyNextPage = () => {
      //
      collectAzAudienceList(state, 2)
    }

    const handleAudienceAdd = (item: any) => {
      //
      const params = {
        // audienceMode: item.selAudience,
        // audienceType: item.audiencePosition, //bug
        audienceId: item.audienceId,
        audience: item.audienceName,
        consumerCount:
          item.dailyReach.lowerBoundInclusive +
          '-' +
          item.dailyReach.upperBoundExclusive,
        bid: state.adDefaultBid,
        change: false
      }
      state.selectAudienceList.push(params)
      state.selectAudienceList = uniqueArray(
        state.selectAudienceList,
        'audienceId'
      )
    }
    const handleAudienceRemove = (num: number) => {
      state.selectAudienceList.splice(num, 1)
    }
    const delAudienceAll = () => {
      state.selectAudienceList = []
    }

    // 商品投放相关
    const tabClick = (val: number) => {
      //
      state.tabActiveName = val
    }
    const shopDeliveryPageChange = (val: number) => {
      //
    }
    const addShopDelivery = () => {
      // 先校验空值
      if (state.shopDeliveryInp.trim() == '') {
        currentInstance.$message({
          type: 'warning',
          message: '请输入ASIN'
        })
        return false
      }
      const strArr = state.shopDeliveryInp.split(/\n/)
      // 去重
      const newStrArr = Array.from(new Set(strArr))
      if (newStrArr.length === 0) return
      newStrArr.map((item) => {
        const params = {
          classifyName: item,
          classifyType: 'asinSameAs',
          bid: state.adDefaultBid,
          change: false
        }
        state.shopDeliveryList.push(params)
      })

      state.shopDeliveryInp = ''
    }
    // 商品投放input双击
    const shopHandKeyDblclick = (index: number) => {
      //
      state.shopDeliveryList[index].change = true
    }
    const shopHandKeyDblclickBlur = (index: number) => {
      //
      state.shopDeliveryList[index].change = false
    }
    const delShopAllDelivery = () => {
      state.shopDeliveryList = []
      //   currentInstance
      //     .$confirm('是否删除所有?', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     })
      //     .then(() => {

      //       // currentInstance.$message({
      //       //   type: 'success',
      //       //   message: '删除成功!'
      //       // })
      //     })
      //     .catch(() => {
      //       // currentInstance.$message({
      //       //   type: 'info',
      //       //   message: '已取消删除'
      //       // })
      //     })
    }
    const selectDeliveryPageChange = (val: number) => {
      //
    }

    const audienceDblclick = (val:number) => {
      //
      state.selectAudienceList[val].change = true
    }
    const audienceDblclickBlur = (val:number) => {
      //
      state.selectAudienceList[val].change = false
    }
    const audiencePageChange = () => {
      //
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
          state.disabledVal = isBtnDisable(detailObj.advertisementSdInfo ? detailObj.advertisementSdInfo.launchStatus : '')
          break
        case 1:
          state.disabledVal = isBtnDisable(detailObj.advertisementSdCampaign ? detailObj.advertisementSdCampaign.launchStatus : '')
          break
        case 2:
          state.disabledVal = isBtnDisable(detailObj.advertisementSdAdset ? detailObj.advertisementSdAdset.launchStatus : '')
          break
      }
    }
    // 查看或修改搜索广告配置
    const getItemDetail = async () => {
      if (isEmptyObject(route.params)) return
      const params = {
        taskId: JSON.parse(route.params.item as any).taskId
      }
      const res = await azSdDetail(params) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.taskId = res.data.taskId
        state.detailObj = res.data
        // step 0:
        if (res.data.advertisementSdInfo) {
          let tempObj = res.data.advertisementSdInfo
          let obj:any = {
            shopAccount: tempObj.shopAccount,
            shopName: tempObj.shopName
          }

          state.taskval = tempObj.taskName
          state.selstore = tempObj.shopName
          state.selstoreItem = obj

          tempObj = null
          obj = null
        }

        // step 1:
        if (res.data.advertisementSdCampaign) {
          let tempObj = res.data.advertisementSdCampaign

          state.adSeriesName = tempObj.campaignName
          state.step2starttime = tempObj.startTime
          state.step2endtime = tempObj.endTime
          state.adBudgetInp = tempObj.dailyBudgetValue

          tempObj = null
        }
        // step 2:
        if (res.data.advertisementSdAdset) {
          let tempObj = res.data.advertisementSdAdset

          state.adGroupName = tempObj.adsetName
          state.step2Position = tempObj.launchType
          state.adDefaultBid = tempObj.bid
          state.commoditySelectList = tempObj.advertisementRelationCommodity || []
          state.shopDeliveryList = tempObj.advertisementRelationClassify || []
          state.audiencePosition = tempObj.audienceType
          state.selectAudienceList = tempObj.advertisementaudience || []
          // 取第一个 获取受众方式 再营销受众
          if (state.selectAudienceList.length) {
            const ResultItem = tempObj.advertisementaudience[0]
            state.selAudience = ResultItem.audienceMode
            state.audiencePosition = ResultItem.audienceType
          }

          tempObj = null
        }
      }
    }

    onMounted(() => {
      getItemDetail()
      getStoreAccountList()
    })

    watchEffect(() => {
      if (isEmptyObject(route.params)) return
      ifDisabledFn(state.detailObj)
    })

    return {
      ...toRefs(state),
      clilckstep,
      nextFn,
      publicFn,
      publicSave,
      toggleClick,
      handleSearch,
      add,
      remove,
      handleCurrentChange,
      tabClick,
      shopDeliveryPageChange,
      addShopDelivery,
      shopHandKeyDblclick,
      shopHandKeyDblclickBlur,
      delShopAllDelivery,
      selectDeliveryPageChange,
      toggleAudienceClick,
      handleAudienceSearch,
      handleAudienceAdd,
      handleAudienceRemove,
      audienceDblclick,
      audienceDblclickBlur,
      delAudienceAll,
      audiencePageChange,
      selstoreChange,
      dyPrePage,
      dyNextPage,
      shopDeliveryAdd,
      shopDeliveryAddAll,
      shopDeliveryListRemove,
      audiencedyPrePage,
      audiencedyNextPage,
      changeKeysAndGoodsPrice
    }
  },
  components: {
    Progressbar,
    PublicBtn
  }
})
</script>
<style lang="scss">
.az-sdad {
  height: 100%;
  overflow-y: auto;
  @include clearScrollbar();
  .w555 {
    width: 555px;
  }
  .w100 {
    width: 100px;
  }
  .w130 {
    width: 130px;
  }
  .w150 {
    width: 150px;
  }
  .w188 {
    width: 188px;
  }
  .w266 {
    width: 266px;
  }
  .w396 {
    width: 396px;
  }
  .w402 {
    width: 402px;
  }
  .w1000 {
    width: 1000px;
  }
  .whundred {
    width: 100%;
  }
  .yy-ad-title {
    margin-bottom: 20px;
    padding-bottom: 5px;
    font-size: 16px;
    border-bottom: 1px solid #2d2d2d;
  }
  .dblclick {
    color: $themeColor;
    cursor: pointer;
  }
  .themeColor {
    color: $themeColor;
    cursor: pointer;
  }
  .mb18 {
    margin-bottom: 18px;
  }
  .mg20 {
    margin-top: 20px;
  }
  .ml10 {
    margin-left: 10px;
  }
  .mr20 {
    margin-right: 20px;
  }
  .md20 {
    margin-bottom: 20px;
  }
  .ml0 {
    margin-left: 0 !important;
  }
  .h570 {
    height: 570px;
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
      .name-top {
        .title {
          font-size: 20px;
          color: #2d2d2d;
        }
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
        .upload-list-wrap {
          // display: flex;
          // flex-wrap: wrap;
          .el-upload-list {
            // display: flex;
            // flex-wrap: wrap;
          }
          .el-upload-list__item-actions {
            height: 148px;
          }
          .el-upload-list__item {
            border: 0;
            width: 148px;
            height: 155px;
            overflow: visible;
          }
          .upload-item-wrap {
            overflow: hidden;
            background-color: #fff;
            border: 1px solid #c0ccda;
            border-radius: 6px;
            box-sizing: border-box;
            width: 148px;
            height: 148px;
            margin: 0 8px 8px 0;
            display: inline-block;
          }
          .el-upload-list__item {
            margin: 0 20px 20px 0;
            // overflow: visible;
          }
          .upload-item-name {
            position: absolute;
            left: 0;
            bottom: -24px;
            width: 100%;
            text-align: center;
            white-space: nowrap; /* 强制不换行 */
            overflow: hidden;
            text-overflow: ellipsis;
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
        .bttom-list {
          display: flex;
          .left {
            padding: 10px;
            border: 1px solid #cccccc;
            box-sizing: border-box;
            .left-name {
              // font-size: 16px;
            }
            .left-wrap {
              height: 225px;
              overflow-y: auto;
              @include clearScrollbar();
              .left-item {
                margin-top: 5px;
                padding-left: 5px;
                padding-right: 5px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 1px solid #cccccc;
                border-radius: 4px;
                box-sizing: border-box;
              }
              .img-wrap {
                display: flex;
                align-items: center;
              }
              .img {
                margin-right: 10px;
                width: 30px;
                height: 30px;
              }
              .detail {
              }
              .btn {
                margin-top: 5px;
                margin-bottom: 5px;
                min-height: 26px;
                height: 26px;
                line-height: 0px;
              }
            }
          }
        }
        .msg-item {
          display: flex;
          align-items: center;
          .msg {
            width: 140px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border: 1px solid #cccccc;
            border-radius: 4px;
            box-sizing: border-box;
          }
        }
        .key-delivery-wrap {
          .key-delivery-list {
            .key-delivery-item {
              &:first-child {
                border-top: 1px solid #c9c9c9;
              }
              padding-top: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #c9c9c9;
              &:first-child {
                margin-top: 0;
              }
              margin-top: 10px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .part {
              }
              .noborder {
                .el-input__inner {
                  border: 0;
                }
              }
              .icon-close {
                cursor: pointer;
              }
            }
          }
          .key-delivery-inp {
            padding: 10px 10px 0;
            border: 1px solid #f0f0f0;
            .el-textarea__inner {
              border: 0;
            }
          }
          .operate {
            display: flex;
            align-items: center;
            .operate1 {
              flex: 1;
              height: 40px;
              .el-input__inner {
                border: 0;
              }
            }
            .line {
              width: 1px;
              height: 25px;
              background-color: #e4e4e4;
            }
            .textcenter {
              &:hover {
                color: $themeColor;
              }
              text-align: center;
              line-height: 40px;
              cursor: pointer;
            }
          }
        }
        .shop-delivery-wrap {
          .tabs {
            display: flex;
          }
          .tab {
            &.act {
              color: $themeColor;
              border-bottom: 3px solid $themeColor;
            }
            flex: 1;
            text-align: center;
            height: 50px;
            line-height: 50px;
            cursor: pointer;
            border-bottom: 1px solid #c4c4c4;
            box-sizing: border-box;
          }
          .tab-list-wrap {
            padding: 10px;
            border: 1px solid #cccccc;
            .tab-list {
              height: 300px;
              .tab-left-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 40px;
                border-bottom: 1px solid #f0f0f0;
              }
              .item-name {
              }
              .item-add {
                &:hover {
                  color: $themeColor;
                }
                width: 100px;
                text-align: center;
                cursor: pointer;
              }
            }
            .tab-list-page {
              display: flex;
              justify-content: space-between;
              .add-all {
                color: $themeColor;
                cursor: pointer;
              }
            }
          }
          .tab-textarea {
            height: 355px;
          }
          .text-border {
            padding: 10px;
            border: 1px solid #cccccc;
          }
        }
        .select-wrap {
          padding: 10px;
          border: 1px solid #cccccc;
          .select-name {
          }
          .select-list {
            height: 300px;
            overflow-y: auto;
            .select-item {
              display: flex;
              border-bottom: 1px solid #e0e0e0;
              .sel-item {
                // flex: 1;
                height: 50px;
                line-height: 50px;
                &:nth-child(1) {
                  width: 150px;
                  overflow: hidden;
                  text-overflow:ellipsis;
                  white-space: nowrap;
                }
                &:nth-child(2) {
                  width: 80px;
                }
                &:nth-child(3) {
                  width: 210px;
                }
                &:last-child {
                  flex: 1;
                }
              }
              .sel-item-aud {
                flex: 1;
                height: 50px;
                line-height: 50px;
              }
            }
            .select-top {
              background-color: #f4f6f6;
            }
          }
          .select-list-page {
            display: flex;
            justify-content: space-between;
            .del-all {
              color: $themeColor;
              cursor: pointer;
            }
          }
          .name {
            font-size: 16px;
            line-height: 40px;
          }
          .height300{
            max-height: 300px;
            overflow-y: auto;
          }
          .left-item {
            margin-left: 50px;
            margin-right: 100px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
        .two-inp {
          display: flex;
          align-items: center;
          .line {
            margin-left: 10px;
            margin-right: 10px;
          }
        }
        .top-select {
          padding: 10px;
          border: 1px solid #cccccc;
        }
      }
      .page-btn {
        display: flex;
        justify-content: flex-end;
        .dy-page {
          display: flex;
          justify-content: flex-end;
          cursor: pointer;
          .dy-current {
            margin-left: 10px;
            margin-right: 10px;
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
        &.selct-audience {
          justify-content: flex-start;
          .selct-btn {
            &:first-child {
              margin-left: 0;
            }
            margin-left: 10px;
          }
        }
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
    .search-btn {
      width: 100px;
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
}
</style>
