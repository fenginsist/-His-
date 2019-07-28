<template>
  <el-container style="height: 100%">
    <el-header>
      <h2 style="text-align: center">入院病人基本资料登记表</h2>
    </el-header>
    <el-main class="table">
      <form ref="form">
        <table style="width: 100%">
          <tr>
            <td style="width: 100px"> 卡号</td>
            <td><input type="text" v-model="patientBase.staffNo"/></td>
            <td style="width: 100px">住院号</td>
            <td><input type="text" v-model="patientBase.patientNo"/></td>
            <td style="width: 100px">费别</td>
            <td><select name="" id="" v-model="patientBase.costType">
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
            <td><input type="date" v-model="patientBase.birthDate"/></td>
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
            <td><input type="text" /></td>

          </tr>
          <tr>
            <td>工作单位</td>
            <td><input type="text" v-model="patientBase.workPlace"/></td>
            <td>电话</td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td>籍贯</td>
            <td><input type="text" v-model="patientBase.nativePlace"/></td>
            <td>邮政编码</td>
            <td><input type="text" /></td>
          </tr>

          <tr>
            <td>联系人</td>
            <td><input type="text" v-model="patientBase.heName"/></td>
            <td>关系</td>
            <td><input type="text" v-model="patientBase.relation"/></td>
            <td>电话</td>
            <td><input type="text" v-model="patientBase.heTel"/></td>
            <td>联系人地址</td>
            <td><input type="text" /></td>
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
      </form>
      <el-row style="margin-top: 30px">
        <el-col :span="3" :offset="10">
          <el-button type="info" @click="submit">确定</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="info" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

</template>

<script>
  import request from '@/utils/request'
  export default {
    data() {
      return {
        patientBase: {
          patientNo:'',    //住院号
          inDate:'',    //入院日期
          patientName:'', //姓名
          patientSex:'',  //性别
          birthDate:'',  //出生日期
          marry:'',    //婚否
          occupation:'',    //职业
          titleName:'',    //职称
          nativePlace:'',  //籍贯
          nationality:'',    //国籍
          capacityNo:'',    //身份证号
          staffNo:'',    //医疗证号
          workPlace:'',    //工作单位
          homeAdder:'',    //住址
          heName:'',    //联系人
          heTel:'',    //联系人电话
          relation:'',    //关系
          costMode:'',    //交费方式
          patientCost:'',    //个人分担
          costType:'',    //费别
          settleType:'',    //结帐方式
          payMoney:'',    //预交款
          diagnoseName:'',    //疾病诊断
          icd9:'',    //ICD-9编码
          section:'',    //科别
          bedNo:'',    //床号
          outDate:'',  //出院日期
        }
      }
    },
    methods: {
      reset(){
        this.$refs['form'].reset()
      },
      submit(){
        request({
          url: `/patient/add`,
          method: 'POST',
          data:this.patientBase
        }).then(res=>{
          this.$message({
            type: 'success',
            message: '成功'
          });
          this.$refs['form'].reset()
        }).catch(err=>{
          this.$message.error('出错啦！');
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
