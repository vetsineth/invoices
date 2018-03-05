<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo nav-bar"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="home">
        Home
      </el-menu-item>
      <el-menu-item index="invoice">
        Invoice
      </el-menu-item>
    </el-menu>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
  data() {
    return {
      activeIndex: 'home',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key)
      this.$router.push({ name: key })
    },
  },
}
</script>

<style scoped>
.main-container {
  margin: 30px 50px;
}
.nav-bar {
  padding-left: 50px;
  padding-right: 50px;
}
</style>
