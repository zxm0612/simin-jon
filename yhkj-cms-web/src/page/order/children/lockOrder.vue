<template>
  <section class="scention-ht">
    <navSide active="订单管理" title="订单" :navList="navList"></navSide>
    <section class="scention-wh">
      <headTop active="订单"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单类型({{ pageData.orderType }})</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-button  @click="$router.go(-1)" size="small" style="margin-top:15px;">返回</el-button>
        <div class="content-box-ipt mr-bottom">
          <span>基本信息</span>
          <div class="userInfo">
            <div class="ueserInformation userInfoTitle">
              <em>用户信息</em>
              <span>状态：<em>{{ pageData.orderStatus }}</em></span>
              <span>客户：<em>{{ pageData.phone }}</em></span>
              <span>门店：<em>{{ pageData.mendianName }}</em></span>
              <span>手机号码：<em>{{ pageData.orderStatus }}</em></span>
            </div>
            <div class="orderInfo userInfoTitle">
              <em>订单信息</em>
              <span>订单编号：<em>{{ pageData.orderId }}</em></span>
              <span>订单类型：<em>{{ pageData.orderType }}</em></span>
              <span>订单来源：<em>{{ pageData.appType }}</em></span>
              <span>支付时间：<em>{{ pageData.payTime }}</em></span>
              <span>下单时间：<em>{{ pageData.createDate }}</em></span>
            </div>
          </div>
        </div>
        <div class="content-box-ipt mr-bottom">
          <span>支付信息</span>
          <div class="userInfo">
            <span>总金额：<em>￥{{ pageData.totalMoney }}</em></span>
            <span>实收金额：<em>￥{{ pageData.receiptMoney }}</em></span>
            <span>支付方式：<em>{{ pageData.payType }}</em></span>
          </div>
        </div>
        <div class="content-box-ipt mr-bottom">
          <span>商品信息</span>
          <div class="userInfo">
            <el-table :data="pageData.orderItemList" border >
              <el-table-column prop="title" label="商品名称">
              </el-table-column>
              <el-table-column prop="shoppingType" label="商品类型">
              </el-table-column>
              <el-table-column prop="num" label="数量">
              </el-table-column>
              <el-table-column prop="price" label="原价">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="mr-bottom">
          <p>备注:{{ pageData.remark }}</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../../components/header/head'
  import navSide from '../../../components/nav/nav'
  import { orderDetail } from "../../../service/getData"
  export default {
    data () {
      return {
        select: '',
        selectPrice: '',
        value6: '',
        orderId:'',
        pageData: {},
        storesTabe2: [{

        }],
        navList:[
          {name:'订单管理',value:'#/orderManager'}
        ],
      }
    },
    mounted:function(){
      this.orderId = this.$route.params.id;
      this.getdata()
    },
    methods: {
      async getdata(){
        let data = await orderDetail(this.orderId);
        if(typeof data.data.detail.orderType !== undefined){
          switch(data.data.detail.orderType){
            case 1:
              data.data.detail.orderType = '商品订单';
            break;
            case 3:
              data.data.detail.orderType = '充值订单';
            break
          }
        }
        if(typeof data.data.detail.appType !== undefined){
          switch(data.data.detail.appType){
            case 'cms':
              data.data.detail.appType = 'cms后台';
            break;
            case 'wxgz':
              data.data.detail.appType = '微信公众号';
            break
          }
        }
        if(typeof data.data.detail.payType !== undefined){
          switch(data.data.detail.payType){
            case 1:
              data.data.detail.payType = '微信';
            break;
            case 2:
              data.data.detail.payType = '支付宝';
            break;
            case 3:
              data.data.detail.payType = '余额';
            break
          }
        }
        if(typeof data.data.detail.orderStatus !== undefined){
          switch(data.data.detail.orderStatus){
            case 1:
              data.data.detail.orderStatus = '待付款';
            break;
            case 2:
              data.data.detail.orderStatus = '已完成';
            break;
            case 3:
              data.data.detail.orderStatus = '已关闭';
            break;
            case 4:
              data.data.detail.orderStatus = '退款';
            break
          }
        }
        if(typeof data.data.detail.orderItemList !== undefined){
          for(let i in data.data.detail.orderItemList){
            switch(data.data.detail.orderItemList[i].shoppingType){
              case 1:
                data.data.detail.orderItemList[i].shoppingType = '次卡';
              break;
              case 2:
                data.data.detail.orderItemList[i].shoppingType = '疗程卡';
              break;
              case 3:
                data.data.detail.orderItemList[i].shoppingType = '健康管理卡';
              break

            }
          }
        }
        this.pageData = data.data.detail;
        console.log(this.pageData)
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    },
    components: {
      headTop,
      navSide
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin.scss";
  .userInfo{
    padding: 1rem 1rem;
  }
  .userInfoTitle>em{
    display: block;
    font-size: 14px;
    font-weight: bold;
  }
  .userInfo span{
    display: inline-block;
    width: 16rem;
    font-size: 14px;
  }
  .ueserInformation {
    width: 35% ;
    line-height: 1.8rem;
    display: inline-block;
    border-right: 1px solid #e5e5e5;
  }
  .orderInfo {
    width: 55%;
    line-height: 1.8rem;
    display: inline-block;
    padding-left: 3rem;
  }
</style>
