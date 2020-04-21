<template>
  <section class="scention-ht">
    <navSide></navSide>
    <section class="scention-wh">
      <headTop active="门店"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
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
            <el-table-column prop="name" label="加盟商姓名">
            </el-table-column>
            <el-table-column prop="phone" label="联系电话">
            </el-table-column>
            <el-table-column prop="storesNunber" label="门店数量">
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block paging-postion">
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
        <div>
          <el-dialog title="新增加盟商" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="加盟商姓名：" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="备注：" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="success" @click="dialogFormVisible = false">确 定</el-button>
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
    export default {
      data(){
        return {
          storesTabel: [{
            number: '1',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "1",
            operation: '查看'
          }, {
            number: '2',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "2",
            operation: '查看'
          }, {
            number: '3',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "1",
            operation: '查看'
          }, {
            number: '4',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "3",
            operation: '查看'
          }, {
            number: '5',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "6",
            operation: '查看'
          }, {
            number: '6',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "1",
            operation: '查看'
          },{
            number: '6',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "1",
            operation: '查看'
          },{
            number: '6',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "1",
            operation: '查看'
          },{
            number: '6',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "1",
            operation: '查看'
          },{
            number: '6',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "1",
            operation: '查看'
          },{
            number: '6',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "1",
            operation: '查看'
          },{
            number: '6',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "1",
            operation: '查看'
          },{
            number: '6',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "1",
            operation: '查看'
          },{
            number: '6',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "1",
            operation: '查看'
          }, {
            number: '7',
            name: '郑新明',
            phone: '15816532456',
            storesNunber: "1",
            operation: '查看'
          }],
          dialogTableVisible: false,
          dialogFormVisible: false,
          dialogFormRefresh:false,
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
          formLabelWidth: '10rem'
        }
      },
      methods: {
        handleClick(row) {
          console.log(row);
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
