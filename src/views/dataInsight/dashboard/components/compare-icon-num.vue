<template>
  <div class="compare-wrap">
    <img v-if="num>0" class="compare-tr-icon" src="../../../../assets/svg/trending-up.svg" alt="" />
    <img v-else class="compare-tr-icon" src="../../../../assets/svg/trending-down.svg" alt="" />
    <p class="compare-tr-num" :style="'color: '+ color">
      {{ num > 0 ? '+' : ''}}{{num}}%
    </p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: '',
  props: {
    num: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#000000'
    }
  },
  setup () {
    return {}
  }
})
</script>
<style lang="scss" scoped>
// 升降图标
.compare-wrap {
    position: absolute;
    bottom: 30px;
    right: 30px;
    text-align: center;
    .compare-tr-icon{
      width: 30px;
      height: 30px;
    }
    .compare-tr-num {
      margin-top: 10px;
      line-height: 0;
      font-size: 12px;
    }
  }
</style>
