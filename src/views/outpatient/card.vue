<template>
  <div class="app-container">
    <h2 style="text-align: center">门诊挂号卡统计</h2>
    <div>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="医疗卡号">
          <el-input placeholder="医疗卡号" size="mini" v-model="search.personsNo"/>
        </el-form-item>
        <el-form-item label="挂号姓名">
          <el-input placeholder="挂号姓名" size="mini" v-model="search.patientName"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="query" size="mini" type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
      v-loading="listLoading"
      element-loading-text="加载中..."
      style="width: 100%">
      <el-table-column
        prop="registerId"
        label="挂号id">
      </el-table-column>
      <el-table-column
        prop="doctorNo"
        label="医生代号">
      </el-table-column>
      <el-table-column
        prop="personsNo"
        label="挂号医疗卡号">
      </el-table-column>
      <el-table-column
        prop="sectionNo"
        label="挂号科室">
      </el-table-column>
      <el-table-column
        prop="patientName"
        label="挂号姓名">
      </el-table-column>
      <el-table-column
        prop="registerDate"
        label="挂号时间">
      </el-table-column>
      <el-table-column
        prop="registerPrice"
        label="挂号费用">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
    import request from '@/utils/request'

    let _tableData = []
    export default {
        data() {
            return {
                listLoading: true,
                tableData: [],
                search: {
                    personsNo: '',
                    patientName: ''
                },
            }
        },
        beforeMount() {
            request({
                url: '/register/query',
                method: 'get',
            }).then(res => {
                this.tableData = res.data.data
                _tableData=res.data.data
                this.listLoading=false
            }).catch(err => {
            })
        },
        methods:{
            query(){
                console.log(this.search);
                if(this.search.personsNo===''&&this.search.patientName===''){
                    this.tableData = _tableData
                }else {
                    if (this.search.patientNo===''){
                        this.tableData=_tableData.filter(item => {
                            return item.patientName===this.search.patientName
                        })
                    }else if (this.search.patientName==='') {
                        console.log('patientNo');
                        this.tableData=_tableData.filter(item => {
                            return item.personsNo==this.search.personsNo
                        })
                    }else {
                        this.tableData=_tableData.filter(item => {
                            return item.personsNo==this.search.personsNo&&item.patientName===this.search.patientName
                        })
                    }
                }
            },
        }
    }
</script>
