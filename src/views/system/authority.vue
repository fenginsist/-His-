<template>
  <div class="app-container">
    <!--检索-->
    <!-- 检索测试-->
    <div>
      <el-form :inline="true" :model="searchOption" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="searchOption.name" size="mini" placeholder="请输入职工"/>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="searchData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--添加 按钮，点击后 唤醒下面的 添加模块-->
    <div>
      <el-button size="mini" type="success" @click="addPage"
                 icon="el-icon-circle-plus">添加
      </el-button>
    </div>
    <!--遍历数据-->
    <el-table
      :data="pageList"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="subSystemName"
        label="子系统名"
        align="center"
      />
      <el-table-column
        prop="userName"
        label="用户名"
        align="center"
      />
      <el-table-column
        prop="passworde"
        label="口令"
        align="center"
      />
      <el-table-column
        prop="userLevel"
        label="用户级别"
        align="center"
      />
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
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
    <!--分页-->
    <div class="block" style="margin-top: 10px">
      <el-pagination
        :current-page.sync="paginations.page_index"
        :total="paginations.total"
        :page-size="paginations.page_size"
        :page-sizes="paginations.page_sizes"
        :layout="paginations.layout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!--添加  和 修改 的 模态框-->
    <el-dialog :title="dialog.title" :visible.sync="dialog.show">
      <el-form id="el-form" :model="formData" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="子系统名">
              <el-input v-model="formData.subSystemName" size="mini" placeholder="子系统名"/>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="formData.userName" size="mini" placeholder="用户名"/>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click="saveData">保存</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="口令">
              <el-input v-model="formData.passworde" size="mini" placeholder="口令"></el-input>
            </el-form-item>
            <el-form-item label="用户级别">
              <el-input v-model="formData.userLevel" size="mini" placeholder="用户级别"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formData.remark" size="mini" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {fengurl}  from '@/settings'
  import request from '@/utils/request'
  export default {
    data() {
      return {
        paginations: {
          page_index: 1,
          total: 0,
          page_size: 5,
          page_sizes: [5, 10, 15, 20],
          layout: 'total, sizes, prev, pager, next, jumper'
        },
        dialog: {
          show: false,
          title: '',
          option: ''
        },
        searchOption: {
          name: ''
        },
        authority: {
          subSystemName: '',
          userName: '',
          passworde: '',
          userLevel: '',
          remark: '',
          id: ''
        },
        formData: {
          subSystemName: '',
          userName: '',
          passworde: '',
          userLevel: '',
          remark: '',
        },
        list: [],       // 存放 后台 返回的数组对象。
        pageList: [],
        filterData: [],
        listLoading: false
      }
    },
    created() {
      this.getAllAuthority()
    },
    methods: {
      // 获取列表 success
      getAllAuthority() {
        request({
          url: `/authority/query`
        }).then(res => {
          this.list = res.data.data
          this.pageList = res.data.data
          this.filterData = res.data.data
          this.setPagination();
        })
      },
      // 分页  success
      setPagination() {
        // 初始化
        this.paginations.page_index = 1
        this.paginations.total = this.list.length
        this.paginations.page_size = 5

        // 设置分页数据
        this.pageList = this.list.filter((item, index) => {
          return index < this.paginations.page_size
        })
      },
      // 筛选  success
      searchData() {
        this.pageList = this.filterData.filter(item => {
          if (item.userName.includes(this.searchOption.name)) {
            return item
          }
        })
      },
      addPage(){
        this.dialog = {
          show: true,
          title: '',
          option: ''
        },
          document.getElementById('el-form').reset();
      },
      // 保存    false
      saveData() {
        const url = this.dialog.option === 'add' ? 'add' : 'edit'
        switch (url) {
          case 'add':
            request({
              url: `/authority/add`,
              method: 'post',
              params: { ...this.formData }
            }).then(res => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.getAllAuthority()
              this.dialog.show = false
            })
            break
          case 'edit':
            request({
              url: `/authority/update`,
              method: 'put',
              params: { ...this.formData }
            }).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getAllAuthority()
              this.dialog.show = false
            })
            break
        }
      },
      // 修改页面
      handleEdit(index, row) {
        this.dialog = {
          show: true,
          title: '修改信息',
          option: 'edit'
        }
        this.formData = { ...row }
      },
      // 删除  success
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
            url: `/authority/delete`,
            method: 'delete',
            params: {id:row.id}
          }).then(res => {
            this.$message('删除成功！！！')
            this.getAllAuthority()
          })
        }).catch(() => {
          return
        });
      },
      // 两个分页事件  success
      handleSizeChange(pageSize) {
        this.paginations.page_index = 1
        this.paginations.page_size = pageSize

        this.pageList = this.list.filter((item, index) => {
          return index < pageSize
        })
      },
      handleCurrentChange(page) {
        // 参数：page: 当前的页面
        // 获取当前页
        let index = this.paginations.page_size * (page - 1)
        //   数据总数
        let nums = this.paginations.page_size * page
        //   容器
        let tables = []
        for (let i = index; i < nums; i++) {
          if (this.list[i]) {
            tables.push(this.list[i])
          }
          this.pageList = tables
        }
      }

    }
  }
</script>
