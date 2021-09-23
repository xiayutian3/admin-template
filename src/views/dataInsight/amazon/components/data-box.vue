<template>
  <div class="data-box">
    <div class="data-box-item" v-for="(item, index) in dataList" :key="index" @click="onActiveBoxShow(index)">
      <i class="el-icon-error" @click.stop="delItemBox(index)"></i>
      <div class="title-step"
        :class="curActiveIndex[0] == index? 'title-step-blue': curActiveIndex[1] == index? 'title-step-yellow' :''"
      >
      </div>
      <div class="title-name">
        <span>{{ item.title }}</span>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: '',
  props: {
    dataList: {
      type: Array,
      default: () => [] as any
    },
    curActiveIndex: {
      type: Array
    }
  },
  setup (props, ctx) {
    const data = reactive({
      isShowVs: false
    })
    const onActiveBoxShow = (i: number) => {
      ctx.emit('onActiveBoxShow', i)
    }
    const delItemBox = (i: number) => {
      // 删除单个
      ctx.emit('delItemBox', i)
    }
    return {
      ...toRefs(data),
      onActiveBoxShow,
      delItemBox
    }
  }
})
</script>
<style lang="scss" scoped>
.data-box {
  padding: 10px 0;
  margin-bottom: 20px;
  width: 100%;
  min-height: 140px;
  .data-box-item {
    position: relative;
    float: left;
    padding: 10px;
    margin: 0 1.4% 20px 0;
    width: 18.8%;
    height: 126px;
    border: 1px solid #cccccc;
    border-radius: 8px;
    transition: all 0.3s;
    .el-icon-error{
      display: none;
      position: absolute;
      top: -8px;
      right: -6px;
      font-size: 18px;
      color: #666666;
      cursor: pointer;
      transition: all 0.4s;
    }
    // 下次用flex
    &:nth-of-type(5){
      margin-right: 0;
    }
    &:nth-of-type(10){
      margin-right: 0;
    }
    &:hover {
      box-shadow: 0 0 4px 2px rgb(0 0 0 / 25%);
      .el-icon-error{
        display: block;
      }
    }
    .compare-tr-icon {
      width: 30px;
      height: 30px;
    }
    .title-step {
      width: 100%;
      height: 6px;
      border-radius: 8px;
      background-color: #CCCCCC;
    }
    .title-step-yellow {
      background-color: #FFAE00;
    }
    .title-step-blue {
      background-color: #5563CB;
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
