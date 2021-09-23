<template>
  <div class="yy-side">
    <el-menu
      default-active=""
      class="el-menu-vertical-demo"
      :unique-opened="true"
      @select="handleSelect"
      :collapse="isCollapse"
    >
      <template v-if="showMenu == 2">
        <el-submenu index="5">
          <template #title>
            <i class="iconfont icon-a-Companygoogle"></i>
            <span class="ml10">Google</span>
          </template>
          <el-menu-item index="5-1">广告列表</el-menu-item>
          <el-menu-item index="5-2">广告任务</el-menu-item>
          <el-submenu index="5-3">
            <template #title>
              <!-- <i class="el-icon-setting"></i> -->
              <span>广告发布</span>
            </template>
            <el-menu-item index="5-3-1">搜索广告</el-menu-item>
            <el-menu-item index="5-3-2">购物广告</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="6">
          <template #title>
            <i class="iconfont icon-a-Facebook-Original"></i>
            <span class="ml10">Facebook</span>
          </template>
          <el-menu-item index="6-1">广告列表</el-menu-item>
          <el-menu-item index="6-2">广告任务</el-menu-item>
          <el-menu-item index="6-3">广告发布</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template #title>
            <i class="iconfont icon-amazon"></i>
            <span class="ml10">Amazon</span>
          </template>
          <el-menu-item index="7-1">广告列表</el-menu-item>
          <!-- <el-menu-item index="7-2">广告任务</el-menu-item> -->
          <el-submenu index="7-3">
            <template #title>
              <!-- <i class="el-icon-setting"></i> -->
              <span>广告发布</span>
            </template>
            <el-menu-item index="7-3-1">sp广告</el-menu-item>
            <el-menu-item index="7-3-2">sb广告</el-menu-item>
            <el-menu-item index="7-3-3">sd广告</el-menu-item>
            <el-menu-item index="7-3-4">广告组合</el-menu-item>
          </el-submenu>
        </el-submenu>
      </template>
      <template v-if="showMenu == 1">
        <el-menu-item index="9">
          <template #title>
            <i class="iconfont icon-sharp"></i>
            <span class="ml10">仪表盘</span>
          </template>
        </el-menu-item>
        <el-submenu index="a-2">
          <template #title>
            <i class="iconfont icon-amazon"></i>
            <span class="ml10">Amazon</span>
          </template>
          <el-menu-item index="a-2-1">数据总览</el-menu-item>
        </el-submenu>
      </template>
      <template v-if="showMenu == 3">
        <el-submenu index="8">
          <template #title>
              <i class="iconfont icon-Multimedia"></i>
            <span class="ml10">素材库</span>
            </template>
          <el-menu-item index="8-1">素材管理</el-menu-item>
        </el-submenu>
      </template>
      <template v-if="showMenu == 4">
        <el-submenu index="10">
          <template #title>
            <i class="iconfont icon-Management"></i>
            <span class="ml10">权限管理</span>
          </template>
          <el-menu-item index="10-1">用户管理</el-menu-item>
          <el-menu-item index="10-2">角色管理</el-menu-item>
          <el-menu-item index="10-3">用户组管理</el-menu-item>
        </el-submenu>
        <el-submenu index="11">
          <template #title>
            <i class="iconfont icon-Club"></i>
            <span class="ml10">广告账户管理</span>
          </template>
          <el-menu-item index="11-1">广告账号列表</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <!-- 菜单收缩 -->
    <!-- <i
      class="collapse-btn"
      :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
      @click="onChangeCollapse"
    ></i> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import router from '@/router'
export default defineComponent({
  name: 'AdAccountManage',
  props: {
    showMenu: {
      type: String,
      default: '1'
    }
  },
  emits: ['getCollapse'],
  setup (props, ctx) {
    const isCollapse = ref(false)
    const onChangeCollapse = () => {
      isCollapse.value = !isCollapse.value
      ctx.emit('getCollapse', isCollapse.value)
    }
    // 路由跳转
    const handleSelect = (key: any, keyPath: unknown) => {
      console.log(typeof key, key, keyPath)
      switch (key) {
        case '10-1':
          router.push({ name: 'UserManage' })
          break
        case '10-2':
          router.push({ name: 'RoleManage' })
          break
        case '10-3':
          router.push({ name: 'GroupManage' })
          break
        case '5-1':
          router.push({ name: 'GgListad' })
          break
        case '5-2':
          router.push({ name: 'GgTaskad' })
          break
        case '5-3-1':
          router.push({ name: 'GgSearchad' })
          break
        case '5-3-2':
          router.push({ name: 'GgShopad' })
          break
        case '6-1':
          router.push({ name: 'FbListad' })
          break
        case '6-2':
          router.push({ name: 'FbTaskad' })
          break
        case '6-3':
          router.push({ name: 'FbPublic' })
          break
        case '7-1':
          router.push({ name: 'AmznListad' })
          break
        case '7-2':
          router.push({ name: 'AmznTaskad' })
          break
        case '7-3-1':
          router.push({ name: 'AmznSpad' })
          break
        case '7-3-2':
          router.push({ name: 'AmznSbad' })
          break
        case '7-3-3':
          router.push({ name: 'AmznSdad' })
          break
        case '7-3-4':
          router.push({ name: 'AmznAdcomposition' })
          break
        case '8-1':
          router.push({ name: 'MaterialManneg' })
          break
        case '9':
          router.push({ name: 'DataInsightDashboard' })
          break
        case '11-1':
          router.push({ name: 'AdAccountManage' })
          break
        case 'a-2-1':
          router.push({ name: 'AmDataOverview' })
          break
      }
      // console.log(breadcrumbList)
      // store.commit('common/SETBREADCRUMBLIST', breadcrumbList)
    }
    return {
      isCollapse,
      handleSelect,
      onChangeCollapse
    }
  }
})
</script>
<style lang="scss" scoped>
.yy-side {
  position: relative;
  width: 100%;
  height: 100%;
  .collapse-btn {
    position: absolute;
    font-size: 20px;
    color: #666666;
    cursor: pointer;
    transition: 0.3s;
  }
  .ml10{
    margin-left:10px;
  }
  .el-icon-s-unfold {
    left: 8%;
    bottom: 20px;
  }
  .el-icon-s-fold {
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
  }
  .el-menu{
    border-right: none;
  }
}
</style>
