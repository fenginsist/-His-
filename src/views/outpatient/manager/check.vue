<template>
  <div class="app-container">
    <h2 style="text-align: center">诊断维护</h2>
    <div style="margin-bottom: 10px">
      <el-button size="mini" type="success" icon="el-icon-circle-plus" @click="add">添加</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      highlight-current-row
    >
      <el-table-column align="center" label="编号">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="检查项目代号" align="center">
        <template slot-scope="scope">
          {{scope.row.checkNo}}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.checkName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" align="center">
        <template slot-scope="scope">
          {{ scope.row.checkUnit }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.checkType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" align="center">
        <template slot-scope="scope">
          {{ scope.row.checkPay }}
        </template>
      </el-table-column>
      <el-table-column width="95" label="操作">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            circle
            size="mini"
            type="info"
            @click="handleEdit(scope.$index, scope.row)"
          />
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
    <el-dialog :title="check.checkNo==''?'新增检查项目':'修改检查项目'" :visible.sync="dialog" width="35%">
      <el-form :model="check" label-width="80px" label-position="left">
        <el-row>
          <el-col>
            <el-form-item label="名称">
              <el-input v-model="check.checkName" size="mini" placeholder="姓名"/>
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="check.checkPay" size="mini" placeholder="科室代号"/>
            </el-form-item>

            <el-form-item label="类型">
              <el-input v-model="check.checkUnit" size="mini" placeholder="科室名称"/>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="check.checkType" size="mini" placeholder="兼科代号"/>
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

    export default {
        data() {
            return {
                tableData: [
                    {
                        checkNo:'',
                        checkName:'',
                        checkPay:'',
                        checkUnit:'',
                        checkType:''
                    }
                ],
                listLoading: true,
                dialog:false,
                check:{
                    checkNo:'',
                    checkName:'',
                    checkPay:'',
                    checkUnit:'',
                    checkType:''
                }
            }
        },
        methods: {
            add() {
                this.dialog = !this.dialog
                Object.assign(this.check, {
                    checkNo:'',
                    checkName:'',
                    checkPay:'',
                    checkUnit:'',
                    checkType:''
                })
            },
            handleDelete(index, row) {
                this.$confirm('确定删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableData.splice(index, 1)
                }).catch(() => {
                });
            },
            handleEdit(index, row) {
                this.dialog = !this.dialog
                this.check = {...row}
            },
            submit() {
                this.dialog = !this.dialog
                if (this.check.checkNo===''){
                    this.tableData.push({ ...this.check,checkNo: parseInt(Math.random() * 1000)})
                }else {
                    console.log(this.check);
                    for (let item in  this.tableData){
                        if (this.tableData[item].checkNo==this.check.checkNo){
                            this.tableData[item]={...this.check}
                            return
                        }
                    }
                }
            },

        },
        beforeMount() {
            request({
                url: '/manager/outpatient/query',
                method: 'get',
            }).then(res => {
                this.tableData = res.data.data
                this.listLoading = !this.listLoading
            }).catch(err => {
            })
        },

    }
</script>
