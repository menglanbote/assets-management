<template>
  <div class="g_el_table">
    <div class="table-header" :style="{display:(tableHeadShow ? 'block' : 'none') }">
      <slot name="table_header"></slot>
    </div>
    <!-- 表格 -->
    <el-table 
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.3)"
     :data="tableData" 
     style="width: 100%" 
     tooltip-effect="light"
     :height="tableParams.height"
     :max-height="tableParams.maxHeight"
     :stripe="tableParams.stripe"
     :border="tableParams.border" 
     :size="tableParams.size"
     :row-class-name="tableParams.rowClassName"
     :header-cell-style="tableParams.headerCellStyle"
     :header-cell-class-name="tableParams.headerCellClassName"
     :highlight-current-row="tableParams.highlightCurrentRow"
     :empty-text="tableParams.emptyText || '暂无数据'"
     @sort-change="handleSortChange"
     @selection-change="handleSelectChange">
      <template v-for="(cloumn,index) of cloumns">
        <el-table-column v-if="cloumn.isTemplate"  :key="index" 
        :type="cloumn.type" 
        :index="cloumn.indexMethod"
        :label="cloumn.label" 
        :sortable="cloumn.sortable" 
        :sort-method="cloumn.sortMethod"
        :sort-by="cloumn.sortBy"
        :fixed="cloumn.fixed" 
        :prop="cloumn.prop"
        :width="cloumn.width"
        :min-width="cloumn.minWidth"
        :formatter="cloumn.formatter"
        :align="cloumn.align"
        :show-overflow-tooltip="true"
        >
            <template slot-scope="props" >
              <slot :data="props" :name="cloumn.templateName"></slot>
            </template>
            <template v-if="cloumn.second_head">
                <el-table-column v-if="cloumn.second_head.isTemplate"
                :type="cloumn.second_head.type" 
                :index="cloumn.second_head.indexMethod"
                :label="cloumn.second_head.label" 
                :sortable="cloumn.second_head.sortable" 
                :sort-method="cloumn.second_head.sortMethod"
                :sort-by="cloumn.second_head.sortBy"
                :fixed="cloumn.second_head.fixed" 
                :prop="cloumn.second_head.prop"
                :width="cloumn.second_head.width"
                :min-width="cloumn.second_head.minWidth"
                :formatter="cloumn.second_head.formatter"
                :align="cloumn.second_head.align"
                :show-overflow-tooltip="true"
                >
                  <template slot="header" slot-scope="props">
                    <slot :data="props" :name="cloumn.second_head.templateHeadName"></slot>
                  </template>
                  <template slot-scope="props" >
                    <slot :data="props" :name="cloumn.second_head.templateName"></slot>
                  </template>
                </el-table-column>
                <el-table-column v-else
                :type="cloumn.second_head.type" 
                :index="cloumn.second_head.indexMethod"
                :label="cloumn.second_head.label" 
                :sortable="cloumn.second_head.sortable" 
                :sort-method="cloumn.second_head.sortMethod"
                :sort-by="cloumn.second_head.sortBy"
                :fixed="cloumn.second_head.fixed" 
                :prop="cloumn.second_head.prop"
                :width="cloumn.second_head.width"
                :min-width="cloumn.second_head.minWidth"
                :formatter="cloumn.second_head.formatter"
                :align="cloumn.second_head.align"
                :show-overflow-tooltip="true"
                >
                  <template slot="header" slot-scope="props">
                    <slot :data="props" :name="cloumn.second_head.templateHeadName"></slot>
                  </template>
                </el-table-column>
            </template>
        </el-table-column>
        <el-table-column v-else  :key="index" 
        :type="cloumn.type" 
        :index="cloumn.indexMethod"
        :label="cloumn.label" 
        :sortable="cloumn.sortable" 
        :sort-method="cloumn.sortMethod"
        :sort-by="cloumn.sortBy"
        :fixed="cloumn.fixed" 
        :prop="cloumn.prop"
        :width="cloumn.width"
        :min-width="cloumn.minWidth"
        :formatter="cloumn.formatter"
        :align="cloumn.align"
        :show-overflow-tooltip="true"
        >
          <template v-if="cloumn.second_head">
            <el-table-column v-if="cloumn.second_head.isTemplate"
            :type="cloumn.second_head.type" 
            :index="cloumn.second_head.indexMethod"
            :label="cloumn.second_head.label" 
            :sortable="cloumn.second_head.sortable" 
            :sort-method="cloumn.second_head.sortMethod"
            :sort-by="cloumn.second_head.sortBy"
            :fixed="cloumn.second_head.fixed" 
            :prop="cloumn.second_head.prop"
            :width="cloumn.second_head.width"
            :min-width="cloumn.second_head.minWidth"
            :formatter="cloumn.second_head.formatter"
            :align="cloumn.second_head.align"
            :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="props">
                <slot :data="props" :name="cloumn.second_head.templateHeadName"></slot>
              </template>
              <template slot-scope="props" >
                <slot :data="props" :name="cloumn.second_head.templateName"></slot>
              </template>
            </el-table-column>
            <el-table-column v-else
            :type="cloumn.second_head.type" 
            :index="cloumn.second_head.indexMethod"
            :label="cloumn.second_head.label" 
            :sortable="cloumn.second_head.sortable" 
            :sort-method="cloumn.second_head.sortMethod"
            :sort-by="cloumn.second_head.sortBy"
            :fixed="cloumn.second_head.fixed" 
            :prop="cloumn.second_head.prop"
            :width="cloumn.second_head.width"
            :min-width="cloumn.second_head.minWidth"
            :formatter="cloumn.second_head.formatter"
            :align="cloumn.second_head.align"
            :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="props">
                <slot :data="props" :name="cloumn.second_head.templateHeadName"></slot>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 翻页 -->
    <div class="g_el_page" 
    :style="{textAlign:(pageParams.pageAlign ? pageParams.pageAlign : 'center'),display: pageShow ? 'block' : 'none'}">
      <el-pagination
        :small="pageParams.small"
        :background="pageParams.background"
        :page-size="params.limit"
        :current-page.sync="params.page"
        :total="total"
        :page-count="pageParams.pageCount"
        :page-sizes="pageParams.pageSizes"
        :pager-count="pageParams.pagerCount"
        :layout="pageParams.layout"
        :popper-class="pageParams.popperClass"
        :prev-text="pageParams.prevText"
        :next-text="pageParams.nextText"
        :disabled="pageParams.disabled"
        :hide-on-single-page="pageParams.showpage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { ajaxPro,reqUnlodingPro } from 'req/http/http'
export default {
  name: "g_el_table",
  props:{
    url: {
      required: true
    },
    type: {
      type: String,
      default: 'get'
    },
    params: {
      type: [Object,String,Number],
      default: function() {
        return {
          page: 1,
          limit:10
        }
      }
    },
    cloumns: {
      type:Array,
      default:() => {
        return []
      }
    },
    tableHeadShow: {
      type:Boolean,
      default: false
    },
    tableParams: {
      type:Object,
      default: () => {
        return {}
      }
    },
    pageShow: {
      type: Boolean,
      default: true
    },
    pageParams: {
      type:Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading:false,
      total:0,
      tableData:[],
      respData:{}
    }
  },
  created() {
    this.init(this.params)
  },
  computed: {
    tableHeight: function() {
    }
  },
  methods: {
    init(params) {
      // this.loading = true;
      ajaxPro({
        url:this.url,
        type:this.type,
        data:params
      }).then( res => {
        this.respData = res || {}
        this.tableData = res.data || []
        if(this.pageShow) {
          this.total = res.total || 0
        }
      })
      .finally( () => {
        this.$emit('tableData',this.tableData)
        this.$emit('tableRespData',this.respData)
        // this.loading = false;
      })
    },
    reload() {
      this.$nextTick( () => {
        this.init(this.params)
      })
    },
    handleSortChange({column, prop, order}) {
      this.$emit('sortChange',column, prop, order)
    },
    handleSelectChange(select) {
      this.$emit('selectChange',select)
    },
    handleSizeChange(limit) {
      this.params.limit = limit
      this.init(this.params)
      this.$emit('sizeChange',limit)
    },
    handleCurrentChange(page) {
      this.params.page = page
      this.init(this.params)
      this.$emit('currentChange',page)
    },
    handlePrevClick(val) {
      this.$emit('prevClick',val)
    },
    handleNextClick(val) {
      this.$emit('nextClick',val)
    },
    deleteRow(index) {
      this.tableData.splice(index,1)
    }
  }
};
</script>
<style lang="less">
.g_el_table {
  height:100%;
  .table-header {
    height: 50px;
    background: #f5f7fa;
    line-height: 50px;
    padding: 0 10px;
    border: 1px solid #ebeef5;
  }
  .g_el_page {
    background: #fff;
    height: 50px;
    padding-top: 10px;
    border: 1px solid #ebeef5;
    border-top: none;
    .el-pagination {
      display:inline-block;
    }
  }
}

</style>