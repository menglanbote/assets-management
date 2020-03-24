<template>
  <div id="nav_tap">
    <el-row class="tac">
      <el-col>
        <div class="nav_tap_title" @click="backhome()">
          <h5 v-show="!isCollapse">{{ home_title }}</h5>
          <i v-show="isCollapse" class="el-icon-menu nav_tap_logo"></i>
        </div>

        <el-menu
          :default-active="currentNavPath"
          class="el-menu-vertical-demo"
          background-color="#03152A"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isCollapse"
          router
        >
          <div
            class="el-submenu-item"
            v-for="(item, index) in menulistData"
            :key="index"
          >
            <el-submenu v-if="item.children" :index="setMenuIndex(index)">
              <template slot="title">
                <i :class="item.type"></i>
                <span slot="title" v-show="!isCollapse">{{ item.text }}</span>
              </template>

              <div v-for="(subItem, i) in item.children" :key="i">
                <el-submenu
                  v-if="subItem.children"
                  :index="setMenuIndex(index, i)"
                >
                  <template slot="title">
                    <span>{{ subItem.text }}</span>
                  </template>
                  <el-menu-item
                    v-for="(threeItem, k) in subItem.children"
                    :key="k"
                    :index="threeItem.path"
                  >
                    <span>{{ threeItem.text }}</span>
                  </el-menu-item>
                </el-submenu>

                <el-menu-item v-else :index="subItem.path">
                  <span>{{ subItem.text }}</span>
                </el-menu-item>
              </div>
            </el-submenu>

            <el-menu-item v-else :index="item.path">
              <i :class="item.type"></i>
              <span slot="title" v-show="!isCollapse">{{ item.text }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getConfig } from "req/api/serverconfig/configset";
import * as types from "store/mutation_types";
import { setMenu } from "router";

export default {
  name: "navTap",
  data() {
    return {
      open: "send",
      home_title: "自动化服务管理系统",
      menulistData: []
    };
  },
  created() {
    setMenu().then(res => {
      this.menulistData = res;
    });
    this.__getTipList();
    this.setHomeTitle();
  },
  inject: ["reload"],
  computed: {
    ...mapGetters(["isCollapse", "currentNavPath", "authorInfo"])
  },
  methods: {
    setHomeTitle() {
      let authorizationInfo = this.authorInfo;
      if (authorizationInfo) {
        authorizationInfo = JSON.parse(authorizationInfo);
        this.home_title = authorizationInfo.product_name;
      }
    },
    __getTipList() {
      getConfig({
        type: "webPageAlertsManage"
      })
        .then(res => {
          let data = res.data;
          let tipdata = {};
          Object.keys(data).forEach(key => {
            if (data[key]) {
              tipdata[key] = data[key].split(",");
            } else {
              tipdata[key] = [];
            }
          });
          this.set_tipList(tipdata);
        })
        .catch(err => {});
    },
    setMenuIndex(...key) {
      let str = "";
      if (key.length > 0) {
        for (var index in key) {
          if (index == 0) {
            key[index] += 1;
          }
          str += "_" + key[index];
        }
      }
      return str.slice(1);
    },
    backhome() {
      if (this.$route.path.indexOf("/home") > -1) {
        this.reload();
        return;
      }
      this.$router.push("/home");
    },
    ...mapMutations({
      set_tipList: types.SET_TIPLIST
    })
  }
};
</script>

<style scoped lang="less">
@nav_tap_bk: #03152a;

#nav_tap {
  height: 100%;
  overflow: hidden;
  background: @nav_tap_bk;
  .nav_tap_title {
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    h5 {
      height: 50px;
      color: #fff;
      font-size: 18px;
    }
    .nav_tap_logo {
      color: #fff;
    }
  }
  .el-menu {
    border-right: none !important;
    .el-submenu-item {
      width: 220px !important;
    }
  }
}
</style>
