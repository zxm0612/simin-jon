<template>
  <section class="scention-ht">
    <navSide title="会员" active="会员管理" :navList="navList"></navSide>
    <section class="scention-wh">
      <headTop active="会员"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/vipManager'}">会员</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/vipManager'}">会员管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt box-border-b">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span><el-input placeholder="手机号码 / 姓名" class="input-width" v-model="searchInfo.keyword"></el-input><span>所属门店：</span><el-select v-model="searchInfo.store" placeholder="请选择">
            <el-option
              v-for="item in mendianBaseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
            <span>注册时间：</span>
            <el-date-picker
              v-model="startTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-value="newDate"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <el-row class="mr-top">
              <el-button type="primary" @click="getUserList(true)">查询</el-button>
              <el-button @click="clear">重置</el-button>
            </el-row>
          </div>
        </div>
        <div class="box-content clearfix">
          <div class="mr-bottom clearfix">
            <el-row class="fll mr-right">
              <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
            </el-row>
            <el-row class="fll">
              <el-button type="primary" @click="pageReload">刷新</el-button>
            </el-row>
            <el-row class="fll">
              <el-button type="primary" @click="importClick">调入</el-button>
            </el-row>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="sex" label="性别">
              <template slot-scope="scope">
                <p>{{scope.row.sex === 1?'男性':'女性'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄">
            </el-table-column>
            <el-table-column prop="balance" label="总余额"></el-table-column>
            <el-table-column prop="mendianName" label="所属门店">
            </el-table-column>
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
                    <li @click="goNewPage('rechargeRecord',scope.row.phone)">充值记录</li>
                    <li @click="goNewPage('cardRecord',scope.row.phone)">办卡记录</li>
                    <li @click="goNewPage('expensesRecord',scope.row.phone)">消费记录</li>
                  </ul>
                  <div slot="reference" class="name-wrapper">
                    <el-button type="text" size="small">更多</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="导入档案" :visible.sync="dialogArchives">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="https://testcms.1haokj.com/cms/api/appuser/healthRecord/import"
              :on-change="handleChange"
              :headers="headers"
              :data="importData"
              multiple
              :limit="3"
              :file-list="fileList"
              :on-success="uploadSuccess"
              :on-error="uploadError">
              <el-button size="small">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">
                导入文件不能超过10M，仅允许导入“xls”或“xlsx”格式文件！</div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogArchives = false">完成</el-button>
            </div>
          </el-dialog>

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

        <el-dialog title="新增会员" :visible.sync="dialogFormVisible">
          <el-form :rules="rules">
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="addPhone">
              <el-input auto-complete="off" v-model="addUserInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="addName">
              <el-input auto-complete="off" v-model="addUserInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio v-model="addUserInfo.sex" label=1 value=1>男性</el-radio>
              <el-radio v-model="addUserInfo.sex" label=2 value=2>女性</el-radio>
            </el-form-item>
            <el-form-item label="出生日期" :label-width="formLabelWidth">
              <el-date-picker
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="addUserInfo.birthday"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="身高" :label-width="formLabelWidth" prop="height">
              <el-input auto-complete="off" v-model.number="addUserInfo.height" placeholder="单位：cm"></el-input>
            </el-form-item>
            <el-form-item label="住址" :label-width="formLabelWidth">
              <el-input auto-complete="off" v-model="addUserInfo.address"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑会员" :visible.sync="editUserVisible">
          <el-form :rules="rules">
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="editPhone">
              <el-input auto-complete="off" v-model="editUserInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="editName">
              <el-input auto-complete="off" v-model="editUserInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio v-model="editUserInfo.sex.toString()" label='1' value='男性'>男性</el-radio>
              <el-radio v-model="editUserInfo.sex.toString()" label='2' value='女性'>女性</el-radio>
            </el-form-item>
            <el-form-item label="出生日期" :label-width="formLabelWidth">
              <el-date-picker
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="editUserInfo.birthday"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="身高" :label-width="formLabelWidth" prop="height">
              <el-input auto-complete="off" v-model.number="editUserInfo.height" placeholder="单位：cm"></el-input>
            </el-form-item>
            <el-form-item label="住址" :label-width="formLabelWidth">
              <el-input auto-complete="off" v-model="editUserInfo.address"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editUserVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUser">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="调入会员" :visible.sync="importUserVisible">
          <el-form>
            <el-form-item>
              <el-input v-model="importUserData" placeholder="输入手机号搜索"></el-input><el-button @click="searchImportUser">查询</el-button>
              <el-input disabled="true" v-model="importUserName.name"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="importUserVisible = false">取 消</el-button>
            <el-button type="primary" @click="importUser">确 定</el-button>
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
  import {mendianBaseInfo} from "../../service/getData";
  import {isPoneAvailable} from "../../config/reg";
  import {getAge} from "../../config/tools";
  import {searchPhone} from "../../service/getData";
  import {moveVip} from "../../service/getData";

  export default {
    components: {
      headTop,
      navSide
    },
    data(){
      let checkName = (rule,value,callback) =>{
        if(this.addUserInfo.name === undefined || this.addUserInfo.name === ''){
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
      let checkHeight =(rule,value,callback) => {
        if(this.addUserInfo.height<140||this.addUserInfo.height>250){
          if(this.addUserInfo.height !=null){
            callback(new Error('身高范围140-250'));
          }
        }
      };
      let checkHeightEdit =(rule,value,callback) => {
        if(this.editUserInfo.height<140||this.editUserInfo.height>250){
          if(this.editUserInfo.height !=null){
            callback(new Error('身高范围140-250'));
          }else if(!Number.isInteger(this.editUserInfo.height)){
            callback(new Error('请输入整数类型！'));
          }
        }
      };
      return{
        importUserVisible:false,
        importUserData:'',
        importUserName:{
          id:'',
          name:''
        },
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
          editName:[
            {validator:checkNameEdit,trigger:'blur'}
          ],
          addPhone:[
            { validator: checkPhone, trigger: 'blur' }
          ],
          editPhone:[
            {validator:checkPhoneEdit,trigger:'blur'}
          ],
          height:[
            // {type:'number',message:'请输入数值类型！',trigger:'blur'},
            {validator:checkHeight,trigger:'blur'}
          ],
          heightEdit:[
            // {type:'number',message:'请输入数值类型！',trigger:'blur'},
            {validator:checkHeightEdit,trigger:'blur'}
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
        startTime:[],
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
          phone:null,
          height:null,
          sex:'',
          address:null,
          birthday:null
        },
        navList:[
          {name:'会员管理',
            value:'#/vipManager'
          },
        ],
        fileList:[],
        fileForm:{
          userId:'',
          file:null
        },
        mendianBaseList:[],
        newDate:new Date(),
        userId:'',
        pageNum:1,
        pageSize:10,
        total:0
      }
    },
    methods:{
      async searchImportUser(){
        if(this.importUserData === ''){
          this.$message.error('请输入手机号！');
        }
        let info = await searchPhone(this.importUserData);
        if(info.code === 0){
          this.importUserName.name = info.data.detail.name;
          this.importUserName.id = info.data.detail.id;
        }else{
          alert(info.msg);
        }
      },
      async importUser(){
        let status = await moveVip(this.importUserName)
      },
      goNewPage(path,phone){
        this.$router.push({
          name:path,
          params:{
            phone:phone
          }
        })
      },
      async getMendianList(){
        let info = await mendianBaseInfo();
        this.mendianBaseList = info['data']['list'];
      },
      async getUserList(status = false){
        if(status === true){
          this.pageNum = 1;
          this.pageSize = 10;
        }
        this.startTime[0]===undefined||this.startTime[0]===null?this.startTime=['','']:this.startTime.push('');
        let userInfo = await vipList(
          this.searchInfo.keyword,
          this.searchInfo.store,
          this.startTime[0],
          this.startTime[1],
          this.pageNum,
          this.pageSize
        );
        this.startTime = [];
        this.total = userInfo.data.total;//获得总数据长度
        userInfo = userInfo['data']['list'];
        this.tableData = userInfo;
        for(let i =0;i<this.tableData.length;i++){
          this.tableData[i].age= getAge(this.tableData[i].birthday);
        }
      },
      async getUserDetails(id){
        let UserDetails = await vipInfo(id);
        UserDetails = UserDetails['data']['details'];
        Object.keys(UserDetails).forEach(key =>{
          UserInfo[key] = UserDetails[key];
        });
      },
      async editUser(){
        if(this.editUserInfo['name'] === undefined){
          this.$message.error('请输入会员名称！');
          return;
        }else if(this.editUserInfo['phone'] === undefined){
          this.$message.error('请输入手机号！');
          return;
        }
        //console.log(this.editUserInfo)
        // this.editUserInfo.sex === '男性'?this.editUserInfo.sex=1:this.editUserInfo.sex=2;
        let status = await editVip(
          this.editUserInfo['id'],
          this.editUserInfo['name'],
          this.editUserInfo['phone'],
          this.editUserInfo['sex'],
          this.editUserInfo['birthday'],
          this.editUserInfo['height'],
          this.editUserInfo['address']
        );
        if(status.code === 0){
          // for(let i in this.editUserInfo){
          //   this.editUserInfo[i] = null
          // }
          this.editUserVisible = false;
          this.$message.success('编辑成功');
          this.getUserList();
        }

      },
      pageReload(){
        this.pageNum =1;
        this.getUserList();
      },
      async addUser(){
        if(this.addUserInfo['name'] === undefined||this.addUserInfo['name'] === ''){
          this.$message.error('请输入会员名称！');
          return;
        }else if(this.addUserInfo['phone'] === undefined||this.addUserInfo['phone'] === ''){
          this.$message.error('请输入手机号！');
          return;
        }
        // this.addUserInfo.sex === '男性'?this.addUserInfo.sex=1:this.addUserInfo.sex=2;

        let status = await addUser(this.addUserInfo['name'], this.addUserInfo['phone'], this.addUserInfo['sex'], this.addUserInfo['birthday']+' 00:00:00', this.addUserInfo['height'], this.addUserInfo['address']
        );
        if(status.code === 0){
          this.dialogFormVisible = false;
          this.addUserInfo = {};
          this.pageReload();
          this.$message.success('新增成功');
        }

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
            for(let i in UserDetails){
              this.editUserInfo[i] = UserDetails[i]
            }
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
      handleChange(file,files) {
        console.log(this.fileList)
      },
      importFile(id){
        this.dialogArchives = true;
        this.importData.userId = id;
        this.fileList = []
      },
      uploadSuccess (response, file, fileList) {
        this.$message.success('上传成功')
      },
      // 上传错误
      uploadError (response, file, fileList) {
        this.$message.error('上传失败');
        this.fileList = []
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
      this.getMendianList();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .el-popover__reference{
    display: inline;
  }
  .el-popover li{
    width: auto;
    text-align: center;
    line-height: 35px;
    display: block;
    cursor: pointer;
  }
</style>
