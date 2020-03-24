<template>
  <div class="homewrap">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="6">
          <shortcut></shortcut>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="10">
          <resource-usage></resource-usage>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8">
          <authorization-information></authorization-information>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <data-browse></data-browse>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import shortcut from "./shortcut";
import dataBrowse from "./data_browse";
import authorizationInformation from "./authorization_Information";
import resourceUsage from "./resource_usage";

export default {
  name: "home",
  data() {
    return {
      data_browse_view: 'dataBrowse'
    }
  },
  components: {
    shortcut,
    dataBrowse,
    authorizationInformation,
    resourceUsage
  }
};
</script>
<style  lang="less">
.homewrap {
  & > .el-row {
    & > div {
      margin-bottom: 20px;
    }
  }
  .data-browse {
    .data-browse-icon {
      float: right;
      padding: 3px 0;
      cursor:pointer;
      i {
        display:inline-block;
        width:10px;
        height:10px;
        margin-left:5px;
        border-radius:50%;
        background:#ccc;
        &:hover {
          background:#999;
        }
        &.select {
          background:#999;
        }
      }
    }
  }
}
</style>


