<template>
  <div class="app-container">
    <div v-if="isQuery">
      <h2 style="text-align: center">入院病人基本资料</h2>
      <div>
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="卡号">
            <el-input placeholder="卡号" size="mini" v-model="search.id"/>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input placeholder="姓名" size="mini" v-model="search.name"/>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" size="mini" type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="tableData"
        stripe
        v-loading="listLoading"
        border
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
              type="info"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <el-container style="height: 100%">
        <el-header>
          <h2 style="text-align: center">入院病人基本资料修改</h2>
        </el-header>
        <el-main class="table">
          <table style="width: 100%">
            <tr>
              <td style="width: 100px"> 卡号</td>
              <td><input type="text" v-model="patientBase.staffNo"/></td>
              <td style="width: 100px">住院号</td>
              <td><input type="text" v-model="patientBase.patientNo"/></td>
              <td style="width: 100px">费别</td>
              <td><select name="" v-model="patientBase.costType">
                <option value="">自费</option>
                <option value="">代缴费</option>
              </select></td>
              <td style="width: 105px">入院日期</td>
              <td><input type="date" v-model="patientBase.inDate"/></td>
            </tr>
            <tr>
              <td>科别</td>
              <td><input type="text" v-model="patientBase.section"/></td>
              <td>床号</td>
              <td><input type="text" v-model="patientBase.bedNo"/></td>
            </tr>
            <tr>
              <td>入院方式</td>
              <td><select name="" id="" v-model="patientBase.costMode">
                <option value="">普通入院</option>
                <option value="">转院</option>
              </select></td>
              <td>疾病诊断</td>
              <td><input type="text" v-model="patientBase.diagnoseName"/></td>
              <td>ICD-9编码</td>
              <td><input type="text" v-model="patientBase.icd9"/></td>

            </tr>

            <tr>
              <td>
                姓名
              </td>
              <td><input type="text" v-model="patientBase.patientName"/></td>
              <td>性别</td>
              <td><select name="" id="" v-model="patientBase.patientSex">
                <option value="">男</option>
                <option value="">女</option>
              </select></td>
              <td>出生日期</td>
              <td><input type="datetime" v-model="patientBase.birthDate"/></td>
              <td>婚姻</td>
              <td><input type="text" v-model="patientBase.marry"/></td>
            </tr>
            <tr>
              <td>职业</td>
              <td><input type="text" v-model="patientBase.occupation"/></td>
              <td>职称</td>
              <td><input type="text" v-model="patientBase.titleName"/></td>
              <td>民族</td>
              <td><input type="text"/></td>
              <td>国籍</td>
              <td><input type="text" v-model="patientBase.nationality"/></td>
            </tr>
            <tr>
              <td>身份证号</td>
              <td><input type="text" v-model="patientBase.capacityNo"/></td>
              <td>其他证件</td>
              <td><input type="text"/></td>
              <td>医疗证号</td>
              <td><input type="text"/></td>
              <td>电话</td>
              <td><input type="text" v-model="patientBase.heTel"/></td>
              <td style="width: 100px">家庭电话</td>
              <td><input type="text"/></td>
            </tr>
            <tr>
              <td>现住地址</td>
              <td><input type="text" v-model="patientBase.homeAdder"/></td>
              <td>户口地址</td>
              <td><input type="text"/></td>

            </tr>
            <tr>
              <td>工作单位</td>
              <td><input type="text" v-model="patientBase.workPlace"/></td>
              <td>电话</td>
              <td><input type="text"/></td>
            </tr>
            <tr>
              <td>籍贯</td>
              <td><input type="text" v-model="patientBase.nativePlace"/></td>
              <td>邮政编码</td>
              <td><input type="text"/></td>
            </tr>

            <tr>
              <td>联系人</td>
              <td><input type="text" v-model="patientBase.heName"/></td>
              <td>关系</td>
              <td><input type="text" v-model="patientBase.relation"/></td>
              <td>电话</td>
              <td><input type="text" v-model="patientBase.heTel"/></td>
              <td>联系人地址</td>
              <td><input type="text"/></td>
            </tr>
            <tr>
              <td>出院日期</td>
              <td><input type="text" v-model="patientBase.outDate"/></td>
            </tr>

            <tr>
              <td>个人分担</td>
              <td><input type="text" v-model="patientBase.patientCost"/></td>
            </tr>
            <tr>
              <td>缴费方式</td>
              <td>
                <select name="" id="" v-model="patientBase.settleType">
                  <option value="">现金</option>
                  <option value="">银行卡</option>
                </select>
              </td>
              <td>预交款</td>
              <td><input type="text" v-model="patientBase.payMoney"/></td>
              <td>卡号</td>
              <td><input type="text" v-model="patientBase.staffNo"/></td>
            </tr>
          </table>
          <el-row style="margin-top: 30px">
            <el-col :span="3" :offset="10">
              <el-button type="info" @click="update">确定</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="info">重置</el-button>
            </el-col>
          </el-row>

        </el-main>
      </el-container>
    </div>
  </div>

</template>

<script>
    import request from '@/utils/request'
    let _tableData=[]
    export default {
        data() {
            return {
                dialog: false,
                search:{
                    id:'',
                    name:''
                },
                listLoading:true,
                patientBase: {
                    patientNo: '',    //住院号
                    inDate: '',    //入院日期
                    patientName: '', //姓名
                    patientSex: '',  //性别
                    birthDate: '',  //出生日期
                    marry: '',    //婚否
                    occupation: '',    //职业
                    titleName: '',    //职称
                    nativePlace: '',  //籍贯
                    nationality: '',    //国籍
                    capacityNo: '',    //身份证号
                    staffNo: '',    //医疗证号
                    workPlace: '',    //工作单位
                    homeAdder: '',    //住址
                    heName: '',    //联系人
                    heTel: '',    //联系人电话
                    relation: '',    //关系
                    costMode: '',    //交费方式
                    patientCost: '',    //个人分担
                    costType: '',    //费别
                    settleType: '',    //结帐方式
                    payMoney: '',    //预交款
                    diagnoseName: '',    //疾病诊断
                    icd9: '',    //ICD-9编码
                    section: '',    //科别
                    bedNo: '',    //床号
                    outDate: '',  //出院日期
                },
                isQuery: true,
                tableData: [],
            }
        },
        beforeMount() {
            const that = this
            request({
                url: '/patient/query',
                method: 'get',
            }).then(res => {
                that.tableData = res.data.data
                _tableData=res.data.data
                this.listLoading=false
            }).catch(err => {
            })
        },

        methods: {
            onSubmit() {
                if(this.search.id===''&&this.search.name===''){
                    this.tableData = _tableData
                }else {
                    if (this.search.id===''){
                        this.tableData=_tableData.filter(item => {
                            return item.patientName===this.search.name
                        })
                    }else if (this.search.name==='') {
                        this.tableData=_tableData.filter(item => {
                            return item.staffNo===this.search.id
                        })
                    }else {
                        console.log(4);
                        this.tableData=_tableData.filter(item => {
                            return item.staffNo===this.search.id&&item.patientName===this.search.name
                        })
                    }
                }
            },
            handleEdit(index, row) {
                this.isQuery = !this.isQuery
                this.patientBase = row
                console.log(this.patientBase)
            },
            handleDelete(index, row) {
                const that = this
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    request({
                        url: `/patient/delete/${row.patientNo}`,
                        method: 'get',
                    }).then(res => {
                        that.tableData.splice(index, 1)
                    }).catch(err => {
                    })
                }).catch(() => {

                });

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            update() {
                request({
                    url: '/patient/update',
                    method: 'POST',
                    data: this.patientBase
                }).then(res => {
                    that.isQuery = !that.isQuery
                }).catch(err => {
                })

            }
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
