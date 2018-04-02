<template>
  <div style="height:100%;">
    <h1>{{homeTitle}}</h1>
    <p>page-num:{{pageNum}}--t-{{total}}--c-{{count}}</p>
  </div>
</template>

<script>
  import {mapState,mapGetters} from 'Vuex'

    export default {
        name: "app-home",
        computed:{
          ...mapState([
            'homeTitle',
            'total',
            'count'
          ]),
          ...mapGetters([
            'pageNum'
          ])
        }
    }
</script>

<style scoped>

</style>
