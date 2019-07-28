<template>
  <div class="app-container">
    <h2 style="text-align: center">收费类型代码表</h2>
    <!-- 检索-->
    <div>
      <el-form :inline="true" :model="searchOption" class="demo-form-inline">
        <el-form-item label="收费类型名称">
          <el-input v-model="searchOption.name" size="mini" placeholder="请输入收费类型名称"/>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="searchData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--    遍历-->
    <el-table
      :data="pageData"
      border
      stripe
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="收费类型代码"
        prop="chargeNo"
      />

      <el-table-column
        align="center"
        label="收费类型名称"
        prop="chargeName"
      />

      <el-table-column
        align="center"
        label="门诊收费标准"
        prop="chargeStandard1"
      />

      <el-table-column
        align="center"
        label="住院收费标准"
        prop="chargeStandard2"
      />
    </el-table>
    <!--    分页-->
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
        formData: {
          chargeNo: '',
          chargeName: '',
          chargeStandard1: '',
          chargeStandard2: ''
        },
        price: {
          chargeNo: '',
          chargeName: '',
          chargeStandard1: '',
          chargeStandard2: ''
        },
        pageData: [],
        allList: [],
        filterData: []
      }
    },
    created() {
      this.getAllPrice()
    },
    methods: {
      getAllPrice() {
        request({
          url: `/price/query`,
          method: 'get'
        }).then(res => {
          this.allList = res.data.data
          this.pageData = res.data.data
          this.filterData = res.data.data
          this.setPaginations()
        })
      },
      setPaginations() {
        this.paginations.page_index = 1
        this.paginations.total = this.allList.length
        this.paginations.page_size = 5

        this.pageData = this.allList.filter((item, index) => {
          return index < this.paginations.page_size
        })
      },
      // 筛选
      searchData() {
        this.pageData = this.filterData.filter((item, index) => {
          if (item.chargeName.includes(this.searchOption.name)) {
            return item
          }
        })
      },
      // 分页事件
      handleSizeChange(pageSize) {
        this.paginations.page_index = 1
        this.paginations.page_size = pageSize

        this.pageData = this.allList.filter((item, index) => {
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
          if (this.allList[i]) {
            tables.push(this.allList[i])
          }
          this.pageData = tables
        }
      }
    }
  }
</script>
