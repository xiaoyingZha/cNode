<template>
  <div>
    <div>
      <button :style="{backgroundColor:!readstate?'red':''}" @click="readstate=false">未读邮件</button>
      <button :style="{backgroundColor:readstate?'red':''}" @click="readstate=true">已读邮件</button>
    </div>
    <ul v-show="!readstate">
      <li v-for="v,i in unread">【**未读邮件】{{v.id}}-{{v.title}}</li>
    </ul>
    <ul v-show="readstate">
      <li v-for="v,i in readed">【--已读邮件】{{v.id}}-{{v.title}}</li>
    </ul>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

    export default {
        name: "list-email",
        data(){
          return {
            readstate:true
          }
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
