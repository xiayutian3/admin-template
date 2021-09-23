<template>
  <div class="yyDataEchartFunnel">
    <ul>
      <li>
        <div class="item-left item-left-b">
          <svg width="500" height="100" viewBox="0 0 500 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H516V133H50L0 0Z" fill="#99A1E0"/>
          </svg>
          <div class="des-num1 des-left_50">
            <p>{{dataL[5].title}}</p>
            <p>{{dataL[5].countNum}}</p>
          </div>
          <numIcon v-if="isShowVs"  :num="dataL[5].compareData.cpercentage" color="#FFFFFF"></numIcon>
        </div>
        <div class="item-right item-right-b">
          <numIcon v-if="isShowVs"  :num="dataL[3].compareData.cpercentage" color="#FFFFFF"></numIcon>
          <div class="des-num1">
            <p>{{dataL[3].title}}</p>
            <p>{{dataL[3].countNum}}{{dataL[3].numSign}}</p>
          </div>
        </div>
      </li>
      <li>
        <div class="item-left ">
          <numIcon v-if="isShowVs"  :num="dataL[8].compareData.cpercentage"></numIcon>
          <div class="des-num2 des-left_80">
            <p>{{dataL[8].title}}</p>
            <p>{{dataL[8].countNum}}{{dataL[8].numSign}}</p>
          </div>
        </div>
        <div class="item-right">
          <numIcon v-if="isShowVs"  :num="dataL[2].compareData.cpercentage"></numIcon>
          <div class="des-num2">
            <p>{{dataL[2].title}}</p>
            <p>{{dataL[2].numSign}}{{dataL[2].countNum}}</p>
          </div>
        </div>
      </li>
      <li>
        <div class="item-left item-left-b">
          <svg width="410" height="100" viewBox="0 0 410 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H516V133H50L0 0Z" fill="#99A1E0"/>
          </svg>
          <numIcon v-if="isShowVs"  :num="dataL[6].compareData.cpercentage" color="#FFFFFF"></numIcon>
          <div class="des-num1 des-left_136">
            <p>{{dataL[6].title}}</p>
            <p>{{dataL[6].countNum}}</p>
          </div>
        </div>
        <div class="item-right item-right-b">
          <numIcon v-if="isShowVs"  :num="dataL[0].compareData.cpercentage" color="#FFFFFF"></numIcon>
          <div class="des-num1">
            <p>{{dataL[0].title}}</p>
            <p>{{dataL[0].numSign}}{{dataL[0].countNum}}</p>
          </div>
        </div>
      </li>
      <li>
        <div class="item-left">
          <numIcon v-if="isShowVs"  :num="dataL[9].compareData.cpercentage"></numIcon>
          <div class="des-num2 des-left_180">
            <p>{{dataL[9].title}}</p>
            <p>{{dataL[9].countNum}}{{dataL[9].numSign}}</p>
          </div>
        </div>
        <div class="item-right">
          <numIcon v-if="isShowVs"  :num="dataL[4].compareData.cpercentage"></numIcon>
          <div class="des-num2">
            <p>{{dataL[4].title}}
              <el-tooltip
                class="item"
                effect="dark"
                :content="dataL[4].desc"
                placement="right"
              >
                <i class="el-icon-info"></i>
              </el-tooltip>
            </p>
            <p>{{dataL[4].countNum}}{{dataL[4].numSign}}</p>
          </div>
        </div>
      </li>
      <li>
        <div class="item-left item-left-b">
          <svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H516V133H50L0 0Z" fill="#99A1E0"/>
          </svg>
          <numIcon v-if="isShowVs"  :num="dataL[7].compareData.cpercentage" color="#FFFFFF"></numIcon>
          <div class="des-num1 des-left_230">
            <p>{{dataL[7].title}}</p>
            <p>{{dataL[7].countNum}}</p>
          </div>
        </div>
        <div class="item-right item-right-b">
          <numIcon v-if="isShowVs"  :num="dataL[1].compareData.cpercentage" color="#FFFFFF"></numIcon>
          <div class="des-num1">
            <p>{{dataL[1].title}}</p>
            <p>{{dataL[1].numSign}}{{dataL[1].countNum}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import numIcon from './compare-icon-num.vue'
export default defineComponent({
  name: '',
  components: { numIcon },
  setup (props) {
    const state = reactive({
      isShowVs: false,
      dataL: [
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
          title: 'AOV',
          desc: '平均广告单价',
          isShow: false,
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

    const initData = (dataSouce: any) => {
      const { original, comparison } = dataSouce
      // 原数据初始化
      state.dataL[0].countNum = original.cost
      state.dataL[1].countNum = original.conversionValue
      state.dataL[2].countNum = original.cpc
      state.dataL[3].countNum = original.acos
      state.dataL[4].countNum = original.aov
      state.dataL[5].countNum = original.impressions
      state.dataL[6].countNum = original.clicks
      state.dataL[7].countNum = original.conversions
      state.dataL[8].countNum = original.ctr
      state.dataL[9].countNum = original.cvr

      if (comparison) {
      // 对比数据/增长率 初始化
        state.dataL[0].compareData.countNum = comparison.cost
        state.dataL[0].compareData.cpercentage = dataSouce.costRiseRatio
        state.dataL[1].compareData.countNum = comparison.conversionValue
        state.dataL[1].compareData.cpercentage = dataSouce.conversionValueRiseRatio
        state.dataL[2].compareData.countNum = comparison.cpc
        state.dataL[2].compareData.cpercentage = dataSouce.cpcRiseRatio
        state.dataL[3].compareData.countNum = comparison.acos
        state.dataL[3].compareData.cpercentage = dataSouce.acosRiseRatio
        state.dataL[4].compareData.countNum = comparison.aov
        state.dataL[4].compareData.cpercentage = dataSouce.aovRiseRatio
        // state.dataL[5].compareData.countNum = comparison.costPerConversion
        // state.dataL[5].compareData.cpercentage = dataSouce.costPerConversionRiseRatio
        state.dataL[5].compareData.countNum = comparison.impressions
        state.dataL[5].compareData.cpercentage = dataSouce.impressionsRiseRatio
        state.dataL[6].compareData.countNum = comparison.clicks
        state.dataL[6].compareData.cpercentage = dataSouce.clicksRiseRatio
        state.dataL[7].compareData.countNum = comparison.conversions
        state.dataL[7].compareData.cpercentage = dataSouce.conversionsRiseRatio
        state.dataL[8].compareData.countNum = comparison.ctr
        state.dataL[8].compareData.cpercentage = dataSouce.ctrRiseRatio
        state.dataL[9].compareData.countNum = comparison.cvr
        state.dataL[9].compareData.cpercentage = dataSouce.cvrRiseRatio
        // console.log('对比数据--', state.dataL)
        state.isShowVs = true
      } else {
        state.isShowVs = false
      }
    }
    return {
      ...toRefs(state),
      initData
    }
  }
})
</script>
<style lang="scss" scoped>
.yyDataEchartFunnel {
  margin: 20px 0;
  width: 100%;
  ul{
    margin: 0 auto;
    width: 900px;
    li{
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100px;
      border-bottom: 1px dashed #BDBDBD;
      >div{
        overflow: hidden;
        position: relative;
      }
      &:last-of-type{
        border-bottom: none;
      }
    }
  }
  .item-left{
    width: 500px;
  }
  .item-left-b{
    text-align: right;
  }
  .item-right{
    width: 316px;
  }
  .item-right-b{
    background-color: #828CD3;
  }
  .des-num1{
    position: absolute;
    left: 30px;
    top: 20px;
    color: #ffffff;
    text-align: left;
    p{
      line-height: 1.2;
      &:nth-of-type(1){
        font-size: 18px;
      }
      &:nth-of-type(2){
        font-size: 28px;
        font-weight: 800;
      }
    }
  }
  .des-num2{
    position: absolute;
    left: 30px;
    top: 20px;
    color: #000000;
    text-align: left;
    p{
      line-height: 1.2;
      &:nth-of-type(1){
        font-size: 16px;
      }
      &:nth-of-type(2){
        font-size: 22px;
        font-weight: 800;
      }
    }
  }
  .des-left_50{
    left: 50px;
  }
  .des-left_80{
    left: 80px;
  }
  .des-left_136{
    left: 136px;
  }
  .des-left_180{
    left: 180px;
  }
  .des-left_230{
    left: 230px;
  }
  // 修改elm ui
  .el-icon-info{
    margin-left: 4px;
    color: #a5a5a5;
  }
}
</style>
