<template>
  <div class="asstes-list-host-detail">
    <div class="list-host-detail-usage">
      <gauge-usage v-if="isShow" :gaugeData="gaugeData"></gauge-usage>
    </div>
    <div v-if="layer_data.online == 0" class="colorNotice">主机已离线，无法获取该资产硬件使用情况。</div>
    <el-divider></el-divider>
    <div class="list-host-detail-wrap">
      <ul class="host-detail-item-wrap clr">
        <li
          v-for="(item, key) of detailData"
          class="host-detail-item"
          :key="key"
        >
          <h3>{{ item.name }}</h3>
          <p>
            <el-popover trigger="hover" placement="top">
              <p>
                <span style="color: #79a5d2;">{{ item.name }}：</span>
                {{ item.value }}
              </p>
              <div slot="reference" class="name-wrapper">
                <span :class="{ open_port_name_wrapper: key == 'open_port' }">{{
                  item.value
                }}</span>
                <span
                  v-if="key == 'open_port'"
                  @click="openPortDetail"
                  class="port_open_detail"
                  >详情</span
                >
              </div>
            </el-popover>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { hostDetail, hardwareUsed } from "req/api/assets/list";
import gaugeUsage from "components/gauge_usage";
import openPortInformation from "./open_port_information";

export default {
  data() {
    return {
      isShow: false,
      timer: null,
      detailData: {
        ip: {
          name: "IP地址",
          value: ""
        },
        software: {
          name: "所属业务系统",
          value: ""
        },
        disk: {
          name: "磁盘空间",
          value: ""
        },
        system_name: {
          name: "操作系统类别",
          value: ""
        },
        open_port: {
          name: "系统开放端口",
          value: ""
        },
        runing_module: {
          name: "接受管理服务",
          value: ""
        },
        tag: {
          name: "资产功能",
          value: ""
        },
        alias: {
          name: "资产别名",
          value: ""
        },
        address: {
          name: "资产位置",
          value: ""
        },
        ministry: {
          name: "资产所属部门",
          value: ""
        },
        manager_name: {
          name: "资产安全责任人",
          value: ""
        },
        manager_phone: {
          name: "安全责任人联系方式",
          value: ""
        },
        develop_provider_name: {
          name: "系统开放商",
          value: ""
        },
        maintain_provider_name: {
          name: "运行维护商",
          value: ""
        },
        memory: {
          name: "内存",
          value: ""
        },
        cpu: {
          name: "CPU",
          value: ""
        },
        dns: {
          name: "DNS地址",
          value: ""
        },
        gateway: {
          name: "默认网关",
          value: ""
        }
      },
      cpu: {
        gauge_data: "0",
        gauge_id: "hostdetail_cpu_chart",
        gauge_name: "CPU使用率",
        layout: 8
      },
      memory: {
        gauge_data: "0",
        gauge_id: "hostdetail_memory_chart",
        gauge_name: "内存使用率",
        layout: 8
      },
      disk: {
        gauge_data: "0",
        gauge_id: "hostdetail_net_chart",
        gauge_name: "磁盘使用率",
        layout: 8
      },
      gaugeData: []
    };
  },
  components: {
    gaugeUsage
  },
  props: {
    layer_data: {
      type: [Array, Object],
      default: () => {
        return {};
      }
    }
  },
  created() {
    this.setUnit();
    this.__hostDetail({
      id: this.layer_data.id
    });
    if (this.layer_data.online == 1) {
      this.timer = setInterval(() => {
        this.__hardwareUsed({
          id: this.layer_data.id
        });
      }, 15000);
    }
  },
  mounted() {
    this.isShow = true;
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    openPortDetail() {
      this.$layer.iframe({
        content: {
          content: openPortInformation,
          parent: this,
          data: {
            host_id: this.layer_data.id.toString()
          }
        },
        area: ["700px", "auto"],
        title: "系统开放端口详情",
        shadeClose: false
      });
    },
    addGaugeData(obj) {
      this.memory.gauge_data = obj.Memory ? obj.Memory.toString() : "0";
      this.cpu.gauge_data = obj.Cpu ? obj.Cpu.toString() : "0";
      this.disk.gauge_data = obj.Disk ? obj.Disk.toString() : "0";

      this.gaugeData = [];
      this.gaugeData.push(this.memory);
      this.gaugeData.push(this.cpu);
      this.gaugeData.push(this.disk);
    },
    __hardwareUsed(param) {
      hardwareUsed(param).then(res => {
        this.addGaugeData(res.data);
      });
    },
    __hostDetail(param) {
      hostDetail(param)
        .then(res => {
          let data = res.data;
          this.addGaugeData(data.hardware);
          Object.keys(data).forEach(key => {
            if (this.detailData[key]) {
              if (Array.isArray(data[key])) {
                let str = "";
                if (key == "tag" && data[key].length > 0) {
                  str = data[key].reduce((prev, cur, index, array) => {
                    return prev + "," + cur.name;
                  }, "");
                  str = str.substr(1);
                } else if (data[key].length > 0) {
                  str = data[key].reduce((prev, cur, index, array) => {
                    return prev + "," + cur;
                  });
                }
                this.detailData[key].value = str;
              } else {
                this.detailData[key].value = data[key];
              }
            }
          });
          this.detailData.manager_name.value = res.data.manager.name;

          this.detailData.manager_phone.value = res.data.manager.phone;

          this.detailData.develop_provider_name.value =
            res.data.develop_provider.name;

          this.detailData.maintain_provider_name.value =
            res.data.maintain_provider.name;

          this.detailData.memory.value = res.data.hardware.MemorySize
            ? this.setUnit(res.data.hardware.MemorySize)
            : "";

          this.detailData.ministry.value = res.data.ministry.name;

          this.detailData.address.value = res.data.address.name;

          this.detailData.software.value = res.data.software.name;

          this.detailData.cpu.value = res.data.hardware.CpuId
            ? res.data.hardware.CpuId
            : "";

          this.detailData.disk.value = res.data.hardware.DiskSize
            ? this.setUnit(res.data.hardware.DiskSize)
            : "";
        })
        .catch(err => {});
    },
    setUnit(val) {
      if (isNaN(val)) {
        return 0;
      }
      let count = 0;
      let unit = ["B", "KB", "M", "G"];
      while (val > 1024 && count < 4) {
        val = val / 1024;
        count++;
      }
      let str = `${val.toFixed(2)}${unit[count]}`;
      return str;
    }
  }
};
</script>
<style scoped lang="less">
.asstes-list-host-detail {
  width: 100%;
  padding: 20px;
  .host-detail-item-wrap {
    width: 100%;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    .host-detail-item {
      width: 50%;
      float: left;
      line-height: 30px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      display: flex;
      h3 {
        width: 150px;
        padding: 0 10px;
        border-right: 1px solid #ccc;
      }
      p {
        flex: 1;
        padding: 0 10px;
        height: 30px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .name-wrapper.el-popover__reference {
          display: flex;
          span {
            display: block;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .open_port_name_wrapper {
            width: 225px;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .port_open_detail {
            color: #5ca7f5;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
