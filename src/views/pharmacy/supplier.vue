<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :model="SearchformInline" class="demo-form-inline">
        <el-form-item label="供应商名称">
          <el-input v-model="SearchformInline.comName" size="mini" placeholder="供应商名称"/>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button size="mini" type="success" icon="el-icon-circle-plus" @click="dialog = true">添加</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      size="small"
      style="width: 100%"
    >
      <el-table-column
        prop="comNo"
        label="供应商代码"
        width="180"
      />
      <el-table-column
        prop="comName"
        label="供应商名称"
      />
      <el-table-column
        prop="comAddress"
        label="地ַ"
      />
      <el-table-column
        prop="contactTel"
        label="联系电话"
      />
      <el-table-column
        prop="contactPer"
        label="联系人"
      />
      <el-table-column
        prop="comType"
        label="类别"
      />
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
    <div class="block" style="margin-top: 10px">
      <el-pagination
        :current-page="page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog :title="title" :visible.sync="dialog">
      <el-form :model="formInline" label-width="100px">
        <input type="hidden" v-model="formInline.id">
        <el-row>
          <el-col :span="12">
            <el-form-item label="供应商名称">
              <el-input v-model="formInline.comName" size="mini" placeholder="ICD9编码"/>
            </el-form-item>
            <el-form-item label="地ַ">
              <el-input v-model="formInline.comAddress" size="mini" placeholder="ICD9名称"/>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click="add">提交</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="formInline.contactTel" size="mini" placeholder="拼音码"/>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="formInline.contactPer" size="mini" placeholder="疾病分类码"/>
            </el-form-item>
            <el-form-item label="类别">
              <el-input v-model="formInline.comType" size="mini" placeholder="疾病名称"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>

  import request from '@/utils/request'
  import Index from "../../layout/components/TagsView/index";

  export default {
    name: 'DiseaseCoding',
    components: {Index},
    data() {
      return {
        dialog: false,
        page: 1,
        size: 5,
        total: 0,
        title: '添加',
        SearchformInline: {
          comName: ''
        },
        formInline: {
          comNo: '',           //  供应商代码
          comName: '',     // 供应商名称
          comAddress: '',              //  地ַ
          contactTel: '',         //   联系电话
          contactPer: '',         // 联系人
          comType: '',
        },
        tableData: []
      }
    },
    methods: {
      onSubmit() {
        this.getall()
      },
      add() {
        var url = '/supplier/add'
        if (this.title === '修改') {
          url = '/supplier/update'
        }
        request({
          url: url,
          method: 'post',
          data: this.formInline
        }).then(res => {
          //关闭弹框
          this.dialog = !this.dialog
          this.getall()
          this.$message({
            type: 'success',
            message: res.data.message
          });
          this.title = '添加'
        }).catch(err => {
        })
      },
      handleEdit(index, row) {
        this.formInline = this.tableData[index]
        this.title = '修改'
        this.dialog = true
        console.log(index, row)

      },
      handleDelete(index, row) {
        const that = this
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
            url: '/supplier/delete/' + row.comNo,
            method: 'get',
          }).then(res => {
            this.getall()
            this.$message({
              type: 'success',
              message: res.data.message
            });
          }).catch(err => {
          })
        }).catch(() => {

        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.size = val
        this.getall()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.page = val
        this.getall()
      },
      getall() {
        request({
          url: '/supplier/query/' + this.page + '/' + this.size,
          method: 'post',
          data: this.SearchformInline
        }).then(res => {
          this.tableData = res.data.data.row
          this.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.getall()
    }
  }
</script>

<style scoped>

</style>
