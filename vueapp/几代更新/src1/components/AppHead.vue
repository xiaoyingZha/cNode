<template>
  <header>
    <h1 @click="changeTitle">VUE & ROUTER- <span v-cloak>{{title}}</span></h1>
    <nav>
      <router-link exact to="/">home</router-link>
      <router-link to="/list">list</router-link>
      <router-link exact to="/about">about</router-link>
    </nav>
  </header>
</template>

<script>
  import {mapState,mapMutations,mapActions} from 'vuex';
    export default {
      name: "app-head",
      computed:mapState({
        title:'title',
        id:'id'
      }),
      methods:{
        ...mapMutations([
          'editTitle'
        ]),
        ...mapActions([

        ]),
        changeTitle(){
          this.editTitle('这是新的标题');
        }
      }
    }
</script>

<style scoped>

</style>
