<template>
  <el-dialog
    title="文件上传"
    :close-on-click-modal="false"
    v-model="dialogVisible"
    width="400px"
    :before-close="handleClose">
     <el-upload
      class="upload-demo"
      :disabled="isDisabled"
      drag
      :headers="upLoadheader"
      :data="fromDataParma"
      name='files'
      :limit="10"
      accept="image/*,video/*"
      :action="baseUrl + '/material/materialFile/upload'"
      :before-upload="beforeAvatarUpload"
      :on-success="handleSuccess"
      :before-remove="beforeRemove"
      :on-exceed="handleExceed"
      :file-list="fileList"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">
          只能上传 (jpg| png| bmp| tif| gif| JPEG| jpeg, mp4) 的图片/视频 文件，且每次上传总大小不能超过 100M
        </div>
      </template>
    </el-upload>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref
} from 'vue'
import { ElMessage } from 'element-plus'
import store from '@/store'
import config from '@/config'
export default defineComponent({
  // 定义抛出的事件名称
  emits: ['refreshData'],
  props: {
    fromDataParma: {
      type: Object
    }
  },
  setup (props, ctx) {
    const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
    const token = (store.state as any).user.loginuserInfo.token
    const upLoadheader = {
      // 'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token
    }
    const state = reactive({
      fileList: [],
      countNum: 0,
      stepNum: 0
    })
    const dialogVisible = ref(false)
    const isDisabled = ref(false)
    const handleClose = () => {
      state.countNum = 0
      state.stepNum = 0
      state.fileList = []
      isDisabled.value = false
      dialogVisible.value = false
    }
    const handleOpen = () => {
      state.countNum = 0
      state.stepNum = 0
      state.fileList = []
      isDisabled.value = false
      dialogVisible.value = true
    }
    // 上传相关限制
    const handleExceed = (files: any, fileList: any) => {
      ElMessage({
        type: 'error',
        showClose: true,
        message: `当前限制每次选择最多选择 10 个文件，本次选择了 ${files.length} 个文件`
      })
    }
    const beforeAvatarUpload = (file: any) => {
      isDisabled.value = true
      state.countNum = state.countNum + 1
      console.log('上传了-', state.countNum + '个文件')
      const isLt20M = file.size / 1024 / 1024 < 20
      // 大小校验
      if (!isLt20M) {
        ElMessage.error('单个文件上传大小不能超过 20MB!')
        return false
      }
      // 文件类型校验
      // eslint-disable-next-line no-irregular-whitespace
      const reg = /^.*\.(?:(jpg|bmp|png|tif|gif|JPEG|jpeg|mp4|flv|avi|rm|wmv))$/
      if (!reg.test(file.name)) {
        ElMessage.error(`不支文件名为：${file.name}的文件，请重新上传！`)
        handleClose()
        return false
      }
      return true
    }
    const handleSuccess = (response: any, file: any, fileList: any) => {
      // console.log('文件--信息', response, file, fileList)
      state.stepNum = state.stepNum + 1
      console.log(state.stepNum, '上传进度-', state.countNum)
      if (state.stepNum == state.countNum) {
        // 此处可以处理 上传失败的文件
        handleClose()
        ctx.emit('refreshData')
      }
    }
    const beforeRemove = () => {
      return false
    }
    return {
      baseUrl,
      ...toRefs(state),
      dialogVisible,
      isDisabled,
      upLoadheader,
      handleClose,
      handleOpen,
      handleExceed,
      beforeAvatarUpload,
      handleSuccess,
      beforeRemove
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
