<template>
  <div class="gg-shop">
    <!-- @clilckstep="clilckstep" -->
    <progressbar
      class="mb18"
      :steps="steps"
      :activestep="activestep"
      @clilckstep="clilckstep"
    ></progressbar>
    <div class="yy-ad-top" v-show="activestep == 0">
      <!-- <yy-breadcrumb :breadcrumbList="breadcrumbList"></yy-breadcrumb> -->
      <div class="yy-ad-title w555">购物广告</div>
      <div class="search">
        <div class="title">基础配置</div>
        <div class="bottom">
          <div class="inp-type type">
            <div class="name"><span class="point">*</span> 任务名称</div>
            <div class="part">
              <el-input
                class="w555"
                v-model="taskval"
                maxlength="50"
                placeholder="请输入任务名称"
              ></el-input>
            </div>
          </div>
          <div class="select-type type">
            <div class="name"><span class="point">*</span> 广告账号</div>
            <div class="part">
              <el-select
                v-model="selacount"
                :key="Math.random()"
                clearable
                class="w555"
                placeholder="请选择广告账号"
                @change="selacountChange"
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
          <div class="inp-type type">
            <div class="name">
              <span class="point">*</span> Merchant Center账号
            </div>
            <div class="part">
              <el-select
                v-model="mcSelacount"
                clearable
                class="w555"
                placeholder="Merchant Center账号"
                @change="mcSelacountChange"
              >
                <el-option
                  v-for="item in mcSelOptionsAd"
                  :key="item.accountId"
                  :label="item.accountName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="inp-type type">
            <div class="name">
              <span class="point">*</span> 在哪个国家/地区销售
            </div>
            <div class="part">
              <el-autocomplete
                class="w555"
                v-model="place"
                :fetch-suggestions="querySearchAsyncPlace"
                value-key="countryName"
                placeholder="请输入在哪个国家/地区销售"
                @select="handleSelectPlace"
                :trigger-on-focus="false"
                clearable
              ></el-autocomplete>

              <!-- <el-input
                class="w555"
                v-model="place"
                placeholder="请输入任务名称"
              ></el-input> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ad-option" v-show="activestep == 1">
      <div class="yy-ad-title w555">购物广告</div>
      <div class="title">广告系列配置</div>
      <div class="updown-wrap w555">
        <div class="top"><span class="point">*</span> 广告系列名称</div>
        <div class="btom">
          <el-input
            type="textarea"
            maxlength="75"
            placeholder="限75字符"
            v-model="textarea"
          >
          </el-input>
        </div>
      </div>
      <div class="line"></div>
      <div class="updown-wrap">
        <div class="top"><span class="point">*</span> 出价策略</div>
        <div class="btom">
          <div class="flex-column">
            <el-select
              v-model="selstrategy"
              clearable
              class="w555"
              placeholder="请选择出价策略"
            >
              <el-option
                v-for="item in strategyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="el-input-num" v-if="selstrategy == 1">
              <el-input
                type="number"
                class="w540 mg20"
                v-model="cpcinput"
                placeholder="请输入最大点击出价"
                oninput ="value=value.replace(/^0+/,'').replace(/[^\d]/g,'')"
              ></el-input>
              $
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="double-wrap">
        <div class="updown-wrap">
          <div class="top"><span class="point">*</span> 预算</div>
          <div class="btom">
            <el-input
              type="number"
              class="inp w540 nomargin"
              v-model.number="budget"
              placeholder="输入你打算每天花费的金额"
              oninput ="value=value.replace(/^0+/,'').replace(/[^\d]/g,'')"
            ></el-input>
            $
          </div>
        </div>
        <div class="updown-wrap mg20">
          <div class="top"><span class="point">*</span> 广告系列优先级</div>
          <div class="btom">
            <el-select
              v-model="selpriority"
              class="common w104"
              :class="{
                'low-bg': selpriority == '0',
                'mid-bg': selpriority == '1',
                'high-bg': selpriority == '2',
              }"
            >
              <el-option
                v-for="item in priorityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="updown-wrap">
        <div class="top"><span class="point">*</span> 投放网络</div>
        <div class="btom">
          <div class="internet-wrap">
            <div
              @click="toggleline(1)"
              class="internet w555"
              :class="{ 'internet-act': internetState == 1 }"
            >
              搜索网络（包含google搜索网络合作伙伴）
            </div>
            <div
              @click="toggleline(2)"
              class="internet w555 mg20"
              :class="{ 'internet-act': internetState == 2 }"
            >
              Youtube、Gmail和Google探索
            </div>
            <div
              @click="toggleline(3)"
              class="internet w555 mg20"
              :class="{ 'internet-act': internetState == 3 }"
            >
              全部（搜索网络、Youtube、Gmail和Google探索）
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="updown-wrap">
        <!-- <div class="top"><span class="point">*</span> 开始时间和结束时间</div> -->
        <div class="btom">
          <div class="time-wrap">
            <div class="left">
              <span class="title"><span style="color:#ff1c1c">*</span> 开启时间</span>
              <el-date-picker
                v-model="starttime"
                type="datetime"
                placeholder="选择开启时间"
                :disabled-date="disabledDate1"
              >
              </el-date-picker>
            </div>
            <div class="left right">
              <span class="title">结束时间</span>
              <el-date-picker
                v-model="endtime"
                type="datetime"
                placeholder="选择结束时间"
                 :disabled-date="disabledDate2"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="updown-wrap w555">
        <div class="top"><span class="point">*</span> 地理位置</div>
        <div class="btom">
          <div class="location">
            <div class="left">
              <div class="top">
                <el-select
                  class="geoselect"
                  v-model="geoval"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in geoOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-autocomplete
                  class="geoinp"
                  v-model="geoinput"
                  :fetch-suggestions="querySearchAsync"
                  value-key="canonicalName"
                  placeholder="请输入内容"
                  @select="handleSelect"
                  clearable
                  :trigger-on-focus="false"
                ></el-autocomplete>
                <el-button type="primary" @click="handleGeoInput"
                  >添加</el-button
                >
              </div>
              <div class="down">
                <div class="select">
                  <div class="msg">包含选项</div>
                  <el-select
                    class="rt-select"
                    v-model="includeval"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in includeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="select mg10">
                  <div class="msg">排除选项</div>
                  <el-select
                    class="rt-select"
                    v-model="excludeval"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in excludeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="list include-list">
                <div class="title">包含：</div>
                <div class="detal">
                  <el-tag
                    class="list-tag"
                    v-for="tag in includeTags"
                    :key="tag.name"
                    closable
                    @close="handleCloseTag(tag, 1)"
                    :type="tag.type"
                  >
                    {{ tag.name }}
                  </el-tag>
                </div>
              </div>
              <div class="list include-list exclude-list">
                <div class="title">排除：</div>
                <div class="detal">
                  <el-tag
                    class="list-tag"
                    v-for="tag in excludeTags"
                    :key="tag.name"
                    closable
                    @close="handleCloseTag(tag, 2)"
                    :type="tag.type"
                  >
                    {{ tag.name }}
                  </el-tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ad-series" v-show="activestep == 2">
      <div class="yy-ad-title w555">购物广告</div>
      <div class="title">广告组配置</div>
      <!-- <div class="updown-wrap w555">
        <div class="top"><span class="point">*</span> 广告组类型</div>
        <div class="btom">
          <div class="internet-wrap">
            <div
              @click="toggleAdType(1)"
              class="internet"
              :class="{ 'internet-act': adType == 1 }"
            >
              产品购物
            </div>
            <div
              @click="toggleAdType(2)"
              class="internet mg20"
              :class="{ 'internet-act': adType == 2 }"
            >
              橱窗购物
            </div>
          </div>
        </div>
      </div> -->
      <div class="line"></div>
      <div class="updown-wrap w555">
        <div class="top"><span class="point">*</span>广告组名称</div>
        <div class="btom">
          <el-input
            type="textarea"
            maxlength="100"
            placeholder="限100字符"
            v-model="adTypearea"
          >
          </el-input>
        </div>
      </div>
      <div class="line"></div>
      <div class="updown-wrap" v-if="selstrategy == 2">
        <div class="top"><span class="point">*</span> 出价</div>
        <div class="btom">
          <el-input
            class="w555"
            v-model="seriesinput"
            placeholder="请输入每次点击费用CPC出价"
          ></el-input>
        </div>
      </div>
    </div>
    <public-btn
      :steps="2"
      :activestep="activestep"
      :disabledVal="disabledVal"
      @nextFn ="nextFn"
      @publicFn ="publicFn"
      @publicSave ="publicSave"
      @previousFn ="previousFn"
    ></public-btn>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import router from '@/router'
import { useRoute } from 'vue-router'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs,
  watch,
  watchEffect
} from 'vue'
// import YyBreadcrumb from '@/components/common/YyBreadcrumb.vue'
import Progressbar from '../common/Progressbar.vue'
import PublicBtn from '../common/PublicBtn.vue'
import { collectGetAccountSelect } from '../common/action/index'
import {
  ggShopInfo,
  ggShopCampaign,
  ggShopAdset,
  ggGeographicalPosition,
  ggShopMerchantCenter,
  ggShopCountryCode,
  ggShopDetail
} from '@/api/admanage'
import {
  validateKeyValFn,
  getKeyArray,
  isEmptyObject,
  splitStrToArr
} from '@/utils/utils'
import { HttpResponse } from '@/interface/interface'

export default defineComponent({
  name: '',
  props: {},
  setup () {
    const route = useRoute()
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties

    // const breadcrumbList = ['Google', '广告发布', '购物广告']
    const state = reactive({
      taskval: '',
      selacount: '' as any,
      selacountItem: '' as any,
      selOptionsAd: [] as any,
      mcSelacount: '' as any,
      mcSelacountItem: '' as any,
      mcSelOptionsAd: [] as any,
      place: '',
      placeItem: {} as any,
      textarea: '',
      selstrategy: '1',
      strategyOptions: [
        {
          value: '1',
          label: '尽可能争取更多点击次数'
        },
        {
          value: '2',
          label: '手动设置CPC'
        }
      ],
      cpcinput: '',
      budget: '',
      selpriority: '0',
      classActive: 'low-bg',
      priorityOptions: [
        {
          value: '0',
          label: '低'
        },
        {
          value: '1',
          label: '中'
        },
        {
          value: '2',
          label: '高'
        }
      ],
      internetState: 1,
      starttime: '',
      endtime: '',
      geoval: '1',
      geoOptions: [
        {
          value: '1',
          label: '包含'
        },
        {
          value: '2',
          label: '排除'
        }
      ],
      includeval: '5',
      includeOptions: [
        {
          value: '5',
          label:
            '位置或热度：位于您定位到的地理位置、经常前往这些位置，或对这些位置表现出兴趣的用户（推荐）'
        },
        {
          value: '7',
          label: '位置：位于您定位到的地理位置或经常前往这些位置的用户'
        },
        {
          value: '6',
          label: '搜索热度：搜索您定位到的地理位置的用户'
        }
      ],
      excludeval: '4',
      excludeOptions: [
        {
          value: '5',
          label: '位置：位于您排除的地理位置的用户（推荐）'
        },
        {
          value: '4',
          label:
            '位置或热度：位于您排除的地理位置、经常前往这些位置，或对这些位置表现出兴趣的用户'
        }
      ],
      geoinput: '',
      geoinputItem: {} as any,
      includeTags: [] as any,
      excludeTags: [] as any,
      adType: 1,
      adTypearea: '',
      seriesinput: '',
      steps: ['01/基础配置', '02/广告系列配置', '03/广告组配置'],
      activestep: 0,
      channelId: 2,
      taskId: '',
      disabledVal: false,
      detailObj: '' as any,
      disabledDate1 (time:any) {
        return time.getTime() < (Date.now() - 3600 * 1000 * 24)
      },
      disabledDate2 (time: any) {
        // return time.getTime() < (+dayjs(state.starttime) + 3600 * 1000 * 24)
        return time.getTime() < (+dayjs(state.starttime))
      }

    })

    // 投放网络切换
    const toggleline = (num: number) => {
      state.internetState = num
    }
    // 广告组类型切换
    const toggleAdType = (num: number) => {
      state.adType = num
    }

    // 地理位置远程输入框
    let timeout: any
    const querySearchAsync = async (queryString: string, cb: any) => {
      if (!queryString) return
      const params = {
        name: queryString
      }
      const res = (await ggGeographicalPosition(params)) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        if (!res.data) {
        // eslint-disable-next-line standard/no-callback-literal
          cb([])
          return
        }
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          cb(res.data.records)
        }, 300)
      }
    }
    const handleSelect = (item: any) => {
      // console.log('item: ', item)
      state.geoinputItem = item
    }

    const handleGeoInput = () => {
      // console.log('state.geoinputItem', state.geoinputItem)
      if (isEmptyObject(state.geoinputItem)) return
      const params = {
        ...state.geoinputItem,
        name: state.geoinputItem.canonicalName
      }
      if (state.geoval == '1') {
        // 包含
        state.includeTags.push(params)
      } else {
        state.excludeTags.push(params)
      }
    }

    const querySearchAsyncPlace = async (queryString: string, cb: any) => {
      if (!queryString) return
      const params = {
        countryName: queryString
      }
      const res = (await ggShopCountryCode(params)) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        if (!res.data) {
        // eslint-disable-next-line standard/no-callback-literal
          cb([])
          return
        }
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          cb(res.data.records)
        }, 300)
      }
    }
    const handleSelectPlace = (item: any) => {
      // console.log('item: ', item)
      state.placeItem = item
    }

    // tag删除
    const handleCloseTag = (
      tag: { name: string; type: string },
      flag: number
    ) => {
      if (flag == 1) {
        state.includeTags.splice(state.includeTags.indexOf(tag), 1)
      } else {
        state.excludeTags.splice(state.excludeTags.indexOf(tag), 1)
      }
    }

    const getggShopMerchantCenter = async () => {
      const params = {
        accountId: state.selacountItem.accountId,
        channelId: state.channelId
      }
      const res = (await ggShopMerchantCenter(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.mcSelOptionsAd = res.data
      }
    }
    const selacountChange = (item: any) => {
      state.selacountItem = item
      state.selacount = item.accountName
      getggShopMerchantCenter()
    }
    const mcSelacountChange = (item: any) => {
      state.mcSelacountItem = item
      state.mcSelacount = item.accountName
    }

    const stopStepMsg = () => {
      currentInstance.$message({
        message: '请把必填字段填写完整,再进行下一步',
        type: 'error'
      })
    }

    const step0 = async () => {
      // 判断必填项
      const flag = validateKeyValFn(
        ['taskval', 'selacount', 'mcSelacount', 'place'],
        state
      )
      //
      if (flag) {
        stopStepMsg()
        return
      }
      const params = {
        taskId: state.taskId,
        taskName: state.taskval,
        accountId: state.selacountItem.accountId,
        accountName: state.selacountItem.accountName,
        merchantCenterAccount: state.mcSelacountItem.accountId,
        merchantCenterName: state.mcSelacountItem.accountName,
        saleRegion: state.placeItem.countryCode
      }
      const res = (await ggShopInfo(params)) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        state.taskId = res.data.taskId
        state.activestep++
      }
    }
    const step1 = async () => {
      //
      // 判断必填项
      let flag = validateKeyValFn(
        ['textarea', 'selstrategy', 'budget', 'starttime'],
        state
      )
      // 开始时间大于30分
      if (+dayjs(state.starttime) < (Date.now() + 0.5 * 3600 * 1000)) {
        console.log('+dayjs(state.starttime) : ', +dayjs(state.starttime))

        currentInstance.$message({
          message: '开始时间必须大于当前时间30分钟以上',
          type: 'error'
        })
        return
      }
      //
      // 第二步 判断非空
      if (state.includeTags.length == 0 && state.excludeTags.length == 0) {
        flag = true
      }
      if (flag) {
        stopStepMsg()
        return
      }
      const params = {
        taskId: state.taskId,
        campaignName: state.textarea,
        bidStrategy: state.selstrategy,
        bidStrategyValue: state.cpcinput,
        dailyBudgetValue: state.budget,
        priority: state.selpriority,
        launchNet: state.internetState,
        startTime: state.starttime,
        endTime: state.endtime,
        includePosition: getKeyArray('criteriaId', state.includeTags).join(','),
        excludePosition: getKeyArray('criteriaId', state.excludeTags).join(','),
        includeOption: state.includeval,
        excludeOption: state.excludeval
      }
      const res = (await ggShopCampaign(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.activestep++
      }
    }
    const step2 = async (num: number) => {
      //
      // 判断必填项
      let flag = validateKeyValFn(['adTypearea'], state)
      if (state.selstrategy == '2') {
        if (!state.seriesinput) {
          flag = true
        }
      }
      //
      if (flag) {
        stopStepMsg()
        return
      }
      const params = {
        taskId: state.taskId,
        adsetType: state.adType,
        adsetName: state.adTypearea,
        bid: state.seriesinput,
        taskStatus: num
      }
      const res = (await ggShopAdset(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        router.push('/home/ggtaskad')
      }
    }

    // 发布保存
    const nextFn = () => {
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
    const previousFn = () => {
      if (state.activestep) {
        state.activestep--
      }
    }
    const publicFn = () => {
      //
      step2(1)
    }
    const publicSave = () => {
      //
      // step2(2)
      nextFn()
    }

    // 步骤切换
    const clilckstep = (val: number) => {
      state.activestep = val
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
          state.disabledVal = isBtnDisable(detailObj.advertisementShoppingInfo.launchStatus)
          break
        case 1:
          state.disabledVal = isBtnDisable(detailObj.advertisementShoppingCampaign.launchStatus)
          break
        case 2:
          state.disabledVal = isBtnDisable(detailObj.advertisementShoppingAdset.launchStatus)
          break
      }
    }

    // 查看或修改搜索广告配置
    const getItemDetail = async () => {
      // console.log('router.params', route.params)
      if (isEmptyObject(route.params)) return
      const params = {
        taskId: JSON.parse(route.params.item as any).taskId
      }
      const res = (await ggShopDetail(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        //
        state.detailObj = res.data
        state.taskId = res.data.taskId
        // 1
        if (res.data.advertisementShoppingInfo) {
          let tempObj = res.data.advertisementShoppingInfo
          let tempAccount: any = {
            accountId: tempObj.accountId,
            accountName: tempObj.accountName
          }

          state.taskval = tempObj.taskName
          state.selacount = tempObj.accountName
          state.selacountItem = tempAccount
          state.mcSelacount = tempObj.merchantCenterName
          state.mcSelacountItem = {
            accountName: tempObj.merchantCenterName,
            accountId: tempObj.merchantCenterAccount
          }
          state.place = tempObj.saleRegion.countryName
          state.placeItem = tempObj.saleRegion

          tempObj = null
          tempAccount = null
        }
        // 2
        if (res.data.advertisementShoppingCampaign) {
          let tempObj = res.data.advertisementShoppingCampaign

          state.textarea = tempObj.campaignName
          state.selstrategy = tempObj.bidStrategy
          state.cpcinput = tempObj.bidStrategyValue
          state.budget = tempObj.dailyBudgetValue
          state.selpriority = tempObj.priority + ''
          state.internetState = tempObj.launchNet
          state.starttime = tempObj.startTime
          state.endtime = tempObj.endTime
          state.includeval = tempObj.includeOption
          state.excludeval = tempObj.excludeOption
          state.includeTags = tempObj.includePosition
          state.excludeTags = tempObj.excludePosition

          tempObj = null
        }

        // 3
        if (res.data.advertisementShoppingAdset) {
          let tempObj = res.data.advertisementShoppingAdset

          state.adTypearea = tempObj.adsetName
          state.seriesinput = tempObj.bid

          tempObj = null
        }
      }
    }

    // watchEffect(
    //   () => console.log(state.selacount)
    // )
    // watch(
    //   () => state.selacount,
    //   (count, prevCount) => {
    //     console.log('selacount: ', count)
    //     /* ... */
    //   }
    // )
    watchEffect(() => {
      if (isEmptyObject(route.params)) return
      ifDisabledFn(state.detailObj)
    })

    onMounted(() => {
      collectGetAccountSelect(state)
      getItemDetail()
      // (state.selacount as unknown as any).accountName = 'yydev2';
      // (state.selacount as unknown as any).accountId = '3349421960'
      // (state.selacount as any) = '123456'
    })

    return {
      ...toRefs(state),
      handleCloseTag,
      publicFn,
      publicSave,
      toggleline,
      toggleAdType,
      // breadcrumbList
      clilckstep,
      nextFn,
      previousFn,
      querySearchAsync,
      handleSelect,
      handleGeoInput,
      getggShopMerchantCenter,
      selacountChange,
      querySearchAsyncPlace,
      handleSelectPlace,
      mcSelacountChange
    }
  },
  components: {
    // YyBreadcrumb
    Progressbar,
    PublicBtn
  }
})
</script>
<style lang="scss">
.gg-shop {
  height: 100%;
  overflow-y: auto;
  @include clearScrollbar();
  .w555 {
    width: 555px;
  }
  .mg20 {
    margin-top: 20px;
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
  .yy-ad-top {
    // margin-top: 18px;
    margin-bottom: 18px;
    padding: 18px;
    // height: 210px;
    background: #ffffff;
    border-radius: 20px;
    box-sizing: border-box;

    .search {
      .title {
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 500;
        color: #333333;
      }
      .bottom {
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        // align-items: flex-end;
        .left {
          display: flex;
        }
        .el-input__inner {
          height: 38px;
          line-height: 38px;
          // background: #f5f5f5;
        }
        .type {
          margin-bottom: 30px;
          .name {
            margin-bottom: 10px;
            .point {
              color: #ff1c1c;
            }
          }
          .dateselect {
            margin-right: 36px;
            width: 240px;
            .el-range-input {
              // background-color: #f5f5f5;
            }
          }
          .w300 {
            width: 300px;
          }
        }
      }
    }
  }
  .ad-option {
    padding: 18px;
    // height: 868px;
    background: #ffffff;
    border-radius: 20px;
    .title {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 500;
      color: #333333;
    }
    .line {
      margin-top: 20px;
      margin-bottom: 20px;
      height: 1px;
      background: #e1e1e1;
    }
  }
  .double-wrap {
    display: flex;
    flex-direction: column;
  }
  .updown-wrap {
    .top {
      margin-bottom: 12px;
      .point {
        color: #ff1c1c;
      }
    }
    .btom {
      .w540 {
        width: 540px;
      }
      .w436 {
        width: 436px;
      }
      .w104 {
        width: 104px;
      }
      .el-textarea__inner {
        // background: #f5f5f5;
      }
      .el-input__inner {
        height: 38px;
        line-height: 38px;
        // background: #f5f5f5;
      }
      .inp {
        // margin-left: 60px;
      }
      .nomargin {
        margin: 0;
      }
      .common {
        .el-input__inner {
          color: #fff;
        }
        .el-select__caret {
          color: #fff;
        }
      }
      .low-bg {
        .el-input__inner {
          background-color: #52c200;
        }
      }
      .mid-bg {
        .el-input__inner {
          background-color: #ffa22a;
        }
      }
      .high-bg {
        .el-input__inner {
          background-color: #ff2a2a;
        }
      }
      .internet-wrap {
        display: flex;
        flex-direction: column;
        // align-items: center;
        .internet {
          // width: 436px;
          height: 38px;
          line-height: 38px;
          text-indent: 18px;
          font-size: 14px;
          color: #333333;
          background: #fff;
          border: 1px solid #e6dff4;
          border-radius: 3px;
          cursor: pointer;
        }
        .internet-act {
          color: #ffffff;
          border: 1px solid $themeColor;
          background: $themeColor;
        }
      }
      .time-wrap {
        display: flex;
        flex-direction: column;
        .title {
          // margin-right: 10px;
          font-size: 14px;
          color: #333333;
        }
        .left {
          display: flex;
          flex-direction: column;
        }
        .right {
          margin-top: 20px;
        }
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 555px;
        }
      }
      .location {
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        .left {
          .top {
            display: flex;
            align-items: center;
          }
          .geoselect {
            width: 104px;
          }
          .geoinp {
            margin-left: 20px;
            margin-right: 20px;
            width: 400px;
          }
          .list {
            display: flex;
            .title {
              font-size: 14px;
              color: #333333;
            }
            .detal {
            }
            .list-tag {
              margin-right: 10px;
              margin-bottom: 10px;
            }
          }
          .include-list {
            margin-top: 16px;
            margin-bottom: 24px;
          }
          .exclude-list {
            margin-bottom: 0;
          }
          .down {
            .mg10 {
              margin-top: 10px;
            }
            .select {
              display: flex;
              flex-direction: column;
              // align-items: center;
              .msg {
                margin-bottom: 10px;
              }
              .rt-select {
                width: 555px;
              }
            }
          }
        }
      }
      .flex-column {
        display: flex;
        flex-direction: column;
      }
    }
  }
  .ad-series {
    margin-top: 18px;
    padding: 18px;
    background: #ffffff;
    border-radius: 20px;
    .title {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 500;
      color: #333333;
    }
    .line {
      margin-top: 20px;
      margin-bottom: 20px;
      height: 1px;
      background: #e1e1e1;
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
