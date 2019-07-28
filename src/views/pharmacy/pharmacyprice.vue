<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :model="SearchformInline" class="demo-form-inline">
        <el-form-item label="药品名">
          <el-input v-model="SearchformInline.mediName" size="mini" placeholder="药品名"/>
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
        prop="mediNo"
        label="药品代码"
        width="180"
      />
      <el-table-column
        prop="specification"
        label="规格"
      />
      <el-table-column
        prop="unit"
        label="单位"
      />
      <el-table-column
        prop="unitPrice"
        label="单价"
      />
      <el-table-column
        prop="mediName"
        label="品名"
      />
      <el-table-column
        prop="quality"
        label="性质"
      />
      <el-table-column
        prop="storeLimit"
        label="库存下限"
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
            <el-form-item label="药名">
              <el-input v-model="formInline.mediName" size="mini" placeholder="药名"/>
            </el-form-item>
            <el-form-item label="规格">
              <el-input v-model="formInline.specification" size="mini" placeholder="规格"/>
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="formInline.unit" size="mini" placeholder="单位"/>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click="add">提交</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单价">
              <el-input v-model="formInline.unitPrice" size="mini" placeholder="单价"/>
            </el-form-item>
            <el-form-item label="性质">
              <el-input v-model="formInline.quality" size="mini" placeholder="性质"/>
            </el-form-item>
            <el-form-item label="库存下限">
              <el-input v-model="formInline.storeLimit" size="mini" placeholder="库存下限"/>
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
          mediName: ''
        },
        formInline: {
          mediNo: '',
          specification: '',
          unit: '',
          quality: '',
          unitPrice: '',
          mediName: '',
          storeLimit: ''
        },
        tableData: []
      }
    },
    methods: {
      onSubmit() {
        this.getall()
      },
      add() {
        var url = '/pharmacyprice/add'
        if (this.title === '修改') {
          url = '/pharmacyprice/update'
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
            url: '/pharmacyprice/delete/' + row.mediNo,
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
          url: '/pharmacyprice/query/' + this.page + '/' + this.size,
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
