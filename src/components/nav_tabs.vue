<template>
  <div id="nav_tabs">
    <div class="nav_tabs_prev nav_tabs_button" @click="prev($event)">
      <a href="javascript:;">
        <i class="el-icon-d-arrow-left"></i>
      </a>
    </div>
    <div class="nav_tabs_main" ref="nav_tabs_main">
      <ul
        class="nav_tabs_main_wrap clr"
        ref="nav_tabs_main_wrap"
        :style="{left:main_warp_left + 'px'}"
      >
        <li
          v-for="(item,index) of historyPath"
          :key="item.path"
          class="nav_tabs_button"
          :class=" $route.path.indexOf(item.path) > -1 ? 'nav_tabs_button_this' : '' "
        >
          <router-link :to="{path:item.path}" v-if="index == 0">
            <i class="el-icon-house"></i>
          </router-link>
          <router-link v-else href="javascript:;" :to="{path:item.path}">
            {{item.name}}
            <span class="nav_tabs_close">
              <i class="el-icon-close" :data-index="index" @click.stop="closeTab(index)"></i>
            </span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="nav_tabs_next nav_tabs_button" @click="next">
      <a href="javascript:;">
        <i class="el-icon-d-arrow-right"></i>
      </a>
    </div>
    <div class="nav_tabs_more nav_tabs_button">
      <el-dropdown size="small" :hide-on-click="false">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item @click.native="closeCurrent" >关闭当前标签页</el-dropdown-item>
          <el-dropdown-item divided @click.native="closeOther">关闭其他标签页</el-dropdown-item>
          <el-dropdown-item divided @click.native="closeAll">关闭全部标签页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "nav_tabs",
  data() {
    return {
      main_warp_left: 0
    };
  },
  computed: {
    ...mapGetters(["historyPath"])
  },
  methods: {
    prev(e) {
      let main_width = this.$refs.nav_tabs_main.offsetWidth;
      let main_warp_width = this.$refs.nav_tabs_main_wrap.offsetWidth;

      let width = main_warp_width + this.main_warp_left;
      if (main_width < width) {
        this.main_warp_left -= main_width;
      }
    },
    next() {
      let main_width = this.$refs.nav_tabs_main.offsetWidth;
      if (!Math.abs(this.main_warp_left) > 0) {
        return;
      }
      if (Math.abs(this.main_warp_left) > main_width) {
        this.main_warp_left += main_width;
      } else {
        this.main_warp_left = 0;
      }
    },
    closeTab(index) {
      let list = this.historyPath.slice();
      let currentPath = list[index].path;
      list.splice(index, 1);
      this.set_historyPath(list);
      if(this.$route.path != currentPath ){
        return
      }
      if (this.historyPath[index]) {
        this.$router.push(this.historyPath[index].path).catch(err => {
          console.log(err);
        });
      } else {
        this.$router.push(this.historyPath[index - 1].path).catch(err => {
          console.log(err);
        });
      }
    },
    selectCurrentIndex(list,param,val){
      for(let index in list) {
        if(list[index][param] == val) {
          return index
        }
      }
    },
    closeCurrent() {
      let currentPath = this.$route.path
      if(currentPath.indexOf('/home') > -1) {
        return
      }
      let list = this.historyPath.slice()
      let index = this.selectCurrentIndex(list,'path',currentPath)
      list.splice(index, 1);
      this.set_historyPath(list);
      if (this.historyPath[index]) {
        this.$router.push(this.historyPath[index].path).catch(err => {
          console.log(err);
        });
      } else {
        this.$router.push(this.historyPath[index - 1].path).catch(err => {
          console.log(err);
        });
      }
    },
    closeOther() {
      let currentPath = this.$route.path
      let list = this.historyPath.slice()
      let index = this.selectCurrentIndex(list,'path',currentPath)
      let newList = list.filter((item,i) => {
        return i == 0 || i == index
      })
      this.set_historyPath(newList);
    },
    closeAll() {
      let currentPath = this.$route.path
      let list = this.historyPath.slice()
      list.splice(1)
      this.set_historyPath(list);
      if(currentPath.indexOf('/home') == -1 ) {
        this.$router.push('/home').catch(err => {
          console.log(err);
        });
      }
    },
    ...mapMutations({
      set_historyPath: "SET_HISTORYPATH"
    })
  },
  watch: {
    $route() {
      for (let index in this.historyPath) {
        if (this.historyPath[index].path == this.$route.path) {
        
          let main_width = this.$refs.nav_tabs_main.offsetWidth;
          if (
            index == this.historyPath.length - 1 &&
            this.$refs.nav_tabs_main_wrap.querySelectorAll("li")[index] ==
              undefined
          ) {
            
            let currentWidth = this.$refs.nav_tabs_main_wrap.querySelectorAll(
              "li"
            )[index - 1].offsetWidth;
            let currentLeft = this.$refs.nav_tabs_main_wrap.querySelectorAll(
              "li"
            )[index - 1].offsetLeft;
            let rightwidth = currentWidth + currentLeft + 110;
            if (main_width + Math.abs(this.main_warp_left) < rightwidth) {
              this.main_warp_left -=
                rightwidth - main_width - Math.abs(this.main_warp_left);
            }
          } else {
            
            let currentWidth = this.$refs.nav_tabs_main_wrap.querySelectorAll(
              "li"
            )[index].offsetWidth;
            let currentLeft = this.$refs.nav_tabs_main_wrap.querySelectorAll(
              "li"
            )[index].offsetLeft;
            
            if (Math.abs(this.main_warp_left) > currentLeft) {
              this.main_warp_left +=
                Math.abs(this.main_warp_left) - currentLeft;
            }
            
            let rightwidth = currentLeft + currentWidth;
            if (Math.abs(this.main_warp_left) + main_width < rightwidth) {
              this.main_warp_left -=
                rightwidth - Math.abs(this.main_warp_left) - main_width;
            }
          }
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
@bread_crumb_height: 40px;
#nav_tabs {
  height: @bread_crumb_height;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  .nav_tabs_main {
    flex: 1;
    overflow: hidden;
    position: relative;
    width: 100px;
    border-right: 1px solid #e6e6e6;
    .nav_tabs_main_wrap {
      white-space: nowrap;
      position: absolute;
      top: 0;
      transition: 0.5s;
      font-size: 0;
      & > li {
        display: inline-block;
        font-size: 14px;
      }
    }
  }
  .nav_tabs_button {
    position: relative;
    border-right: 1px solid #e6e6e6;
    & > a {
      display: block;
      line-height: calc(@bread_crumb_height - 1px);
      padding: 0 10px;
    }
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 2px;
      content: "";
      transition: 0.3s;
    }
    &:hover {
      background: #f6f6f6;
    }
    &:hover:before {
      width: 100%;
      border-top: 2px solid #292b34;
    }
    .nav_tabs_close {
      padding: 1px 2px;
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
  .nav_tabs_button_this {
    background: #f6f6f6;
    &:before {
      width: 100%;
      border-top: 2px solid #292b34;
    }
  }
  .nav_tabs_more {
    .el-dropdown-link {
      cursor: pointer;
    }
    .el-icon-arrow-down {
      display: inline-block;
      width: @bread_crumb_height;
      line-height: @bread_crumb_height;
      text-align: center;
    }
  }
}
</style>


