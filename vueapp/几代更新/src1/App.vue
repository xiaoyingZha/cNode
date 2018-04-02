<template>
  <div id="app">
    <appHead></appHead>
    <router-view></router-view>
  </div>
</template>

<script>
import appHead from './components/AppHead';


export default {
  name: 'App',
  components:{
    appHead
  }
}
</script>

<style>

</style>
