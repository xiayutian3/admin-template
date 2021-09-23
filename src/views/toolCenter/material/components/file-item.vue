<template>
  <div class="file-items-view">
    <el-checkbox-group
      @change="handleCheckChange"
      v-model="checkList"
    >
      <div
        class="item-box"
        :class="currentActiveItme.id == item.id ? 'item-box-active' : ''"
        v-for="(item, index) in soueceList"
        :key="index"
        @click="onGetClickItem(item)"
      >
        <el-checkbox :label="item.guid" @click.stop="()=>{}">{{''}}</el-checkbox>
        <!-- <el-image
          class="item-view"
          :src="item.imageUrl"
          :preview-src-list="[item.imageUrl]">
        </el-image> -->
        <img :src="item.imageUrl" alt="" class="item-view" />
        <!-- <video v-if="item.type == 'video'" :src="item.src" controls="controls" class="item-view">
          您的浏览器不支持 video 标签。
        </video> -->
        <div class="item-name">{{ item.name }}</div>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: '',
  props: {
    soueceList: {
      type: Array
    }
  },
  setup (props, ctx) {
    const state = reactive({
      currentActiveItme: {},
      checkList: []
    })
    const onGetClickItem = (data: any) => {
      state.currentActiveItme = data
      ctx.emit('onGetClickItem', data)
    }
    const handleCheckChange = (val: any) => {
      ctx.emit('onGeteleteItems', val)
    }
    const cleanCkeckList = () => {
      state.checkList = []
    }
    return {
      ...toRefs(state),
      onGetClickItem,
      handleCheckChange,
      cleanCkeckList
    }
  }
})
</script>
<style lang="scss" scoped>
.file-items-view {
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .item-box {
    position: relative;
    float: left;
    padding: 10px 0;
    margin-right: 28px;
    margin-bottom: 20px;
    width: 80px;
    height: 110px;
    text-align: center;
    border-radius: 4px;
    &:hover {
      cursor: pointer;
    }
  }
  .item-box-active {
    border: 1px solid #63c7ff;
  }
  .item-view {
    width: 72px;
    height: 56px;
    border-radius: 4px;
    ::v-deep(.el-image__inner){
      object-fit: cover;
    }
  }
  .item-name {
    display:-webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow : hidden;
    width: 72px;
    height: 36px;
    font-size: 12px;
    line-height: 36px;
    text-overflow: ellipsis;
  }
}
::v-deep(.el-checkbox){
  position: absolute;
  left: 4px;
  top: 6px;
}
</style>
