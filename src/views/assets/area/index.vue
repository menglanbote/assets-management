<template>
  <div class="assets-area">
    <g-el-table
      :tableHeadShow="tableHeadShow"
      :url="url"
      :type="type"
      :cloumns="cloumns"
      :params="params"
      :pageParams="pageParams"
      :tableParams="tableParams"
      @selectChange="selectChange"
      ref="assets_area_table"
    >
      <template v-slot:table_header>
        <el-button type="primary" size="mini" @click="add"
          >添加位置信息</el-button
        >
      </template>
      <!-- 操作 -->
      <template v-slot:operation="props">
        <el-button type="primary" size="mini" @click="edit(props.data.row)"
          >修改</el-button
        >
        <el-button type="danger" size="mini" @click="del(props.data.row)"
          >删除</el-button
        >
      </template>
      <!-- 位置名称 -->
      <template v-slot:name_head="props">
        <el-input
          v-model="params.name"
          :maxLength="20"
          size="mini"
          placeholder="请输入内容"
          @keyup.enter.native="search"
        ></el-input>
      </template>
      <!-- 详细位置 -->
      <template v-slot:address_head="props">
        <el-input
          v-model="params.address"
          :maxLength="20"
          size="mini"
          placeholder="请输入内容"
          @keyup.enter.native="search"
        ></el-input>
      </template>
      <!-- 运营商 -->
      <template slot="provider" slot-scope="props">
        <div v-if="props.data.row.provider == 1">电信</div>
        <div v-else-if="props.data.row.provider == 2">联通</div>
        <div v-else-if="props.data.row.provider == 3">移动</div>
      </template>
      <template v-slot:provider_head="props">
        <el-select
          v-model="params.provider"
          @change="search"
          clearable
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="item in provider.provider"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </template>
      <!-- 类型 -->
      <template v-slot:type="props">
        <div v-if="props.data.row.type == 1">内部机房</div>
        <div v-else-if="props.data.row.type == 2">外部机房</div>
      </template>
      <template v-slot:type_head="props">
        <el-select
          v-model="params.type"
          @change="search"
          clearable
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="item in provider.type"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </template>
    </g-el-table>
  </div>
</template>
<script>
import add from "views/assets/area/add";
import { delArea } from "req/api/assets/area.js";

export default {
  data() {
    return {
      url: "/address/list",
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
          label: "位置名称",
          sortable: true,
          prop: "name",
          second_head: {
            minWidth: "200px",
            prop: "name",
            templateHeadName: "name_head"
          }
        },
        {
          label: "详细位置",
          sortable: true,
          prop: "address",
          second_head: {
            minWidth: "200px",
            prop: "address",
            templateHeadName: "address_head"
          }
        },
        {
          label: "运营商",
          prop: "provider",
          sortable: true,
          second_head: {
            minWidth: "150px",
            isTemplate: true,
            templateName: "provider",
            templateHeadName: "provider_head",
            prop: "provider"
          }
        },
        {
          label: "类型",
          prop: "type",
          sortable: true,
          second_head: {
            minWidth: "150px",
            isTemplate: true,
            templateName: "type",
            templateHeadName: "type_head",
            prop: "type"
          }
        },
        {
          label: "操作",
          second_head: {
            label: "",
            minWidth: "200px",
            isTemplate: true,
            templateName: "operation"
          }
        }
      ],
      tableHeadShow: true,
      tableParams: {},
      params: {
        page: 1,
        limit: 10,
        name: "",
        address: "",
        provider: "",
        type: ""
      },
      pageParams: {
        layout: "total, sizes, prev, pager, next, jumper",
        pageAlign: "left",
        pageSizes: [10, 20, 30]
      },
      provider: {
        provider: [
          {
            id: 1,
            name: "电信"
          },
          {
            id: 2,
            name: "联通"
          },
          {
            id: 3,
            name: "移动"
          }
        ],
        type: [
          {
            id: 1,
            name: "内部机房"
          },
          {
            id: 2,
            name: "外部机房"
          }
        ]
      },
      selectData: [],
    };
  },
  methods: {
    reload() {
      this.$refs.assets_area_table.reload();
    },
    search() {
      this.params.page = 1;
      this.reload();
    },
    selectChange(select) {
      this.selectData = select
    },
    add() {
      this.$layer.iframe({
        content: {
          content: add,
          parent: this,
          data: {
            select_data: this.provider
          }
        },
        area: ["500px", "auto"],
        title: "添加资产位置",
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
            select_data: this.provider,
            isAdd: false
          }
        },
        area: ["500px", "auto"],
        title: "修改资产位置",
        shadeClose: false
      });
    },
    del(item) {
      this.$isShowTip(
        "assets",
        "assets_area",
        "确定删除吗?",
        () => {
          this.__delArea({
            id: item.id
          });
        },
        this
      );
    },
    __delArea(param) {
      delArea(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.reload();
        })
        .catch(err => {});
    }
  }
};
</script>
