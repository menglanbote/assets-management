<template>
  <div class="chart-line">
    <div class="chart-line-wrap" :id="id_name"></div>
  </div>
</template>
<script>
import tools from "common/tools/index.js";
export default {
  name: "chartline",
  data() {
    return {
      id_name: this.line_id,
      options: {
        backgroundColor:'#fff',
        title: {
          text: this.line_title
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          formatter: function(d, e, f, g) {
            var s = d[0].value;
            if (s == "" || typeof s == "undefined") {
              s = 0;
            }
            return tools.formatDataNumber(s, 1) + "次";
          }
        },
        legend: {
          show: this.line_legend_show,
          data: this.line_legend_data
        },
        toolbox: {
          feature: {}
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.line_xAxis_data
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: function(d, e, f, g) {
                return tools.formatDataNumber(d);
              }
            }
          }
        ],
        series: this.line_series
      }
    };
  },
  props: {
    line_legend_data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    line_legend_show: {
      type: Boolean,
      default: true
    },
    line_title: {
      type: String,
      default: ""
    },
    line_id: {
      type: String,
      default: "line"
    },
    line_xAxis_data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    line_series: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let oline = document.querySelector(`#${this.id_name}`);
      let myChart = this.$echarts.init(oline);
      myChart.setOption(this.options, true);
    }
  }
};
</script>
<style scoped lang="less">
.chart-line {
  text-align: center;
  color: #666;
  .chart-line-wrap {
    width: 100%;
    height: 420px;
    margin-bottom: 5px;
    background: #f8f8f8;
  }
}
</style>


