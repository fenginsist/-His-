<template>
  <div class="app-container">
    <h2 style="text-align: center">住院病人费用结账</h2>
    <div>
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
    </div>
    <el-table
      :data="tableData"
      stripe
      v-loading="listLoading"
      style="width: 100%"
    >
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
        prop="room"
        label="病房号"
      />
      <el-table-column
        prop="money"
        label="费用"
      />
      <el-table-column
        prop="outFlag"
        label="未结算"
      />
      <el-table-column width="170" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            disable
            @click="handleEdit(scope.$index, scope.row)"
          >结算
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="费用结算" :visible.sync="dialog" width="35%">
      <el-form :model="price" label-width="80px" label-position="left">
        <el-row>
          <el-col>
            <el-form-item label="付款方式">
              <el-select v-model="price.type" size="mini" placeholder="付款方式">
                <el-option label="银行卡" value="银行卡"/>
                <el-option label="现金" value="现金"/>
                <el-option label="医疗卡" value="医疗卡"/>
              </el-select>
            </el-form-item>
            <el-form-item label="总价">
              <el-input v-model="price.sum" size="mini" placeholder="付款金额"/>
            </el-form-item>
            <el-form-item label="实付款">
              <el-input v-model="price.total" size="mini" placeholder="实付款"/>
            </el-form-item>
            <el-form-item label="找零">
              <el-input type="text" :value="zhaoling"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="11">
            <el-button
              size="mini"
              @click="submit"
            >确定
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
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
                listLoading:true,
                price: {
                    type: '',
                    sum: "",
                    total: '',
                    zhaoling: ''
                },
                index: ''
            }
        },

        computed: {
            zhaoling() {
                return this.price.total - this.price.sum
            },
        },
        beforeMount() {
            request({
                url: '/leave/get-all',
                method: 'get',
            }).then(res => {
                this.tableData = res.data.data
                _tableData=res.data.data
                this.listLoading=false
            }).catch(err => {
            })
        },

        methods: {
            handleEdit(index, row) {
                this.dialog = !this.dialog
                this.index = index
            },
            submit() {
                this.tableData[this.index].outFlag = !this.tableData[this.index].outFlag
                this.dialog = !this.dialog
            },
            query(){
                console.log(this.search);
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

</style>
