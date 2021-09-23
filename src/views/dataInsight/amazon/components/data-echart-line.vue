<template>
  <div class="">
    <div id="yyDataLine"></div>
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
          data: ['降水量', '平均温度']
        },
        xAxis: [{
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }],
        yAxis: [{
          type: 'value',
          name: '',
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: '',
          axisLabel: {
            formatter: '{value} °C'
          }
        }
        ],
        series: [{
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
    }
    // 主渠道选择图形值
    const onRenderManyChannelShow = (val: any, isOneChannel: boolean) => {
      //
    }

    onMounted(() => {
      myChart = echarts.init(document.getElementById('yyDataLine') as HTMLElement)
      myChart.setOption(baseOption, true)
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
      onRenderManyChannelShow
    }
  }
})
</script>
<style lang="scss" scoped>
#yyDataLine{
  margin: 0 auto;
  width: 76vw;
  height:600px;
}
</style>
