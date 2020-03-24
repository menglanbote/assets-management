<template>
  <div class="assets-list">
    <div class="tagIcon-notice">
      <span>系统功能图标表示:</span>
      <span v-for="item in icon.tagIcon" :key="item.id">
        <svg class="icon_1x5" aria-hidden="true" v-html="item.icon" />
        {{ item.name }}
      </span>
    </div>
    <g-el-table
      :tableHeadShow="tableHeadShow"
      :url="url"
      :type="type"
      :cloumns="cloumns"
      :params="params"
      :pageParams="pageParams"
      @selectChange="selectChange"
      @tableRespData="tableRespData"
      ref="assets_list_table"
    >
      <template v-slot:table_header>
        <el-button type="danger" size="mini" @click="del(selectData)"
          >批量删除</el-button
        >
        <el-button type="primary" size="mini" :disabled="respData.remianing_number == 0" @click="add"
          >添加新资产</el-button
        >
        <el-button type="primary" size="mini" @click="win"
          >Windows通信插件下载</el-button
        >
        <el-button type="primary" size="mini" @click="linux"
          >Linux通信插件下载与安装</el-button
        >
        <span class="assets_list_remianing_auth">剩余授权数  <mu-badge :content="respData.remianing_number ? respData.remianing_number.toString() : '0'" color="secondary"></mu-badge></span>
     
      </template>
      <!-- 操作 -->
      <template v-slot:operation="props">
        <el-button type="primary" size="mini" @click="edit(props.data.row)"
          >修改</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="detail(props.data.row)"
          >资产详情</el-button
        >
        <el-button type="danger" size="mini" @click="del(props.data.row)"
          >删除</el-button
        >
      </template>
      <!-- IP地址 -->
      <template v-slot:ip="props">
        <el-popover trigger="hover" placement="top">
          <p>主机名: {{ props.data.row.name }}</p>
          <p>业务系统名称: {{ props.data.row.software.name }}</p>
          <div slot="reference" class="name-wrapper">
            {{ props.data.row.ip }}
          </div>
        </el-popover>
      </template>
      <template v-slot:ip_head="props">
        <el-input
          v-model="params.ip"
          :maxLength="20"
          size="mini"
          placeholder="请输入关键字"
          @keyup.enter.native="search"
        ></el-input>
      </template>
      <!-- 资产名称 -->
      <template v-slot:name_head="props">
        <el-input
          v-model="params.name"
          size="mini"
          :maxLength="20"
          placeholder="请输入关键字"
          @keyup.enter.native="search"
        ></el-input>
      </template>
      <!-- 操作系统类别 -->
      <template slot="os" slot-scope="props">
        <svg
          class="icon_1x5"
          aria-hidden="true"
          v-html="dropDownData.os[props.data.row.os].icon"
        />
        <span>{{ dropDownData.os[props.data.row.os].name }}</span>
      </template>
      <template v-slot:os_head="props">
        <el-select
          v-model="params.os"
          @change="search"
          clearable
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="item in dropDownData.os"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </template>
      <!-- 功能类别 -->
      <template slot="tag" slot-scope="props">
        <span v-for="item of props.data.row.tag" :key="item.id">
          <svg
            class="icon_1x5"
            aria-hidden="true"
            v-html="icon.tagIcon[item.icon].icon"
          />
          <i style="font-size:0;">{{ item.name }}</i>
        </span>
      </template>
      <template v-slot:tag_head="props">
        <el-select
          v-model="params.tag"
          @change="search"
          clearable
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="item in dropDownData.tag"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </template>
      <!-- 所属部门 -->
      <template slot="ministry" slot-scope="props">{{
        props.data.row.ministry.name
      }}</template>
      <template v-slot:ministry_head="props">
        <manager-tree @selectTreeChange="selectTreeChange"></manager-tree>
      </template>
      <!-- 安全责任人 -->
      <template v-slot:manager="props">
        <el-popover trigger="hover" placement="top">
          <p>联系电话: {{ props.data.row.manager.phone }}</p>
          <div slot="reference" class="name-wrapper">
            {{ props.data.row.manager.name }}
          </div>
        </el-popover>
      </template>
      <template v-slot:manager_head="props">
        <el-select
          v-model="params.manager"
          @change="search"
          clearable
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="item in dropDownData.manager"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </template>
      <!-- 运维联系人 -->
      <template slot="maintain_provider" slot-scope="props">
        <el-popover trigger="hover" placement="top">
          <p>联系电话: {{ props.data.row.maintain_provider.phone }}</p>
          <div slot="reference" class="name-wrapper">
            {{ props.data.row.maintain_provider.contact }}
          </div>
        </el-popover>
      </template>
      <template v-slot:maintain_provider_head="props">
        <el-select
          v-model="params.maintain_provider"
          @change="search"
          size="mini"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in dropDownData.maintain_provider"
            :key="item.id"
            :label="item.contact"
            :value="item.id"
          ></el-option>
        </el-select>
      </template>
      <!-- 状态 -->
      <template slot="online" slot-scope="props">
        <div v-if="props.data.row.online == 1">
          <span v-html="icon.linkIcon.link"></span>在线<span v-show="props.data.row.version">[v{{props.data.row.version}}]</span>
        </div>
        <div v-else-if="props.data.row.online == 0">
          <span v-html="icon.linkIcon.unlink"></span>离线<span v-show="props.data.row.version">[v{{props.data.row.version}}]</span>
        </div>
      </template>
      <template v-slot:online_head="props">
        <el-select
          v-model="params.online"
          @change="search"
          clearable
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="item in dropDownData.online"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </template>
      <!-- expand -->
      <template slot="expand" slot-scope="props">
        <el-form label-position="left" inline class="ahsmp-table-expand">
          <el-form-item label="业务系统类别:">
            <span>{{ props.data.row.software.name || "暂无" }}</span>
          </el-form-item>
          <el-form-item label="主机别名:">
            <span>{{ props.data.row.alias || "暂无" }}</span>
          </el-form-item>
          <el-form-item label="DNS地址:">
            <span>{{ props.data.row.dns || "暂无" }}</span>
          </el-form-item>
          <el-form-item label="系统开发商:">
            <span>
              {{ props.data.row.develop_provider.name || "暂无" }}
              <span style="color:#f56c6c">{{
                props.data.row.develop_provider.status == 3
                  ? "(合约已过期)"
                  : ""
              }}</span>
            </span>
          </el-form-item>
          <el-form-item label="运维开发商:">
            <span>
              {{ props.data.row.maintain_provider.name || "暂无" }}
              <span style="color:#f56c6c">{{
                props.data.row.maintain_provider.status == 3
                  ? "(合约已过期)"
                  : ""
              }}</span>
            </span>
          </el-form-item>
          <el-form-item label="安全服务商:">
            <span>
              {{ props.data.row.safe_provider.name || "暂无" }}
              <span style="color:#f56c6c">{{
                props.data.row.safe_provider.status == 3 ? "(合约已过期)" : ""
              }}</span>
            </span>
          </el-form-item>
          <el-form-item label="安全联系人:">
            <span>
              {{ props.data.row.safe_provider.contact || "暂无" }}
              <span style="color:#f56c6c">{{
                props.data.row.safe_provider.status == 3 ? "(合约已过期)" : ""
              }}</span>
            </span>
          </el-form-item>
          <el-form-item label="资产位置:">
            <span>{{ props.data.row.address.name || "暂无" }}</span>
          </el-form-item>
        </el-form>
      </template>
    </g-el-table>
  </div>
</template>
<script>
import add from "views/assets/list/add";
import edit from "views/assets/list/edit";
import detail from "views/assets/list/detail";
import win from "views/assets/list/windownload";
import linux from "views/assets/list/linuxdownload";
import { delHost, getDropDownData } from "req/api/assets/list";
import managerTree from "views/assets/organization/managerTree";
import { getMinistryList } from "req/api/assets/organization.js";
import { mapMutations } from "vuex";
import * as types from "store/mutation_types.js";

export default {
  data() {
    return {
      url: "/host/list/client",
      type: "post",
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
          label: "IP地址",
          sortable: true,
          sortMethod: this.$tools.IPSort,
          prop: "ip",
          second_head: {
            isTemplate: true,
            templateName: "ip",
            prop: "ip",
            templateHeadName: "ip_head",
            width: "140px"
          }
        },
        {
          label: "资产名称",
          sortable: true,
          prop: "name",
          second_head: {
            prop: "name",
            templateHeadName: "name_head",
            width: "150px"
          }
        },
        {
          label: "系统类别",
          prop: "os",
          sortable: true,
          second_head: {
            isTemplate: true,
            templateName: "os",
            templateHeadName: "os_head",
            prop: "os",
            width: "150px"
          }
        },
        {
          label: "功能类别",
          prop: "tag",
          sortable: true,
          second_head: {
            isTemplate: true,
            templateName: "tag",
            templateHeadName: "tag_head",
            prop: "tag",
            minWidth: "150px"
          }
        },
        {
          label: "状态",
          prop: "online",
          sortable: true,
          second_head: {
            width: "130px",
            isTemplate: true,
            templateName: "online",
            templateHeadName: "online_head",
            prop: "online"
          }
        },
        {
          label: "所属部门",
          prop: "ministry",
          sortable: true,
          second_head: {
            isTemplate: true,
            templateName: "ministry",
            templateHeadName: "ministry_head",
            prop: "ministry",
            width: "180px"
          }
        },
        {
          label: "安全责任人",
          prop: "manager",
          sortable: true,
          second_head: {
            isTemplate: true,
            templateName: "manager",
            templateHeadName: "manager_head",
            prop: "manager",
            width: "150px"
          }
        },
        {
          label: "运维联系人",
          prop: "maintain_provider",
          sortable: true,
          second_head: {
            isTemplate: true,
            templateName: "maintain_provider",
            templateHeadName: "maintain_provider_head",
            prop: "maintain_provider",
            width: "150px"
          }
        },
        {
          label: "资产操作",
          second_head: {
            label: "",
            width: "270px",
            isTemplate: true,
            templateName: "operation"
          }
        },
        {
          type: "expand",
          fixed: "right",
          width: "60px",
          isTemplate: true,
          templateName: "expand"
        }
      ],
      tableHeadShow: true,
      tableParams: {},
      params: {
        page: 1,
        limit: 10,
        ip: "",
        os: "",
        tag: "",
        name: "",
        ministry: "",
        manager: "",
        maintain_provider: "",
        online:""
      },
      pageParams: {
        layout: "total, sizes, prev, pager, next, jumper",
        pageAlign: "left",
        pageSizes: [10, 20, 30]
      },
      dropDownData: {
        online: [
          {
            id: 1,
            name: "在线"
          },
          {
            id: 0,
            name: "离线"
          }
        ],
        os: this.$icons.osIcon,
        tag: [],
        manager: [],
        maintain_provider: [],
        address: [],
        develop_provider: [],
        safe_provider: [],
        softsare: []
      },
      icon: {
        linkIcon: this.$icons.linkIcon,
        tagIcon: this.$icons.tagIcon,
        os: this.$icons.osIcon
      },
      tagTest: "shijian",
      selectData: [],
      respData: {}
    };
  },
  activated() {
    this.__getMinistryList();
    this.__getDropDownData();
  },
  components: {
    managerTree
  },
  methods: {
    reload() {
      this.$refs.assets_list_table.reload();
    },
    search() {
      this.params.page = 1;
      this.reload();
    },
    selectChange(select) {
      this.selectData = select;
    },
    tableRespData(data) {
      this.respData = data
    },
    selectTreeChange(item) {
      this.params.ministry = item.ministryValue;
      this.reload();
    },
    add() {
      this.$layer.iframe({
        content: {
          content: add,
          parent: this,
          data: {
            selectData: this.dropDownData
          }
        },
        area: ["850px", "auto"],
        title: "添加资产位置",
        shadeClose: false
      });
    },
    edit(item) {
      this.$layer.iframe({
        content: {
          content: edit,
          parent: this,
          data: {
            layer_data: item,
            selectData: this.dropDownData
          }
        },
        area: ["850px", "auto"],
        title: "修改资产",
        shadeClose: false
      });
    },
    win() {
      this.$layer.iframe({
        content: {
          content: win,
          parent: this,
          data: {
            select_data: ""
          }
        },
        area: ["450px", "auto"],
        title: "Windows通信插件下载",
        shadeClose: false
      });
    },
    linux() {
      this.$layer.iframe({
        content: {
          content: linux,
          parent: this,
          data: {
            select_data: ""
          }
        },
        area: ["550px", "auto"],
        title: "Linux通信插件下载与安装",
        shadeClose: false
      });
    },
    detail(item) {
      this.$layer.iframe({
        content: {
          content: detail,
          parent: this,
          data: {
            layer_data: item
          }
        },
        area: ["900px", "auto"],
        title: "资产详情",
        shadeClose: false
      });
    },
    del(item) {
      let ids = "";
      let osAll = "";
      let noticeMsg = "确定删除吗？"
      if (Array.isArray(item)) {
        if (this.$tools.isArrayNull(item)) {
          this.$message({
            type: "error",
            message: "请选择需要删除的选项"
          });
          return;
        }
        ids = this.$tools.mergeId(item);
        osAll = this.$tools.mergeParam(item,'os')
        for(let assets of item) {
          if(assets.online == 0) {
            noticeMsg = "选择中存在离线主机,删除后需手动卸载客户端,确定删除吗?"
            break;
          }
        }
      } else {
        ids = item.id.toString();
        osAll = item.os
        if(item.online == 0) {
          noticeMsg = "该主机已离线,删除过后需手动卸载客户端,确定删除吗?"
        }
      }

      this.$isShowTip(
        "assets",
        "assets_list",
        noticeMsg,
        () => {
          this.__delHost({
            host_id: ids,
            os:osAll
          });
        },
        this
      );
    },
    __getDropDownData() {
      getDropDownData()
        .then(res => {
          this.dropDownData.maintain_provider = res.data.maintain_provider;
          this.dropDownData.tag = res.data.tag;
          this.dropDownData.manager = res.data.manager;
          this.dropDownData.address = res.data.address;
          this.dropDownData.develop_provider = res.data.develop_provider;
          this.dropDownData.safe_provider = res.data.safe_provider;
          this.dropDownData.software = res.data.software;
        })
        .catch(err => {});
    },
    __delHost(param) {
      delHost(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.reload();
        })
        .catch(err => {});
    },
    __getMinistryList() {
      getMinistryList()
        .then(res => {
          var arr = res.data;
          this.set_ministryList(this.$tools.treeData(arr));
        })
        .catch(err => {});
    },
    ...mapMutations({
      set_ministryList: types.SET_MINISTRYLIST
    })
  }
};
</script>
<style lang="less">
.assets-list {
  .assets_list_remianing_auth {
    float:right;
    color:#f56c6c;
  }
  .tagIcon-notice {
    // height: 50px;
    line-height: 50px;
    span {
      margin-right: 10px;
      svg {
        vertical-align: middle;
      }
    }
  }
}
</style>
