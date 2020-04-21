<template>
  <section class="scention-ht">
    <navSide title="门店" active="门店管理"></navSide>
    <section class="scention-wh">
      <headTop></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/storeManager' }">门店</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/franchiseeManager'}">门店管理</el-breadcrumb-item>
            <el-breadcrumb-item>查看门店</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-input">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="门店性质" prop="resource">
              <el-radio-group v-model="ruleForm.type">
                <el-radio v-model="ruleForm.type" label=1 value="1" disabled="true">直营</el-radio>
                <el-radio v-model="ruleForm.type" label=2 value="2" disabled="true">加盟</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="" prop="region">
              <el-select v-model="ruleForm.businessName" placeholder="请选择加盟商" disabled="true" v-if="storeStatus">
                <el-option label="ruleForm.businessName" value="ruleForm.businessName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格档：" prop="price">
              <el-select v-model="ruleForm.cityLevel" placeholder="请选择" disabled="true">
                <el-option label="一档" :value="1"></el-option>
                <el-option label="二档" :value="2"></el-option>
                <el-option label="三档" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-form-item label="门店全称：" prop="fulName">
                <el-col :span="6"><el-input v-model="ruleForm.name" maxlength="20" disabled="true"></el-input></el-col><el-col :span="4">最多输入20个字</el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="门店简称：" prop="abbName">
                <el-col :span="6"><el-input v-model="ruleForm.shortName" disabled="true"></el-input></el-col><el-col :span="4">最多输入10个字</el-col>
              </el-form-item>
            </el-row>
            <el-form-item label="门店相册：" prop="album">
              <div class="store-album">
                <ul>
                  <li v-for="item in ruleForm.imageList" :key="item">
                    <img :src="item">
                    <span><i>店面封面</i><em>删除图片</em></span>
                  </li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="门店电话：" prop="phone">
              <div v-for="item in ruleForm.phoneList" :key="item">
                <p>{{item}}</p>
              </div>
            </el-form-item>
            <el-form-item label="门店地址：" prop="addressName">
              <el-input v-model="ruleForm.address" disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="门店位置：" prop="positionName">
              <el-col :span="6">
                <el-input v-model="ruleForm.lng" disabled="true"></el-input>
              </el-col>
              <el-col :span="6">
                <el-input v-model="ruleForm.lat" disabled="true"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="开店时间：" required>
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.openDate"  disabled="true"></el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="状态：" prop="delivery">
              <el-switch v-model="ruleForm.status" active-color="#5cb531" inactive-color="#999999" disabled="true"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="$router.go(-1)">提交</el-button>
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

  export default {
    data () {
      return {
        storeStatus:false,
        radio: '2',
        ruleForm: {
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async getInitData(){
        let info = await mendianDetail(this.$route.params.id);
        this.ruleForm = info.data.detail;
        this.ruleForm.status === 1 ? this.ruleForm.status = true:this.ruleForm.status = false;
        this.ruleForm.type === 1 ? this.storeStatus = false:this.storeStatus = true;
      }
    },
    components: {
      headTop,
      navSide
    },
    mounted(){
      this.getInitData();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin.scss";

</style>
