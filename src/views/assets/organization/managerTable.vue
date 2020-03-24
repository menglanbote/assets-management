<template>
  <div class="organization_managerTable table_full_height">
    <g-el-table
      :tableHeadShow="tableHeadShow"
      :url="url"
      :type="type"
      :cloumns="cloumns"
      :params="params"
      :pageParams="pageParams"
      :tableParams="tableParams"
      ref="assets_organization_manager_table"
    >
      <template v-slot:table_header>
        <el-button type="primary" size="mini"  @click="add">添加责任人</el-button>
      </template>
      <!-- 操作 -->
      <template v-slot:operation="props">
        <el-button type="primary" size="mini" @click="edit(props.data.row)">修改</el-button>
        <el-button type="danger" size="mini" @click="del(props.data.row)">删除</el-button>
      </template>
      <!-- 姓名 -->
      <template v-slot:name_head="props">
        <el-input
          v-model="params.name"
          size="mini"
          placeholder="请输入内容"
          @keyup.enter.native="search"
          :maxLength="20"
        ></el-input>
      </template>
      <!-- 性别 -->
      <template slot="gender" slot-scope="props" >
        <div v-if="props.data.row.gender == 1">
          <svg class="icon_1x5" aria-hidden="true" v-html="icon.genderIcon.man" />
        </div>
        <div v-else-if="props.data.row.gender == 2">
          <svg class="icon_1x5" aria-hidden="true" v-html="icon.genderIcon.woman" />
        </div>
      </template>
      <template v-slot:gender_head="props" >
        <el-select v-model="params.gender" @change="search" clearable size="mini" placeholder="请选择性别">
          <el-option
            v-for="item in dropDownData.gender"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </template>
      <!-- 部门 -->
      <template v-slot:ministry_head="props">
        <manager-tree @selectTreeChange="selectTreeChange"></manager-tree>
      </template>
      <!-- 联系电话 -->
      <template v-slot:phone_head="props">
        <el-input
          v-model="params.phone"
          size="mini"
          placeholder="请输入内容"
          @keyup.enter.native="search"
          :maxLength="20"
        ></el-input>
      </template>
    </g-el-table>
  </div>
</template>
<script>
import managerTree from "./managerTree";
import add from "views/assets/organization/add";
import { delManager } from "req/api/assets/organization.js";
export default {
  data() {
    return {
      url: "/manager/list",
      type: "get",
      cloumns: [
        {
          type: "selection",
          fixed: "left"
        },
        {
          type: "index",
          // fixed: "left",
          label: "序号",
          second_head: {
            type: "index",
            width: "60px",
            label: " ",
            indexMethod: function(index) {
              return index + 1;
            }
          }
        },
        {
          label: "姓名",
          sortable: true,
          prop: "name",
          second_head: {
            width:"200px",
            prop: "name",
            templateHeadName: "name_head"
          }
        },
        {
          label: "性别",
          sortable: true,
          prop: "gender",
          second_head: {
            isTemplate: true,
            templateName:"gender",
            width:'150px',
            prop: "gender",
            templateHeadName: "gender_head"
          }
        },
        {
          label: "部门",
          prop: "ministry",
          sortable: true,
          second_head: {
            width:"200px",
            templateHeadName: "ministry_head",
            prop: "ministry"
          }
        },
        {
          label: "联系电话",
          prop: "phone",
          sortable: true,
          second_head: {
            width:"180px",
            templateHeadName: "phone_head",
            prop: "phone"
          }
        },
        {
          label: "操作",
          second_head: {
            label: "",
            minWidth: "180px",
            isTemplate: true,
            templateName: "operation"
          }
        }
      ],
      tableHeadShow: true,
      tableParams: {
        maxHeight: "100%",
        height: "100%"
      },
      params: {
        page: 1,
        limit: 10,
        name: "",
        area: "",
        net: "",
        type: "",
        ministry_id: ""
      },
      pageParams: {
        layout: "total, sizes, prev, pager, next, jumper",
        pageAlign: "left",
        pageSizes: [10, 20, 30]
      },
      dropDownData: {
        gender: [
          {
            id: "1",
            name: "男"
          },
          {
            id: "2",
            name: "女"
          }
        ]
      },
      icon: {
        genderIcon:this.$icons.genderIcon
      }
    };
  },
  components: {
    managerTree
  },
  methods: {
    reload() {
      this.$refs.assets_organization_manager_table.reload();
    },
    search() {
      this.params.page = 1
      this.reload()
    },
    selectTreeChange(item) {
      this.params.ministry_id = item.ministryValue;
      this.reload();
    },
    add() {
      this.$layer.iframe({
        content: {
          content: add,
          parent: this,
          data: {}
        },
        area: ["500px", "auto"],
        title: "添加责任人",
        shadeClose: false
      });
    },
    edit(item) {
      this.$layer.iframe({
        content: {
          content: add,
          parent: this,
          data: {
            layer_data: item,
            isAdd: false
          }
        },
        area: ["500px", "auto"],
        title: "修改责任人",
        shadeClose: false
      });
    },
    del(item) {
      this.$isShowTip(
        "assets",
        "assets_organization",
        "确定删除吗？",
        () => {
          this.__delManager({id:item.id});
        },
        this
      );
    },
    __delManager(param) {
      delManager(param).then(res => {
        this.$message({
            type: "success",
            message: "删除成功"
          });
        this.reload()
      }).catch(err => {})
    }
  }
};
</script>
<style lang="less" scoped>
.table_full_height {
  height: calc(100% - 100px);
}
</style>