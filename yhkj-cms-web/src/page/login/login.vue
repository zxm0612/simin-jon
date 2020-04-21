<template>
  <section>
    <div class="login-bg">
      <div class="wrapcontent" style="padding-top:5%">
        <div style="text-align: center">
          <img src="../../images/logo.png" alt="">
          <p>脊柱健康管理领导品牌运营商</p>
        </div>
        <div class="box-login">
          <div  class="leftImage">
            <img src="../../images/yisheng.png" alt="" style="">
          </div>
          <div class="login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名称：" prop="userNane">
                <el-input v-model="ruleForm.userName"  @keyup.enter.native="submitForm"></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="passWord">
                <el-input v-model="ruleForm.passWord" type="password"  @keyup.enter.native="submitForm"></el-input>
              </el-form-item>
              <el-form-item label="" prop="name">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="submitForm">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <span>一号空间后台管理系统</span>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {login} from '../../service/getData';
  import {initPermisson} from "../../service/getData";

  export default {
    data() {
      return {
        ruleForm: {
          userName: '',
          passWord: ''
        },
        headerList:[],
        rules: {
          userNane: [
          ],
          passWord: [
          ]
        },
        checked:false
      };
    },
    computed:{

    },
    methods: {
      ...mapMutations([
        'getPermission',
      ]),
      async submitForm(){
        if(this.ruleForm.userName === ''||this.ruleForm.passWord === ''){
          alert('用户名或者密码不能为空！');
          return 0;
        }else{
          let status = await login(this.ruleForm.userName,this.ruleForm.passWord);
          if(status['code'] === 0){
            window.localStorage.username = this.ruleForm.userName;
            window.localStorage.password = this.ruleForm.passWord;
            let info = await initPermisson();
            info = info.data.list;
            window.localStorage.permission = JSON.stringify(info);
            this.getPermission(info);
            this.$router.push('/home');
          }else{
            this.$message.error('登陆失败！');
          }
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      if(window.localStorage.username){
        this.ruleForm.userName = window.localStorage.username;
        this.ruleForm.passWord = window.localStorage.password;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  section {
    @include wh(100%,100%);
  }
  .login-bg {
    position: relative;
    @include wh(100%,100%);
    background: url("../../images/login_bg.png") no-repeat;
    background-size: cover;
  }
  .wrapcontent p{
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 5rem;
  }
  .wrapcontent span{
    display: block;
    position: absolute;
    bottom: 10%;
    left: calc((100% - 45rem)/2);
    width: 45rem;
    text-align: center;
    margin: auto auto;
    color: #999999;
  }
  .wrapcontent .login{
    float: left;
    width: 50%;
    background: #f2f3f5;
    padding: 2.5rem 2rem;
  }
 .wrapcontent .leftImage {
    float: left;
    width: 50%;
    height: 100%;
    text-align: center;
  }
 .leftImage img{
   position: relative;
   top: 0;
   left: 19%;
   transform: translate(-25%,9%);
 }
  .box-login {
    overflow: hidden;
    background: #ffffff;
    width:45rem;
    height: 20.4rem;
    margin: auto auto;
  }
</style>
