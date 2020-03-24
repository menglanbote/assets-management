<template>
  <div class="pie_browse">
    <el-row :gutter="10">
      <el-col :md="item.layout" v-for="(item,index) of pieData" :key="index">
        <div class="pie-browse-item">
          <chart-pie
            :pie_name="item.pie_name"
            :pie_data="item.pie_data"
            :pie_id="item.pie_id"
            :pie_title="item.pie_title"
            :pie_legend_data="item.pie_legend_data"
          ></chart-pie>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import chartPie from "components/chart_pie";
import { echartDataDetail } from "req/api/home";
export default {
  name: "pie_browse",
  data() {
    return {
      pieData: []
    };
  },
  created() {
    this.__echartDataDetail();
  },
  components: {
    chartPie
  },
  methods: {
    __echartDataDetail() {
      echartDataDetail()
        .then(res => {
          let tag = {
            pie_data: [],
            pie_id: "cpu_chart_1",
            pie_name: "资产类型占比",
            layout: 12,
            pie_title: "资产类型占比",
            pie_legend_data: []
          };
          let os = {
            pie_data: [],
            pie_id: "memory_chart_2",
            pie_name: "操作类型占比",
            layout: 12,
            pie_title: "操作类型占比",
            pie_legend_data: []
          };

          let data = res.data;
          let pieArr = []
          tag.pie_data = data.tag;
          for (let item of data.tag) {
            tag.pie_legend_data.push(item.name);
          }
          pieArr.push(tag)
          os.pie_data = data.os;
          for (let item of data.os) {
            os.pie_legend_data.push(item.name);
          }
          pieArr.push(os)

          this.pieData = pieArr
        })
        .catch(err => {});
    }
  }
};
</script>
<style  lang="less">
.pie_browse {
  .pie-browse-item {
    text-align: center;
    color: #666;
    .pie-browse-item-chart {
      width: 100%;
      height: 153px;
      background: #f8f8f8;
    }
    .chart-pie {
      .chart-pie-wrap {
        background:#fff;
      }
    }
  }
}
</style>


