<template>
  <section class="scention-ht">
    <navSide  active="办卡记录" title="营业"></navSide>
    <section class="scention-wh">
      <headTop active="营业"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>办卡记录</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span>
            <el-input v-model="formData.keyword" placeholder="订单/姓名/手机号" class="input-width"></el-input>
            <span>充值来源：</span>
            <el-select v-model="formData.appType" clearable  placeholder="全部">
              <el-option label="cms后台" value="cms"></el-option>
              <el-option label="公众号" value="wxgz"></el-option>
            </el-select>
            <span>销售人员：</span>
            <el-select v-model="formData.salesEmpId" slot="prepend" placeholder="全部">
              <el-option v-for="(item,index) in staffList" :label="item.name" :value='item.id' :key="index"></el-option>
            </el-select>
            <span>卡类型：</span>
            <el-select v-model="formData.shoppingType" slot="prepend" placeholder="全部">
              <el-option label="次卡" value="1"></el-option>
              <el-option label="疗程卡" value="2"></el-option>
              <el-option label="健康管理卡" value="3"></el-option>
            </el-select>

            <div class="mr-top">
              <span class="demonstration">消费时间：</span>
              <el-date-picker
                v-model="value6"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                :default-value="newDate"
                value-format="yyyy-MM-dd"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <el-row class="mr-top">
              <el-button type="primary" @click="clickAddSearch">查询</el-button>
              <el-button @click="onReset">重置</el-button>
            </el-row>
          </div>
        </div>
        <div class="box-content clearfix">
          <div class="mr-bottom clearfix">
            <el-row class="fll mr-right">
              <el-button type="primary" @click="getCardExport">导出</el-button>
            </el-row>
            <el-row class="fll">
              <el-button type="primary" @click="refresh">刷新</el-button>
            </el-row>
          </div>
          <el-table :data="table" border tooltip-effect="dark">
            <el-table-column prop="orderId" label="编号">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column prop="userName" label="姓名">
            </el-table-column>
            <el-table-column prop="createDate" label="办卡时间">
            </el-table-column>
            <el-table-column prop="title" label="商品名称">
            </el-table-column>
            <el-table-column prop="num" label="数量">
            </el-table-column>
            <el-table-column prop="receiptMoney" label="实收金额">
            </el-table-column>
            <el-table-column prop="shoppingTypeName" label="商品类型">
            </el-table-column>
            <el-table-column prop="appType" label="办卡来源">
            </el-table-column>
            <el-table-column label="销售人员">
              <template slot-scope="scope">
                <span v-for="item in scope.row.sales" :key="item.empId">{{ item.empName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="mendianName" label="关联门店">
            </el-table-column>
          </el-table>
          <div class="paging-postion">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="formData.pageNum"
              :page-sizes="[15, 30, 40, 50]"
              :page-size="formData.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="formData.total">
            </el-pagination>
          </div>
        </div>

      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import { getShoppingCardList,getStaffLists,cardExport } from "../../service/getData"
  export default {
    data () {
      return {
        select: '',
        selectPrice: '',
        value6: '',
        newDate:new Date(),
        navList:[
          {name:'充值记录',value:'#/rechargeRecord'},
          {name:'办卡记录',value:'#/cardRecord'},
          {name:'消费记录',value:'#/expensesRecord'}
        ],
        ///获取办卡记录列表
        formData:{
          mode:'system',//system所有办卡记录 mendian门店办卡记录
          keyword:'',//
          salesEmpId:'',//销售人员
          startTime:'',//
          endTime:'',//
          appType:'',//来源:wxgz-公众号,cms-后台
          shoppingType:'',//商品类型:1.次卡 2.疗程卡 3.健康管理卡
          pageNum:1,//
          pageSize:15,//
          total:0//
        },
        staffList:[  ],
        table: [],
        multipleSelection: []
      }
    },
    mounted:function(){
      this.getPhone()
    },
    methods: {
      getPhone(){
        if( this.$route.params.phone !== undefined ){
          this.formData.keyword = this.$route.params.phone
        }
        this.getReset()
        this.getStaffList('')

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.formData.pageNum = 1
        this.formData.pageSize = val
        this.getReset()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.formData.pageNum = val
        this.getReset()
      },
      resetDate(){
        if(this.value6!==''){
          this.formData.startTime = this.value6[0]+' 0:0:0'
          this.formData.endTime = this.value6[1]+' 23:59:59'
        }else{
          this.formData.startTime = ''
          this.formData.endTime = ''
        }
      },
      refresh(){
        //点击刷新
        this.onReset()
        this.formData.pageNum = 1
        this.getReset()
      },
      onReset(){
        //点击重置
        this.formData.keyword = ''
        this.formData.salesEmpId = ''
        this.formData.appType = ''
        this.formData.shoppingType = ''
        this.formData.startTime = ''
        this.formData.endTime = ''
        this.value6 = ''
      },
      clickAddSearch(){
        //点击查询
        this.formData.pageNum = 1
        this.getReset()
        console.log(this.formData)
      },
      async getStaffList(type){
        //获取员工列表
        const data = await getStaffLists(type)
        if(data.code === 0){
          this.staffList = data.data.list
        }else{
          this.$alert(data.msg)
        }

      },
      async getCardExport(){
        let res = await cardExport(this.formData)
        window.location.assign(res.data.detail, '_blank')
      },
      async getReset(){
        if(this.value6!==''){
          this.formData.startTime = this.value6[0]+' 0:0:0'
          this.formData.endTime = this.value6[1]+' 23:59:59'
        }
        //获取首页数据
        let data = await getShoppingCardList(this.formData)
       //
        if(data.code === 0){
          if(data.data.list[i].appType == 'wxgz'){
            data.data.list[i].appTypeName = '公众号' 
          }else{
            data.data.list[i].appTypeName = '门店' 
          }
          for(let i in data.data.list){
            switch(data.data.list[i].shoppingType){
              case 1:
                data.data.list[i].shoppingTypeName = '次卡'
              break
              case 2:
                data.data.list[i].shoppingTypeName = '疗程卡'
              break
              case 3:
                data.data.list[i].shoppingTypeName = '健康管理卡'
              break
            }
          }

          this.table = data.data.list //渲染页面数据
          this.formData.total = data.data.total//获得总数
        }else{
          this.$messege.error(data.msg)
        }
        //

      }
    },
    components: {
      headTop,
      navSide
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
</style>
