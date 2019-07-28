<template>
  <div class="app-container">
    <!-- 检索-->
    <div>
      <el-form :inline="true" :model="searchOption" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="searchOption.name" size="mini" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="searchData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--遍历数据-->
    <el-table
      :data="pageDataList"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="personNo"
        label="就医人员编号"
        align="center"
      />
      <el-table-column
        prop="personName"
        label="姓名"
        align="center"
      />
      <el-table-column
        prop="departmentNo"
        label="部门代码"
        align="center"
      />
      <el-table-column
        prop="titleNo"
        label="职称代码"
        align="center"
      />
      <el-table-column
        prop="personSex"
        label="性别"
        align="center"
      />
      <el-table-column
        prop="chargeNo"
        label="收费类型代码"
        align="center"
      />
      <el-table-column
        prop="telephony"
        label="电话号码"
        align="center"
      />
      <el-table-column
        prop="contactAddress"
        label="地址"
        align="center"
      />
      <el-table-column
        prop="birthDate"
        label="出生日期"
        align="center"
      />
      <el-table-column
        prop="married"
        label="婚否"
        align="center"
      />
      <el-table-column
        prop="registerDate"
        label="发证日期"
        align="center"
      />
      <el-table-column
        prop="cardMark"
        label="补发医疗卡标记"
        align="center"
      />
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
  </div>
</template>

<script>
  import { fengurl } from '@/settings'
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
        searchOption: {
          name: ''
        },
        dialog: {
          show: false,
          title: '',
          option: ''
        },
        formData: {
          personNo: '',
          personName: '',
          departmentNo: '',
          titleNo: '',
          personSex: '',
          chargeNo: '',
          telephony: '',
          contactAddress: '',
          birthDate: '',
          married: '',
          registerDate: '',
          cardMark: ''
        },
        mediciner: {
          personNo: '',
          personName: '',
          departmentNo: '',
          titleNo: '',
          personSex: '',
          chargeNo: '',
          telephony: '',
          contactAddress: '',
          birthDate: '',
          married: '',
          registerDate: '',
          cardMark: ''
        },
        allDataList: [],
        pageDataList: [],
        filterData: [],
        listLoading: false
      }
    },
    created() {
      this.getAllDataList()
    },
    methods: {
      getAllDataList() {
        request({
          url: `/mediciner/query`,
          method: 'get'
        }).then(res => {
          this.allDataList = res.data.data
          this.pageDataList = res.data.data
          this.filterData = res.data.data
          this.setPaginations()
        })
      },
      setPaginations() {
        this.paginations.page_index = 1
        this.paginations.total = this.allDataList.length
        this.paginations.page_size = 5

        this.pageDataList = this.allDataList.filter((item, index) => {
          return index < this.paginations.page_size
        })
      },
      //  false
      searchData() {
        this.pageDataList = this.filterData.filter(item => {
          if (item.personName.includes(this.searchOption.name)) {
            return item
          }
        })
      },
      handleSizeChange(pageSize) {
        this.paginations.page_index = 1
        this.paginations.page_size = pageSize
        this.pageDataList = this.allDataList.filter((item, index) => {
          return index < pageSize
        })
      },
      handleCurrentChange(page) {
        //  获取当前页
        let index = this.paginations.page_size * (page - 1)
        //  获取总数
        let nums = this.paginations.page_size * page
        //  容器
        let tables = []
        for (let i = index; i < nums; i++) {
          if (this.allDataList[i]) {
            tables.push(this.allDataList[i])
          }
          this.pageDataList = tables
        }
      }
    }
  }
</script>
