<template>
  <div class="app-container">
    <form action="" ref="form">
    <h2 style="text-align: center">挂号</h2>
    <el-container class="table">
      <el-aside style="border-right-width: 1px;border-color: #c1c4cb;border-right-style: solid">
        <table>
          <tr>
            <td >卡号</td>
            <td>
              <input type="text" v-model="register.personsNo">
            </td>
          </tr>
          <tr>
            <td>姓名</td>
            <td>
              <input type="text" v-model="register.patientName">
            </td>
          </tr>
          <tr>
            <td>
              简拼
            </td>
            <td>
              <input type="text">
            </td>
          </tr>
          <tr>
            <td>
              全拼
            </td>
            <td>
              <input type="text">
            </td>
          </tr>
          <tr>
            <td>
              性别
            </td>
            <td>
              <select name="" id="">
                <option value="">男</option>
                <option value="">女</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              出生日期
            </td>
            <td>
              <input type="date">
            </td>
          </tr>
          <tr>
            <td>
              年龄
            </td>
            <td>
              <input type="number">
            </td>
          </tr>
          <tr>
            <td>
              简拼
            </td>
            <td>
              <input type="text">
            </td>
          </tr>
          <tr>
            <td>
              费别
            </td>
            <td>
              <input type="text">
            </td>
          </tr>
          <tr>
            <td>
              职业
            </td>
            <td>
              <input type="text">
            </td>
          </tr>
          <tr>
            <td>
              地址
            </td>
            <td>
              <input type="text">
            </td>
          </tr>
          <tr>
            <td>
              电话
            </td>
            <td>
              <input type="text">
            </td>
          </tr>
          <tr>
            <td>
              身份证
            </td>
            <td>
              <input type="text">
            </td>
          </tr>
          <tr>
            <td>
              其他证件类型
            </td>
            <td>
              <select>
                <option value="">--</option>
                <option value="">护照</option>
                <option value="">军官证</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              其他证件号
            </td>
            <td>
              <input type="number">
            </td>
          </tr>
          <tr>
            <td>
              婚姻状况
            </td>
            <td>
              <select>
                <option value="">--</option>
                <option value="">已婚</option>
                <option value="">未婚</option>
              </select>
            </td>
          </tr>
        </table>
      </el-aside>
      <el-main>
        <el-container>
          <el-header>
            <table>
              <tr>
                <td colspan="2">
                  <input type="radio">初诊
                  <input type="radio">复诊
                </td>
              </tr>
              <tr>
                <td style="width: 120px" >医生</td>
                <td><input type="text" v-model="register.dotorName"></td>
                <td style="width: 120px">科室</td>
                <td style="width: 80px"><input type="text" v-model="register.sectionNo" ></td>
                <td style="width: 120px">总费用</td>
                <td><input type="text" v-model="register.registerPrice"></td>
              </tr>
              <tr>
                <td>挂号类别</td>
                <td><input type="text"></td>
                <td>病历类型</td>
                <td><input type="text"></td>

              </tr>
              <tr>
                <td>现金</td>
                <td><input type="text"></td>
                <td style="width: 120px">找零</td>
                <td><input type="text"></td>
              </tr>
              <tr>
                <td>病历编号</td>
                <td><input type="text"></td>
                <td><select name="">
                  <option value="">银联卡</option>
                  <option value="">支付宝</option>
                </select></td>
                <td><input type="text"></td>
                <td>卡号</td>
                <td><input type="number" v-model="register.personsNo"></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button type="button" @click="submit">确定</button>
                </td>
              </tr>
            </table>
          </el-header>
        </el-container>

      </el-main>
    </el-container>
    </form>
  </div>
</template>


<script>
    import request from '@/utils/request'
    export default {
        data() {
            return {
                tableData: [],
                register:{
                    registerId: '',//挂号id
                    dotorName: '',//医生姓名
                    personsNo: '',//挂号医疗卡号
                    sectionNo: '',  // 挂号科室
                    patientName: '', //挂号姓名
                    registerDate: '',//挂号时间
                    registerPrice: '',//挂号费用
                }
            }
        },
        methods:{
            submit(){
                request({
                    url: `/register/add`,
                    method: 'POST',
                    data:this.register
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
    padding-left: 10px;
  }

  .table tr {
    height: 30px;
  }

  .table tr td {
    text-align: center;
    text-justify: distribute-all-lines;
    text-align-last: justify
  }
</style>


