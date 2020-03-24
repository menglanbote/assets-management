<template>
  <div class="assets-organization-ministry-edit">
    <mu-container>
      <mu-form
        :model="formData"
        class="mu-demo-form"
        :label-position="labelPosition"
        label-width="100"
        ref="assets_organization_ministry_edit"
      >
        <mu-form-item prop="currentMinistry" label="当前选中">
          <mu-text-field v-model="currentMinistry" disabled></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="ministry" label="修改部门" :rules="ministryRules">
          <mu-text-field v-model="formData.ministry" :max-length="50"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" small @click="submitEdit" >添加</mu-button>
          <mu-button @click="cancel" small>取消</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex'
import * as types from 'store/mutation_types.js'
export default {
  name: "assets_organization_ministry_edit",
  data() {
    return {
      labelPosition: "right",
      ministryRules: [
        { validate: val => !!val, message: "部门位置不能为空" },
        {
          validate: val => val.length >= 2 && val.length <= 10,
          message: "请输入正确的部门名称,部门长度为2-10位"
        }
      ],
      formData: {
        id: "",
        ministry: ""
      }
    };
  },
  props: {
    layer_data: {
      type: [Object, Array, Number],
      default: () => {
        return {};
      }
    },
    node: {
      type: Object,
      default: () => {
        return {};
      }
    },
    layerid: {
      type: String
    }
  },
  computed: {
    currentMinistry() {
      let arr = [];
      arr.push(this.node.data.label);
      this.currentParent(this.node, arr);
      return arr.reverse().join("-");
    },
    ...mapGetters([
          "ministryList"
      ])
  },
  methods: {
    ...mapMutations({
          set_ministryList:types.SET_MINISTRYLIST
      }),
    submitEdit() {
      this.$refs.assets_organization_ministry_edit.validate().then(result => {
        if (result) {
          this.$confirm("确定添加吗？", "确认信息", {
            distinguishCancelAndClose: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
              let treeData = JSON.parse(JSON.stringify(this.ministryList))
                this.findOneEditNode(treeData,'侧室')
                this.set_ministryList(treeData)
                this.$layer.close(this.layerid)
            }).catch(action => {});
        }
      });
    },
    findOneEditNode(treeData,title) {
        for(let item of treeData) {
            if(item.id == this.layer_data.id ) {
                item.label = item.title = title
            }else {
                item.children && this.findOneEditNode(item.children,title)
            }
        }
    },
    cancel() {
      this.$confirm("确定取消吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确定
          this.$layer.close(this.layerid);
        })
        .catch(action => {
          // 取消
        });
    },
    currentParent(_this, arr) {
      if (_this.parent) {
        if (_this.parent.level != 1) {
          arr.push(_this.parent.data.label);
          this.currentParent(_this.parent, arr);
        }
      }
    },
    __editInfo(param) {
      editInfo(param)
        .then(res => {
          this.formData.id = res.data.id;
          this.formData.area = res.data.area;
          this.formData.name = res.data.name;
          this.formData.net = res.data.net;
          this.formData.type = res.data.type;
        })
        .catch(err => {});
    },
    __editArea(param) {
      editArea(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$layer.close(this.layerid);
          this.$parent.$refs.assets_aorganization_ministry_table.reload();
        })
        .catch(err => {});
    },
    __editArea(param) {
      editArea(param)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.$layer.close(this.layerid);
          this.$parent.$refs.assets_organization_ministry_table.reload();
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.assets-organization-ministry-edit {
  width: 100%;
  padding: 10px 20px 0 0;
}
</style>


