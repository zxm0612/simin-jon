<template>
  <section class="scention-ht">
    <navSide active="Banner" title="运营"></navSide>
    <section class="scention-wh">
      <headTop active="运营"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/bannerManager'}">运营</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/bannerManager'}">banner管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt box-border-b">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span>
            <el-input v-model="searchInfo.input" placeholder="请输入门店名称" class="input-width"></el-input>
            <span>活动类型：</span>
            <el-select v-model="searchInfo.select" placeholder="请选择">
              <el-option label="图片展示" value="1"></el-option>
              <el-option label="URL" value="2"></el-option>
              <el-option label="次卡" value="3"></el-option>
              <el-option label="疗程卡" value="4"></el-option>
            </el-select>
            <span>活动时间：</span>
            <el-date-picker
              v-model="startTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-value="newDate"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd hh:mm:ss"
            >
            </el-date-picker>
              <el-row class="mr-top">
                <el-button type="success" @click="searchClick">查询</el-button>
                <el-button @click="clear">重置</el-button>
              </el-row>
          </div>
        </div>
        <div class="box-content clearfix">
        <div class="mr-bottom clearfix">
          <el-row class="fll mr-right">
            <el-button type="success" @click="$router.push('/bannerEdit/add/0')">新增</el-button>
          </el-row>
          <el-row class="fll">
            <el-button type="success" @click="$router.go(0)">刷新</el-button>
          </el-row>
        </div>
          <el-table :data="storesTabel" border >
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="活动名称"></el-table-column>
            <el-table-column prop="img" label="封面图">
              <template slot-scope="scope">
                <img :src="scope.row.img" alt="" style="height: 100px;width: 150px">
              </template>
            </el-table-column>
            <el-table-column prop="type" label="活动类型"></el-table-column>
            <el-table-column prop="starDate" label="开始时间"></el-table-column>
            <el-table-column prop="endDate" label="结束时间"></el-table-column>
            <el-table-column prop="sort" label="排序"></el-table-column>
            <!--<el-table-column prop="uvpv" label="UV/PV"></el-table-column>-->
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="$router.push('/bannerChild/'+scope.row.id)">查看</el-button>
                <el-button type="text" size="small" @click="$router.push('/bannerEdit/edit/'+scope.row.id)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteBanner(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
          <div class="paging-postion" style="padding: 1rem 1.5rem">
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
    </section>
  </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import {bannerList} from "../../service/getData";
  import {delBanner} from "../../service/getData";

  export default {
    data(){
      return {
        pageNum:1,
        pageSize:10,
        total:0,
        searchInfo:{
          input:'',
          select:'',
        },
        startTime:[],
        storesTabel: [],
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
        formLabelWidth: '10rem',
        options: [{
          value: '选项1',
          label: '图片展示'
        }, {
          value: '选项2',
          label: 'url'
        }, {
          value: '选项3',
          label: '次卡'
        }, {
          value: '选项4',
          label: '疗程卡'
        }],
        value: '',
        value6: '',
        newDate: new Date(),

      }
    },
    methods: {
      clear(){
        this.searchInfo = {
          input:'',
          select:''
        };
        this.startTime = [];
      },
      handleClick(row) {
        console.log(row);
      },
      handleSizeChange(val) {
        //切换每一页数量
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.searchClick()
      },

      handleCurrentChange(val) {
        //分页
        this.pageNum = val;
        console.log(`当前页: ${val}`);
        this.searchClick()
      },
      async searchClick(){
        this.startTime[0]===undefined||this.startTime[0]===null?this.startTime=['','']:this.startTime.push('');
        let info = await bannerList(this.searchInfo.input,this.searchInfo.select,this.startTime[0],this.startTime[1],this.pageNum,this.pageSize);
        this.startTime = [];
        this.total = info.data.total;
        this.storesTabel = info.data.list;
        for(let i =0;i<this.storesTabel.length;i++){
          this.storesTabel[i].status === 1?this.storesTabel[i].status='上架':this.storesTabel[i].status='下架';
          switch (this.storesTabel[i].type) {
            case 1:{
              this.storesTabel[i].type = '图片展示';
              break;
            }
            case 2:{
              this.storesTabel[i].type = 'URL';
              break;
            }
            case 3:{
              this.storesTabel[i].type = '次卡';
              break;
            }
            case 4:{
              this.storesTabel[i].type = '疗程卡';
              break;
            }
          }
        }
      },
      deleteBanner(id){
        this.$confirm('确定删除吗?').then(()=>{
          delBanner(id).then((data)=>{
            if(data.code ===0){
              this.$message.success('删除成功！');
              this.searchClick();
            }else{
              alert(data.msg);
            }
          });
        })
      }
    },
    mounted(){
      this.searchClick();
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
