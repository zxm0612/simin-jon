<template>
  <section class="scention-ht">
    <navSide title="会员" active="会员管理" :navList="navList"></navSide>
    <section class="scention-wh">
      <headTop active="会员"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">会员管理</a></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt box-border-b">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span><el-input class="input-width" v-model="searchInfo.keyword"></el-input><span>所属门店：</span><el-input v-model="searchInfo.store" placeholder="请输入内容" class="input-width"></el-input>
            <span>注册时间：</span>
            <el-date-picker
              v-model="searchInfo.startTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <el-row class="mr-top">
              <el-button type="success" @click="getUserList">查询</el-button>
              <el-button @click="clear">重置</el-button>
            </el-row>
          </div>
        </div>
        <div class="box-pd-tlr10 clearfix">
          <el-row style="float:left">
            <el-button type="success" @click="dialogFormVisible = true">新增</el-button>
          </el-row>
          <el-row  style="float:right">
            <el-button type="success" @click="pageReload">刷新</el-button>
          </el-row>
        </div>
        <div class="storeTabel">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="balance" label="总余额"></el-table-column>
            <el-table-column prop="mendianName" label="所属门店"></el-table-column>
            <el-table-column prop="registTime" label="注册时间"></el-table-column>
            <el-table-column prop="lastLoginTime" label="最后登录时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope"  class="vip-postion">
                <el-button type="text" size="small" @click="tableOptions(scope.row.id,1)">查看</el-button>
                <el-button type="text" size="small" @click="tableOptions(scope.row.id,2)">编辑</el-button>
                <el-popover trigger="hover" placement="bottom">
                  <ul>
                    <li @click="importFile(scope.row.id)">导入档案</li>
                    <li @click="recordClick(scope.row.id)">健康档案</li>
                    <li >充值记录</li>
                    <li>办卡记录</li>
                    <li>消费记录</li>
                  </ul>
                  <div slot="reference" class="name-wrapper">
                    <el-button type="text" size="small">更多</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="导入档案" :visible.sync="dialogArchives">
            <el-form model="form">
              <el-upload
                class="upload-demo"
                action="https://testcms.1haokj.com/cms/api/appuser/healthRecord/import"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :headers="headers"
                :data="importData"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  导入文件不能超过10M，仅允许导入“xls”或“xlsx”格式文件！</div>
              </el-upload>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogArchives = false">取 消</el-button>
              <el-button type="primary" @click="dialogArchives = false">确 定</el-button>
            </div>
          </el-dialog>
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
        <el-dialog title="新增会员" :visible.sync="dialogFormVisible">
          <el-form :rules="rules">
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="addPhone">
              <el-input auto-complete="off" v-model="addUserInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="addName">
              <el-input auto-complete="off" v-model="addUserInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio v-model="addUserInfo.sex" label="男" value="男">男性</el-radio>
              <el-radio v-model="addUserInfo.sex" label="女" value="女">女性</el-radio>
            </el-form-item>
            <el-form-item label="出生日期" :label-width="formLabelWidth">
              <el-date-picker
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="addUserInfo.date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
              <el-form-item label="身高" :label-width="formLabelWidth" prop="height">
                <el-input auto-complete="off" v-model.number="addUserInfo.height"></el-input>
              </el-form-item>
              <el-form-item label="住址" :label-width="formLabelWidth">
                <el-input auto-complete="off" v-model="addUserInfo.address"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="success" @click="addUser">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑会员" :visible.sync="editUserVisible">
          <el-form :rules="rules2">
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="addPhone">
              <el-input auto-complete="off" v-model="editUserInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="addName">
              <el-input auto-complete="off" v-model="editUserInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
              <el-radio v-model="editUserInfo.sex" label="男" value="男">男性</el-radio>
              <el-radio v-model="editUserInfo.sex" label="女" value="女">女性</el-radio>
            </el-form-item>
            <el-form-item label="出生日期" :label-width="formLabelWidth">
              <el-date-picker
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="editUserInfo.date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="身高" :label-width="formLabelWidth">
              <el-input auto-complete="off" v-model="editUserInfo.height"></el-input>
            </el-form-item>
            <el-form-item label="住址" :label-width="formLabelWidth">
              <el-input auto-complete="off" v-model="editUserInfo.address"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="success" @click="editUser">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import {vipList} from '../../service/getData'
  import {editVip} from "../../service/getData"
  import {vipInfo} from "../../service/getData";
  import {addUser} from "../../service/getData";
  import {isPoneAvailable} from "../../config/reg";

  export default {
    components: {
      headTop,
      navSide
    },
    data(){
      let checkName = (rule,value,callback) =>{
        if(this.addUserInfo.name === ''){
          callback(new Error('用户名不能为空！'));
        }else{
          callback();
        }
      };
      let checkPhone = (rule,value,callback) => {
        if(this.addUserInfo.phone === ''){
          callback(new Error('手机号不能为空！'));
        }else {
          if (isPoneAvailable(this.addUserInfo.phone) !== true) {
            callback(new Error('请输入正确的手机号！'));
          }else{
            callback();
          }
        }
      };
      let checkNameEdit = (rule,value,callback) =>{
        if(this.editUserInfo.name === ''){
          callback(new Error('用户名不能为空！'));
        }else{
          callback();
        }
      };
      let checkPhoneEdit = (rule,value,callback) => {
        if(this.editUserInfo.phone === ''){
          callback(new Error('手机号不能为空！'));
        }else {
          if (isPoneAvailable(this.editUserInfo.phone) !== true) {
            callback(new Error('请输入正确的手机号！'));
          }else{
            callback();
          }
        }
      };
      return{
        headers:{
          Authorization:window.localStorage.Authorization
        },
        importData:{
          userId:''
        },
        navOptions:['会员'],
        dialogFormVisible:false,
        rules:{
          addName:[
            { validator: checkName, trigger: 'blur' }
          ],
          addPhone:[
            { validator: checkPhone, trigger: 'blur' }
          ],
          height:[
            {type:'number',message:'请输入数值类型！',trigger:'blur'}
          ]
        },
        rules2:{
          addName:[
            { validator: checkNameEdit, trigger: 'blur' }
          ],
          addPhone:[
            { validator: checkPhoneEdit, trigger: 'blur' }
          ],
          height:[
            {type:'number',message:'请输入数值类型！',trigger:'blur'}
          ]
        },
        dialogArchives:false,
        editUserVisible:false,
        searchInfo:{
          keyword:'',
          store:'',
          startTime:[],
          endTime:'',
        },
        formLabelWidth:'80px',
        tableData:[],
        UserInfo:[],
        editUserInfo:{
          id:'',
          phone:'',
          name:'',
          sex:'',
          birthday:'',
          height: '',
          address:''
        },
        addUserInfo:{
          name:'',
          phone:'',
          height:'',
          sex:'',
          address:'',
          birthday:''
        },
        userId:'',
        pageNum:1,
        pageSize:10,
        total:0
      }
    },
    methods:{
      async getUserList(){
        this.searchInfo.startTime[0]===undefined||this.searchInfo.startTime[0]===null?this.searchInfo.startTime=['','']:this.searchInfo.startTime.push('');
        let userInfo = await vipList(
          this.searchInfo.keyword,
          this.searchInfo.store,
          this.searchInfo.startTime[0],
          this.searchInfo.startTime[1],
          this.pageNum,
          this.pageSize
        );
        this.total = userInfo.data.total;//获得总数据长度
        userInfo = userInfo['data']['list'];
        this.tableData = userInfo;
      },
      async getUserDetails(id){
        let UserDetails = await vipInfo(id);
        UserDetails = UserDetails['data']['details'];
        Object.keys(UserDetails).forEach(key =>{
          UserInfo[key] = UserDetails[key];
        });
      },
      async editUser(){
        let status = await editVip(
          this.editUserInfo['id'],
          this.editUserInfo['name'],
          this.editUserInfo['phone'],
          this.editUserInfo['sex'],
          this.editUserInfo['date'],
          this.editUserInfo['height'],
          this.editUserInfo['address']
        );
        if(status['code'] === 200){
          alert('编辑成功');
        }
      },
      pageReload(){
        this.pageNum =1;
        this.getUserList();
      },
      async addUser(){
        let status = await addUser(
          this.addUserInfo['name'],
          this.addUserInfo['phone'],
          this.addUserInfo['sex'],
          this.addUserInfo['date'], this.addUserInfo['height'], this.addUserInfo['address']
        );
        this.dialogFormVisible = false;
        this.addUserInfo = {};
        this.pageReload();
        if(status.code === '200'){
        alert('新增成功！');}
      },
      async editUser(){
        let status = await editVip(this.editUserInfo['name'], this.editUserInfo['phone'], this.editUserInfo['sex'], this.editUserInfo['birthday'], this.editUserInfo['height'], this.editUserInfo['address']
        );
        this.dialogFormVisible = false;
        this.addUserInfo = {};
        this.pageReload();
        if(status.code === '200'){
          alert('新增成功！');}
      },
      async tableOptions(id,keyword){
        switch (keyword){
          case 1:{
            //当keyword为1时说明是查看被点击
            this.$router.push('/viewVip/'+id);
            return;
          }
          case 2:{
            //当keyword为2时说明是编辑被点击
            let UserDetails = await vipInfo(id);
            UserDetails = UserDetails['data']['detail'];
            this.editUserInfo={
              id:UserDetails['id'],
              phone:UserDetails['phone'],
              name:UserDetails['name'],
              sex:UserDetails['sex'],
              date: UserDetails['birthday'],
              height:UserDetails['height'],
              address:UserDetails['address']
            };
            this.editUserVisible = true;
            return;
          }
          case 3:{
            //当keyword为3时说明导入档案被点击
            this.dialogArchives = true;
            return;
          }
          case 4:{
            //当keyword为4时说明健康档案被点击
            return;
          }
        }
      },
      clear(){
        Object.keys(this.searchInfo).forEach(key =>{
          this.searchInfo[key] = '';
        });
      },
      recordClick(id){
        this.$router.push('/healthRecords/'+id)
      },
      handleSizeChange(val) {
        //切换每一页数量
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getUserList()
      },
      handleCurrentChange(val) {
        //分页
        this.pageNum = val;
        console.log(`当前页: ${val}`);
        this.getUserList()
      },
      importFile(id){
        this.dialogArchives = true;
        this.importData.userId = id;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    mounted(){
      this.getUserList();
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
