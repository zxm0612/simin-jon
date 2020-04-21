<template>
  <section class="scention-ht">
    <navSide active="banner" title="广告位"></navSide>
    <section class="scention-wh">
      <headTop active="运营"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/banner'}">运营</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/banner'}">banner管理</el-breadcrumb-item>
            <el-breadcrumb-item>查看banner</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-input">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-row>
              <el-form-item label="活动名称" prop="name">
                <el-col :span="6"><el-input v-model="ruleForm.name" maxlength="20" disabled="true"></el-input></el-col><el-col span="6"><i>最多20个字</i></el-col>
              </el-form-item>
            </el-row>
            <el-form-item label="门店相册：" prop="album">
              <div class="store-album">
                <ul>
                  <li>
                    <img :src="ruleForm.img">
                    <span><em>当前图片</em></span>
                  </li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="活动时间：" prop="endTimes">
              <el-date-picker
                disabled="true"
                v-model="valueTimes"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="活动类型：" prop="">
              <el-radio-group v-model="ruleForm.type">
                <el-radio label="1" disabled="true">图片展示</el-radio>
                <el-radio label="2" disabled="true">URL</el-radio>
                <el-radio label="3" disabled="true">次卡</el-radio>
                <el-radio label="4" disabled="true">疗程卡</el-radio>
              </el-radio-group>
              <div class="activityTab" v-if="type1"><img :src="ruleForm.img" alt=""></div>
              <div class="activityTab" v-if="type2">
                <el-form-item label="" prop="">
                  <div class="url-input">
                    <el-input v-model="ruleForm.link" disabled="true"></el-input>
                  </div>
                </el-form-item>
              </div>
              <div class="activityTab" v-if="type34">
                <div class="careTabel">
                  <div class="tabl">
                    <el-table :data="ruleForm.shoppingTitle" border  row-style="height:1.8rem">
                      <el-table-column prop="name" label="商品名称">
                      </el-table-column>
                      <el-table-column prop="operation" label="操作">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <!--弹出对话框-->
              </div>
              <div class="activityTab" v-bind:class="{ 'box-none': isActive }">
                <div class="careTabel">
                  <el-button type="success" @click="dialogFormVisible1 = true" class="careTabel">添加</el-button>
                  <el-table :data="storesTabel" border row-style="height:1.8rem" cell-style="padding:0">
                    <el-table-column prop="number" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="operation" label="操作">
                    </el-table-column>
                  </el-table>
                </div>
                <!--弹出对话框-->
              </div>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
              <el-input v-model="ruleForm.sort" disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
              <el-switch v-model="ruleForm.status" active-color="#5cb531" inactive-color="#999999" disabled="true"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="$router.go(-1)">返回</el-button>
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
  import {bannerDetail} from "../../../service/getData";

  export default {
    data () {
      return {
        radioData: '',
        ruleForm: {
          activityName: ''
        },
        rules: {
          activityName: [
            { required: true, message: '请输入活动名称', trigger: 'change' }
          ]
        },
        valueTimes: [],
        activityRadio: 3,
        activityTab: '',
        storesTabel: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogTableVisible1: false,
        dialogFormVisible1: false,
        type1:false,
        type2:false,
        type34:false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '85px',
        isActive: true,
        navList: [
          {name: 'banner', value: '#/bannerManager'}
        ]
      }
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
      showRow(row){
        //赋值给radio
        this.radio = this.tableData.indexOf(row);
      },
      getCurrentRow(val){
        console.log(val)
      },
      getCurrentRows(val){
        console.log(val)
      },
      async getInitData(){
        let info = await bannerDetail(this.$route.params.id);
        this.ruleForm = info.data.detail;
        this.valueTimes = [this.ruleForm.startDate, this.ruleForm.endDate];
        this.ruleForm.shoppingTitle = [{
          name:this.ruleForm.shoppingTitle
        }];
        this.ruleForm.status =='1'?this.ruleForm.status=true:this.ruleForm.status=false;
        this.ruleForm.type = this.ruleForm.type.toString();
        switch (this.ruleForm.type) {
          case '1':{
            this.type1 = true;
            this.type2 = false;
            this.type34 = false;
            break;
          }
          case '2':{
            this.type1 = false;
            this.type2 = true;
            this.type34 = false;
            break;
          }
          case '3':{
            this.type1 = false;
            this.type2 = false;
            this.type34 = true;
            break;
          }
          case '4':{
            this.type1 = false;
            this.type2 = false;
            this.type34 = true;
            break;
          }
        }
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
  @import "../../../style/mixin";
  .activityTab{
    width: 60%;
    height: auto;
  }
  .careTabel{
    margin-bottom: 1rem;
  }
  .el-table__header th{
    padding:0 0;
  }
  .site-wrapper .el-pagination {
    margin-top: 5px;
    text-align: right;
  }
  .el-dialog__body{
    padding-top: 0;
  }
  .el-dialog__header{
    background: #5cb531;
  }
</style>
