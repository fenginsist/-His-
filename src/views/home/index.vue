<template>
  <div class="dashboard-container">
    <div style="text-align: center;font-family: 'Microsoft YaHei';font-weight: 900;font-size: 40px;line-height: 60px">欢迎来到HIS管理系统</div>
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../../store'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  beforeMount() {
    store.dispatch('tagsView/addView',this.$route)
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    text-align: center;
    color: #409EFF;
  }
}
</style>
