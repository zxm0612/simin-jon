<template>
  <section class="scention-ht">
    <navSide></navSide>
    <section class="scention-wh">
      <headTop active="预约"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">营业数据</a></el-breadcrumb-item>
            <el-breadcrumb-item>办卡记录</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span>
            <el-input v-model="input" placeholder="请输入门店名称" class="input-width"></el-input>
            <span>预约状态：</span>
            <el-select v-model="select" clearable  placeholder="全部">
              <el-option label="待销费" value="1"></el-option>
              <el-option label="已消费" value="2"></el-option>
              <el-option label="已取消" value="2"></el-option>
            </el-select>
            <span>预约来源：</span>
            <el-select v-model="selectPrice" slot="prepend" placeholder="全部">
              <el-option label="门店" value="1"></el-option>
              <el-option label="公众号" value="2"></el-option>
            </el-select>

              <span class="demonstration">预约时间：</span>
              <el-date-picker
                v-model="value6"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>

            <el-row class="mr-top">
              <el-button type="success">查询</el-button>
              <el-button>重置</el-button>
            </el-row>
          </div>
        </div>
        <div class="box-pd-tlr10 clearfix">
          <el-row class="fll">
            <el-button type="success" @click="dialogFormVisible = true">导出</el-button>
          </el-row>
          <el-row class="flr">
            <el-button type="success" @click="dialogFormRefresh = true">刷新</el-button>
          </el-row>
        </div>
        <div class="storeTabel">
          <el-table :data="storesTabel" border tooltip-effect="dark">
            <el-table-column prop="number" label="预约编号">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column prop="userName" label="姓名">
            </el-table-column>
            <el-table-column prop="projectName" label="项目名称">
            </el-table-column>
            <el-table-column prop="reservationTime" label="预约时间">
            </el-table-column>
              <el-table-column prop="reservationNumber" label="预约人数">
            </el-table-column>
            <el-table-column prop="amountMoney" label="金额">
            </el-table-column>
            <el-table-column prop="culinarian" label="调理师">
            </el-table-column>
            <el-table-column prop="reservationMode" label="预约方式">
            </el-table-column>
            <el-table-column prop="reservationSource" label="预约来源">
            </el-table-column>
            <el-table-column prop="reservationState" label="预约状态">
            </el-table-column>
            <el-table-column prop="reservations" label="预约门店">
            </el-table-column>
          </el-table>
          <div class="paging-postion">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
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
          projectName: '项目名称1',
          reservationTime: '2081-06-06',
          reservationNumber: '1',
          amountMoney: '542.00',
          culinarian: '调理师名称1',
          reservationMode: '次卡',
          reservationSource: '门店',
          reservationState: '待消费',
          reservations: '门店名称'
        }, {
          number: '2',
          phone: '15816863265',
          userName: '明哥哥',
          projectName: '项目名称2',
          reservationTime: '2081-06-06',
          reservationNumber: '1',
          amountMoney: '542.00',
          culinarian: '调理师名称2',
          reservationMode: '疗程卡',
          reservationSource: '公众号',
          reservationState: '已取消',
          reservations: '门店简称'
        }, {
          number: '3',
          phone: '15816863265',
          userName: '明哥哥',
          projectName: '项目名称3',
          reservationTime: '2081-06-06',
          reservationNumber: '3',
          amountMoney: '542.00',
          culinarian: '调理师名称3',
          reservationMode: '健康调理卡',
          reservationSource: '门店',
          reservationState: '已消费',
          reservations: '门店名称'
        }],
        multipleSelection: []
      }
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
  @import "../../style/mixin.scss";
</style>
