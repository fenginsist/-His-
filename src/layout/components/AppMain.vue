<template>
  <section class="app-main" >
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <div style="height: 100%;margin-top: 40px">
          <router-view :key="key" />
        </div>
      </keep-alive>
    </transition>
    <div style="font-size: 14px;position: fixed;bottom: 0;height:40px;width:90%;margin: 0 auto;background: #F2F6FC;">
      <p style="text-align: center">Copyright © 2018-2019 版权所有 - V1.1.0</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    },

  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>
