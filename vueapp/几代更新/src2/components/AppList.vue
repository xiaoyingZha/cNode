<template>
  <div class="wrap">

    <div class="side-nav">
      <ul>
        <li
          v-for="v in list"
          :key="v.id"
        ><router-link :to="v.path">{{v.title}}</router-link></li>
      </ul>
    </div>

    <div class="main">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

    export default {
        name: "app-list",
        computed:{
          ...mapState([
            'list'
          ])
        }
    }
</script>

<style scoped>

</style>
