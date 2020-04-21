<template>
  <section class="scention-ht">
    <navSide></navSide>
    <section class="scention-wh">
      <headTop></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">会员管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>会员查看</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt clear infoTable">
          <span>用户信息</span>
          <div class="fll user-img mr-top"><img src="../../../images/lck.png" alt=""></div>
          <!--<div class="fll mr-top infoTable" style="width: 80%;border: 1px solid #ddccff">-->
          <table cellspacing="0" cellpadding="0" border="0" class="">
            <!--<caption>用户信息</caption>-->
            <tr>
              <td>编号：</td>
              <td>{{this.userInfo.id}}</td>
              <td>所属门店：</td>
              <td>{{this.userInfo.mendianId}}</td>
            </tr>
            <tr>
              <td>手机号码：</td>
              <td>{{this.userInfo.phone}}</td>
              <td>姓名：</td>
              <td>{{this.userInfo.name}}</td>
            </tr>
            <tr>
              <td>性别：</td>
              <td>{{this.userInfo.sex}}</td>
              <td>出生日期：</td>
              <td>{{this.userInfo.birthday}}</td>
            </tr>
            <tr>
              <td>身高：</td>
              <td>{{this.userInfo.height}}</td>
              <td>居住地：</td>
              <td>{{this.userInfo.address}}</td>
            </tr>
          </table>
          <!--</div>-->
        </div>
        <div class="box-pd-tblr1015 mr-top">
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label">账户余额</span>
              <p>{{this.userInfo.balance}}</p>
              <el-table :data="totalBalanceList" border  class="mr-top">
                <el-table-column prop="accountNumber" label="账户编号">
                </el-table-column>
                <el-table-column prop="accountName" label="账户名称">
                </el-table-column>
                <el-table-column prop="applyStore" label="适用门店">
                </el-table-column>
                <el-table-column prop="balance" label="余额">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label">已有卡卷</span>
              <el-tabs>
                <el-tab-pane>
                  <span slot="label">次卡</span>
                  <el-input v-model="projectName" placeholder="请输入次卡名称" style="width: 15rem;margin-right: 1rem;"></el-input><el-button type="success">查询</el-button>
                  <el-table :data="userCard" border class="mr-top">
                    <el-table-column prop="title" label="次卡">
                    </el-table-column>
                    <el-table-column label="包含项目">
                      <template slot-scope="scope">
                        <p v-for="item in scope.row.productList">{{item.name}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column label="适用门店">
                      <p>{{this.userInfo.mendianId}}</p>
                    </el-table-column>
                    <el-table-column prop="createDate" label="购买日期">
                    </el-table-column>
                    <el-table-column prop="indateEndDate" label="有效期至">
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label">疗程卡</span>
                  <el-input v-model="projectName" placeholder="请输入疗程卡名称" style="width: 15rem;margin-right: 1rem;"></el-input><el-button type="success">查询</el-button>
                  <el-table :data="courseCard" border class="mr-top">
                    <el-table-column prop="title" label="疗程卡">
                    </el-table-column>
                    <el-table-column prop="inProjects" label="包含项目">
                      <template slot-scope="scope">
                        <p v-for="item in scope.row.productList">{{item.name}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="applyStore" label="数量">
                      <template slot-scope="scope">
                        <p v-for="item in scope.row.productList">{{item.totalNum}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="balance" label="剩余次数">
                      <template slot-scope="scope">
                        <p v-for="item in scope.row.productList">{{item.remainNum}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="" label="适用门店">
                      <p>{{this.userInfo.mendianId}}</p>
                    </el-table-column>
                    <el-table-column prop="createDate" label="购买日期">
                    </el-table-column>
                    <el-table-column prop="indateEndDate" label="有效期至">
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label">健康管理卡</span>
                  <el-input v-model="projectName" placeholder="请输入健康管理卡名称" style="width: 15rem;margin-right: 1rem;"></el-input><el-button type="success">查询</el-button>
                  <el-table :data="healthyCard" border class="mr-top">
                    <el-table-column prop="title" label="健康管理卡">
                    </el-table-column>
                    <el-table-column  label="数量">
                      <template slot-scope="scope">
                        <p v-for="item in scope.row.productList">{{item.totalNum}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="balance" label="剩余次数">
                      <template slot-scope="scope">
                        <p v-for="item in scope.row.productList">{{item.remainNum}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column label="适用门店">
                      <p>{{this.userInfo.mendianId}}</p>
                    </el-table-column>
                    <el-table-column prop="createDate" label="购买日期">
                    </el-table-column>
                    <el-table-column prop="indateEndDate" label="有效期至">
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label">注册信息</span>
              <el-table :data="registerInfo" border class="mr-top">
                <el-table-column prop="registTime" label="注册时间">
                </el-table-column>
                <el-table-column prop="appType" label="注册来源">
                </el-table-column>
                <el-table-column prop="phoneOsVer" label="操作系统">
                </el-table-column>
                <el-table-column prop="lastLoginTime" label="系统版本号">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../../components/header/head';
  import navSide from '../../../components/nav/nav';
  import {vipInfo} from "../../../service/getData";
  import {balanceList} from "../../../service/getData";
  import {userBalance} from "../../../service/getData";
  import {purchasedGoods} from "../../../service/getData";



  export default {
      name: "viewVip",
      components: {
        headTop,
        navSide
      },
      data(){
        return{
          userInfo:{},
          totalBalance:'',
          cardInfo:"",
          registerInfo:[],
          totalBalanceList:[],
          userCard:'',
          courseCard:'',
          healthyCard:'',

      }
        },
      methods:{
        async getInitData(){
          let userId = this.$route.params['id'];
          this.userInfo = await vipInfo(userId);
          this.userInfo = this.userInfo['data']['detail'];
          this.registerInfo.push({
            registTime:this.userInfo['registTime'],
            appType:this.userInfo['appType'],
            phoneOs:this.userInfo['phoneOs'],
            phoneOsVer:this.userInfo['phoneOsVer']
          })
        },
        async getBalance(){
          let userId = this.$route.params['id'];
          let result1 = await userBalance(userId);
          let result2 = await balanceList(userId);
          this.totalBalance = result1['data']['detail']['totalBalance'];
          this.totalBalanceList = result2['data']['list'];
        },
        async getCardInfo(){
          let userId = this.$route.params['id'];
          this.userCard = await purchasedGoods(userId,1);
          this.userCard = this.userCard['data']['list'];
          this.courseCard = await purchasedGoods(userId,2);
          this.courseCard = this.courseCard['data']['list'];
          this.healthyCard = await purchasedGoods(userId,3);
          this.healthyCard = this.healthyCard['data']['list'];
        },
        async getRegisterInfo(){
          this.registerInfo['registTime'] = this.userInfo['registTime'];
          this.registerInfo['appType'] = this.userInfo['appType'];
          this.registerInfo['phoneOs'] = this.userInfo['phoneOs'];
          this.registerInfo['phoneOsVer'] = this.userInfo['phoneOsVer']
        }
      },
      mounted(){
        this.getInitData();
        this.getCardInfo();
        this.getBalance();
      }
    }
</script>
<style lang="scss" scoped>
  @import "../../../style/mixin";
  .infoTable table{
    border-collapse:collapse;
    width: 90%;
    height: 10rem;
    margin-top: 1rem;
  }
  .user-img{
    border-bottom: 1px solid #d0d0d0;
    border-top: 1px solid #d0d0d0;
    border-left: 1px solid #d0d0d0;
    padding: .5rem;
    width: 10%;
    min-width: 10%;
    height: 10rem;
  }
  .user-img img{
    width: 100%;
    height: 100%;
  }
  table td:nth-child(odd){
    background:#dbdbdb;
    text-align: right;
    width: 10%;
    min-width: 80px;
  }
  table td:nth-child(even){
    text-align: left;
  }
  .infoTable table tr {
  }
  .infoTable table td {
    padding: .5rem;
    border: 1px solid #d0d0d0;
  }
  .el-tab-pane p{
    color: #ff0000;
    font-weight: bold;
    font-size: .9rem;
  }
</style>
