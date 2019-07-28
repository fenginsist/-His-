<template>
  <div class="app-container">
    <h2 style="text-align: center">门诊科目</h2>
    <div>
      <el-form :inline="true" :model="search" class="demo-form-inline">

        <el-form-item label="科目名称">
          <el-input placeholder="科目名称" size="mini" v-model="search.sname"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="query" size="mini" type="primary">搜索</el-button>
          <el-button size="mini" type="success" icon="el-icon-circle-plus" @click="dialog = true" >添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
      fit
      element-loading-text="加载中..."
      style="width: 100%">
      <el-table-column
        prop="scode"
        label="科目码"
      >
      </el-table-column>
      <el-table-column
        prop="sname"
        label="科目名称">
      </el-table-column>

      <el-table-column width="95" label="操作">
        <template slot-scope="scope">
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
    <el-dialog title="新增门诊科目" :visible.sync="dialog" width="35%">
      <el-form :model="price" label-width="80px" label-position="left">
        <el-row>
          <el-col>
            <el-form-item label="科目码">
              <el-input v-model="price.scode" size="mini" placeholder="科目码"/>
            </el-form-item>
            <el-form-item label="科目名称">
              <el-input v-model="price.sname" size="mini" placeholder="科目名称"/>
            </el-form-item>

          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="11">
            <el-button
              size="mini"
              @click="submit"
            >确定
            </el-button>
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
        data() {
            return {
                listLoading: true,
                tableData: [],
                dialog:false,
                search: {
                    sname: '',
                },
                isAdd:false,
                price:{}
            }
        },
        methods: {
            query() {
                if (this.search.sname === '' ) {
                    this.tableData = _tableData
                } else {
                    this.tableData = _tableData.filter(item => {
                        return item.sname == this.search.sname
                    })
                }
            },
            handleDelete(index,row){
                this.$confirm('确定删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableData.splice(index,1)
                }).catch(() => {
                });
            },
            submit() {
                this.dialog = !this.dialog
                this.tableData.push(this.price)
            },
        },
        beforeMount() {
            const that = this
            request({
                url: '/manager/check/query',
                method: 'get',

            }).then(res => {
                that.tableData = res.data.data
                this.listLoading=false
            }).catch(err => {
            })
        },
    }
</script>
