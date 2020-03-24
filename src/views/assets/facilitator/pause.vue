<template>
  <div class="assets-facilitator-pause">
    <mu-container>
      <mu-form
        :model="formData"
        class="mu-demo-form"
        :label-position="labelPosition"
        label-width="80"
        ref="assets_facilitator_pause"
      >
        <input type="hidden" v-model="formData.service_id" />
        <mu-form-item prop="end_reason" label="终止原因" :rules="end_reasonRules">
          <mu-select placeholder="请选择" v-model="formData.end_reason" full-width>
            <mu-option
              v-for="item in dropDownData.end_reasonRules"
              ripple
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item
          prop="end_reason_description"
          label="其他原因"
          v-if="formData.end_reason == 3"
          :rules="end_reason_descriptionRules"
        >
          <mu-text-field v-model="formData.end_reason_description" :max-length="50"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" small @click="submit">确定</mu-button>
          <mu-button small @click="cancel">取消</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>
<script>
import { endFacilitator } from "req/api/assets/facilitator.js";

export default {
  name: "assets_facilitator_pause",
  data() {
    return {
      labelPosition: "right",
      end_reasonRules: [
        {
          validate: val => !!val,
          message: "终止原因不能为空"
        }
      ],
      end_reason_descriptionRules: [
        { validate: val => !!val, message: "其他原因不能为空" }
      ],
      formData: {
        service_id: this.pause_id,
        end_reason: "",
        end_reason_description: ""
      },
      dropDownData: {
        end_reasonRules: [
          {
            id: 1,
            name: "该公司主动放弃"
          },
          {
            id: 2,
            name: "该公司服务不佳"
          },
          {
            id: 3,
            name: "其他原因"
          }
        ]
      }
    };
  },
  props: {
    pause_id: {
      type: String,
      default: ""
    },
    layerid: {
      type: String
    }
  },
  methods: {
    submit() {
      this.$refs.assets_facilitator_pause.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "assets",
            "assets_facilitator",
            "确定更新吗？",
            () => {
              this.__endFacilitator(this.formData);
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
    __endFacilitator(param) {
      endFacilitator(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "终止成功"
          });
          this.$parent.$refs.assets_facilitator_table.reload();
          this.$layer.close(this.layerid);
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang="less">
.assets-facilitator-pause {
  width: 100%;
  padding: 20px 20px 0 0;
}
</style>


