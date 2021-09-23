<template>
  <el-dialog
    v-model="dialogVisible"
    top="30vh"
    width="680px"
    :close-on-click-modal="false"
    :before-close="handleClose">
    <p class="p-title">请选择一个广告渠道</p>
    <div class="yy-author-btns">
      <el-button class="author-btn" @click="onToChannelAuthor(1)">
        <img class="compare-tr-icon" src="../../../../assets/svg/icon-Facebook.svg" alt=""/>
        Facebook
      </el-button>
      <el-button class="author-btn" @click="onToChannelAuthor(2)">
        <img class="compare-tr-icon" src="../../../../assets/svg/icon-google.svg" alt=""/>
        Google
      </el-button>
      <el-button class="author-btn" @click="onToChannelAuthor(3)">
        <img class="compare-tr-icon" src="../../../../assets/svg/icon-amazon.svg" alt=""/>
        Amazon广告
      </el-button>
      <el-button class="author-btn" @click="dialogVisSPAPI = true">
        <img class="compare-tr-icon" src="../../../../assets/svg/icon-amazon.svg" alt=""/>
        Amazon销售
      </el-button>
    </div>
  </el-dialog>
  <!-- Amazon SP-API 授权 -弹层 -->
  <el-dialog
    v-model="dialogVisSPAPI"
    title="Amazon SP-API 授权"
    width="460px"
    :close-on-click-modal="false"
    :before-close="handleCloseSPAPI"
    >
    <p style="margin-bottom: 20px;">请选择要授权的店铺、区域和站点</p>
    <el-form
      :model="ruleFormSpApi"
      ref="refRuleSPAPIForm"
      label-position="left"
      :rules="spApiRules"
      label-width="100px"
      class="demo-ruleFormSpApi"
    >
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="ruleFormSpApi.name" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="区域" prop="region">
        <el-select v-model="ruleFormSpApi.region" @change="onChangeRegion" placeholder="请选择区域">
          <el-option label="NA" value="NA"></el-option>
          <el-option label="EU" value="EU"></el-option>
          <el-option label="FE" value="FE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="naOrEuCheckList" v-show="ruleFormSpApi.region == 'NA'">
          <el-checkbox label="US"></el-checkbox>
          <el-checkbox label="CA"></el-checkbox>
          <el-checkbox label="MX"></el-checkbox>
          <el-checkbox label="BR"></el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group v-model="naOrEuCheckList" v-show="ruleFormSpApi.region == 'EU'">
          <el-checkbox label="AE"></el-checkbox>
          <el-checkbox label="GB"></el-checkbox>
          <el-checkbox label="DE"></el-checkbox>
          <el-checkbox label="FR"></el-checkbox>
          <el-checkbox label="SE"></el-checkbox>
          <el-checkbox label="IT"></el-checkbox>
          <el-checkbox label="NL"></el-checkbox>
          <el-checkbox label="PL"></el-checkbox>
          <el-checkbox label="EG"></el-checkbox>
          <el-checkbox label="TR"></el-checkbox>
          <el-checkbox label="SA"></el-checkbox>
          <el-checkbox label="IN"></el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-model="feRadio" v-show="ruleFormSpApi.region == 'FE'">
          <el-radio label="JP">JP</el-radio>
          <el-radio label="AU">AU</el-radio>
          <el-radio label="SG">SG</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisSPAPI = false">取 消</el-button>
        <el-button type="primary" @click="onAuthorSpApi" :disabled="isCanClickSpApi">下一步</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs
} from 'vue'
import { adCcountAuthor, adCcountAmazonSalesAuthor } from '@/api/admanage'
import { HttpResponse } from '@/interface/interface'
import { Md5 } from 'ts-md5'
export default defineComponent({
  name: '',
  props: {},
  setup () {
    const dialogVisible = ref(false)

    const state = reactive({
      currentNode: {},
      dialogVisSPAPI: false,
      isCanClickSpApi: false,
      ruleFormSpApi: {
        name: '',
        region: 'NA'
      },
      spApiRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      naOrEuCheckList: [],
      feRadio: ''
    })
    const handleOpen = () => {
      dialogVisible.value = true
    }
    const handleClose = () => {
      state.isCanClickSpApi = false
      dialogVisible.value = false
    }
    const onToChannelAuthor = async (channelId: number) => {
      const params = {
        channelId: channelId,
        state: Md5.hashStr(String(new Date().getTime()))
      }
      const res = await adCcountAuthor(params) as HttpResponse
      if (res.code === 0) {
        window.open(res.data)
      }
      handleClose()
    }
    // sp-API授权相关
    const handleCloseSPAPI = () => {
      // 重置表单数据-关闭弹层
      state.ruleFormSpApi.name = ''
      state.ruleFormSpApi.region = 'NA'
      state.naOrEuCheckList = []
      state.feRadio = ''
      state.dialogVisSPAPI = false
    }
    const refRuleSPAPIForm = ref()
    const onAuthorSpApi = () => {
      refRuleSPAPIForm.value.validate(async (valid: boolean) => {
        if (valid) {
          const params = {
            storeName: state.ruleFormSpApi.name,
            area: state.ruleFormSpApi.region,
            sites: state.ruleFormSpApi.region == 'FE' ? [state.feRadio] : state.naOrEuCheckList
          }
          state.isCanClickSpApi = true
          const res = await adCcountAmazonSalesAuthor(params) as HttpResponse
          if (res.code == 0) {
            handleCloseSPAPI()
            handleClose()
            window.open(res.data)
          }
          state.isCanClickSpApi = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    const onChangeRegion = (value: string) => {
      // 重置
      state.naOrEuCheckList = []
      state.feRadio = ''
    }
    return {
      ...toRefs(state),
      dialogVisible,
      handleClose,
      handleOpen,
      onToChannelAuthor,
      handleCloseSPAPI,
      refRuleSPAPIForm,
      onAuthorSpApi,
      onChangeRegion
    }
  }
})
</script>
<style lang="scss" scoped>
.p-title{
  margin-bottom: 30px;
  font-size: 26px;
  color: #000000;
  text-align: center;
}
.yy-author-btns{
  display: flex;
  justify-content: space-around;
}
.author-btn{
  font-family: 'Roboto';
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
}
.compare-tr-icon{
  margin-right: 4px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
</style>
