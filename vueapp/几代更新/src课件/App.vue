<template>
  <div id="app">
    <router-view/>
    <login></login>
  </div>
</template>

<script>
  import login from './components/login'
  import {mapMutations,mapActions} from 'vuex'
export default {
  name: 'App',
  components:{
      login
  },
  methods:{
    ...mapMutations([
        'editLogined'
    ]),
      ...mapActions([
        'getUserInfos'
      ]),
  },
  mounted(){
    this.editLogined(!!this.$cookie.get('token_id'));

    if(!!this.$cookie.get('token_id')){
        this.getUserInfos();
    }

  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  body{
    background-color: #E1E1E1;
  }
</style>
