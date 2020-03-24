<template>
  <div class="mu-manager-tree">
    <mu-select
      v-model="selectData.ministryName"
      placeholder="请选择部门"
      ref="selectReport"
      popover-class="mu_manager_tree_popover"
    >
      <mu-option
        :label="selectData.ministryName"
        :value="selectData.ministryValue"
        style="height: auto;background-color:#fff"
      >
        <el-tree :data="ministryList" @node-click="handleNodeClick" ref="tree"></el-tree>
      </mu-option>
    </mu-select>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "organization_managerTree",
  data() {
    return {
      mineStatus: [],
      mineStatusValue: [],
      selectData: {
        ministryValue: "",
        ministryName: ""
      }
    };
  },
  props: {
      ministry: {
          type:String,
          default:""
      },
      ministry_id: {
          type:String,
          default:""
      }
  },
  created () {
    this.selectData.ministryName = this.ministry
    this.selectData.ministryValue = this.ministry_id
  },
  computed: {
    ...mapGetters(["ministryList"])
  },
  methods: {
    handleCheckChange() {
      let res = this.$refs.tree.getCheckedNodes(true, true); 
      let arrLabel = [];
      let arr = [];
      res.forEach(item => {
        arrLabel.push(item.label);
        arr.push(item);
      });
      this.mineStatusValue = arr;
      this.mineStatus = arrLabel;
      console.log("arr:" + JSON.stringify(arr));
      console.log("arrLabel:" + arrLabel);
    },
    handleNodeClick(node) {
      this.selectData.ministryValue = node.id;
      this.selectData.ministryName = node.label;
      this.$refs.selectReport.blur();
      this.$emit("selectTreeChange", this.selectData);
      //   console.log(node, "node");
      /* if (node.children) {
      } else {
        this.selectData.ministryValue = node.id;
        this.selectData.ministryName = node.label;
        this.$refs.selectReport.blur();
      } */
    }
  }
};
</script>
<style lang="less" >
.mu-manager-tree {
  width: 100%;
}
.mu_manager_tree_popover {
  .mu-item-wrapper {
    .mu-item {
      padding:0;
    }
  }
  .mu-item-wrapper.hover {
    background-color: #fff;
  }
  .mu-list-dense .mu-item {
    height: auto;
  }

  .mu-list-dense .el-tree {
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
  }
}
</style>