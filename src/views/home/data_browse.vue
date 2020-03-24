<template>
  <div class="home_data_browse">
    <el-card class="grid-content bg-purple data-browse">
      <div slot="header" class="clearfix">
        <span>数据概览</span>
        <!-- <span class="data-browse-icon" ref="data_browse_icon">
          <i :class="data_browse_view == 'pieBrowse' ? 'select' : ''"></i>
          <i :class="data_browse_view == 'lineBrowse' ? 'select' : ''"></i>
        </span> -->
      </div>
      <transition name="data-browse" mode="out-in">
        <pie-browse></pie-browse>
        <!-- <keep-alive>
          <component v-bind:is="data_browse_view"></component>
        </keep-alive> -->
      </transition>
    </el-card>
  </div>
</template>
<script>
import pieBrowse from "./pie_browse";
import lineBrowse from "./line_browse";
export default {
  name: "home_data_browse",
  data() {
    return {
      data_browse_view: "pieBrowse"
    };
  },
  props: {
    gaugeData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {
    pieBrowse,
    lineBrowse
  }
};
</script>
<style lang="less" >
.home_data_browse {
  .el-card__body {
    width: 100%;
    height: 465px;
  }
}
</style>



