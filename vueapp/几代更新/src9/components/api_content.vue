<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <a href="#" style="color: #80bd01;font-size: 14px;">主页</a>&nbsp;&nbsp;/&nbsp;&nbsp;
      <span style="font-size: 14px;color: #999;">API</span>
    </div>
    <div class="markdown-body">
      <!--使用markdown解析这里的内容apiData-->
      <p class="text-message" v-html="apiData.text"></p>
      <ul>
        <li style="margin-bottom: 40px" v-for="v in apiData.contentList">
          <h3 v-html="v.title"></h3>
          <ul>
            <li v-for="val in v.list">
              <h4 style="margin-top: 30px" v-html="val.subTitle"></h4>
              <p>{{val.type}}</p>
              <ul class="deep-list">
                <li v-for="value in val.subList">
                  <div>{{value}}</div>
                </li>
              </ul>
              <div class="example-text" v-html="val.example"></div>
            </li>
          </ul>
        </li>
      </ul>
      <h3>
        {{apiData.accesstoken.title}}
      </h3>
      <ol>
        <li style="line-height: 30px" v-for="v in apiData.accesstoken.list">
          {{v}}
        </li>
      </ol>
    </div>
  </el-card>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "api_content",
        computed:{
          ...mapState([
            'apiData'
          ])
        }
    }
</script>

<style scoped>
  .markdown-body{
    padding: 0;
  }
  .markdown-body ul{
    padding: 0;
  }
  .markdown-body h3{
    padding-bottom: 8px;
    font-size: 28px;
  }
  .markdown-body h3,.markdown-body h4{
    border-bottom: 1px solid #ccc;
  }
  .markdown-body .deep-list{
    font-size: 14px;
    padding-left: 30px;
  }
  .deep-list li{
    list-style: disc;
    line-height: 30px;
  }
  .markdown-body .example-text{
    margin: 20px 0;
  }

</style>
