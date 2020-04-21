<template>
  <section class="scention-ht">
    <navSide active="疗程卡分类" title="产品" :navList="navList"></navSide>
    <section class="scention-wh">
      <headTop active="产品"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/cardCategory' }">产品</el-breadcrumb-item>
            <el-breadcrumb-item>疗程卡分类</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="box-content clearfix">
          <div class="mr-bottom clearfix">
            <el-row class="fll mr-right">
              <el-button type="success" @click="dialogFormVisible = true;active='新增疗程卡分类'">新增</el-button>
            </el-row>
            <el-row class="fll">
              <el-button type="success" @click="dialogFormRefresh = true">刷新</el-button>
            </el-row>
          </div>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="categoryName"
              label="分类名称"
            >
            </el-table-column>
            <el-table-column
              prop="cardNum"
              label="疗程卡数量"
            ></el-table-column>
            <el-table-column
              prop="sortData"
              label="排序"
            ></el-table-column>
            <el-table-column
              prop="operation"
              label="操作">
              <template slot-scope="scope">
                <el-button prop="options" type="text" size="small" @click="physiotherapyCategoryOptions(scope.row,1)">查看</el-button>
                <el-button prop="options" type="text" size="small" @click="physiotherapyCategoryOptions(scope.row,2)">编辑</el-button>
                <el-button prop="options" type="text" size="small" @click="physiotherapyCategoryOptions(scope.row,3)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog :title="active" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth" prop="categoryName">
              <el-input v-model="form.categoryName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth" prop="sortData">
              <el-input v-model.number="form.sortData" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="success" @click="add">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="查看疗程卡分类" :visible.sync="dialogViewFormVisible">
          <el-form :model="viewForm" :rules="rules" ref="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth" prop="categoryName">
              <el-input v-model="viewForm.categoryName" auto-complete="off" :disabled="viewStatus"></el-input>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input v-model="viewForm.sortData" auto-complete="off" :disabled="viewStatus"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogViewFormVisible = false">取 消</el-button>
            <el-button type="success" @click="dialogClick">确 定</el-button>
          </div>
        </el-dialog>
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
  import {physiotherapyCategory} from '../../service/getData';
  import {addPhysiotherapyCategory} from "../../service/getData";
  import {editPhysiotherapyCategory} from "../../service/getData";
  import {deletePhysiotherapyCategory} from "../../service/getData";
  import {webUrl} from "../../config/env";

  export default {
    components: {
      headTop,
      navSide
    },
    data() {
      return {
        rules:{
          categoryName:[
            { required: true, message: '请输入分类名', trigger: 'blur' },
            { max: 5, message: '长度小于五个字符', trigger: 'blur' }
          ],
          sortData:[
            {type:'number',message:'请输入数值类型',trigger:'blur'}
          ]
        },
        dialogStatus: false,
        dialogFormVisible: false,
        form: [],
        formLabelWidth: '120px',
        tableData:[],
        viewForm:{},
        dialogViewFormVisible:false,
        dialogDeleteVisible:false,
        deleteData:'',
        viewStatus:'',
        active:''
      }
    },
    mounted(){
      this.initData();
    },
    methods:{
      async initData(){
        this.tableData = [];
        let info =await physiotherapyCategory();
        info = info['data']['list'];
        console.log(info);
        for(let key=0;key<info.length;key++){
          this.tableData.push({
            id:info[key]['id'],
            categoryName:info[key]['name'],
            cardNum:info[key]['refCnt'],
            sortData:info[key]['sort'],
          });
        }
        console.log(this.tableData)
      },
      async deleteInfo(){
        console.log(this.deleteData)
        let status = await deletePhysiotherapyCategory(this.deleteData.id);

        this.dialogDeleteVisible = false;
        if(status.code===0){
          this.$message.success('删除成功');
          this.initData();
        }else{
          this.$message.error(status.message);
        }
      },
      async add(){
        if(this.form.categoryName === undefined){
          this.$message.error('分类名称不能为空！');
          return;
        }else if(!Number.isInteger(this.form.sortData)){
          this.$message.error('请输入数值型参数！');
          return;
        }else if(this.form.categoryName.length >5){
          this.$message.error('分类名称不能大于5！');
          return;
        }
        let status = await addPhysiotherapyCategory(this.form['categoryName'],this.form['sortData']);
        this.dialogFormVisible = false;
        this.initData();
        if(status.code===0){
          this.$message.success('新增成功');
          this.form.categoryName = '';
          this.form.sortData = '';
        }else{
          this.$message.error(status.message);
        }      },
      async physiotherapyCategoryOptions(info,key){
        switch (key) {
          case 1:{
            //说明产看被点击
            this.dialogViewFormVisible = true;
            this.viewStatus = true;
            this.viewForm = {
              categoryName: info['categoryName'],
              sortData: info['sortData']
            };
            return;
          }
          case 2:{
            //说明编辑被点击
            this.dialogViewFormVisible = true;
            this.viewStatus = false;
            this.viewForm = {
              categoryName: info['categoryName'],
              sortData: info['sortData'],
              id:info['id']
            };
            this.active = '编辑疗程卡分类';
            return;
          }
          case 3:{
            //说明删除被点击
            // let status = await deletePhysiotherapyCategory(info);
            // alert('删除成功！');
            this.dialogDeleteVisible = true;
            this.deleteData = info;
          }
        }
      },
      async dialogClick(){
        if(this.viewStatus === false){
          if(this.viewForm.categoryName.length>5){
            return this.$message.error('长度小于五个字符！');
          }
          let status = await editPhysiotherapyCategory(this.viewForm.id,this.viewForm.categoryName,this.viewForm.sortData);
          if(status.code === 0){
            this.$message.success('编辑成功！');
            this.initData();
            this.dialogViewFormVisible =false;
          }
        }else{
          this.dialogViewFormVisible =false;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";
  .full{
    @include wh(100%,100%);
    .main{
      @include wh(100%,auto);
    }
  }
</style>
