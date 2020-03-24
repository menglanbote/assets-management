<template>
    <el-select
      v-model="selectData.ministryName"
      clearable
      @clear="clearDate"
      placeholder="请选择部门"
      size="mini"
      ref="selectReport"
    >
      <el-option
        :value="selectData.ministryValue"
        :label="selectData.ministryName"
        style="height: auto;background-color:#fff"
      >
        <el-tree
          :data="ministryList"
          @node-click="handleNodeClick"
          ref="tree"
        ></el-tree>
      </el-option>
    </el-select>
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
  computed: {
    ...mapGetters(["ministryList"])
  },
  methods: {
    handleCheckChange() {
      let res = this.$refs.tree.getCheckedNodes(true, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
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
    },
    clearDate() {
      this.selectData.ministryValue = "";
      this.selectData.ministryName = "";
      this.$refs.selectReport.blur();
      this.$emit("selectTreeChange", this.selectData);
    }
  }
};
</script>
<style lang="less" scoped>
.el-select-dropdown__item {
padding: 0;
}
</style>

