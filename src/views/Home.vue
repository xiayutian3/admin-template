<template>
  <div class="yeying">
    <div class="yy-top">
      <yy-header @handleshowmenu="handleshowmenu" :showMenu="showMenu"></yy-header>
    </div>
    <div class="yy-content">
      <div class="lt" :class="{ 'lt-toggle': isCollapse }">
        <div class="lt-nav">
          <yy-side @getCollapse="getCollapse" :showMenu="showMenu" ></yy-side>
        </div>
      </div>
      <div class="rt">
        <div class="rt-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, watch } from 'vue'
import { receiveInvite } from '@/api/user'
import { HttpResponse } from '@/interface/interface'
import yyHeader from '@/layout/header.vue'
import yySide from '@/layout/side.vue'
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage'

export default defineComponent({
  components: { yyHeader, yySide },
  setup () {
    const store = useStore()
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties

    const state = reactive({
      showMenu: '1'
    })
    const handleshowmenu = (val: string) => {
      console.log('val: ', val)
      state.showMenu = val
    }

    // 左侧菜单收缩展开
    const isCollapse = ref(false)
    const getCollapse = (value: boolean) => {
      isCollapse.value = value
    }

    // 激活用户
    const code = store.state.user.code
    const userId = store.state.user.userId
    const groupId = store.state.user.groupId
    const getReceiveInvite = async () => {
      const params = {
        user_id: userId,
        group_id: groupId,
        code
      }
      const res = await receiveInvite(params) as HttpResponse
      console.log('res: ', res)
      if (res.code == 0) {
        currentInstance.$message.success({
          message: '激活成功',
          type: 'success'
        })
      }
    }
    if (code && userId && groupId) {
      getReceiveInvite()
    }

    const getMenu = getLocalStorage('showMenu')
    if (getMenu) {
      state.showMenu = getMenu
    }

    watch(() => state.showMenu, (newmenu, oldmemu) => {
      setLocalStorage('showMenu', newmenu)
    })
    return {
      ...toRefs(state),
      isCollapse,
      getCollapse,
      handleshowmenu
    }
  }
})
</script>

<style lang="scss">
.head-lang-drop {
  width: 100px;
}
.head-user-drop {
  width: 100px;
}
.yeying {
  // display: flex;
  height: 100%;
  .yy-top {
    margin-bottom: 18px;
  }
  .yy-content {
    display: flex;
    height: calc(100% - 116px);
  }
  .lt {
    &.lt-toggle {
      width: 65px;
    }
    transition: width 0.3s ease-in-out;
    flex: 0 0 274px;
    width: 274px;
    height: 100%;
    flex-shrink: 0;
    overflow: hidden;
    background: #ffffff;
    border-radius: 20px;
    // background-color: pink;
    .lt-top {
      position: relative;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #fff;
      text-align: center;
      overflow: hidden;
      margin-bottom: 30px;
      margin-top: 20px;
      .logo-link {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .sidebar-logo {
        &.sidebar-toggle {
          margin-right: 0px;
          width: 30px;
          height: 30px;
        }
        margin-right: 12px;
        width: 50px;
        height: 50px;
      }
      .sidebar-title {
        display: inline-block;
        margin: 0;
        color: #435ebe;
        font-weight: 600;
        line-height: 50px;
        font-size: 24px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
      }
    }
    .lt-nav {
      width: 274px;
      // height: calc(100% - 50px);
      height: 100%;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      // background-color: #fff;
    }
  }
  .rt {
    margin-left: 18px;
    position: relative;
    // flex: 1;
    width: calc(100% - 292px);
    min-height: 100%;
    // max-width: 100%;
    // background: lightblue;
    .collapse-btn {
      position: absolute;
      top: 12px;
      left: 10px;
      font-size: 25px;
      cursor: pointer;
    }

    .rt-content {
      // max-width: 100%;
      height: 100%;
      // padding: 15px;
      box-sizing: border-box;
      min-height: calc(100%);
      // background-color: #fff;
      border-radius: 20px;
      .crumb-wrap {
        padding-bottom: 10px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
        // height: 35px;
      }
    }
  }
}
</style>
