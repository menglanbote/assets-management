<template>
  <div class="install_wrap">
    <install-head></install-head>
    <el-card class="box-card wh2 install-step-container">
      <mu-stepper :active-step="activeStep">
        <mu-step><mu-step-label>协议查看</mu-step-label></mu-step>
        <mu-step><mu-step-label>产品授权</mu-step-label></mu-step>
        <mu-step><mu-step-label>出口配置</mu-step-label></mu-step>
        <mu-step><mu-step-label>添加系统管理员</mu-step-label></mu-step>
        <mu-step><mu-step-label>完成</mu-step-label></mu-step>
      </mu-stepper>
      <div class="demo-step-content">
       
        <template v-if="!finished">
          <keep-alive>
            <component
              v-bind:is="content"
              v-bind:activeStep.sync="activeStep"
            ></component>
          </keep-alive>
        </template>
      </div>
    </el-card>
    <install-footer></install-footer>
  </div>
</template>
<script>
import installHead from "./install_head";
import firtStep from "./firt_step";
import twoStep from "./two_step";
import threeStep from "./three_step";
import fourStep from "./four_step";
import fiveStep from "./five_step";
import finish from "./finish";
import installFooter from "./install_footer";
export default {
  name: "install",
  data() {
    return {
      activeStep: 0
    };
  },
  components: {
    installHead,
    installFooter,
    firtStep,
    twoStep,
    threeStep,
    fourStep,
    fiveStep,
    finish
  },
  computed: {
    content() {
      let message = firtStep;
      switch (this.activeStep) {
        case 0:
          message = firtStep;
          break;
        case 1:
          message = twoStep;
          break;
        case 2:
          message = fourStep;
          break;
        case 3:
          message = fiveStep;
          break;
        case 4:
          message = finish;
          break;
        default:
          message = "fuck! 又 TM 出错了！！！";
          break;
      }
      return message;
    },
    finished() {
      return this.activeStep > 4;
    }
  }
};
</script>
<style lang="less" scoped>
.install-step-container {
  padding: 30px;
  margin: 30px auto;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
}
</style>
