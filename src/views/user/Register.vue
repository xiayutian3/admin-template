<template>
  <div class="yy-register">
    <div class="content">
      <!-- <h1 class="title">用户注册</h1> -->
      <div class="con-form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          class="ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="2-16位数字、字母或特殊符号"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="ruleForm.email"
              placeholder="请输入正确的邮箱号"
            ></el-input>
            <!-- @blur="handleExistsemail" -->
            <!-- <div v-if="isExistsemail" class="el-form-item__error">邮箱已被注册</div> -->
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              placeholder="8-20位数字、字母或特殊符号"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              placeholder="8-20位数字、字母或特殊符号"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱验证码" prop="code" class="email-code">
            <el-input
              class="code-inp"
              v-model="ruleForm.code"
              placeholder="请输入验证码"
            ></el-input
            ><el-button class="getcode" type="text" @click="getCodeFn">
              {{ getCodeTxt }}
            </el-button>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model.number="ruleForm.phone"
              placeholder="请输入手机号"
              @blur="phoneCheck"
            ></el-input>
            <div v-if="!phoneErr" class="el-form-item__error">手机号输入有误</div>
          </el-form-item>
          <el-form-item class="detail-wrap">
            <el-checkbox v-model="checked"></el-checkbox>
            <span>
              <span style="color:#F56C6C"> *</span> 我已阅读并同意
              <span class="detail" @click="checkMsg">用户协议和隐私政策</span>
            </span>
            <div class="error" v-show="!checked">注册前请勾选</div>
          </el-form-item>
          <el-form-item >
            <el-button class="register-btn" :disabled="!checked" type="primary" @click="submitForm"
              >注册</el-button
            >
            <!-- <el-button @click="resetForm">重置</el-button> -->
          </el-form-item>
          <el-form-item class="gologin-btn">
            <span class="gologin-wrap"
              >已有账号？
              <span class="gologin" @click="goLogin">登录</span></span
            >
          </el-form-item>
        </el-form>
        <div class="man"></div>
      </div>
    </div>
    <user-agreement :dialogVisible="dialogVisible" @toggle-fn="toggleFn" />
  </div>
</template>

<script lang="ts">
import router from '@/router'
import {
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs
} from 'vue'
import UserAgreement from '@/components/common/UserAgreement.vue'
import {
  register,
  getExistsemail,
  getSendemailcode
} from '@/api/user'
import { HttpResponse } from '@/interface/interface'

export default defineComponent({
  setup () {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties

    // 当前form表单dom
    const formRef = ref()

    // 表单
    const state = reactive({
      dialogVisible: false,
      timer: -1,
      getCodeTxt: '获取验证码',
      checked: true,
      ruleForm: {
        name: '',
        email: '',
        pass: '',
        checkPass: '',
        code: '',
        phone: ''
      },
      phoneErr: true,
      isExistsemail: false
    })
    // 密码校验
    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (formRef.value.checkPass !== '') {
          formRef.value.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== state.ruleForm.pass) {
        console.log(value, state.ruleForm.pass)
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const rules = {
      name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change']
        }
      ],
      pass: [
        { validator: validatePass, trigger: 'blur' },
        { required: true, message: '请输入密码' },
        { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
      ],
      checkPass: [
        { validator: validatePass2, trigger: 'blur' },
        { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
        { required: true, message: '请再次输入密码' }
      ],
      code: [{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }]
      //   phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
    }

    const clearTimeOutFn = () => {
      if (state.timer !== -1) {
        console.log('定时器清楚', state.timer)
        clearInterval(state.timer)
      }
    }
    const phoneCheck = () => {
      if (!state.ruleForm.phone) {
        state.phoneErr = true
        return
      }
      const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      state.phoneErr = reg.test(state.ruleForm.phone)
      // console.log('state.phoneErr: ', state.phoneErr)
    }
    // 注册
    const submitForm = () => {
      if (state.isExistsemail) {
        return
      }
      // 手机号问题
      if (!state.phoneErr) {
        return
      }

      formRef.value.validate(async (valid: any) => {
        if (valid) {
          clearTimeOutFn()
          const params = {
            email: state.ruleForm.email,
            emailCode: state.ruleForm.code,
            password: state.ruleForm.pass,
            phoneNumber: state.ruleForm.phone,
            userName: state.ruleForm.name
          }

          const res = await register(params)
          const { code, msg, data } = res as HttpResponse
          console.log('res: ', res, typeof code, msg, data)
          if (code === 0) {
            currentInstance.$message.success(msg)
            state.getCodeTxt = '获取验证码'
            router.push({ name: 'Login' })
          } else {
            currentInstance.$message.error(msg)
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

    // 查看用户协议
    const checkMsg = () => {
      state.dialogVisible = true
      // console.log('查看用户协议', state.dialogVisible)
    }
    //
    const goLogin = () => {
      router.push('/login')
    }

    // 获取邮箱验证码逻辑
    const getCodeFn = async () => {
      console.log(123456)
      // 如果有定时器
      if (state.timer != -1) {
        return
      }
      // 如果邮箱为空 发送邮箱验证码
      if (state.ruleForm.email == '') {
        currentInstance.$message.warning({
          message: '请输入邮箱',
          type: 'warning'
        })
        return
      }
      let time = 60

      state.timer = window.setInterval(() => {
        if (time === 0 && state.timer) {
          clearInterval(state.timer)
          state.getCodeTxt = '获取验证码'
          state.timer = -1
          return
        }
        time--
        state.getCodeTxt = `倒计时${time}s`
        console.log(123456)
      }, 1000)

      const params = {
        email: state.ruleForm.email
      }
      const res = (await getSendemailcode(params)) as HttpResponse
      console.log(res)
      if (res.code === 0) {
        // state.ruleForm.code = res.data
        currentInstance.$message.success({
          message: '邮箱验证码发送成功',
          type: 'success'
        })
      }
    }

    // 用户协议模态管
    const toggleFn = (flag: any) => {
      // console.log('模态框关闭', flag, typeof flag)
      state.dialogVisible = false
      // 协议的勾选
      if (typeof flag === 'boolean') {
        state.checked = flag
      }
    }

    // 检查邮箱是否已注册
    const handleExistsemail = async () => {
      const params = {
        email: '1127071993@qq.com'
      }
      const res = await getExistsemail(params) as HttpResponse
      if (res.code == 0) {
        // console.log('检查邮箱是否存在', res.data)
        state.isExistsemail = res.data
      }
    }

    onMounted(async () => {

      // const res = await getdata()
      // console.log('我是否获取到data', res)
    })

    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
      clearTimeOutFn()
    })

    return {
      formRef,
      rules,
      ...toRefs(state),
      submitForm,
      resetForm,
      goLogin,
      getCodeFn,
      checkMsg,
      toggleFn,
      handleExistsemail,
      phoneCheck
    }
  },
  components: {
    UserAgreement
  }
})
</script>

<style lang="scss">
.yy-register {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  background-image: url("./img/register-bg.png");
  background-size: 100% 100%;
  .content {
    .ruleForm {
      width: 560px;
      height: 774px;
      padding: 42px 70px 42px 30px;
      background: #ffffff;
      border-radius: 20px;
      box-sizing: border-box;
      .el-form-item{
        margin-bottom: 40px;
      }
      .el-input__inner{
        border:0px solid;
        border-bottom: 1px solid #DCDFE6;
        border-radius:0px;
      }
    }
    .man {
      margin-left: 290px;
      width: 466px;
      height: 405px;
      background-image: url("./img/register-man.png");
    }
    .title {
      text-align: center;
    }
    .con-form {
      display: flex;
      align-items: center;
      .email-code{
        position: relative;
      }
      .code-inp {
        // margin-right: 42px;
        // width: 245px;
      }
      .getcode {
        position: absolute;
        top: 0;
        right: 0;
        width: 112px;
        color: #5563CB;
      }
      .detail-wrap{
        position: relative;
      }
      .error{
        position: absolute;
        top: 22px;
        left: 18px;
        font-size: 12px;
        color: #DD0000;
      }
      .register-btn{
        margin-top: -10px;
        width: 328px;
        height: 70px;
        background: #5563CB;
        border-radius: 8px;
        font-size: 24px;
        font-weight: 300;
        color: #FFFFFF;
      }
      .detail {
        color: #5563CB;
        cursor: pointer;
      }
      .gologin-wrap{
        margin-left: 112px;
      }
      .gologin-btn{
        margin-top: -16px;
      }
      .gologin {
        color: #5563CB;
        cursor: pointer;
      }
    }
  }
}
</style>
