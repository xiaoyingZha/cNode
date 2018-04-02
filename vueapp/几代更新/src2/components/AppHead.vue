<template>
  <header>
    <h1>VUE & ROUTER- <span v-cloak>{{title}}</span></h1>
    <nav>
      <router-link
        v-for="(v,i) in headList"
        :to="v.path"
        :key="v.id"
        exact
      >{{v.title}}</router-link>
    </nav>
  </header>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
      name: "app-head",
      data(){
          return{

          };
      },
      computed:{
        ...mapState([
          'title',
          'headList'
        ])
      }
  }
</script>

<style scoped>

</style>
