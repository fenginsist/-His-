<template>
  <div class="app-container">
    <h2 style="text-align: center">医生科室维护</h2>
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
      <el-table-column align="center" label="医生id">
        <template slot-scope="scope">
          {{ scope.row.doctorNo }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{scope.row.doctorName}}
        </template>
      </el-table-column>
      <el-table-column label="科室代号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.subjectNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="科室名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.subjectName }}
        </template>
      </el-table-column>
      <el-table-column label="兼科代号" align="center">
        <template slot-scope="scope">
          {{ scope.row.subjectNo1 }}
        </template>
      </el-table-column>
      <el-table-column label="工资代号" align="center">
        <template slot-scope="scope">
          {{ scope.row.personNo }}
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
    <el-dialog :title="doctor.doctorNo==''?'新增门诊科目':'修改门诊科目'" :visible.sync="dialog" width="35%">
      <el-form :model="doctor" label-width="80px" label-position="left">
        <el-row>
          <el-col>
            <el-form-item label="姓名">
              <el-input v-model="doctor.doctorName" size="mini" placeholder="姓名"/>
            </el-form-item>
            <el-form-item label="科室代号">
              <el-input v-model="doctor.subjectNo" size="mini" placeholder="科室代号"/>
            </el-form-item>

            <el-form-item label="科室名称">
              <el-input v-model="doctor.subjectName" size="mini" placeholder="科室名称"/>
            </el-form-item>
            <el-form-item label="兼科代号">
              <el-input v-model="doctor.subjectNo1" size="mini" placeholder="兼科代号"/>
            </el-form-item>
            <el-form-item label="工资代号">
              <el-input v-model="doctor.personNo" size="mini" placeholder="工资代号"/>
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
                tableData: [],
                listLoading: true,
                doctor: {
                    doctorNo: '',
                    doctorName: '',
                    subjectNo: '',
                    subjectName: '',
                    subjectNo1: '',
                    personNo: ''
                },
                dialog: false
            }
        },
        methods: {
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
            add() {
                this.dialog = !this.dialog
                Object.assign(this.doctor, {
                    doctorNo: '',
                    doctorName: '',
                    subjectNo: '',
                    subjectName: '',
                    subjectNo1: '',
                    personNo: ''
                })
            },
            handleEdit(index, row) {
                this.dialog = !this.dialog
                this.doctor = {...row}
            },
            submit() {
                this.dialog = !this.dialog
                if (this.doctor.doctorNo===''){
                    this.tableData.push({ ...this.doctor,doctorNo: parseInt(Math.random() * 1000)})
                }else {
                    for (let item in  this.tableData){
                        if (this.tableData[item].doctorNo===this.doctor.doctorNo){
                            this.tableData[item]={...this.doctor}
                            return
                        }
                    }
                }
            },
        },
        beforeMount() {
            request({
                url: '/manager/doctor/query',
                method: 'get',
            }).then(res => {
                this.tableData = res.data.data
                this.listLoading = !this.listLoading
            }).catch(err => {
            })
        },

    }
</script>
