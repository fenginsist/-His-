<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :model="SearchformInline" class="demo-form-inline">
        <el-form-item label="病案号：">
          <el-input v-model="SearchformInline.operationNum" size="mini"/>
        </el-form-item>
        <el-form-item label="第几次住院">
          <el-input v-model="SearchformInline.operationTimes" size="mini"/>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-alert
      title="手术信息"
      type="success"
      style="margin-bottom: 10px"
    />
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      size="small"
    >
      <el-table-column
        prop="operationName"
        label="手术及操作名称"
      />
      <el-table-column
        prop="operationCode"
        label="手术及操作编码"
      />
      <el-table-column
        prop="operationDate"
        label="手术及操作日期"
      />
      <el-table-column
        prop="operationHocus"
        label="麻醉"
      />
      <el-table-column
        prop="operationCut"
        label="切口"
      />
      <el-table-column
        prop="operationDoctorName"
        label="手术医师"
      />
      <el-table-column width="95" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 10px">
      <el-pagination
        :current-page="page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>

</template>

<script>
  import request from '@/utils/request'
  export default {
    name: 'Operation',
    data() {
      return {
        page: 1,
        size: 5,
        total: 0,
        tableData: [],
        SearchformInline: {
          operationNum: '',
          operationTimes: ''
        }
      }
    },
    methods: {
      onSubmit() {
        request({
          url: '/operation/query/' + this.page + '/' + this.size,
          method: 'post',
          data: this.SearchformInline
        }).then(res => {
          this.tableData = res.data.data.row
          this.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.size = val
        this.onSubmit()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.page = val
        this.onSubmit()
      },
      handleDelete(index, row) {
        const that= this
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
            url: '/operation/delete/'+row.id,
            method: 'get',
          }).then(res => {
            this.getall()
            this.$message({
              type: 'success',
              message: res.data.message
            });
          }).catch(err => {
          })
        }).catch(() => {

        });
      }
    }
  }
</script>

<style scoped>

</style>
