<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="出库单号">
          <el-input v-model="outNo" size="mini" placeholder="ICD9编码"/>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-alert
      title="出库登记表"
      type="success"
      style="margin-bottom: 10px"
    />
    <el-table
      :data="tableData"
      stripe
      size="small"
      style="width: 100%"
    >
      <el-table-column
        prop="mediNo"
        label="药品代码"
      />
      <el-table-column
        prop="specification"
        label="规格"
      />
      <el-table-column
        prop="unit"
        label="单位"
      />
      <el-table-column
        prop="unitPrice"
        label="单价"
      />
      <el-table-column
        prop="quantity"
        label="数量"
      />
      <el-table-column
        prop="outDate"
        label="出库日期"
      />
      <el-table-column
        prop="department"
        label="部门"
      />
    </el-table>
  </div>

</template>

<script>
  import request from '@/utils/request'
  export default {
    name: "outStore",
    data() {
      return {
        outNo: '',
        tableData:[]
      }
    },
    methods:{
      onSubmit(){
          this.tableData=[]
        request({
          url:'/query/out/'+this.outNo,
          method:'get'
        }).then(res=>{
          this.tableData.push(res.data.data)
          console.log(this.tableData)
        }).catch(err=>{
           console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
