<template>
  <el-card class="box-card" style="margin-bottom: 10px">
    <el-button @click="sendTopic" type="success">发布话题</el-button>
  </el-card>
</template>

<script>
    export default {
        name: "aside_issue",
        methods:{
        	sendTopic(){
        		this.$router.push('/topic/create');
        	}
        }
    }
</script>

<style scoped>

</style>
