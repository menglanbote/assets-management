<template>
  <div class="assets-facilitator-history">
    <g-el-table
      :tableHeadShow="tableHeadShow"
      :url="url"
      :type="type"
      :cloumns="cloumns"
      :params="params"
      :pageParams="pageParams"
      ref="assets_facilitator_history_table"
    ></g-el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: "/service/servicehistory",
      type: "get",
      cloumns: [
        {
          type: "index",
          fixed: "left",
          label: "序号",
          width: "60px",
          indexMethod: function(index) {
            return index + 1;
          }
        },
        {
          label: "服务内容",
          sortable: true,
          prop: "content"
        },
        {
          label: "开始时间",
          sortable: true,
          prop: "start_time"
        },
        {
          label: "终止时间",
          prop: "end_time",
          sortable: true
        },
        {
          label: "操作时间",
          prop: "option_time",
          sortable: true
        }
      ],
      tableHeadShow: false,
      params: {
        page: 1,
        limit: 10,
        service_id: this.history_id
      },
      pageParams: {
        layout: "total, sizes, prev, pager, next, jumper",
        pageAlign: "left",
        pageSizes: [10, 20, 30]
      }
    };
  },
  props: {
    history_id: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="less">
.assets-facilitator-history {
    width: 100%;
    margin: 10px;
    border: 1px solid #ebeef5;
}
</style>