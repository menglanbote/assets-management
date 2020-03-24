<template>
  <el-row :gutter="20" class="asstes_facilitator">
    <el-col :span="5">
      <el-card class="box-card">
        <div slot="header" class="clr">
          <span>组织机构</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div class="block">
          <el-tree
            :data="test"
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
                <el-tooltip
                  content="添加"
                  placement="bottom"
                  :visible-arrow="false"
                  popper-class="test"
                >
                  <el-button type="text" size="mini" @click="() => append(data)">
                    <i class="el-icon-folder-add"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  content="修改"
                  placement="bottom"
                  :visible-arrow="false"
                  popper-class="test"
                  v-if="data.parentId != 0"
                >
                  <el-button type="text" size="mini" @click="() => edit(node, data)">
                    <i class="el-icon-edit-outline"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  content="删除"
                  placement="bottom"
                  :visible-arrow="false"
                  popper-class="test"
                  v-if="data.parentId != 0"
                >
                  <el-button type="text" size="mini" @click="() => remove(node, data)">
                    <i class="el-icon-delete"></i>
                  </el-button>
                </el-tooltip>
              </span>
            </span>
          </el-tree>
        </div>
      </el-card>
    </el-col>
    <el-col :span="19">
      <el-card class="box-card">
        <div class="grid-content bg-purple"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import tools from 'common/tools'
import { getBumenList } from "req/api/organization.js"
import add from 'views/assets/facilitator/add'
import edit from 'views/assets/facilitator/edit'
let id = 1000;

export default {
  name: "asstes_facilitator",
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1"
          },
          {
            id: 6,
            label: "二级 2-2"
          }
        ]
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1"
          },
          {
            id: 8,
            label: "二级 3-2"
          }
        ]
      }
    ];
    return {
      data: JSON.parse(JSON.stringify(data)),
      test: []
    };
  },
  created() {
    this.__getBumenList();
  },
  mounted() {
    this.$refs.tree.setCheckedKeys([3]);
  },
  components:{
      edit,
      add
  },
  methods: {
    __getBumenList() {
      getBumenList().then(res => {
        var arr = res.data;
        this.test = tools.treeData(arr)
      });
    },
    append(data) {
      console.log(data);
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    edit(node, data) {
        this.$layer.iframe({
            content: {
              content: edit,
              parent: this,
              data: {
                layer_data:{
                    node:node,
                    data:data
                }
              }
            },
            area: ["400px", "300px"],
            title: "添加",
            shadeClose: false
        });
    },
    handleNodeClick(data) {
      // console.log(data);
    }
  }
};
</script>
<style  lang="less">
.asstes_facilitator {
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


