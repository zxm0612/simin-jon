<template>
  <section class="scention-ht">
    <navSide active="订单管理" title="订单" :navList="navList"></navSide>
    <section class="scention-wh">
      <headTop active="订单"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span>
            <el-input v-model="keyword" placeholder="订单号/姓名/手机号" class="input-width"></el-input>
            <span>订单来源：</span>
            <el-select v-model="appType" clearable  placeholder="全部">
              <el-option label="全部" value=""></el-option>
              <el-option label="公众号" value="wxgz"></el-option>
              <el-option label="cms后台" value="cms"></el-option>
            </el-select>
            <span>订单类型：</span>
            <el-select v-model="orderType" slot="prepend" placeholder="全部">
              <el-option label="全部" value=""></el-option>
              <el-option label="商品订单" value="1"></el-option>
              <el-option label="充值订单" value="2"></el-option>
            </el-select>
            <span>订单状态：</span>
            <el-select v-model="orderStatus" slot="prepend" placeholder="全部">
              <el-option label="全部" value=""></el-option>
              <el-option label="待付款" value="1"></el-option>
              <el-option label="已完成" value="2"></el-option>
              <el-option label="已关闭" value="3"></el-option>
              <el-option label="退款" value="4"></el-option>
            </el-select>
            <div class="block mr-top">
              <span class="demonstration">下单时间：</span>
              <el-date-picker
                v-model="value6"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-value="newDate"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
            <el-row class="mr-top">
              <el-button type="primary" @click="clickSearch">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-row>
          </div>
        </div>
        <div class="box-content clearfix">
          <div class="mr-bottom clearfix">
              <el-row class="fll mr-right">
                <el-button type="primary" @click="getExportOrder">导出</el-button>
              </el-row>
              <el-row class="fll">
                <el-button type="primary" @click="clickRefresh">刷新</el-button>
              </el-row>
            </div>
            <el-table :data="storesTabel" border >
              <el-table-column prop="orderId" label="订单编号">
              </el-table-column>
              <el-table-column prop="phone" label="手机号">
              </el-table-column>
              <el-table-column prop="userName" label="姓名">
              </el-table-column>
              <el-table-column prop="createDate" label="下单时间">
              </el-table-column>
              <el-table-column prop="totalMoney" label="订单金额">
              </el-table-column>
              <el-table-column prop="receiptMoney" label="实收金额">
              </el-table-column>
              <el-table-column prop="payType" label="支付方式">
              </el-table-column>
              <el-table-column prop="payTime" label="付款时间">
              </el-table-column>
              <el-table-column prop="orderType" label="订单类型">
              </el-table-column>
              <el-table-column prop="appType" label="订单来源">
              </el-table-column>
              <el-table-column prop="orderStatus" label="订单状态">
              </el-table-column>
              <el-table-column prop="mendianName" label="关联门店">
              </el-table-column>
              <el-table-column prop="operation" label="操作">
                <template slot-scope="scope">
                  <el-button @click="goOrderWiew(scope.row.orderId)" type="text" size="small">查看订单</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="paging-postion">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
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
  import { orderList,exportOrder } from "../../service/getData"
  export default {
    data () {
      return {
        select: '',
        selectPrice: '',
        keyword:'',//搜索关键词(订单号/姓名/手机号)
        appType:'',//订单来源:wxgz-公众号,cms-后台 空 默认全部
        orderType:'',//订单类型:1.商品订单 3.充值订单 空 默认全部
        orderStatus:'',//订单状态:1.待付款2.已完成3.已关闭4.退款
        startTime:'',//开始时间
        endTime:'',//开始时间
        value6: '',
        newDate:new Date(),
        storesTabel: [],
        //分页管理
        pageNum:1,//当前页面
        pageSize:10,//一页数据大小
        total:0,
        navList:[
          {name:'订单管理',value:'#/orderManager'}
        ],
      }
    },
    mounted:function(){
      this.search()
    },
    methods: {
      reset(){
        //重置
        this.keyword =''//搜索关键词(订单号/姓名/手机号)
        this.appType=''//订单来源:wxgz-公众号,cms-后台 空 默认全部
        this.orderType=''//订单类型:1.商品订单 3.充值订单 空 默认全部
        this.orderStatus=''//订单状态:1.待付款2.已完成3.已关闭4.退款
        this.startTime=''//开始时间
        this.endTime=''//开始时间
        this.value6= ''
      },
      clickRefresh(){
        //刷新
        this.pageNum = 1
        this.search()
      },
      clickSearch(){
        //点击查询
        if(this.value6 !== ''){
          this.startTime = this.value6[0] + ' 00:00:00'//开始时间
          this.endTime = this.value6[1] + ' 23:59:59'//结束时间
        }
        this.pageNum = 1
        this.search()
        //console.log(this.startTime,this.endTime)
      },
      goOrderWiew(orderId){
        // window.open('https://localhost:8080/#/lockOrder/'+orderId,'_blank')
        //location.href = 'locahost:8080/#/'+orderId
        this.$router.push({ path:'/lockOrder/'+orderId })//打开详情页面
      },
      async search(){
        let data = await orderList(
          this.keyword,
          this.orderType,
          this.orderStatus,
          this.startTime,
          this.endTime,
          this.appType,
          this.pageNum,
          this.pageSize,
        )

        for(let i in data.data.list){
          ///重新写下数据
          if( typeof data.data.list[i].orderType !== undefined){
            switch(data.data.list[i].orderType){
              case 1:
                data.data.list[i].orderType = '商品订单'
              break
              case 3:
              data.data.list[i].orderType = '充值订单'
              break
            }
          }
          if(typeof data.data.list[i].appType !== undefined){
            switch(data.data.list[i].appType){
              case 'cms':
                data.data.list[i].appType = '门店'
              break
              case 'wxgz':
              data.data.list[i].appType = '公众号'
              break
            }
          }
          if(typeof data.data.list[i].payType !== undefined){
            switch(data.data.list[i].payType){
              case 1:
                data.data.list[i].payType = '微信'
              break
              case 2:
              data.data.list[i].payType = '支付宝'
              break
              case 3:
              data.data.list[i].payType = '余额'
              break
            }
          }
          if(typeof data.data.list[i].orderStatus !== undefined){
            switch(data.data.list[i].orderStatus){
              case 1:
                data.data.list[i].orderStatus = '待付款'
              break
              case 2:
                data.data.list[i].orderStatus = '已完成'
              break
              case 3:
                data.data.list[i].orderStatus = '已关闭'
              break
              case 4:
                data.data.list[i].orderStatus = '退款'
              break

            }
          }
        }
        this.storesTabel = data.data.list
        this.total = data.data.total

      },
      async getExportOrder(){
        const res = await exportOrder(
          this.keyword,
          this.orderType,
          this.orderStatus,
          this.startTime,
          this.endTime,
          this.appType,
        )

        if(res.code === 0){
          console.log(res.data.detail)
          window.location.assign(res.data.detail, '_blank')
          //window.open('https://file.1haokj.com/cms/test/export/导出订单-201809061641.xls', '_blank')
        }

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.total = val
        this.search()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNum = val
        this.search()
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
