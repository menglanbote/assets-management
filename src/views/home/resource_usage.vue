<template>
  <div class="home_resource_usage">
    <el-card class="grid-content bg-purple">
      <div slot="header" class="clearfix">
        <span>平台自身资源使用率</span>
      </div>
      <gauge-usage :gaugeData="gaugeData"></gauge-usage>
    </el-card>
  </div>
</template>
<script>
import gaugeUsage from "components/gauge_usage";
import { getConfigUnloading } from "req/api/serverconfig/configset";
export default {
  name: "assets_resource_usage",
  data() {
    return {
      gaugeData: [],
      cpu: {
        gauge_data: "0",
        gauge_id: "cpu_chart",
        gauge_name: "CPU使用率",
        layout: 8
      },
      memory: {
        gauge_data: "0",
        gauge_id: "memory_chart",
        gauge_name: "内存使用率",
        layout: 8
      },
      disk: {
        gauge_data: "0",
        gauge_id: "net_chart",
        gauge_name: "网络使用率",
        layout: 8
      },
      timer: null,
      isShow: false
    };
  },
  components: {
    gaugeUsage
  },
  created() {
    this.__getConfigUnloading({
      type: "serverRunningStatus"
    });
  },
  activated() {
    this.timer = setInterval(() => {
      this.__getConfigUnloading({
        type: "serverRunningStatus"
      });
    }, 15000);
  },
  deactivated() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    __getConfigUnloading(param) {
      getConfigUnloading(param)
        .then(res => {
          this.cpu.gauge_data = res.data.cpu
            ? res.data.cpu.used.toString()
            : "0";
          this.memory.gauge_data = res.data.memory
            ? res.data.memory.used.toString()
            : "0";
          this.disk.gauge_data = res.data.disk
            ? res.data.disk.used.toString()
            : "0";
          this.gaugeData = [];
          this.gaugeData.push(this.cpu);
          this.gaugeData.push(this.memory);
          this.gaugeData.push(this.disk);
        })
        .catch(err => {});
    }
  }
};
</script>
