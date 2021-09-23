<template>
  <div class="data-box">
    <template v-for="(item, index) in dataList" :key="index">
      <div class="data-box-item"
        v-show="item.isShow"
        >
        <div class="title-step" v-if="!isShowVs"></div>
        <div class="title-step" v-else :class="item.compareData.cpercentage <= 0 ? 'title-step-red' : 'title-step-green'">
        </div>
        <div class="title-name">
          <span v-if="item.title !== 'ACOS' && item.title !== 'ROAS'">{{ item.title }}</span>
          <el-select
            v-else
            v-model="aCOSOrROASVal"
            class="w-80"
            size="mini"
            @change="onChangeACOSOrROAS"
          >
            <el-option label="ACOS" value="ACOS"></el-option>
            <el-option label="ROAS" value="ROAS"></el-option>
          </el-select>
          <el-tooltip
            class="item"
            effect="dark"
            :content="item.desc"
            placement="right"
          >
            <i class="el-icon-info"></i>
          </el-tooltip>
        </div>
        <p class="them-num">{{item.numSign =="$"?"$":''}}{{ item.countNum }}{{item.numSign =="%"?"%":''}}</p>
        <p class="compare-tr-text" v-if="isShowVs">对比期 {{item.numSign =="$"?"$":''}}{{ item.compareData.countNum }}{{item.numSign =="%"?"%":''}}</p>
        <div class="compare-wrap" v-if="isShowVs">
          <img
            v-if="item.compareData.cpercentage > 0"
            class="compare-tr-icon"
            src="../../../../assets/svg/trending-up.svg"
            alt=""
          />
          <img
            v-else
            class="compare-tr-icon"
            src="../../../../assets/svg/trending-down.svg"
            alt=""
          />
          <p class="compare-tr-num"
          :class="item.compareData.cpercentage > 0 ? 'tr-num-green' : 'tr-num-red'">
            {{ item.compareData.cpercentage > 0 ? '+' : ''
            }}{{ item.compareData.cpercentage }}%
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: '',
  props: {},
  setup () {
    const data = reactive({
      aCOSOrROASVal: 'ACOS',
      isShowVs: false,
      dataList: [
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
    const onChangeACOSOrROAS = (val: any) => {
      if (val == 'ACOS') {
        data.dataList[3].isShow = true
        data.dataList[4].isShow = false
      } else {
        data.dataList[3].isShow = false
        data.dataList[4].isShow = true
      }
    }
    const initData = (dataSouce: any) => {
      const { original, comparison } = dataSouce
      // 原数据初始化
      data.dataList[0].countNum = original.cost
      data.dataList[1].countNum = original.conversionValue
      data.dataList[2].countNum = original.cpc
      data.dataList[3].countNum = original.acos
      data.dataList[4].countNum = original.roas
      data.dataList[5].countNum = original.costPerConversion
      data.dataList[6].countNum = original.impressions
      data.dataList[7].countNum = original.clicks
      data.dataList[8].countNum = original.conversions
      data.dataList[9].countNum = original.ctr
      data.dataList[10].countNum = original.cvr

      if (comparison) {
      // 对比数据/增长率 初始化
        data.dataList[0].compareData.countNum = comparison.cost
        data.dataList[0].compareData.cpercentage = dataSouce.costRiseRatio
        data.dataList[1].compareData.countNum = comparison.conversionValue
        data.dataList[1].compareData.cpercentage = dataSouce.conversionValueRiseRatio
        data.dataList[2].compareData.countNum = comparison.cpc
        data.dataList[2].compareData.cpercentage = dataSouce.cpcRiseRatio
        data.dataList[3].compareData.countNum = comparison.acos
        data.dataList[3].compareData.cpercentage = dataSouce.acosRiseRatio
        data.dataList[4].compareData.countNum = comparison.roas
        data.dataList[4].compareData.cpercentage = dataSouce.roasRiseRatio
        data.dataList[5].compareData.countNum = comparison.costPerConversion
        data.dataList[5].compareData.cpercentage = dataSouce.costPerConversionRiseRatio
        data.dataList[6].compareData.countNum = comparison.impressions
        data.dataList[6].compareData.cpercentage = dataSouce.impressionsRiseRatio
        data.dataList[7].compareData.countNum = comparison.clicks
        data.dataList[7].compareData.cpercentage = dataSouce.clicksRiseRatio
        data.dataList[8].compareData.countNum = comparison.conversions
        data.dataList[8].compareData.cpercentage = dataSouce.conversionsRiseRatio
        data.dataList[9].compareData.countNum = comparison.ctr
        data.dataList[9].compareData.cpercentage = dataSouce.ctrRiseRatio
        data.dataList[10].compareData.countNum = comparison.cvr
        data.dataList[10].compareData.cpercentage = dataSouce.cvrRiseRatio
        console.log('对比数据--', data.dataList)
        data.isShowVs = true
      } else {
        data.isShowVs = false
      }
    }
    return {
      ...toRefs(data),
      onChangeACOSOrROAS,
      initData
    }
  }
})
</script>
<style lang="scss" scoped>
.data-box {
  width: 100%;
  height: 300px;
  overflow: hidden;
  .data-box-item {
    position: relative;
    float: left;
    padding: 10px;
    margin: 0 1.4% 20px 0;
    // width: 286px;
    width: 18.8%;
    height: 126px;
    border: 1px solid #cccccc;
    border-radius: 8px;
    // 下次用flex
    &:nth-of-type(6){
      margin-right: 0;
    }
    &:nth-of-type(11){
      margin-right: 0;
    }
    .compare-tr-icon {
      width: 30px;
      height: 30px;
    }
    .title-step {
      width: 100%;
      height: 6px;
      border-radius: 8px;
      background-color: #5563CB;
    }
    .title-step-green {
      background-color: #058f02;
    }
    .title-step-red {
      background-color: #ab0505;
    }
    .title-name {
      margin-top: 10px;
      font-size: 16px;
      color: #757575;
      .el-icon-info {
        margin-left: 10px;
        color: #a5a5a5;
      }
      .w-80{
        width: 88px;
      }
    }
    .them-num {
      font-size: 28px;
      color: #19191d;
      font-weight: 900;
    }
    .compare-tr-text {
      font-size: 12px;
      color: #9696a0;
    }
    .compare-tr-num {
      margin-top: 10px;
      line-height: 0;
      font-size: 12px;
    }
    .tr-num-green {
      color: #058f02;
    }
    .tr-num-red {
      color: #ab0505;
    }
    .compare-wrap {
      position: absolute;
      bottom: 30px;
      right: 10px;
      text-align: center;
    }
  }
}
</style>
