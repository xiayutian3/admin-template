<template>
  <div class="az-spad">
    <!-- @clilckstep="clilckstep" -->
    <progressbar
      class="mb18"
      :steps="steps"
      :activestep="activestep"
      @clilckstep="clilckstep"
    ></progressbar>
    <!-- <div class="part1 h570" v-show="activestep == 0">
      <div class="yy-ad-title w555">SP商品推广</div>
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
    </div> -->
    <div class="part1 part2" v-show="activestep == 0">
      <div class="yy-ad-title w555">SP商品推广</div>
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
              type="number"
              class="w555"
              v-model="adBudgetInp"
              placeholder="输入预算"
            ></el-input> -->
            <el-input-number
              :precision="2"
              v-model="adBudgetInp"
              :controls="false"
              :min="0"
              controls-position="right"
            ></el-input-number>
          </div>
        </div>
        <div class="item w555">
          <div class="name"><span class="point">*</span> 定位</div>
          <div class="bttom">
            <div class="selct-btns">
              <div
                class="selct-btn"
                :class="{ act: step2Position == 1 }"
                @click="toggleClick(1)"
              >
                <i class="iconfont icon-checkBox icon-local"></i>
                自动投放
              </div>
              <div
                class="selct-btn"
                :class="{ act: step2Position == 2 }"
                @click="toggleClick(2)"
              >
                <i class="iconfont icon-checkBox icon-local"></i>
                手动投放
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 竞价策略</div>
          <div class="bttom">
            <el-select
              v-model="adStrategy"
              clearable
              class="w555"
              placeholder="请选择竞价策略"
            >
              <el-option
                v-for="item in adStrategyList"
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
            <span class="point"></span> 根据广告位调整竞价（替代“竞价+”）
          </div>
          <div class="bttom">
            <div class="hasitem">
              <div class="name">
                <span class="point"></span> 搜索结果顶部（首页）
                <span class="tip-name">
                  示例：对于此广告位，$ 1.00竞价将为 $1.00</span
                >
              </div>
              <el-input-number
                :precision="2"
                v-model="adBudgetSearchInp"
                :controls="false"
                :min="0"
                controls-position="right"
              ></el-input-number>
              %
            </div>
            <div class="hasitem">
              <div class="name">
                <span class="point"></span>商品页面
                <span class="tip-name">
                  示例：对于此广告位，$ 1.00竞价将保持$1.00 不变</span
                >
              </div>
              <el-input-number
                :precision="2"
                v-model="adBudgetShopInp"
                :controls="false"
                :min="0"
                controls-position="right"
              ></el-input-number>
              %
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="part1 part2 part3" v-show="activestep == 1">
      <div class="yy-ad-title w555">SP商品推广</div>
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
        <div class="item">
          <div class="name">
            <span class="point">*</span>广告组默认竞价（$）
          </div>
          <div class="bttom">
            <!-- <el-input
              type="number"
              class="w555"
              v-model="defaultbid"
              placeholder=""
            ></el-input> -->
            <el-input-number
              :precision="2"
              v-model="defaultbid"
              @blur="changeKeysAndGoodsPrice"
              :controls="false"
              :min="0"
              placeholder="最小值0.02"
              controls-position="right"
            >
            </el-input-number>
          </div>
        </div>

        <div class="item" v-show="step2Position == 2">
          <div class="name"><span class="point">*</span>定向策略</div>
          <div class="bttom">
            <div class="msg-key">
              <el-radio v-model="keyDelivery" :label="1">关键词投放</el-radio>
              <div class="msg">
                选择有助于您的商品针对顾客搜索展示的关键词。
              </div>
            </div>
            <div class="msg-key">
              <el-radio v-model="keyDelivery" :label="2">商品投放</el-radio>
              <div class="msg">
                选择特定商品、品类、品牌或其他商品特征来定向您的广告。
              </div>
            </div>
          </div>
        </div>

        <div v-show="step2Position == 2">
          <div class="item" v-show="keyDelivery == 1">
            <div class="name name-top">
              <span class="mr20 title">关键词投放</span>
              <!-- <el-switch
                v-model="keyDelivery"
                active-color="#5563cb"
                inactive-color="#e5e5e5"
                @change="onChangeKeyDelivery"
              >
              </el-switch> -->
            </div>
            <div class="name" v-show="keyDelivery == 1">
              <span class="point">*</span>
              <span class="mr20">关键词/否定关键词添加</span>
            </div>
            <div class="bttom w555" v-show="keyDelivery == 1">
              <div class="key-delivery-wrap">
                <div class="key-delivery-list">
                  <div
                    class="key-delivery-item"
                    v-for="(item, idx) in keyDeliveryList"
                    :key="'keyDeliveryList' + idx"
                  >
                    <div class="part w100">{{ item.keyword }}</div>
                    <div
                      class="part w100 dblclick"
                      @dblclick="handKeyDblclick(idx)"
                    >
                      <span v-if="!item.change">${{ item.bid }}</span>
                      <el-input
                        v-focus
                        v-if="item.change"
                        autofocus
                        v-model="item.bid"
                        @blur="handKeyDblclickBlur(idx)"
                      ></el-input>
                    </div>
                    <div class="part noborder w130">
                      <el-select
                        v-model="item.keywordType"
                        @change="onChangeItemKeywordType(idx)"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in keyValOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                    <div class="part noborder w130">
                      <el-select
                        v-model="item.matchingType"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in item.keywordType == 'negativeExact'
                            ? matchOptions
                            : matchOptions2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                    <div class="part icon-close" @click="keyDeliveryDel(idx)">
                      <i class="el-icon-close"></i>
                    </div>
                  </div>
                </div>
                <el-button class="mg20 md20" plain @click="deleteAllKeyDelivery"
                  >删除所有关键词</el-button
                >
                <div class="key-delivery-inp">
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="keyDeliveryInp"
                  >
                  </el-input>
                  <div class="operate">
                    <div class="operate1">
                      <el-select
                        v-model="operate1Val"
                        @change="onChangeOperate1Val"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in keyValOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                    <div class="line"></div>
                    <div class="operate1">
                      <el-select v-model="operate2Val" placeholder="请选择">
                        <el-option
                          v-for="item in operate1Val == 'negativeExact'
                            ? matchOptions
                            : matchOptions2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                    <div class="line"></div>
                    <div class="operate1 textcenter" @click="keyDeliveryAdd">
                      确定
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="item" v-show="keyDelivery == 2">
            <div class="name name-top">
              <span class="mr20 title">商品投放</span>
              <!-- v-model="shopDelivery" -->
              <!-- <el-switch
                v-model="shopDelivery"
                active-color="#5563cb"
                inactive-color="#e5e5e5"
                @change="onChangeShopDelivery"
              >
              </el-switch> -->
            </div>
            <div class="name" v-show="keyDelivery == 2">
              <span class="point">*</span>
              <span class="mr20">投放在商品下</span>
            </div>
            <div class="bttom w555" v-show="keyDelivery == 2">
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
                        <div class="item-add" @click="shopDeliveryAdd(item)">
                          添加
                        </div>
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
                    placeholder="输入ASIN"
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
                <div class="select-name">已选商品</div>
                <div class="select-list">
                  <div class="select-top select-item">
                    <!-- <div class="sel-item">分类/商品</div> -->
                    <div class="sel-item">商品</div>
                    <div class="sel-item">类型</div>
                    <div class="sel-item">使用广告组默认出价（双击修改）</div>
                    <div class="sel-item">操作</div>
                  </div>
                  <div
                    class="select-item"
                    v-for="(item, idx) in shopDeliveryList"
                    :key="'shopDeliveryList' + idx"
                  >
                    <div class="sel-item">{{ item.value }}</div>
                    <div class="sel-item">
                      {{
                        item.type == 'asinCategorySameAs'
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
                  <div class="del-all" @click="delShopAllDelivery">
                    删除全部
                  </div>
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
          <!-- <div v-show="shopDelivery">
            <div class="item">
              <div class="name"><span class="point"></span> 品牌选择</div>
              <div class="bttom">
                <el-input
                  class="w555"
                  v-model="shopSelect"
                  placeholder="请输入品牌，以/分隔"
                ></el-input>
              </div>
            </div>
            <div class="item">
              <div class="name"><span class="point"></span> 排除品牌</div>
              <div class="bttom">
                <el-input
                  class="w555"
                  v-model="shopExclude"
                  placeholder="请输入品牌，以/分隔"
                ></el-input>
              </div>
            </div>
            <div class="item">
              <div class="name"><span class="point"></span> 商品价格范围</div>
              <div class="bttom w555">
                <div class="two-inp">
                  <el-input-number :precision="2" v-model="shopMin" :controls="false" :min="0" :max="shopMax" controls-position="right"></el-input-number>
                  <div class="line">-</div>
                  <el-input-number :precision="2" v-model="shopMax" :controls="false" :min="shopMin" :max="1000000" controls-position="right"></el-input-number>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="name"><span class="point"></span> 星级评定</div>
              <div class="bttom w555">
              <el-slider
                v-model="sliderVal"
                range
                show-stops
                :max="5">
              </el-slider>
              </div>
            </div>
            <div class="item">
              <div class="name"><span class="point"></span> 配送</div>
              <div class="bttom">
                <el-select
                  v-model="shopSend"
                  clearable
                  class="w555"
                  placeholder="请选择配送"
                >
                  <el-option
                    v-for="item in shopSendList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div> -->
        </div>
        <div class="item" v-show="step2Position ==1">
          <div class="name">
            <span class="point"></span> 通过投放组单独设置出价
          </div>
          <div class="bttom">
            <div class="msg-item">
              <div class="msg mr20">紧密匹配</div>
              <el-input
                class="w396"
                v-model="price1"
                placeholder="设置出价"
              ></el-input>
            </div>
            <div class="msg-item mg20">
              <div class="msg mr20">同类匹配</div>
              <el-input
                class="w396"
                v-model="price2"
                placeholder="设置出价"
              ></el-input>
            </div>
            <div class="msg-item mg20">
              <div class="msg mr20">宽泛匹配</div>
              <el-input
                class="w396"
                v-model="price3"
                placeholder="设置出价"
              ></el-input>
            </div>
            <div class="msg-item mg20">
              <div class="msg mr20">关联匹配</div>
              <el-input
                class="w396"
                v-model="price4"
                placeholder="设置出价"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <public-btn
      :steps="1"
      :activestep="activestep"
      :disabledVal="disabledVal"
      @nextFn="nextFn"
      @publicFn="publicFn"
      @publicSave="publicSave"
      @previousFn="previousFn"
    ></public-btn>
  </div>
</template>

<script lang="ts">
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
import {
  collectAzSdCommodity,
  collectAzStoreSelecList
} from '../common/action/index'
// import { azInfo, azSpCampaign, azSpAdset, azSpDetail } from '@/api/admanage'
import { azCampaign, azAdgroupTarget, azSpDetail, azProducts } from '@/api/admanage'
import { HttpResponse } from '@/interface/interface'
import { isEmptyObject, uniqueArray, backTop } from '@/utils/utils'
import dayjs from 'dayjs'
import router from '@/router'
import { useRoute } from 'vue-router'

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
      steps: ['01/广告活动配置', '02/广告组配置'],
      activestep: 0,
      taskval: '',
      selstore: '',
      selstoreItem: {
        shopAccount: '3349421960',
        shopName: ''
      } as any,
      storeOptions: [],
      adSeriesName: '',
      step2starttime: '',
      step2endtime: '',
      disabledDate (time: any) {
        return time.getTime() < +dayjs(state.step2starttime)
      },
      disabledDate1 (time: any) {
        return time.getTime() < new Date(Date.now() - 3600 * 1000 * 24)
      },
      adBudgetInp: 0,
      adBudgetSearchInp: 0,
      adBudgetShopInp: 0,
      adStrategy: 1,
      adStrategyList: [
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
      step2Position: 1,
      adGroupName: '',
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
      defaultbid: 0,
      currentPageAdd1: 2,
      price1: '',
      price2: '',
      price3: '',
      price4: '',
      // step4: {
      keyDelivery: 1,
      keyVal: '',
      keyValOptions: [
        {
          value: 'negativeExact',
          label: '关键词'
        },
        {
          value: 'negativePhrase',
          label: '否定关键词'
        }
      ],
      keyDeliveryNumInp: 18,
      match: '',
      matchOptions: [
        {
          value: 'broad',
          label: '广泛匹配'
        },
        {
          value: 'exact',
          label: '词组匹配'
        },
        {
          value: 'phrase',
          label: '精确匹配'
        }
      ],
      matchOptions2: [
        {
          value: 'negativePhrase',
          label: '词组匹配'
        },
        {
          value: 'negativeExact',
          label: '精确匹配'
        }
      ],
      keyDeliveryInp: '',
      keyDeliveryList: [] as any,
      operate1Val: '',
      operate2Val: '',
      shopDelivery: false,
      tabActiveName: 2, // 1期需求分类先注释
      shopDeliveryPage: 2,
      shopDeliveryInp: '',
      shopDeliveryNum: false,
      shopDeliveryNumInp: 18,
      shopDeliveryList: [] as any,
      selectDeliveryPage: 2,
      shopSelect: '',
      shopExclude: '',
      shopMin: null,
      shopMax: null,
      sliderVal: [0, 5],
      shopSend: '',
      shopSendList: [
        // {
        //   value: '1',
        //   label: '所有'
        // },
        {
          value: '2',
          label: '具有prime资格'
        },
        {
          value: '3',
          label: '不具有prime资格'
        }
      ],
      // },
      dyCurrent: 1,
      adType: 4,
      taskId: '',
      channelId: 3,
      site: 'US',
      profileId: 3039723949374157,
      storeId: 12345678
    })
    // 步骤切换
    const clilckstep = (val: number) => {
      state.activestep = val
    }
    // 定位切换
    const toggleClick = (val: number) => {
      state.step2Position = val
    }

    const getStoreAccountList = () => {
      collectAzStoreSelecList(state)
    }
    const selstoreChange = (item: any) => {
      state.selstoreItem = item
    }

    // const step0 = async () => {
    //   const params = {
    //     taskId: state.taskId,
    //     taskName: state.taskval,
    //     adType: state.adType,
    //     shopAccount: state.selstoreItem.shopAccount,
    //     shopName: state.selstoreItem.shopName
    //   }
    //   const res = (await azInfo(params)) as HttpResponse
    //   console.log('res: ', res)
    //   if (res.code == 0) {
    //     state.taskId = res.data.taskId
    //     state.activestep++
    //   }
    // }

    const step1 = async () => {
      const params = {
        // taskId: state.taskId,
        campaignName: state.adSeriesName,
        releaseBeginTime: state.step2starttime,
        releaseEndTime: state.step2endtime,
        dailyBudgetValue: state.adBudgetInp,
        locationStrategy: state.step2Position,
        bidStrategy: state.adStrategy,
        bidTopValue: state.adBudgetSearchInp,
        bidProductDetailValue: state.adBudgetShopInp,
        site: state.site,
        profileId: state.profileId,
        storeId: state.storeId
      }
      //
      const res = (await azCampaign(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.taskId = res.data.id
        state.activestep++
        backTop()
      }
    }
    const step2 = async (num?: number) => {
      //
      let params: any = {
        taskStatus: num || 1,
        bizCampaignId: state.taskId,
        adgroupName: state.adGroupName,
        advertisementRelationCommodity: state.commoditySelectList,
        bid: state.defaultbid,
        // spManualLaunchType: state.keyDelivery,
        advertisementRelationKeyword:
          state.keyDelivery == 1 ? state.keyDeliveryList : [],

        advertisementRelationClassify:
          state.keyDelivery == 2 ? state.shopDeliveryList : [],
        includeBrand: state.shopSelect,
        excludeBrand: state.shopExclude
        // commodityPriceMin: state.shopMin,
        // commodityPriceMax: state.shopMax,
        // starEvaluate: state.sliderVal.join('-'),
        // distribution: state.shopSend

      }
      if (state.step2Position == 1) {
        params = {
          ...params,
          autoTargetPrices: [
            {
              type: 'queryHighRelMatches',
              bid: state.price1 || 0
            },
            {
              type: 'asinSubstituteRelated',
              bid: state.price2 || 0
            },
            {
              type: 'queryBroadRelMatches',
              bid: state.price3 || 0
            },
            {
              type: 'asinAccessoryRelated',
              bid: state.price4 || 0
            }
          ]
        }
      } else if (state.step2Position == 2) {
        params = {
          ...params,
          spManualLaunchType: state.keyDelivery
        }
      }

      const res = (await azAdgroupTarget(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        router.push('/home/amznlistad')
      }
    }

    // 发布保存
    const nextFn = () => {
      // 下一步
      switch (state.activestep) {
        case 0:
          step1()
          break
        case 1:
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
      step2()
    }
    const publicSave = () => {
      //
      // step2(2)
      nextFn()
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
      // console.log('item: ', item)
      const params = {
        // sku: item.sku,
        // classifyName: item.category,
        // classifyType: 'asinCategorySameAs',
        // bid: state.defaultbid,
        // change: false
        sku: item.sku,
        value: item.category,
        type: 'asinCategorySameAs',
        bid: state.defaultbid,
        change: false,
        targetType: 'product'

      }
      state.shopDeliveryList.push(params)
      state.shopDeliveryList = uniqueArray(state.shopDeliveryList, 'sku')
    }
    const shopDeliveryAddAll = () => {
      const tempArr = state.commoditySelectList.map((item: any) => {
        return {
          sku: item.sku,
          value: item.category,
          type: 'asinCategorySameAs',
          bid: state.defaultbid,
          change: false,
          targetType: 'product'
        }
      })

      state.shopDeliveryList.push(...tempArr)
      state.shopDeliveryList = uniqueArray(state.shopDeliveryList, 'sku')
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
    // 关键词投放相关
    // 删除
    const keyDeliveryDel = (index: number) => {
      //
      state.keyDeliveryList.splice(index, 1)
    }
    const deleteAllKeyDelivery = () => {
      state.keyDeliveryList = []
      // currentInstance
      //   .$confirm('是否删除所有?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   })
      //   .then(() => {
      //     currentInstance.$message({
      //       type: 'success',
      //       message: '删除成功!'
      //     })
      //   })
      //   .catch(() => {
      //     currentInstance.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     })
      //   })
    }
    const keyDeliveryAdd = () => {
      // 校验输入完整
      if (
        state.keyDeliveryInp.trim() == '' ||
        !state.operate1Val ||
        !state.operate2Val
      ) {
        currentInstance.$message({
          type: 'warning',
          message: '请填写完整数据!'
        })
        return false
      }
      const strArr = state.keyDeliveryInp.split(/\n/)
      strArr.forEach((i) => {
        const params = {
          keyword: i,
          bid: state.defaultbid,
          keywordType: state.operate1Val,
          matchingType: state.operate2Val,
          change: false
        }

        state.keyDeliveryList.push(params)
      })
      state.keyDeliveryInp = ''
    }

    // 关键词投放input双击
    const handKeyDblclick = (index: number) => {
      //
      state.keyDeliveryList[index].change = true
    }
    const handKeyDblclickBlur = (index: number) => {
      //
      state.keyDeliveryList[index].change = false
    }
    const addShopDelivery = async () => {
      // 先校验空值
      if (state.shopDeliveryInp.trim() == '') {
        currentInstance.$message({
          type: 'warning',
          message: '请输入ASIN'
        })
        return false
      }
      const params = {
        asin: state.shopDeliveryInp,
        storeId: state.storeId,
        profileId: state.profileId
      }
      const res = await azProducts(params) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        if (res.data.productMetadataList.length > 0) {
          state.shopDeliveryList = res.data.productMetadataList.map((item:any) => {
            const temp = {
              value: item.asin,
              type: 'asinSameAs',
              bid: state.defaultbid,
              change: false,
              targetType: 'product'
            }
            return temp
          })
        }
      }

      // const strArr = state.shopDeliveryInp.split(/\n/)
      // // 去重
      // const newStrArr = Array.from(new Set(strArr))
      // if (newStrArr.length === 0) return
      // newStrArr.map((item) => {
      //   const params = {
      //     // classifyName: item,
      //     // classifyType: 'asinSameAs',
      //     // bid: state.defaultbid,
      //     // change: false
      //     value: item,
      //     type: 'asinSameAs',
      //     bid: state.defaultbid,
      //     change: false,
      //     targetType: 'product'
      //   }
      //   state.shopDeliveryList.push(params)
      // })

      state.shopDeliveryInp = ''
    }
    const onChangeOperate1Val = (val: string) => {
      // 置空下一项
      state.operate2Val = ''
    }
    const onChangeItemKeywordType = (index: number) => {
      // 置空item下一项
      state.keyDeliveryList[index].matchingType = ''
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

    // 商品投放相关
    const tabClick = (val: number) => {
      //
      state.tabActiveName = val
    }
    const shopDeliveryPageChange = (val: number) => {
      //
      state.tabActiveName = val
    }
    const selectDeliveryPageChange = (val: number) => {
      //
    }
    const onChangeKeyDelivery = (val: boolean) => {
      if (val) {
        // state.shopDelivery = false
      }
    }
    const onChangeShopDelivery = (val: boolean) => {
      if (val) {
        // state.keyDelivery = false
      }
    }
    const changeKeysAndGoodsPrice = () => {
      if (state.shopDeliveryList.length && state.shopDelivery) {
        state.shopDeliveryList.forEach((item: any, index: number) => {
          state.shopDeliveryList[index].bid = state.defaultbid
        })
      }
      if (state.keyDeliveryList.length && state.keyDelivery) {
        state.keyDeliveryList.forEach((item: any, index: number) => {
          state.keyDeliveryList[index].bid = state.defaultbid
        })
      }
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
          state.disabledVal = isBtnDisable(
            detailObj.advertisementSpInfo
              ? detailObj.advertisementSpInfo.launchStatus
              : ''
          )
          break
        case 1:
          state.disabledVal = isBtnDisable(
            detailObj.advertisementSpCampaign
              ? detailObj.advertisementSpCampaign.launchStatus
              : ''
          )
          break
        case 2:
          state.disabledVal = isBtnDisable(
            detailObj.advertisementSpAdset
              ? detailObj.advertisementSpAdset.launchStatus
              : ''
          )
          break
      }
    }
    // 查看或修改搜索广告配置
    const getItemDetail = async () => {
      if (isEmptyObject(route.params)) return
      const params = {
        taskId: JSON.parse(route.params.item as any).taskId
      }
      const res = (await azSpDetail(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.taskId = res.data.taskId
        state.detailObj = res.data
        // step0
        if (res.data.advertisementSpInfo) {
          let tempObj = res.data.advertisementSpInfo
          let obj: any = {
            shopAccount: tempObj.shopAccount,
            shopName: tempObj.shopName
          }

          state.taskval = tempObj.taskName
          state.selstore = tempObj.shopName
          state.selstoreItem = obj

          tempObj = null
          obj = null
        }
        // step1
        if (res.data.advertisementSpCampaign) {
          let tempObj = res.data.advertisementSpCampaign

          state.adSeriesName = tempObj.campaignName
          state.step2starttime = tempObj.startTime
          state.step2endtime = tempObj.endTime
          state.adBudgetInp = tempObj.dailyBudgetValue
          state.step2Position = tempObj.location
          state.adStrategy = tempObj.bidStrategy

          tempObj = null
        }

        // step2
        if (res.data.advertisementSpAdset) {
          let tempObj = res.data.advertisementSpAdset

          state.adGroupName = tempObj.adsetName
          state.commoditySelectList = tempObj.advertisementRelationCommodity
          state.defaultbid = tempObj.bid
          state.keyDeliveryList = tempObj.advertisementRelationKeyword || []
          state.shopDeliveryList = tempObj.advertisementRelationClassify || []
          // 初始化 keyDelivery 及 shopDelivery
          // state.keyDeliveryList.length
          //   ? (state.keyDelivery = true)
          //   : (state.keyDelivery = false)
          // state.shopDeliveryList.length
          //   ? (state.shopDelivery = true)
          //   : (state.shopDelivery = false)

          state.shopSelect = tempObj.includeBrand
          state.shopExclude = tempObj.excludeBrand
          // state.shopMin = tempObj.commodityPriceMin
          // state.shopMax = tempObj.commodityPriceMax
          // state.sliderVal = tempObj.starEvaluate.split('-').map((item: any) => (+item))
          // state.shopSend = tempObj.distribution
          state.price1 = tempObj.queryHighRelMatches
          state.price2 = tempObj.asinSubstituteRelated
          state.price3 = tempObj.queryBroadRelMatches
          state.price4 = tempObj.asinAccessoryRelated

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
      toggleClick,
      handleSearch,
      add,
      remove,
      handleCurrentChange,
      keyDeliveryDel,
      deleteAllKeyDelivery,
      keyDeliveryAdd,
      tabClick,
      onChangeOperate1Val,
      onChangeItemKeywordType,
      shopDeliveryPageChange,
      addShopDelivery,
      handKeyDblclick,
      handKeyDblclickBlur,
      shopHandKeyDblclick,
      shopHandKeyDblclickBlur,
      selectDeliveryPageChange,
      delShopAllDelivery,
      nextFn,
      previousFn,
      publicFn,
      publicSave,
      dyPrePage,
      dyNextPage,
      selstoreChange,
      shopDeliveryAdd,
      shopDeliveryAddAll,
      shopDeliveryListRemove,
      onChangeKeyDelivery,
      onChangeShopDelivery,
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
.az-spad {
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
          .tip-name {
            font-size: 12px;
            color: #666;
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
        }
        .select-wrap {
          padding: 10px;
          border: 1px solid #cccccc;
          .select-name {
          }
          .select-list {
            height: 300px;
            overflow: hidden;
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
                  text-overflow: ellipsis;
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
        }
        .two-inp {
          display: flex;
          align-items: center;
          .line {
            margin-left: 10px;
            margin-right: 10px;
          }
        }
        .msg-key {
          margin-left: 20px;
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
            border: 1px solid #6a6d73;
            // background-color: $themeColor;
            // color: #fff;
            .icon-local {
              color: $themeColor;
            }
          }
          position: relative;
          width: 270px;
          height: 40px;
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          border-radius: 4px;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
          .icon-local {
            position: absolute;
            right: 16px;
            top: 0;
            // color: $themeColor;
          }
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
