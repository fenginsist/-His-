<template>
  <div class="app-container">
    <h2 style="text-align: center">医嘱管理</h2>
    <div>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="卡号">
          <el-input placeholder="卡号" size="mini" v-model="search.patientNo"/>
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
      type="expand"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <div style="width: 100%;background: #E4E7ED">
            <el-table
              :data="props.row.recipe"
              border
              stripe
              type="expand"

            >
              <el-table-column
                label="药品名称"
                prop="medicineName"
              />
              <el-table-column
                label="药品用法"
                prop="medicineUse"
              />
              <el-table-column
                label="药品用量"
                prop="medicineNum"
              />
              <el-table-column
                label="药品规格"
                prop="medicineGauge"
              />
              <el-table-column
                label="用药时间"
                prop="recipeDate"
              />
              <el-table-column
                label="隔天数"
                prop="imtervalTime"
              />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="诊断类型"
        prop="diagnoseName"
        width="180"
      />
      <el-table-column
        label="病人姓名"
        prop="patientName"
      />
      <el-table-column
        label="病人医疗卡号"
        prop="staffNo"
      />
      <el-table-column
        label="性别"
        prop="patientSex"
      />
      <el-table-column
        label="科室"
        prop="section"
      />
      <el-table-column
        label="床号"
        prop="bedNo"
      />
      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            size="mini"
            type="info"
          >新增医嘱
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialog" title="新增长期医嘱">
      <el-form :model="Uh04TemporaryRecipe" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="药品名称">
              <el-input placeholder="药品名称" size="mini" v-model="Uh04TemporaryRecipe.medicineName"/>
            </el-form-item>
            <el-form-item label="药品用法">
              <el-input placeholder="药品用法" size="mini" v-model="Uh04TemporaryRecipe.medicineUse"/>
            </el-form-item>
            <el-form-item label="药品用量">
              <el-input placeholder="药品用量" size="mini" v-model="Uh04TemporaryRecipe.medicineNum"/>
            </el-form-item>
            <el-form-item label="药品规格">
              <el-input placeholder="药品规格" size="mini" v-model="Uh04TemporaryRecipe.medicineGauge"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="用药时间">
              <el-input placeholder="用药时间" size="mini" v-model="Uh04TemporaryRecipe.recipeDate"/>
            </el-form-item>
            <el-form-item label="隔天数">
              <el-input placeholder="隔天数" size="mini" v-model="Uh04TemporaryRecipe.imtervalTime"/>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :offset="11">
            <el-button @click="onSubmit" icon="el-icon-circle-plus" size="mini" type="success">确定</el-button>
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
        beforeMount() {
            request({
                url: '/patient/query',
                method: 'get',
            }).then(res => {
                _tableData=res.data.data
                for (const i in _tableData) {
                    request({
                        url: '/room/temporary/query-id?id=' + `${_tableData[i].patientNo}`,
                    }).then(res => {
                        _tableData[i].recipe = res.data.data
                        this.listLoading=false
                    }).catch(err => {
                    })
                }
                this.tableData = _tableData

            }).catch(err => {
            })
        },
        data() {
            return {
                dialog: false,
                tableData: [],
                listLoading:true,
                Uh04TemporaryRecipe: {
                    id: '',    //住院号
                    patientNo: '',   //住院
                    recipeDate: '',    //医嘱日期
                    sectionCode: '', //科室编码
                    cureType: '',  //收费类别
                    medicineCode: '',  //药品代码
                    medicineName: '',    //药品名称
                    medicineUse: '',    //药品用法
                    medicineNum: '',    //药品用量
                    medicineGauge: '',  //药品规格
                    imtervalTime: '',    //间隔时间
                    unitPrice: '',    //单价
                },
                search: {
                    patientNo: '',
                    patientName: ''
                },
            }
        },
        methods: {
            onSubmit() {
                request({
                    url: `/room/temporary/add`,
                    method: 'post',
                    data: this.Uh04TemporaryRecipe
                }).then(res => {
                    this.dialog = !this.dialog;
                    this.$message({
                        type: 'success',
                        message: '录入成功!'
                    });
                    this.listLoading=false
                }).catch(err => {
                })
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
            handleEdit(index, row) {
                this.dialog = !this.dialog;
                row.recipe.push(this.Uh04TemporaryRecipe)
            },

        }
    }
</script>

<style scoped>

</style>
