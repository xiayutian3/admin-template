<template>
  <div class="ad-progress-bar">
    <div class="list">
      <div class="item" v-for="(item,index) in steps" :key="'step'+index" :class="{'act':activestep >= index}" @click="clilckstep(index)">{{item}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  props: {
    steps: {
      type: Array,
      default: () => []
    },
    activestep: {
      type: Number,
      default: 0
    }
  },
  setup (props, { emit }) {
    const clilckstep = (index:number) => {
      //
      emit('clilckstep', index)
    }
    return {
      clilckstep
    }
  }
})
</script>
<style lang="scss">
.ad-progress-bar{
  display:flex;
  .list{
    display:flex;
    border-radius: 20px;
    background:#fff;
    overflow: hidden;
    .item{
      width: 220px;
      height:78px;
      line-height: 78px;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
    }
    .act{
      color: #fff;
      background:$themeColor;
    }
  }
}
</style>
