<template>
  <div class="yy-login" v-loading="successLogin">
    <div class="bg-left">
      <img class="logo-bg" src="./img/login-bg.png" alt="logo" />
    </div>
    <div class="conten-right">
      <div class="content">
        <div class="login-box">
          <img class="logo" src="../../assets/logo.svg" alt="logo" />
        </div>
        <h1 class="title">{{$t('login.title')}}</h1>
        <div class="form">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="formRef"
            label-width="100px"
          >
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="ruleForm.email"
                placeholder="请输入正确的邮箱号"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                show-password
                placeholder="8-20位数字、字母或特殊符号"
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code" class="email-code">
              <div class="code">
                <el-input
                v-model="ruleForm.code"
                placeholder="请输入验证码"
              ></el-input>
              <div class="img-code-wrap" @click="changeCode">
                <img class="img-code" :src="codeImageUrl" alt="">
                <div class="text">看不清，换一张</div>
              </div>
              </div>

            </el-form-item>
            <div class="remember">
              <el-checkbox v-model="checked">30天内记住我</el-checkbox>
              <div class="reset" @click="resetFn">忘记密码</div>
            </div>
            <div class="login-btn">
              <el-button type="primary" class="login" @click="submitForm">登录</el-button>
              <!-- <el-button @click="resetForm">重置</el-button> -->
            </div>
            <div class="no-acount">
              没有账号？
              <span class="login-regist" @click="registerFn">立即注册</span>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import router from '@/router'
import store from '@/store'
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue'
import { login } from '@/api/user'
// 保存30天
import { TimelinessSet, TimelinessGet, setLocalStorage } from '@/utils/localStorage'
import { v4 as uuidv4 } from 'uuid'
import config from '@/config/index'
import { HttpResponse } from '@/interface/interface'

export default defineComponent({
  setup () {
    // 获取当前实例
    const currentInstance: any = getCurrentInstance()?.appContext.config.globalProperties

    // 当前form表单dom
    const formRef = ref()
    // 表单
    const state = reactive({
      successLogin: false,
      uuid: '',
      codeImageUrl: '',
      checked: false,
      ruleForm: {
        email: '',
        pass: '',
        code: ''
      }
    })

    const rules = {
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change']
        }
      ],
      pass: [
        // { validator: validatePass, trigger: 'blur' },
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
      ],
      code: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
      ]
    }

    // 登录提交
    const submitForm = () => {
      formRef.value.validate(async (valid: any) => {
        if (valid) {
          // 登录的时候 在做30天保存
          if (state.checked) {
            const userMsg = {
              email: state.ruleForm.email,
              pass: state.ruleForm.pass
            }
            TimelinessSet('userinfo', userMsg)
          }
          const res = await login({
            email: state.ruleForm.email,
            kaptchaCode: state.ruleForm.code,
            password: state.ruleForm.pass,
            uuid: state.uuid
          })as HttpResponse
          console.log('res: ', res)
          if (res.code == 0) {
            //
            state.successLogin = true
            store.dispatch('user/setloginuserinfo', res.data)
            setLocalStorage('loginUserInfo', JSON.stringify(res.data))
            setTimeout(() => {
              router.push('/home/dashboard') // 暂时跳转到数据图表
              state.successLogin = false
            }, 1500)
          } else {
            // currentInstance.$message.error(res.msg)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    const resetForm = () => {
      formRef.value.resetFields()
    }

    // 重置密码
    const resetFn = () => {
      router.push('/reset')
    }
    // 注册
    const registerFn = () => {
      router.push('/register')
    }
    // uuidv4();
    const getCode = async () => {
      const uuid = uuidv4()
      state.uuid = uuid
      // 区分生产环境，开发环境，拿验证码图片的url
      state.codeImageUrl = config.isProduction ? `${config.baseUrl.pro}/rbac/merchant/login/kaptcha?uuid=${uuid}` : `${config.baseUrl.pro}/rbac/merchant/login/kaptcha?uuid=${uuid}`
    }
    const changeCode = () => {
      getCode()
    }

    onMounted(() => {
      getCode()
      const userMsg = TimelinessGet('userinfo', 30)
      if (userMsg) {
        state.ruleForm.email = userMsg.email
        state.ruleForm.pass = userMsg.pass
        state.checked = true
      }
      // console.log('mounted!')
    })

    return {
      formRef,
      rules,
      ...toRefs(state),
      submitForm,
      resetForm,
      resetFn,
      registerFn,
      changeCode
    }
  }
})
</script>

<style lang="scss">
.yy-login {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #FFFFFF;
  > div {
    flex: 1
  }
  overflow: hidden;
  .content {
    margin: 60px auto;
    width: 560px;
    height: 674px;
    background: #FFFFFF;
    border-radius: 20px;
    box-sizing: border-box;
    .login-box{
      text-align: center;
    }
    .logo{
      width: 180px;
      height: 80px;
    }
    .el-form-item{
      margin-bottom: 40px;
      .el-input__inner{
        border:0px;
        border-bottom:1px solid #DCDFE6;
        border-radius:0px;
      }
    }
    .email-code{
      position: relative;
      margin-bottom: 60px;
      .el-input__inner{
        width: 200px;
      }
    }
    .img-code-wrap{
      position: absolute;
      top: 0;
      right: 0;
      display:flex;
      flex-direction:column ;
      cursor: pointer;
      .img-code{
        margin-left: 10px;
        width:100px;
        height: 40px;
      }
      .text{
        text-indent: 10px;
        color: #5563cb;
      }
    }
    .title {
      margin-bottom: 40px;
      font-size: 36px;
      font-weight: 500;
      color: #010101;
    }
    .no-acount {
      text-align: center;
    }
    .login-regist {
      color: #5563cb;
      cursor: pointer;
    }
    .remember{
      display:flex;
      justify-content: center;
      .el-checkbox__label{
        color: #333333;
      }
    }
    .login-btn{
      margin-top: 30px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      .login{
        width: 328px;
        height: 70px;
        font-size: 24px;
        font-weight: 300;
        color: #FFFFFF;
        background: #5563cb;
        border-radius: 8px;
      }
    }
    .code{
      display:flex;
    }
    .reset {
      margin-left: 154px;
      display: inline-block;
      color: #5563cb;
      cursor: pointer;
    }
  }
  .bg-left {
    text-align: center;
    .logo-bg{
      width: 100%;
      height: 100%;
    }
  }
}

</style>
