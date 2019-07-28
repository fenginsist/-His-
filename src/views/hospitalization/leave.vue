<template>
  <div class="app-container">
      <h2 style="text-align: center">出院管理</h2>
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-form-item label="住院号">
        <el-input placeholder="住院号" size="mini" v-model="search.patientNo"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input placeholder="姓名" size="mini" v-model="search.patientName"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="query" size="mini" type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
      <el-table
        :data="tableData"
        stripe
        border
        v-loading="listLoading"
        style="width: 100%"
      >
        <el-table-column
          prop="staffNo"
          label="卡号"
          width="180"
        />
        <el-table-column
          prop="patientNo"
          label="住院号"
          width="180"
        />

        <el-table-column
          prop="patientName"
          label="姓名"
          width="180"
        />

        <el-table-column
          prop="inDate"
          label="入院日期"
        />
        <el-table-column
          prop="section"
          label="科别"
        />
        <el-table-column
          prop="bedNo"
          label="床号"
        />

        <el-table-column width="170" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleEdit(scope.$index, scope.row)"
            >出院
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>

</template>

<script>
    import request from '@/utils/request'
    let _tableData=[]
    export default {
        data() {
            return {
                dialog: false,
                tableData: [],
                search: {
                    patientNo: '',
                    patientName: ''
                },
                listLoading:true
            }
        },
        beforeMount(){
            request({
                url: '/patient/query',
                method: 'get',
            }).then(res=>{
                this.tableData=res.data.data
                _tableData=this.tableData
                this.listLoading=false
            }).catch(err=>{
            })
        },

        methods: {
            onSubmit() {
                console.log('submit!')
            },
            handleEdit(index, row) {
                this.$confirm('确定出院, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableData.splice(index,1)
                }).catch(() => {
                });
            },
            query(){
                if(this.search.patientNo===''&&this.search.patientName===''){
                    this.tableData = _tableData
                }else {
                    if (this.search.patientNo===''){
                        this.tableData=_tableData.filter(item => {
                            return item.patientName===this.search.patientName
                        })
                    }else if (this.search.patientName==='') {
                        console.log('patientNo');
                        this.tableData=_tableData.filter(item => {
                            return item.patientNo==this.search.patientNo
                        })
                    }else {
                        this.tableData=_tableData.filter(item => {
                            return item.patientNo==this.search.patientNo&&item.patientName===this.search.patientName
                        })
                    }
                }
            },
        }
    }
</script>

<style scoped>
  .table {
    background: #E4E7ED;
    font-size: 0.7em;
  }

  .table tr {
    height: 30px;
  }

  .table tr td {
    width: auto;
    padding-left: 10px;
    text-align: center;
    text-justify: distribute-all-lines;
    text-align-last: justify
  }
</style>
