<template>
  <div class="assets-list-linuxload">
    <mu-container>
      <mu-card-text>
        <el-divider content-position="left">方式一</el-divider>
        <div class="list-linuxload-text-wrap">
          <h3 class="list-linuxload-title">1.下载:</h3>
          <p>wget http://{{ip}}:{{port}}/static/InstallPackage/linux/Install.sh</p>
        </div>
        <div class="list-linuxload-text-wrap">
          <h3 class="list-linuxload-title">2.安装:</h3>
          <p>
            chmod +x Install.sh
            <br>
            ./Install.sh -s {{ip}}
          </p>
        </div>
      </mu-card-text>
      <mu-card-text>
        <el-divider content-position="left">方式二</el-divider>
        <p>点击下方【Linux通信插件】链接下载安装文件，将下载的安装文件上传到被管理的Linux主机上，<span class="colorNotice">并以root权限进行安装</span>。</p>
        <a :href="url" class="list-linuxload-button" download="Linux通信插件" ref="linuxload">
          <mu-icon size="40" value="cloud_download" color="blue"></mu-icon>
          <span>Linux通信插件</span>
        </a>
      </mu-card-text>
    </mu-container>
  </div>
</template>
<script>
import {downloadInfo} from 'req/api/download'

export default {
  data() {
    return {
      url:"#",
      ip:"",
      port:""
    };
  },
  props: {
    layerid: {
      type: String
    }
  },
  created() {
    this.__downloadInfo({
        module:4
      })
  },
  methods: {
    __downloadInfo(param) {
      downloadInfo(param).then(res => {
        this.ip = res.data.ip
        this.port = res.data.port
        this.url = `http://${this.ip}:${this.port}/${res.data.path}`
      }).catch(err => {})
    }
  }
};
</script>
<style scoped lang="less">
.assets-list-linuxload {
  .mu-card-text {
    color: #666;
    .list-linuxload-text-wrap {
      .list-linuxload-title {
        margin:10px 0;
      }
      p {
        background:beige;
        color:#648e2e;
        padding:5px;
        line-height: 2;
      }
    }
    .list-linuxload-button {
      display:inline-block;
      width: 100%;
      height: 40px;
      margin-top: 20px;
      overflow: hidden;
      i {
        vertical-align: top;
      }
      span {
        font-size: 20px;
        color: #649fe6;
        line-height: 46px;
      }
    }
  }
}
</style>>

