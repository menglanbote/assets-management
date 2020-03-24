<template>
  <div class="assets-list-open_port_information">
    <g-el-table
      :url="url"
      :type="type"
      :cloumns="cloumns"
      :params="params"
      :pageParams="pageParams"
      ref="assets_list_open_port_information_table"
    >
      <template v-slot:port_head="props">
        <el-input
          v-model="params.port"
          size="mini"
          placeholder="请输入内容"
          @keyup.enter.native="search"
          :maxLength="20"
        ></el-input>
      </template>
      <!-- 协议 -->
      <template slot="protocols" slot-scope="props">
        <div v-if="props.data.row.protocols == 1">TCP</div>
        <div v-else-if="props.data.row.protocols == 2">UDP</div>
      </template>
      <template v-slot:protocols_head="props">
        <el-select
          v-model="params.protocols"
          clearable
          @change="search"
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="item in dropDownData.protocols"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </template>
      <!-- 是否伪装 -->
      <template slot="guise" slot-scope="props">
        <div v-if="props.data.row.guise == 1">
          <span v-html="icon.stateIcon.success"></span>是
        </div>
        <div v-else-if="props.data.row.guise == 0">
          <span v-html="icon.stateIcon.error"></span>否
        </div>
      </template>
      <template v-slot:guise_head="props">
        <el-select v-model="params.guise" clearable @change="search" size="mini" placeholder="请选择">
          <el-option
            v-for="item in dropDownData.guise"
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
export default {
  data() {
    return {
      url: `host/${this.host_id}/port/list`,
      type: "post",
      cloumns: [
        {
          type: "index",
          fixed: "left",
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
          label: "开放端口",
          sortable: true,
          prop: "port",
          second_head: {
            prop: "port",
            width: "150px",
            templateHeadName: "port_head"
          }
        },
        {
          label: "协议",
          sortable: true,
          prop: "protocols",
          second_head: {
            isTemplate: true,
            templateName: "protocols",
            prop: "protocols",
            width: "150px",
            templateHeadName: "protocols_head"
          }
        },
        {
          label: "是否伪装",
          sortable: true,
          prop: "guise",
          second_head: {
            prop: "guise",
            isTemplate: true,
            width: "150px",
            templateName: "guise",
            templateHeadName: "guise_head"
          }
        },
        {
          label: "总浏览量",
          sortable: true,
          prop: "all_view",
          second_head: {
            label: "",
            minwidth: "100px",
            prop: "all_view"
          }
        }
      ],
      params: {
        page: 1,
        limit: 10,
        all_view: "",
        guise: "",
        port: "",
        protocols: ""
      },
      pageParams: {
        layout: "total, sizes, prev, pager, next, jumper",
        pageAlign: "left",
        pageSizes: [10, 20, 30]
      },
      dropDownData: {
        protocols: [
          {
            id: 1,
            name: "TCP"
          },
          {
            id: 2,
            name: "UDP"
          }
        ],
        guise: [
          {
            id: 0,
            name: "否"
          },
          {
            id: 1,
            name: "是"
          }
        ]
      },
      icon: {
        stateIcon: this.$icons.stateIcon
      }
    };
  },
  props: {
    host_id: {
      type: String,
      default: ""
    }
  },
  methods: {
    reload() {
      this.$refs.assets_list_open_port_information_table.reload();
    },
    search() {
      this.params.page = 1;
      this.reload();
    }
  }
};
</script>
<style >
.assets-list-open_port_information {
  width: 100%;
  padding: 10px;
}
</style>