<template>
  <section class="scention-ht">
    <navSide title="门店"></navSide>
    <section class="scention-wh">
      <headTop></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">门店</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/franchiseeManager'}">门店管理</el-breadcrumb-item>
            <el-breadcrumb-item>门店详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-input">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="门店性质" prop="type">
              <el-radio-group v-model="ruleForm.type">
                <el-radio v-model="ruleForm.type" label="1"  @change="storeStatus(1)">直营</el-radio>
                <el-radio v-model="ruleForm.type" label="2"  @change="storeStatus(2)">加盟</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="" prop="businessName">
              <el-select v-model="ruleForm.businessName" placeholder="请选择加盟商" v-show="pageStatus">
                <el-option  v-for="item in this.franchiseeInfo" :label="item.name" :value="item.name" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格档：" prop="cityLevel">
              <el-select v-model="ruleForm.cityLevel" placeholder="请选择">
                <el-option label="一档" :value="1"></el-option>
                <el-option label="二档" :value="2"></el-option>
                <el-option label="三档" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-form-item label="门店全称：" prop="name">
                <el-col :span="6"><el-input v-model="ruleForm.name" maxlength="20"></el-input></el-col><el-col :span="4">最多输入20个字</el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="门店简称：" prop="shortName">
                <el-col :span="6"><el-input v-model="ruleForm.shortName"></el-input></el-col><el-col :span="4">最多输入10个字</el-col>
              </el-form-item>
            </el-row>
            <el-form-item label="门店相册：" prop="album">
              <div class="store-album">
                <ul>
                  <li>
                    <img :src="ruleForm.cover">
                    <span><i>店面封面</i><em>删除图片</em></span>
                  </li>
                  <li v-for="item in ruleForm.imageList" :key="item">
                    <img :src="item">
                    <span><i @click="isCover(item)">设为封面</i><em @click="removeImage(item)">删除图片</em></span>
                  </li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="" v-model="ruleForm.abbName" prop="album">
              <el-upload
                :show-file-list="false"
                class="upload-demo"
                :headers="headers"
                action="https://testcms.1haokj.com/cms/api/file/upload"
                :on-preview="handlePreview"
                :on-success="uploadSuccess"
                :on-remove="handleRemove"
                :file-list="fileList2"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <!--<div slot="tip" class="el-upload__tip">最多可以上传20张图片，建议尺寸 ？*？px</div>-->
              </el-upload>
            </el-form-item>
            <el-form-item label="门店电话：" prop="phoneList">
              <el-button @click="addPhone" type="success" style="margin-bottom: 2rem">添加电话</el-button>
              <el-input v-for="(item,index) in ruleForm.phoneList" v-model="ruleForm.phoneList[index]" style="margin-bottom: .8rem" :key="index"></el-input>
              <p style="color: #999999;">提示：如果想删除某个电话只需要把该输入框清空即可！</p>
            </el-form-item>
            <el-form-item label="门店地址：" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="门店位置：" prop="positionName">
                <el-input v-model="location" placeholder="坐标"></el-input>
              <a href="https://api.map.baidu.com/lbsapi/getpoint/index.html" style="color: #999999;"  target="_Blank"><span style="color: #409EFF">点击这里</span>获取经纬度坐标，分别填入对应输入框！</a>
            </el-form-item>
            <el-form-item label="开店时间：" required>
              <el-form-item prop="openDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.openDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="营业时间：" required>
              <el-form-item prop="openDate">
                <el-input v-model="ruleForm.businessHoursDesc" type="input" style="width: 17rem"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
              <el-switch v-model="ruleForm.status" active-color="#5cb531" inactive-color="#999999"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../../components/header/head'
  import navSide from '../../../components/nav/nav'
  import {mendianDetail} from "../../../service/getData";
  import {editMendian} from "../../../service/getData";
  import {addMendian} from "../../../service/getData";
  import {franchiseeList} from "../../../service/getData";
  import {isPoneAvailable} from "../../../config/reg";
  import {getAllBusinessList} from "../../../service/getData";

  export default {
    data () {
      let checkPhone = (rule,value,callback) =>{
        for(let i =0;i<this.ruleForm.phoneList.length;i++){
          if(!isPoneAvailable(this.ruleForm.phoneList[i])){
            callback(new Error('请输入正确的手机号！'));
          }
        }
      };
      return {
        pageStatus:false,
        radio: '1',
        uploadSuccess : (response,file,fileList) => {
          this.ruleForm.imageList === undefined?this.ruleForm.imageList = []:console.log('');
          this.ruleForm.imageList.push(response.data.detail);
          this.ruleForm.name += "1";
          this.ruleForm.name= this.ruleForm.name.substring(0,this.ruleForm.name.length-1);
          console.log(this.ruleForm.imageList);
        },
        ruleForm: {
        },
        headers:{
          Authorization:window.localStorage.Authorization
        },
        rules: {
          type:[
            { required: true, message: '请选择门店性质', trigger: 'blur' }
          ],
          business:[
            { required: true, message: '请选择加盟商ID', trigger: 'blur' }
          ],
          businessName: [
            { required: true, message: '请填写加盟商名称', trigger: 'blur' }
          ],
          cityLevel: [
            { required: true, message: '请选择价格档', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入门店全称', trigger: 'blur' },
            { max: 20, message: '最多输入20个字', trigger: 'blur' }
          ],
          shortName: [
            { required: true, message: '请输入门店简称', trigger: 'blur' },
            { max: 10, message: '最多输入10个字', trigger: 'blur' }
          ],
          phoneList: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输门店地址', trigger: 'blur' }
          ],
          lat: [
            { required: true, message: '请输门店位置', trigger: 'blur' }
          ],
          openDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
        },
        franchiseeInfo:[],
        location:''
      };
    },
    methods: {
      //获取加盟商信息
      async getFranchisee(){
        let info = await getAllBusinessList();
        this.franchiseeInfo = info['data']['list'];
      },
      async submitForm() {
        if(typeof this.location !== 'string'){
          this.$message.error('请输入正确的坐标!');
          return;
        }
        this.location = this.location.split(',');
        if(this.pageStatus === true){
          for(let i =0;i<this.franchiseeInfo.length;i++){
            if(this.franchiseeInfo[i].name === this.ruleForm.businessName){
              this.ruleForm.businessId = this.franchiseeInfo[i].id;
            }
          }
        }
        this.ruleForm.status === true?this.ruleForm.status = 1:this.ruleForm.status =0;
        if(this.$route.params.mode === 'edit'){
          if(this.ruleForm.name === ''||this.ruleForm.name === undefined){
            this.$message.error('请输入门店名称！');
            return ;
          }else if(this.ruleForm.shortName === ''||this.ruleForm.shortName === undefined){
            this.$message.error('请输入门店简称！');
            return ;
          }else if(this.ruleForm.type === ''||undefined){
            this.$message.error('请选择门店类型！');
            return ;
          }else if(this.ruleForm.cityLevel === ''||undefined){
            this.$message.error('请选择价格档！');
            return ;
          }else if(this.ruleForm.cover === ''||undefined){
            this.$message.error('请选择封面！');
            return ;
          }else if(this.ruleForm.imageList.length === 0){
            this.$message.error('请上传至少一张图片至相册列表！');
            return ;
          }else if(this.ruleForm.phoneList.length ===0){
            this.$message.error('请至少填写一个电话号码！');
            return;
          }else if(this.ruleForm.address === ''||undefined){
            this.$message.error('请输入地址!');
            return ;
          }else if(this.ruleForm.openDate === ''||undefined){
            this.$message.error('请选择日期!');
            return ;
          }
          let status = await editMendian(
            this.ruleForm.id,
            this.ruleForm.type,
            this.ruleForm.businessId,
            this.ruleForm.businessName,
            this.ruleForm.name,
            this.ruleForm.shortName,
            this.ruleForm.phoneList,
            this.ruleForm.imageList,
            this.ruleForm.cover,
            this.ruleForm.cityLevel,
            this.ruleForm.address,
            this.location[0],
            this.location[1],
            this.ruleForm.openDate,
            this.ruleForm.status,
            this.ruleForm.businessHoursDesc
          );
          if(status.code === 0){
            this.$message.success('编辑成功!');
            setTimeout(() => {
              this.$router.push('/franchiseeManager');
            },600);
          }else{
            alert(status.msg);
            return 0;
          }
        }else{
          if(this.ruleForm.name === ''||this.ruleForm.name === undefined){
            this.$message.error('请输入门店名称！');
            return ;
          }else if(this.ruleForm.shortName === ''||this.ruleForm.shortName === undefined){
            this.$message.error('请输入门店简称！');
            return ;
          }else if(this.ruleForm.type === ''||undefined){
            this.$message.error('请选择门店类型！');
            return ;
          }else if(this.ruleForm.cityLevel === ''||undefined){
            this.$message.error('请选择价格档！');
            return ;
          }else if(this.ruleForm.cover === ''||undefined){
            this.$message.error('请选择封面！');
            return ;
          }else if(this.ruleForm.imageList.length === 0){
            this.$message.error('请上传至少一张图片至相册列表！');
            return ;
          }else if(this.ruleForm.phoneList.length ===0){
            this.$message.error('请至少填写一个电话号码！');
            return;
          }else if(this.ruleForm.address === ''||undefined){
            this.$message.error('请输入地址!');
            return ;
          }else if(this.ruleForm.openDate === ''||undefined){
            this.$message.error('请选择日期!');
            return ;
          }
          let status = await addMendian(
            this.ruleForm.id,
            this.ruleForm.type,
            this.ruleForm.businessId,
            this.ruleForm.businessName,
            this.ruleForm.name,
            this.ruleForm.shortName,
            this.ruleForm.phoneList,
            this.ruleForm.imageList,
            this.ruleForm.cover,
            this.ruleForm.cityLevel,
            this.ruleForm.address,
            this.location[0],
            this.location[1],
            this.ruleForm.openDate,
            this.ruleForm.status
          );
          if(status.code===0){
            this.$router.push('/franchiseeManager');
          }else{
            this.$message.error(status.message);
            return 0;
          }
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      isCover(url){
        for(let i =0;i<this.ruleForm.imageList.length;i++){
          this.ruleForm.imageList[i] === url?this.ruleForm.imageList[i]=this.ruleForm.cover:'';
          if(this.ruleForm.imageList[i] === ''){
            this.ruleForm.imageList.splice(i,1);
          }
        }
        this.ruleForm.cover = url;
      },
      removeImage(url){
        for(let i =0;i<this.ruleForm.imageList.length;i++){
          if(this.ruleForm.imageList[i] == url){
            this.ruleForm.imageList.splice(i,1);
          }
        }
      },
      async getInitData(){
        let info = await mendianDetail(this.$route.params.id);
        this.ruleForm = info.data.detail;
        this.ruleForm.status === 1 ? this.ruleForm.status = true:this.ruleForm.status = false;
        this.ruleForm.type === 2? this.pageStatus = true:this.pageStatus = false;
        this.location = this.ruleForm.lng.toString()+','+this.ruleForm.lat.toString();
      },
      addPhone(){
        if(this.ruleForm.phoneList.length ===4){
          alert('人家最多只能添加四个啦~');
          return;
        }
        this.ruleForm.phoneList.push('');
      },
      storeStatus(key){
        switch (key) {
          case 1:{
            //说明是直营被单击
            this.pageStatus = false;
            this.ruleForm.type = '1';
            return;
          }

          case 2:{
            //说明是加盟被单击
            this.pageStatus = true;
            this.ruleForm.type = '2';
            return;
          }
        }
      }
    },
    components: {
      headTop,
      navSide
    },
    mounted(){
      if(this.$route.params.mode === 'edit'){
        this.getInitData();
      }else if(this.$route.params.mode === 'add'){
        this.ruleForm = {
          type:'',
          businessId:'',
          businessName:'',
          name:'',
          short:'',
          phoneList:[],
          imageList:[],
          cover:'',
          cityLevel:'',
          address:'',
          lng:'',
          lat:'',
          openDate:'',
          status:0
        }
      }
      this.getFranchisee();
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin.scss";

</style>
