<template>
  <section class="scention-ht">
    <navSide title="产品" active="项目管理" :navList="navList"></navSide>
    <section class="scention-wh">
      <headTop active="产品"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/cardCategory' }">产品</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/projectManager'}">项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>查看项目</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="pd-content">
          <el-form :rules="rules" ref="production" :model="production">
            <el-form-item label="项目名称:" prop="name">
              <el-input style="width: 16rem" v-model="production.name" :disabled="inputStatus"></el-input>
            </el-form-item>
            <el-form-item label="项目时长:">
              <el-input auto-complete="off" style="width: 16rem" v-model="production.duration" :disabled="inputStatus"></el-input>
            </el-form-item>
            <el-form-item label="项目价格:" prop="price">
              <el-table
                border
                style="width: 20rem"
                :data="one"
              >
                <el-table-column
                  label="一档"
                >
                  <template slot-scope="scope">
                    <el-input v-model.number="price.firstPrice" :disabled="inputStatus" @blur="checkPrice"></el-input>
                    <p style="color: red" v-if="parseFloat(price.firstPrice).toString() === 'NaN'">请输入数字</p>
                  </template>
                </el-table-column>
                <el-table-column
                  label="二档"
                >
                  <template slot-scope="scope">
                    <el-input v-model.number="price.secondPrice" :disabled="inputStatus" @blur="checkPrice"></el-input>
                    <p style="color: red" v-if="parseFloat(price.secondPrice).toString() === 'NaN'">请输入数字</p>
                  </template>
                </el-table-column>
                <el-table-column
                  label="三档"
                >
                  <template slot-scope="scope">
                    <el-input v-model.number="price.thirdPrice" :disabled="inputStatus" @blur="checkPrice"></el-input>
                    <p style="color: red" v-if="parseFloat(price.thirdPrice).toString() === 'NaN'">请输入数字</p>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="项目封面：" prop="album">
              <div class="store-album">
                <ul>
                  <li>
                    <img :src="cover">
                    <span><i>商品封面</i></span>
                  </li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="">
              <el-upload
                :show-file-list="false"
                class="upload-demo"
                action="https://testcms.1haokj.com/cms/api/file/upload"
                :on-preview="handlePreview"
                :headers="headers"
                :on-remove="handleRemove"
                :on-success="uploadSuccess"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary" v-if="buttonStatus">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="状态:">
              <el-switch
                active-text="上架"
                inactive-text="下架" v-model="switchStatus" :disabled="inputStatus">
              </el-switch>
            </el-form-item>
          </el-form>
          <el-button style="margin: 5rem 12rem" type="success" @click="pageSubmint">确定</el-button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../../components/header/head'
  import navSide from '../../../components/nav/nav'
  import {projectDetails} from "../../../service/getData";
  import {addProject} from "../../../service/getData";
  import {editProject} from "../../../service/getData";
  import {webUrl} from "../../../config/env";

  export default {
    name: "production",
    components: {
      headTop,
      navSide
    },
    data(){
      return {
        uploadSuccess : (response,file,fileList) => {
          this.cover = response.data.detail;
        },
        cover:'',
        headers:{
          Authorization:window.localStorage.Authorization
        },
        production:{
        },
        one:[{}],
        mode:'',
        price:{},
        buttonStatus:true,
        inputStatus:false,
        switchStatus:false,
        rules:{
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { max: 20, message: '最长20个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      async pageStatus(){
        switch (this.$route.params['mode']) {
          case 'add':{
            this.switchStatus = true;
            return;
          }
          case 'edit':{
            let info = await projectDetails(this.id);
            info =info['data']['detail'];
            this.production=info;
            this.cover = info.cover;
            this.price = {
              firstPrice:info.firstPrice,
              secondPrice:info.secondPrice,
              thirdPrice:info.thirdPrice
            };
            this.cover=info.cover;
            this.inputStatus = false;
            info.status === "1"?this.switchStatus=true:this.switchStatus=false;
            return;
          }
          case 'view':{
            this.buttonStatus =false;
            let info = await projectDetails(this.id);
            info =info['data']['detail'];
            this.production=info;
            this.price = {
              firstPrice:info.firstPrice,
              secondPrice:info.secondPrice,
              thirdPrice:info.thirdPrice
            };
            this.cover = info.cover;
            console.log(this.price);
            this.inputStatus =true;
            info.status === "1"?this.switchStatus=true:this.switchStatus=false;
            return;
          }
        }
      },
      async pageSubmint(){
        this.switchStatus === true?this.switchStatus =1:this.switchStatus=0;
        if(this.production.name === ''||this.production.name===undefined){
          this.$message.error('请输入用户名！');
          return 0 ;
        }else if(this.price.firstPrice===''||this.price.secondPrice===''||this.price.thirdPrice===''||this.price.firstPrice===undefined||this.price.secondPrice===undefined||this.price.thirdPrice===undefined){
          this.$message.error('请输入价格！');
          return 0;
        }else if(this.cover === ''||this.cover===undefined){
          this.$message.error('请输入封面！');
          return 0;
        }
        switch (this.mode) {
          case 'add':{
            let status = await addProject(
              this.production.name,
              this.price.firstPrice,
              this.price.secondPrice,
              this.price.thirdPrice,
              this.cover,
              this.production.duration,
              this.switchStatus
            );
            if(status.code ===0){
              this.$message.success('成功！');
              this.$router.go(-1);
            }else{
              this.$message.error(status.message);
            }
            return;
          }
          case 'edit':{
            let status = await editProject(
              this.production.id,
              this.production.name,
              this.price.firstPrice,
              this.price.secondPrice,
              this.price.thirdPrice,
              this.cover,
              this.production.duration,
              this.switchStatus
            );
            if(status.code ===0){
              this.$message.success('成功！');
              this.$router.go(-1);
            }else{
              this.$message.error(status.message);
            }
            return;
          }
          case 'view':{
            this.$router.go(-1);
            return;
          }
        }
      },
    },
    mounted(){
      this.mode = this.$route.params['mode'];
      this.id = this.$route.params['id'];
      this.pageStatus();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin";
  .full{
    @include wh(100%,100%);
    display: flex;
  }
  .main{
    align-content: center;
  }
  .pd-content{
    margin: 0 auto;
    padding-top: 3rem;
    width: 24.5rem;
  }
</style>
