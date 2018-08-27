<template>
  <div class="index">
    <div class="list">
      <router-link to="/basic">1.基本用法</router-link>
      <br>
      <router-link to="/contacts">2.通讯录索引跳转</router-link>
    </div>
  </div>
</template>
<style lang="less" scoped>
.list {
  padding: 0.7rem;
  a {
    line-height: 1.6;
  }
}
</style>
