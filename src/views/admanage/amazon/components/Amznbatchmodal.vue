<template>
  <div class="yy-adbatchmodal">
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisibleComp"
      :width="dialogWidth"
      @close="dialogHandleClose"
      :close-on-click-modal="false"
    >
      <div class="dialog-list-wrap">
        <!-- <div class="batch-switch" v-show="dialogShow == 1">
          <el-radio v-model="batchRadio" label="1">全部开启</el-radio>
          <el-radio v-model="batchRadio" label="2">全部关闭</el-radio>
        </div> -->
        <div class="batch-cash" v-show="dialogShow == 2">
          <el-select v-model="cashValue" placeholder="请选择预算">
            <el-option
              v-for="item in bidOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            class="cash-inp"
            v-model="cashInput"
            placeholder="请输入数字"
          ></el-input>
          {{ getBidPercentage(cashValue) ? '%' : '$' }}
        </div>
        <div class="batch-delete" v-show="dialogShow == 3">
          确定将选中的项目删除？
        </div>
        <div class="batch-move" v-show="dialogShow == 6">
          <el-select v-model="adValue" placeholder="请选择广告组合">
            <el-option
              v-for="item in adGroups"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="batch-cash" v-show="dialogShow == 7">
          <el-select v-model="bidValue" placeholder="请选择出价">
            <el-option
              v-for="item in bidOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            class="cash-inp"
            v-model="bidInput"
            placeholder="请输入数字"
          ></el-input>
          {{ getBidPercentage(bidValue) ? '%' : '$' }}
        </div>
        <div class="suggest" v-show="dialogShow == 8">
          <div class="suggests suggest-title">
            <div class="suggest1">广告组</div>
            <div class="suggest1">所属广告活动</div>
            <div class="suggest1">建议竞价</div>
            <div class="suggest1">
              <el-select
                v-model="suggetsbid"
                class="selectbid"
                placeholder="请选择应用建议出价"
                @change="suggestbidFn"
              >
                <el-option
                  v-for="item in suggetsbidList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="suggests" v-for="(item,index) in suggestbidList" :key="'suggestbidList'+index">
            <div class="suggest1">{{item.adgroupName}}</div>
            <div class="suggest1">{{item.campaignName}}</div>
            <div class="suggest1">
              <div class="price" v-if="item.suggested">
                {{item.suggested}}
                <i class="el-icon-refresh refreshlocal" @click="refreshFn"></i>
              </div>
              <div v-if="item.suggested">({{item.rangeEnd}} ~ {{item.rangeStart}})</div>
            </div>
            <div class="suggest1 suggest1-inp">
              <el-input v-model="item.input" size="small"></el-input> $
            </div>
          </div>
        </div>
        <div class="no-keyworld" v-show="dialogShow == 9">
          <div class="add-list">
            <div
              class="add"
              v-for="(item, idx) in keyworldList"
              :key="'keyworld' + idx"
            >
              <el-input
                class="inp-width"
                v-model="item.keyworldinp"
                placeholder="关键词"
              ></el-input>
              <el-select v-model="item.keyworldkey">
                <el-option
                  v-for="item in keyworldinps"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                class="inp-width"
                v-model="item.adactive"
                placeholder="广告活动"
              ></el-input>
              <el-select v-model="item.adactivekey" placeholder="请选择广告组">
                <el-option
                  v-for="item in adactives"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <i
                class="el-icon-circle-plus-outline icon-size"
                @click="addClick"
              ></i>
              <i
                class="el-icon-circle-close icon-size"
                @click="removeClick(idx)"
              ></i>
            </div>
          </div>
        </div>
        <div class="no-shop" v-show="dialogShow == 10">
          <div class="shop-select">
            <el-select class="shop-right" v-model="shop1" placeholder="请选择">
              <el-option
                v-for="item in shop1options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select class="shop-right" v-model="shop2" placeholder="请选择">
              <el-option
                v-for="item in shop2options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select v-model="shop3" placeholder="请选择">
              <el-option
                v-for="item in shop3options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <el-input
            class="textarea"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
          <div class="tip"><span class="point">*</span> 一行一个ASIN</div>
        </div>
        <div class="ad-set" v-show="dialogShow == 11">
          <div class="content">
            <div class="item">
              <div class="name"><span class="point">*</span> 广告系列名称</div>
              <div class="bttom">
                <el-input
                  v-model="dialog11item.campaignName"
                  maxlength="100"
                  placeholder="限100字符"
                ></el-input>
              </div>
            </div>
            <div class="item">
              <div class="name">
                <span class="point">*</span> 开始时间和结束时间
              </div>
              <div class="bttom">
                <el-date-picker
                  class="w555"
                  v-model="dialog11item.startTime"
                  :disabled-date="disabledDate1"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
                <span> - </span>
                <el-date-picker
                  class="w555"
                  v-model="dialog11item.endTime"
                  :disabled-date="disabledDate"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="item">
              <div class="name"><span class="point">*</span> 每日预算（$）</div>
              <div class="bttom">
                <!-- <el-input
              type="number"
              class="w555"
              v-model="adBudgetInp"
              placeholder="输入预算"
            ></el-input> -->
                <el-input-number
                  :precision="2"
                  v-model="dialog11item.dailyBudgetValue"
                  :controls="false"
                  :min="0"
                  controls-position="right"
                ></el-input-number>
              </div>
            </div>
            <div class="item">
              <div class="name"><span class="point">*</span> 竞价策略</div>
              <div class="bttom">
                <el-select
                  v-model="dialog11item.bidStrategy"
                  clearable
                  class="w555"
                  placeholder="请选择竞价策略"
                >
                  <el-option
                    v-for="item in adStrategyList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="item item-set">
              <div class="name">
                <span class="point"></span> 根据广告位调整竞价（替代“竞价+”）
              </div>
              <div class="bttom">
                <div class="hasitem">
                  <div class="title">
                    <span class="point"></span> 搜索结果顶部（首页）
                    <span class="tip-name">
                      示例：对于此广告位，$ 1.00竞价将为 $1.00</span
                    >
                  </div>
                  <el-input-number
                    :precision="2"
                    v-model="dialog11item.bidTopValue"
                    :controls="false"
                    :min="0"
                    controls-position="right"
                  ></el-input-number>
                  %
                </div>
                <div class="hasitem mt10">
                  <div class="title">
                    <span class="point"></span>商品页面
                    <span class="tip-name">
                      示例：对于此广告位，$ 1.00竞价将保持$1.00 不变</span
                    >
                  </div>
                  <el-input-number
                    :precision="2"
                    v-model="dialog11item.bidProductDetailValue"
                    :controls="false"
                    :min="0"
                    controls-position="right"
                  ></el-input-number>
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogHandleClose">取 消</el-button>
          <el-button type="primary" @click="dialogHandleSure">{{
            dialogShow == 3 ? '确 定' : '保 存'
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { azGetFieldsByCode } from '@/api/admanage'
import { HttpResponse } from '@/interface/interface'
export default defineComponent({
  name: '',
  props: {
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogShow: {
      type: Number,
      default: 1
    },
    dialogWidth: {
      type: String,
      default: '500px'
    },
    dialogitem: {
      type: Object,
      default: () => ({})
    },
    suggestbidList: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      batchRadio: '1',
      cashOptions: [
        {
          value: 1,
          label: '提高预算'
        },
        {
          value: 2,
          label: '降低预算'
        },
        {
          value: 5,
          label: '调整到'
        },
        {
          value: 3,
          label: '提高%'
        },
        {
          value: 4,
          label: '降低%'
        }
      ],
      cashValue: '',
      bidOptions: [] as any,
      bidValue: '',
      adGroups: [
        {
          value: '2',
          label: '将预算减少'
        }
      ],
      adValue: '',
      cashInput: '',
      bidInput: '',
      suggetsbid: '1',
      suggetsbidList: [
        {
          value: '1',
          label: '应用建议出价'
        },
        {
          value: '2',
          label: '应用建议出价-上限'
        },
        {
          value: '3',
          label: '应用建议出价-下限'
        }
      ],
      input: '',
      keyworldList: [
        {
          keyworldinp: '',
          keyworldkey: '',
          adactive: '',
          adactivekey: ''
        }
      ],
      keyworldinps: [
        {
          value: '1',
          label: '精准否定'
        },
        {
          value: '2',
          label: '词组否定'
        }
      ],
      adactives: [
        {
          value: '1',
          label: '广告1'
        },
        {
          value: '2',
          label: '广告1'
        }
      ],
      shop1: '',
      shop1options: [
        {
          value: '1',
          label: '广告1'
        },
        {
          value: '2',
          label: '广告2'
        }
      ],
      shop2: '',
      shop2options: [
        {
          value: '1',
          label: '广告1'
        },
        {
          value: '2',
          label: '广告2'
        }
      ],
      shop3: '',
      shop3options: [
        {
          value: '1',
          label: '广告1'
        },
        {
          value: '2',
          label: '广告2'
        }
      ],
      textarea: '',
      adSeriesName: '',
      starttime: '',
      endtime: '',
      disabledDate (time: any) {
        return time.getTime() < +dayjs(state.starttime)
      },
      disabledDate1 (time: any) {
        return time.getTime() < new Date(Date.now() - 3600 * 1000 * 24)
      },
      adBudgetInp: '',
      adStrategy: 1,
      adStrategyList: [
        {
          value: 2,
          label: '动态竞价-只降低'
        },
        {
          value: 3,
          label: '动态竞价-提高和降低'
        },
        {
          value: 1,
          label: '固定竞价'
        }
      ],
      adBudgetSearchInp: 0,
      adBudgetShopInp: 0,
      dialog11item: '' as any
    })
    // 获取调整预算(出价) 类型选项
    const getCashOptions = async () => {
      const res = (await azGetFieldsByCode({ code: 'AD_AMZ_UPDATE_BID_TYPE' })) as HttpResponse
      state.bidOptions = res.data || []
    }
    getCashOptions()
    // 11 dialog
    const { dialogitem } = toRefs(props)
    if (dialogitem) {
      state.dialog11item = dialogitem
    }

    const dialogVisibleComp = computed({
      get: () => props.dialogVisible,
      set: (val) => {
        // console.log('val: ', val)
        emit('update:modelValue', val)
      }
    })
    const refreshFn = async () => {
      //
    }
    // 应用建议出价
    const suggestbidFn = (val: string) => {
      let str = ''
      switch (val) {
        case '1':
          str = 'suggested'
          break
        case '2':
          str = 'rangeStart'
          break
        case '3':
          str = 'rangeEnd'
          break
      }
      emit('suggestbidHandle', str)
    }
    // 添加到否定关键词
    const addClick = () => {
      console.log('addClick')
      const params = {
        keyworldinp: '',
        keyworldkey: '',
        adactive: '',
        adactivekey: ''
      }
      state.keyworldList.push(params)
    }
    const removeClick = (index: number) => {
      console.log('removeClick')
      state.keyworldList.splice(index, 1)
    }

    // 模态框逻辑
    const dialogHandleClose = () => {
      emit('dialogHandleClose', false)
    }
    const dialogHandleSure = () => {
      let params = {}
      switch (props.dialogShow) {
        case 1:
          params = {
            handleType: state.batchRadio
          }
          break
        case 2: // 批量调整 预算
          params = {
            handleType: state.cashValue,
            budgetValue: +state.cashInput
          }
          break
        case 3:
          break
        case 4:
          break
        case 5:
          break
        case 6:
          break
        case 7: // 批量调整 竞价
          if (!state.bidValue && !state.bidInput) {
            ElMessage({
              type: 'warning',
              message: '请填写完调整信息'
            })
            return false
          }
          params = {
            type: state.bidValue,
            value: +state.bidInput
          }
          break
        case 8:

          break
        case 9:
          break
        case 10:
          break
        case 11:
          params = state.dialog11item
          break
      }
      emit('dialogHandleSure', params)
    }
    const getPercentage = (val: any) => {
      // console.log('val: ', val)
      let flag = false
      switch (val) {
        case 4:
          flag = true
          break
        case 5:
          flag = true
          break
        case 6:
          flag = true
          break
      }
      return flag
    }
    const getBidPercentage = (val: any) => {
      if (val == '3' || val == '4') {
        return true
      } else {
        return false
      }
    }

    return {
      ...toRefs(state),
      dialogHandleClose,
      dialogHandleSure,
      dialogVisibleComp,
      getPercentage,
      getBidPercentage,
      suggestbidFn,
      refreshFn,
      addClick,
      removeClick
    }
  }
})
</script>
<style lang="scss">
.yy-adbatchmodal {
  .dialog-list-wrap {
    // color: red;
    .mt10{
      margin-top: 10px;
    }
    .batch-switch {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .batch-delete {
      text-align: center;
    }
    .batch-cash {
      text-align: center;
      .el-select {
        width: 150px;
      }
      .el-input {
        width: 150px;
      }
      .cash-inp {
        margin-left: 20px;
      }
    }
    .batch-move {
      text-align: center;
    }
    .suggest {
      .suggest-title {
        background-color: #f4f6f7;
      }
      .suggests {
        display: flex;
        align-items: center;
        .suggest1 {
          position: relative;
          flex: 1;
        }
        .suggest1-inp {
          margin-top: 2px;
          margin-bottom: 2px;
          display: flex;
          align-items: center;
        }
        .selectbid {
        }
        .price {
        }
        .refreshlocal {
          position: absolute;
          top: 4px;
          right: 10px;
          cursor: pointer;
        }
      }
    }
    .no-keyworld {
      .add-list {
        .add {
          display: flex;
          align-items: center;
          .inp-width {
            width: 200px;
            margin-left: 10px;
            margin-right: 10px;
          }
          .icon-size {
            font-size: 30px;
            cursor: pointer;
          }
        }
      }
    }
    .no-shop {
      .shop-select {
        display: flex;
        align-items: center;
        .shop-right {
          margin-right: 10px;
        }
      }
      .textarea {
        margin-top: 10px;
      }
      .tip {
        margin-top: 10px;
        .point {
          color: red;
        }
      }
    }
    .ad-set {
      .content {
        .item {
          // &:first-child{
          //   margin-bottom: 0px;
          // }
          margin-bottom: 30px;
          display: flex;
          align-items: center;
        }
        .item-set {
          align-items: flex-start;
        }
        .name-top {
          .title {
            font-size: 20px;
            color: #2d2d2d;
          }
        }
        .name {
          width: 150px;
          // margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-right: 10px;
          text-align: right;
          .point {
            color: #ff1c1c;
          }
        }
        .bttom {
          .hasitem {
            .title {
              display: flex;
              align-items: flex-end;
              .tip-name {
                margin-left: 10px;
                font-size: 12px;
                color: #666;
              }
            }
          }
          .msg-key {
            margin-left: 20px;
          }
        }
      }
    }
  }
}
</style>
