<template>
  <div class="assets-area-add">
      <mu-form
        :model="formData"
        class="mu-demo-form"
        :label-position="labelPosition"
        label-width="100"
        ref="assets_area_add"
      >
        <mu-form-item prop="name" label="位置名称" :rules="nameRules">
          <mu-text-field v-model="formData.name" :max-length="50"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="address" label="详细位置" :rules="addressRules">
          <mu-text-field v-model="formData.address" :max-length="50"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="provider" label="运营商" :rules="providerRules">
          <mu-select v-model="formData.provider">
            <mu-option
              v-for="item in select_data.provider"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item prop="type" label="类型" :rules="typeRules">
          <mu-select v-model="formData.type">
            <mu-option
              v-for="item in select_data.type"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></mu-option>
          </mu-select>
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
import { addArea, editArea, editInfo } from "req/api/assets/area.js";
export default {
  name: "assets_area_add",
  data() {
    return {
      labelPosition: "right",
      nameRules: [
        { validate: val => !!val, message: "位置名称不能为空" }
      ],
      addressRules: [
        { validate: val => !!val, message: "详细位置不能为空" }
      ],
      providerRules: [{ validate: val => !!val, message: "运营商不能为空" }],
      typeRules: [{ validate: val => !!val, message: "类型不能为空" }],
      formData: {
        id: "",
        name: "",
        address: "",
        provider: "",
        type: ""
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
    select_data: {
      type: [Object, Array],
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
      this.__editInfo()
      // this.__editInfo({
      //   id: this.layer_data.id
      // });
    }
  },
  methods: {
    submitAdd() {
      this.$refs.assets_area_add.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_area",
            "确定添加吗？",
            () => {
              this.__addArea(this.formData);
            },
            this
          );
        }
      });
    },
    submitEdit() {
      this.$refs.assets_area_add.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_area",
            "确定修改吗?",
            () => {
              this.__editArea(this.formData);
            },
            this
          );
        }
      });
    },
    cancel() {
      this.$isShowTip(
            "assets",
            "assets_area",
            "确定取消吗？",
            () => {
              this.$layer.close(this.layerid)
            },
            this
          );
    },
    __editInfo(param) {
      this.formData.id = this.layer_data.id;
          this.formData.address = this.layer_data.address;
          this.formData.name = this.layer_data.name;
          this.formData.provider = this.layer_data.provider;
          this.formData.type = this.layer_data.type;
      // editInfo(param)
      //   .then(res => {
      //     this.formData.id = res.data.id;
      //     this.formData.address = res.data.address;
      //     this.formData.name = res.data.name;
      //     this.formData.provider = res.data.provider;
      //     this.formData.type = res.data.type;
      //   })
      //   .catch(err => {});
    },
    __addArea(param) {
      addArea(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$layer.close(this.layerid);
          this.$parent.$refs.assets_area_table.reload();
        })
        .catch(err => {});
    },
    __editArea(param) {
      editArea(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.$layer.close(this.layerid);
          this.$parent.$refs.assets_area_table.reload();
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.assets-area-add {
  width: 100%;
  padding: 10px 20px 0 0;
}
</style>


