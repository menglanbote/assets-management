<template>
  <div class="error404">
    <div class="error404-wrap">
      <i class="iconfont icon-shangxin"></i>
      <p>
        {{msg}}
        <span>4</span>
        <span class="error404-anim-rotate">0</span>
        <span>4</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "error404",
  data() {
    return {
      msg: "糟糕,页面找不到了!"
    };
  }
};
</script>
<style lang="less" scoped>
.error404 {
  position: relative;
  height: 100%;
  .error404-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 30px;
    margin: auto;
    text-align: center;
    width: 700px;
    height: min-content;
    i {
      font-size: 250px;
      color: #393d49;
    }
    p {
      padding: 20px;
      border-top: 5px solid #009688;
      color: #009688;
      font-size: 40px;
      .error404-anim-rotate {
        display:inline-block;
        @keyframes rotateMove {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        };
        animation: rotateMove 1s linear infinite;
      }
    }
  }
}
</style>

