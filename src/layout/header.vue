<template>
  <div class="yy-header">
    <div class="top-lt">
      <img class="logo" src="../assets/logo.svg" alt="logo" />
    </div>
    <div class="top-rt">
      <el-menu
        :default-active="activeIndex"
        text-color="#333333"
        active-text-color="#5563cb"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <i class="iconfont icon-donut-large"></i>
          数据洞察
        </el-menu-item>
        <el-menu-item index="2">
          <i class="iconfont icon-guang"></i>
          广告管理
        </el-menu-item>
        <el-menu-item index="3">
          <i class="iconfont icon-Bag"></i>
          工具中心
        </el-menu-item>
        <el-menu-item index="4">
          <i class="iconfont icon-setting"></i>
          系统管理
        </el-menu-item>
      </el-menu>
      <div class="user-wrap">
        <div class="user-info">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img class="user" src="../assets/images/user.png" alt="" />
            </span>
            <template #dropdown>
              <el-dropdown-menu class="head-user-drop">
                <el-dropdown-item command="loginout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="name">{{ loginuserInfo.userName }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, toRef } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { handleloginOut } from '@/utils/utils'
export default defineComponent({
  name: 'AdAccountManage',
  props: {
    showMenu: {
      type: String,
      default: '1'
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const state = reactive({
      activeIndex: '1'
    })
    const router = useRouter()
    state.activeIndex = toRef(props, 'showMenu').value
    // 头部下拉菜单相关操作
    const handleCommand = (command: string) => {
      console.log('命令', command)
      switch (command) {
        case 'loginout':
          handleloginOut()
          break
      }
    }
    const handleSelect = (key: string, keyPath: string) => {
      console.log(key, keyPath)
      emit('handleshowmenu', key)
      switch (key) {
        case '1':
          router.push('/home/dashboard')
          break
        case '2':
          router.push('/home/gglistad')
          break
        case '3':
          router.push('/home/materialManage')
          break
        case '4':
          router.push('/home/usermg')
          break
      }
    }

    return {
      ...toRefs(state),
      loginuserInfo: computed(() => store.state.user.loginuserInfo),
      handleCommand,
      handleSelect
    }
  }
})
</script>
<style lang="scss" scoped>
.yy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  background: #ffffff;
  .top-lt {
    width: 160px;
    height: 70px;
    .logo {
      width: 100%;
      height: 100%;
    }
  }
  .top-rt {
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-menu.el-menu--horizontal{
      border-bottom:0px;
      .el-menu-item {
        padding: 0 15px;
        font-size: 16px;
      }
    }
    .lang {
      margin-right: 10px;
      cursor: pointer;
    }
    .notebook {
      font-size: 30px;
    }
    .user-wrap {
      margin-left: 20px;
      margin-right: 60px;
      display: flex;
      align-items: center;
      height: 50px;
      .user-info{
        display: flex;
        align-items: center;
      }
      .name {
        margin-left: 20px;
        margin-bottom: 5px;
        font-size: 20px;
        font-weight: 400;
        color: #333333;
      }
    }
    .user {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
    }
    // icon大小修改
    .iconfont{
      font-size: 18.8px;
    }
  }
}
</style>
