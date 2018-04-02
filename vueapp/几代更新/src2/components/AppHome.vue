<template>
  <div style="height:100%;">
    <h1>{{homeTitle}}</h1>
    <div>
      <button @click="changeHomeTitle">修改home的标题</button>
    </div>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'

    export default {
        name: "app-home",
        computed:{
          ...mapState([
            'homeTitle'
          ])
        },
        methods:{
          ...mapMutations([
            'editHomeTitle'
          ]),
          changeHomeTitle(){
            this.editHomeTitle('这是修改的新的Home标题')
          }
        }
    }
</script>

<style scoped>

</style>
