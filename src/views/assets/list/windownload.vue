<template>
  <div class="assets-list-windownload">
    <mu-container>
      <mu-card-text>
        <div>点击下方【Windows通信插件】链接下载安装文件,
          <span class="colorNotice">安装时请暂时关闭安全软件,并在安装完成之后将本插件相关文件加入安全软件白名单</span> 
          。</div>
        <a :href="url" download="windows通信插件" class="list-windownload-button" ref="winDownload">
          <mu-icon size="40" value="cloud_download" color="blue"></mu-icon>
          <span>Windows通信插件</span>
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
        module:5
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
.assets-list-windownload {
  .mu-card-text {
    color: #666;
    .list-windownload-button {
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

