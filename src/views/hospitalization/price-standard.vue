<template>
  <div class="app-container">
    <h2 style="text-align: center">计价费用维护</h2>
<!--    <div>-->
<!--      <el-form :inline="true" :model="formInline" class="demo-form-inline">-->
<!--        <el-form-item label="诊断类型">-->
<!--          <el-select placeholder="诊断类型" size="mini" v-model="formInline.region">-->
<!--            <el-option label="西医诊断" value="0"/>-->
<!--            <el-option label="中医诊断" value="1"/>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="编码">-->
<!--          <el-input placeholder="ICD10编码" size="mini" v-model="formInline.user"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="名称">-->
<!--          <el-input placeholder="ICD10名称" size="mini" v-model="formInline.user"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="是否可用">-->
<!--          <el-select placeholder="是否可用" size="mini" v-model="formInline.region">-->
<!--            <el-option label="可用" value="0"/>-->
<!--            <el-option label="不可用" value="1"/>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button @click="onSubmit" size="mini" type="primary">搜索</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->
    <div style="margin-bottom: 30px">
      <el-button @click="add" icon="el-icon-circle-plus" size="mini" type="success">添加</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      stripe
      v-loading="listLoading"
      style="width: 100%"
    >
      <el-table-column
        label="收费类型代码"
        prop="chargeNo"
        width="180"
      />
      <el-table-column
        label="收费类型名称"
        prop="chargeName"
      />
      <el-table-column
        label="门诊收费标准"
        prop="chargeStandard1"
      />
      <el-table-column
        label="住院收费标准"
        prop="chargeStandard2"
      />
      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            size="mini"
            type="info"
          >编辑
          </el-button>
          <el-button
            @click="handleDelete(scope.$index, scope.row)"
            size="mini"
            type="danger"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialog" title="新增收费标准">
      <el-form :model="priceStand" label-width="100px">
        <el-row >
          <el-col :span="12">
            <el-form-item label="ICD10编码">
              <el-input placeholder="ICD10编码" size="mini" v-model="priceStand.chargeNo"/>
            </el-form-item>
            <el-form-item label="收费类型名称">
              <el-input placeholder="收费类型名称" size="mini" v-model="priceStand.chargeName"/>
            </el-form-item>
          </el-col>
            <el-col :span="12">
            <el-form-item label="门诊收费标准">
              <el-input placeholder="门诊收费标准" size="mini" v-model="priceStand.chargeStandard1"/>
            </el-form-item>
            <el-form-item label="住院收费标准">
              <el-input placeholder="住院收费标准" size="mini" v-model="priceStand.chargeStandard2"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="7">
            <el-form-item>
              <el-button @click="onSubmit" size="mini" type="primary">提交</el-button>
            </el-form-item>
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
                dialog: false,
                tableData: [],
                listLoading:true,
                priceStand: {
                    id:'',
                    chargeNo: '',  //收费类型代码
                    chargeName: '', //收费类型名称
                    chargeStandard1: '', //门诊收费标准
                    chargeStandard2: ''    //住院收费标准
                }
            }
        },
        beforeMount() {
            request({
                url: '/price-standard/query',
                method: 'get',
            }).then(res => {
                this.tableData = res.data.data;
                this.listLoading=false
            }).catch(err => {
            })
        },
        methods: {
            add(){
                this.dialog = true
                for (let i in this.priceStand){
                    this.priceStand[i]=''
                }

            },
            onSubmit() {
                //这是修改
                this.dialog=false
                if (this.priceStand.id!==''){
                    for (let i in this.tableData){
                        if (this.tableData[i].id===this.priceStand.id){
                            this.tableData[i]={...this.priceStand}
                            return
                        }
                    }
                }else {
                    this.tableData.push({...this.priceStand})
                }
            },
            handleEdit(index, row) {
                this.dialog=!this.dialog
                this.priceStand={...row}
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableData.splice(index,1)
                }).catch(() => {
                    return
                });
            },
        }
    }
</script>

<style scoped>

</style>
