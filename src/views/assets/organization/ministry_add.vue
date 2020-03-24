<template>
  <div class="assets-organization-ministry-add">
    <mu-container>
      <mu-form
        :model="formData"
        class="mu-demo-form"
        :label-position="labelPosition"
        label-width="100"
        ref="assets_organization_ministry_add"
      >
        <mu-form-item prop="currentMinistry" label="当前选中">
          <mu-text-field v-model="currentMinistry" disabled></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="name" label="新增部门" :rules="nameRules" v-if="isAdd">
          <mu-text-field v-model="formData.name" :max-length="50"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="name" label="修改部门" :rules="nameRules" v-if="!isAdd">
          <mu-text-field v-model="formData.name" :max-length="50"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" small @click="submitAdd" v-if="isAdd">添加</mu-button>
          <mu-button color="primary" small @click="submitEdit" v-if="!isAdd">修改</mu-button>
          <mu-button @click="cancel" small>取消</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import * as types from "store/mutation_types.js";
import { addMinistry, editMinistry } from "req/api/assets/organization";
export default {
  name: "assets_organization_ministry_add",
  data() {
    return {
      labelPosition: "right",
      nameRules: [
        { validate: val => !!val, message: "新增部门不能为空!" },
        {
          validate: val => val.length >= 2 && val.length <= 10,
          message: "请输入正确的部门名称,部门长度为2-10位"
        }
      ],
      formData: {
        id: "",
        pid: "",
        name: ""
      }
    };
  },
  created() {
    if (!this.isAdd) {
      this.formData.id = this.layer_data.id;
      this.formData.name = this.layer_data.label;
    } else {
      this.formData.pid = this.layer_data.id;
    }
  },
  props: {
    layer_data: {
      type: [Object, Array, Number],
      default: () => {
        return {};
      }
    },
    node: {
      type: Object,
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
  computed: {
    currentMinistry() {
      let arr = [];
      arr.push(this.node.data.label);
      this.currentParent(this.node, arr);
      return arr.reverse().join("-");
    },
    ...mapGetters(["ministryList"])
  },
  methods: {
    submitAdd() {
      this.$refs.assets_organization_ministry_add.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_organization",
            "确定添加吗？",
            () => {
              this.__addMinistry(this.formData);
            },
            this
          );
        }
      });
    },
    submitEdit() {
      this.$refs.assets_organization_ministry_add.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_organization",
            "确定修改吗？",
            () => {
              this.__editMinistry(this.formData);
            },
            this
          );
        }
      });
    },
    findOneEditNode(treeData, title) {
      for (let item of treeData) {
        if (item.id == this.layer_data.id) {
          item.label = item.title = title;
        } else {
          item.children && this.findOneEditNode(item.children, title);
        }
      }
    },
    findOneAddNode(treeData, node) {
      for (let item of treeData) {
        if (item.id == this.layer_data.id) {
          if (!item.children) {
            item.children = [];
          }
          item.children.push(node);
        } else {
          item.children && this.findOneAddNode(item.children, node);
        }
      }
    },
    cancel() {
      this.$isShowTip(
            "assets",
            "assets_organization",
            "确定取消吗？",
            () => {
              this.$layer.close(this.layerid);
            },
            this
          );
    },
    currentParent(_this, arr) {
      if (_this.parent) {
        if (_this.parent.level != 1) {
          _this.parent.data.label != undefined && arr.push(_this.parent.data.label);
          this.currentParent(_this.parent, arr);
        }
      }
     
    },
    __addMinistry(param) {
      addMinistry(param)
        .then(res => {
          let treeData = JSON.parse(JSON.stringify(this.ministryList));
          this.findOneAddNode(treeData, {
            id: res.data.id,
            label: res.data.name
          });
          this.set_ministryList(treeData);
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$layer.close(this.layerid);
        })
        .catch(err => {});
    },
    __editMinistry(param) {
      editMinistry(param)
        .then(res => {
          let treeData = JSON.parse(JSON.stringify(this.ministryList));
          this.findOneEditNode(treeData, param.name);
          this.set_ministryList(treeData);
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.$layer.close(this.layerid);
          this.$parent.$refs.assets_organization_ministry_table.reload();
        })
        .catch(err => {});
    },
    ...mapMutations({
      set_ministryList: types.SET_MINISTRYLIST
    })
  }
};
</script>
<style scoped>
.assets-organization-ministry-add {
  width: 100%;
  padding: 10px 20px 0 0;
}
</style>


