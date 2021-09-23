<template>
    <div class="yy-pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          :layout="layout"
          :total="total"
        >
        </el-pagination>
      </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: '',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  setup (props, { emit }) {
    // const state = reactive({
    //   total: 0,
    //   currentPage: 1,
    //   pageSizes: [10, 20, 50, 100],
    //   pageSize: 20
    // })
    // const { total } = toRefs(props)
    // state.total = total

    // 分页相关的逻辑
    const handleSizeChange = async (val: any) => {
      console.log(`每页 ${val} 条`, typeof val)
      // state.pageSize = val
      // 应该聚合所有的分页参数
      emit('handleSizeChange', val)
    }
    const handleCurrentChange = async (val: any) => {
      console.log(`当前页: ${val}`)
      // state.currentPage = val
      // 应该聚合所有的分页参数
      emit('handleCurrentChange', val)
    }
    return {
      // ...toRefs(state),
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style lang="scss">
.yy-pagination {
  margin-top: 10px;
  padding-right: 8px;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
}
</style>
