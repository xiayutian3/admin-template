<template>
  <div class="yy-contet-wrap amDataOverview">
    <div class="operate">
      <el-popover
        placement="right-start"
        :width="460"
        trigger="manual"
        v-model:visible="isVisbSearch"
      >
        <template #reference>
          <el-button @click="isVisbSearch = !isVisbSearch">筛选条件<i class="el-icon-s-operation"></i></el-button>
        </template>
        <i class="el-icon-close" @click="isVisbSearch = false"></i>
        <ul class="search-inputs">
          <li>
            站点
            <el-select class="ml-10"  v-model="adSite" placeholder="请选择">
              <el-option
                v-for="item in adTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            店铺
            <el-select class="ml-10" v-model="adStore" placeholder="请选择">
              <el-option
                v-for="item in adTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            类型
            <el-select class="ml-10" v-model="adType" multiple placeholder="请选择">
              <el-option
                v-for="item in adTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            时间
            <el-date-picker
              class="ml-10"
              style="margin-right: 20px;"
              v-model="datePick"
              type="daterange"
              value-format="YYYY-MM-DD"
              unlink-panels
              :disabled-date="disabledDate"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :shortcuts="shortcutOptions"
            >
            </el-date-picker>
          </li>
          <li>
            对比
            <el-switch class="ml-10" v-model="isVsDatePick"></el-switch>
          </li>
          <li v-show="isVsDatePick">
            <el-date-picker
              style="margin-left: 42px;"
              v-model="datePick2"
              type="daterange"
              value-format="YYYY-MM-DD"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :disabled-date="disabledDate"
              :shortcuts="shortcutOptions"
            >
            </el-date-picker>
          </li>
        </ul>
        <div class="dialog-footer">
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </div>
      </el-popover>
      <span style="float: right;">
        <el-button @click="onExportExcel" :disabled="isDisabledExport"><i class="el-icon-download" />导出数据</el-button>
      </span>
    </div>
    <div class="titlebox">
      <span class="title">数据汇总</span>
      <span style="float: right;">
        <el-button @click="drawer = true">自定义标签<i class="el-icon-arrow-down"></i></el-button>
      </span>
    </div>
    <div class="data-box-view">
      <data-box
        ref="refDataBox"
        :dataList="curShowdataList"
        :curActiveIndex="curCheckTwoShow"
        @onActiveBoxShow="onActiveBoxShow"
        @delItemBox="delItemBox"
        >
      </data-box>
    </div>
    <div class="data-echart-line">
      <el-radio-group v-model="timeIntervalType" @change="onChangeTimeIntervalType">
        <el-radio-button :label="0">天</el-radio-button>
        <el-radio-button :label="1">周</el-radio-button>
        <el-radio-button :label="2">月</el-radio-button>
      </el-radio-group>
      <data-echart-line ref="reDataEchartLine"></data-echart-line>
    </div>
    <!-- 自定义box图表 -->
    <el-drawer
      title="自定义标签"
      modal-class="box-check-drawer"
      v-model="drawer"
      direction="rtl"
      :modal="false"
      :size="360"
      :before-close="handleCloseDrawer">
      <ul class='data-list'>
        <li v-for="(item, idx) in boxDataList" :key="idx">
          <span>{{item.title}}</span>
          <span><el-button round size="mini" @click="addItemBox(item)">添加</el-button></span>
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import towPickDate from '@/hooks/towPickDate'
import dataBox from './components/data-box.vue'
import dataEchartLine from './components/data-echart-line.vue'
export default defineComponent({
  components: { dataBox, dataEchartLine },
  name: 'AmDataOverview',
  setup () {
    const { datePick, datePick2, shortcutOptions } = towPickDate()
    const state = reactive({
      isDisabledExport: false,
      isVisbSearch: false,
      drawer: false,
      adSite: '',
      adStore: '',
      adType: [0],
      isVsDatePick: false,
      timeIntervalType: 0, // 图表时间间隔
      disabledDate (time: any) {
        return time.getTime() > Date.now()
      },
      curShowdataList: [] as any, // 当前显示的数据box列表
      curCheckTwoShow: [0, 1], // 当前显示所选的下标
      adTypeOptions: [
        { label: 'SP', value: 0 }
        // { label: 'SB', value: 1 },
        // { label: 'SD', value: 2 }
      ],
      boxDataList: [
        {
          title: '点击数',
          desc: '广告被点击的次数，Clicks',
          isShow: true,
          countNum: null,
          numSign: '',
          compareData: {
            countNum: null,
            cpercentage: 0
          }
        },
        {
          title: '广告花费',
          desc: '消耗的广告费用，Cost',
          isShow: true,
          countNum: null,
          numSign: '$',
          compareData: {
            countNum: null,
            cpercentage: 0
          }
        },
        {
          title: '转化金额',
          desc: '通过广告转化而来的金额，ConversionValue',
          isShow: true,
          countNum: null,
          numSign: '$',
          compareData: {
            countNum: null,
            cpercentage: 0
          }
        },
        {
          title: 'CPC',
          desc: '每次点击花费，单位$',
          isShow: true,
          countNum: null,
          numSign: '$',
          compareData: {
            countNum: null,
            cpercentage: 0
          }
        },
        {
          title: 'ACOS',
          desc: '广告花费/转化金额*100%',
          isShow: true,
          countNum: null,
          numSign: '%',
          compareData: {
            countNum: null,
            cpercentage: 0
          }
        },
        {
          title: 'ROAS',
          desc: '转化金额/广告花费',
          isShow: false,
          countNum: null,
          numSign: '',
          compareData: {
            countNum: null,
            cpercentage: 0
          }
        },
        {
          title: '每次转化花费',
          desc: '广告花费/转化订单数，单位$，CostPerConversion',
          isShow: true,
          countNum: null,
          numSign: '$',
          compareData: {
            countNum: null,
            cpercentage: 0
          }
        },
        {
          title: '展示数',
          desc: '广告曝光的次数，Impressions',
          isShow: true,
          countNum: null,
          numSign: '',
          compareData: {
            countNum: null,
            cpercentage: 0
          }
        },
        {
          title: '转化订单数',
          desc: '通过广告转化的订单数，Conversions',
          isShow: true,
          countNum: null,
          numSign: '',
          compareData: {
            countNum: null,
            cpercentage: 0
          }
        },
        {
          title: '点击率',
          desc: '点击数/展示数*100%，CTR',
          isShow: true,
          countNum: null,
          numSign: '%',
          compareData: {
            countNum: null,
            cpercentage: 0
          }
        },
        {
          title: '转化率',
          desc: '转化订单数/展示数*100%，CVR',
          isShow: true,
          countNum: null,
          numSign: '%',
          compareData: {
            countNum: null,
            cpercentage: 0
          }
        }
      ]
    })
    const initData = () => {
      // 默认初始5个
      state.curShowdataList = state.boxDataList.slice(0, 5)
    }
    initData()
    const onExportExcel = async () => {
      state.isDisabledExport = true
      // const params = {
      //   channelIds: state.adChannel.join(','),
      //   startTime: datePick.value[0] ? datePick.value[0] : '',
      //   endTime: datePick.value[1] ? datePick.value[1] : '',
      //   compareStartTime: datePick2.value[0] ? datePick2.value[0] : '',
      //   compareEndTime: datePick2.value[1] ? datePick2.value[1] : ''
      // }
      // await dashboardDataExport(params)
      state.isDisabledExport = false
    }
    // 头部搜索操作相关
    const onSearch = () => {
      //
      state.isVisbSearch = false
    }
    const onReset = () => {
      // 重置搜索
      state.adSite = ''
      state.adStore = ''
      state.adType = []
      datePick.value = []
      datePick2.value = []
    }
    // box-data 列表相关操作
    const handleCloseDrawer = () => {
      state.drawer = false
    }
    const onActiveBoxShow = (i: number) => {
      const isHaved = state.curCheckTwoShow.some((iNum: any) => iNum === i)
      if (isHaved) return false
      state.curCheckTwoShow.shift()
      state.curCheckTwoShow.push(i)
    }
    const addItemBox = (dataI: any) => {
      const isHaved = state.curShowdataList.some((i: any) => i.title == dataI.title)
      if (isHaved) {
        ElMessage({
          type: 'warning',
          message: '已添加'
        })
        return false
      }
      state.curShowdataList.push(dataI)
    }
    const delItemBox = (i: number) => {
      state.curShowdataList.splice(i, 1)
    }
    // echart 图表相关
    const onChangeTimeIntervalType = (val: any) => {
      console.log(val)
    }
    return {
      datePick,
      datePick2,
      shortcutOptions,
      ...toRefs(state),
      onExportExcel,
      handleCloseDrawer,
      onSearch,
      onReset,
      onActiveBoxShow,
      addItemBox,
      delItemBox,
      onChangeTimeIntervalType
    }
  }
})
</script>
<style lang="scss" scoped>
.amDataOverview{
  position: relative;
  ::v-deep(.el-drawer__body){
    height: 800px;
    overflow-y: auto;
  }
}
.operate{
  width: 100%;
  overflow: hidden;
}
.titlebox{
  margin: 56px 0 30px;
  .title{
    font-size: 23px;
    color: #2D2D2D;
  }
}
.data-box-view{
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #CCCCCC;

}
.data-echart-line{
  padding: 36px 0;
}
.data-list{
  box-sizing: border-box;
  width: 100%;
  li{
    box-sizing: border-box;
    padding: 0 16px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 56px;
    border: 1px solid #CCCCCC;
    border-radius: 4px;
  }
}
.el-icon-close{
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 14px;
  color: #666666;
  cursor: pointer;
  transition: all 0.4s;
}
</style>
<style lang="scss">
.search-inputs{
  padding: 10px 0 0 10px;
  width: 100%;
  min-height: 160px;
  li{
    margin-bottom: 20px;
  }
  .ml-10{
    margin-left: 10px;
  }
}
.dialog-footer{
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .el-button--primary{
    margin-right: 20px;
  }
}
.box-check-drawer{
  position: absolute !important;
  top: 80px !important;
  right: 18px !important;
  .el-drawer{
    box-shadow: 0px 4px 14px 2px rgba(0, 0, 0, 0.25);
    .el-drawer__body{
      padding: 0 18px;
    }
    #el-drawer__title{
      padding-left: 18px;
    }
  }
}
</style>
