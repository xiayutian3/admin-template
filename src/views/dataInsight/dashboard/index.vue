<template>
  <div class="data-show-dashboard yy-contet-wrap">
    <div class="header-inputs">
      <span class="mr-10">广告渠道</span>
      <el-select class="w-210" multiple v-model="adChannel" placeholder="请选择">
        <el-option
          v-for="item in channelOptions"
          :key="item.id"
          :label="item.channelName"
          :value="item.id">
        </el-option>
      </el-select>
      <span class="mr-10">时间</span>
      <el-date-picker
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
      <span class="mr-10">对比时间</span>
      <el-switch v-model="isVsDatePick" style="margin-right: 4px;"></el-switch>
      <el-date-picker
        v-if="isVsDatePick"
        v-model="datePick2"
        type="daterange"
        value-format="YYYY-MM-DD"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :disabled-date="vsDisabledDate"
        :shortcuts="shortcutOptions"
      >
      </el-date-picker>
      <span style="float: right;">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="onExportExcel" :disabled="isDisabledExport"><i class="el-icon-download" />导出数据</el-button>
      </span>
    </div>
    <div class="data-show-wrap" v-loading="loading">
      <div class="data-item">
        <p class="title">数据汇总</p>
        <data-box ref="refDataBox"></data-box>
      </div>
      <div class="data-item chart-wrap">
        <p class="title">按日期展示</p>
        <div class="controls">
          <el-select
            class="w-120"
            v-model="showTimeDate"
            @change="onChangShowTimeDate"
          >
            <el-option label="主时间段" value="main"></el-option>
            <el-option label="对比时间段" value="vsDate" :disabled="isShowVsBarAndLineDate"></el-option>
          </el-select>
          <el-checkbox v-model="isCheckOneChannel" @change="onChangOneChannel">单渠道对比指标</el-checkbox>
          <!-- 数据选择指标展示 -->
          <el-select
            class="w-130-vs"
            v-model="vsDate1"
            @change="onSelectChannelKey1"
          >
            <el-option v-for="i in vsSelectOption"
              :key="i.value"
              :label="i.label"
              :value="i.value">
            </el-option>
          </el-select>
          <span v-if="isCheckOneChannel">Vs</span>
          <el-select
            v-if="isCheckOneChannel"
            class="w-130-vs"
            v-model="vsDate2"
            @change="onSelectChannelKey2"
          >
            <el-option v-for="i in vsSelectOption"
              :key="i.value"
              :label="i.label"
              :value="i.value"
              :disabled="i.value == vsDate1">
            </el-option>
          </el-select>
          <el-select
            v-model="isBarOrLineVal"
            class="w-80"
            @change="onChangeBarOrLine"
          >
            <el-option label="折线图" value="line"></el-option>
            <el-option label="柱状图" value="bar"></el-option>
          </el-select>
        </div>
        <data-bar-line ref="refdataBarLine"></data-bar-line>
      </div>
      <div class="data-item">
        <p class="title">转化漏洞分析</p>
        <data-funnel ref="refDataFunnel"></data-funnel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  watch,
  computed,
  onMounted
} from 'vue'
import { ElMessage } from 'element-plus'
import towPickDate from '@/hooks/towPickDate'
import dataBox from './components/data-box.vue'
import dataBarLine from './components/data-echart-barline.vue'
import dataFunnel from './components/data-echart-funnel.vue'
import { getUserChannel, dashboarDataPool, dashboardDataExport, dashboardDataBarAndLine } from '@/api/dataInsight'
import { HttpResponse } from '@/interface/interface'
export default defineComponent({
  name: 'DataInsightDashboard',
  components: { dataBox, dataBarLine, dataFunnel },
  props: {},
  setup () {
    const { datePick, datePick2, shortcutOptions } = towPickDate()
    const state = reactive({
      loading: false,
      isDisabledExport: false,
      adChannel: [],
      isVsDatePick: false,
      isBarOrLineVal: 'line',
      showTimeDate: 'main', // 主时间还是 对比的世界数据
      isCheckOneChannel: false, // 是否单渠道的数据
      channelOptions: [],
      disabledDate (time: any) {
        return time.getTime() > Date.now()
      },
      vsDisabledDate (time: any) {
        return time.getTime() > Date.now()
      },

      vsDate1: 'cost',
      vsDate2: 'conversionValue',
      vsSelectOption: [
        { label: '广告花费', value: 'cost' },
        { label: '转化金额', value: 'conversionValue' },
        { label: '展示数', value: 'impressions' },
        { label: '转化订单数', value: 'conversions' },
        { label: '点击数', value: 'clicks' },
        { label: 'Cpc', value: 'cpc' },
        { label: 'Acos', value: 'acos' },
        { label: 'Roas', value: 'roas' },
        { label: '每次转化花费', value: 'costPerConversion' },
        { label: '点击率', value: 'ctr' },
        { label: '转化率', value: 'cvr' }
      ]

    })
    watch(() => state.isVsDatePick, (newValue, oldValue) => {
      if (!newValue) {
        datePick2.value = []
      }
    }, { immediate: true, deep: true })
    // 获取数据
    const refDataBox = ref()
    const refDataFunnel = ref()
    const isShowVsBarAndLineDate = computed(() => {
      if (datePick2.value && datePick2.value.length && state.adChannel.length && state.isVsDatePick) { // 是否可使用对比时间段下拉
        return false
      } else {
        return true
      }
    })
    const getUserChannelList = async () => {
      const res = await getUserChannel() as HttpResponse
      state.channelOptions = res.data || []
      state.adChannel = res.data.map((item: any) => { return item.id })
      // 去请求图形数据
      getDashboarDataPool()
    }
    const getDashboarDataPool = async () => {
      if (!datePick.value.length || !state.adChannel.length) {
        ElMessage({
          type: 'warning',
          message: '请先选择渠道和时间'
        })
        return
      }
      state.loading = true
      const params = {
        channelIds: state.adChannel.join(','),
        startTime: datePick.value[0] ? datePick.value[0] : '',
        endTime: datePick.value[1] ? datePick.value[1] : '',
        compareStartTime: '',
        compareEndTime: ''
      }
      if (state.isVsDatePick) {
        params.compareStartTime = datePick2.value[0] ? datePick2.value[0] : ''
        params.compareEndTime = datePick2.value[1] ? datePick2.value[1] : ''
      }
      const res = await dashboarDataPool(params) as HttpResponse
      refDataBox.value.initData(res.data)
      refDataFunnel.value.initData(res.data)
      getDashboardDataBarAndLine()
      state.loading = false
    }
    const getDashboardDataBarAndLine = async () => {
      state.loading = true
      // 判断 showTimeDate: main  line 来请求不同时间数据
      const curdate = state.showTimeDate == 'main' ? datePick.value : datePick2.value
      const params = {
        channelIds: state.adChannel.join(','),
        startTime: curdate[0] ? curdate[0] : '',
        endTime: curdate[1] ? curdate[1] : ''
      }
      const res = await dashboardDataBarAndLine(params) as HttpResponse
      // 此处需要得到下拉选项数据??

      // 更改option数据传给子组件 刷新渲染
      refdataBarLine.value.onRefreshCanvasRenderer(res.data, state.isCheckOneChannel, state.vsDate1, state.vsDate2)
      state.loading = false
    }
    // 页面初始化
    const initFn = () => {
      getUserChannelList()
    }
    onMounted(() => {
      initFn()
    })
    // 头部操作
    const handleSearch = (row: any) => {
      if (state.isCheckOneChannel && state.adChannel.length != 1) {
        ElMessage({
          type: 'warning',
          message: '已勾选单渠道对比指标，请选择单个渠道后查询'
        })
        return false
      }
      console.log('row:==', datePick.value)
      getDashboarDataPool()
    }

    const onExportExcel = async () => {
      state.isDisabledExport = true
      const params = {
        channelIds: state.adChannel.join(','),
        startTime: datePick.value[0] ? datePick.value[0] : '',
        endTime: datePick.value[1] ? datePick.value[1] : '',
        compareStartTime: datePick2.value[0] ? datePick2.value[0] : '',
        compareEndTime: datePick2.value[1] ? datePick2.value[1] : ''
      }
      await dashboardDataExport(params)
      state.isDisabledExport = false
    }
    // 按时间展示相关操作
    const refdataBarLine = ref()
    const onChangeBarOrLine = (val: any) => {
      // 折线/柱状 图像切换
      refdataBarLine.value.onRefreshRenderBarOrLine(val)
    }
    const onChangShowTimeDate = (val: any) => {
      // 刷新柱状/折线图 视图数据
      getDashboardDataBarAndLine()
    }
    const onChangOneChannel = (val: any) => {
      if (val && state.adChannel.length != 1) {
        state.isCheckOneChannel = false
        ElMessage({
          type: 'warning',
          message: '请选择单个渠道后查询'
        })
        return false
      }
      getDashboardDataBarAndLine()
    }
    const onSelectChannelKey1 = (val: any) => {
      // if (state.vsDate2 == val) {
      //   state.vsDate2 = ''
      // }
      refdataBarLine.value.onRenderManyChannelShow(val, state.isCheckOneChannel)
    }
    const onSelectChannelKey2 = (val: any) => {
      refdataBarLine.value.onRenderOneChannelShow(val)
    }
    return {
      datePick,
      datePick2,
      shortcutOptions,
      ...toRefs(state),
      refDataBox,
      refDataFunnel,
      refdataBarLine,
      isShowVsBarAndLineDate,
      handleSearch,
      onExportExcel,
      // 折线/柱状图相关
      onChangeBarOrLine,
      onChangShowTimeDate,
      onChangOneChannel,
      onSelectChannelKey1,
      onSelectChannelKey2
    }
  }
})
</script>
<style lang="scss" scoped>
.header-inputs{
  margin-bottom: 20px;
}
.data-item{
  width: 100%;
  min-height: 290px;
  .title{
    font-size: 22px;
    color: #2D2D2D;
    line-height: 60px;
  }
}
.chart-wrap{
  border-top: 1px solid #CCCCCC;
  border-bottom: 1px solid #CCCCCC;
}
.mr-10{
  margin-right: 10px;
}
.w-210{
  margin-right: 20px;
  width: 210px;
}
.controls{
  position: relative;
  margin: 10px 0 20px 0;
  width: 100%;
  height: 42px;
  overflow: hidden;
}
.w-120{
  margin-right: 20px;
  width: 120px;
}
.w-130-vs{
  margin: 0 20px;
  width: 130px;
}
.w-80{
  position: absolute;
  top: 0;
  right: 10px;
  width: 100px;
}
</style>
