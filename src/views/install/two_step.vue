<template>
  <div class="two_step">
    <mu-flex align-items="center" style="padding: 20px 10px;">
      <span style="margin-right: 16px;">产品注册:</span>
      <mu-radio
        v-for="item in type"
        :key="item.id"
        v-model="formData.type"
        :value="item.id"
        :label="item.name"
        style="margin-right: 16px;"
      ></mu-radio>
    </mu-flex>
    <el-form
      v-if="formData.type == 1"
      :model="formData"
      :rules="rules"
      ref="step_authorization_form"
      label-width="70px"
      class="demo-ruleForm"
      :status-icon="true"
    >
      <!-- <el-form-item label="用户名" prop="usm">
        <el-input v-model="formData.usm" :maxLength="50"></el-input>
      </el-form-item> -->
      <el-form-item label="序列号" prop="key">
        <el-input v-model="formData.key" :maxLength="50"></el-input>
      </el-form-item>
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
    </el-form>

    <div v-if="formData.type == 2">
      <el-divider content-position="left">第一步:获取机器码</el-divider>
      <mu-button
        color="primary"
        class="demo-step-button"
        @click="downloadKeyBut"
        small
      >
        获取机器码
      </mu-button>
      <el-divider content-position="left">第二步:产品注册(离线)</el-divider>
      <div class="step2-offline-wrap">
        <input
          type="file"
          ref="upload"
          accept=".key"
          class="offline-input"
          @change="fileChange"
        />
        <mu-button small color="primary" @click="selectFile"
          >选取文件</mu-button
        >
        <mu-button
          style="margin-left: 10px;"
          small
          color="success"
          v-show="fileList.length > 0 && !fileSizeExceed"
          @click="submitUpload"
          >上传到服务器</mu-button
        >
        <div
          class="selectFileSuccess"
          v-show="fileList.length > 0 && !fileSizeExceed"
        >
          <i class="el-icon-document"></i>
          {{ fileName }}
          <i class="el-icon-check icon-success-style"></i>
        </div>
        <div class="selectFileError" v-if="fileSizeExceed">
          <i class="el-icon-info icon-error-style"></i>上传文件不能大于512M
        </div>
      </div>
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
          {{ activeStep === 4 ? "完成" : "下一步" }}
        </mu-button>
      </div>
    </div>
  </div>
</template>
<script>
import { offlineAuthor, onlineAuthor, downloadKey } from "req/api/install";
export default {
  name: "two_step",
  data() {
    return {
      labelPosition: "right",
      authorStatus: false,
      type: [
        {
          id: 1,
          name: "在线注册"
        },
        {
          id: 2,
          name: "离线注册"
        }
      ],
      rules: {
        // usm: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        key: [{ required: true, message: "序列号不能为空", trigger: "blur" }]
      },
      formData: {
        // usm: "",
        key: "",
        type: 1
      },
      fileList: [],
      fileName: "",
      fileSize: "",
      fileSizeExceed: false
    };
  },
  props: {
    activeStep: Number
  },
  methods: {
    handleNext() {
      if (this.formData.type == 2) {
        if (!this.authorStatus) {
          this.$message({
            type: "error",
            message: "请上传产品注册文件!"
          });
          return;
        } else {
          this.$emit("update:activeStep", this.activeStep + 1);
          return;
        }
      } else {
        this.$refs.step_authorization_form.validate(valid => {
          if (valid) {
            this.__onlineAuthor(this.formData)
          } else {
            return false;
          }
        });
      }
    },
    handlePrev() {
      this.$emit("update:activeStep", this.activeStep - 1);
    },
    downloadKeyBut() {
      this.__downloadKey()
    },
    selectFile() {
      this.$refs.upload.click();
    },
    fileChange() {
      let files = this.$refs.upload.files;
      this.fileSize = files[0].size;
      this.fileSizeExceed = this.fileSize > 1024 * 1024 * 512 ? true : false;
      this.fileList = files;
      this.fileName = files[0].name;
    },
    submitUpload() {
      let formData = new FormData();
      formData.append("file", this.fileList[0]);
      let now_time = new Date().getTime() / 1000 | 0
      formData.append("now_time",now_time );
      this.__offlineAuthor(formData);
    },
    __offlineAuthor(param) {
      offlineAuthor(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "上传成功"
          });
          this.authorStatus = true;
        })
        .catch(err => {});
    },
    __onlineAuthor(param) {
      onlineAuthor(param).then(res => {
        this.$emit("update:activeStep", this.activeStep + 1);
      }).catch(err => {})
    },
    __downloadKey(param) {
      downloadKey(param).then(res => {
        let url = `http://${res.data.ip}:${res.data.port}//${res.data.path}`
        this.$tools.downLoad(url,"机器码")
      }).catch(err => {})
    }
  }
};
</script>
<style lang="less" scoped>
.tipPadding() {
  padding: 10px 0 0 0;
}
.two_step {
  .demo-ruleForm {
    width: 400px;
    .mu-raised-button.mu-button-small {
      margin:20px 0;
    }
  }
}
.step2-offline-wrap {
  width: 50%;
  min-width: 500px;
  margin-bottom: 20px;
  .offline-input {
    display: none;
  }
  .selectFileSuccess {
    .tipPadding();
    color: #666;
  }
  .selectFileError {
    .tipPadding();
    color: red;
  }
}
</style>
