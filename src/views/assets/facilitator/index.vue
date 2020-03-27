<template>
  <div class="assets-facilitator">
    <g-el-table
      :tableHeadShow="tableHeadShow"
      :url="url"
      :type="type"
      :cloumns="cloumns"
      :params="params"
      :pageParams="pageParams"
      :tableParams="tableParams"
      @selectChange="selectChange"
      ref="assets_facilitator_table"
    >
      <!-- 头部 -->
      <template v-slot:table_header>
        <el-button type="primary" size="mini" @click="add">新增服务商</el-button>
        <el-button type="danger" size="mini" @click="del(batchData)">批量删除</el-button>
      </template>

      <!-- 操作 -->
      <template v-slot:operation="props">
        <el-button type="primary" size="mini" @click="edit(props.data.row)">修改</el-button>
        <el-button type="primary" size="mini" @click="update(props.data.row)">续约更新</el-button>
        <el-button type="primary" size="mini" @click="pause(props.data.row)" v-show="props.data.row.status == 1">合同终止</el-button>
        <el-button type="primary" size="mini" disabled v-show="props.data.row.status != 1">合同终止</el-button>
        <el-button type="primary" size="mini" @click="history(props.data.row)">服务历史</el-button>
        <el-button type="danger" size="mini" @click="del(props.data.row)">删除</el-button>
      </template>

      <!-- 服务商名称 -->
      <template v-slot:name_head="props">
        <el-input
          v-model="params.name"
          size="mini"
          placeholder="请输入内容"
          @keyup.enter.native="search"
          :maxLength="20"
        ></el-input>
      </template>

      <!-- 服务商状态 -->
      <template slot="status" slot-scope="props">
        <div v-if="props.data.row.status == 1">
          <span v-html="icon.stateIcon.success"></span>服务中
        </div>
        <div v-else-if="props.data.row.status == 2">
          <span v-html="icon.stateIcon.error"></span>合同终止
        </div>
        <div v-else-if="props.data.row.status == 3">
          <span v-html="icon.stateIcon.pending"></span>未开始服务
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

      <!-- 服务商说明 -->
      <template v-slot:description_head="props">
        <el-input
          v-model="params.description"
          size="mini"
          placeholder="请输入内容"
          @keyup.enter.native="search"
          :maxLength="20"
        ></el-input>
      </template>

      <!-- 服务商类别 -->
      <template v-slot:type_head="props">
        <el-select v-model="params.type" @change="search" size="mini" clearable placeholder="请选择">
          <el-option
            v-for="item in dropDownData.type"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </template>
    </g-el-table>
  </div>
</template>
<script>
import add from "views/assets/facilitator/add";
import history from "views/assets/facilitator/history";
import update from "views/assets/facilitator/update";
import pause from "views/assets/facilitator/pause";
import { getDropDownData,delFacilitator,editFacilitator } from "req/api/assets/facilitator.js";

export default {
  data() {
    return {
      url: "/service/list",
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
          label: "服务商名称",
          sortable: true,
          prop: "name",
          second_head: {
            prop: "name",
            width:'200px',
             templateName: "name_head",
            templateHeadName: "name_head"
          },
          
        },
        {
          label: "服务商状态",
          sortable: true,
          prop: "status",
          second_head: {
            prop: "status",
            width:'180px',
            isTemplate: true,
            templateName: "status",
            templateHeadName: "status_head"
          }
        },
        {
          label: "服务商类别",
          prop: "type",
          sortable: true,
          second_head: {
            templateHeadName: "type_head",
            minWidth:'150px',
            formatter:function(row, column, cellValue, index){
              let value = []
              for(let item of cellValue) {
                value.push(item.name)
              }
              return value.join(',')
            },
            prop: "type"
          }
        },
        {
          label: "服务商说明",
          prop: "description",
          sortable: true,
          second_head: {
            minWidth:'200px',
            templateHeadName: "description_head",
            prop: "description"
          }
        },
        {
          label: "操作",
          second_head: {
            label: "",
            width: "500px",
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
        type: "",
        status: "",
        discript: ""
      },
      pageParams: {
        layout: "total, sizes, prev, pager, next, jumper",
        pageAlign: "left",
        pageSizes: [10, 20, 30]
      },
      dropDownData: {
        status: [
          {
            id:'1',
            name:'服务中'
          },
          {
            id:'2',
            name:'合同终止'
          },
          {
            id:'3',
            name:'未开始服务'
          }
        ],
        type: [
          {
            id:'1',
            name:'系统开发商'
          },
          {
            id:'2',
            name:'运维开发商'
          },
          {
            id:'3',
            name:'安全开发商'
          }
        ]
      },
      batchData: [],
      icon: {
        stateIcon:this.$icons.stateIcon
      }
    };
  },
  methods: {
    reload() {
      this.$refs.assets_facilitator_table.reload();
    },
    search() {
      this.params.page = 1
      this.reload()
    },
    selectChange(select) {
      this.batchData = select
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
        area: ["800px", "auto"],
        title: "新增服务商",
        shadeClose: false
      });
    },
    edit(item) {
      this.$layer.iframe({
        content: {
          content: add,
          parent: this,
          data: {
            layer_data:item,
            dropDownData: this.dropDownData,
            isAdd: false
          }
        },
        area: ["800px", "auto"],
        title: "修改服务商",
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
        "assets_facilitator",
        "确定删除吗?",
        () => {
          this.__delFacilitator({
            service_id: ids
          });
        },
        this
      );
    },
    pause(item) {
      this.$layer.iframe({
        content: {
          content: pause,
          parent: this,
          data: {
            pause_id:item.id.toString()
          }
        },
        area: ["400px", "auto"],
        title: "终止合同",
        shadeClose: false
      });
    },
    history(item) {
      this.$layer.iframe({
        content: {
          content: history,
          parent: this,
          data: {
            history_id:item.id.toString()
          }
        },
        area: ["800px", "auto"],
        title: "服务历史",
        shadeClose: false
      });
    },
    update(item) {
      this.$layer.iframe({
        content: {
          content: update,
          parent: this,
          data: {
            update_id:item.id.toString()
          }
        },
        area: ["400px", "auto"],
        title: "更新服务",
        shadeClose: false
      });
    },
    

    __delFacilitator(param) {
      delFacilitator(param)
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