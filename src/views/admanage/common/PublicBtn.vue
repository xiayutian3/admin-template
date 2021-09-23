<template>
 <div class="public-btn">
      <el-button  class="common commonborder"  :disabled="disabledVal"   @click="publicSave" plain
        >保存草稿</el-button
      >
       <el-button @click="previousFn" v-if="activestep != 0" class="common" type="primary">
        上一步</el-button
      >
      <el-button @click="nextFn" :disabled="disabledVal" v-if="activestep != steps" class="common" type="primary">
        下一步</el-button
      >
      <el-button @click="publicFn" :disabled="disabledVal" v-if="activestep == steps" type="primary" class="common">
        发布广告</el-button
      >

      <!-- <div class="pub-btn common" @click="nextFn" v-if="activestep != 3">
        下一步
      </div>
      <div class="pub-btn common" @click="publicFn" v-if="activestep == 3">
        发布任务
      </div>
      <div class="save common" @click="publicSave">保存草稿</div> -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  props: {
    // 0 1 2 3
    steps: {
      type: Number,
      default: 3
    },
    activestep: {
      type: Number,
      default: 0
    },
    disabledVal: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 发布保存
    const nextFn = () => {
      emit('nextFn')
    }
    const previousFn = () => {
      emit('previousFn')
    }

    const publicFn = () => {
      //
      emit('publicFn')
    }

    const publicSave = () => {
      //
      emit('publicSave')
    }

    return {
      nextFn,
      previousFn,
      publicFn,
      publicSave
    }
  }
})
</script>
<style lang="scss">
  .public-btn{
    margin-top: 20px;
    // padding-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .common {
      width: 156px;
      height: 50px;
      font-size: 16px;
      // border-radius: 3px;
      // border: 1px solid $themeColor;
      // box-sizing: border-box;
      // text-align: center;
      // line-height: 50px;
      // cursor: pointer;
    }
    .commonborder {
      border: 1px solid $themeColor;
      color: $themeColor;
    }
    .pub-btn {
      color: #fff;
      background: $themeColor;
    }
    .save {
      margin-left: 20px;
      background: #ffffff;
      color: $themeColor;
    }
  }
</style>
