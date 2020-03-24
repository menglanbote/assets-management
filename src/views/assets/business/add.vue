<template>
  <div class="assets-business-add">
      <mu-form
        :model="formData"
        class="mu-demo-form"
        :label-position="labelPosition"
        label-width="120"
        ref="assets_business_add"
      >
        <mu-form-item prop="name" label="业务系统名称" :rules="nameRules">
          <mu-text-field v-model="formData.name" :max-length="50"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="status" label="业务系统状态" v-if="!is_add">
          <mu-radio
            v-for="item of dropDownData.status"
            :key="item.id"
            :value="item.id"
            v-model="formData.status"
            :label="item.name"
          ></mu-radio>
        </mu-form-item>
        <mu-form-item prop="description" label="功能说明" :rules="descriptionRules">
          <mu-text-field
            v-model="formData.description"
            :rows-min="2"
            multiLine
            :rows-max="3"
            :max-length="500"
          />
        </mu-form-item>
        <mu-form-item prop="on_time" label="上线时间" :rules="on_timeRules">
          <!-- <mu-date-input
            v-model="formData.on_time"
            label-float
            full-width
            type="dateTime"
          ></mu-date-input> -->
           <mu-text-field
              v-model="formData.on_time"
              :max-length="50"
              @click="openDate('custom_time_picker')"
              ref="custom_date_self"
            ></mu-text-field>
            <div class="form_date_custom">
              <el-date-picker
                v-model="formData.on_time"
                ref="custom_time_picker"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                @change="openDate('custom_date_self')"
              >
              </el-date-picker>
            </div>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" small @click="submitEdit" v-if="!is_add">修改</mu-button>
          <mu-button color="primary" small @click="submitAdd" v-if="is_add">添加</mu-button>
          <mu-button color="primary" small @click="submitSaveAdd" v-if="is_add">保存后继续添加</mu-button>
          <mu-button small @click="cancel">取消</mu-button>
        </mu-form-item>
      </mu-form>
  </div>
</template>
<script>
import {
  getBusinessInfo,
  editBusiness,
  addBusiness
} from "req/api/assets/business";
import openDatePicker from "common/js/datebug"
export default {
  data() {
    return {
      labelPosition: "right",
      on_timeRules: [{ validate: val => !!val, message: "上线时间不能为空" }],
      nameRules: [{ validate: val => !!val, message: "业务系统名称不能为空" }],
      descriptionRules: [
        { validate: val => !!val, message: "功能说明不能为空" }
      ],
      formData: {
        id: "",
        on_time: "",
        status: 1,
        description: "",
        name: ""
      }
    };
  },
  props: {
    layerid: {
      type: String
    },
    layer_data: {
      type: [String, Object, Array],
      default: () => {
        return {};
      }
    },
    is_add: {
      type: Boolean,
      default: true
    },
    dropDownData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  created() {
    if (!this.is_add) {
      this.getBusinessInfo(this.layer_data);
    }
  },
  methods: {
    openDate(param) {
      let _this = this
      openDatePicker(param,_this)
    },
    submitEdit() {
      this.$refs.assets_business_add.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_business",
            "确定保存吗？",
            () => {
              this.__editBusiness(this.formData);
            },
            this
          );
        }
      });
    },
    submitAdd() {
      this.$refs.assets_business_add.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_business",
            "确定添加吗？",
            () => {
              this.__addBusiness(this.formData)
                .then(res => {
                  this.$layer.close(this.layerid);
                })
                .catch(err => {
                  console.log(err);
                });
            },
            this
          );
        }
      });
    },
    submitSaveAdd() {
      this.$refs.assets_business_add.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_business",
            "确定添加吗？",
            () => {
              this.__addBusiness(this.formData)
                .then(res => {
                  this.$refs.assets_business_add.clear();
                  this.formData = {
                    id: "",
                    on_time: "",
                    status: 1,
                    description: "",
                    name: ""
                  };
                })
                .catch(err => {
                  console.log(err);
                });
            },
            this
          );
        }
      });
    },
    cancel() {
      this.$isShowTip(
        "assets",
        "assets_business",
        "确定取消吗？",
        () => {
          this.$layer.close(this.layerid);
        },
        this
      );
    },
    getBusinessInfo(data) {
      this.formData.id = this.layer_data.id || "";
      this.formData.name = this.layer_data.name || "";
      this.formData.status = this.layer_data.status || 1;
      this.formData.description = this.layer_data.description || "";
      this.formData.on_time = this.layer_data.on_time || "";
    },
    __addBusiness(param) {
      return addBusiness(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$parent.$refs.assets_business_table.reload();
          return Promise.resolve(res);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    __editBusiness(param) {
      editBusiness(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.$parent.$refs.assets_business_table.reload();
          this.$layer.close(this.layerid);
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.assets-business-add {
  width:100%;
  padding: 20px 20px 0 0;
}
</style>