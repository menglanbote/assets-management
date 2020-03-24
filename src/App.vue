<template>
  <div id="app" class="container-wrap">
    <el-container>
      <el-aside :width="isCollapse == false ? '220px' : '64px'" v-if="isNavShow">
        <nav-tap></nav-tap>
      </el-aside>
      <el-container>
        <el-header v-show="isNavShow" height="90px" >
          <nav-header v-if="isNavShow"></nav-header>
          <nav-tabs></nav-tabs>
        </el-header>
        <el-main>
          <div class="container-mian-body">
            <keep-alive v-if="isRouterAlive">
              <router-view />
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navTap from "components/nav_tap";
import navHeader from "components/nav_header";
import navTabs from "components/nav_tabs";
import { mapGetters, mapMutations } from "vuex";
import { setHistoryPath, setBreadCrumb } from "common/js/router";
import { isInstall } from "req/api/login";
import * as types from "store/mutation_types";
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true,
      currentPathList: []
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  components: {
    navTap,
    navHeader,
    navTabs
  },
  created() {
    
    // if (window.performance.navigation.type == 1) {
    if (this.$tools.getStorageObj("store")) {
      this.$store.replaceState(
        Object.assign({}, this.$store.state, this.$tools.getStorageObj("store"))
      );
      this.$tools.setStorageObj("store", null);
    }
    // }
  },
  computed: {
    ...mapGetters(["isCollapse","isNavShow"])
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    ...mapMutations({
      set_isNavShow:types.SET_ISNAVSHOW
    })
  },
  watch: {
    $route() {
      setHistoryPath(this, "historyPath", "SET_HISTORYPATH");
      if(this.$route.path.indexOf('/login') > -1 || this.$route.path.indexOf('/install') > -1) {
        this.set_isNavShow(false)
      }else {
        this.set_isNavShow(true)
      }
    }
  }
};
</script>

<style lang="less">
@import "./assets/css/base.css";
.container-wrap {
  min-width: 1024px;
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header,
  .el-main {
    padding: 0;
    .container-mian-body {
      height: calc(100% - 30px);
      margin: 15px;
    }
  }
}
</style>
