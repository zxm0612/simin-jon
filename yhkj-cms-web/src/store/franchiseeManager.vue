<template>
  <section class="scention-ht">
    <navSide></navSide>
    <section class="scention-wh">
      <headTop></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span>
              <el-input v-model="input" placeholder="请输入门店名称" class="input-width"></el-input>
            <span>门店性质：</span>
            <el-select v-model="select" clearable  placeholder="全部">
              <el-option label="加盟" value="1"></el-option>
              <el-option label="直营" value="2"></el-option>
            </el-select>
            <span>价格档：</span>
            <el-select v-model="selectPrice" slot="prepend" placeholder="全部">
              <el-option label="一档" value="1"></el-option>
              <el-option label="二档" value="2"></el-option>
              <el-option label="三挡" value="3"></el-option>
            </el-select>
            <el-row class="mr-top">
              <el-button type="success">查询</el-button>
              <el-button>重置</el-button>
            </el-row>
           </div>
        </div>
        <div class="box-pd-tlr10 clearfix">
          <el-row class="fll">
            <el-button type="success" @click="dialogFormVisible = true">新增</el-button>
          </el-row>
          <el-row class="flr">
            <el-button type="success" @click="dialogFormRefresh = true">刷新</el-button>
          </el-row>
        </div>
        <div class="storeTabel">
          <el-table :data="storesTabel" border >
            <el-table-column prop="number" label="编号">
            </el-table-column>
            <el-table-column prop="storesName" label="门店简称">
            </el-table-column>
            <el-table-column prop="storesNature" label="门店性质">
            </el-table-column>
            <el-table-column prop="storesPrice" label="价格档">
            </el-table-column>
            <el-table-column prop="storesPhone" label="门店电话">
            </el-table-column>
            <el-table-column prop="storesAddrees" label="门店地址">
            </el-table-column>
            <el-table-column prop="storesStaff" label="员工人数">
            </el-table-column>
            <el-table-column prop="storesNunber" label="状态">
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
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
        storesTabel: [{
          number: '1',
          storesName: '恭喜发财',
          storesNature: '直营',
          storesPrice: '一档',
          storesPhone: '13585642451',
          storesAddrees: '深圳市哪里路哪里街道',
          storesStaff: '10',
          storesNunber: '禁用'
        }, {
          number: '1',
          storesName: '恭喜发财',
          storesNature: '直营',
          storesPrice: '一档',
          storesPhone: '13585642451',
          storesAddrees: '深圳市哪里路哪里街道',
          storesStaff: '10',
          storesNunber: '启用'
        }, {
          number: '1',
          storesName: '恭喜发财',
          storesNature: '直营',
          storesPrice: '一档',
          storesPhone: '13585642451',
          storesAddrees: '深圳市哪里路哪里街道',
          storesStaff: '10',
          storesNunber: '启用'
        },  {
          number: '1',
          storesName: '恭喜发财',
          storesNature: '直营',
          storesPrice: '一档',
          storesPhone: '13585642451',
          storesAddrees: '深圳市哪里路哪里街道',
          storesStaff: '10',
          storesNunber: '启用'
        }],
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
