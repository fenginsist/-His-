<template>
  <div class="app-container">
    <el-alert
      title="入库登记表"
      type="success"
      style="margin-bottom: 10px"
    />
    <el-form :model="formInline" id="form">
      <table class="table">
        <tr>
          <td class="label">药品代码</td>
          <td>
            <el-input v-model="formInline.mediNo" size="mini" placeholder="药品代码"/>
          </td>
          <td class="label">规格</td>
          <td>
            <el-input v-model="formInline.specification" size="mini" placeholder="规格"/>
          </td>
          <td class="label">单位</td>
          <td>
            <el-input v-model="formInline.unit" size="mini" placeholder="单位"/>
          </td>
          <td class="label">单价</td>
          <td>
            <el-input v-model="formInline.unitPrice" size="mini" placeholder="单价"/>
          </td>
        </tr>
        <tr>
          <td class="label">数量</td>
          <td>
            <el-input v-model="formInline.quantity" size="mini" placeholder="数量"/>
          </td>
          <td class="label">日期</td>
          <td>
            <el-input v-model="formInline.inDate" size="mini" placeholder="日期"/>
          </td>
          <td class="label">供应商代号</td>
          <td>
            <el-input v-model="formInline.comNo" size="mini" placeholder="供应商代号"/>
          </td>
          <td class="label">发票号码</td>
          <td>
            <el-input v-model="formInline.billNo" size="mini" placeholder="发票号码"/>
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
    name: "inStore",
    data() {
      return {
        formInline: {
          mediNo: '',           //  药品代码
          specification: '',     //  规格
          unit: '',              //   单位
          unitPrice: '',       //   单价
          quantity: '',         //   数量
          inDate: '',             //   日期
          comNo: '',            //   供应商代号
          billNo: ''
        }
      }
    },
    methods: {
      onSubmit() {
        request({
          url: '/in',
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
