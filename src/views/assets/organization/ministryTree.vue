<template>
  <div class="organization_ministryTree">
    <el-tree
      :data="ministryList"
      check-on-click-node
      :check-strictly="true"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      ref="tree"
      accordion
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label}}</span>
        <span class="custome-tree-node-tool">
          <el-tooltip content="添加" placement="bottom" :visible-arrow="false" popper-class="test">
            <el-button type="text" size="mini" @click="addMinistry(node,data)">
              <i class="el-icon-folder-add"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip
            content="修改"
            placement="bottom"
            :visible-arrow="false"
            popper-class="test"
            v-if="data.pid != 0"
          >
            <el-button type="text" size="mini" @click="editMinistry(node, data)">
              <i class="el-icon-edit-outline"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip
            content="删除"
            placement="bottom"
            :visible-arrow="false"
            popper-class="test"
            v-if="data.pid != 0"
          >
            <el-button type="text" size="mini" @click="delMinistry(node,data)">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
import tools from "common/tools";
import { getBumenList } from "req/api/organization.js";
import {
  getMinistryList,
  delMinistry,
  delManager
} from "req/api/assets/organization.js";
import { mapGetters, mapMutations } from "vuex";
import * as types from "store/mutation_types.js";
import ministryAdd from "./ministry_add";
import ministryEdit from "./ministry_edit";

let id = 1000;
export default {
  name: "organization_ministryTree",
  computed: {
    ...mapGetters(["ministryList"])
  },
  methods: {
    addMinistry(node, data) {
      this.$layer.iframe({
        content: {
          content: ministryAdd,
          parent: this,
          data: {
            layer_data: data,
            node: node,
            isAdd: true
          },
          area: ["500px", "300px"],
          title: "部门添加",
          shadeClose: false
        }
      });
    },
    editMinistry(node, data) {
      this.$layer.iframe({
        content: {
          content: ministryAdd,
          parent: this,
          data: {
            layer_data: data,
            node: node,
            isAdd: false
          },
          area: ["500px", "300px"],
          title: "部门修改",
          shadeClose: false
        }
      });
    },
    delMinistry(node, data) {
      this.$isShowTip(
        "assets",
        "assets_organization",
        "确定删除吗？",
        () => {
          this.__delMinistry({ id: data.id }, data);
        },
        this
      );
    },
    findOneDelNode(treeData, data) {
      for (let item of treeData) {
        if (item.id == data.id) {
          const index = treeData.findIndex(d => d.id === data.id);
          treeData.splice(index, 1);
        } else {
          item.children && this.findOneDelNode(item.children, data);
        }
      }
    },
    handleNodeClick() {},
    __delMinistry(param, data) {
      delMinistry(param)
        .then(res => {
          let treeData = JSON.parse(JSON.stringify(this.ministryList));
          this.findOneDelNode(treeData, data);
          this.set_ministryList(treeData);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(err => {});
    },
    ...mapMutations({
      set_ministryList: types.SET_MINISTRYLIST
    })
  }
};
</script>
<style lang="less" >
.organization_ministryTree {
  .el-tooltip__popper.test {
    background: #666;
    padding: 5px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    .custome-tree-node-tool {
      display: none;
    }
    &:hover .custome-tree-node-tool {
      display: block;
    }
  }
}
</style>