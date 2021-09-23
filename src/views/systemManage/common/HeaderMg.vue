<template>
  <div class="head-mg">
    <div class="close" @click="closeFn"><i class="el-icon-close close" ></i></div>
    <div class="wrap mt20">
      <div class="label">{{propname}}</div>
      <div class="inp ">
        <el-input :placeholder="`请输入${propname}`" v-model="name" clearable>
        </el-input>
      </div>
    </div>
    <div class="wrap mt20" v-if="hasEmail">
      <div class="label">邮箱</div>
      <div class="inp ">
        <el-input placeholder="请输入邮箱" v-model="email" clearable>
        </el-input>
      </div>
    </div>
    <div class="wrap mt20" v-if="propname!='用户组名称'">
      <span class="label">状态</span>
      <div class="inp ">
        <el-select v-model="value" placeholder="请选择状态" clearable @change="getState">
          <el-option
            v-for="item in options"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="btns mt20">
      <el-button type="primary" class="check" @click="checkFn">查询</el-button>
      <el-button class="check" @click="closeFn"> 取消</el-button>
      <!-- <el-button type="primary" @click="addFn">{{BtnText}}</el-button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { dropList } from '@/api/authority'
import { HttpResponse } from '@/interface/interface'

// breadcrumbList = ['权限管理', '用户管理']
// breadcrumbList = ['权限管理', '用户组管理']
// breadcrumbList = ['权限管理', '角色管理']
export default defineComponent({
  name: 'head-mg',
  props: {
    propname: {
      type: String,
      default: '用户名'
    },
    BtnText: {
      type: String,
      default: '添加用户'
    },
    hasEmail: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      name: '',
      email: '',
      options: [
        // {
        //   key: 1,
        //   value: '请选择状态'
        // },
        // {
        //   key: '2',
        //   value: '激活'
        // },
        // {
        //   key: '3',
        //   value: '禁用'
        // },
        // {
        //   key: '4',
        //   value: '未激活'
        // }
      ] as any,
      value: '' as any
    })
    const closeFn = () => {
      emit('closeFn')
    }

    const getState = (value:any) => {
      emit('getState', value)
    }
    const checkFn = () => {
      //
      const obj = {
        name: state.name,
        email: state.email,
        value: state.value
      }
      emit('checkUserFn', obj)
    }
    const addFn = () => {
      //
      emit('addUserFn', true)
    }
    onMounted(async () => {
      if (props.propname == '用户组名称') return
      let params
      if (props.propname == '用户名') {
        params = {
          value: 'invite_user_status'
        }
      } else if (props.propname == '角色名称') {
        params = {
          value: 'role_status'
        }
      }

      const result = await dropList(params) as HttpResponse
      if (result.code == 0) {
        console.log(result.data)
        const res = result.data
        state.options = res
        if (props.propname == '用户名') {
          state.value = 2
        }
      }
    })
    return {
      ...toRefs(state),
      checkFn,
      addFn,
      getState,
      closeFn
    }
  }
})
</script>
<style lang="scss">
.head-mg {
  padding: 20px;
  width: 400px;
  box-shadow: 0px 4px 14px 2px rgb(0 0 0 / 25%);
  border-radius: 10px;
  background:#fff;
  // display: flex;
  .mf20{
    margin-left: 20px;
  }
  .mt20{
    margin-top: 20px;
  }
  .close{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 18px;
  }
  .wrap {
    display: flex;
    // margin-left: 10px;
    .label {
      width:80px;
      line-height: 40px;
      // display: flex;
      // align-items: center;
      text-align: right;
    }
    .inp {
      margin-left: 20px;
    }
  }
  .btns {
    display: flex;
    justify-content: flex-end;
    margin-left: 20px;
  }
}
</style>
