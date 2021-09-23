<template>
  <div class="yy-list-tab">
    <div class="tabs">
      <el-button
        v-if="listtabs.includes(1)"
        class="tab-btn"
        :class="tabsActiveIndex == 1 ? 'primary' : ''"
        @click="changeBusinessType(1)"
        >
        <img class="tab-local" v-if="tabsActiveIndex == 1" :src="require('@/assets/svg/tab.svg')" alt="">
        广告组合
        </el-button
      >
      <el-button
        v-if="listtabs.includes(2)"
        class="tab-btn"
        :class="tabsActiveIndex == 2 ? 'primary' : ''"
        @click="changeBusinessType(2)"
        >
        <img class="tab-local" v-if="tabsActiveIndex == 2" :src="require('@/assets/svg/tab.svg')" alt="">
         {{adtype=="amzn"?'广告活动':'广告系列'}}
        </el-button
      >
      <el-button
        v-if="listtabs.includes(3)"
        class="tab-btn"
        :class="tabsActiveIndex == 3 ? 'primary' : ''"
        @click="changeBusinessType(3)"
        >
        <img class="tab-local" v-if="tabsActiveIndex == 3" :src="require('@/assets/svg/tab.svg')" alt="">
        广告组</el-button
      >
      <el-button
        v-if="listtabs.includes(4)"
        class="tab-btn"
        :class="tabsActiveIndex == 4 ? 'primary' : ''"
        @click="changeBusinessType(4)"
        >
        <img class="tab-local" v-if="tabsActiveIndex == 4" :src="require('@/assets/svg/tab.svg')" alt="">
        广告</el-button
      >

      <el-button
        v-if="listtabs.includes(5)"
        class="tab-btn"
        :class="tabsActiveIndex == 5 ? 'primary' : ''"
        @click="changeBusinessType(5)"
        >
        <img class="tab-local" v-if="tabsActiveIndex == 5" :src="require('@/assets/svg/tab.svg')" alt="">
        投放</el-button
      >

      <el-button
        v-if="listtabs.includes(6)"
        class="tab-btn"
        :class="tabsActiveIndex == 6 ? 'primary' : ''"
        @click="changeBusinessType(6)"
        >
        <img class="tab-local" v-if="tabsActiveIndex == 6" :src="require('@/assets/svg/tab.svg')" alt="">
        否定投放</el-button
      >
      <el-button
        v-if="listtabs.includes(7)"
        class="tab-btn"
        :class="tabsActiveIndex == 7 ? 'primary' : ''"
        @click="changeBusinessType(7)"
        >
        <img class="tab-local" v-if="tabsActiveIndex == 7" :src="require('@/assets/svg/tab.svg')" alt="">
        搜索词</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  // 广告组合 1  广告系列 2   广告组3  广告 4
  props: {
    adtype: {
      type: String,
      default: ''
    },
    tabsActiveIndex: {
      type: Number,
      default: 2
    },
    listtabs: {
      type: Array,
      default: () => [1, 2, 3]
    }
  },
  setup (props, { emit }) {
    const changeBusinessType = (val: number) => {
      emit('changeBusinessType', val)
    }
    return {
      changeBusinessType
    }
  }
})
</script>
<style lang="scss">
.yy-list-tab {
  .tabs {
      margin-bottom: 15px;
      margin-left: 18px;
      margin-right: 18px;
      padding-bottom: 18px;
      border-bottom: 1px solid $themeColor;
      .tab-btn {
        position: relative;
        margin-right: 20px;
        width: 156px;
        height: 50px;
        font-size: 16px;
        // &.el-button:hover {
        //   border-color: #dcdfe6;
        //   background-color: #000000;
        // }
        &.el-button:focus {
          color: white;
          background-color: $themeColor;
        }
        .tab-local{
          position: absolute;
          bottom: -25px;
          left: 50%;
          display: block;
          transform:translate3d(-50%, 0, 0);
          // width: 20px;
          // height: 20px;
        }
      }
      .primary {
        background-color: $themeColor;
        color: #ffffff;
      }
    }
}
</style>
