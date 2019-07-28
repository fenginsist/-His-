<template>
  <div class="app-container">
    <h2 style="text-align: center">收费明细</h2>
    <el-table
      :data="tableData"
      border
      v-loading="listLoading"
      element-loading-text="加载中..."
      style="width: 100%">
      <el-table-column
        prop="personsNo"
        label="项目编号"
      >
      </el-table-column>
      <el-table-column
        prop="treatDate"
        label="日期"
      >
      </el-table-column>
      <el-table-column
        prop="mediTotal"
        label="药费总额">
      </el-table-column>
      <el-table-column
        prop="percentage"
        label="应扣百分比"
      >
      </el-table-column>
      <el-table-column
        prop="mediType"
        label="药品种类"
      >
      </el-table-column>
      <el-table-column
        prop="printNumber"
        label="处方流水号"
      >
      </el-table-column>

      <el-table-column
        prop="opera"
        label="挂号员号"
      >
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
    import request from '@/utils/request'

    export default {
        data() {
            return {
                listLoading: true,
                tableData: []
            }
        },
        beforeMount() {
            request({
                url: '/outpatientprice/query',
                method: 'get',
            }).then(res => {
                this.tableData = res.data.data
                this.listLoading = false
            }).catch(err => {
            })
        },

    }
</script>
