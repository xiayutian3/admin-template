<template>
  <div class="gg-search">
    <!-- @clilckstep="clilckstep" -->
    <progressbar
      class="mb18"
      :steps="steps"
      :activestep="activestep"
      @clilckstep="clilckstep"
    ></progressbar>
    <div class="yy-ad-top" v-show="activestep == 0">
      <!-- <yy-breadcrumb :breadcrumbList="breadcrumbList"></yy-breadcrumb> -->
      <div class="yy-ad-title w555">搜索广告</div>
      <div class="search">
        <div class="title">基础配置</div>
        <div class="bottom">
          <div class="inp-type type">
            <div class="name"><span class="point">*</span> 任务名称</div>
            <div class="part">
              <el-input
                class="inp"
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
                clearable
                class="w300"
                placeholder="请选择广告账号"
                @change="handleAdSelect"
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
            <div class="name">希望取得的效果</div>
            <div class="part">
              <el-select
                v-model="effect"
                clearable
                class="w300"
                placeholder="请选择希望取得的效果"
              >
                <el-option
                  v-for="item in effectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="inp-type type">
            <div class="name">网址</div>
            <div class="part">
              <el-input
                class="inp"
                v-model="website"
                placeholder="请输入网址"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ad-option" v-show="activestep == 1">
      <div class="yy-ad-title w555">搜索广告</div>
      <div class="title">广告系列配置</div>
      <div class="updown-wrap">
        <div class="top"><span class="point">*</span> 广告系列名称</div>
        <div class="btom">
          <el-input
            type="textarea"
            maxlength="100"
            placeholder="限100字符"
            v-model="textarea"
          >
          </el-input>
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
            <i class="iconfont icon-checkBox icon-local"></i>
              搜索网络（包含google搜索网络合作伙伴）
            </div>
            <div
              @click="toggleline(2)"
              class="internet w555 internet-rt"
              :class="{ 'internet-act': internetState == 2 }"
            >
            <i class="iconfont icon-checkBox icon-local"></i>
              展示广告网络（包含google展示广告网络）
            </div>
            <div
              @click="toggleline(3)"
              class="internet w555 internet-rt"
              :class="{ 'internet-act': internetState == 3 }"
            >
            <i class="iconfont icon-checkBox icon-local"></i>
              全部（搜索网络、展示广告网络）
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
              <span class="title"
                ><span style="color: #ff1c1c">*</span> 开启时间</span
              >
              <el-date-picker
                v-model="starttime"
                type="datetime"
                placeholder="选择日期时间"
                :disabled-date="disabledDate1"
              >
              </el-date-picker>
            </div>
            <div class="left right">
              <span class="title">结束时间</span>
              <el-date-picker
                v-model="endtime"
                type="datetime"
                placeholder="选择日期时间"
                :disabled-date="disabledDate2"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="updown-wrap">
        <div class="top">广告投放时间</div>
        <div class="btom">
          <div class="pickle">
            <el-select
              v-model="pickletime"
              clearable
              class="w555"
              placeholder="请选择投放时间"
            >
              <el-option
                v-for="item in pickleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="between-wrap w555">
              <div class="between">
                <el-time-select
                  class="w175"
                  placeholder="起始时间"
                  v-model="pickletStartTime"
                  start="00:00"
                  step="01:00"
                  end="24:00"
                >
                </el-time-select>
                <span class="to"></span>
                <el-time-select
                  class="w175"
                  placeholder="结束时间"
                  v-model="pickletEndTime"
                  start="00:00"
                  step="01:00"
                  end="24:00"
                  :minTime="pickletStartTime"
                >
                </el-time-select>
              </div>
              <el-button
                type="primary"
                class="add el-button38"
                @click="pickleListAdd"
                >添加</el-button
              >
              <span>基于账号时区</span>
            </div>
          </div>
          <div class="pickle-list">
            <el-tag
              v-for="tag in pickleTags"
              :key="tag.name"
              closable
              :type="tag.type"
              @close="deletePickleTag(tag)"
            >
              {{ tag.name }}
            </el-tag>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="updown-wrap">
        <div class="top"><span class="point">*</span> 地理位置</div>
        <div class="btom">
          <div class="location">
            <div class="left">
              <div class="top">
                <el-select
                  class="geoselect"
                  v-model="geoval"
                  placeholder="请选择"
                  clearable
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
                  v-model="geoinpval"
                  :fetch-suggestions="querySearchAsync"
                  value-key="canonicalName"
                  placeholder="请输入内容"
                  @select="handleSelect"
                  :trigger-on-focus="false"
                  clearable
                ></el-autocomplete>
                <!-- <el-button type="primary" @click="handleGeoInput">添加</el-button> -->
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
              <div class="mg20">
                <el-button type="primary" @click="handleGeoInput"
                  >添加</el-button
                >
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
      <div class="line"></div>
      <div class="updown-wrap">
        <div class="top"><span class="point">*</span> 语言</div>
        <div class="btom">
          <el-autocomplete
            class="w555"
            v-model="lang"
            :fetch-suggestions="querySearchAsyncLang"
            value-key="languageName"
            placeholder="请输入一种语言"
            @select="handleSelectLang"
            :trigger-on-focus="false"
          ></el-autocomplete>
        </div>
      </div>
      <div class="line"></div>
      <div class="updown-wrap">
        <div class="top"><span class="point"></span> 受众群体</div>
        <div class="btom">
          <div class="internet-wrap">
            <div
              @click="toggleiColonyState(2)"
              class="internet w555"
              :class="{ 'internet-act': icolonyState == 2 }"
            >
              <i class="iconfont icon-checkBox icon-local"></i>
              不使用受众定位
            </div>
            <div
              @click="toggleiColonyState(1)"
              class="internet w555 internet-rt"
              :class="{ 'internet-act': icolonyState == 1 }"
            >
            <i class="iconfont icon-checkBox icon-local"></i>
              使用受众定位
            </div>
          </div>
          <div class="colony">
            <!-- <div class="internet-wrap icolony1">
              <div
                @click="toggleiColonyState(2)"
                class="internet w265"
                :class="{ 'internet-act': icolonyState == 2 }"
              >
                不使用受众定位
              </div>
              <div
                @click="toggleiColonyState(1)"
                class="internet w265 internet-rt"
                :class="{ 'internet-act': icolonyState == 1 }"
              >
                使用受众定位
              </div>
            </div> -->
            <div class="icolony2-wrap icolony2-botom mg20">
              <div class="icolony2">
                <div class="icolony-title">
                  <span class="point" v-if="icolonyState == 1">*</span>
                  通过搜索添加
                </div>
                <div class="icolony-wrap">
                  <el-autocomplete
                    class="colony-inp w465"
                    v-model="searchinput"
                    :fetch-suggestions="querySearchAsyncSearch"
                    value-key="category"
                    placeholder="请输入受众标签"
                    @select="handleSelectSearch"
                    :trigger-on-focus="false"
                  ></el-autocomplete>
                  <el-button
                    type="primary"
                    class="el-button38"
                    @click="addIcolony3Tags(1)"
                    >添加</el-button
                  >
                </div>
              </div>
              <!-- <div class="icolony2-tags">
                <el-tag
                  v-for="tag in icolony2Tags"
                  :key="tag.name"
                  closable
                  @close="deleteIcolony2(tag)"
                  :type="tag.type"
                >
                  {{ tag.name }}
                </el-tag>
              </div> -->
            </div>
            <div class="icolony2-wrap">
              <!-- <div class="icolony2">
                <div class="icolony-title">通过浏览添加</div>
                <div class="icolony-wrap">
                    <el-autocomplete
                      class="colony-inp w465"
                      v-model="browseInput"
                      :fetch-suggestions="querySearchAsyncSearch"
                      value-key="category"
                      placeholder="请输入受众标签"
                      @select="handleSelectSearch"
                      clearable
                    ></el-autocomplete>
                  <el-button
                    type="primary"
                    class="el-button38"
                    @click="addIcolony3Tags"
                    >添加</el-button
                  >
                </div>
              </div> -->
              <div class="icolony2-tags">
                <div class="name">已添加</div>
                <el-tag
                  v-for="tag in icolony3Tags"
                  :key="tag.criteriaId"
                  closable
                  @close="deleteIcolony3(tag)"
                >
                  {{ tag.category }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="updown-wrap">
        <div class="top"><span class="point">*</span> 预算</div>
        <div class="btom">
          <el-input
            class="w540"
            v-model="budget"
            placeholder="请输入每天平均花费的金额"
            oninput="value=value.replace(/^0+/,'').replace(/[^\d]/g,'')"
          ></el-input>
          $
        </div>
      </div>
      <div class="line"></div>
      <div class="double-wrap">
        <div class="updown-wrap">
          <div class="top"><span class="point">*</span> 出价</div>
          <div class="btom">
            <el-select
              v-model="bid"
              clearable
              class="w555"
              placeholder="请选择出价"
            >
              <el-option
                v-for="item in bidOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="updown-wrap mt20">
          <div class="top">
            <span class="point">*</span> 设置每次点击费用的出价上限
          </div>
          <div class="btom">
            <el-input
              class="w540"
              v-model="bidinput"
              placeholder="请输入出价上限"
              oninput="value=value.replace(/^0+/,'').replace(/[^\d]/g,'')"
            ></el-input>
            $
          </div>
        </div>
      </div>
    </div>
    <div class="ad-series" v-show="activestep == 2">
      <div class="yy-ad-title w555">搜索广告</div>
      <div class="title">广告组配置</div>
      <div class="updown-wrap">
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
      <div class="updown-wrap">
        <div class="top">
          <span class="point">*</span>关键字
          <div class="caption">
            关键字 = 广泛匹配, "关键字" = 词组匹配, [关键字] = 完全匹配
          </div>
        </div>
        <div class="btom">
          <el-input
            maxlength="100"
            placeholder="输入或粘贴您的关键字，每行一个字词或词组"
            v-model="keyinput"
          >
          </el-input>
          <div class="key-warp">
            <el-select
              v-model="keyslect"
              clearable
              class="w465"
              placeholder="请选择出价"
            >
              <el-option
                v-for="item in keyslectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button type="primary" class="el-button38" @click="addkeyFn"
              >添加</el-button
            >
          </div>
          <div class="key-list">
            <div class="item">
              <div class="name">广泛匹配</div>
              <div class="wrap">
                <el-tag
                  v-for="(tag, idx) in keyWidelyArr"
                  :key="'Widely' + idx"
                  closable
                  @close="deleteKeyArr(1, tag)"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
            <div class="item">
              <div class="name">词组匹配</div>
              <div class="wrap">
                <el-tag
                  v-for="(tag, idx) in keyPhraseArr"
                  :key="'Phrase' + idx"
                  closable
                  @close="deleteKeyArr(2, tag)"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
            <div class="item">
              <div class="name">精确匹配</div>
              <div class="wrap">
                <el-tag
                  v-for="(tag, idx) in keyAccurateArr"
                  :key="'Accurate' + idx"
                  closable
                  @close="deleteKeyArr(3, tag)"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ad-series" v-show="activestep == 3">
      <div class="yy-ad-title w555">搜索广告</div>
      <div class="title">广告配置</div>
      <div class="updown-wrap">
        <div class="top"><span class="point">*</span>最终到达地址</div>
        <div class="btom">
          <el-input
            type="textarea"
            maxlength="100"
            placeholder="限100字符"
            v-model="endwhere"
          >
          </el-input>
        </div>
      </div>
      <div class="line"></div>
      <div class="updown-wrap">
        <div class="top"><span class="point">*</span> 标题</div>
        <div class="btom">
          <div class="input-wrap">
            <el-input
              class="title-input"
              v-model="titleinput"
              placeholder="请输入3-15个标题"
            ></el-input>
            <el-button
              type="primary"
              class="add el-button38 ml20"
              @click="adTitleAdd"
              >添加</el-button
            >
          </div>
          <div class="key-list">
            <div class="item">
              <div class="name">已添加标题</div>
              <div class="wrap">
                <el-tag
                  v-for="(tag, idx) in addtitleArr"
                  :key="'tagtitl' + idx"
                  closable
                  @close="deleteKeyArr(4, tag)"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="updown-wrap">
        <div class="top"><span class="point">*</span> 广告内容描述</div>
        <div class="btom">
          <div class="input-wrap">
            <el-input
              class="title-input"
              v-model="addetail"
              placeholder="请输入2-4个广告内容描述"
            ></el-input>
            <el-button
              type="primary"
              class="add el-button38 ml20"
              @click="adDetailAdd"
              >添加</el-button
            >
          </div>
          <div class="key-list">
            <div class="item">
              <div class="name">已添加描述</div>
              <div class="wrap">
                <el-tag
                  v-for="(tag, idx) in addetailArr"
                  :key="'detal' + idx"
                  closable
                  @close="deleteKeyArr(5, tag)"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import PublicBtn from '../common/PublicBtn.vue'
import Progressbar from '../common/Progressbar.vue'
import { collectGetAccountSelect } from '../common/action/index'
import {
  ggSearchInfo,
  ggSearchCampaign,
  ggSearchAdset,
  ggSearchAds,
  ggGeographicalPosition,
  ggLanguageCode,
  ggAudienList,
  ggSearchDetail
} from '@/api/admanage'
import { HttpResponse } from '@/interface/interface'
import {
  getKeyArray,
  validateKeyValFn,
  isEmptyObject,
  splitStrToArr,
  splitStrTimeToArr
} from '@/utils/utils'

export default defineComponent({
  name: '',
  props: {},
  setup () {
    const route = useRoute()
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties

    // const breadcrumbList = ['Google', '广告发布', '搜索广告']
    const state = reactive({
      taskval: '',
      selacount: '',
      selacountItem: '' as any,
      selOptionsAd: [] as any,
      effect: '1',
      effectOptions: [
        {
          value: '1',
          label: '网站访问次数'
        }
      ],
      website: '',
      textarea: '',
      internetState: 1,
      starttime: '',
      endtime: '',
      pickletime: '',
      pickleOptions: [
        {
          value: '1',
          label: '星期一'
        },
        {
          value: '2',
          label: '星期二'
        },
        {
          value: '3',
          label: '星期三'
        },
        {
          value: '4',
          label: '星期四'
        },
        {
          value: '5',
          label: '星期五'
        },
        {
          value: '6',
          label: '星期六'
        },
        {
          value: '7',
          label: '星期日'
        },
        {
          value: '8',
          label: '星期一到星期五'
        },
        {
          value: '9',
          label: '星期六到星期日'
        },
        {
          value: '10',
          label: '所有日期'
        }
      ],
      pickletStartTime: '',
      pickletEndTime: '',
      pickleTags: [] as any,
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
      geoinpval: '',
      geoinput: {} as any,
      includeTags: [] as any,
      excludeTags: [] as any,
      lang: '',
      langItem: {} as any,
      icolonyState: 1,
      searchinput: '',
      browseInput: '',
      searchBrowseItem: {} as any,
      // icolony2Tags: [
      //   { name: '标签一', type: '' },
      //   { name: '标签二', type: 'success' },
      //   { name: '标签三', type: 'info' },
      //   { name: '标签四', type: 'warning' }
      // ],
      icolony3Tags: [] as any,
      budget: '',
      bid: '',
      bidOptions: [
        {
          value: '1',
          label: '点击次数'
        }
      ],
      bidinput: '',
      adTypearea: '',
      keyinput: '',
      keyslect: '1',
      keyslectOptions: [
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
      keyWidelyArr: [] as any,
      keyPhraseArr: [] as any,
      keyAccurateArr: [] as any,
      addtitleArr: [] as any,
      addetailArr: [] as any,
      endwhere: '',
      titleinput: '',
      addetail: '',
      steps: ['01/基础配置', '02/广告系列配置', '03/广告组配置', '04/广告配置'],
      activestep: 0,
      channelId: 2,
      taskId: '',
      id: 'kl',
      disabledDate1 (time: any) {
        return time.getTime() < Date.now() - 3600 * 1000 * 24
      },
      disabledDate2 (time: any) {
        // return time.getTime() < (+dayjs(state.starttime) + 3600 * 1000 * 24)
        return time.getTime() < +dayjs(state.starttime)
      },
      disabledVal: false,
      detailObj: '' as any
    })

    const handleAdSelect = (item: any) => {
      // console.log('item: ', item)
      state.selacountItem = item
      state.selacount = item.accountName
    }
    // 投放网络切换
    const toggleline = (num: number) => {
      state.internetState = num
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
    // 广告投放时间 的 tag
    const deletePickleTag = (tag: any) => {
      state.pickleTags.splice(state.pickleTags.indexOf(tag), 1)
    }
    // 受众
    const toggleiColonyState = (num: number) => {
      state.icolonyState = num
    }
    // const deleteIcolony2 = (tag: any) => {
    //   state.icolony2Tags.splice(state.icolony2Tags.indexOf(tag), 1)
    // }
    const deleteIcolony3 = (tag: any) => {
      state.icolony3Tags.splice(state.icolony3Tags.indexOf(tag), 1)
    }
    // const addIcolony2Tags = (tag: any) => {
    //   //
    // }

    // 添加tag标签
    const addIcolony3Tags = (num: number) => {
      if (!state.searchinput) return
      //
      if (!state.searchBrowseItem) return
      if (num == 1) {
        const params = {
          ...state.searchBrowseItem
        }
        state.icolony3Tags.push(params)
      }
    }
    const addkeyFn = () => {
      //
      if (!state.keyinput) return
      switch (state.keyslect) {
        case '1':
          state.keyWidelyArr.push(state.keyinput)
          break
        case '2':
          state.keyPhraseArr.push(state.keyinput)
          break
        case '3':
          state.keyAccurateArr.push(state.keyinput)
          break
      }
    }
    // 广告组配置-关键词 删除
    const deleteKeyArr = (num: number, tag: any) => {
      switch (num) {
        case 1:
          state.keyWidelyArr.splice(state.keyWidelyArr.indexOf(tag), 1)
          break
        case 2:
          state.keyPhraseArr.splice(state.keyPhraseArr.indexOf(tag), 1)
          break
        case 3:
          state.keyAccurateArr.splice(state.keyAccurateArr.indexOf(tag), 1)
          break
        case 4:
          // 广告配置-已添加标题
          state.addtitleArr.splice(state.addtitleArr.indexOf(tag), 1)
          break
        case 5:
          // 广告配置-广告内容描述
          state.addetailArr.splice(state.addetailArr.indexOf(tag), 1)
          break
      }
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
      state.geoinput = item
    }
    // 语言 远程输入
    const querySearchAsyncLang = async (queryString: string, cb: any) => {
      if (!queryString) return
      const params = {
        languageName: queryString
      }
      const res = (await ggLanguageCode(params)) as HttpResponse
      // console.log('res:lang ', res)
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
    const handleSelectLang = (item: any) => {
      // console.log('item: ', item)
      state.langItem = item
    }

    // 通过搜索、浏览添加 远程输入
    const querySearchAsyncSearch = async (queryString: string, cb: any) => {
      if (!queryString) return
      const params = {
        category: queryString
      }
      const res = (await ggAudienList(params)) as HttpResponse
      // console.log('res:res.data ', res.data)
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
    const handleSelectSearch = (item: any) => {
      // console.log('item: ', item)
      state.searchBrowseItem = item
    }

    const handleGeoInput = () => {
      if (!state.geoinpval) return
      const params = {
        ...state.geoinput,
        name: state.geoinput.canonicalName
      }
      if (state.geoval == '1') {
        // 包含
        state.includeTags.push(params)
      } else {
        state.excludeTags.push(params)
      }
    }

    // 广告配置模块
    const adTitleAdd = () => {
      if (!state.titleinput) return
      //
      if (state.addtitleArr.length > 15) return
      const params = state.titleinput
      if (!state.addtitleArr.includes(params)) {
        state.addtitleArr.push(params)
        state.titleinput = ''
      }
    }
    const adDetailAdd = () => {
      if (!state.addetail) return
      //
      if (state.addetailArr.length > 4) return
      const params = state.addetail
      if (!state.addetailArr.includes(params)) {
        state.addetailArr.push(params)
        state.addetail = ''
      }
    }

    const resetData = () => {
      state.pickletime = ''
      state.pickletStartTime = ''
      state.pickletEndTime = ''
    }
    const switchTimetoNumber = (type: string) => {
      let res
      switch (type) {
        case '1':
          res = '星期一'
          break
        case '2':
          res = '星期二'
          break
        case '3':
          res = '星期三'
          break
        case '4':
          res = '星期四'
          break
        case '5':
          res = '星期五'
          break
        case '6':
          res = '星期六'
          break
        case '7':
          res = '星期日'
          break
        case '8':
          res = '星期一到星期五'
          break
        case '9':
          res = '星期六到星期日'
          break
        case '10':
          res = '所有日期'
          break
      }
      return res
    }
    // 广告投放时间添加
    const pickleListAdd = () => {
      if (
        !state.pickletStartTime ||
        !state.pickletEndTime ||
        !state.pickletime
      ) {
        currentInstance.$message({
          message: '请把时间填写完成',
          type: 'error'
        })
        return
      }
      const item = {
        name: `${switchTimetoNumber(state.pickletime)},${
          state.pickletStartTime
        }-${state.pickletEndTime}`,
        launchTimeType: state.pickletime,
        launchTime: `${state.pickletStartTime}-${state.pickletEndTime}`
      }
      state.pickleTags.push(item)
      resetData()
    }

    // 步骤请求
    const step0 = async () => {
      const flag = validateKeyValFn(['taskval', 'selacount'], state)
      if (flag) {
        currentInstance.$message({
          message: '请把必填字段填写完整',
          type: 'error'
        })
        return
      }
      //
      const params = {
        taskId: state.taskId,
        taskName: state.taskval,
        accountId: state.selacountItem.accountId,
        accountName: state.selacountItem.accountName,
        hopeEffect: state.effect,
        website: state.website
      }
      const res = (await ggSearchInfo(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.taskId = res.data.taskId
        state.activestep++
      }
    }
    const step1 = async () => {
      //
      const params = {
        campaignName: state.textarea,
        launchNet: state.internetState,
        startTime: state.starttime,
        endTime: state.endtime,
        launchTimeType: getKeyArray('launchTimeType', state.pickleTags).join(
          ','
        ),
        launchTime: getKeyArray('launchTime', state.pickleTags).join(','),
        includePosition: getKeyArray('criteriaId', state.includeTags).join(','),
        excludePosition: getKeyArray('criteriaId', state.excludeTags).join(','),
        includeOption: state.includeval,
        excludeOption: state.excludeval,
        language: state.langItem.criteriaId,
        isAudienceGroup: state.icolonyState,
        audienceGroup: getKeyArray('criteriaId', state.icolony3Tags).join(','),
        dailyBudgetValue: state.budget,
        bidStrategy: state.bid,
        bidStrategyValue: state.bidinput,
        taskId: state.taskId
      }
      const res = (await ggSearchCampaign(params)) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        state.activestep++
      }
    }
    //     const arrToString=(arr:any[])=>{
    // if(arr.length==0)return
    // if(arr.length==1){
    //   return
    // }
    //     }
    const step2 = async () => {
      //
      const params = {
        taskId: state.taskId,
        adsetName: state.adTypearea,
        widely: state.keyWidelyArr.join(','),
        phrase: state.keyPhraseArr.join(','),
        accurate: state.keyAccurateArr.join(',')
      }
      const res = (await ggSearchAdset(params)) as HttpResponse
      // console.log('res: ', res)
      if (res.code == 0) {
        state.activestep++
      }
    }
    const step3 = async (num: number) => {
      //
      const params = {
        taskId: state.taskId,
        address: state.endwhere,
        titleList: state.addtitleArr,
        desList: state.addetailArr,
        taskStatus: num
      }
      const res = (await ggSearchAds(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        router.push('/home/ggtaskad')
      }
    }

    const activestepFn = (num?: any) => {
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
          step3(num || 1)
          break
      }
    }
    // 发布保存
    const nextFn = (num?: any) => {
      // 下一步
      let validateKeyValFnArr: any[] = []
      switch (state.activestep) {
        case 0:
          validateKeyValFnArr = ['taskval', 'selacount']
          break
        case 1:
          validateKeyValFnArr = [
            'textarea',
            'starttime',
            'lang',
            'budget',
            'bid',
            'bidinput'
          ]
          break
        case 2:
          validateKeyValFnArr = ['adTypearea']
          break
        case 3:
          validateKeyValFnArr = ['endwhere', 'addtitleArr', 'addetailArr']
          break
      }
      let flag = validateKeyValFn(validateKeyValFnArr, state)
      // 第二步 判断非空
      if (state.activestep == 1) {
        if (state.includeTags.length == 0 && state.excludeTags.length == 0) {
          flag = true
        }
        // 开始时间大于30分
        if (+dayjs(state.starttime) < Date.now() + 0.5 * 3600 * 1000) {
          console.log('+dayjs(state.starttime) : ', +dayjs(state.starttime))

          currentInstance.$message({
            message: '开始时间必须大于当前时间30分钟以上',
            type: 'error'
          })
          return
        }
      }

      // 第三步 判断非空
      if (state.activestep == 2) {
        if (
          state.keyWidelyArr.length == 0 &&
          state.keyPhraseArr.length == 0 &&
          state.keyAccurateArr.length == 0
        ) {
          flag = true
        }
      }
      // 第四步 判断长度
      if (state.activestep == 3) {
        const addtitleArrLen = state.addtitleArr.length
        const keyAccurateArrLen = state.keyAccurateArr.length
        if (
          (addtitleArrLen > 15 || addtitleArrLen < 3) &&
          (keyAccurateArrLen < 2 || keyAccurateArrLen > 4)
        ) {
          flag = true
        }
      }

      if (flag) {
        currentInstance.$message({
          message: '请把必填字段填写完整,再进行下一步',
          type: 'error'
        })
        return
      }
      activestepFn(num)
    }
    const previousFn = () => {
      if (state.activestep) {
        state.activestep--
      }
    }
    const publicFn = () => {
      //
      nextFn(1)
    }
    const publicSave = () => {
      activestepFn(2)
      // currentInstance.$message.success({
      //   message: '保存成功',
      //   type: 'success'
      // })
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
          state.disabledVal = isBtnDisable(
            detailObj.advertisementInfo.launchStatus
          )
          break
        case 1:
          state.disabledVal = isBtnDisable(
            detailObj.advertisementCampaign.launchStatus
          )
          break
        case 2:
          state.disabledVal = isBtnDisable(
            detailObj.advertisementAdset.launchStatus
          )
          break
        case 3:
          state.disabledVal = isBtnDisable(
            detailObj.advertisementAds.launchStatus
          )
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
      const res = (await ggSearchDetail(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        //
        state.detailObj = res.data
        state.taskId = res.data.taskId
        // 步骤一
        if (res.data.advertisementInfo) {
          let tempObj = res.data.advertisementInfo
          let tempAccount: any = {
            accountId: tempObj.accountId,
            accountName: tempObj.accountName
          }
          state.taskval = tempObj.taskName
          state.selacount = tempObj.accountName
          state.selacountItem = tempAccount

          state.effect = tempObj.hopeEffect
          state.website = tempObj.website

          tempObj = null
          tempAccount = null
        }

        // 步二
        if (res.data.advertisementCampaign) {
          let tempObj = res.data.advertisementCampaign
          const launchTimeTypeArr = splitStrToArr(',', tempObj.launchTimeType)
          const launchTimeArr = splitStrTimeToArr(',', tempObj.launchTime)
          console.log('launchTimeArr: ', launchTimeArr)
          const pickleTagsArr = launchTimeTypeArr.map((item, index) => {
            const temp = {
              name: `${switchTimetoNumber(item)},${launchTimeArr[index][0]}-${
                launchTimeArr[index][1]
              }`,
              launchTimeType: item,
              launchTime: `${launchTimeArr[index][0]}-${launchTimeArr[index][1]}`
            }
            return temp
          })

          state.textarea = tempObj.campaignName
          state.internetState = tempObj.launchNet
          state.starttime = tempObj.startTime
          state.endtime = tempObj.endTime
          state.pickleTags = pickleTagsArr
          state.includeval = tempObj.includeOption
          state.excludeval = tempObj.excludeOption
          state.includeTags = tempObj.includePosition
          state.excludeTags = tempObj.excludePosition
          state.lang = tempObj.language.languageName
          state.langItem = tempObj.language
          state.icolonyState = tempObj.isAudienceGroup
          state.icolony3Tags = tempObj.audienceGroup
          state.budget = tempObj.dailyBudgetValue
          state.bid = tempObj.bidStrategy
          state.bidinput = tempObj.bidStrategyValue

          tempObj = null
        }
        // 步骤三
        if (res.data.advertisementAdset) {
          let tempObj = res.data.advertisementAdset

          state.adTypearea = tempObj.adsetName
          state.keyWidelyArr = splitStrToArr(',', tempObj.widely)
          state.keyPhraseArr = splitStrToArr(',', tempObj.phrase)
          state.keyAccurateArr = splitStrToArr(',', tempObj.accurate)

          tempObj = null
        }
        // 步骤四
        if (res.data.advertisementAds) {
          let tempObj = res.data.advertisementAds

          state.endwhere = tempObj.address
          state.addtitleArr = tempObj.titleList
          state.addetailArr = tempObj.desList

          tempObj = null
        }
      }
    }

    watchEffect(() => {
      if (isEmptyObject(route.params)) return
      ifDisabledFn(state.detailObj)
    })

    onMounted(() => {
      collectGetAccountSelect(state)
      getItemDetail()
    })

    return {
      ...toRefs(state),
      handleCloseTag,
      publicFn,
      publicSave,
      toggleline,
      // breadcrumbList,
      deletePickleTag,
      toggleiColonyState,
      // deleteIcolony2,
      deleteIcolony3,
      // addIcolony2Tags,
      addIcolony3Tags,
      addkeyFn,
      adTitleAdd,
      adDetailAdd,
      clilckstep,
      deleteKeyArr,
      nextFn,
      previousFn,
      pickleListAdd,
      querySearchAsync,
      handleSelect,
      handleGeoInput,
      querySearchAsyncLang,
      handleSelectLang,
      querySearchAsyncSearch,
      handleSelectSearch,
      handleAdSelect,
      ifDisabledFn
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
.gg-search {
  height: 100%;
  overflow-y: auto;
  @include clearScrollbar();
  .w555 {
    width: 555px;
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
              background-color: #f5f5f5;
            }
          }
          .w300 {
            width: 555px;
          }
        }
        .inp-type {
          .inp {
            width: 555px;
          }
        }
      }
    }
  }
  .ad-option {
    padding: 18px;
    // height: 1270px;
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
    .mt20 {
      margin-top: 20px;
    }
  }
  .updown-wrap {
    width: 555px;
    .top {
      position: relative;
      margin-bottom: 12px;
      .point {
        color: #ff1c1c;
      }
      .caption {
        position: absolute;
        top: 0;
        left: 80px;
        font-size: 14px;
        color: #666666;
      }
    }
    .btom {
      .w122 {
        width: 122px;
      }
      .w175 {
        width: 175px;
      }
      .w200 {
        width: 200px;
      }
      .w220 {
        width: 220px;
      }
      .w265 {
        width: 265px;
      }
      .w436 {
        width: 436px;
      }
      .w104 {
        width: 104px;
      }
      .w465 {
        width: 465px;
      }
      .w540 {
        width: 540px;
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
        margin-left: 60px;
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
      .internet-wrap {
        display: flex;
        flex-direction: column;
        // align-items: center;
        .internet-rt {
          margin-top: 20px;
          // margin-left: 60px;
        }
        .internet {
          position: relative;
          // width: 436px;
          height: 38px;
          line-height: 38px;
          text-indent: 18px;
          font-size: 14px;
          color: #333333;
          background: #fff;
          border: 1px solid #e1e1e1;
          border-radius: 3px;
          cursor: pointer;
        }
        .internet-act {
          // color: #ffffff;
          border: 1px solid #6a6d73;
          // background: $themeColor;
          .icon-local{
            color: $themeColor;
          }
        }
        .icon-local{
          position: absolute;
          right: 16px;
          top: 0;
          // color: $themeColor;
        }
      }
      .time-wrap {
        display: flex;
        flex-direction: column;
        .title {
          margin-right: 10px;
          font-size: 14px;
          color: #333333;
        }
        .right {
          margin-top: 20px;
          // margin-left: 77px;
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
            // margin-right: 20px;
            width: 468px;
            .el-input__inner {
              width: 100%;
            }
          }
          .list {
            display: flex;
            .title {
              flex-shrink: 0;
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
      .pickle {
        display: flex;
        flex-direction: column;
        align-items: center;
        .to {
          margin-left: 4px;
          margin-right: 4px;
        }
        .between-wrap {
          margin-top: 20px;
          display: flex;
          align-items: center;
        }
        .between {
          // margin-left: 20px;
          margin-right: 20px;
        }
        .add {
          margin-right: 20px;
        }
      }
      .pickle-list {
        margin-top: 15px;
        .el-tag {
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
      .colony {
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        // align-items: flex-start;
        .icolony1 {
          margin-bottom: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          // align-items:center;
          .internet-rt {
            margin-top: 0px;
          }
        }
        .icolony2-wrap {
          // margin-bottom: 20px;
          // flex-shrink: 0;
          // width: 470px;
        }
        .icolony2-botom {
          margin-bottom: 20px;
        }
        .icolony2 {
          display: flex;
          flex-direction: column;
          // align-items: center;
          .icolony-title {
            margin-bottom: 12px;
            flex-shrink: 0;
            font-size: 14px;
            color: #333333;
          }
          .point {
            color: #ff1c1c;
          }
          .icolony-wrap {
            display: flex;
          }
          .colony-inp {
            // margin-left: 20px;
            margin-right: 20px;
          }
        }
        .icolony3 {
        }
        .icolony2-tags {
          position: relative;
          margin-top: 15px;
          margin-left: 66px;
          .name {
            position: absolute;
            top: 2px;
            left: -64px;
          }
          .el-tag {
            margin-right: 10px;
            margin-bottom: 10px;
          }
        }
      }
      .title-input {
        &:first-child {
          margin-top: 0px;
        }
        margin-top: 10px;
      }
      .key-warp {
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
      }
      .key-list {
        .item {
          &:last-child {
            margin-bottom: 0px;
          }
          margin-bottom: 20px;
          display: flex;
          .name {
            padding-top: 5px;
            margin-right: 20px;
            flex-shrink: 0;
            font-size: 14px;
            line-height: 1;
          }
          .wrap {
            .el-tag {
              margin-right: 10px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .input-wrap {
        display: flex;
        .ml20 {
          margin-left: 20px;
          margin-bottom: 20px;
        }
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
  .el-button38 {
    height: 38px;
    min-height: 38px;
  }
  .mg20 {
    margin-top: 20px;
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
