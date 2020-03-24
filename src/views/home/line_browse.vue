<template>
  <div class="line_browse">
    <el-row :gutter="10">
      <el-col :md="item.layout" v-for="(item,index) of lineData" :key="index">
        <div class="line-browse-item">
          <chart-line
            :line_series="item.line_series"
            :line_id="item.line_id"
            :line_title="item.line_title"
            :line_legend_data="item.line_legend_data"
            :line_legend_show="item.line_legend_show"
            :line_xAxis_data="item.line_xAxis_data"
          ></chart-line>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import chartLine from "components/chart_line";
import { echartDataDetail } from "req/api/home";
export default {
  name: "line_browse",
  data() {
    return {
      lineData: [],
      topDetail: {
        line_id: "line_chart_2",
        layout: 24,
        // line_title: "netfilter端口访问月汇总",
        line_title: "",
        line_xAxis_data: [],
        line_legend_show: false,
        line_series: [
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: []
          }
        ]
      }
    };
  },
  components: {
    chartLine
  },
  created() {
    this.__echartDataDetail();
  },
  methods: {
    __echartDataDetail() {
      echartDataDetail()
        .then(res => {
          let line = res.data.top.port;
          let line_xAxis_data = [];
          let line_data = [];
          for (let item of line) {
            line_xAxis_data.push(item.ym);
            line_data.push(parseInt(item.number));
          }
          this.topDetail.line_xAxis_data = line_xAxis_data;
          this.topDetail.line_series[0].data = line_data;
          this.lineData.push(this.topDetail);
        })
        .catch(err => {});
    }
  }
};
</script>
<style  lang="less">
.line_browse {
  width:98%;
  .line-browse-item {
    text-align: center;
    color: #666;
    .line-browse-item-chart {
      width: 100%;
      height: 153px;
      background: #f8f8f8;
    }
  }
}
</style>


