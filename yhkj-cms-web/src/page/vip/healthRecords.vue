<template>
  <section class="scention-ht">
    <navSide title="会员管理" :options="this.navOptions"></navSide>
    <section class="scention-wh">
      <headTop active="会员"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">会员</a></el-breadcrumb-item>
            <el-breadcrumb-item>健康档案</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="box-content clearfix" >
          <el-table :data="tableData" border>
            <el-table-column prop="title" label="报告名称"></el-table-column>
            <!--<el-table-column prop="equipment" label="设备名称"></el-table-column>-->
            <el-table-column prop="type" label="报告类型"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column prop="date" label="操作">
              <template slot-scope="scope"  class="vip-postion">
                <el-button prop="options" type="text" size="small" @click="getDetailData(scope.row.id)">详情</el-button>
                <el-button prop="options" type="text" size="small" @click="delFile(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--健康档案对话框-->
          <el-dialog title="档案详情" :visible.sync="dialogArchivesType1">
            <div class="health-records">
              <div class="content-title">
                <h4>{{recordInfo.title}}</h4>
                <p>{{recordInfo.reportDate}}</p>
              </div>
              <div class="image-file">
                <h4>影像文件</h4>
                <ul class="clearfix">
                  <li v-for="item in recordInfo.heatImages" :key="item"><img :src="item" alt=""></li>
                </ul>
              </div>
              <el-collapse accordion>
                <el-collapse-item title="主报告" v-if="recordInfo.mainReport !== undefined" v-for="item in recordInfo.mainReport" :key="item">
                  <template slot="title">
                    <p>主报告</p>
                  </template>
                  <div >
                    <p>{{item['index']}} {{item.bodyRegions}}</p>
                    <p>热源表现：{{item.heatSourcePerformance}}</p>
                    <p>提示病况：<span v-for="i in item" :key="i">{{i}}</span></p>
                    <p>评估提示：{{item.diseaseHint}}</p>
                    <p>数据分析：{{item.dataAnalysis}}</p>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="副报告" v-if="recordInfo.deputyReport !== undefined" v-for="item in recordInfo.deputyReport" :key="item">
                  <p>{{item['index']}}</p>
                  <p>热源表现：{{item.heatSourcePerformance}}</p>
                  <p>提示病况：<span v-for="i in item" :key="i">{{i}}</span></p>
                  <p>检查意见：{{item.checkAdvice}}</p>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="success" @click="dialogArchivesType1 = false">关闭</el-button>
            </div>
          </el-dialog>
          <el-dialog title="档案详情" :visible.sync="dialogArchivesType2">
            <div class="health-records">
              <div class="content-title">
                <h4>{{this.recordInfo.title}}</h4>
                <p>{{this.recordInfo.reportDate}}</p>
              </div>
              <div class="image-file">
                <h4>影像文件</h4>
                <ul class="clearfix">
                  <li v-for="item in recordInfo.heatImages" :key="item"><img :src="item" alt=""></li>
                </ul>
              </div>
              <el-collapse accordion>
                <el-collapse-item title="主报告" v-if="recordInfo.mainReport !== undefined">
                    <div v-for="item in recordInfo.mainReport">
                      <h4>{{item.diseaseHint}}</h4>
                      <p>热源表现：{{item.heatSourcePerformance}}</p>
                      <p>检查建议：{{item.checkAdvice}}</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="健康建议">
                  <div v-for="item in recordInfo.healthAdvice">
                    <h4>{{item.title}}</h4>
                    <p>常见原因：<span v-for="i in item.causeList">{{i}}</span></p>
                    <p>保健建议：<span v-for="i in item.adviceList">{{i}}</span></p>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="success" @click="dialogArchivesType2 = false">关闭</el-button>
            </div>
          </el-dialog>
          <el-dialog title="档案详情" :visible.sync="dialogArchivesType3">
            <div class="health-records">
              <div class="content-title">
                <h4>健康评估报告</h4>
                <p>{{this.recordInfo.reportDate}}</p>
              </div>
              <div class="image-file">
                <h4>影像文件</h4>
                <ul class="clearfix">
                  <li v-for="item in this.recordInfo.heatImages" :key="item"><img :src="item" alt=""></li>
                </ul>
              </div>
              <el-collapse accordion>
                <el-collapse-item v-if="recordInfo.cycleSystem!==undefined">
                  <template slot="title">
                    <p>循环系统</p>
                  </template>
                  <div v-for="item in recordInfo.cycleSystem" :key="item">
                    <p>项目：{{item.project}}</p>
                    <p>热源描述: <span v-for="i in item.heatDesc">{{i}}</span></p>
                    <p>评估提示: <span v-for="i in item.assess">{{i}}</span></p>
                    <p>其他建议: <span v-for="i in item.other">{{i}}</span></p>
                  </div>
                </el-collapse-item>
                <el-collapse-item v-if="recordInfo.breatheSystem!==undefined">
                  <template slot="title">
                    <p>呼吸系统</p>
                  </template>
                  <div v-for="item in recordInfo.breatheSystem" :key="item">
                    <p>项目：{{item.project}}</p>
                    <p>热源描述: <span v-for="i in item.heatDesc">{{i}}</span></p>
                    <p>评估提示: <span v-for="i in item.assess">{{i}}</span></p>
                    <p>其他建议: <span v-for="i in item.other">{{i}}</span></p>
                  </div>
                </el-collapse-item>
                <el-collapse-item v-if="recordInfo.slakingSystem!==undefined">
                  <template slot="title">
                    <p>消化系统</p>
                  </template>
                  <div v-for="item in recordInfo.slakingSystem" :key="item">
                    <p>项目：{{item.project}}</p>
                    <p>热源描述: <span v-for="i in item.heatDesc">{{i}}</span></p>
                    <p>评估提示: <span v-for="i in item.assess">{{i}}</span></p>
                    <p>其他建议: <span v-for="i in item.other">{{i}}</span></p>
                  </div>
                </el-collapse-item>
                <el-collapse-item v-if="recordInfo.generateSystem!==undefined">
                  <template slot="title">
                    <p>泌尿生殖系统</p>
                  </template>
                  <div v-for="item in recordInfo.generateSystem" :key="item">
                    <p>项目：{{item.project}}</p>
                    <p>热源描述: <span v-for="i in item.heatDesc">{{i}}</span></p>
                    <p>评估提示: <span v-for="i in item.assess">{{i}}</span></p>
                    <p>其他建议: <span v-for="i in item.other">{{i}}</span></p>
                  </div>
                </el-collapse-item>
                <el-collapse-item v-if="recordInfo.boneSystem!==undefined">
                  <template slot="title">
                    <p>骨骼系统</p>
                  </template>
                  <div v-for="item in recordInfo.boneSystem" :key="item">
                    <p>项目：{{item.project}}</p>
                    <p>热源描述: <span v-for="i in item.heatDesc">{{i}}</span></p>
                    <p>评估提示: <span v-for="i in item.assess">{{i}}</span></p>
                    <p>其他建议: <span v-for="i in item.other">{{i}}</span></p>
                  </div>
                </el-collapse-item>
                <el-collapse-item v-if="recordInfo.immuneSystem!==undefined">
                  <template slot="title">
                    <p>内分泌与免疫系统</p>
                  </template>
                  <div v-for="item in recordInfo.immuneSystem" :key="item">
                    <p>项目：{{item.project}}</p>
                    <p>热源描述: <span v-for="i in item.heatDesc">{{i}}</span></p>
                    <p>评估提示: <span v-for="i in item.assess">{{i}}</span></p>
                    <p>其他建议: <span v-for="i in item.other">{{i}}</span></p>
                  </div>
                </el-collapse-item>
                <el-collapse-item v-if="recordInfo.otherSystem!==undefined">
                  <template slot="title">
                    <p>其他系统</p>
                  </template>
                  <div v-for="item in recordInfo.otherSystem" :key="item">
                    <p>项目：{{item.project}}</p>
                    <p>热源描述: <span v-for="i in item.heatDesc">{{i}}</span></p>
                    <p>评估提示: <span v-for="i in item.assess">{{i}}</span></p>
                    <p>其他建议: <span v-for="i in item.other">{{i}}</span></p>
                  </div>
                </el-collapse-item>
                <el-collapse-item v-if="recordInfo.otherSystem!==undefined">
                  <template slot="title">
                    <p>总结</p>
                  </template>
                  <div>
                    <p>总结: <span v-for="item in recordInfo.summary">{{item}}</span></p>
                  </div>
                </el-collapse-item>
                <el-collapse-item v-if="recordInfo.healthAdviceList!==undefined" title="健康建议">
                  <p v-for="item in recordInfo.healthAdviceList" :key="item" style="margin-bottom: 1rem">
                    {{item}}
                  </p>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="success" @click="dialogArchivesType3 = false">关闭</el-button>
            </div>
          </el-dialog>
          <el-dialog title="档案详情" :visible.sync="dialogArchivesType4">
            <div class="health-records">
              <div class="content-title">
                <h4>{{recordInfo.title}}</h4>
                <p>{{recordInfo.reportDate}}</p>
                <p>姓名:{{recordInfo.name}}</p>
                <p>年龄:{{recordInfo.age}}</p>
                <p>性别:{{recordInfo.sex}}</p>
                <p>医生:{{recordInfo.doctor}}</p>
              </div>
              <div class="image-file">
                <h4>影像文件</h4>
                <ul class="clearfix">
                  <li v-for="item in recordInfo.heatImages" :key="item"><img :src="item" alt=""></li>
                </ul>
              </div>
              <el-collapse accordion>
                <el-collapse-item title="体质分析">
                  <p>体质辨识结论：您的体质类型为{{recordInfo.tzAnalyse}}倾向（主要体质类型）</p>
                </el-collapse-item>
                <el-collapse-item :title="item.title" v-for="item in recordInfo.tzFeatures" :key="item">
                  <p>{{item['index']}}</p>
                  <p>{{item.content}}</p>
                  <div class="type4Result">
                    <p v-for="i in item.results" :class="i.result === true?'fontRed':'fontGary'">{{i.name}}</p>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="success" @click="dialogArchivesType4 = false">关闭</el-button>
            </div>
          </el-dialog>
          <el-dialog title="档案详情" :visible.sync="dialogArchivesType5">
            <div class="health-records">
              <p>{{recordInfo.title}}</p>
              <div class="content-title">
                <h4>{{recordInfo.title}}</h4>
                <p>{{recordInfo.reportDate}}</p>
                <p>姓名:{{recordInfo.name}}</p>
                <p>年龄:{{recordInfo.age}}</p>
                <p>性别:{{recordInfo.sex}}</p>
                <p>医生:{{recordInfo.doctor}}</p>
                <p>时间：{{recordInfo.reportDate}}</p>
              </div>
              <div class="image-file">
                <h4>影像文件</h4>
                <ul class="clearfix">
                  <li v-for="item in recordInfo.heatImages" :key="item"><img :src="item" alt=""></li>
                </ul>
              </div>
              <el-collapse accordion>
                <el-collapse-item title="主报告">
                  <div v-for="item in recordInfo.mainReport" :key="item.bodyRegions" style="margin-bottom: 1.4rem">
                    <h4>{{item.bodyRegions}}</h4>
                    <p>热源表现：{{item.heatSourcePerformance}}</p>
                    <p>评估提示：{{item.assessAdvice}}</p>
                    <p>建议检查：{{item.otherAdvice}}</p>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="保健建议">
                  <div v-for="item in recordInfo.healthAdvice" style="margin-bottom: 1.4rem">
                    <h4>{{item.title}}</h4>
                    <p>常见原因：<span v-for="i in item.causeList">{{i}}</span></p>
                    <p>保健建议：<span v-for="j in item.adviceList">{{j}}</span></p>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="success" @click="dialogArchivesType4 = false">关闭</el-button>
            </div>
          </el-dialog>

        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import {healthRecordDetail} from "../../service/getData";
  import {healthList} from "../../service/getData";
  import {delHealthFile} from "../../service/getData";

  export default {
    components: {
      headTop,
      navSide
    },
    data(){
      return{
        navOptions:['会员'],
        dialogFormVisible:false,
        editUserVisible:false,
        dialogArchivesType1: false,
        dialogArchivesType2: false,
        dialogArchivesType3: false,
        dialogArchivesType4: false,
        dialogArchivesType5: false,
        recordInfo:[],
        searchInfo:{
          keyword:'',
          store:'',
          startTime:'',
          endTime:''
        },
        // tableData:[],
        UserInfo:[],
        addUserInfo:[],
        options: [],
        tableData: []
      }
    },
    methods:{
      async delFile(id){
        this.$confirm('确认删除吗？').then(() => {
          delHealthFile(id).then((status) => {
            if(status.code === 0){
              this.$message.success('删除成功！');
              this.getInitData();
            }else{
              alert(status.msg);
            }
          });

        });
      },
      async getDetailData(id){
        this.recordInfo = [];
        let info = await healthRecordDetail(id);
        this.recordInfo = info.data.detail;
        switch (this.recordInfo.type) {
          case '1':{
            this.dialogArchivesType1 = true;
            this.dialogArchivesType2 = false;
            this.dialogArchivesType3 = false;
            this.dialogArchivesType4 = false;
            this.dialogArchivesType5 = false;
            break;
          }
          case '2':{
            this.dialogArchivesType1 = false;
            this.dialogArchivesType2 = true;
            this.dialogArchivesType3 = false;
            this.dialogArchivesType4 = false;
            this.dialogArchivesType5 = false;
            break;
          }
          case '3':{
            this.dialogArchivesType1 = false;
            this.dialogArchivesType2 = false;
            this.dialogArchivesType3 = true;
            this.dialogArchivesType4 = false;
            this.dialogArchivesType5 = false;
            break;
          }
          case '4':{
            // for(let i =0;i<this.recordInfo.tzFeatures.length;i++){
            //   for(let j =0;i<this.recordInfo.tzFeatures[i].results.length;j++){
            //     ;
            //     this.recordInfo.tzFeatures[i].results[j].result === true? this.recordInfo.tzFeatures[i].results[j].result='fontRed': this.recordInfo.tzFeatures[i].results[j].result='fontGary';
            //   }
            // }
            this.dialogArchivesType1 = false;
            this.dialogArchivesType2 = false;
            this.dialogArchivesType3 = false;
            this.dialogArchivesType4 = true;
            this.dialogArchivesType5 = false;
            break;
          }
          case '5':{
            this.dialogArchivesType1 = false;
            this.dialogArchivesType2 = false;
            this.dialogArchivesType3 = false;
            this.dialogArchivesType4 = false;
            this.dialogArchivesType5 = true;
            break;
          }
        }
      },
      async getInitData(){
        let info = await healthList(this.$route.params.id);
        this.tableData = info.data.list;
        for(let i =0;i<this.tableData.length;i++){
          switch (this.tableData[i].type) {
            case '1':{
              this.tableData[i].type = 'tmt专科报告';
              break;
            }
            case '2':{
              this.tableData[i].type = 'tmt体检报告';
              break;
            }
            case '3':{
              this.tableData[i].type = 'tmt健康评估';
              break;
            }
            case '4':{
              this.tableData[i].type = 'tmt体质报告';
              break;
            }
              case '5':{
                this.tableData[i].type = 'TMT医用红外热成像 - 检查报告';
                break;
            }
            case '100':{
              this.tableData[i].type = '体态检测报告';
              break;
            }
            default:{
              this.tableData[i].type = '报告';
              break;
            }
          }
        }
      }
    },
    mounted(){
      this.getInitData();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .health-records li{
    float: left;margin: 10px;
    width: 160px;
    height: 160px;
    padding: 5px 5px;
    border: 1px solid #e5e5e5;
  }
  .health-records li img{
    width: 100%;
    height: 100%;
  }
  .health-records h4 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .content-title{
    text-align: center;
  }
  .image-file{
    text-align: left;
    margin: .5rem 0;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e5e5;
  }
  .image-file h4{
    padding-bottom: 5px;
    border-bottom: 1px solid #e5e5e5;
  }
  .fontRed {
    color: red;
    font-size: 10px;
  }
  .fontGary{
    color: #cccccc;
    font-size:10px;
  }

</style>
