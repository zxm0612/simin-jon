<template>
  <section class="scention-ht">
    <navSide active="加盟商管理" title="门店" :navList="navList"></navSide>
    <section class="scention-wh">
      <headTop active="门店"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/storeManager' }">门店</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">加盟商管理</a></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="box-content clearfix">
          <div class="mr-bottom clearfix">
            <el-row class="fll mr-right">
              <el-button type="success" @click="dialogFormRefresh = true">新增</el-button>
            </el-row>
            <el-row class="fll">
              <el-button type="success" @click="getInitData">刷新</el-button>
            </el-row>
          </div>
          <el-table :data="storesTabel" border >
            <el-table-column prop="id" label="编号">
            </el-table-column>
            <el-table-column prop="name" label="加盟商姓名">
            </el-table-column>
            <el-table-column prop="phone" label="联系电话">
            </el-table-column>
            <el-table-column prop="mendianNum" label="门店数量">
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <el-button @click="viewClick(scope.row.id)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="editClick(scope.row.id)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteFranchisee(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block paging-postion">
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
        <div>
          <el-dialog title="加盟商" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules2">
              <el-form-item label="加盟商姓名：" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" auto-complete="off" :disabled="dialogStatus"></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="form.phone" auto-complete="off" :disabled="dialogStatus"></el-input>
              </el-form-item>
              <el-form-item label="备注：" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.remark" :disabled="dialogStatus"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="success" @click="enterClick">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="新增加盟商" :visible.sync="dialogFormRefresh">
            <el-form :model="newForm" :rules="rules">
              <el-form-item label="加盟商姓名：" :label-width="formLabelWidth" prop="addName">
                <el-input v-model="newForm.name" auto-complete="off" :disabled="dialogStatus"></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" :label-width="formLabelWidth" prop="addPhone">
                <el-input v-model="newForm.phone" auto-complete="off" :disabled="dialogStatus"></el-input>
              </el-form-item>
              <el-form-item label="备注：" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="newForm.remark" :disabled="dialogStatus"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormRefresh = false">取 消</el-button>
              <el-button type="success" @click="add">确 定</el-button>
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
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import {franchiseeList} from "../../service/getData";
  import {franchiseeInfo} from "../../service/getData";
  import {editFranchisee} from "../../service/getData";
  import {addFranchisee} from "../../service/getData";
  import {deleteFranchisee} from "../../service/getData";
  import {isPoneAvailable} from "../../config/reg";
  import {webUrl} from "../../config/env";

  export default {
      data(){
        let checkName = (rule,value,callback) =>{
          if(this.newForm.name === ''){
            callback(new Error('用户名不能为空！'));
          }
        };
        let checkPhone = (rule,value,callback) => {
          if(this.newForm.phone === ''){
            callback(new Error('手机号不能为空！'));
          }else {
            if (isPoneAvailable(this.newForm.phone) !== true) {
              callback(new Error('请输入正确的手机号！'));
            }else{
              callback();
            }
          }
        };let checkNameEdit = (rule,value,callback) =>{
          if(this.form.name === ''){
            callback(new Error('用户名不能为空！'));
          }
        };
        let checkPhoneEdit = (rule,value,callback) => {
          if(this.form.phone === ''){
            callback(new Error('手机号不能为空！'));
          }else {
            if (isPoneAvailable(this.form.phone) !== true) {
              callback(new Error('请输入正确的手机号！'));
            }else{
              callback();
            }
          }
        };

        return {
          storesTabel: [],
          rules:{
            addName:[
              { validator: checkName, trigger: 'blur' }
            ],
            addPhone:[
              { validator: checkPhone, trigger: 'blur' }
            ]
          },
          rules2:{
            name:[
              { validator: checkNameEdit, trigger: 'blur' }
            ],
            phone:[
              { validator: checkPhoneEdit, trigger: 'blur' }
            ]
          },
          deleteId:'',
          dialogTableVisible: false,
          dialogFormVisible: false,
          dialogFormRefresh:false,
          dialogDeleteVisible:false,
          dialogStatus:false,
          form: {
            name: '',
            remark: '',
            phone:'',
            id:''
          },
          newForm: {
            name: '',
            remark: '',
            phone:'',
            id:''
          },
          formLabelWidth: '10rem',
          //分页管理
          pageNum:1,//当前页面
          pageSize:10,//一页数据大小
          pages:0,//总页数
          total:0,
        }
      },
      methods: {
        handleSizeChange(val) {
          //切换每一页数量
          console.log(`每页 ${val} 条`);
          this.pageSize = val;
          this.getInitData()
        },
        handleCurrentChange(val) {
          //分页
          this.pageNum = val;
          console.log(`当前页: ${val}`);
          //分页数据
          this.getInitData()
        },
        handleClick(row) {
          console.log(row);
        },
        async getInitData(){
          let info = await franchiseeList(this.pageNum,this.pageSize);
          this.storesTabel = info['data']['list'];
          this.total = info.data.total;
        },
        async viewClick(id){
          let info = await franchiseeInfo(id);
          this.form = {
            name:info['data']['detail']['name'],
            phone:info['data']['detail']['phone'],
            remark:info['data']['detail']['remark'],
            id:info['data']['detail']['id']
          };
          this.dialogStatus = true;
          this.dialogFormVisible = true
        },
        async editClick(id){
          let info = await franchiseeInfo(id);
          this.form = {
            name:info['data']['detail']['name'],
            phone:info['data']['detail']['phone'],
            remark:info['data']['detail']['remark'],
            id:info['data']['detail']['id']
          };
          this.dialogStatus = false;
          this.dialogFormVisible = true
        },
        async enterClick(){
          if(this.form.name === ''||this.form.name===undefined){
            this.$message.error('请输入加盟商名称！');
            return;
          }else if(!isPoneAvailable(this.form.phone)){
            this.$message.error('请输入正确的手机号！');
            return;
          }
          if(this.dialogStatus === true){
            this.dialogFormVisible = false
          }else{
            let status = await editFranchisee(this.form.id,this.form.name,this.form.phone,this.form.remark);
            this.dialogFormVisible = false;
            if(status['code'] === 0){
              this.$message.success('编辑成功！');
              this.getInitData();
            }
          }
        },
        async add(){
          if(this.newForm.name === ''||this.newForm.name===undefined){
            this.$message.error('请输入加盟商名称！');
            return;
          }else if(!isPoneAvailable(this.newForm.phone)){
            this.$message.error('请输入正确的手机号！');
            return;
          }
          let status = addFranchisee(this.newForm.name,this.newForm.phone,this.newForm.remark);
          if(status.code===0){
            this.$message.success('新增成功！');
            this.getInitData();
          }else{
            alert(status.msg);
          }
          this.dialogFormRefresh = false;
        },
        deleteFranchisee(id){
          // let status = await deleteFranchisee(id);
          // alert('删除成功！');
          this.dialogDeleteVisible = true;
          this.deleteId = id;
        },
        async deleteInfo(){
          let status = await deleteFranchisee(this.deleteId);
          if(status.code===0){
            this.$message.success('删除成功！');
            this.getInitData();
          }else{
            alert(status.msg);
          }
          this.dialogDeleteVisible = false;
        }
      },
      mounted(){
        this.getInitData()
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
