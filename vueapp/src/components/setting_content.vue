<template>
  <div>
    <!--设置信息-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <a href="#" style="color: #80bd01;font-size: 14px;">主页</a>&nbsp;&nbsp;/&nbsp;&nbsp;
        <span style="font-size: 14px;color: #999;">设置</span>
      </div>
      <div class="settingInfo-box">
        <el-form label-position="right" label-width="150px" :model="formLabelAlign">
          <el-form-item label="用户名">
            <el-input v-model="formLabelAlign.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="formLabelAlign.email" :disabled="true"></el-input>
            <div>同时决定了 Gravatar 头像</div>
          </el-form-item>
          <el-form-item label="个人网站">
            <el-input v-model="formLabelAlign.self"></el-input>
          </el-form-item>
          <el-form-item label="所在地点">
            <el-input v-model="formLabelAlign.add"></el-input>
          </el-form-item>
          <el-form-item label="微博">
            <el-input v-model="formLabelAlign.weibo" placeholder="e.g. http://weibo.com/cnodejs"></el-input>
          </el-form-item>
          <el-form-item label="GitHub">
            <el-input v-model="formLabelAlign.git" :disabled="true"></el-input>
            <div>请通过 GitHub 登陆 CNode 来修改此处</div>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="formLabelAlign.signature">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left: 20px" @click="setting">保存设置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!--更改密码-->
    <el-card class="box-card" style="margin: 10px 0">
      <div slot="header" class="clearfix">
        <span>更改密码</span>
      </div>
      <div class="settingPwd-box">
        <el-form label-position="right" label-width="150px" :model="formLabelPwd">
          <el-form-item label="当前密码">
            <el-input v-model="formLabelPwd.username" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="formLabelPwd.region" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left: 20px">更改密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!--Access Token-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Access Token</span>
      </div>
      <div class="inner">
        <div>
          <span>字符串：</span>
          227835ca-b29f-49e4-85f3-4b734d139647
        </div>
        <div>
          <span>二维码：</span>
          <span id="access-token-qrcode" title="227835ca-b29f-49e4-85f3-4b734d139647"><canvas width="200" height="200" style="display: none;"></canvas><img alt="Scan me!" src="data:image/png;base64,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" style="display: block;"></span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
    export default {
      name: "setting_content",
      data(){
          return{
            formLabelAlign:{
              username:'',
              email:'',
              self:'',
              add:'',
              weibo:'',
              git:'',
              signature:''
            },
            formLabelPwd: {
              name: '',
              region: '',
            }
          }
      },
      computed:{
        ...mapState([
          'settingFormAlign'
        ])
      },
      methods:{
      ...mapMutations([
          'editSettingFormAlign'
        ]),
        editFormLabelAlign(data){
          Object.assign(this.formLabelAlign,data)
        },
        setting(){
          this.editSettingFormAlign(this.formLabelAlign);
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }

      },
      beforeMount(){
        this.editSettingFormAlign();
        this.editFormLabelAlign(this.settingFormAlign);
      }
    }
</script>

<style scoped>
  .settingInfo-box, .settingPwd-box{
    width: 450px;
  }

</style>
