<template>
  <div id="nav_header">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#fff"
      text-color="#666"
      active-text-color="#ffd04b"
    >
      <a
        class="nav_header_spread_icon nav_header_icon"
        @click="isSpread"
        title="侧边伸缩"
        href="javascript:void(0);"
      >
        <i :class="isCollapse == true ? 'el-icon-s-unfold' : 'el-icon-s-fold' "></i>
      </a>
      <a
        class="nav_header_refresh_icon nav_header_icon"
        @click="refresh"
        title="刷新"
        href="javascript:void(0);"
      >
        <i class="el-icon-refresh-right"></i>
      </a>
      <el-submenu index="1" class="nav-header-right">
        <template slot="title" height="50px">{{username}}</template>
        <el-menu-item index="1-1" @click.native="editPassword">修改密码</el-menu-item>
        <el-menu-item index="1-2" @click.native="exit">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { mapActions,mapGetters } from "vuex";
import editPassword from "views/system/usermanagement/edit_password";

export default {
  name: "nav_header",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      isCollapse: this.$store.state.isCollapse
    };
  },
  inject: ["reload"],
  created() {
    let _this = this;
    this.minloginOut(_this);
  },
  computed: {
    ...mapGetters(["username"])
  },
  methods: {
    isSpread() {
      this.isCollapse = !this.$store.state.isCollapse;
      this.$store.commit("SET_ISCOLLAPSE", !this.$store.state.isCollapse);
    },
    refresh() {
      this.reload();
    },
    editPassword() {
      this.$layer.iframe({
        content: {
          content: editPassword,
          parent: this,
          data: {}
        },
        area: ["500px", "auto"],
        title: "修改当前用户密码",
        shadeClose: false
      });
    },
    exit() {
      let _this = this;
      this.loginout(_this);
    },
    ...mapActions({
      loginout: "loginOut",
      minloginOut: "minloginOut"
    })
  }
};
</script>
<style>
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 49px !important;
  line-height: 49px !important;
  border-bottom: 2px solid transparent;
}
</style>
<style lang="less" scoped>
@navHeaderHeight: 50px;
#nav_header {
  height: @navHeaderHeight;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  & > ul {
    height: @navHeaderHeight;
    padding: 0 20px;
    .nav_header_icon {
      margin-right: 20px;
      font-size: 20px;
      line-height: @navHeaderHeight;
      cursor: pointer;
      outline: none;
    }
    .nav-header-right.el-submenu {
      height: @navHeaderHeight;
      overflow: hidden;
      float: right;
    }
  }
}
</style>


