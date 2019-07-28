<template>
  <div class="app-container">
    <h2 style="text-align: center">住院病人费用结账收入汇总日报表</h2>
    <h4 style="text-align: center">{{'时间：'+ getDate }}</h4>

    <el-table
      :data="tableData"
      stripe
      v-loading="listLoading"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="subject"
        label="科目"
      />
      <el-table-column
        prop="sum"
        label="金额（元）"
      />

    </el-table>

  </div>

</template>

<script>
    const dateFormat = require('dateformat');
    export default {
        data() {
            return {
                dialog: false,
                listLoading: true,
                tableData: [
                    {
                        subject: '银行存款',
                        sum: '5000'
                    },
                    {
                        subject: '退病人预交款',
                        sum: '4000'
                    },
                    {
                        subject: '住院收入',
                        sum: '200000'
                    },
                    {
                        subject: '本院转账',
                        sum: '50000'
                    },
                    {
                        subject: '城镇医保',
                        sum: '10000'
                    },
                    {
                        subject: '医保托管',
                        sum: '5000'
                    },
                    {
                        subject: '手术费',
                        sum: '3000'
                    },
                    {
                        subject: '材料费',
                        sum: '1000'
                    }, {
                        subject: '检查费',
                        sum: '5000'
                    },

                ]
            }
        },
        computed: {
            getDate() {
                return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!')
            },
            handleEdit(index, row) {
                console.log(index, row)
            },
            handleDelete(index, row) {
                console.log(index, row)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        mounted() {
            this.listLoading = false
        }
    }
</script>

<style scoped>

</style>
