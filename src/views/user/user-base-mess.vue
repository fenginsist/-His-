<template>
  <div class="app-container">
    <!--检索-->
    <!-- 检索测试-->
    <div>
      <el-form :inline="true" :model="searchOption" class="demo-form-inline">
        <el-form-item label="科室编号">
          <el-input v-model="searchOption.personNo" size="mini" placeholder="请输入科室编号"/>
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
      :data="pageUserData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="sectionNo"
        label="科室编号"
      />
      <el-table-column
        prop="personNo"
        label="职工编号"
      />
      <el-table-column
        prop="personName"
        label="姓名"
      />
      <el-table-column
        prop="personSex"
        label="性别"
      />
      <el-table-column label="出生日期">
        <template slot-scope="scope">
          <span>{{ scope.row.birthDate | dateFormatFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="capacityNo"
        label="身份证号"
      />
      <el-table-column
        prop="marry"
        label="婚否"
      />
      <el-table-column
        prop="nation"
        label="民族"
      />
      <el-table-column
        prop="finishSchool"
        label="毕业院校"
      />
      <el-table-column
        prop="degree"
        label="学位"
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
      <el-form id="el-form" ref="refname" :model="newUser" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="职工编号">
              <el-input v-model="newUser.PersonNo" size="mini" placeholder="职工编号"/>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="newUser.PersonName" size="mini" placeholder="姓名"/>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="newUser.PersonSex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期">
              <!-- value-format::  将这个组件生成的时间  在前端 进行格式化 格式化成我们想要的数据模型           -->
              <el-date-picker
                v-model="newUser.BirthDate"
                value-format="yyyy-MM-dd "
                type="datetime"
                size="mini"
                placeholder="出生日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="newUser.CapacityNo" size="mini" placeholder="身份证号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click="saveData">保存</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item label="婚否">
              <el-radio-group v-model="newUser.Marry">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="国籍">
              <el-input v-model="newUser.nation" size="mini" placeholder="国籍"></el-input>
            </el-form-item>
            <el-form-item label="毕业学校">
              <el-input v-model="newUser.FinishSchool" size="mini" placeholder="毕业学校"></el-input>
            </el-form-item>
            <el-form-item label="学位">
              <el-input v-model="newUser.degree" size="mini" placeholder="学位"></el-input>
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
    name: 'user-base-mess',
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
          personNo: ''
        },
        newUser: {
          SectionNo: '',
          PersonNo: '',
          PersonName: '',
          PersonSex: '',
          BirthDate: '',
          CapacityNo: '',
          Marry: '',
          nation: '',
          FinishSchool: '',
          degree: ''
        },
        allUserData: [],
        pageUserData: [],
        filterUserData: []
      }
    },
    created() {
      this.getUserMessage()
    },
    methods: {
      // 获取信息列表  success
      getUserMessage() {
        request({
          url: `/staff/query`,
          method: 'get'
        }).then(res => {
          console.log(res.data.data)
          this.allUserData = res.data.data
          this.pageUserData = res.data.data
          this.filterUserData = res.data.data
          //设置分页信息
          this.setPaginations()
        }).catch(err => {
        })
      },
      // 筛选
      searchData() {
        this.pageUserData = this.filterUserData.filter(item => {
          if (item.sectionNo.toString()
            .includes(this.searchOption.personNo)) {
            return item
          }
        })
      },
      // 设置分页数据
      setPaginations() {
        //  初始化处理
        this.paginations.page_index = 1
        this.paginations.total = this.pageUserData.length
        this.paginations.page_size = 5

        this.pageUserData = this.allUserData.filter((item, index) => {
          return index < this.paginations.page_size
        })
      },
      // 进入添加 页面
      addPage() {
        this.dialog = {
          show: true,
          title: '添加数据',
          option: 'add'
        }
        // this.$refs['refname'].resetField()
        if (document.getElementById('el-form')){
          document.getElementById('el-form').reset()
        }
      },
      //  添加 和 修改 数据   success
      saveData() {
        console.log('2222'+this.newUser.BirthDate)
        request({
          url: `/staff/add`,
          method: 'post',
          params: { ...this.newUser }
        }).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.dialog.show = false
          this.getUserMessage()

        })
      },
      // 修改数据页面     success
      handleEdit(index, row) {
        this.dialog = {
          show: true,
          title: '修改数据',
          option: 'edit'
        }
        // 填充数据
        this.newUser = { ...row }
      },
      //删除数据  success
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
            url: `/staff/delete`,
            method: 'delete',
            params: { id: row.sectionNo }
          }).then(res => {
            this.$message('删除成功')
            this.getUserMessage()
          })
        }).catch(() => {
          return
        })
      },
      //两个分页事件 success
      handleSizeChange(pageSize) {
        // 参数：page_size: 为显示多少行数据，前端的表单
        //   切换 size
        this.paginations.page_index = 1
        this.paginations.page_size = pageSize
        //   设置 分页数据
        this.pageUserData = this.allUserData.filter((item, index) => {
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
          if (this.allUserData[i]) {
            tables.push(this.allUserData[i])
          }
          this.pageUserData = tables
        }
      }
    }
  }
</script>
