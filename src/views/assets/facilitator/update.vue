<template>
  <div class="assets-facilitator-update">
    <mu-container>
      <mu-form
        :model="formData"
        class="mu-demo-form"
        :label-position="labelPosition"
        label-width="80"
        ref="assets_facilitator_update"
      >
        <input type="hidden" v-model="formData.service_id" />
        <mu-form-item prop="end_time" label="终止时间" :rules="end_timeRules">
            <!-- <mu-date-input type="dateTime" v-model="formData.end_time" label-float full-width no-display></mu-date-input> -->
          
           <mu-text-field
              v-model="formData.end_time"
              :max-length="50"
              @click="openDate('custom_time_picker')"
              ref="custom_date_self"
            ></mu-text-field>
            <div class="form_date_custom">
              <el-date-picker
                v-model="formData.end_time"
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
        <mu-form-item prop="content" label="服务描述" :rules="contentRules">
          <mu-text-field v-model="formData.content" :max-length="50"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" small  @click="submit">确定</mu-button>
          <mu-button small @click="cancel">取消</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>
<script>
import {updateFacilitator } from "req/api/assets/facilitator.js";
import openDatePicker from "common/js/datebug"
export default {
  name: "assets_facilitator_update",
  data() {
    return {
      labelPosition: "right",
      contentRules: [{ validate: val => !!val, message: "服务描述不能为空" }],
      end_timeRules: [
        { validate: val => !!val, message: "终止时间不能为空" }
      ],
      formData: {
        service_id: this.update_id,
        end_time: "",
        content: ""
      }
    };
  },
  props: {
    update_id: {
      type: String,
      default: ""
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
    submit() {
      this.$refs.assets_facilitator_update.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_facilitator",
            "确定更新吗？",
            () => {
              this.__updateFacilitator(this.formData)
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
    __updateFacilitator(param) {
      updateFacilitator(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "更新成功"
          });
          this.$parent.$refs.assets_facilitator_table.reload()
          this.$layer.close(this.layerid)
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang="less">
.assets-facilitator-update {
  width: 100%;
  padding: 10px 20px 0 0;
}
</style>


