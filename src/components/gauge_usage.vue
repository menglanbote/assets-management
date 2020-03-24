<template>
  <div class="gauge_usage">
    <el-row :gutter="10">
      <el-col :md="item.layout"  v-for="(item,index) of list" :key="index">
        <div class="gauge-usage-item">
          <chart-gauge
            :gauge_name="item.gauge_name"
            :gauge_data="item.gauge_data"
            :gauge_id="item.gauge_id"
          ></chart-gauge>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import chartGauge from "components/chart_gauge";
export default {
  name: "gauge_usage",
  data() {
    return {
      list:[]
    }
  },
  props: {
      gaugeData: {
          type: Array,
          default: () => {
              return []
          }
      }
  },
  watch: {
    gaugeData(val,oldval) {
      this.list = val
    }
  },
  components: {
    chartGauge
  }
};
</script>
<style  lang="less">
.gauge_usage {
  .gauge-usage-item {
    text-align: center;
    color: #666;
    .gauge-usage-item-chart {
      width: 100%;
      height: 153px;
      background: #f8f8f8;
    }
  }
}
</style>


