<template>
  <div class="app-container">
    <!--检索-->
    <div>
      <el-form :inline="true" :model="searchOption" class="demo-form-inline">

        <el-form-item label="姓名">
          <el-input v-model="searchOption.memberName" size="mini" placeholder="请输入姓名"></el-input>
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
      :data="pageData"
      stripe
      style="width: 100%"
      align="center"
    >
      <el-table-column
        prop="personNo"
        label="职工编号"
        align="center"
        class="bianli"
      />
      <el-table-column
        prop="memberName"
        label="成员姓名"
        align="center"
        class="bianli"
      />
      <el-table-column
        prop="memberSex"
        label="成员性别"
        align="center"
        class="bianli"
      />
      <el-table-column
        prop="memberBirthDate"
        label="出生日期"
        align="center"
        class="bianli"
      />
      <el-table-column
        prop="memberParty"
        label="政治面目"
        class="bianli"
      />
      <el-table-column
        prop="memberWorkUnit"
        label="工作单位及职务"
        class="bianli"
        align="center"
      />
      <el-table-column
        prop="relation"
        label="与职工关系"
        class="bianli"
        align="center"
      />
      <el-table-column width="170" label="操作">
        <template slot-scope="scope">
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="info"-->
<!--            @click="handleEdit(scope.$index, scope.row)"-->
<!--          >编辑-->
<!--          </el-button>-->
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
        :current-page.sync="pagination.page_index"
        :total="pagination.total"
        :page-size="pagination.page_size"
        :page-sizes="pagination.page_sizes"
        :layout="pagination.layout"
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
      />
    </div>
    <!--添加-->
    <el-dialog :title="dialog.title" :visible.sync="dialog.show">
      <el-form id="el-form" :model="newRelation" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="成员姓名">
              <el-input v-model="newRelation.memberName" size="mini" placeholder="成员姓名"/>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker
                v-model="newRelation.memberBirthDate"
                type="date"
                size="mini"
                placeholder="出生日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="成员性别">
              <el-radio-group v-model="newRelation.memberSex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click="saveData">保存</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item label="政治面目">
              <el-input v-model="newRelation.memberParty" size="mini" placeholder="政治面目"/>
            </el-form-item>
            <el-form-item label="单位职务">
              <el-input v-model="newRelation.memberWorkUnit" size="mini" placeholder="单位职务"></el-input>
            </el-form-item>
            <el-form-item label="与职工关系">
              <el-input v-model="newRelation.relation" size="mini" placeholder="职工关系"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {fengurl} from '@/settings'
  import request from '@/utils/request'
  const relation = {
    name: 'family-social-relationship',
    data() {
      return {
        pagination: {
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
          memberName: ''
        },
        newRelation: {
          personNo: '',
          memberName: '',
          memberSex: '',
          // memberBirthDate: '',
          memberParty: '',
          memberWorkUnit: '',
          relation: ''
        },
        allRelationData: [],
        pageData: [],
        filterData: []
      }
    },
    created() {
      this.getAllRelationData()
    },
    methods: {
      // 获取 列表数据 success
      getAllRelationData() {
        request({
          url: `/contact/query`,
          method: 'get'
        }).then(res => {
          console.log(res.data.data);
          this.allRelationData = res.data.data
          this.pageData = res.data.data
          this.filterData = res.data.data
          this.setPaginations()
        })
      },
      addPage(){
        this.dialog = {
          show: true,
          title: '',
          option: 'add'
        }
        if (document.getElementById('el-form')){
          document.getElementById('el-form').reset();
        }
      },
      //按条件 筛选
      searchData() {
        this.pageData = this.filterData.filter(item => {
          if (item.memberName
                .includes(this.searchOption.memberName)) {
            return item
          }
        });
      },
      // 设置分页数据
      setPaginations() {
        this.pagination.page_index = 1
        this.pagination.total = this.allRelationData.length
        this.pagination.page_size = 5

        this.pageData = this.allRelationData.filter((item, index) => {
          return index < this.pagination.page_size
        })
      },
      //添加数据  success
      saveData() {
        switch (this.dialog.option === 'add' ? 'add' : 'edit') {
          case 'add':
            request({
              url: `/contact/add`,
              method: 'post',
              params: {...this.newRelation}
            }).then(res => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.dialog.show = false;
              this.getAllRelationData();
            })
            break;
          case 'edit':
            // 修改没写
            this.$axios.post(`${fengurl}/contact/edit`, { params: { ...this.newRelation } }).then(res => {
              this.$message('修改成功')
            })
            break;
        }
        this.getAllRelationData()
        this.dialog.show = false
      },
      // 编辑 success
      handleEdit(index, row) {
        this.dialog = {
          show: true,
          title: '修改关系',
          option: 'edit'
        }
        this.newRelation = { ...row }
      },
      //删除数据 success
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
            url: `/contact/delete`,
            method: 'delete',
            params: {id: row.personNo}
          }).then(res => {
            this.$message(' 删除成功！')
            this.getAllRelationData()
          })
        }).catch(() => {
          return
        });


      },
      // 分页事件
      handleSizeChange1(pageSize) {
        this.pagination.page_size = 1
        this.pagination.page_size = pageSize

        this.pageData = this.allRelationData.filter((item, index) => {
          return index < pageSize
        })
      },
      handleCurrentChange1(page) {
        // 参数：page: 当前的页面
        // 获取当前页
        let index = this.pagination.page_size * (page - 1)
        //   数据总数
        let nums = this.pagination.page_size * page
        //   容器
        let tables = []
        for (let i = index; i < nums; i++) {
          if (this.allRelationData[i]) {
            tables.push(this.allRelationData[i])
          }
          this.pageData = tables
        }
      }

    }
  }

  export default relation
</script>

<style scoped>

</style>
