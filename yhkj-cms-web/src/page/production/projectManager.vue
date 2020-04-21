<template>
  <section class="scention-ht">
    <navSide active="项目管理" title="产品" :navList="navList"></navSide>
    <section class="scention-wh">
      <headTop active="产品"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/cardCategory' }">产品</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/projectManager'}">项目管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt box-border-b">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span><el-input style="width: 15rem" v-model="form.input" placeholder="输入商品名称搜索" @keyup.enter.native="getResult"></el-input>
            <el-row class="mr-top">
              <el-button type="success" @click="getResult">查询</el-button>
              <el-button @click="clkReset">重置</el-button>
            </el-row>
          </div>
        </div>
        <div class="box-content clearfix">
          <div class="mr-bottom clearfix">
            <el-row class="fll">
              <el-button type="success" @click="changeDialog">新增</el-button>
            </el-row>
            <el-row  class="fll mr-right" style="margin-left: 1rem">
              <el-button type="success" @click="clkreload">刷新</el-button>
            </el-row>
          </div>
        <div style="padding: 1rem 1.5rem">
          <el-table
            :data = this.tableData
            v-loading="loading"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="id"
              label="编号"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="商品名称"
            >
            </el-table-column>
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
              prop="duration"
              label="时长"
            ></el-table-column>
            <el-table-column
              prop="status"
              label="状态"
            >
              <template slot-scope="scope">
                {{scope.row.status === '1'?'上架':'下架'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作" >
              <template slot-scope="scope"  class="vip-postion">
                <el-button type="text" size="small" @click="clickOptions('view',scope.row.id)">查看</el-button>
                <el-button type="text" size="small" @click="clickOptions('edit',scope.row.id)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteClick(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
        <!--新增项目-->
        <el-dialog title="新增项目" :visible.sync="dialogViewFormVisible"  width="560px">
          <el-form  label-width="80px" :model="addFrom" ref="addFrom" >
            <el-form-item label="项目名称">
              <el-input v-model="addFrom.name" placeholder="最多20个字"></el-input>
            </el-form-item>
            <el-form-item label="项目时长">
              <el-input v-model="addFrom.duration" placeholder="" >
                <i slot="suffix">分钟 &nbsp;</i>
              </el-input>
            </el-form-item>
            <el-form-item label="项目封面">
              <el-input v-model="addFrom.duration" placeholder="" >
                <i slot="suffix">分钟 &nbsp;</i>
              </el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="一档价格">
                  <el-input v-model="addFrom.firstPrice" placeholder="￥" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="二档价格">
                  <el-input v-model="addFrom.secondPrice" placeholder="￥" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="三档价格">
                  <el-input v-model="addFrom.thirdPrice" placeholder="￥" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="是否上架">
              <el-switch v-model="addFrom.status"></el-switch>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="changeDialog">取 消</el-button>
            <el-button type="success" @click="submitForm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import { projectList } from "../../service/getData";
  import { deleteProject } from "../../service/getData";
  import { addProject } from "../../service/getData";

  export default {
    components: {
      headTop,
      navSide
    },
    data(){
      return{
        loading:true,
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
        navList:[
          {name:'次卡分类',
            value:'#/cardCategory'
          },
          {name:'疗程卡分类',value:'#/physiotherapyCategory'},
          {name:'项目管理',value:'#/projectManager'},
          {name:'商品管理',value:'#/commodityManager'}
        ],
        //分页管理
        pageNum:1,//当前页面
        pageSize:10,//一页数据大小
        pages:0,//总页数
        total:0,
        dialogViewFormVisible:false,
        addFrom:{
          name:'',
          firstPrice:'',
          secondPrice:'',
          thirdPrice:'',
          duration:'',
          status:true,
        },
      }
    },
    mounted:function(){
      ///load数据
      this.getResult()
    },
    methods:{
      clkreload(){
        this.pageNum = 1;
        this.getResult()
      },
      clkReset(){
        //重置数据
        this.form = {
          input:'',
          select:''
        }
      },
      async getResult(){
        this.loading = true;
        //this.form['select'],
        let result = await projectList(this.form.input,this.pageNum,this.pageSize);
        if(result.code === 0){
          for(let i=0; i<result.data.list; i++){
            console.log(result.data.list[i].shoppingType)
          }
          this.tableData = result['data']['list'];
          this.total = result['data'].total;
          this.tableData['price'] = [{
            firstPrice:this.tableData['firstPrice'],
            secondPrice:this.tableData['secondPrice'],
            thirdPrice:this.tableData['thirdPrice']
          }];
          this.loading = false
        }else{
          this.$message.error(result.msg);
        }

      },
      clickOptions(mode,id){
        this.$router.push('production/'+mode+'/'+id)
      },
      deleteClick(id){
                const that = this;
                this.$confirm('确认删除吗？')
                  .then(() => {
                    deleteProject(id).then((status) => {
                      if(status.code === 0 ){
                        that.$message.success('成功删除');
                        that.getResult();
                      }
                    });


          })


      },
      handleSizeChange(val) {
        //切换每一页数量
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getResult()
      },
      handleCurrentChange(val) {
        //分页
        this.pageNum = val;
        console.log(`当前页: ${val}`);
        //分页数据
        this.getResult()
      },
      changeDialog(){
        this.$router.push('/production/add/1')
        // this.dialogViewFormVisible = !this.dialogViewFormVisible;
      },
      async submitForm() {
        //提交新增项目
        const lgh = this.addFrom.name.length;
        if(lgh === 0 || lgh >20 ){
          this.$message.error('请输入正确的项目名称');
          return
        }
        let status = this.addFrom.status ? 1 : 0;
        let result = await addProject(
          this.addFrom.name,
          this.addFrom.firstPrice,
          this.addFrom.secondPrice,
          this.addFrom.firstPrice,
          this.addFrom.duration,
          status,
        );
        if(result.code === 0){
          this.$message.success('添加成功');
          this.dialogViewFormVisible = false;
          this.getResult()
        }else{
          this.$message.error(result.msg)
        }

      },
      edit(){
        //编辑项目
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
</style>
