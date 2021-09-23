<template>
  <div class="az-ad">
    <div class="yy-ad-content">
      <div class="yy-ad-search">
        <div class="searchs">
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
        <div class="set-config">
          <span class="name" @click="onShowChildSetView">修改设置 <i class="el-icon-s-tools"></i> </span>
        </div>
      </div>
      <div class="ad-list">
        <div class="yy-ad-title">广告详情</div>
      </div>
      <list-tab
        :adtype="'amzn'"
        :listtabs="[3, 4]"
        :tabsActiveIndex="tabsActiveIndex"
        @changeBusinessType="changeBusinessType"
      ></list-tab>
      <!-- 广告组 -->
      <ad-group
        v-if="tabsActiveIndex == 3"
        :commonFilter="commonFilter"
      ></ad-group>
      <!-- 广告 -->
      <ad-list
        v-if="tabsActiveIndex == 4"
        :commonFilter="commonFilter"
        ref="refAdList"
      ></ad-list>
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
  reactive,
  ref,
  toRefs,
  computed
} from 'vue'

import { sendGetAmSiteAndStore } from '../common/action/getCommonDate'
import ListTab from '../common/ListTab.vue'

import adList from './detailComponents/ad.vue'
import AdGroup from './detailComponents/AdGroup.vue'

export default defineComponent({
  name: '',
  props: {},
  setup () {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties

    // const store = useStore()
    const state = reactive({
      tabsActiveIndex: 3, // 默认广告组
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
      webSitAndStoreOptions: [] as any,
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
    const changeBusinessType = (val: number) => {
      state.tabsActiveIndex = val
    }
    const handleSearchModal = (val: boolean) => {
      state.searchmodal = val
    }
    // 修改设置弹层调用
    const refAdList = ref()
    const onShowChildSetView = () => {
      switch (state.tabsActiveIndex) {
        case 4:
          refAdList.value.openSetview()
          break
      }
    }
    const commonFilter = computed(() => {
      return {
        tabsActiveIndex: state.tabsActiveIndex,
        site: state.defaultWebSite,
        storeId: state.defaultStore,
        time: state.defaultRuntime
      }
    })
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
      commonFilter,
      refAdList,
      ...toRefs(state),
      changeBusinessType,
      searchFn,
      resetSearchFn,
      handleSearchModal,
      onShowChildSetView
    }
  },
  components: {
    ListTab,
    adList,
    AdGroup
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
      padding: 0 18px;
      width: 100%;
      margin-bottom: 20px;
    }
    .yy-ad-title {
      font-size: 26px;
      color: #2d2d2d;
    }
    .yy-ad-search{
      padding: 0 18px 30px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .searchs{
        display: flex;
      }
      .set-config{
        cursor: pointer;
        color: #666666;
        font-size: 16px;
      }
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
