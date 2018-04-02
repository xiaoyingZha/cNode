<template>
  <div>
    <ul v-show="readState">
      <li v-for="v in readed" :key="v.id">【**已读邮件**】{{v.id}}-{{v.title}}</li>
    </ul>
    <ul v-show="!readState">
      <li v-for="v in unread" :key="v.id">【**未读邮件**】{{v.id}}-{{v.title}}</li>
    </ul>
    <div>
      <button :style="{backgroundColor:!readState?'red':''}" @click="readState=false">未读邮件</button>
      <button :style="{backgroundColor:readState?'red':''}" @click="readState=true">已读邮件</button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

    export default {
        name: "list-email",
        data(){
          return{
            readState:true
          };
        },
        computed:{
          ...mapGetters([
            'readed',
            'unread'
          ])
        }
    }
</script>

<style scoped>

</style>
