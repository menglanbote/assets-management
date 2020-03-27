<template>
  <div class="systemset_assets_custom">
       <g-el-table
      :tableHeadShow="tableHeadShow"
      :url="url"
      :type="type"
      :cloumns="cloumns"
      :params="params"
      :pageParams="pageParams"
      @selectChange="selectChange"
      ref="systemset_assets_custom_table"
    >
      <template v-slot:table_header>
        <el-button type="primary" size="mini" @click="add">新增业务系统</el-button>
        <el-button type="danger" size="mini" @click="del(selectData)">批量删除</el-button>
      </template>

       <!-- 操作 -->
      <template v-slot:operation="props">
        <el-button
          type="primary"
          size="mini"
          :disabled="props.data.row.status == 2 ? true : false "
          @click="retire(props.data.row)"
        >退役</el-button>
        <el-button type="primary" size="mini" @click="edit(props.data.row)">修改</el-button>
        <el-button type="danger" size="mini" @click="del(props.data.row)">删除</el-button>
      </template>
      <!-- 业务系统名称 -->
      <template v-slot:name_head="props">
        <el-input
          v-model="params.name"
          size="mini"
          placeholder="请输入内容"
          @keyup.enter.native="search"
          :maxLength="20"
        ></el-input>
      </template>
      <!-- 业务系统状态 -->
      <template slot="status" slot-scope="props">
        <div v-if="props.data.row.status == 1">
          <span v-html="icon.stateIcon.success"></span>使用中
        </div>
        <div v-else-if="props.data.row.status == 2">
          <span v-html="icon.stateIcon.error"></span>已退役
        </div>
      </template>
      <template v-slot:status_head="props">
        <el-select v-model="params.status" @change="search" clearable size="mini" placeholder="请选择">
          <el-option
            v-for="item in dropDownData.status"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </template>
      <!-- 功能说明 -->
      <template v-slot:description_head="props">
        <el-input
          v-model="params.description"
          size="mini"
          placeholder="请输入内容"
          @keyup.enter.native="search"
          :maxLength="20"
        ></el-input>
      </template>
      <!-- 上线时间 -->
      <template v-slot:on_time_head="props">
        <el-date-picker
          type="date"
          size="mini"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          v-model="params.on_time"
          @change="search"
          style="width: 100%;"
        ></el-date-picker>
      </template>
      <!-- 退役时间 -->
      <template v-slot:off_time_head="props">
        <el-date-picker
          type="date"
          size="mini"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          v-model="params.off_time"
          @change="search"
          style="width: 100%;"
        ></el-date-picker>
      </template>
    </g-el-table>
  
  </div>
</template>
<script>
import add from "views/systemset/assets_custom/add";
export default {
  name: "systemset_assets_custom",
  data() {
    return {
       url: "/software/list",
       type: "get",
       tableHeadShow: true,
      params: {
        page: 1,
        limit: 10,
        name: "",
        off_time: "",
        on_time: "",
        status: "",
        discript: ""
      },
      pageParams: {
        layout: "total, sizes, prev, pager, next, jumper",
        pageAlign: "left",
        pageSizes: [10, 20, 30]
      },
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
          label: "业务系统名称",
          sortable: true,
          prop: "name",
          second_head: {
            width:"200px",
            prop: "name",
            templateHeadName: "name_head"
          }
        },
        {
          label: "业务系统状态",
          sortable: true,
          prop: "status",
          second_head: {
            prop: "status",
            width:"180px",
            isTemplate: true,
            templateName: "status",
            templateHeadName: "status_head"
          }
        },
        {
          label: "功能说明",
          prop: "description",
          sortable: true,
          second_head: {
            minWidth:"200px",
            templateHeadName: "description_head",
            prop: "description"
          }
        },
        {
          label: "上线时间",
          prop: "on_time",
          sortable: true,
          second_head: {
            width:"200px",
            templateHeadName: "on_time_head",
            prop: "on_time"
          }
        },
        {
          label: "退役时间",
          prop: "off_time",
          sortable: true,
          second_head: {
            width:"200px",
            templateHeadName: "off_time_head",
            prop: "off_time"
          }
        },
        {
          label: "操作",
          second_head: {
            label: "",
            width: "280px",
            isTemplate: true,
            templateName: "operation"
          }
        }
      ],
      dropDownData: {
        status: [
          {
            id: 1,
            name: "使用中"
          },
          {
            id: 2,
            name: "已退役"
          }
        ]
      },
       selectData: [],
      icon: {
        stateIcon: this.$icons.stateIcon
      }
    };
  },
  methods: {
    reload() {
      this.$refs.assets_business_table.reload();
    },
    search() {
      this.params.page = 1
      this.reload()
    },
     selectChange(select) {
      this.selectData = select;
    },
    add() {
      this.$layer.iframe({
        content: {
          content: add,
          parent: this,
          data: {
            dropDownData: this.dropDownData
          }
        },
        area: ["500px", "auto"],
        title: "新增业务系统",
        shadeClose: false
      });
    },
     del(item) {
      let ids = ""
      if(Array.isArray(item)) {
        if(this.$tools.isArrayNull(item)) {
          this.$message({
            type:"error",
            message:"请选择需要删除的选项!"
          })
          return
        }
        ids = this.$tools.mergeId(item)
      }else {
        ids = item.id
      }
      this.$isShowTip(
        "assets",
        "assets_business",
        "确定删除吗?",
        () => {
          this.__delBusiness({ id: ids });
        },
        this
      );
    },
     __delBusiness(param) {
      delBusiness(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.reload()
        })
        .catch(err => {});
    },

  },
};
</script>
<style scoped></style>
