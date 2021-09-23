<template>
  <div class="az-sbad">
    <progressbar
      class="mb18"
      :steps="steps"
      :activestep="activestep"
      @clilckstep="clilckstep"
    ></progressbar>
    <div class="part1 h570" v-show="activestep == 0">
      <div class="yy-ad-title w555">SB商品推广</div>
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
            >
              <el-option
                v-for="item in storeOptions"
                :key="item.shopAccount"
                :label="item.shopName"
                :value="item.shopAccount"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div class="part1 part2" v-show="activestep == 1">
      <div class="yy-ad-title w555">SB商品推广</div>
      <div class="part-title">广告系列配置</div>
      <div class="content">
        <div class="item">
          <div class="name"><span class="point">*</span> 广告系列名称</div>
          <div class="bttom">
            <el-input
              class="w555"
              v-model="adSeriesName"
              placeholder="限100字符"
              maxlength="100"
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
        <div class="item">
          <div class="name"><span class="point">*</span> 品牌</div>
          <div class="bttom">
            <el-select
              v-model="adBrand"
              clearable
              class="w555"
              placeholder="请选择品牌"
            >
              <el-option
                v-for="item in adadBrandList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div class="part1 part2 part3" v-show="activestep == 2">
      <div class="yy-ad-title w555">广告发布</div>
      <div class="part-title">广告组配置</div>
      <div class="content">
        <div class="item">
          <div class="name">
            <span class="point">*</span> <span class="mr20"> 广告格式</span>
          </div>
          <div class="bttom w555">
            <div class="shop-delivery-wrap">
              <div class="tabs md20">
                <div
                  class="tab"
                  :class="{ act: tabActiveName1 == 1 }"
                  @click="adFormatTabClick(1)"
                >
                  商品集
                </div>
                <div
                  class="tab"
                  :class="{ act: tabActiveName1 == 2 }"
                  @click="adFormatTabClick(2)"
                >
                  视频
                </div>
              </div>
              <div class="tab-list-wrap" v-show="tabActiveName1 == 1">
                <div class="tab-left">
                  <div class="item">
                    <div class="name">
                      <span class="point">*</span> 品牌logo上传
                    </div>
                    <div class="bttom">
                      <div class="media-list">
                        <div
                          class="media"
                          v-for="(pic, idx) in 2"
                          :key="'pic' + idx"
                        >
                          <div class="del">x</div>
                          <img class="avtar" src="" alt="" />
                          <div class="is-video">
                            <i class="el-icon-film"></i>
                          </div>
                          <!-- <div class="avtar-name">aaaa.png</div> -->
                        </div>
                        <div class="media-add" @click="selectHandle">
                          <div class="add-icon">
                            <i class="el-icon-plus"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="item">
                    <div class="name">
                      <span class="point">*</span> 品牌名称输入
                    </div>
                    <div class="bttom">
                      <el-input
                        v-model="brandInp"
                        placeholder="请输入品牌名称"
                      ></el-input>
                    </div>
                  </div>
                  <div class="item">
                    <div class="name"><span class="point">*</span> 标题</div>
                    <div class="bttom">
                      <el-input
                        v-model="title"
                        placeholder="限50字符"
                      ></el-input>
                    </div>
                  </div>
                  <div class="item">
                    <div class="name">
                      <span class="point"></span> 优化您的广告
                    </div>
                    <div class="bttom">
                      <el-select
                        class="whundred"
                        v-model="adOptimization"
                        clearable
                        placeholder="请选择优化您的广告"
                      >
                        <el-option
                          v-for="item in adOptimizationList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-textarea text-border"
                v-show="tabActiveName1 == 2"
              >
                <div class="item">
                  <div class="name"><span class="point"></span> 视频上传</div>
                  <div class="bttom">
                    <div class="media-list">
                      <div
                        class="media"
                        v-for="(pic, idx) in 2"
                        :key="'pic' + idx"
                      >
                        <div class="del">x</div>
                        <img class="avtar" src="" alt="" />
                        <div class="is-video">
                          <i class="el-icon-film"></i>
                        </div>
                        <!-- <div class="avtar-name">aaaa.png</div> -->
                      </div>
                      <div class="media-add" @click="selectHandle">
                        <div class="add-icon">
                          <i class="el-icon-plus"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="item">
          <div class="name">
            <span class="point">*</span> <span class="mr20"> 流量着陆页</span>
          </div>
          <div class="bttom">
            <div class="shop-delivery-wrap">
              <div class="tabs md20 w555">
                <div
                  class="tab"
                  :class="{ act: tabActiveName2 == 1 }"
                  @click="adLandingPageClick(1)"
                >
                  新商品页面
                </div>
                <div
                  class="tab"
                  :class="{ act: tabActiveName2 == 2 }"
                  @click="adLandingPageClick(2)"
                >
                  亚马逊品牌
                </div>
              </div>
              <div v-show="tabActiveName2 == 1">
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
                      <div class="left-item">
                        <div class="img-wrap">
                          <img class="img" src="" alt="" />
                          <div class="detail">ASIN：******* SKU**********</div>
                        </div>
                        <el-button class="btn" type="primary" round @click="add"
                          >添加</el-button
                        >
                      </div>
                      <div class="left-item">
                        <div class="img-wrap">
                          <img class="img" src="" alt="" />
                          <div class="detail">ASIN：******* SKU**********</div>
                        </div>
                        <el-button class="btn" type="primary" round
                          >添加</el-button
                        >
                      </div>
                    </div>
                    <div class="page-btn">
                      <el-pagination
                        small
                        @current-change="handleCurrentChange(1)"
                        :current-page="currentPageAdd1"
                        :page-size="5"
                        layout="total,prev, pager, next"
                        :total="total1"
                      >
                      </el-pagination>
                    </div>
                  </div>
                  <div class="left w555 ml10">
                    <div class="left-name">已选商品</div>
                    <div class="left-wrap">
                      <div class="left-item">
                        <div class="img-wrap">
                          <img class="img" src="" alt="" />
                          <div class="detail">ASIN：******* SKU**********</div>
                        </div>
                        <el-button
                          class="btn"
                          type="primary"
                          round
                          @click="remove"
                          >移除</el-button
                        >
                      </div>
                      <div class="left-item">
                        <div class="img-wrap">
                          <img class="img" src="" alt="" />
                          <div class="detail">ASIN：******* SKU**********</div>
                        </div>
                        <el-button class="btn" type="primary" round
                          >移除</el-button
                        >
                      </div>
                    </div>
                    <div class="page-btn">
                      <el-pagination
                        @current-change="handleCurrentChange(2)"
                        :current-page="currentPageAdd2"
                        small
                        layout="total,prev, pager, next"
                        :total="total2"
                      >
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-textarea" v-show="tabActiveName2 == 2">
                <div class="item">
                  <div class="name">
                    <span class="point">*</span> 选择一个店铺
                  </div>
                  <div class="bttom">
                    <el-select
                      v-model="adShop"
                      clearable
                      class="w555"
                      placeholder="请选择店铺"
                    >
                      <el-option
                        v-for="item in adShopList"
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
                    <span class="point">*</span> 选择一个listing页面
                  </div>
                  <div class="bttom">
                    <el-select
                      v-model="listing"
                      clearable
                      class="w555"
                      placeholder="请选择listing页面"
                    >
                      <el-option
                        v-for="item in listingList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="name">
            <span class="point">*</span> 广告组默认竞价（$）
          </div>
          <div class="bttom">
            <!-- <el-input
              class="w555"
              v-model="defaultbid"
              placeholder=""
            ></el-input> -->
            <el-input-number :precision="2" v-model="defaultbid" :controls="false" :min="0" controls-position="right" placeholder="最小值0.02"></el-input-number>
          </div>
        </div>
        <div class="item">
          <div class="name name-top">
            <span class="mr20 title">关键词投放</span>
            <el-switch
              v-model="keyDelivery"
              active-color="#5563cb"
              inactive-color="#e5e5e5"
            >
            </el-switch>
          </div>
          <div class="name">
            <span class="point">*</span>
            <span class="mr20">关键词/否定关键词添加</span>
          </div>
          <div class="bttom w555">
            <div class="key-delivery-wrap">
              <div class="key-delivery-list">
                <div class="key-delivery-item">
                  <div class="part w100">好吃的</div>
                  <div class="part w100 dblclick" @dblclick="handKeyDblclick">
                    <span v-if="!keyDeliveryNum">$18</span>
                    <el-input
                      v-focus
                      v-if="keyDeliveryNum"
                      autofocus
                      v-model="keyDeliveryNumInp"
                      @blur="handKeyDblclickBlur"
                    ></el-input>
                  </div>
                  <div class="part noborder w130">
                    <el-select v-model="keyVal" placeholder="请选择">
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
                    <el-select v-model="match" placeholder="请选择">
                      <el-option
                        v-for="item in matchOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="part icon-close" @click="keyDeliveryDel">
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
                    <el-select v-model="operate1Val" placeholder="请选择">
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
                        v-for="item in matchOptions"
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
        <div class="item">
          <div class="name name-top">
            <span class="mr20 title">商品投放</span>
            <el-switch
              v-model="shopDelivery"
              active-color="#5563cb"
              inactive-color="#e5e5e5"
            >
            </el-switch>
          </div>
          <div class="name">
            <span class="point">*</span>
            <span class="mr20">投放在分类/商品下</span>
          </div>
          <div class="bttom w555">
            <div class="shop-delivery-wrap">
              <div class="tabs md20">
                <div
                  class="tab"
                  :class="{ act: tabActiveName == 1 }"
                  @click="tabClick(1)"
                >
                  分类
                </div>
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
                    <div class="tab-left-item">
                      <div class="item-name">父类目/子类目1</div>
                      <div class="item-add">添加</div>
                    </div>
                  </div>
                  <div class="tab-list-page">
                    <div class="add-all">添加全部</div>
                    <el-pagination
                      small
                      @current-change="shopDeliveryPageChange"
                      :current-page="shopDeliveryPage"
                      :page-size="5"
                      layout="total,prev, pager, next"
                      :total="50"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <div class="tab-textarea" v-show="tabActiveName == 2">
                <el-input
                  type="textarea"
                  :rows="5"
                  v-model="shopDeliveryInp"
                  placeholder="请输入内容"
                  @keyup.enter="addShopDelivery"
                ></el-input>
              </div>
            </div>
            <div class="select-wrap mg20">
              <div class="select-name">已选分类/商品</div>
              <div class="select-list">
                <div class="select-top select-item">
                  <div class="sel-item">分类/商品</div>
                  <div class="sel-item">类型</div>
                  <div class="sel-item">使用广告组默认出价（双击修改）</div>
                  <div class="sel-item">操作</div>
                </div>
                <div class="select-item">
                  <div class="sel-item">B0711FG7S1</div>
                  <div class="sel-item">类型</div>
                  <div
                    class="sel-item themeColor"
                    @dblclick="shopHandKeyDblclick"
                  >
                    <span v-if="!shopDeliveryNum">$18</span>
                    <el-input
                      v-focus
                      v-if="shopDeliveryNum"
                      autofocus
                      v-model="shopDeliveryNumInp"
                      @blur="shopHandKeyDblclickBlur"
                    ></el-input>
                  </div>
                  <div class="sel-item themeColor">删除</div>
                </div>
              </div>
              <div class="select-list-page">
                <div class="del-all" @click="delShopAllDelivery">删除全部</div>
                <el-pagination
                  small
                  @current-change="selectDeliveryPageChange"
                  :current-page="selectDeliveryPage"
                  :page-size="5"
                  layout="total,prev, pager, next"
                  :total="50"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="item">
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
        </div> -->
        <div class="item">
          <div class="name"><span class="point"></span> 商品价格范围</div>
          <div class="bttom w555">
            <div class="two-inp">
              <el-input
                class=""
                v-model="shopMin"
                placeholder="min"
              ></el-input>
              <div class="line">-</div>
              <el-input
                class=""
                v-model="shopMax"
                placeholder="max"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point"></span> 星级评定</div>
          <div class="bttom">
            <el-select
              v-model="shopStarRating"
              clearable
              class="w555"
              placeholder="请选择星级评定"
            >
              <el-option
                v-for="item in shopStarRatingList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
      </div>
    </div>
    <div class="public" v-if="!isEdit">
         <el-button @click="nextFn" v-if="activestep != 2" type="primary" class="common">
        下一步</el-button
      >
      <el-button @click="publicFn" v-if="activestep == 2" type="primary" class="common">
        发布任务</el-button
      >
      <el-button class=" common commonborder" @click="publicSave" plain
        >保存草稿</el-button
      >
      <!-- <div class="pub-btn common" @click="nextFn" v-if="activestep != 2">
        下一步
      </div>
      <div class="pub-btn common" @click="publicFn" v-if="activestep == 2">
        发布任务
      </div>
      <div class="save common" @click="publicSave">保存草稿</div> -->
    </div>
    <!-- 文件上传 -->
    <upload-file-modal
      :parentDialogMediaLib="parentDialogMediaLib"
      @UploadFileModalClose="UploadFileModalClose"
      @UploadFileModalSure="UploadFileModalSure"
    />
  </div>
</template>

<script lang="ts">
import Progressbar from '../common/Progressbar.vue'
import UploadFileModal from '../common/UploadFileModal.vue'
import { defineComponent, getCurrentInstance, reactive, toRefs } from 'vue'

export default defineComponent({
  name: '',
  props: {},
  setup () {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties

    const state = reactive({
      isEdit: false,
      steps: ['01/基础配置', '02/广告系列配置', '03/广告格式'],
      activestep: 0,
      taskval: '',
      selstore: '',
      storeOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      adSeriesName: '',
      step2starttime: '',
      step2endtime: '',
      adBudgetInp: 0,
      adBrand: '',
      adadBrandList: [
        {
          value: '1',
          label: '品牌'
        }
      ],
      // step3: {
      tabActiveName1: 1,
      title: '',
      adOptimization: '',
      adOptimizationList: [
        {
          value: '1',
          label: '否'
        },
        {
          value: '2',
          label: '是'
        }
      ],
      parentDialogMediaLib: false,
      tabActiveName2: 1,
      commodity: '',
      commodityList: '',
      commodityInp: '',
      currentPageAdd1: 1,
      total1: 10,
      currentPageAdd2: 1,
      total2: 10,
      adShop: '',
      adShopList: [
        {
          value: '1',
          label: '店铺'
        }
      ],
      listing: '',
      listingList: [
        {
          value: '1',
          label: 'listing页面'
        }
      ],
      defaultbid: 0,
      keyDelivery: true,
      keyVal: '',
      keyValOptions: [
        {
          value: '1',
          label: '关键词'
        },
        {
          value: '2',
          label: '否定关键词'
        }
      ],
      keyDeliveryNum: false,
      keyDeliveryNumInp: 18,
      match: '',
      matchOptions: [
        {
          value: '1',
          label: '广泛匹配'
        },
        {
          value: '2',
          label: '词组匹配'
        },
        {
          value: '3',
          label: '精确匹配'
        }
      ],
      keyDeliveryInp: '',
      operate1Val: '',
      operate2Val: '',
      shopDelivery: true,
      tabActiveName: 1,
      shopDeliveryPage: 2,
      shopDeliveryInp: '',
      shopDeliveryNum: false,
      shopDeliveryNumInp: 18,
      selectDeliveryPage: 2,
      shopSelect: '',
      shopExclude: '',
      shopMin: '',
      shopMax: '',
      shopStarRating: '',
      shopStarRatingList: [
        {
          value: '0',
          label: '0星'
        },
        {
          value: '1',
          label: '1星'
        },
        {
          value: '2',
          label: '2星'
        },
        {
          value: '3',
          label: '3星'
        },
        {
          value: '4',
          label: '4星'
        },
        {
          value: '5',
          label: '5星'
        }
      ],
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
      channelId: 3
    })

    // 步骤切换
    const clilckstep = (val: number) => {
      state.activestep = val
    }
    // 发布保存
    const nextFn = () => {
      // 下一步
      state.activestep++
    }
    const publicFn = () => {
      //
    }
    const publicSave = () => {
      //
    }

    // 广告格式
    const adFormatTabClick = (val: number) => {
      //
      state.tabActiveName1 = val
    }
    // 选择文件上传
    const selectHandle = () => {
      state.parentDialogMediaLib = true
    }
    // 上传文件的modal关闭
    const UploadFileModalClose = (value: boolean) => {
      state.parentDialogMediaLib = value
    }
    const UploadFileModalSure = (value: boolean) => {
      state.parentDialogMediaLib = value
    }

    const adLandingPageClick = (val: number) => {
      //
      state.tabActiveName2 = val
    }
    const handleSearch = () => {
      //
    }
    const add = () => {
      //
    }
    const remove = () => {
      //
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
    const keyDeliveryDel = () => {
      //
    }
    const deleteAllKeyDelivery = () => {
      currentInstance
        .$confirm('是否删除所有?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          currentInstance.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          currentInstance.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    const keyDeliveryAdd = () => {
      //
    }

    // 关键词投放input双击
    const handKeyDblclick = () => {
      //
      console.log('handKeyDblclick')
      state.keyDeliveryNum = true
    }
    const handKeyDblclickBlur = () => {
      //
      state.keyDeliveryNum = false
    }
    // 商品投放input双击
    const shopHandKeyDblclick = () => {
      //
      console.log('handKeyDblclick')
      state.shopDeliveryNum = true
    }
    const shopHandKeyDblclickBlur = () => {
      //
      state.shopDeliveryNum = false
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
    const addShopDelivery = (val: number) => {
      //
      // console.log(123456)
      state.shopDeliveryInp = ''
    }
    const selectDeliveryPageChange = (val: number) => {
      //
    }
    const delShopAllDelivery = () => {
      currentInstance
        .$confirm('是否删除所有?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          currentInstance.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          currentInstance.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }

    return {
      ...toRefs(state),
      clilckstep,
      nextFn,
      publicFn,
      publicSave,
      adFormatTabClick,
      selectHandle,
      UploadFileModalClose,
      UploadFileModalSure,
      adLandingPageClick,
      handleSearch,
      add,
      remove,
      handleCurrentChange,
      keyDeliveryDel,
      deleteAllKeyDelivery,
      keyDeliveryAdd,
      handKeyDblclick,
      handKeyDblclickBlur,
      shopHandKeyDblclick,
      shopHandKeyDblclickBlur,
      tabClick,
      shopDeliveryPageChange,
      addShopDelivery,
      selectDeliveryPageChange,
      delShopAllDelivery
    }
  },
  components: {
    Progressbar,
    UploadFileModal
  }
})
</script>
<style lang="scss">
.az-sbad {
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
