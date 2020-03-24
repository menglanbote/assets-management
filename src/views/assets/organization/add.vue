<template>
  <div class="assets-organization-add">
      <mu-form
        :model="formData"
        class="mu-demo-form"
        :label-position="labelPosition"
        label-width="100"
        ref="assets_organization_add"
      >
        <mu-form-item prop="name" label="姓名" :rules="nameRules">
          <mu-text-field v-model="formData.name" :max-length="50"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="gender" label="性别" >
          <mu-radio v-model="formData.gender" value="1" label="男" uncheck-icon=":iconfont icon-nan1 gender-uncheck" checked-icon=":iconfont icon-nan1 gender-check-nan"></mu-radio>
          <mu-radio v-model="formData.gender" value="2" label="女" uncheck-icon=":iconfont icon-nv1 gender-uncheck" checked-icon=":iconfont icon-nv1 gender-check-nv"></mu-radio>
        </mu-form-item>
        <mu-form-item prop="ministry" label="部门" :rules="ministryRules">
          <mumanager-tree :ministry="formData.ministry" :ministry_id="formData.ministry_id.toString()"  @selectTreeChange="selectTreeChange"></mumanager-tree>
        </mu-form-item>
        <mu-form-item prop="phone" label="联系电话" :rules="phoneRules">
          <mu-text-field v-model="formData.phone" :max-length="20"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" small @click="submitAdd" v-if="isAdd">添加</mu-button>
          <mu-button color="primary" small @click="submitEdit" v-if="!isAdd">修改</mu-button>
          <mu-button @click="cancel" small>取消</mu-button>
        </mu-form-item>
      </mu-form>
  </div>
</template>
<script>
import { addManager, editManager } from "req/api/assets/organization.js";
import mumanagerTree from './mumanagerTree'
export default {
  name: "assets_organization_add",
  data() {
    return {
      labelPosition: "right",
      nameRules: [
        { validate: val => !!val, message: "姓名不能为空" },
        {
          validate: val => val.length >= 2 && val.length <= 10,
          message: "请输入正确的姓名,姓名长度为2到10位"
        }
      ],
      ministryRules: [
        { validate: val => !!val, message: "部门不能为空" }
      ],
       phoneRules: [
        { validate: val => !!val, message: "联系电话不能为空" },
        {
          validate: val => this.$validates.phoneReg.test(val),
          message: '号码格式错误,若为座机号码请在区号后增加"-" '
        }
      ],
      formData: {
        id: "",
        name: "",
        ministry_id:"",
        ministry: "",
        phone: "",
        gender: "1"
      }
    };
  },
  props: {
    layer_data: {
      type: [Object, Array, Number],
      default: () => {
        return {};
      }
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    layerid: {
      type: String
    }
  },
  created() {
    if (!this.isAdd) {
      this.formData.id = this.layer_data.id
      this.formData.name = this.layer_data.name
      this.formData.ministry_id = this.layer_data.ministry_id
      this.formData.ministry = this.layer_data.ministry
      this.formData.phone = this.layer_data.phone
      this.formData.gender = this.layer_data.gender
    }
  },
  components: {
    mumanagerTree
  },
  methods: {
    submitAdd() {
      this.$refs.assets_organization_add.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_organization",
            "确定添加吗？",
            () => {
              this.__addManager(this.formData);
            },
            this
          );
        }
      });
    },
    submitEdit() {
      this.$refs.assets_organization_add.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_organization",
            "确定修改吗?",
            () => {
              this.__editManager(this.formData);
            },
            this
          );
        }
      });
    },
    cancel() {
      this.$isShowTip(
            "assets",
            "assets_organization",
            "确定取消吗？",
            () => {
              this.$layer.close(this.layerid)
            },
            this
          );
    },
    selectTreeChange(data) {
      this.formData.ministry_id = data.ministryValue
      this.formData.ministry = data.ministryName
    },
    __addManager(param) {
      addManager(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$layer.close(this.layerid);
          this.$parent.$refs.assets_organization_manager_table.reload();
        })
        .catch(err => {});
    },
    __editManager(param) {
      editManager(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.$layer.close(this.layerid);
          this.$parent.$refs.assets_organization_manager_table.reload();
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less">
.assets-organization-add {
  width: 100%;
  padding: 10px 20px 0 0;
  .gender-uncheck {
    color:#999;
    font-size: 24px;
  }
  .gender-check-nan {
    color:#09bbfc;
    font-size: 24px;
  }
  .gender-check-nv {
    color:#ff3ec9;
    font-size: 24px;
  }
}

</style>


