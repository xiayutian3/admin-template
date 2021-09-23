<template>
  <div class="az-ad">
    <!-- <div class="yy-ad-top">
      <yy-breadcrumb :breadcrumbList="breadcrumbList"></yy-breadcrumb>
      <i
        class="el-icon-s-operation open-search"
        @click="handleSearchModal(true)"
      ></i>
      <el-button
        class="open-search title-btn"
        plain
        @click="handleSearchModal(true)"
      >
        <span class="condition">公用筛选</span>
        <i class="iconfont icon-a-NamesortTypeUserControl"></i>
      </el-button>
      <div class="search min-search" v-show="searchmodal">
        <i class="el-icon-close close" @click="handleSearchModal(false)"></i>
        <div class="top">
          <div class="top-item">
            <div class="acount">
              <span class="name">默认站点</span>
              <el-select
                v-model="defaultWebSite"
                clearable
                class="width240"
                placeholder="选择默认站点"
              >
                <el-option
                  v-for="item in defaultWebSites"
                  :key="item.shopAccount"
                  :label="item.shopName"
                  :value="item.shopAccount"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">默认店铺</span>
              <el-select
                v-model="defaultStore"
                clearable
                class="width240"
                placeholder="选择默认店铺"
              >
                <el-option
                  v-for="item in defaultStores"
                  :key="item.shopAccount"
                  :label="item.shopName"
                  :value="item.shopAccount"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">当前时区时间</span>
              <el-select
                v-model="timeZone"
                clearable
                class="width240"
                placeholder="选择当前时区时间"
              >
                <el-option
                  v-for="item in timeZones"
                  :key="item.shopAccount"
                  :label="item.shopName"
                  :value="item.shopAccount"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">时间范围</span>
              <el-date-picker
                class="dateselect"
                popper-class="date-style"
                v-model="defaultRuntime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <div class="bottom">
          <el-button type="primary" @click="searchFn">查询</el-button>
          <el-button @click="resetSearchFn">重置</el-button>
        </div>
      </div>
    </div> -->
    <div class="yy-ad-content">
      <div class="yy-ad-search">
        <div class="top-item">
          <div class="acount">
            <span class="name">站点</span>
            <el-select
              v-model="defaultWebSite"
              class="width240"
              placeholder="选择默认站点"
            >
              <el-option
                v-for="(item, idx) in webSitAndStoreOptions"
                :key="idx"
                :label="item.siteName"
                :value="item.site"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="top-item">
          <div class="acount">
            <span class="name">店铺</span>
            <el-select
              v-model="defaultStore"
              class="width240"
              placeholder="选择默认店铺"
            >
              <el-option
                v-for="(item, idx) in webSitAndStoreOptions"
                :key="idx"
                :label="item.storeName"
                :value="item.storeId"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- <div class="top-item">
          <div class="acount">
            <span class="name">时区</span>
            <el-select
              v-model="timeZone"
              clearable
              style="width: 120px;"
              placeholder="选择时区"
            >
              <el-option
                v-for="item in timeZones"
                :key="item.shopAccount"
                :label="item.shopName"
                :value="item.shopAccount"
              >
              </el-option>
            </el-select>
          </div>
        </div> -->
        <div class="top-item">
          <div class="acount">
            <span class="name">时间</span>
            <el-date-picker
              class="dateselect"
              popper-class="date-style"
              v-model="defaultRuntime"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="YYYY-MM-DD"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="ad-list">
        <div class="yy-ad-title">广告列表</div>
        <!-- <div class="ad-add" @click="adPublish">广告发布</div> -->
      </div>
      <list-tab
        :adtype="'amzn'"
        :listtabs="[2, 3, 4, 5]"
        @changeBusinessType="changeBusinessType"
        :tabsActiveIndex="tabsActiveIndex"
      ></list-tab>
      <!-- 广告活动页 -->
      <ad-active
      v-if="tabsActiveIndex == 2"
      :commonFilter="commonFilter"
      ></ad-active>
      <!-- 广告 -->
      <ad-list
        v-if="tabsActiveIndex == 4"
        :commonFilter="commonFilter"
      ></ad-list>
      <!-- 广告组 -->
      <ad-group
        v-if="tabsActiveIndex == 3"
        :commonFilter="commonFilter"
      ></ad-group>
      <!-- 投放 -->
      <ad-put
        v-if="tabsActiveIndex == 5"
        :commonFilter="commonFilter"
      ></ad-put>
      <!-- 否定投放 -->
      <no-delivery
        v-if="tabsActiveIndex == 6"
      ></no-delivery>
    </div>
  </div>
</template>

<script lang="ts">
// import { useRouter } from 'vue-router'
import router from '@/router'
// import { useStore } from 'vuex'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs,
  computed
} from 'vue'

// import YyBreadcrumb from '@/components/common/YyBreadcrumb.vue'
import { sendGetAmSiteAndStore } from '../common/action/getCommonDate'
import ListTab from '../common/ListTab.vue'
import AdActive from './components/AdActive.vue'
import noDelivery from './components/negativeDelivery-list.vue'
import adList from './components/ad-list.vue'
import AdGroup from './components/AdGroup.vue'
import AdPut from './components/AdPut.vue'

export default defineComponent({
  name: '',
  props: {},
  setup () {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties

    // const store = useStore()
    const state = reactive({
      tabsActiveIndex: 2, // 默认广告活动
      defaultWebSite: '',
      defaultStore: '',
      timeZone: '',
      defaultRuntime: '',
      defaultWebSites: [
        {
          shopAccount: '3349421960',
          shopName: '黄金糕'
        },
        {
          shopAccount: '3349421960',
          shopName: '双皮奶'
        }
      ],
      defaultStores: [
        {
          shopAccount: '3349421960',
          shopName: '黄金糕'
        },
        {
          shopAccount: '3349421960',
          shopName: '双皮奶'
        }
      ],
      webSitAndStoreOptions: [] as any,
      timeZones: [
        {
          shopAccount: '3349421960',
          shopName: '黄金糕'
        },
        {
          shopAccount: '3349421960',
          shopName: '双皮奶'
        }
      ],
      searchmodal: false

    })
    const resetCommon = () => {
      state.defaultWebSite = ''
      state.defaultStore = ''
      state.timeZone = ''
      state.defaultRuntime = ''
    }
    const searchFn = () => {
      // getData()
    }
    const resetSearchFn = () => {
      // collectResetSearchFn(state)
      resetCommon()
    }
    // 接收激活的Tab index
    const changeBusinessType = (val: number) => {
      state.tabsActiveIndex = val
    }
    const commonFilter = computed(() => {
      return {
        tabsActiveIndex: state.tabsActiveIndex,
        site: state.defaultWebSite,
        storeId: state.defaultStore,
        time: state.defaultRuntime
      }
    })
    const handleSearchModal = (val: boolean) => {
      state.searchmodal = val
    }
    // 获取站点
    const onSendGetAmSiteAndStore = () => {
      const params = {
        storeId: '',
        site: ''
      }
      sendGetAmSiteAndStore(state, params)
    }
    onSendGetAmSiteAndStore()
    return {
      ...toRefs(state),
      commonFilter,
      searchFn,
      resetSearchFn,
      handleSearchModal,
      changeBusinessType
    }
  },
  components: {
    ListTab,
    AdActive,
    noDelivery,
    adList,
    AdGroup,
    AdPut
  }
})
</script>
<style lang="scss">
.az-ad {
  height: 100%;
  .md10 {
    margin-left: 18px;
    margin-bottom: 10px;
  }

  .yy-ad-top {
    position: relative;
    // margin-bottom: 18px;
    // padding: 18px;
    // height: 220px;
    // background: #ffffff;
    // border-radius: 20px;
    // box-sizing: border-box;
    .open-search {
      position: absolute;
      top: 30px;
      right: 30px;
      .condition {
        margin-right: 5px;
        font-size: 16px;
      }
    }

    .search {
      &.min-search {
        position: absolute;
        top: 0;
        right: 0;
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
        right: 0;
        width: 800px;
      }
      padding: 18px;
      background: #ffffff;
      box-shadow: 0px 4px 14px 2px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      box-sizing: border-box;
      z-index: 2;
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
  .yy-ad-content {
    // padding: 15px;
    // max-width: 100%;
    padding-top: 18px;
    padding-bottom: 18px;
    height: 100%;
    // height: calc(100% - 238px);
    border-radius: 20px;
    box-sizing: border-box;
    background-color: #fff;
    // overflow-y: auto;
    // @include clearScrollbar();
    .ad-list {
      margin-bottom: 20px;
      margin-left: 18px;
      display: flex;
      align-items: center;
    }
    .yy-ad-title {
      font-size: 26px;
      color: #2d2d2d;
    }
    .yy-ad-search{
      padding: 0 18px 30px 18px;
      display: flex;
      .top-item{
        margin-right: 20px;
        .name{
          margin-right: 10px;
        }
      }
    }
    .ad-add {
      margin-left: 35px;
      width: 137px;
      height: 56px;
      line-height: 56px;
      font-size: 16px;
      text-align: center;
      color: #fff;
      background: $themeColor;
      border-radius: 30px;
      cursor: pointer;
    }
  }
  // .table-height {
  //   // height: 435px;
  //   // overflow-y: auto;
  //   // @include clearScrollbar();
  // }
}
.date-style {
  table th,
  table td {
    border: 0px;
    text-align: center;
  }
}
.metrics-popover {
  .metrics {
  }
  .wrap {
    .titles {
      .name {
        margin-right: 25px;
      }
      .tab-btn {
        &.el-button:hover {
          border-color: #dcdfe6;
          background-color: #fff;
        }
        &.el-button:focus {
          color: white;
          background-color: $themeColor;
        }
      }
    }
    .selects {
      margin-top: 15px;
      margin-bottom: 15px;
      display: flex;
      max-height: 250px;
      overflow-y: auto;
      // @include clearScrollbar();
      border-top: 1px solid #e1e1e1;
      border-bottom: 1px solid #e1e1e1;
      .left {
        width: 400px;
        padding: 20px;
        .title {
          margin-bottom: 20px;
          font-size: 16px;
          color: #333333;
        }
        .list {
          //  border-right:1px solid #ccc ;
          .metric-check {
            margin-right: 0;
            width: 50%;
          }
        }
      }
      .right {
        width: 200px;
        .right-sle {
          border-left: 1px solid #ccc;
          padding: 20px;
        }
        .title {
          margin-bottom: 20px;
          font-size: 16px;
          color: #333333;
        }
        .list {
          font-size: 14px;
          color: #333333;
        }
      }
    }
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>

<style>
.el-icon-edit{
  margin-left: 6px;
  cursor: pointer;
}
</style>
