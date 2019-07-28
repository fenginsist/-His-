<template>
  <div class="app-container">
    <el-alert
      title="病案信息"
      type="success"
      style="margin-bottom: 10px"
    />
    <el-form :model="formInline" id="form">
      <table class="table">
        <tr>
          <td class="label">病案号</td>
          <td>
            <el-input v-model="formInline.fgNum" size="mini" placeholder="病案号"/>
          </td>
          <td class="label">第几次入院</td>
          <td>
            <el-input v-model="formInline.fgTimes" size="mini" placeholder="第几次入院"/>
          </td>
          <td class="label">姓名</td>
          <td>
            <el-input v-model="formInline.fgName" size="mini" placeholder="姓名"/>
          </td>
          <td class="label">性别</td>
          <td>
            <el-input v-model="formInline.fgSex" size="mini" placeholder="性别"/>
          </td>
        </tr>
        <tr>
          <td class="label">出生日期</td>
          <td>
            <el-input v-model="formInline.fgBirthday" size="mini" placeholder="出生日期"/>
          </td>
          <td class="label">婚姻状况</td>
          <td>
            <el-input v-model="formInline.fgMarriage" size="mini" placeholder="婚姻状况"/>
          </td>
          <td class="label">职业</td>
          <td>
            <el-input v-model="formInline.fgOccupation" size="mini" placeholder="职业"/>
          </td>
          <td class="label">籍贯</td>
          <td>
            <el-input v-model="formInline.fgBirthplace" size="mini" placeholder="籍贯"/>
          </td>
        </tr>
        <tr>
          <td class="label">国籍</td>
          <td>
            <el-input v-model="formInline.fgNationality" size="mini" placeholder="国籍"/>
          </td>
          <td class="label">身份证号</td>
          <td>
            <el-input v-model="formInline.fgIDNum" size="mini" placeholder="身份证号"/>
          </td>
          <td class="label">工作单位或地址</td>
          <td>
            <el-input v-model="formInline.fgNnit" size="mini" placeholder="工作单位或地址"/>
          </td>
          <td class="label">本人电话</td>
          <td>
            <el-input v-model="formInline.fgPhonenum" size="mini" placeholder="本人电话"/>
          </td>
        </tr>
        <tr>
          <td class="label">工作单位编制</td>
          <td>
            <el-input v-model="formInline.fgUnitPostalcodet" size="mini" placeholder="工作单位编制"/>
          </td>
          <td class="label">户口地址</td>
          <td>
            <el-input v-model="formInline.fgAddress" size="mini" placeholder="户口地址"/>
          </td>
          <td class="label">现家庭住址</td>
          <td>
            <el-input v-model="formInline.fgHomeAddress" size="mini" placeholder="现家庭住址"/>
          </td>
          <td class="label">居住地邮编</td>
          <td>
            <el-input v-model="formInline.fgHomePostalcode" size="mini" placeholder="居住地邮编"/>
          </td>
        </tr>
        <tr>
          <td class="label">联系人</td>
          <td>
            <el-input v-model="formInline.fgLinkmanName" size="mini" placeholder="联系人"/>
          </td>
          <td class="label">关系</td>
          <td>
            <el-input v-model="formInline.fgLinkmanRelation" size="mini" placeholder="关系"/>
          </td>
          <td class="label">联系人住址</td>
          <td>
            <el-input v-model="formInline.fgLinkmanAddress" size="mini" placeholder="联系人住址"/>
          </td>
          <td class="label">联系人电话</td>
          <td>
            <el-input v-model="formInline.fgLinkmanPhonenum" size="mini" placeholder="联系人"/>
          </td>
        </tr>
        <tr>
          <td class="label">入院科别</td>
          <td>
            <el-input v-model="formInline.fgDepartment" size="mini" placeholder="入院科别"/>
          </td>
          <td class="label">入院日期</td>
          <td>
            <el-input v-model="formInline.fgInTime" size="mini" placeholder="入院日期"/>
          </td>
          <td class="label">入院时情况</td>
          <td>
            <el-input v-model="formInline.fgInStatus" size="mini" placeholder="户口地址"/>
          </td>
          <td class="label">缴费方式</td>
          <td>
            <el-input v-model="formInline.fgPayway" size="mini" placeholder="缴费方式"/>
          </td>
        </tr>
        <tr>
          <td class="label">转科情况</td>
          <td>
            <el-input v-model="formInline.fgChangedepartment" size="mini" placeholder="转科情况"/>
          </td>
          <td class="label">出院科别</td>
          <td>
            <el-input v-model="formInline.fgOutDepartment" size="mini" placeholder="出院科别"/>
          </td>
          <td class="label">出院病室</td>
          <td>
            <el-input v-model="formInline.fgOutRoom" size="mini" placeholder="出院病室"/>
          </td>
          <td class="label">出院日期</td>
          <td>
            <el-input v-model="formInline.fgOutDate" size="mini" placeholder="出院日期"/>
          </td>
        </tr>
        <tr>
          <td class="label">门诊诊断</td>
          <td>
            <el-input v-model="formInline.fgOutDiagnose" size="mini" placeholder="门诊诊断"/>
          </td>
          <td class="label">门诊诊断编码</td>
          <td>
            <el-input v-model="formInline.fgOutDiagnoseCode" size="mini" placeholder="门诊诊断编码"/>
          </td>
          <td class="label">入院诊断</td>
          <td>
            <el-input v-model="formInline.fgInDiagnose" size="mini" placeholder="入院诊断"/>
          </td>
          <td class="label">入院诊断编码</td>
          <td>
            <el-input v-model="formInline.fgInDiagnoseCode" size="mini" placeholder="入院诊断编码"/>
          </td>
        </tr>
        <tr>
          <td class="label">确诊日期</td>
          <td>
            <el-input v-model="formInline.fgDiagnoseDate" size="mini" placeholder="确诊日期"/>
          </td>
          <td class="label">主要诊断</td>
          <td>
            <el-input v-model="formInline.fgMainDiagnose" size="mini" placeholder="主要诊断"/>
          </td>
          <td class="label">主要诊断编码</td>
          <td>
            <el-input v-model="formInline.fgMainDiagnoseCode" size="mini" placeholder="主要诊断编码"/>
          </td>
          <td class="label">其它诊断</td>
          <td>
            <el-input v-model="formInline.fgSubordinationDiagnose" size="mini" placeholder="其它诊断"/>
          </td>
        </tr>
        <tr>
          <td class="label">其它诊断编码</td>
          <td>
            <el-input v-model="formInline.fgSubordinationDiagnoseCode" size="mini" placeholder="其它诊断编码"/>
          </td>
          <td class="label">并发症</td>
          <td>
            <el-input v-model="formInline.fgIntercurrentDisease" size="mini" placeholder="并发症"/>
          </td>
          <td class="label">并发症编码</td>
          <td>
            <el-input v-model="formInline.fgIntercurrentDiseaseCode" size="mini" placeholder="并发症编码"/>
          </td>
          <td class="label">出院情况</td>
          <td>
            <el-input v-model="formInline.fgOutStatus" size="mini" placeholder="出院情况"/>
          </td>
        </tr>
        <tr>
          <td>
            <el-button
              icon="el-icon-edit"
              size="mini"
              type="info"
              @click="onSubmit"
            >保存
            </el-button>
          </td>
          <td>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="reset"
            >取消
            </el-button>
          </td>
        </tr>
      </table>
    </el-form>
  </div>

</template>

<script>

  import request from '@/utils/request'

  export default {
    name: 'MedicalRecord',
    data() {
      return {
        formInline: {
          fgNum: '',	//	*病案号(YYYY9999)
          fgTimes: '',	//	第几次入院
          fgName: '',	//	*姓名
          fgSex: '',	//	*性别fgBirthday;	//	*出生日期
          fgMarriage: '',	//	*婚姻状况
          fgOccupation: '',	//	*职业
          fgBirthplace: '',	//	*籍贯
          fgNationality: '',	//	*国籍
          fgIDNum: '',	//	*身份证号
          fgNnit: '',	//	*工作单位或地址
          fgPhonenum: '',	//	 本人电话
          fgUnitPos: '',	//	 工作单位邮编
          fgAddress: '',	//	*户口地址
          fgHomeAddress: '',
          fgHomePostalcode: '',	//	 居住地邮编
          fgLinkmanName: '',	//	*联系人
          fgLinkmanRelation: '',	//	*关系
          fgLinkmanAddress: '',	//	 联系人地址
          fgLinkmanPhonenum: '',	//	*联系人电话
          fgDepartment: '',	//	*入院科别
          fgRoom: '',	//	*入院病室fgInTime;	//	*入院日期时间
          fgInStatus: '',	//	入院时情况
          fgPayway: '',	//	*交费方式
          fgChangedepartment: '',	//	转科情况
          fgOutDepartment: '',	//	出院科别
          fgOutRoom: '',	//	出院病室fgOutDate;	//	出院日期
          fgOutDiagnose: '',	//	门诊诊断
          fgOutDiagnoseCode: '',	//	门诊诊断编码
          fgInDiagnose: '',	//	入院诊断
          fgInDiagnoseCode: '',	//	入院诊断编码fgDiagnoseDate;	//	确诊日期
          fgMainDiagnose: '',	//	主要诊断
          fgMainDiagnoseCode: '',	//	主要诊断编码
          fgSubordinationDiagnose: '',	//	其他诊断
          fgSubordinationDiagnoseCode: '',	//	其他诊断编码
          fgIntercurrentDisease: '',	//	并发症
          fgIntercurrentDiseaseCode: '',	//	并发症编码
          fgOutStatus: ''	//	出院情况
        }
      }
    },
    methods: {
      onSubmit() {
        request({
          url: '/medical-record/add',
          method: 'post',
          data: this.formInline
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.data.message
          });
          this.reset()
        }).catch(err => {
          console.log(err)
        })
      },
      reset() {
        document.getElementById("form").reset()
      }
    }
  }
</script>

<style scoped>
  .label {
    width: 100px;
    border-radius: 5px;
    background-color: antiquewhite;
  }

  .table {
    background-color: #ebedac;
    font-size: 0.7em;
  }

  .table tr {
    height: 35px;
  }

  .table tr td {
    padding-left: 10px;
    text-align: center;
    text-justify: distribute-all-lines;
    text-align-last: justify
  }
</style>
