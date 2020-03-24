<template>
  <div class="chart-pie">
    <div class="chart-pie-wrap" :id="id_name"></div>
  </div>
</template>
<script>
export default {
  name: "chartPie",
  data() {
    return {
      id_name: this.pie_id,
      options: {
        backgroundColor:'#fff',
        title: {
          text: this.pie_title,
          subtext: this.pie_subtext,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.pie_legend_data
        },
        series: [
          {
            name: this.pie_name,
            type: "pie",
            radius: "70%",
            center: ["50%", "55%"],
            data: this.pie_data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  props: {
    pie_data: {
      type: Array,
      default: () => {
          return []
      }
    },
    pie_legend_data: {
        type: Array,
        default: () => {
            return []
        }
    },
    pie_subtext: {
        type: String,
        default: ""
    },
    pie_title: {
        type: String,
        default: ""
    },
    pie_name: {
      type: String,
      default: ""
    },
    pie_id: {
      type: String,
      default: "pie"
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let opie = document.querySelector(`#${this.id_name}`);
      let myChart = this.$echarts.init(opie);
      myChart.setOption(this.options, true);
    }
  }
};
</script>
<style scoped lang="less">
.chart-pie {
  text-align: center;
  color: #666;
  .chart-pie-wrap {
    width: 100%;
    height: 420px;
    margin-bottom: 5px;
    background: #f8f8f8;
  }
}
</style>


