<template>
  <div class="yy-reset">
    <div class="content">
      <h1 class="title">重置密码</h1>
      <div class="form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="邮箱" prop="email">
            <div class="email-inp">
              <el-input
                v-model="ruleForm.email"
                placeholder="请输入正确的邮箱号"
                @blur="handleBlur"
              ></el-input>
               <div v-if="!existsemail" class="el-form-item__error">该邮箱号尚未注册，请去注册</div>
              <!-- <div class="email-err" v-if="!existsemail">该邮箱号尚未注册，请去注册</div> -->
            </div>

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
            ><el-button class="getcode" @click="getCodeFn">
              {{ getCodeTxt }}
            </el-button>
          </el-form-item>
          <div class="btns">
            <el-button class="submit-btn" type="primary" @click="submitForm">确定</el-button>
            <!-- <el-button @click="resetForm">清空</el-button> -->
          </div>
          <div class="gologin-wrap">
            <span
              >不重置？
              <span class="gologin" @click="goLogin">去登录</span></span
            >
          </div>
        </el-form>
      </div>
    </div>
    <div class="reset"></div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent, getCurrentInstance, onBeforeUnmount, reactive, ref, toRefs } from 'vue'
import { getExistsemail, getSendemailcode, resetpassword } from '@/api/user'
import { HttpResponse } from '@/interface/interface'

export default defineComponent({
  setup () {
    // 获取当前实例
    const currentInstance: any = getCurrentInstance()?.appContext.config.globalProperties
    // 当前form表单dom
    const formRef = ref()
    // 表单
    const state = reactive({
      timer: -1,
      getCodeTxt: '获取验证码',
      ruleForm: {
        email: '',
        pass: '',
        checkPass: '',
        code: ''
      },
      existsemail: true
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
        { required: true },
        { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
      ],
      checkPass: [
        { validator: validatePass2, trigger: 'blur' },
        { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
        { required: true }
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
    const submitForm = () => {
      formRef.value.validate(async (valid: any) => {
        if (valid) {
          clearTimeOutFn()
          // alert('submit!')
          const params = {
            email: state.ruleForm.email,
            emailCode: state.ruleForm.code,
            newPassword: state.ruleForm.pass
          }
          const res = await resetpassword(params) as HttpResponse
          if (res.code == 0) {
            currentInstance.$message.success('密码重置成功')
            router.push('/login')
          } else {
            currentInstance.$message.error('密码重置失败')
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
    //
    const goLogin = () => {
      router.push('/login')
    }

    // // 验证码逻辑
    // const getCodeFn = () => {
    //   let time = 60

    //   state.timer = window.setInterval(() => {
    //     if (time === 0 && state.timer) {
    //       clearInterval(state.timer)
    //       state.getCodeTxt = '获取验证码'
    //       console.log('清楚定时器')
    //       return
    //     }
    //     time--
    //     state.getCodeTxt = `倒计时${time}s`
    //     console.log(123456)
    //   }, 1000)
    // }
    // 验证邮箱是否已存在
    const handleBlur = async () => {
      if (!state.ruleForm.email) {
        return
      }
      console.log(123456)
      const params = {
        email: state.ruleForm.email
      }
      const res = await getExistsemail(params) as HttpResponse
      if (res.code == 0) {
        state.existsemail = res.data
      }
      console.log('res: ', res)
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
        // console.log(132)
      }, 1000)

      const params = {
        email: state.ruleForm.email
      }
      const res = await getSendemailcode(params) as HttpResponse
      console.log(res)
      if (res.code === 0) {
        // state.ruleForm.code = res.data
        currentInstance.$message.success({
          message: '邮箱验证码发送成功',
          type: 'success'
        })
      }
    }

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
      handleBlur
    }
  }
})
</script>

<style lang="scss">
.yy-reset {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color:#F5F5F5;
  background-image: url("./img/register-bg.png");
  background-size: 100% 100%;
  .content {
    padding: 30px 75px 0 25px;
    width: 560px;
    height: 690px;
    background: #FFFFFF;
    border-radius: 20px;
    box-sizing: border-box;
    .title {
      margin-bottom: 70px;
      text-align: center;
      font-size: 37px;
      font-weight: 400;
      color: #333333;
    }
    .form {
      .el-form-item{
        margin-bottom: 40px;
      }
      .el-input__inner{
        border: 0px;
        border-bottom: 1px solid #DCDFE6;
        border-radius: 0px;
      }
      .email-code{
        position: relative;
      }
      .email-inp{
        position: relative;
        // display: flex;
        // align-items: center;
        .email-err{
          position: absolute;
          top: 0;
          right:-191px;
          color: #F56C6C;
          font-size: 12px;
        }
      }
      .code-inp {
        margin-right: 42px;
        // width: 245px;
      }
      .getcode {
        position: absolute;
        top: -2px;
        right: 0;
        width: 112px;
        color: #5563CB;
        border:0px;
        border-radius: 0px;
        // border-bottom: 1px solid #DCDFE6;
        background: #FFFFFF;
      }
      .btns{
        margin-left: 56px;
        margin-top: 55px;
        margin-bottom: 30px;
        display: flex;
        justify-content: center;
      }
      .submit-btn{
        position: relative;
        left: -7px;
        width: 328px;
        height: 70px;
        background: #5563CB;
        border-radius: 8px;
        font-size: 24px;
        font-weight: 300;
        color: #FFFFFF;
      }
      .gologin-wrap{
        margin-left: 195px;
      }
      .gologin {
        color: #5563CB;
        cursor: pointer;
      }
    }
  }
  .reset{
    margin-left: 300px;
    width:420px;
    height: 274px;
    background-image: url("./img/lock.png");
    background-size: 100% 100%;
  }
}
</style>
