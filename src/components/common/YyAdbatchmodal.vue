<template>
  <div class="yy-adbatchmodal">
    <el-dialog :title="dialogTitle" v-model="dialogVisibleComp" width="500px" @close="dialogHandleClose">
      <div class="dialog-list-wrap">
        <div class="batch-switch" v-show="dialogShow == 1">
          <el-radio v-model="batchRadio" label="1">全部开启</el-radio>
          <el-radio v-model="batchRadio" label="2">全部关闭</el-radio>
        </div>
        <div class="batch-cash" v-show="dialogShow == 2">
          <el-select v-model="cashValue" placeholder="请选择预算">
            <el-option
              v-for="item in cashOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            class="cash-inp"
            v-model="cashInput"
            placeholder="请输入数字"
          ></el-input>
          %
        </div>
        <div class="batch-delete" v-show="dialogShow == 3">
          确定将选中的项目删除？
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogHandleClose">取 消</el-button>
          <el-button type="primary" @click="dialogHandleSure">{{
            dialogShow == 3 ? "确 定" : "保 存"
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
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
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      batchRadio: '1',
      cashOptions: [
        {
          value: '1',
          label: '将预算增加'
        },
        {
          value: '2',
          label: '将预算减少'
        }
      ],
      cashValue: '',
      cashInput: ''
    })
    const dialogVisibleComp = computed({
      get: () => props.dialogVisible,
      set: val => {
        // console.log('val: ', val)
        emit('update:modelValue', val)
      }
    }
    )

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
        case 2:
          params = {
            handleType: state.cashValue,
            budget: +state.cashInput
          }
          break
        case 3:

          break
      }
      emit('dialogHandleSure', params)
    }

    return {
      ...toRefs(state),
      dialogHandleClose,
      dialogHandleSure,
      dialogVisibleComp

    }
  }
})
</script>
<style lang="scss">
.yy-adbatchmodal {
  .dialog-list-wrap {
    // color: red;
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
  }
}
</style>
