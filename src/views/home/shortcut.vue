<template>
  <div class="home_shortcut">
    <el-card class="grid-content bg-purple">
          <div slot="header" class="clearfix">
            <span>快捷方式</span>
          </div>
    <el-row :gutter="10">
      <el-col :xs="12" :lg="12">
        <div class="shortcut-item">
          <router-link :to="{ path: '/assets/list' }">
            <div class="shortcut-item-img-wrap">
              <img src="~assets/img/assets.png" alt />
            </div>
            <cite>资产管理</cite>
          </router-link>
        </div>
      </el-col>
       <el-col :xs="12" :lg="12">
        <div class="shortcut-item">
          <router-link :to="{path:'/system/log/operationlog'}">
            <div class="shortcut-item-img-wrap">
              <img src="~assets/img/rules.png" alt />
            </div>
            <cite>操作日志</cite>
          </router-link>
        </div>
      </el-col>
      <el-col :xs="12" :lg="12">
        <div class="shortcut-item">
          <router-link :to="{path:'/system/managehost'}">
            <div class="shortcut-item-img-wrap">
              <img src="~assets/img/net.png" alt />
            </div>
            <cite>信任主机</cite>
          </router-link>
        </div>
      </el-col>
      <el-col :xs="12" :lg="12">
        <div class="shortcut-item">
          <router-link :to="{path:'/system/platformset'}">
            <div class="shortcut-item-img-wrap">
              <img src="~assets/img/management.png" alt />
            </div>
            <cite>平台设置</cite>
          </router-link>
        </div>
      </el-col>
      
    </el-row>
    </el-card>
  </div>
</template>
<script>
import {echartDataDetail} from 'req/api/home'

export default {
  name: "home_shortcut",
  data() {
    return {

    }
  },
  created () {
    echartDataDetail()
  }
};
</script>
<style lang="less">
.home_shortcut {
  .shortcut-item {
      padding:5px;
      box-sizing:border-box;
    & > a {
      display: block;
      text-align:center;
      color:#666;
      .shortcut-item-img-wrap {
        width: 100%;
        height: 60px;
        // margin-bottom:5px;
        line-height: 60px;
        background: #f8f8f8;
        img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>


