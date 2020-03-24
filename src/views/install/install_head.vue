<template>
    <div class="wh headerWrap install_head">
      <div class="wh2 ma header">
        <div class="header-title">系统安装向导</div>
        <div class="header-version"></div>
      </div>
    </div>
</template>
<script>
export default {
  name: "install_head"
};
</script>
<style scoped>
.headerWrap {
	border-bottom:1px solid  #a3c1d8;
	background: #1E9FFF;
}
.header {
	height:100px;
	overflow:hidden;
	display:flex;
	display:-webkit-flex;
	flex-direction:row;
	justify-content:space-between;
}
.header-title {
	width:100%;
	padding-top:36px;
	font-size:36px;
	color:#fff;
	text-align:center;
}
.header-version {
	padding-top:64px;
}
</style>
