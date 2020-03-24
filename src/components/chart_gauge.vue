<template>
  <div class="chart-gauge">
    <div class="chart-gauge-wrap" :id="id_name"></div>
    <cite>{{this.gauge_name}}</cite>
  </div>
</template>
<script>
export default {
  name: "chart_gauge",
  data() {
    return {
      msg: "chart_gauge",
      id_name:this.gauge_id,
      myChart:null,
      options: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {}
        },
        series: [
          {
            name: this.gauge_name,
            type: "gauge",
            radius: "90%",
            axisLine: {
              lineStyle: {
                width: 8
              }
            },
            pointer: {
              length: "50%",
              width: 3
            },
            axisTick: {
              length: 3
            },
            splitLine: {
              length: 5
            },
            detail: {
              textStyle: {
                fontSize: 12,
                offsetCenter: [0, "80%"]
              },
              formatter: "{value}%"
            },
            data: [{ value: this.gauge_data }]
          }
        ]
      }
    };
  },
  props: {
    gauge_data: {
      type: String,
      default: '0'
    },
    gauge_name: {
      type: String,
      default: "仪表盘"
    },
    gauge_id: {
        type:String,
        default:'gauge'
    }
  },
  watch: {
    gauge_data() {
      this.options.series[0].data[0].value = this.gauge_data
      this.myChart.setOption(this.options, true);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let oGauge = document.querySelector(`#${this.id_name}`);
      // let myChart = this.$echarts.init(oGauge);
      this.myChart = this.$echarts.init(oGauge);
      this.myChart.setOption(this.options, true);
    }
  }
};
</script>
<style scoped lang="less">
.chart-gauge {
  text-align: center;
  color: #666;
  .chart-gauge-wrap {
    width: 100%;
    height: 153px;
    margin-bottom:5px;
    background: #f8f8f8;
  }
}
</style>


