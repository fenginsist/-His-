<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :model="SearchformInline" class="demo-form-inline">
        <el-form-item label="病案号：">
          <el-input v-model="SearchformInline.chNum" size="mini"/>
        </el-form-item>
        <el-form-item label="第几次住院">
          <el-input v-model="SearchformInline.chTimes" size="mini"/>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-alert
      title="病历信息"
      type="success"
      style="margin-bottom: 10px"
    />
    <table class="table">
      <tr>
        <td class="label">姓名</td>
        <td>
          <el-input v-model="data.chName" size="mini" placeholder="姓名"/>
        </td>
        <td class="label">科别</td>
        <td>
          <el-input v-model="data.chDepartment" size="mini" placeholder="科别"/>
        </td>
        <td class="label">床号</td>
        <td>
          <el-input v-model="data.chBed" size="mini" placeholder="床号"/>
        </td>
        <td class="label">X光号</td>
        <td>
          <el-input v-model="data.chXRayNum" size="mini" placeholder="X光号"/>
        </td>
      </tr>
      <tr>
        <td class="label">心电图号</td>
        <td>
          <el-input v-model="data.chCardiographNum" size="mini" placeholder="心电图号"/>
        </td>
        <td class="label">脑电图号</td>
        <td>
          <el-input v-model="data.chElectroencephogramNum" size="mini" placeholder="脑电图号"/>
        </td>
        <td class="label">病理号</td>
        <td>
          <el-input v-model="data.chPathologyNum" size="mini" placeholder="病理号"/>
        </td>
        <td class="label">入院时情况</td>
        <td>
          <el-input v-model="data.chInStatus" size="mini" placeholder="入院时情况"/>
        </td>
      </tr>
      <tr>
        <td class="label">治疗经过</td>
        <td>
          <el-input v-model="data.chCureCourse" size="mini" placeholder="治疗经过"/>
        </td>
        <td class="label">出院时情况</td>
        <td>
          <el-input v-model="data.chOutStatus" size="mini" placeholder="出院时情况"/>
        </td>
        <td class="label">出院医嘱</td>
        <td>
          <el-input v-model="data.chOutDoctorAdvice" size="mini" placeholder="出院医嘱"/>
        </td>
        <td class="label">科主任或副主任医师签字</td>
        <td>
          <el-input v-model="data.chSignatureDirectorDoctor" size="mini" placeholder="科主任或副主任医师签字"/>
        </td>
      </tr>
      <tr>
        <td class="label">主治医师签字</td>
        <td>
          <el-input v-model="data.chSignatureChargeDoctor" size="mini" placeholder="治疗经过"/>
        </td>
        <td class="label">住院医师签字</td>
        <td>
          <el-input v-model="data.chSignatureHouseDoctor" size="mini" placeholder="出院时情况"/>
        </td>
        <td class="label">实习医师签字</td>
        <td>
          <el-input v-model="data.chSignatureIntern" size="mini" placeholder="出院医嘱"/>
        </td>
      </tr>
    </table>
  </div>

</template>

<script>
  import request from '@/utils/request'

  export default {
    name: 'DiseaseRecord',
    data() {
      return {
        data: [],
        SearchformInline: {
          chNum: '',
          chTimes: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log("submit")
        request({
          url: '/disease-record/query',
          method: 'post',
          data: this.SearchformInline
        }).then(res => {
          this.data = res.data.data
          this.$message({
            type: 'success',
            message: res.data.message
          });
        }).catch(err => {
          console.log(err)
        })
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
