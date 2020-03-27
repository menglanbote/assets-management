<template>
  <div class="assets-facilitator-update">
    <el-container>
      <el-form
        :model="formData"
        class="el-demo-form"
        :label-position="labelPosition"
        label-width="120px"
        ref="assets_facilitator_update"
        :rules="rules"
      >
        <input type="hidden" v-model="formData.service_id" />
        <el-form-item prop="end_time" label="终止时间" >
            <!-- <el-date-input type="dateTime" v-model="formData.end_time" label-float full-width no-display></el-date-input> -->
<!--           
           <el-input
              v-model="formData.end_time"
              :max-length="50"
              @click="openDate('custom_time_picker')"
              ref="custom_date_self"
            ></el-input>
            <div class="form_date_custom"> -->
              <el-date-picker
                v-model="formData.end_time"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            
          </el-form-item>
        <el-form-item prop="content" label="服务描述">
          <el-input v-model="formData.content" :max-length="50"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button color="primary" small  @click="submit">确定</el-button>
          <el-button small @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-container>
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
      assets_facilitator_update:{
        end_time:'',
        content:''
      },
      rules:{
        end_time:[ {required:true,message:'终止时间不能为空',trigger:'blur'}],
        content:[ {required:true,message:'服务描述不能为空',trigger:'blur'}],

      },
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


