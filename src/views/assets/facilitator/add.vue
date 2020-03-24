<template>
  <div class="assets-facilitator-add">
    <mu-container>
      <mu-form
        :model="formData"
        class="mu-demo-form"
        :label-position="labelPosition"
        label-width="120"
        ref="assets_facilitator_add"
      >
        <input type="hidden" v-model="formData.id" v-if="!isAdd" />
        <mu-form-item prop="name" label="服务商名称" :rules="nameRules">
          <mu-text-field
            v-model="formData.name"
            :max-length="50"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="content" label="服务商描述" :rules="contentRules">
          <mu-text-field
            v-model="formData.content"
            :max-length="150"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="is_local" label="是否本地服务商">
          <mu-radio v-model="formData.is_local" value="1" label="是"></mu-radio>
          <mu-radio v-model="formData.is_local" value="0" label="否"></mu-radio>
        </mu-form-item>
        <mu-form-item prop="type" label="服务商类别" :rules="typeRules">
          <mu-checkbox
            v-model="formData.type"
            v-for="item of dropDownData.type"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></mu-checkbox>
        </mu-form-item>
        <div class="form-item-inline">
          <mu-form-item prop="contact" label="联系人" :rules="contactRules">
            <mu-text-field
              v-model="formData.contact"
              :max-length="50"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="position" label="职位">
            <mu-text-field
              v-model="formData.position"
              :max-length="50"
            ></mu-text-field>
          </mu-form-item>
        </div>
        <div class="form-item-inline">
          <mu-form-item prop="phone" label="联系电话" :rules="phoneRules">
            <mu-text-field
              v-model="formData.phone"
              :max-length="20"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item
            prop="start_time"
            label="首次签约时间"
            :rules="start_timeRules"
          >
            <mu-text-field
              v-model="formData.start_time"
              :max-length="50"
              @click="openDate('custom_time_picker')"
              ref="custom_date_self"
            ></mu-text-field>
            <div class="form_date_custom">
              <el-date-picker
                v-model="formData.start_time"
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
        </div>
        <mu-form-item prop="address" label="服务商地址">
          <mu-text-field
            v-model="formData.address"
            :max-length="50"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="description" label="服务商说明">
          <mu-text-field
            v-model="formData.description"
            :rows-min="2"
            multiLine
            :rows-max="3"
            :max-length="500"
          />
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" small v-if="isAdd" @click="add"
            >添加</mu-button
          >
          <mu-button color="primary" small v-if="isAdd" @click="saveAndAdd"
            >保存后继续添加</mu-button
          >
          <mu-button color="primary" small v-if="!isAdd" @click="edit"
            >修改</mu-button
          >
          <mu-button small @click="cancel">取消</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>
<script>
import {
  addFacilitator,
  findOneFacilitator,
  editFacilitator
} from "req/api/assets/facilitator.js";
import openDatePicker from "common/js/datebug"
export default {
  name: "assets_facilitator_add",
  data() {
    return {
      isShowDate: false,
      labelPosition: "right",
      nameRules: [{ validate: val => !!val, message: "服务商名称不能为空" }],
      contentRules: [{ validate: val => !!val, message: "服务商描述不能为空" }],
      typeRules: [
        { validate: val => val.length > 0, message: "服务商类别不能为空" }
      ],
      contactRules: [{ validate: val => !!val, message: "联系人不能为空" }],
      phoneRules: [
        { validate: val => !!val, message: "联系电话不能为空" },
        {
          validate: val => this.$validates.phoneReg.test(val),
          message: '号码格式错误,若为座机号码请在区号后增加"-" '
        }
      ],
      start_timeRules: [
        { validate: val => !!val, message: "首次签约时间不能为空" }
      ],
      formData: {
        id: "",
        name: "",
        content: "",
        is_local: "1",
        type: [],
        contact: "",
        position: "",
        phone: "",
        start_time: "",
        address: "",
        description: ""
      }
    };
  },
  created() {
    if (!this.isAdd) {
      this.__findOneFacilitator({
        id: this.layer_data.id
      });
    }
  },
  props: {
    layer_data: {
      type: [Object, Array, Number],
      default: () => {
        return {};
      }
    },
    dropDownData: {
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
  methods: {
    openDate(param) {
      let _this = this
      openDatePicker(param,_this)
    },
    add() {
      this.$refs.assets_facilitator_add.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_facilitator",
            "确定添加吗？",
            () => {
              this.__addFacilitator(this.formData)
                .then(res => {
                  this.$layer.close(this.layerid);
                })
                .catch(err => {});
            },
            this
          );
        }
      });
    },
    saveAndAdd() {
      this.$refs.assets_facilitator_add.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_facilitator",
            "确定添加吗？",
            () => {
              this.__addFacilitator(this.formData)
                .then(res => {
                  this.$refs.assets_facilitator_add.clear();
                  this.formData = {
                    id: "",
                    name: "",
                    content: "",
                    is_local: "1",
                    type: [],
                    contact: "",
                    position: "",
                    phone: "",
                    start_time: "",
                    address: "",
                    description: ""
                  };
                })
                .catch(err => {});
            },
            this
          );
        }
      });
    },
    edit() {
      this.$refs.assets_facilitator_add.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_facilitator",
            "确定添加吗？",
            () => {
              this.__editFacilitator(this.formData);
            },
            this
          );
        }
      });
    },
    cancel() {
      this.$isShowTip(
        "assets",
        "assets_facilitator",
        "确定取消吗？",
        () => {
          this.$layer.close(this.layerid);
        },
        this
      );
    },
    __addFacilitator(param) {
      return addFacilitator(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$parent.$refs.assets_facilitator_table.reload();
          return Promise.resolve(res);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    __editFacilitator(param) {
      editFacilitator(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.$layer.close(this.layerid);
          this.$parent.$refs.assets_facilitator_table.reload();
        })
        .catch(err => {});
    },
    __findOneFacilitator(param) {
      findOneFacilitator(param)
        .then(res => {
          (this.formData.id = res.data.id),
            (this.formData.name = res.data.name),
            (this.formData.content = res.data.content),
            (this.formData.is_local = res.data.is_local.toString()),
            (this.formData.type = res.data.type),
            (this.formData.contact = res.data.contact),
            (this.formData.position = res.data.position),
            (this.formData.phone = res.data.phone),
            (this.formData.start_time = res.data.start_time),
            (this.formData.address = res.data.address),
            (this.formData.description = res.data.description);
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang="less">
.assets-facilitator-add {
  width: 100%;
  padding: 10px 20px 0 0;
}
</style>
