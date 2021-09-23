<template>
  <div class="gg-task">
    <div class="yy-ad-top">
      <!-- <yy-breadcrumb :breadcrumbList="breadcrumbList"></yy-breadcrumb> -->
      <div class="open-search" @click="handleSearchModal(true)">
        <span class="condition">条件筛选</span>
       <i class="iconfont icon-a-NamesortTypeUserControl"></i>
      </div>
      <!-- <i
        class="el-icon-s-operation open-search"
        @click="handleSearchModal(true)"
      ></i> -->
      <div class="search" v-show="searchmodal">
        <i class="el-icon-close close" @click="handleSearchModal(false)"></i>
        <div class="top">
          <div class="top-item">
            <div class="acount">
              <span class="name">广告任务名称</span>
              <div class="ad-inp width240">
                <el-input
                  placeholder="关键词查询"
                  v-model="input"
                  suffix-icon="el-icon-search"
                  clearable
                >
                </el-input>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">广告账号</span>
              <el-select
                v-model="selectAdAcount"
                clearable
                class="width240"
                placeholder="全部"
              >
                <el-option
                  v-for="item in selOptionsAd"
                  :key="item.accountId"
                  :label="item.accountName"
                  :value="item.accountId"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">发布人</span>
              <el-select
                v-model="selectMan"
                clearable
                class="width240"
                placeholder="全部"
              >
                <el-option
                  v-for="item in selOptionsMan"
                  :key="item.id"
                  :label="item.userName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">广告状态</span>
              <el-select
                v-model="selectAdState"
                clearable
                class="width240"
                placeholder="全部"
              >
                <el-option
                  v-for="item in selOptionsAdState"
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
              <span class="name">发布时间</span>
              <div>
                <el-date-picker
                  class="dateselect"
                  popper-class="date-style"
                  v-model="opentime"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="YYYY-MM-DD"
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="top-item">
            <div class="acount">
              <span class="name">状态更新时间</span>
              <el-date-picker
                class="dateselect"
                popper-class="date-style"
                v-model="statetime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="left"></div>
          <div class="right">
            <el-button class="ad-btn" type="primary" @click="searchFn"
              >查询</el-button
            >
            <el-button class="ad-btn" @click="resetSearchFn">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="yy-ad-content">
      <div class="ad-list">
        <div class="yy-ad-title">广告任务</div>
        <!-- <div class="ad-add" @click="adPublish">广告发布</div> -->
      </div>
      <div class="list">
        <div class="yy-table-wrap table-traits">
          <el-table
            :data="tableData"
            stripe
            show-overflow-tooltip
            style="width: 100%"
            height="645"
          >
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column
              prop="taskName"
              label="广告任务名称"
              class-name="theme-color"
            >
            </el-table-column>
            <el-table-column prop="createUserName" label="发布人" width="180">
            </el-table-column>
            <el-table-column prop="accountName" label="广告账号名称">
            </el-table-column>
            <el-table-column prop="releaseTime" label="发布时间">
            </el-table-column>
            <el-table-column prop="statusUpdateTime" label="状态更新时间">
            </el-table-column>
            <el-table-column prop="taskStatus" label="任务状态">
              <template #default="scope">{{
                collectTaskFormatStatus(scope.row.taskStatus)
              }}</template>
            </el-table-column>
            <el-table-column class-name="operate" label="操作" width="214">
              <template #default="scope">
                <span @click="handleClick(scope.row)" class="btn">查看明细</span
                ><span @click="handleRemove(scope.row)" class="btn rt-btn"
                  >删除</span
                >
              </template>
            </el-table-column>
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
    </div>
    <yy-adbatchmodal
      :dialogTitle="'删除'"
      :dialogShow="3"
      :dialogVisible="dialogVisible"
      @dialogHandleClose="dialogHandleClose"
      @dialogHandleSure="dialogHandleSure"
    ></yy-adbatchmodal>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
// import YyBreadcrumb from '@/components/common/YyBreadcrumb.vue'
import YyPagination from '@/components/common/YyPagination.vue'
import YyAdbatchmodal from '@/components/common/YyAdbatchmodal.vue'
import {
  collectGetTaskDtate,
  collectGetAccountSelect,
  collectTaskResetSearchFn,
  collectTaskRemove,
  collectTaskFormatStatus,
  collectGetPubilshUser
} from '../common/action/index'

export default defineComponent({
  name: '',
  props: {},
  setup () {
    // const breadcrumbList = ['Google', '广告任务']
    const state = reactive({
      input: '',
      selectAdAcount: '',
      selOptionsAd: [] as any,
      selectMan: '',
      selOptionsMan: [] as any,
      selectAdState: '',
      selOptionsAdState: [
        {
          value: '1',
          label: '发布成功'
        },
        {
          value: '2',
          label: '发布失败'
        },
        {
          value: '3',
          label: '草稿'
        },
        {
          value: '4',
          label: '发布中'
        }
      ],
      opentime: [],
      statetime: [],
      tableData: [] as any,
      total: 0,
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 20,
      dialogVisible: false,
      searchmodal: false,
      channelId: 2,
      willDelItem: {} as any
    })

    const getTaskDtate = () => {
      collectGetTaskDtate(state)
    }
    // 搜索下拉
    const getAccountSelect = () => {
      collectGetAccountSelect(state)
      collectGetPubilshUser(state)
    }

    // 表格操作
    const handleClick = (item: any) => {
      // console.log('item: ', item)
      if (item.adType == 2) {
        // Google 搜索广告
        router.push({
          name: 'GgSearchad',
          params: { item: JSON.stringify(item) }
        })
      } else if (item.adType == 3) {
        // Google 购物广告
        router.push({
          name: 'GgShopad',
          params: { item: JSON.stringify(item) }
        })
      }
    }
    const handleRemove = (item: any) => {
      console.log('item: ', item)
      state.dialogVisible = true
      state.willDelItem = item
    }
    // 分页相关处理
    const handleSizeChange = (val: any) => {
      console.log('页size: ', val)
      state.pageSize = val
      // getTaskDtate()
      setTimeout(() => {
        getTaskDtate()
      }, 500)
    }
    const handleCurrentChange = (val: any) => {
      state.currentPage = val
      console.log('页码: ', val)
      // getTaskDtate()
      setTimeout(() => {
        getTaskDtate()
      }, 500)
    }
    // 模态框逻辑
    const dialogHandleClose = () => {
      console.log('132456')
      state.dialogVisible = false
    }
    const dialogHandleSure = () => {
      state.dialogVisible = false
      collectTaskRemove(state.willDelItem.id)
      setTimeout(() => {
        getTaskDtate()
      }, 500)
    }
    // 广告发布按钮
    const adPublish = () => {
      router.push({ name: 'GgSearchad' })
    }

    // 搜索框
    const handleSearchModal = (val: boolean) => {
      state.searchmodal = val
    }
    const searchFn = () => {
      //
      getTaskDtate()
    }
    const resetSearchFn = () => {
      collectTaskResetSearchFn(state)
    }
    // watch(
    //   () => state.statetime,
    //   (newVal, oldVal) => {
    //     console.log('newVal: ', newVal)
    //   })
    onMounted(() => {
      getTaskDtate()
      getAccountSelect()
    })

    return {
      ...toRefs(state),
      handleClick,
      handleRemove,
      handleSizeChange,
      handleCurrentChange,
      dialogHandleClose,
      dialogHandleSure,
      // breadcrumbList,
      adPublish,
      handleSearchModal,
      searchFn,
      resetSearchFn,
      collectTaskFormatStatus
    }
  },
  components: {
    // YyBreadcrumb,
    YyPagination,
    YyAdbatchmodal
  }
})
</script>
<style lang="scss">
.gg-task {
  height: 100%;
  .yy-ad-top {
    position: relative;
    // margin-bottom: 18px;
    // padding: 18px;
    // height: 220px;
    // background: #ffffff;
    // border-radius: 20px;
    // box-sizing: border-box;
    .open-search {
      display: flex;
      align-items: center;
      position: absolute;
      top: 30px;
      right: 30px;
      font-size: 20px;
      cursor: pointer;
      .condition {
        margin-right: 5px;
        font-size: 16px;
      }
    }
    .search {
      position: absolute;
      top: 0;
      right: 0;
      padding: 18px;
      width: 800px;
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
        .w500 {
          width: 500px;
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
          // margin-right: 36px;
          width: 240px;
          // .el-range-input {
          //   // background-color: #f5f5f5;
          // }
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .right {
          display: flex;
        }
        .ad-btn {
          margin-left: 20px;
          width: 90px;
          height: 38px;
          .el-button {
            line-height: 38px;
          }
        }
      }
    }
  }
  .yy-ad-content {
    // padding: 15px;
    padding-top: 18px;
    padding-bottom: 18px;
    // height: calc(100% - 238px);
    height: 100%;
    border-radius: 20px;
    box-sizing: border-box;
    background-color: #fff;
    overflow-y: auto;
    @include clearScrollbar();
    .ad-list {
      margin-bottom: 35px;
      margin-left: 18px;
      display: flex;
      align-items: center;
    }
    .yy-ad-title {
      font-size: 30px;
      color: #2d2d2d;
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
    .list {
      .table-traits {
        // height: 572px;
        // overflow-y: auto;
        // @include clearScrollbar();
        // .el-table__row{
        //   height: 47px;
        // }
        .operate {
          // font-size:14px;
          .btn {
            color: $themeColor;
            cursor: pointer;
          }
          .rt-btn {
            margin-left: 20px;
          }
        }
      }
    }
  }
}
</style>
