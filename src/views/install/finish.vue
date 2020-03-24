<template>
  <div class="finish">
    <div class="finish-tip" v-html="msg"></div>
    <div>
      <mu-button
        flat
        class="demo-step-button"
        :disabled="activeStep === 0 || activeStep === 4"
        @click="handlePrev"
      >
        上一步
      </mu-button>
      <mu-button class="demo-step-button" color="primary" @click="handleNext">
        完成
      </mu-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "finish",
  data() {
      return {
          msg:`恭喜你，安装完成。<br>请点击完成按钮，跳转到登录页面。`
      }
  },
  props: {
    activeStep: Number
  },
  methods: {
    handleNext() {
      this.$router.replace('/login')
    },
    handlePrev() {
      this.$emit("update:activeStep", this.activeStep - 1);
    }
  }
};
</script>
<style lang="less" scoped>
.finish {
    .finish-tip {
        padding:20px 0 40px 20px;
        font-size:18px;
        color:#2196f3;
        font-weight:bold;
    }
}
</style>
