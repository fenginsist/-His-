<template>
  <div class="app-container">
    <h2 style="text-align: center">病床管理</h2>
    <div style="margin-bottom: 10px">
      <el-button size="mini" type="success" icon="el-icon-circle-plus" @click="dialog = true">添加</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      v-loading="listLoading"
      border
      style="width: 100%"
    >


      <el-table-column
        prop="bedNo"
        label="序号"
        width="180"
      />
      <el-table-column
        prop="bedNo"
        label="床号"
      />

      <el-table-column
        prop="state"
        label="床位状态"
      />
      <el-table-column
        prop="type"
        label="床位类别"
      />
      <el-table-column
        prop="price"
        label="单价"
      />
      <el-table-column
        prop="place"
        label="病区"
      />
      <el-table-column
        prop="room"
        label="病室"
      />
      <el-table-column width="170" label="启用">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :type="scope.row.state===false?'info':'danger'"
            @click="handleEdit(scope.$index, scope.row)"
          >{{scope.row.state===false?'启用':'禁用'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增病床" :visible.sync="dialog">
      <el-form :model="bed" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="床位状态">
              <el-input v-model="bed.state" size="mini" placeholder="ICD9编码"/>
            </el-form-item>
            <el-form-item label="床位类别">
              <el-input v-model="bed.type" size="mini" placeholder="ICD9名称"/>
            </el-form-item>
            <el-form-item label="单价">
              <el-input v-model="bed.price" size="mini" placeholder="拼音码"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item label="病区">
              <el-input v-model="bed.place" size="mini" placeholder="疾病分类码"/>
            </el-form-item>
            <el-form-item label="病室">
              <el-input v-model="bed.room" size="mini" placeholder="疾病名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="8">
            <el-form-item>
              <el-button size="mini" type="primary" @click="submit">提交</el-button>
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
                bed: {
                    bedNo: '',
                    state: '',
                    type: '',
                    price: '',
                    place: '',
                    room: '',
                    listLoading: true
                }
            }
        },
        beforeMount() {
            request({
                url: '/room/bed/get',
                method: 'get',
            }).then(res => {
                this.tableData = res.data.data
                this.listLoading = false
            }).catch(err => {
            })
        },
        methods: {
            handleEdit(index, row) {
                this.tableData[index].state = !this.tableData[index].state
            },
            submit() {
                this.dialog = !this.dialog
                this.tableData.push(this.bed)
            }

        }
    }
</script>

<style scoped>

</style>
