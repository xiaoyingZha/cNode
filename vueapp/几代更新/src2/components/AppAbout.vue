<template>
  <div style="height:100%;">{{aboutTitle}}</div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "app-about",
      computed:{
        ...mapState([
          'aboutTitle'
        ])
      }
    }
</script>

<style scoped>

</style>
