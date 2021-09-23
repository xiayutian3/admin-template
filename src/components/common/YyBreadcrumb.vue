<template>
   <div class="crumb-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="'breadcrumb' + index"
        >{{ item }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
// import { useStore } from 'vuex'
import {
// computed,
  defineComponent
} from 'vue'
export default defineComponent({
  name: '',
  props: {
    breadcrumbList: {
      type: Array,
      default: () => ['首页']
    }
  },
  setup () {
    // const store = useStore()
    // const breadcrumbList = computed(() => store.state.common.breadcrumbList)
    // console.log('breadcrumbList: ', breadcrumbList)
    return {
      // breadcrumbList: computed(() => store.state.common.breadcrumbList)
    }
  }
})
</script>
<style lang="scss">
// .crumb-wrap{}
</style>
