<template>
  <div class="four_step">
    <el-divider content-position="left">出口地址 <span class="colorNotice">(出口地址为负载均衡所使用的虚拟地址)</span></el-divider>
    <el-form
      :model="formData"
      :rules="rules"
      ref="step_server_form"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="IP地址" prop="ip">
        <el-input v-model="formData.ip" :maxLength="50"></el-input>
      </el-form-item>
      <div v-for="(item, index) in moduleList" :key="index">
        <div>{{ item.name }}:</div>
        <div class="clr">
          <!-- <el-col :span="6">
            <el-form-item label="端口号" :prop="item.port">
              <el-input
                v-model="formData[item.port]"
                :maxLength="50"
              ></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item label="后端IP地址" :prop="item.backend_ip">
              <el-input
                v-model="formData[item.backend_ip]"
                :maxLength="100"
              ></el-input>
            </el-form-item>
          </el-col>
        </div>
      </div>
    </el-form>
    <div>
      <mu-button
        flat
        class="demo-step-button"
        :disabled="activeStep === 0"
        @click="handlePrev"
      >
        上一步
      </mu-button>
      <mu-button class="demo-step-button" color="primary" @click="handleNext">
        下一步
      </mu-button>
    </div>
  </div>
</template>
<script>
import { addproxyip, getmodule } from "req/api/install";
export default {
  name: "four_step",
  data() {
    var validateIP = (rule, value, callback) => {
      let isTest = this.$validates.ipReg.test(value);
      if (!isTest) {
        return callback(new Error("请输入正确的IP格式,例如:1.1.1.1"));
      } else {
        return callback();
      }
    };
    return {
      labelPosition: "right",
      formData: {
        ip: ""
      },
      moduleList: [],
      rules: {
        ip: [
          { required: true, message: "IP地址不能为空", trigger: "blur" },
          { validator: validateIP, trigger: "blur" }
        ]
      }
    };
  },
  props: {
    activeStep: Number
  },
  created() {
    this.formData.ip = window.location.hostname || ""
    this.__getmodule();
  },
  methods: {
    handleNext() {
      this.$refs.step_server_form.validate(valid => {
        if (valid) {
          let portArr = [];
          this.moduleList.forEach(item => {
            let map = JSON.parse(JSON.stringify(item));
            // map.port = parseInt(this.formData[item.port]);
            map.backend_ip = this.formData[item.backend_ip];
            portArr.push(map);
          });
          let data = {};
          data.port = JSON.stringify(portArr);
          data.ip = this.formData.ip;
          this.__addproxyip(data);
        } else {
          return false;
        }
      });
    },
    handlePrev() {
      this.$emit("update:activeStep", this.activeStep - 1);
    },
    __addproxyip(param) {
      addproxyip(param)
        .then(res => {
          this.$emit("update:activeStep", this.activeStep + 1);
        })
        .catch(err => {});
    },
    __getmodule(param) {
      getmodule(param)
        .then(res => {
          if (res.mode == 1) {
            return;
          }
          // var validatePort = (rule, value, callback) => {
          //   let isTest =
          //     !isNaN(value) && parseInt(value) > 0 && parseInt(value) < 65536;
          //   if (!isTest) {
          //     return callback(new Error("端口号格式错误"));
          //   } else {
          //     return callback();
          //   }
          // };
          var validateIP = (rule, value, callback) => {
            let isTest = true;
            if (value) {
              let newArr = value.toString().split(",");
              for (let item of newArr) {
                isTest = this.$validates.ipReg.test(item);
                if (!isTest) {
                  break;
                }
              }
            }
            if (!isTest) {
              return callback(new Error("IP地址格式错误"));
            } else {
              return callback();
            }
          };
          // let portRule = [
          //   { required: true, message: "端口号不能为空", trigger: "blur" },
          //   { validator: validatePort, trigger: "blur" }
          // ];
          let ipRule = [
            { required: true, message: "后端IP不能为空", trigger: "blur" },
            { validator: validateIP, trigger: "blur" }
          ];
          for (let item of res.data) {
            // let strPort = `${item.type}_AND_port`;
            let strBackIp = `${item.type}_AND_backend_ip`;
            // item.port = strPort;
            item.backend_ip = strBackIp;
            // this.$set(this.formData, strPort, "");
            this.$set(this.formData, strBackIp, "");
            this.$set(this.rules, strBackIp, ipRule);
            // this.$set(this.rules, strPort, portRule);
          }
          this.moduleList = res.data;
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less" scoped>
.four_step {
  .four_step_notice {
    margin: 20px;
    width: 166px;
    color: #353535;
    padding-left: 5px;
  }
  .demo-ruleForm {
    margin: 20px 0 40px;
  }
}
</style>
