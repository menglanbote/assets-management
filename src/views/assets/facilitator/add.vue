<template>
  <div class="">
    <el-container>
      <el-form
        :model="formData"
        class="el-demo-form"
        :label-position="labelPosition"
        label-width="160px"
        ref="assets_facilitator_add"
        :rules="rules"
        style="margin-top:20px"
      >
        <input type="hidden" v-model="formData.id" v-if="!isAdd" />
        <el-form-item prop="name" label="服务商名称">
          <el-input v-model="formData.name" :max-length="50"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="服务商描述">
          <el-input v-model="formData.content" :max-length="150"></el-input>
        </el-form-item>
        <el-form-item prop="is_local" label="是否本地服务商">
          <el-radio v-model="formData.is_local" value="1" label="是"></el-radio>
          <el-radio v-model="formData.is_local" value="0" label="否"></el-radio>
        </el-form-item>
        <el-form-item prop="type" label="服务商类别">
          <el-checkbox
            v-model="formData.type"
            v-for="item of dropDownData.type"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-checkbox>
        </el-form-item>
        <div class="form-item-inline">
          <el-form-item prop="contact" label="联系人">
            <el-input v-model="formData.contact" :max-length="50"></el-input>
          </el-form-item>
          <el-form-item prop="position" label="职位">
            <el-input v-model="formData.position" :max-length="50"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-inline">
          <el-form-item prop="phone" label="联系电话">
            <el-input v-model="formData.phone" :max-length="20"></el-input>
          </el-form-item>
          <el-form-item prop="start_time" label="首次签约时间">
            <!-- <el-input
              v-model="formData.start_time"
              :max-length="50"
              @click="openDate('custom_time_picker')"
              ref="custom_date_self"
            ></el-input>
            <div class="form_date_custom"> -->
            <el-date-picker
              v-model="formData.start_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            <!-- </div> -->
          </el-form-item>
        </div>
        <el-form-item prop="address" label="服务商地址">
          <el-input v-model="formData.address" :max-length="50"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="服务商说明">
          <el-input
            v-model="formData.description"
            :rows-min="2"
            multiLine
            :rows-max="3"
            :max-length="500"
          />
        </el-form-item>
        <el-form-item>
          <el-button color="primary" small v-if="isAdd" @click="add"
            >添加</el-button
          >
          <el-button color="primary" small v-if="isAdd" @click="saveAndAdd"
            >保存后继续添加</el-button
          >
          <el-button color="primary" small v-if="!isAdd" @click="edit"
            >修改</el-button
          >
          <el-button small @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>
<script>
import {
  addFacilitator,
  findOneFacilitator,
  editFacilitator
} from "req/api/assets/facilitator.js";
import openDatePicker from "common/js/datebug";
import {isphone}  from "@/common/js/validate"
export default {
  name: "assets_facilitator_add",
  data() {
    return {
      isShowDate: false,
      labelPosition: "right",
      assets_facilitator_add:{
          name:'',
          content:'',
          type:'',
          contact:'',
          phone:'',
          start_time:'',
      },
      rules: {
        name: [{required:true,message:'服务商名称不能为空',trigger:'blur'}],
        content: [{required:true,message:'服务商描述不能为空',trigger:'blur'}],
        type: [
          { required:true,message:'服务商类别不能为空',trigger:'blur' }
        ],
        contact: [{ required:true,message:'联系人不能为空',trigger:'blur' }],
        phone: [
          { required:true,message:'电话不能为空',trigger:'blur' },
          {
            validator:isphone, trigger: "blur" 
          }
        ],
        start_time: [
          {  required:true,message:'首次签约时间不能为空',trigger:'blur'  }
        ]
      },
      // nameRules: [{ validate: val => !!val, message: "服务商名称不能为空" }],
      // contentRules: [{ validate: val => !!val, message: "服务商描述不能为空" }],
      // typeRules: [
      //   { validate: val => val.length > 0, message: "服务商类别不能为空" }
      // ],
      // contactRules: [{ validate: val => !!val, message: "联系人不能为空" }],
      //  phoneRules: [
      //    { validate: val => !!val, message: "联系电话不能为空" },
      //    {
      //      validate: val => this.$validates.phoneReg.test(val),
      //     message: '号码格式错误,若为座机号码请在区号后增加"-" '
      //    }
      //  ],
      // start_timeRules: [
      //   { validate: val => !!val, message: "首次签约时间不能为空" }
      // ],
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
      let _this = this;
      openDatePicker(param, _this);
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
