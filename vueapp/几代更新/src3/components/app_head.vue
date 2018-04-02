<template>
  <el-row :gutter="20" class="app-head-content">
    <el-col :span="3" :offset="1">
      <div class="grid-content bg-purple">
        <h1>
          <a href="#">
            <img style="height: 30px" src="../assets/cnodejs_light.svg" alt="">
          </a>
        </h1>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple" style="padding-top: 3px">
        <input
          @mouseover="inputHover=true"
          @mouseout="inputHover=false"
          class="head-search"
          :class="{'active':inputHover}"
          type="text"
        />
      </div>
    </el-col>
    <el-col :span="6" :offset="8">
      <div class="grid-content bg-purple">
          <nav class="head-nav">
            <router-link
              v-for="v in headNav"
              :key="v.id"
              :to="v.path">{{v.title}}</router-link>
          </nav>
      </div>
    </el-col>
  </el-row>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "app_head",
        data(){
          return{
            inputHover:false
          };
        },
        computed:{
          ...mapState([
            'headNav'
          ])
        }
    }
</script>

<style>
  .app-head-content{
    padding: 10px 0;
  }
  .head-search{
    width: 195px;
    height: 26px;
    padding: 0 20px;
    background: #888 url("../assets/search.e53b380a.hashed.png") no-repeat 4px 4px;
    border-radius: 13px;
    transition: .3s;
  }
  .grid-content .active{
    background-color: #fff;
  }
  .head-nav{
    font-size: 14px;
    padding: 5px 0;
    display: flex;
    justify-content: space-around;
  }
  .head-nav a{
    color: #ccc;
  }

</style>
