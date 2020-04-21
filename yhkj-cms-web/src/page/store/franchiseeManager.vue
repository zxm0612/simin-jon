<template>
  <section class="scention-ht">
    <navSide title="门店" active="门店管理" :navList="navList"></navSide>
    <section class="scention-wh">
      <headTop></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/storeManager' }">门店</el-breadcrumb-item>
            <el-breadcrumb-item>门店管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span>
              <el-input v-model="mendianInfo.input" placeholder="请输入门店名称" class="input-width" @keyup.enter.native="getMendianInfo(true)"></el-input>
            <span>门店性质：</span>
            <el-select v-model="mendianInfo.select" clearable  placeholder="全部">
              <el-option label="加盟" value="2"></el-option>
              <el-option label="直营" value="1"></el-option>
            </el-select>
            <span>价格档：</span>
            <el-select v-model="mendianInfo.selectPrice" slot="prepend" placeholder="全部">
              <el-option label="一档" value="1"></el-option>
              <el-option label="二档" value="2"></el-option>
              <el-option label="三挡" value="3"></el-option>
            </el-select>
            <el-row class="mr-top">
              <el-button type="success" @click="getMendianInfo(true)">查询</el-button>
              <el-button @click="clear">重置</el-button>
            </el-row>
           </div>
        </div>
        <div class="box-content clearfix">
          <div class="mr-bottom clearfix">
            <el-row class="fll mr-right">
              <el-button type="success" @click="addClick">新增</el-button>
            </el-row>
            <el-row class="fll">
              <el-button type="success" @click="getMendianInfo">刷新</el-button>
            </el-row>
          </div>
          <el-table :data="storesTabel" border v-loading="tableLoading">
            <el-table-column prop="id" label="编号">
            </el-table-column>
            <el-table-column prop="name" label="门店名称">
            </el-table-column>
            <el-table-column prop="shortName" label="门店简称">
            </el-table-column>
            <el-table-column prop="type" label="门店性质">
              <template slot-scope="scope">
                <p>{{scope.row.type ==='1'?'直营':'加盟'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="cityLevel" label="价格档">
            </el-table-column>
            <el-table-column label="门店电话">
              <template slot-scope="scope">
                <p v-for="item in scope.row.phoneList" :key="item">
                  {{item}}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="门店地址">
            </el-table-column>
            <el-table-column prop="empNum" label="员工人数">
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <p>{{scope.row.status ===1?'启用':'禁用'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="editClick(scope.row.id)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteClick(scope.row.id)">删除</el-button>
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
        <el-dialog title="删除确定" :visible.sync="dialogDeleteVisible">
          <span>确定删除吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDeleteVisible = false">取 消</el-button>
            <el-button type="success" @click=deleteInfo>确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import {mendianList} from "../../service/getData";
  import {deleteMendian} from "../../service/getData";

  export default {
    data () {
      let checkName = (rule,value,callback) =>{
        if(this.addUserInfo.name === ''){
          callback(new Error('用户名不能为空！'));
        }else{
          callback();
        }
      };
      return {
        select: '',
        selectPrice: '',
        dialogDeleteVisible:false,
        storesTabel: [],
        mendianInfo:{
          input:'',
          select:'',
          selectPrice:''
        },
        pageNum:1,
        pageSize:10,
        total:0,
        deleteId:'',
        tableLoading:false
      }
    },
    methods: {
      handleSizeChange(val) {
        //切换每一页数量
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getMendianInfo()
      },
      handleCurrentChange(val) {
        //分页
        this.pageNum = val;
        console.log(`当前页: ${val}`);
        //分页数据
        this.getMendianInfo()
      },
      clear(){
        this.mendianInfo = {
          input:'',
          select:'',
          selectPrice:''
        }
      },
      handleClick(id){
        this.$router.push('/lookstore/'+id);
      },
      editClick(id){
        this.$router.push('/storeChildren/'+id+'/edit')
      },
      addClick(){
        this.$router.push('storeChildren/1/add')
      },
      async getMendianInfo(status =false){
        if(status === true){
          this.pageSize = 10;
          this.pageNum = 1;
        }
        this.tableLoading = true;
        let info = await mendianList(this.mendianInfo.input,this.mendianInfo.select,this.mendianInfo.selectPrice,this.pageNum,this.pageSize);
        this.tableLoading = false;
        this.storesTabel=info['data']['list'];
        this.total = info['data'].total
      },
      async deleteClick(id){
        // let status = await deleteMendian(id);
        // alert('删除成功！');
        this.dialogDeleteVisible = true;
        this.deleteId = id;
      },
      async deleteInfo(){
        let status = await deleteMendian(this.deleteId);
        if(status.code === 0){
          this.$message.success('删除成功！');
          this.dialogDeleteVisible = false;
          this.getMendianInfo();
        }else{
          this.$message.error(status.message);
          this.dialogDeleteVisible = false;
        }

      }
    },
      components: {
        headTop,
        navSide
      },
    mounted(){
      this.getMendianInfo();
    }
    }
</script>

 <style lang="scss" scoped>
  @import "../../style/mixin.scss";
</style>
