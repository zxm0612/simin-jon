<template>
  <section class="scention-ht">
    <navSide title="会员管理" :options="this.navOptions"></navSide>
    <section class="scention-wh">
      <headTop active="会员"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">会员管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>健康档案</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt box-border-b">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span><el-input class="input-width"></el-input><span>所属部门：</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span>注册时间：</span>
            <el-date-picker
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
        <div class="box-pd-tblr1015" >
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="title" label="报告名称"></el-table-column>
            <el-table-column prop="type" label="设备名称"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column prop="date" label="操作">
              <template slot-scope="scope"  class="vip-postion">
                <el-button prop="options" type="text" size="small" @click="dialogArchives = true">详情</el-button>
                <el-button prop="options" type="text" size="small" >删除</el-button>
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
          <!--健康档案对话框-->
          <el-dialog title="档案详情" :visible.sync="dialogArchives">
            <el-form model="form">
              此处档案内容
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogArchives = false">取 消</el-button>
              <el-button type="primary" @click="dialogArchives = false">确 定</el-button>
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
  import {healthList} from "../../service/getData";

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
        dialogArchives: false,
        searchInfo:{
          keyword:'',
          store:'',
          startTime:'',
          endTime:''
        },
        // tableData:[],
        UserInfo:[],
        addUserInfo:[],
        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '平台'
        }, {
          value: '选项3',
          label: '门店1'
        }, {
          value: '选项4',
          label: '门店2'
        }],
        tableData: [],
      }
    },
    methods:{
      async getInitData(){
        let info = await healthList(this.$route.params.id);
        this.tableData = info.data.list;
      }
    },
    mounted(){
      this.getInitData();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .el-popover__reference{
    display: inline;
  }
  .el-popover li{
    width: 100%;
    text-align: center;
    line-height: 1.8rem;
    display: block;
    cursor: pointer;
    border-bottom: 1px solid #e5e5e5;
  }
</style>
