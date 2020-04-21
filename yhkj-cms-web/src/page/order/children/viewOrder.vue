<template>
  <section class="scention-ht">
    <navSide></navSide>
    <section class="scention-wh">
      <headTop active="订单"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">订单</a></el-breadcrumb-item>
            <el-breadcrumb-item>订单类型</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-button  @click="$router.go(-1)" size="small" >返回</el-button>
        <div class="content-box-ipt mr-bottom">
          <span>基本信息</span>
          <div class="storeTabel">
            <el-table :data="storesTabel" border >
              <el-table-column prop="number" label="订单编号">
              </el-table-column>
              <el-table-column prop="phone" label="手机号">
              </el-table-column>
              <el-table-column prop="userName" label="姓名">
              </el-table-column>
              <el-table-column prop="orderTime" label="下单时间">
              </el-table-column>
              <el-table-column prop="totalAmount" label="总金额">
              </el-table-column>
              <el-table-column prop="amountCollected" label="实收金额">
              </el-table-column>
              <el-table-column prop="paymentMethod" label="支付方式">
              </el-table-column>
              <el-table-column prop="orderType" label="订单类型">
              </el-table-column>
              <el-table-column prop="orderSource" label="订单来源">
              </el-table-column>
              <el-table-column prop="OrderStatus" label="订单状态">
              </el-table-column>
              <el-table-column prop="affiliatedStore" label="关联门店">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="content-box-ipt mr-bottom">
          <span>支付信息</span>
          <div class="storeTabel">
            <el-table :data="storesTabel" border >
              <el-table-column prop="totalAmount" label="总金额">
              </el-table-column>
              <el-table-column prop="amountCollected" label="实收金额">
              </el-table-column>
              <el-table-column prop="paymentMethod" label="支付方式">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="content-box-ipt mr-bottom">
          <span>商品信息</span>
          <div class="storeTabel">
            <el-table :data="storesTabe2" border >
              <el-table-column prop="commodityName" label="商品名称">
              </el-table-column>
              <el-table-column prop="commodityType" label="商品类型">
              </el-table-column>
              <el-table-column prop="originalPrice" label="原价">
              </el-table-column>
              <el-table-column prop="numbers" label="数量">
              </el-table-column>
              <el-table-column prop="amountMoney" label="金额">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="content-box-ipt mr-bottom">
          <p>备注:</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../../components/header/head'
  import navSide from '../../../components/nav/nav'
  export default {
    data () {
      return {
        select: '',
        selectPrice: '',
        value6: '',
        storesTabel: [{
          number: '1',
          phone: '15816863265',
          userName: '明哥哥',
          orderTime: '2081-06-06',
          totalAmount: '542.00',
          amountCollected: '542.00',
          paymentMethod: '余额',
          orderType: '商品',
          orderSource: '公众号',
          OrderStatus: '已关闭',
          affiliatedStore: '门店名称'
        }],
        storesTabe2: [{
          commodityName: '健康管理卡名称',
          commodityType: '健康管理卡',
          originalPrice: '100.00',
          numbers: '1',
          amountMoney: '542.00',
        }]
      }
    },
    mounted:function(){
      console.log(this.$route.path)
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
</style>
