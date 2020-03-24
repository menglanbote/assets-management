<template>
  <div>
    <el-button type="primary" @click="submitForm('login_Form')"
      >dianji</el-button
    >
  </div>
</template>

<script>
import testBut from './testBut'
export default {
    name:"",
    data() {
return {}
    },
  methods: {
    submitForm() {
      this.$layer.iframe({
        content: {
          content: testBut, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        shadeClose: true,
        area: ["800px", "600px"],
        title: "title",
        cancel: () => {
          //关闭事件
          alert("关闭iframe");
        }
      });
    }
  }
};
</script>

<style></style>
