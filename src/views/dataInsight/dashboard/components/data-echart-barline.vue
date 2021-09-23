<template>
  <div class="">
    <div id="yyDataBar"></div>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  defineComponent,
  onMounted,
  onUnmounted
} from 'vue'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import {
  BarChart,
  LineChart
} from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
  CanvasRenderer
} from 'echarts/renderers'
// 注册必须的组件
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, BarChart, LineChart, CanvasRenderer, LegendComponent, ToolboxComponent]
)

export default defineComponent({
  name: '',
  setup (props) {
    const baseKeyWord: any = {
      cost: '广告花费',
      conversionValue: '转化金额',
      impressions: '展示数',
      conversions: '转化订单数',
      clicks: '点击数',
      cpc: 'Cpc',
      acos: 'Acos',
      roas: 'Roas',
      costPerConversion: '每次转化花费',
      ctr: '点击率',
      cvr: '转化率'
    }
    const baseOption = reactive(
      {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['蒸发量', '降水量', '平均温度']
        },
        xAxis: [{
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }],
        yAxis: [{
          type: 'value',
          name: ''
        // min: 0,
        // max: 250,
        // interval: 50,
        // axisLabel: {
        //   formatter: '{value} ml'
        // }
        },
        {
          type: 'value',
          name: ''
        // min: 0,
        // max: 25,
        // interval: 5,
        // axisLabel: {
        //   formatter: '{value} °C'
        // }
        }
        ],
        series: [{
          name: '蒸发量',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: '降水量',
          type: 'bar',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
          name: '平均温度',
          type: 'line',
          yAxisIndex: 1,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
        ]
      }
    )
    let myChart: any = null
    let currentMdSeriesata: any = {} // 接口数据源
    /**
     * 刷新渲染
     * @rendDate: 数据源
     * @isOneChannel: 是否单渠道内对比
     * @dataKey: 对比key1
     * @dataKey2: 对比key2
    */
    const onRefreshCanvasRenderer = (rendDate: any, isOneChannel: boolean, dataKey: string, dataKey2: string) => {
      // 数据形成 并存储便于数据赛选图形变换
      currentMdSeriesata = JSON.parse(JSON.stringify(rendDate))
      const oneNodeKeys = Object.keys(rendDate)
      const oneNodeDateArr = rendDate[oneNodeKeys[0]]
      const xAxisArr: any = oneNodeDateArr.map((item:any) => { return item.runTime })
      // 此处需分主 多个渠道还是 单个
      if (!isOneChannel) {
        baseOption.legend.data = oneNodeKeys
        baseOption.yAxis[0].name = baseKeyWord[dataKey]
        baseOption.yAxis[1].name = ''
        const mData: any = []

        oneNodeKeys.forEach(item => {
          // series 外层数据形成
          mData.push({
            name: item,
            type: 'line',
            yAxisIndex: 0,
            data: []
          })
        })
        // 取值单个key data
        mData.forEach((item: any, i: number) => {
          rendDate[item.name].forEach((iItem: any) => {
            mData[i].data.push(iItem[dataKey]) // iItem.cost 此处应该是动态key 初始化先直接取第一个cost
          })
        })
        baseOption.series = mData
      } else {
        baseOption.legend.data = [baseKeyWord[dataKey], baseKeyWord[dataKey2]]
        baseOption.yAxis[0].name = baseKeyWord[dataKey]
        baseOption.yAxis[1].name = baseKeyWord[dataKey2]
        const oneData: any = []

        baseOption.legend.data.forEach((item, i) => {
          // series 外层数据形成
          oneData.push({
            name: item,
            type: 'line',
            yAxisIndex: i == 0 ? 0 : 1,
            data: []
          })
        })
        oneNodeDateArr.forEach((item: any) => {
          oneData[0].data.push(item[dataKey])
          oneData[1].data.push(item[dataKey2])
        })
        baseOption.series = oneData
      }
      // 赋值设置
      baseOption.xAxis[0].data = xAxisArr
      console.log(baseOption, '期待的总数据--是否单个渠道：', isOneChannel)
      setTimeout(() => {
        myChart.clear()
        myChart.setOption(baseOption, true)
      }, 50)
    }
    // 主渠道选择图形值
    const onRenderManyChannelShow = (val: any, isOneChannel: boolean) => {
      if (!isOneChannel) {
        baseOption.series.forEach((i, j) => {
          baseOption.series[j].data = []
          // 取值单个key data
          currentMdSeriesata[i.name].forEach((iItem: any) => {
            baseOption.series[j].data.push(iItem[val]) // 动态取值汇总
          })
        })
        baseOption.yAxis[0].name = baseKeyWord[val]
      } else {
        // 置空2 对比的数据
        // baseOption.legend.data[1] = ''
        // baseOption.yAxis[1].name = ''
        // if (baseOption.series[1].data) {
        //   baseOption.series[1].data = []
        // }

        // 赋值1的新数据
        baseOption.legend.data[0] = baseKeyWord[val]
        baseOption.yAxis[0].name = baseKeyWord[val]
        const oneNodeKeys = Object.keys(currentMdSeriesata)
        const oneNodeDateArr = currentMdSeriesata[oneNodeKeys[0]]
        baseOption.series[0].name = baseKeyWord[val]
        baseOption.series[0].data = []
        oneNodeDateArr.forEach((item: any) => {
          baseOption.series[0].data.push(item[val])
        })
      }

      console.log('baseOption--m', baseOption)
      setTimeout(() => {
        myChart.clear()
        myChart.setOption(baseOption, true)
      }, 30)
    }
    // 单渠道对比处理
    const onRenderOneChannelShow = (val: any) => {
      baseOption.legend.data[1] = baseKeyWord[val]
      baseOption.yAxis[1].name = baseKeyWord[val]
      const oneNodeKeys = Object.keys(currentMdSeriesata)
      const oneNodeDateArr = currentMdSeriesata[oneNodeKeys[0]]
      baseOption.series[1].name = baseKeyWord[val]
      baseOption.series[1].data = []
      oneNodeDateArr.forEach((item: any) => {
        baseOption.series[1].data.push(item[val])
      })
      console.log('baseOption--0', baseOption)
      setTimeout(() => {
        myChart.clear()
        myChart.setOption(baseOption, true)
      }, 30)
    }
    // 折线/柱状 图像切换
    const onRefreshRenderBarOrLine = (val: string) => {
      baseOption.series.forEach((item, i) => {
        baseOption.series[i].type = val
      })
      setTimeout(() => {
        myChart.clear()
        myChart.setOption(baseOption, true)
      }, 30)
    }
    onMounted(() => {
      myChart = echarts.init(document.getElementById('yyDataBar') as HTMLElement)
      window.onresize = () => {
        myChart.resize()
      }
    })
    onUnmounted(() => {
      if (myChart) {
        myChart.dispose()
        window.onresize = null
      }
    })
    return {
      onRefreshCanvasRenderer,
      onRefreshRenderBarOrLine,
      onRenderManyChannelShow,
      onRenderOneChannelShow
    }
  }
})
</script>
<style lang="scss" scoped>
#yyDataBar{
  margin: 0 auto;
  width: 76vw;
  height:600px;
}
</style>
