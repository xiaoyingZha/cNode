<template>
  <el-row :gutter="20" class="app-head-content">
    <el-col :span="3" :offset="1">
      <div class="grid-content bg-purple">
        <h1>
          <a href="#">
            <img style="height: 30px" src="../assets/img/cnodejs_light.svg" alt="">
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

    <!--登录后的头部右侧显示导航-->
    <el-col v-if="loginInfo" :span="8" :offset="6">
      <div class="grid-content bg-purple">
        <nav class="head-nav">
          <router-link
            v-for="v in loginHeadNav"
            :key="v.id"
            :to="v.path">
            <el-badge v-if="v.title=='未读消息'" :value="messageCount" class="item">
              <span @click="">{{v.title}}</span>
            </el-badge>
            <span v-else>{{v.title}}</span>
          </router-link>
          <a href="javascript:;" @click="out">退出</a>
        </nav>
      </div>
    </el-col>

    <!--未登录状态的头部右侧显示导航-->
    <el-col v-else :span="6" :offset="8">
      <div class="grid-content bg-purple">
          <nav class="head-nav">
            <router-link
              v-for="v in headNav"
              :key="v.id"
              :to="v.path">
              {{v.title}}
            </router-link>
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
            'headNav',//未登录状态的头部导航
            'loginHeadNav',//登录状态的头部导航
            'loginInfo',
            'messageCount'//未读取消息的数量
          ])
        },
      methods:{
        out(){
          //退出登录
          this.$cookie.delete('loginId');
          //刷新页面
          location.reload();
        }
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
    background: #888 url("../assets/img/search.e53b380a.hashed.png") no-repeat 4px 4px;
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
  .head-search:focus{
    background-color: #fff;
    outline: none;
  }
  .el-badge__content{
  background-color: #80bd01;
  }

</style>
