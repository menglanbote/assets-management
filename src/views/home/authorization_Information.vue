<template>
  <div class="home_authorization_information">
    <el-card class="grid-content bg-purple">
      <div slot="header" class="clearfix">
        <span>授权信息</span>
      </div>
      <table class="authorization_information_table">
        <colgroup>
          <col width="100" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td>使用单位</td>
            <td>{{ unit_name }}</td>
          </tr>
          <tr>
            <td>产品版本</td>
            <td>{{ product_m_version }}</td>
          </tr>
          <tr>
            <td>授权时间</td>
            <td>{{ time }}</td>
          </tr>
          <tr>
            <td>获取授权</td>
            <td v-if="status != 1">
              <mu-container class="button-wrapper">
                <mu-button color="secondary" @click="downloadKeys"
                  >生成主机码</mu-button
                >
                <mu-button color="primary" @click="activate"
                  >激活授权</mu-button
                >
              </mu-container>
            </td>
            <td v-else>
              <mu-container class="button-wrapper">
                <el-tag type="success" disable-transitions>已激活</el-tag>
               <div style="height:6px;"></div>
              </mu-container>
            </td>
          </tr>
        </tbody>
      </table>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { downloadInfo } from "req/api/download";

export default {
  name: "home_authorization_information",
  data() {
    return {
      unit_name: "",
      product_m_version: "",
      time: ""
    };
  },
  created() {
    this.setAuthInfomation();
  },
  computed: {
    ...mapGetters(["authorInfo"])
  },
  methods: {
    activate() {
      this.$router.push("/system/authorization");
    },
    downloadKeys() {
      this.__downloadInfo({
        module: 3
      });
    },
    setAuthInfomation() {
      let authorizationInfo = this.authorInfo;
      if (authorizationInfo) {
        authorizationInfo = JSON.parse(authorizationInfo);
        this.unit_name = authorizationInfo.unit_name;
        this.product_m_version = authorizationInfo.product_m_version;
        this.time = authorizationInfo.time;
        this.status = authorizationInfo.status;
      }
    },
    __downloadInfo(param) {
      downloadInfo(param)
        .then(res => {
          let url = `http://${res.data.ip}:${res.data.port}/${res.data.path}`;
          this.$tools.downLoad(url, "主机码文件.key");
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped lang="less">
.home_authorization_information {
  .authorization_information_table {
    width: 100%;
    color: #666;
    tr {
      td {
        border: 1px solid #e6e6e6;
        padding: 9px 15px;
        .button-wrapper {
          .mu-button {
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>
