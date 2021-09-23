<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted } from 'vue'
import { getQueryString } from '@/utils/utils'
import { receiveInvite } from '@/api/user'
import { HttpResponse } from './interface/interface'
import store from '@/store'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
  components: {
    [ElConfigProvider.name]: ElConfigProvider
  },
  setup () {
    // 获取当前实例
    const currentInstance: any =
      getCurrentInstance()?.appContext.config.globalProperties
    // 激活用户

    const code = getQueryString('code')
    const userId = getQueryString('user_id')
    const groupId = getQueryString('group_id')
    if (code && userId) {
      store.dispatch('user/setuserid', userId)
      store.dispatch('user/setgroupid', groupId)
      store.dispatch('user/setcode', code)
    }

    return {
      locale: zhCn
    }
  }
})
</script>

<style>
#app,
body,
html {
  height: 100%;
}
.app{
  padding: 0 30;
  width: 100%;
  height: 100%;
  min-width: 1440px;
  background-color:#F5F5F5;
  box-sizing: border-box;
}
div{
  box-sizing: border-box;
}

</style>
