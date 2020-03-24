<template>
  <div class="assets-list-edit" style="width: 100%;padding: 8px;">
    <mu-form
      :model="formData"
      class="mu-demo-form"
      :label-position="labelPosition"
      label-width="110"
      ref="assets_list_edit"
    >
      <div class="form-item-inline">
        <mu-form-item prop="name" label="资产名称" :rules="nameRules">
          <mu-text-field
            v-model="formData.name"
            :max-length="50"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item
          prop="software_id"
          label="业务系统类别"
          :rules="software_idRules"
        >
          <mu-select v-model="formData.software_id">
            <mu-option
              v-for="item in dropDownData.software_id"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></mu-option>
          </mu-select>
        </mu-form-item>
      </div>
      <mu-form-item prop="tag" label="功能类别" :rules="tagRules">
        <mu-checkbox
          v-model="formData.tag"
          v-for="item of dropDownData.tag"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></mu-checkbox>
      </mu-form-item>
      <div class="form-item-inline">
        <mu-form-item prop="ministry_id" label="所属部门">
          <mumanager-tree
            :ministry="formData.ministry"
            :ministry_id="formData.ministry_id.toString()"
            @selectTreeChange="selectTreeChange"
          ></mumanager-tree>
        </mu-form-item>
        <mu-form-item prop="manager_id" label="安全责任人">
          <mu-select v-model="formData.manager_id">
            <mu-option
              v-for="item in dropDownData.manager_id"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></mu-option>
          </mu-select>
        </mu-form-item>
      </div>
      <div class="form-item-inline">
        <mu-form-item prop="develop_provider_id" label="系统开发商">
          <mu-select v-model="formData.develop_provider_id">
            <mu-option
              v-for="item in dropDownData.develop_provider_id"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item prop="maintain_provider_id" label="运维服务商">
          <mu-select v-model="formData.maintain_provider_id">
            <mu-option
              v-for="item in dropDownData.maintain_provider_id"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></mu-option>
          </mu-select>
        </mu-form-item>
      </div>
      <div class="form-item-inline">
        <mu-form-item prop="safe_provider_id" label="安全服务商">
          <mu-select v-model="formData.safe_provider_id">
            <mu-option
              v-for="item in dropDownData.safe_provider_id"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item prop="address_id" label="资产位置">
          <mu-select v-model="formData.address_id">
            <mu-option
              v-for="item in dropDownData.address_id"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></mu-option>
          </mu-select>
        </mu-form-item>
      </div>
      <mu-form-item>
        <mu-button color="primary" small @click="submitEdit">修改</mu-button>
        <mu-button @click="cancel" small>取消</mu-button>
      </mu-form-item>
    </mu-form>
  </div>
</template>
<script>
import { editHost } from "req/api/assets/list";
import mumanagerTree from "views/assets/organization/mumanagerTree";

export default {
  name: "assets_list_add",
  data() {
    return {
      activeStep: 0,
      labelPosition: "right",
      nameRules: [{ validate: val => !!val, message: "资产名称不能为空" }],
      tagRules: [
        {
          validate: val => {
            return val.length > 0;
          },
          message: "功能类别不能为空"
        }
      ],
      software_idRules: [
        { validate: val => !!val, message: "业务系统类别不能为空" }
      ],
      formData: {
        id: "",
        tag: [],
        name: "",
        // 业务系统类别
        software_id: "",
        // 所属部门
        ministry_id: "",
        ministry: "",
        // 安全责任人
        manager_id: "",
        // 系统开发商
        develop_provider_id: "",
        // 运维
        maintain_provider_id: "",
        // 安全服务商
        safe_provider_id: "",
        // 地址
        address_id: ""
      },
      dropDownData: {
        software_id: this.selectData.software,
        tag: this.selectData.tag,
        manager_id: this.selectData.manager,
        develop_provider_id: this.selectData.develop_provider,
        maintain_provider_id: this.selectData.maintain_provider,
        safe_provider_id: this.selectData.safe_provider,
        address_id: this.selectData.address
      }
    };
  },
  props: {
    layer_data: {
      type: [Object, Array],
      defalt: () => {
        return {};
      }
    },
    selectData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    layerid: {
      type: String
    }
  },
  components: {
    mumanagerTree
  },
  created() {
    this.setInfo(this.layer_data);
  },
  methods: {
    selectTreeChange(data) {
      this.formData.ministry_id = data.ministryValue;
      this.formData.ministry = data.ministryName;
    },
    submitEdit() {
      this.$refs.assets_list_edit.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_list",
            "确定修改吗？",
            () => {
              let data = JSON.parse(JSON.stringify(this.formData));
              data.tag = this.formData.tag.join(",");
              this.__editHost(data);
            },
            this
          );
        }
      });
    },
    cancel() {
      this.$isShowTip(
        "assets",
        "assets_list",
        "确定取消吗？",
        () => {
          this.$layer.close(this.layerid);
        },
        this
      );
    },
    setInfo(res) {
      this.formData.id = res.id;
      let tags = [];
      for (let item of res.tag) {
        tags.push(parseInt(item.id));
      }
      
      this.formData.tag = tags;
      this.formData.name = res.name;
      this.formData.software_id = res.software.id;
      this.formData.ministry_id = res.ministry.id
        ? res.ministry.id.toString()
        : "";
      this.formData.ministry = res.ministry.name;
      this.formData.manager_id = res.manager.id;
      this.formData.develop_provider_id = res.develop_provider.id;
      this.formData.maintain_provider_id = res.maintain_provider.id;
      this.formData.safe_provider_id = res.safe_provider.id;
      this.formData.address_id = res.address.id;
    },
    __editHost(param) {
      editHost(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.$layer.close(this.layerid);
          this.$parent.$refs.assets_list_table.reload();
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less">
.assets-list-edit {
  padding: 0 20px 20px;
  .mu-checkbox-label {
    width: 100px;
  }
}
</style>
