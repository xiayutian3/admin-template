<template>
  <div class="file-info-view">
    <div class="" v-if="itemD.name">
      <img v-if="itemD.mediaType == 1"  :src="itemD.imageUrl" alt="" class="showBox">
      <video v-if="itemD.mediaType == 2"  controls="controls" class="showBox">
        <source :src="itemD.awsUrl" type="video/mp4">
        <source :src="itemD.awsUrl" type="video/ogg">
        <source :src="itemD.awsUrl" type="video/webm">
        您的浏览器不支持 video 标签。
      </video>
      <p>文件名：{{itemD.name}}</p>
      <p>文件大小：{{itemD.size/1000 + ' KB'}}
        <a :href="itemD.awsUrl" :download="itemD.name" target="_blank"><i class="el-icon-download"></i>下载</a>
        <!-- <el-button icon="el-icon-download" size="mini" @click="onDowload(itemD.guid, itemD.name, itemD.awsUrl)">下载</el-button> -->
      </p>
      <p>文件位置：{{itemD.catalog}}</p>
      <!-- <p>文件尺寸：{{itemD.size}}</p> -->
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'
import { materialDownload } from '@/api/toolCenter'
import { HttpResponse } from '@/interface/interface'
export default defineComponent({
  name: '',
  props: {
    itemD: {
      type: Object
    }
  },
  setup () {
    const onDowload = async (guid: string, name: string, path: string) => {
      await materialDownload({ guid })
      // const a = document.createElement('a') as any
      // document.body.appendChild(a)
      // a.href = path
      // a.style = 'display:none'
      // a.download = name
      // a.click()
    }
    return {
      onDowload
    }
  }
})
</script>
<style lang="scss" scoped>
.file-info-view {
  margin: 20px auto;
  width: 250px;
  height: 300px;
  .showBox{
    width: 240px;
    min-height: 240px;
    max-height: 460px;
    object-fit: cover;
  }
  p{
    font-size: 12px;
    line-height: 36px;
  }
}
</style>
