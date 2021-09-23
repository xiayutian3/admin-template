<template>
  <div class="data-config">
    <div class="wrap">
                <div class="titles">
                  <span class="name">配置数据指标</span>
                  <!-- <el-button class="tab-btn" size="medium"
                      >广告系列</el-button
                    >
                    <el-button class="tab-btn" size="medium">广告组</el-button>
                    <el-button class="tab-btn" size="medium">广告组</el-button> -->
                </div>
                <div class="selects">
                  <div class="left">
                    <div class="title">全部选项</div>
                    <div class="list">
                      <el-checkbox-group v-model="metricLisChild">
                        <el-checkbox
                          v-for="(item, idx) in metricListArr"
                          :key="'metric' + idx"
                          class="metric-check"
                          :label="item"
                          :disabled="item.disabled"
                          >{{ item.name }}</el-checkbox
                        >
                        <!-- <el-checkbox label="复选框 B"></el-checkbox>
                          <el-checkbox label="复选框 C"></el-checkbox>
                          <el-checkbox label="禁用" disabled></el-checkbox>
                          <el-checkbox
                            label="选中且禁用"
                            disabled
                          ></el-checkbox> -->
                      </el-checkbox-group>
                    </div>
                  </div>
                  <div class="right">
                    <div class="right-sle">
                      <div class="title">已选</div>
                      <div class="list">
                        <div
                          v-for="(item, idx) in metricLisChild"
                          :key="'select' + idx"
                        >
                          <i class="el-icon-document"></i>
                          {{ item.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="btns">
                  <el-button type="primary" size="medium" @click="saveUserField"
                    >保存</el-button
                  >
                  <el-button size="medium">取消</el-button>
                </div>
              </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: '',
  props: {
    metricList: {
      type: Array,
      default: () => []
    },
    metricListArr: {
      type: Array,
      default: () => []
    }

  },
  setup (props, { emit }) {
    const metricLisChild = computed({
      get: () => props.metricList,
      set: val => {
        //
      }
    })
    const saveUserField = () => {
      //
    }
    return {
      metricLisChild,
      saveUserField
    }
  }
})
</script>
<style lang="scss">
.data-config{

}
</style>
