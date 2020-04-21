<template>
  <section class="scention-ht">
    <navSide active="操作日志" title="权限" :navList="navList"></navSide>
    <section class="scention-wh">
      <headTop active="权限"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">权限</a></el-breadcrumb-item>
            <el-breadcrumb-item>操作日志</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span>
            <el-input v-model="form.loginName" placeholder="操作人名称" class="input-width"></el-input>
            <span class="demonstration">操作时间：</span>
            <el-date-picker
                v-model="value6"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                :default-value="newDate"
                value-format="yyyy-MM-dd"
                end-placeholder="结束日期">
              </el-date-picker>
            <div class="mr-top">
              <el-button type="success" @click="onSearch">查询</el-button>
              <el-button @click="onReset">重置</el-button>
             </div>
          </div>
        </div>
        <div class="box-content clearfix">
          <el-table :data="storesTabel" border >
            <el-table-column prop="id" label="编号">
            </el-table-column>
            <el-table-column prop="sysUserName" label="操作人员">
            </el-table-column>
            <el-table-column prop="date" label="操作时间">
            </el-table-column>
            <el-table-column prop="ip" label="IP地址">
            </el-table-column>
            <el-table-column prop="title" label="菜单名称">
            </el-table-column>
            <el-table-column prop="" label="操作描述">
            </el-table-column>
          </el-table>
          <div class="paging-postion">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="form.pageNum"
              :page-sizes="[20, 40, 60, 80]"
              :page-size="form.pageSize"
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
  import { getSyslog } from "../../service/getData"
  export default {
    data () {
      return {
        select: '',
        selectPrice: '',
        value6:"",
        storesTabel: [],
        newDate:new Date(),
        form: {
          loginName: '',
          startTime: '',
          endTime: '',
          pageNum: 1,
          pageSize: 20
        },
        total:0,
        navList:[
          {name:'角色管理',value:'#/accountManager'},
          {name:'账户管理',value:'#/storeAccount'},
          {name:'操作日志',value:'#/operationLog'},
        ],
      }
    },
    mounted:function(){
     this.load()

    },
    methods: {
      onSearch(){
        ///点击搜索
        this.form.pageNum = 1
        this.load()
      },
      onReset(){
        this.form.loginName= ''
        this.value6
      },
      async load(){
        if(this.value6!==''){
          this.form.startTime = this.value6[0]+' 0:0:0'
          this.form.endTime = this.value6[1]+' 23:59:59'
        }
        const data = await getSyslog(this.form)
        this.storesTabel = data.data.list
        this.total = data.data.total
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.form.pageNum = 1
        this.form.pageSize = val
        this.load()

      },
      handleCurrentChange(val) {
        this.form.pageNum = val
        this.load()
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
