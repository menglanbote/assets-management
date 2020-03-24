<template>
  <div class="unauthorized">
    <div class="unauthorized-wrap">
      <!-- <i class="iconfont icon-weishouquan"></i>
      <span class="unauthorized-title">该模块尚未激活</span> -->
      <div class="unauthorized-img">
        <img src="~assets/img/unauthorized.png" alt="" />
      </div>
      <p>{{ msg }}</p>
      <div class="customer-button-wrap">
        <el-button size="small" @click="cancel">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "unauthorized",
  data() {
    return {
      msg: "如需使用该模块,请对此模块进行授权！"
    };
  },
  props: {
    layerid: {
      type: String
    },
    setCnavPath: {
      type: Function
    }
  },
  methods: {
    cancel() {
      this.setCnavPath();
      this.$layer.close(this.layerid);
    }
  }
};
</script>
<style lang="less" scoped>
.unauthorized {
  position: relative;
  width: 100%;
  height: 100%;
  .unauthorized-wrap {
    height: 100%;
    padding: 10px;
    text-align:center;
    .unauthorized-img {
      img {
        width:112px;
      }
    }
    i {
      font-size: 38px;
      color: #f56c6c;
      vertical-align: top;
    }
    .unauthorized-title {
      font-size: 16px;
      color: #666;
      padding: 10px 5px;
    }
    p {
      padding: 10px;
      color: #ff243c;
      font-size: 16px;
    }
    .customer-button-wrap {
      position: absolute;
      bottom: 10px;
      right: 20px;
    }
  }
}
</style>
