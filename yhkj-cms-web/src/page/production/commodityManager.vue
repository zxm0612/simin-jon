<template>
  <section class="scention-ht">
    <navSide active="商品管理" title="产品" :navList="navList"></navSide>
    <section class="scention-wh">
    <headTop active="产品"></headTop>
    <div id="main">
      <div class="head-separator">
        <el-breadcrumb separator="/" class="head-quote">
          <el-breadcrumb-item :to="{ path: '/cardCategory' }">产品</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content-box-ipt box-border-b">
        <span>筛选查询</span>
        <div class="mr-top head-input">
          <span>输入搜索：</span><el-input style="width: 15rem" v-model="form.input" @keyup.enter.native="getResult"></el-input>
          <span >商品类型：</span>
          <el-select v-model="form.select" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-row class="mr-top">
            <el-button type="success" @click="getResult">查询</el-button>
            <el-button @click="clear">重置</el-button>
          </el-row>
        </div>
      </div>
      <div class="box-content clearfix">
        <div class="mr-bottom clearfix">
          <el-row class="fll">
            <el-button type="success" @click="add">新增</el-button>
          </el-row>
          <el-row  class="fll mr-right" style="margin-left:1rem ">
            <el-button type="success" @click="$router.go(0)">刷新</el-button>
          </el-row>
        </div>
      <div style="padding: 1rem 1.5rem">
        <el-table
        :data = this.tableData
        border
        style="width: 100%"
        >
          <el-table-column
          prop="id"
          label="编号"
          ></el-table-column>
          <el-table-column
          prop="title"
          label="商品名称"
          >
          </el-table-column>
          <el-table-column
          label="商品封面"
          >
            <template slot-scope="scope">
              <img :src=scope.row.cover alt="" style="width: 8rem;height: 8rem">
            </template>
          </el-table-column>
          <el-table-column
          prop="shoppingType"
          label="商品类型"
          ></el-table-column>
          <el-table-column
          prop="shoppingCategoryName"
          label="所属分类"
          ></el-table-column>
          <el-table-column
          label="商品价格"
          >
            <template slot-scope="scope">
              <p>一档：￥{{scope.row.firstPrice}}</p>
              <p>二档：￥{{scope.row.secondPrice}}</p>
              <p>三档：￥{{scope.row.thirdPrice}}</p>
            </template>
          </el-table-column>
          <el-table-column
          prop="status"
          label="状态"
          >
            <template slot-scope="scope">
              {{scope.row.status === 1 ? '上架':'下架'}}
            </template>
          </el-table-column>
          <el-table-column
          prop="operation"
          label="操作"
          >
            <template slot-scope="scope"  class="vip-postion">
              <el-button type="text" size="small" @click="viewCommodity(scope.row.id)">查看</el-button>
              <el-button type="text" size="small" @click="editCommodity(scope.row.id)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteCommodityInfo(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      </div>
      <el-dialog title="删除确定" :visible.sync="dialogDeleteVisible">
        <span>确定删除吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDeleteVisible = false">取 消</el-button>
            <el-button type="success" @click=deleteInfo>确 定</el-button>
          </span>
      </el-dialog>
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
  </section>
  </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import {commodityList} from "../../service/getData";
  import {deleteCommodity} from "../../service/getData";
  import {webUrl} from "../../config/env";

  export default {
      components: {
        headTop,
        navSide
      },
    data(){
        return{
          deleteId:'',
          dialogDeleteVisible:false,
          form:{
            input:'',
            select:''
          },
          options:[{
            value:'1',
            label:'次卡'
          },
            {
              value:'2',
              label:'疗程卡'
            },
            {
              value:'3',
              label:'健康管理卡'
            }
          ],
          tableData:'',
          //分页管理
          pageNum:1,//当前页面
          pageSize:10,//一页数据大小
          pages:0,//总页数
          total:0,
        }
    },
    methods:{
      handleSizeChange(val) {
        //切换每一页数量
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getResult();
      },
      handleCurrentChange(val) {
        //分页
        this.pageNum = val;
        console.log(`当前页: ${val}`);
        //分页数据
        this.getResult()
      },
      async getResult(){
        let result = await commodityList(this.form['input'],this.form['select'],this.pageNum,this.pageSize);
        this.tableData = result['data']['list'];
        for(let i =0;i<this.tableData.length;i++){
          switch (this.tableData[i].shoppingType) {
            case 1:{
              this.tableData[i].shoppingType = '次卡';
              break;
            }
            case 2:{
              this.tableData[i].shoppingType = '疗程卡';
              break;
            }
            case 3:{
              this.tableData[i].shoppingType = '健康管理卡';
              break;
            }
          }
        }
        this.total = result['data'].total;
        this.tableData['price'] = [{
          firstPrice:this.tableData['firstPrice'],
          secondPrice:this.tableData['secondPrice'],
          thirdPrice:this.tableData['thirdPrice']
        }]
      },
      clear(){
        this.form.input = '';
        this.form.select = '';
      },
      add(){
        this.$router.push('/commodityAdd');
      },
      viewCommodity(id){
        this.$router.push('/commodity/'+id);
      },
      editCommodity(id){
        this.$router.push('/commodityEdit/'+id);
      },
      deleteCommodityInfo(id){
        this.dialogDeleteVisible = true;
        this.deleteId = id;
      },
      async deleteInfo(){
        let status = await deleteCommodity(this.deleteId);
        this.dialogDeleteVisible = false;
        if(status.code === 0){
          this.$message.success('删除成功！');
          this.getResult()
        }else{
          this.$message.error(status.message);
        }
      }
    },
    mounted(){
        this.getResult();
    }
    }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
</style>
