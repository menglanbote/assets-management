<template>
  <div class="wh footerWrap install_footer">
    <div class="wh2 ma footer">
      <p>{{dateTime}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "install_footer",
  data() {
      return {
          dateTime:""
      }
  },
  created () {
    this.setDateTime()  
  },
  methods: {
    setDateTime() {
      setInterval(() => {
        var date = new Date();
        this.dateTime = date.format("yyyy年MM月dd日 HH:mm:ss");
      }, 1000);
    }
  }
};
</script>
<style scoped>
.footerWrap {
	border-top:1px solid  #ECF0F1;
}
.footer p {
	text-align:center;
	line-height: 40px;
}
.shadow {
	display:none;
}
</style>
