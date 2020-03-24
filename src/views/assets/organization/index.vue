<template>
  <el-row :gutter="15" class="asstes_organization h100">
    <el-col :span="5" class="h100">
      <el-card class="box-card h100">
        <div slot="header" class="clr">
          <span>组织机构</span>
        </div>
        <ministry-tree ></ministry-tree>
      </el-card>
    </el-col>
    <el-col :span="19" class="h100">
      <el-card class="box-card h100">
        <manager-table ></manager-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { getMinistryList,delManager } from "req/api/assets/organization.js"
import * as types from 'store/mutation_types.js'
import {mapMutations} from 'vuex'
import ministryTree from './ministryTree'
import managerTable from './managerTable'

export default {
  name: "asstes_organization",
  data() {
    return {
    }
  },
  activated() {
    this.__getMinistryList()
  },
  components:{
      ministryTree,
      managerTable
  },
  methods: {
    __getMinistryList() {
      getMinistryList()
        .then(res => {
          var arr = res.data;
          this.set_ministryList(this.$tools.treeData(arr))
        })
        .catch(err => {});
    },
    ...mapMutations({
      set_ministryList:types.SET_MINISTRYLIST
    })
  }
};
</script>
<style  lang="less" >
.container-mian-body {
  .assets {
    height:100%;
    .el-card__body {
      height:100%;
    }
  }
}
</style>


