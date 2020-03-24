<template>
  <div class="assets-list-add" style="width: 100%;padding: 8px;">
    <div class="demo-step-container">
      <!-- 步骤条 -->
      <mu-stepper :active-step="activeStep">
        <mu-step>
          <mu-step-label>选择通信模式</mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>添加资产内容</mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>完成</mu-step-label>
        </mu-step>
      </mu-stepper>
      <div class="demo-step-content" v-if="!finished">
        <div class="demo-text" v-if="activeStep === 0">
          <!-- 步骤1 开始-->
          <mu-form
            :model="formData"
            class="mu-demo-form"
            :label-position="labelPosition"
            label-width="90"
            ref="assets_list_add1"
          >
            <mu-form-item prop="type" label="通信模式" :rules="typeRules">
              <mu-select v-model="formData.type">
                <mu-option
                  v-for="item in dropDownData.type"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></mu-option>
              </mu-select>
            </mu-form-item>
            <mu-form-item prop="ip" label="IP地址" :rules="ipRules">
              <mu-text-field
                v-model="formData.ip"
                :max-length="50"
              ></mu-text-field>
            </mu-form-item>
            <template v-if="formData.type == '2'">
              <mu-form-item prop="port" label="SSH端口" :rules="portRules">
                <mu-text-field
                  v-model="formData.port"
                  :max-length="50"
                ></mu-text-field>
              </mu-form-item>
              <div class="colorNotice">警告：请使用具备root权限的SSH用户名</div>
              <mu-form-item prop="user" label="SSH用户名" :rules="userRules">
                <mu-text-field
                  v-model="formData.user"
                  :max-length="50"
                ></mu-text-field>
              </mu-form-item>
              <mu-form-item prop="pwd" label="SSH密码" :rules="pwdRules">
                <mu-text-field
                  :action-icon="visibility ? 'visibility_off' : 'visibility'"
                  :action-click="() => (visibility = !visibility)"
                  :type="visibility ? 'text' : 'password'"
                  v-model="formData.pwd"
                  :max-length="50"
                ></mu-text-field>
              </mu-form-item>
            </template>
          </mu-form>
          <!-- 步骤1 结束-->
        </div>
        <div class="demo-text" v-if="activeStep === 1">
          <!-- 步骤2 开始-->
          <mu-form
            :model="formData"
            class="mu-demo-form"
            :label-position="labelPosition"
            label-width="110"
            ref="assets_list_add2"
          >
            <div class="form-item-inline">
              <mu-form-item prop="name" label="资产名称" :rules="nameRules">
                <mu-text-field
                  v-model="formData.name"
                  :max-length="50"
                ></mu-text-field>
              </mu-form-item>
              <mu-form-item
                prop="software_id"
                label="业务系统类别"
                :rules="software_idRules"
              >
                <mu-select v-model="formData.software_id">
                  <mu-option
                    v-for="item in dropDownData.software_id"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></mu-option>
                </mu-select>
              </mu-form-item>
            </div>
            <mu-form-item prop="tag" label="功能类别" :rules="tagRules">
              <mu-checkbox
                v-model="formData.tag"
                v-for="item of dropDownData.tag"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></mu-checkbox>
            </mu-form-item>
            <div class="form-item-inline">
              <mu-form-item prop="ministry_id" label="所属部门">
                <mumanager-tree
                  :ministry="formData.ministry"
                  :ministry_id="formData.ministry_id.toString()"
                  @selectTreeChange="selectTreeChange"
                ></mumanager-tree>
              </mu-form-item>
              <mu-form-item prop="manager_id" label="安全责任人">
                <mu-select v-model="formData.manager_id">
                  <mu-option
                    v-for="item in dropDownData.manager_id"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></mu-option>
                </mu-select>
              </mu-form-item>
            </div>
            <div class="form-item-inline">
              <mu-form-item prop="develop_provider_id" label="系统开发商">
                <mu-select v-model="formData.develop_provider_id">
                  <mu-option
                    v-for="item in dropDownData.develop_provider_id"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></mu-option>
                </mu-select>
              </mu-form-item>
              <mu-form-item prop="maintain_provider_id" label="运维服务商">
                <mu-select v-model="formData.maintain_provider_id">
                  <mu-option
                    v-for="item in dropDownData.maintain_provider_id"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></mu-option>
                </mu-select>
              </mu-form-item>
            </div>
            <div class="form-item-inline">
              <mu-form-item prop="safe_provider_id" label="安全服务商">
                <mu-select v-model="formData.safe_provider_id">
                  <mu-option
                    v-for="item in dropDownData.safe_provider_id"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></mu-option>
                </mu-select>
              </mu-form-item>
              <mu-form-item prop="address_id" label="资产位置">
                <mu-select v-model="formData.address_id">
                  <mu-option
                    v-for="item in dropDownData.address_id"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></mu-option>
                </mu-select>
              </mu-form-item>
            </div>
          </mu-form>
          <!-- 步骤2 结束-->
        </div>
        <div class="demo-text" v-if="activeStep === 2">
          <!-- 步骤3 -->
        </div>
        <!-- 步骤BUTTON -->
        <div style="float:right">
          <mu-button
            flat
            class="demo-step-button"
            :disabled="activeStep === 0 || activeStep === 2"
            @click="handlePrev"
            >上一步</mu-button
          >
          <mu-button
            class="demo-step-button"
            color="primary"
            @click="handleNext"
            >{{ activeStep === 2 ? "完成" : "下一步" }}</mu-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { checkHost, addHost } from "req/api/assets/list";
import mumanagerTree from "views/assets/organization/mumanagerTree";

export default {
  name: "assets_list_add",
  data() {
    return {
      visibility: true,
      activeStep: 1,
      labelPosition: "right",
      typeRules: [{ validate: val => !!val, message: "通信模式不能为空" }],
      ipRules: [
        { validate: val => !!val, message: "IP地址不能为空" },
        {
          validate: val => this.$validates.ipReg.test(val),
          message: "请输入正确的IP地址,例如:1.1.1.1"
        }
      ],
      portRules: [
        { validate: val => !!val, message: "SSH端口号不能为空" },
        {
          validate: val => {
            return !isNaN(val) && parseInt(val) > 0 && parseInt(val) < 65536 && /^[^0]/.test(val);
          },
          message: "请输入正确的端口号,端口号大于0小于65536"
        }
      ],
      userRules: [{ validate: val => !!val, message: "SSH用户名不能为空" }],
      pwdRules: [{ validate: val => !!val, message: "SSH密码不能为空" }],
      nameRules: [{ validate: val => !!val, message: "资产名称不能为空" }],
      tagRules: [
        {
          validate: val => {
            return val.length > 0;
          },
          message: "功能类别不能为空"
        }
      ],
      software_idRules: [
        { validate: val => !!val, message: "业务系统类别不能为空" }
      ],
      formData: {
        type: "1",
        ip: "",
        port: "",
        user: "",
        pwd: "",
        tag: [],
        name: "",
        // 业务系统类别
        software_id: "",
        // 所属部门
        ministry_id: "",
        ministry: "",
        // 安全责任人
        manager_id: "",
        // 系统开发商
        develop_provider_id: "",
        // 运维
        maintain_provider_id: "",
        // 安全服务商
        safe_provider_id: "",
        // 地址
        address_id: ""
      },
      dropDownData: {
        type: [
          {
            id: "1",
            name: "插件模式"
          },
          {
            id: "2",
            name: "SSH模式"
          }
        ],
        software_id: this.selectData.software,
        tag: this.selectData.tag,
        manager_id: this.selectData.manager,
        develop_provider_id: this.selectData.develop_provider,
        maintain_provider_id: this.selectData.maintain_provider,
        safe_provider_id: this.selectData.safe_provider,
        address_id: this.selectData.address
      }
    };
  },
  props: {
    selectData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    layerid: {
      type: String
    }
  },
  components: {
    mumanagerTree
  },
  computed: {
    finished() {
      return this.activeStep > 2;
    }
  },
  methods: {
    selectTreeChange(data) {
      this.formData.ministry_id = data.ministryValue;
      this.formData.ministry = data.ministryName;
    },
    handleNext() {
      if (this.activeStep == 0) {
        this.firstStep();
      } else if (this.activeStep == 1) {
        this.secondStep();
      } else if (this.activeStep == 2) {
        this.$layer.close(this.layerid);
      }
    },
    handlePrev() {
      this.activeStep--;
    },
    reset() {
      this.activeStep = 0;
    },
    firstStep() {
      this.$refs.assets_list_add1.validate().then(result => {
        if (result) {
          this.__checkHost(this.formData);
        }
      });
    },
    secondStep() {
      this.$refs.assets_list_add2.validate().then(result => {
        if (result) {
          let data = JSON.parse(JSON.stringify(this.formData));
          data.tag = this.formData.tag.join(",");
          this.__addHost(data);
        }
      });
    },
    __checkHost(param) {
      checkHost(param)
        .then(res => {
          this.activeStep++;
        })
        .catch(err => {});
    },
    __addHost(param) {
      addHost(param)
        .then(res => {
          this.activeStep++;
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$parent.$refs.assets_list_table.reload();
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less">
.demo-step-content {
  padding: 0 20px 20px;
  .mu-checkbox-label {
    width: 100px;
  }
}
</style>
