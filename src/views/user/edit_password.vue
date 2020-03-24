<template>
  <div class="system-usermanagement-edit_password">
    <mu-form
      :model="formData"
      class="mu-demo-form"
      :label-position="labelPosition"
      label-width="100"
      ref="system_usermanagement_edit_password"
    >
      <mu-form-item prop="oldPassword" label="当前密码" :rules="oldPasswordRules">
        <mu-text-field :action-icon="visibility1 ? 'visibility_off' : 'visibility'" :action-click="() => (visibility1 = !visibility1)" :type="visibility1 ? 'text' : 'password'" v-model="formData.oldPassword" :max-length="50"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="password" label="新密码" :rules="passwordRules">
        <mu-text-field :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'" v-model="formData.password" :max-length="50"></mu-text-field>
      </mu-form-item>
      <!-- <mu-form-item prop="repassword" label="确认密码" :rules="repasswordRules">
        <mu-text-field type="password" v-model="formData.repassword" :max-length="50"></mu-text-field>
      </mu-form-item> -->
      <div class="form-beizhu">备注：密码至少包含大小写字母、数字、特殊字符(~!@#$%^&*()_-+,.)中的三种,且长度为8-24位</div>
      <mu-form-item>
        <mu-button color="primary" small @click="submitEdit">修改</mu-button>
        <mu-button @click="cancel" small>取消</mu-button>
      </mu-form-item>
    </mu-form>
  </div>
</template>
<script>
// import { editUserPassword } from "req/api/system/usermanagement.js";
export default {
  name: "system_usermanagement_edit_password",
  data() {
    return {
      visibility: false,
      visibility1:false,
      labelPosition: "right",
      oldPasswordRules: [
        { validate: val => !!val, message: "当前密码不能为空" }
      ],
      repasswordRules: [
        { validate: val => !!val, message: "确认密码不能为空" },
        {
          validate: val => {
            return val === this.formData.password;
          },
          message: "两次密码不一致"
        }
      ],
      passwordRules: [
        { validate: val => !!val, message: "密码不能为空" },
        {
          validate: val => this.$validates.passwordReg.test(val),
          message:
            "密码格式不正确"
        }
      ],
      formData: {
        oldPassword: "",
        password: "",
        // repassword: ""
      }
    };
  },
  props: {
    layerid: {
      type: String
    }
  },
  methods: {
    submitEdit() {
      this.$refs.system_usermanagement_edit_password.validate().then(result => {
        if (result) {
          this.$isShowTip(
            "system",
            "system_usermanagement",
            "确定修改吗?",
            () => {
              let data = JSON.parse(JSON.stringify(this.formData));
              data.oldPassword = this.$md5(this.formData.oldPassword);
              data.password = this.$md5(this.formData.password);
              // data.repassword = this.$md5(this.formData.repassword);
              this.__editUserPassword(data);
            },
            this
          );
        }
      });
    },
    cancel() {
      this.$isShowTip(
        "system",
        "system_usermanagement",
        "确定取消吗？",
        () => {
          this.$layer.close(this.layerid);
        },
        this
      );
    },
    __editUserPassword(param) {
      editUserPassword(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.$layer.close(this.layerid);
          this.$parent.$refs.system_usermanagement_table.reload();
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.system-usermanagement-edit_password {
  width: 100%;
  padding: 10px 20px 0 0;
}
</style>


