<template>
  <div class="upload-file-modal">
    <el-dialog
      :custom-class="'media-lib-wrap'"
      :show-close="false"
      v-model="dialogMediaLib"
      width="1080px"
      :close-on-click-modal="false"
    >
      <div class="media-lib">
        <div class="lib-top">
          <div class="top-title">素材库</div>
          <div class="top-center">
            <el-input
              class="w188 mr20"
              placeholder="请输入素材名称"
              suffix-icon="el-icon-search"
              v-model="mediaInp"
              @blur="mediaSortFn"
            >
            </el-input>
            <el-select
              class="w188 mr20"
              v-model="mediaVal"
              placeholder="请选择"
              @change="mediaSortFn"
            >
              <el-option
                v-for="item in mediaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <!-- <el-button
              type="primary"
              icon="el-icon-upload "
              @click="handleUpload"
              >上传文件</el-button
            > -->
          </div>
          <div class="top-close" @click="dialogMediaLibClose">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <div class="lib-bottom">
          <div class="left">
            <div class="filename">文件夹</div>
            <el-tree
              :data="treeData"
              :props="defaultProps"
              @node-click="handleNodeClick"
            >
              <template #default="{ node }">
                <span><i class="el-icon-folder"></i>{{ node.label }}</span>
              </template>
            </el-tree>
          </div>
          <div class="right">
            <div class="right-top">
              <div class="right-top-list">
                <el-checkbox-group v-model="pictureCheckList">
                  <div class="right-top-item" v-for="(item,index) in pictureShowList" :key="'pictureCheckList'+index">
                    <el-checkbox :label="item"></el-checkbox>
                    <img
                      class="right-folder"
                      :src="item.imageUrl"
                      :alt="item.name"
                      @click="handleSelectImg(item)"
                    />
                    <div class="right-item-name">{{item.name}}</div>
                  </div>
                  <!-- <div class="right-top-item">
                    <el-checkbox label="Google"></el-checkbox>
                    <img
                      @click="prePicture"
                      class="right-pic"
                      src="../../../assets/images/sea.png"
                      alt=""
                    />
                    <div class="right-item-name">Google</div>
                  </div> -->
                </el-checkbox-group>
                <!-- <div class="right-top-item">
              <img class="right-folder" src="../../../assets/images/folder.jpg" alt="">
              <div class="right-item-name">FacebookFacebook</div>
            </div>
            <div class="right-top-item">
              <img class="right-pic" src="../../../assets/images/sea.png" alt="">
              <div class="right-item-name">Facebook</div>
            </div> -->
              </div>
              <div class="right-top-pic" v-if="selectImg">
                <img
                  class="select-img"
                  :src="selectImg.imageUrl"
                  alt=""
                />
                <div class="select-img-msg">文件名：{{selectImg.name}}</div>
                <div class="select-img-msg">文件大小：{{formatKb(selectImg.size)}} <a :href="selectImg.imageUrl" target="_blank" rel="noopener noreferrer"><i class="el-icon-download"></i>下载</a></div>
                <div class="select-img-msg">文件位置：{{selectImg.catalog}}</div>
                <!-- <div class="select-img-msg">文件尺寸：300X200px</div> -->
              </div>
            </div>
            <div class="right-btom">
              <el-button type="primary" @click="dialogMediaLibSure"
                >确 定</el-button
              >
              <el-button @click="dialogMediaLibClose">取 消</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogMediaLib = false">取 消</el-button>
      <el-button type="primary" @click="dialogMediaLib = false">确 定</el-button>
    </span>
  </template> -->
    </el-dialog>
    <el-dialog
      title="文件上传"
      v-model="uploadModalShow"
      width="880px"
      :close-on-click-modal="false"
    >
      <div class="upload-files">
        <el-upload
          action="#"
          accept="image/*,video/*"
          list-type="picture-card"
          multiple
          :limit="10"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :on-success="handleSuccess"
          :before-upload="handleBeforeUpload"
          :auto-upload="false"
          class="upload-list-wrap"
        >
          <!-- //注释起来的
               // :auto-upload="false"
               // show-file-list
              // :auto-upload="false"
              //  :file-list="step4AdItem.fileList" -->

          <template #default>
            <i class="el-icon-plus"></i>
          </template>
          <template #file="{ file }">
            <div class="upload-item-wrap">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <div class="upload-item-name">{{ file.name }}</div>
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleUploadFn">取 消</el-button>
          <el-button type="primary" @click="handleUploadFn">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs,
  watch,
  watchEffect
} from 'vue'
import { materialCatalogList, materialList } from '@/api/toolCenter'
import { HttpResponse } from '@/interface/interface'
import { getYyTreeDTO } from '@/utils/utils'

export default defineComponent({
  name: '',
  props: {
    parentDialogMediaLib: {
      type: Boolean,
      default: false
    },
    uploadAdvertType: {
      type: String,
      default: '1'
    }
  },
  setup (props, { emit }) {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties

    const state = reactive({
      mediaInp: '',
      mediaVal: 0,
      mediaOptions: [
        {
          value: 0,
          label: '时间降序'
        },
        {
          value: 1,
          label: '时间升序'
        },
        {
          value: 2,
          label: '文件大小降序'
        },
        {
          value: 3,
          label: '文件大小升序'
        }
      ],
      treeData: [
        {
          catalog: '',
          label: '共享空间',
          children: []
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      pictureCheckList: [] as any,
      pictureShowList: [] as any,
      uploadModalShow: false,
      catalog: '',
      name: '',
      pageNo: 1,
      pageSize: 20,
      selectImg: '' as any
    })

    const dialogMediaLib = computed({
      get: () => props.parentDialogMediaLib,
      set: (val) => {
        // console.log('val: ', val)
        emit('update:modelValue', val)
      }
    })

    // 获取目录
    const getmaterialCatalogList = async () => {
      const res = await materialCatalogList() as HttpResponse
      if (res.code == 0) {
        const result = getYyTreeDTO(res.data) as []
        state.treeData[0].children = result
        // console.log('state.treeData[0]: ', state.treeData[0])
      }
    }

    // 获取文件列表信息
    const getCurrentList = async (item: any) => {
      const params = {
        isDesc: state.mediaVal,
        catalog: item.catalog,
        name: item.name,
        pageNo: state.pageNo,
        pageSize: state.pageSize
      }
      const res = await materialList(params) as HttpResponse
      console.log('文件列表: ', res)
      if (res.code == 0) {
        state.pictureShowList = res.data.list || []
      }
    }
    const handleSelectImg = (item: any) => {
      console.log('item: ', item)
      state.selectImg = item
    }
    const formatKb = (val: number):string => {
      if (val) {
        const res = val / 1000
        return res + 'kb'
      }

      return '0kb'
    }
    const mediaSortFn = () => {
      const params = {
        catalogName: state.mediaInp
      }
      getCurrentList(params)
    }

    // step4
    // 图片删除
    const handleUpload = () => {
      state.uploadModalShow = true
    }
    const handleUploadFn = () => {
      state.uploadModalShow = false
    }
    const handleRemove = (file: any) => {
      console.log(file)
    }
    const handleExceed = (files: string | any[], fileList: string | any[]) => {
      currentInstance.$message.warning(
        // + state.step4AdList.fileList.length
        `当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`
      )
    }
    const handleBeforeUpload = (file: any) => {
      console.log('beforeUploadfile', file)
      // fileList.push({
      //   name: 'food.jpeg',
      //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      // })
    }
    const handleSuccess = (response: any, file: any, fileList: any) => {
      console.log(123456)
      console.log(response, file, fileList)
      // state.step4AdList.fileList.push({
      //   name: 'food.jpeg',
      //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      // })
    }
    // 树形控件
    const handleNodeClick = (data: any) => {
      console.log(data)
      getCurrentList(data)
    }
    // 图片预览
    const prePicture = (value: any) => {
      console.log('value: ', value)
    }

    const dialogMediaLibClose = () => {
      // dialogMediaLib.value = false
      emit('UploadFileModalClose', false)
    }
    // // 判断是否为图片格式--img标签可打开的
    // const isImage = (str: any) => {
    //   if (!str) return false
    //   var reg = /\.(png|jpg|jpeg)$/
    //   return reg.test(str.toLowerCase())
    // }
    // const isMedia = (str: any) => {
    //   if (!str) return false
    //   var reg = /\.mp4$/
    //   return reg.test(str.toLowerCase())
    // }
    // // 判断上传图片或者视频
    // const ifPictureOrMedia = (type: any, selectList: any) => {
    //   let flag = false
    //   if (type == '1' || type == '3') {
    //     if (selectList.length > 0) {
    //     // 选择图片 1 图片  2视频
    //       selectList.forEach((item: any) => {
    //         if (item.mediaType == 2) {
    //         // 类型是媒体
    //           flag = true
    //         }
    //         if (!isImage(item.name)) {
    //         // 图片格式不正确
    //           flag = true
    //         }
    //       })
    //     }
    //   } else if (type == '2') {
    //     // 选择媒体
    //     if (selectList.length > 0) {
    //       selectList.forEach((item: any) => {
    //         if (!isMedia(item.name)) {
    //           // 不是MP4类型
    //           flag = true
    //         }
    //       })
    //     }
    //   }

    //   return flag
    // }
    const dialogMediaLibSure = () => {
      emit('UploadFileModalClose', false)
      // emit('UploadFileModalSure', false)
      console.log('state.pictureCheckList', state.pictureCheckList)
      if (state.pictureCheckList.length > 0) {
      //   const res = ifPictureOrMedia(props.uploadAdvertType, state.pictureCheckList)
      //   if (res) {
      //     if (props.uploadAdvertType == '2') {
      //       return currentInstance.$message.warning('请选择视频，类型为mp4')
      //     } else {
      //       return currentInstance.$message.warning('请选择图片，类型为png,jpg')
      //     }
      //   }
        emit('UploadFileModalSure', state.pictureCheckList)
      }
    }
    watchEffect(() => {
      if (props.parentDialogMediaLib) {
        getmaterialCatalogList()
        state.pictureCheckList = []
      }
    })

    // onMounted(() => {
    //   getmaterialCatalogList()
    // })

    return {
      ...toRefs(state),
      dialogMediaLib,
      handleRemove,
      handleExceed,
      handleSuccess,
      handleBeforeUpload,
      handleUpload,
      handleUploadFn,
      handleNodeClick,
      prePicture,
      dialogMediaLibClose,
      dialogMediaLibSure,
      handleSelectImg,
      formatKb,
      mediaSortFn
      // ifPictureOrMedia
    }
  }
})
</script>
<style lang="scss">
.upload-file-modal {
  .media-lib-wrap {
    border-radius: 20px;
    overflow: hidden;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 0;
      //  background: #F0F0F0;
    }
    .media-lib {
      .lib-top {
        padding: 10px 20px;
        position: relative;
        display: flex;
        // justify-content:space-between;
        align-items: center;
        background: #f0f0f0;

        .top-title {
          font-size: 20px;
          color: #000000;
        }
        .top-center {
          margin-left: 160px;
          display: flex;
        }
        .top-close {
          position: absolute;
          top: 10px;
          right: 12px;
          font-size: 24px;
          cursor: pointer;
        }
      }
      .lib-bottom {
        display: flex;
        // padding:  0 20px 0 ;
        height: 620px;
        .left {
          padding-left: 20px;
          padding-top: 10px;
          width: 200px;
          border-right: 1px solid #c4c4c4;
          .filename {
            font-weight: 500;
            font-size: 14px;
          }
        }
        .right {
          flex: 1;
          .right-top {
            display: flex;
            .right-top-list {
              flex: 1;
              // display: flex;
              padding: 10px;
              height: 545px;
              .right-top-item {
                position: relative;
                display: inline-block;
                .el-checkbox {
                  position: absolute;
                  top: 0;
                  left: 2px;
                }
                .el-checkbox__label {
                  display: none;
                }
                .right-item-name {
                  width: 72px;
                  font-size: 12px;
                  text-align: center;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
              .right-folder {
                margin-right: 10px;
                width: 72px;
                height: 56px;
              }
              .right-pic {
                margin-right: 10px;
                width: 72px;
                height: 56px;
              }
            }
            .right-top-pic {
              padding-right: 20px;
              width: 260px;
              height: 545px;
              padding-top: 20px;
              padding-left: 20px;
              border-left: 1px solid #c4c4c4;
              .select-img {
                width: 220px;
                height: 220px;
              }
              .select-img-msg {
                margin-top: 10px;
              }
            }
          }
          .right-btom {
            padding-left: 10px;
            height: 55px;
            display: flex;
            align-items: center;
            border-top: 1px solid #c4c4c4;
            display: flex;
          }
        }
      }
    }
  }
  .upload-files {
    .upload-list-wrap {
      // display: flex;
      // flex-wrap: wrap;
      .el-upload-list {
        // display: flex;
        // flex-wrap: wrap;
      }
      .el-upload-list__item-actions {
        height: 148px;
      }
      .el-upload-list__item {
        border: 0;
        width: 148px;
        height: 155px;
        overflow: visible;
      }
      .upload-item-wrap {
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        width: 148px;
        height: 148px;
        margin: 0 8px 8px 0;
        display: inline-block;
      }
      .el-upload-list__item {
        margin: 0 20px 20px 0;
        // overflow: visible;
      }
      .upload-item-name {
        position: absolute;
        left: 0;
        bottom: -24px;
        width: 100%;
        text-align: center;
        white-space: nowrap; /* 强制不换行 */
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
