<template>
  <div class="wrap">
    <div class="side-nav">
      <ul>
        <li><router-link to="/list/email">邮件列表</router-link></li>
        <li><router-link to="/list/books">图书列表</router-link></li>
      </ul>
    </div>

    <div class="main">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
    export default {
        name: "app-list"
    }
</script>

<style scoped>

</style>
