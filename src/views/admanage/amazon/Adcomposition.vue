<template>
  <div class="ad-composition">
    <progressbar
      class="mb18"
      :steps="steps"
      :activestep="activestep"
      @clilckstep="clilckstep"
    ></progressbar>
    <div class="part1 h570" v-show="activestep == 0">
      <div class="yy-ad-title w555">广告组合</div>
      <div class="part-title">基础配置</div>
      <div class="content">
        <div class="item">
          <div class="name"><span class="point">*</span> 任务名称</div>
          <div class="bttom">
            <el-input
              class="w555"
              maxlength="50"
              v-model="taskval"
              placeholder="请输入任务名称"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 店铺名称</div>
          <div class="bttom">
            <el-select
              v-model="selstore"
              clearable
              class="w555"
              placeholder="请选择店铺名称"
              @change="selstoreChange"
            >
              <el-option
                v-for="item in storeOptions"
                :key="item.shopAccount"
                :label="item.shopName"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div class="part1 part2" v-show="activestep == 1">
      <div class="yy-ad-title w555">广告组合</div>
      <div class="part-title">广告组合配置</div>
      <div class="content">
        <div class="item">
          <div class="name"><span class="point">*</span> 广告组合名称</div>
          <div class="bttom">
            <el-input
              class="w555"
              v-model="adSeriesName"
              placeholder="限100字符"
            ></el-input>
          </div>
        </div>
        <div class="item">
          <div class="name"><span class="point">*</span> 预算上限</div>
          <div class="bttom">
            <el-select
              v-model="budgetTop"
              class="w555"
              placeholder="请选择日期范围"
            >
              <el-option
                v-for="item in budgetTopList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="type" v-show="budgetTop == 'dateRange'">
          <div class="item">
            <div class="name">
              <!-- <span class="point">*</span> 开始时间和结束时间 -->
            </div>
            <div class="bttom">
              <div class="mg20">
                <div class="hasitem">
                  <div class="name"><span class="point">*</span> 开启时间</div>
                  <el-date-picker
                    class="w555"
                    v-model="step2starttime"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    :disabled-date="disabledDate1"
                    type="datetime"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </div>
                <div class="hasitem">
                  <div class="name">结束时间</div>
                  <el-date-picker
                    class="w555"
                    v-model="step2endtime"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    :disabled-date="disabledDate"
                    type="datetime"
                    placeholder="结束时间"
                  >
                  </el-date-picker>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="name">
              <span class="point">*</span> 日期范围预算上限（$）
            </div>
            <div class="bttom">
              <!-- <el-input
                class="w555"
                v-model="adBudgetInp"
                placeholder="日期范围预算上限"
              ></el-input> -->
              <el-input-number :precision="2" v-model="adBudgetInp" :controls="false" :min="0" :max="1000000"
                placeholder=""
                controls-position="right"></el-input-number>
            </div>
          </div>
        </div>
        <div class="type" v-show="budgetTop == 'monthlyRecurring'">
          <div class="item">
            <div class="name"><span class="point">*</span> 每月预算上限</div>
            <div class="bttom">
              <el-input
                type="number"
                class="w555"
                v-model="adBudgetInpMonth"
                placeholder="每月1日重新启动"
              ></el-input>
            </div>
          </div>
          <div class="item w555">
            <div class="name"><span class="point">*</span> 结束</div>
            <div class="bttom">
              <div class="selct-btns">
                <div
                  class="selct-btn"
                  :class="{ act: endStatus === 1 }"
                  @click="toggleClick(1)"
                >
                  永不
                </div>
                <div
                  class="selct-btn"
                  :class="{ act: endStatus === 2 }"
                  @click="toggleClick(2)"
                >
                  开启
                </div>
              </div>
            </div>
            <div class="bttom mg20" v-show="endStatus === 2">
              <el-date-picker
                class="w555"
                v-model="dateVal"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="public">
      <el-button @click="nextFn" v-if="activestep != 1" type="primary" class="common" >
        下一步</el-button
      >
      <el-button @click="publicFn" v-if="activestep == 1" type="primary" class="common">
        发布任务</el-button
      >
      <el-button class=" common commonborder" @click="publicSave" plain
        >保存草稿</el-button
      >

      <div class="pub-btn common" @click="nextFn" v-if="activestep != 1">
        下一步
      </div>
      <div class="pub-btn common" @click="publicFn" v-if="activestep == 1">
        发布任务
      </div>
      <div class="save common" @click="publicSave">保存草稿</div>
    </div> -->
    <public-btn
      :steps="1"
      :activestep="activestep"
      :disabledVal="disabledVal"
      @nextFn ="nextFn"
      @publicFn ="publicFn"
      @publicSave ="publicSave"
    ></public-btn>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import Progressbar from '../common/Progressbar.vue'
import PublicBtn from '../common/PublicBtn.vue'
import { defineComponent, onMounted, reactive, toRefs, watchEffect } from 'vue'
import { azInfo, azCpCompose, azCpDetail } from '@/api/admanage'
import { collectAzStoreSelecList } from '../common/action/index'
import { HttpResponse } from '@/interface/interface'
import { isEmptyObject } from '@/utils/utils'
import dayjs from 'dayjs'

export default defineComponent({
  name: '',
  props: {},
  setup () {
    const route = useRoute()
    const state = reactive({
      disabledVal: false,
      detailObj: '' as any,
      isEdit: false,
      steps: ['01/基础配置', '02/广告组合配置'],
      activestep: 0,
      taskval: '',
      selstore: '',
      selstoreItem: {
        shopAccount: '',
        shopName: ''
      } as any,
      storeOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      adSeriesName: '',
      step2starttime: '',
      step2endtime: '',
      adBudgetInp: 0,
      budgetTop: 'dateRange',
      budgetTopList: [
        {
          value: 'dateRange',
          label: '日期范围'
        },
        {
          value: 'monthlyRecurring',
          label: '每月定期'
        },
        {
          value: 'nothing',
          label: '无预算上限'
        }
      ],
      adBudgetInpMonth: '',
      endStatus: 1,
      dateVal: '',
      adType: 7,
      taskId: '',
      channelId: 3,
      // 开启、结束时间限制
      // disabledDate: (time: any) => {
      //   let nowData = new Date()
      //   nowData = new Date(nowData.setDate(nowData.getDate() - 1))
      //   return time < nowData
      // }
      disabledDate (time:any) {
        return time.getTime() < (+dayjs(state.step2starttime))
      },
      disabledDate1 (time:any) {
        return time.getTime() < new Date((Date.now() - 3600 * 1000 * 24))
      }
    })

    // 步骤切换
    const clilckstep = (val: number) => {
      state.activestep = val
    }
    // 结束 切换
    const toggleClick = (val: number) => {
      state.endStatus = val
    }
    const getStoreAccountList = () => {
      collectAzStoreSelecList(state)
    }
    const selstoreChange = (item: any) => {
      state.selstoreItem = item
    }

    const step0 = async () => {
      const params = {
        taskId: state.taskId,
        taskName: state.taskval,
        adType: state.adType,
        shopAccount: state.selstoreItem.shopAccount,
        shopName: state.selstoreItem.shopName
      }
      const res = (await azInfo(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        state.taskId = res.data.taskId
        state.activestep++
      }
    }

    const step1 = async (num: number) => {
      const params = {
        taskId: state.taskId,
        composeName: state.adSeriesName,
        dailyBudgetStrategy: state.budgetTop,
        dailyBudgetValue:
          state.budgetTop == 'dateRange'
            ? state.adBudgetInp
            : state.adBudgetInpMonth,
        beginTime:
          state.budgetTop == 'dateRange' ? state.step2starttime : state.dateVal,
        endTime: state.step2endtime,
        endStatus: state.endStatus,
        taskStatus: num
      }
      console.log('时间---', params)
      const res = (await azCpCompose(params)) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        router.push('/home/amzntaskad')
      }
    }
    // 发布保存
    const nextFn = () => {
      // 下一步
      switch (state.activestep) {
        case 0:
          step0()
          break
        case 1:
          step1(2)
          break
      }
    }
    const publicFn = () => {
      //
      step1(1)
    }
    const publicSave = () => {
      //
      nextFn()
    }
    // 下一步，发布 按钮 禁用状态
    const isBtnDisable = (value: number) => {
      if (value == 1 || value == 2) {
        return true
      }
      return false
    }
    const ifDisabledFn = (detailObj: any) => {
      if (!state.detailObj) {
        return false
      }
      switch (state.activestep) {
        case 0:
          state.disabledVal = isBtnDisable(detailObj.advertisementCpInfo ? detailObj.advertisementCpInfo.launchStatus : '')
          break
        case 1:
          state.disabledVal = isBtnDisable(detailObj.advertisementCpCompose ? detailObj.advertisementCpCompose.launchStatus : '')
          break
      }
    }
    // 查看详情
    const getItemDetail = async () => {
      if (isEmptyObject(route.params)) return
      state.isEdit = true
      const params = {
        taskId: JSON.parse(route.params.item as any).taskId
      }
      const res = (await azCpDetail(params)) as HttpResponse
      console.log('getItemDetail: ', res)
      if (res.code == 0) {
        //
        state.taskId = res.data.taskId
        state.detailObj = res.data
        // step0
        if (res.data.advertisementCpInfo) {
          let tempObj = res.data.advertisementCpInfo
          const tempStore = {
            shopAccount: tempObj.shopAccount,
            shopName: tempObj.shopName
          }

          state.taskval = tempObj.taskName
          state.selstoreItem = tempStore
          state.selstore = tempObj.shopName

          tempObj = null
        }
        // step1
        if (res.data.advertisementCpCompose) {
          let tempObj = res.data.advertisementCpCompose

          if (tempObj.dailyBudgetStrategy == 'dateRange') {
            state.adBudgetInp = tempObj.dailyBudgetValue
            state.step2starttime = tempObj.beginTime
            state.step2endtime = tempObj.endTime
          }

          if (tempObj.dailyBudgetStrategy == 'monthlyRecurring') {
            state.endStatus = tempObj.endStatus
            state.adBudgetInpMonth = tempObj.dailyBudgetValue
            state.dateVal = tempObj.beginTime
          }
          state.adSeriesName = tempObj.composeName
          state.budgetTop = tempObj.dailyBudgetStrategy

          tempObj = null
        }
      }
    }
    onMounted(() => {
      getItemDetail()
      getStoreAccountList()
    })
    watchEffect(() => {
      if (isEmptyObject(route.params)) return
      ifDisabledFn(state.detailObj)
    })
    return {
      ...toRefs(state),
      clilckstep,
      nextFn,
      publicFn,
      publicSave,
      toggleClick,
      selstoreChange
    }
  },
  components: {
    Progressbar,
    PublicBtn
  }
})
</script>
<style lang="scss">
.ad-composition {
  height: 100%;
  overflow-y: auto;
  @include clearScrollbar();
  .w555 {
    width: 555px;
  }
  .w100 {
    width: 100px;
  }
  .w130 {
    width: 130px;
  }
  .w150 {
    width: 150px;
  }
  .w188 {
    width: 188px;
  }
  .w266 {
    width: 266px;
  }
  .w396 {
    width: 396px;
  }
  .w402 {
    width: 402px;
  }
  .w1000 {
    width: 1000px;
  }
  .whundred {
    width: 100%;
  }
  .yy-ad-title {
    margin-bottom: 20px;
    padding-bottom: 5px;
    font-size: 16px;
    border-bottom: 1px solid #2d2d2d;
  }
  .dblclick {
    color: $themeColor;
    cursor: pointer;
  }
  .themeColor {
    color: $themeColor;
    cursor: pointer;
  }
  .mb18 {
    margin-bottom: 18px;
  }
  .mg20 {
    margin-top: 20px;
  }
  .ml10 {
    margin-left: 10px;
  }
  .mr20 {
    margin-right: 20px;
  }
  .md20 {
    margin-bottom: 20px;
  }
  .h570 {
    height: 570px;
  }
  .part1 {
    margin-bottom: 18px;
    padding: 18px;
    // height: 210px;
    background: #ffffff;
    border-radius: 20px;
    box-sizing: border-box;
    .part-title {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 500;
      color: #333333;
    }
    .content {
      .item {
        // &:first-child{
        //   margin-bottom: 0px;
        // }
        margin-bottom: 30px;
      }
      .name-top {
        .title {
          font-size: 20px;
          color: #2d2d2d;
        }
      }
      .name {
        margin-bottom: 10px;
        .point {
          color: #ff1c1c;
        }
      }
      .bttom {
        .hasitem {
          &:first-child {
            margin-top: 0;
          }
          margin-top: 20px;
          position: relative;
          .msg {
            position: absolute;
            top: 43px;
            left: 468px;
          }
          .roas {
            left: 488px;
          }
        }
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
        .media-list {
          display: flex;
          flex-wrap: wrap;
          .media {
            margin-right: 20px;
            position: relative;
            width: 100px;
            height: 100px;
            border-radius: 4px;
            overflow: hidden;
          }
          .del {
            position: absolute;
            top: 0;
            right: 8px;
            cursor: pointer;
          }
          .is-video {
            position: absolute;
            bottom: 0;
            right: 5px;
            font-size: 18px;
          }
          .avtar {
            height: 100%;
            width: 100%;
          }
          .avtar-name {
          }
          .media-add {
            position: relative;
            width: 100px;
            height: 100px;
            border-radius: 4px;
            background: #f4f6f7;
            border: 1px dashed #cccccc;
            cursor: pointer;
            .add-icon {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate3d(-50%, -50%, 0);
              font-size: 30px;
              color: #c4c4c4;
            }
          }
        }
        .bttom-list {
          display: flex;
          .left {
            padding: 10px;
            border: 1px solid #cccccc;
            box-sizing: border-box;
            .left-name {
              // font-size: 16px;
            }
            .left-wrap {
              height: 225px;
              overflow-y: auto;
              @include clearScrollbar();
              .left-item {
                margin-top: 5px;
                padding-left: 5px;
                padding-right: 5px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 1px solid #cccccc;
                border-radius: 4px;
                box-sizing: border-box;
              }
              .img-wrap {
                display: flex;
                align-items: center;
              }
              .img {
              }
              .detail {
              }
              .btn {
                margin-top: 5px;
                margin-bottom: 5px;
                min-height: 26px;
                height: 26px;
                line-height: 0px;
              }
            }
            .page-btn {
              display: flex;
              justify-content: flex-end;
            }
          }
        }
        .msg-item {
          display: flex;
          align-items: center;
          .msg {
            width: 140px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border: 1px solid #cccccc;
            border-radius: 4px;
            box-sizing: border-box;
          }
        }
        .key-delivery-wrap {
          .key-delivery-list {
            .key-delivery-item {
              &:first-child {
                border-top: 1px solid #c9c9c9;
              }
              padding-top: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #c9c9c9;
              &:first-child {
                margin-top: 0;
              }
              margin-top: 10px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .part {
              }
              .noborder {
                .el-input__inner {
                  border: 0;
                }
              }
              .icon-close {
                cursor: pointer;
              }
            }
          }
          .key-delivery-inp {
            padding: 10px 10px 0;
            border: 1px solid #f0f0f0;
            .el-textarea__inner {
              border: 0;
            }
          }
          .operate {
            display: flex;
            align-items: center;
            .operate1 {
              flex: 1;
              height: 40px;
              .el-input__inner {
                border: 0;
              }
            }
            .line {
              width: 1px;
              height: 25px;
              background-color: #e4e4e4;
            }
            .textcenter {
              &:hover {
                color: $themeColor;
              }
              text-align: center;
              line-height: 40px;
              cursor: pointer;
            }
          }
        }
        .shop-delivery-wrap {
          .tabs {
            display: flex;
          }
          .tab {
            &.act {
              color: $themeColor;
              border-bottom: 3px solid $themeColor;
            }
            flex: 1;
            text-align: center;
            height: 50px;
            line-height: 50px;
            cursor: pointer;
            border-bottom: 1px solid #c4c4c4;
            box-sizing: border-box;
          }
          .tab-list-wrap {
            padding: 10px;
            border: 1px solid #cccccc;
            .tab-list {
              height: 300px;
              .tab-left-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 40px;
                border-bottom: 1px solid #f0f0f0;
              }
              .item-name {
              }
              .item-add {
                &:hover {
                  color: $themeColor;
                }
                width: 100px;
                text-align: center;
                cursor: pointer;
              }
            }
            .tab-list-page {
              display: flex;
              justify-content: space-between;
              .add-all {
                color: $themeColor;
                cursor: pointer;
              }
            }
          }
          .tab-textarea {
            height: 355px;
          }
          .text-border {
            padding: 10px;
            border: 1px solid #cccccc;
          }
        }
        .select-wrap {
          padding: 10px;
          border: 1px solid #cccccc;
          .select-name {
          }
          .select-list {
            height: 300px;
            overflow: hidden;
            overflow-y: auto;
            .select-item {
              display: flex;
              border-bottom: 1px solid #e0e0e0;
              .sel-item {
                // flex: 1;
                height: 50px;
                line-height: 50px;
                &:nth-child(1) {
                  width: 150px;
                }
                &:nth-child(2) {
                  width: 80px;
                }
                &:nth-child(3) {
                  width: 210px;
                }
                &:last-child {
                  flex: 1;
                }
              }
              .sel-item-aud {
                flex: 1;
                height: 50px;
                line-height: 50px;
              }
            }
            .select-top {
              background-color: #f4f6f6;
            }
          }
          .select-list-page {
            display: flex;
            justify-content: space-between;
            .del-all {
              color: $themeColor;
              cursor: pointer;
            }
          }
        }
        .two-inp {
          display: flex;
          align-items: center;
          .line {
            margin-left: 10px;
            margin-right: 10px;
          }
        }
        .top-select {
          padding: 10px;
          border: 1px solid #cccccc;
        }
      }
      .control {
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        .title {
          margin-right: 20px;
          font-size: 20px;
          color: #2d2d2d;
        }
      }
      .tags {
        .tags-in {
          display: flex;
        }
        .tags-title {
          margin-right: 20px;
          flex-shrink: 0;
        }
        .tags-list {
        }
        .el-tag {
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
      .between {
        display: flex;
        align-items: center;
        .cutup {
          margin-left: 10px;
          margin-right: 10px;
        }
      }
      .variables {
        .variable {
          margin-top: 10px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
        }
        .variable-name {
          margin-right: 20px;
        }
        .variable-val {
        }
      }
      .selct-btns {
        &.selct-audience {
          justify-content: flex-start;
          .selct-btn {
            &:first-child {
              margin-left: 0;
            }
            margin-left: 10px;
          }
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        .selct-btn {
          &.act {
            // border: 1px solid #393C45;
            background-color: $themeColor;
            color: #fff;
          }
          width: 270px;
          height: 40px;
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          border-radius: 4px;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
        }
      }
    }
  }
  .part2 {
    .config {
      margin-top: 10px;
      margin-bottom: 20px;
      width: 186px;
      height: 60px;
      line-height: 60px;
      background: $themeColor;
      border-radius: 4px;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
    }
    .configline {
      margin-left: 10px;
      padding-left: 10px;
      padding-right: 10px;
      line-height: 40px;
      background: $themeColor;
      border-radius: 4px;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
    }
    .search-btn {
      width: 100px;
    }
  }
  .public {
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
}
</style>
