<template>
  <section class="scention-ht">
    <navSide active="账号管理" title="权限"></navSide>
    <section class="scention-wh">
      <headTop active="权限"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>账户管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span>
            <el-input v-model="keyword" placeholder="姓名/登录账号" class="input-width"></el-input>
            <span>所属角色：</span>
            <el-select v-model="roleId"  placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.roleName"
                :label="item.roleName"
                :value="item.roleId"
                >
              </el-option>
            </el-select>
            <div class="mr-top">
              <el-button type="primary" @click="clickSearch">查询</el-button>
              <el-button @click="clickReset">重置</el-button>
            </div>
          </div>
        </div>
        <div class="box-content clearfix">
          <div class="mr-bottom clearfix">
            <el-row class="fll mr-right">
              <el-button type="primary" @click="onAddBtn('form')">新增</el-button>
            </el-row>
            <el-row class="fll">
              <el-button type="primary" @click="upPages">刷新</el-button>
            </el-row>
          </div>
        <!--内容列表-->

          <el-table :data="storesTabel" border >
            <el-table-column  type="index" label="编号" width="100">
            </el-table-column>
            <el-table-column prop="loginName" label="登录账号">
            </el-table-column>
            <el-table-column prop="userName" label="姓名">
            </el-table-column>
            <el-table-column prop="roleList" label="所属角色">
              <template slot-scope="scope">
                <p v-for="(item,i) in scope.row.roleList" :key="i">{{item.roleName}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="loginCount" label="登录次数">
            </el-table-column>
            <el-table-column prop="loginDate" label="最后登录时间">
            </el-table-column>
            <el-table-column prop="loginIp" label="最后登录IP">
            </el-table-column>
            <el-table-column prop="loginFlagName" label="状态">
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <el-button @click="onEidtBtn(scope.row.userId)" type="text" size="small">编辑</el-button>
                <el-button type="text" @click="delItem(scope.row.userId)"  size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--新增账户-->
          <el-dialog :title="formName" :visible.sync="dialogFormVisible">
            <el-form :model="form" :label-width="formLabelWidth"  :rules="rules" ref="form" >
              <el-form-item label="姓名：" prop="userName">
                <el-input v-model="form.userName" auto-complete="on" placeholder="最多10个字" :maxlength="10" class="formwidth"></el-input>
              </el-form-item>
              <el-form-item label="手机号：" prop="phone">
                <el-input v-model="form.phone" auto-complete="off" class="formwidth"></el-input>
              </el-form-item>
              <el-form-item label="所属角色：" prop="roleList">
                <el-select v-model="form.roleList" multiple placeholder="请选择" class="formwidth">
                  <el-option
                    v-for="item in optionsRole"
                    :key="item.roleName"
                    :label="item.roleName"
                    :value="item.roleId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="关联门店："  prop="mendianId">
                <el-select v-model="form.mendianId"  placeholder="请选择" class="formwidth">
                  <el-option
                    v-for="item in optionsStore"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="登录账号：" prop="loginName">
                <el-input v-model="form.loginName" auto-complete="off" class="formwidth"></el-input>
              </el-form-item>
              <el-form-item label="登录密码：" prop="password">
                <el-input v-model="form.password"  type="password" placeholder="密码为6-20位" class="formwidth"></el-input>
              </el-form-item>
              <el-form-item label="状态：" >
                <el-switch v-model="formLoginFlag"
                  active-text="启用"
                  inactive-text="禁用"
                ></el-switch>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="success" @click="onSubmit('form')">确 定</el-button>
            </div>
          </el-dialog>

          <div class="paging-postion">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[15, 30, 40]"
              :page-size="pageSize"
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
  import { getSysuserList,mendianList,addSysuser,delSysuser,editSysuser,getSysuserDetail,getAllRoleList } from "../../service/getData"
  export default {
    data () {
      return {
        select: '',
        selectPrice: '',
        lableWidth:'95px',
        formLabelWidth: '95px',
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogAuthorizedRole:false,
        dialogformAuthorizedRole: false,
        dialogEditorRole: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        ///
        options: [],
        optionsRole: [],
        optionsStore: [],//关联门店列表
        valueRole: '',
        valueStore: '',//关联门店选择
        value: '',
        ///左边导航列表
        navList:[
          {name:'角色管理',value:'#/accountManager'},
          {name:'账户管理',value:'#/storeAccount'},
          {name:'操作日志',value:'#/operationLog'},
        ],
        //分页管理
        currentPage:1,
        pageSize:15,
        total:0,
        //查询表单参数
        keyword:'',
        roleId:'',//查询角色分类
        storesTabel: [],//显示数据列表
        //新增账户表单
        formName:'新增账户',
        form: {
          userName: '',
          phone: '',
          roleList: [],
          mendianId: '',
          loginName: '',
          password: '',
          loginFlag: 1
        },
        formLoginFlag:true,//关联form.loginFlag true = 1 false = 0
        rules:{
          //表单验证规则
          userName:[
            { required: true, message: '请输入账户名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          phone:[
            { required: true, min: 11, max: 11,  message: '请输入正确的手机号码', trigger: 'blur' }
          ],
          roleList:[
            { required: true, message: '请选择角色类型', trigger: 'change' }
          ],
          loginName:[
            { required: true, message: '请输入登录账户', trigger: 'change' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          // loginPassword:[
          //   { required: true, message: '请输入密码', trigger: 'blur' },
          //   { min: 6, max: 15, message: '长度在 6 到 15个字符', trigger: 'blur' }
          // ],

        },
      }
    },
    mounted:function(){
      this.getPages()
      this.lodStore()
      this.getResest()

    },
    methods: {
      async lodStore(){
        let pageSize = 10000
        let data = await this.getStoreList(pageSize)//获取关联门店
        //
        this.optionsStore = data.data.list
      },
      //重置
      clickReset(){
        this.keyword = ''
        this.roleId = ''
      },
      //刷新
      upPages(){
        this.keyword = ''
        this.roleId = ''
        this.currentPage=1
        this.getPages()
      },
      clickSearch(){
        //查询数据
        this.currentPage=1
        this.getPages()

      },
      async getStoreList(pageSize){
      ///获取第一页数据
        const data = await mendianList('','','',1,pageSize)
        if(data.code === 0){
          return data
        }else{
          this.$message.error(data.msg)
        }
      },
      async getPages(){
      ///获取第一页数据
        const data = await getSysuserList(this.keyword,this.roleId,this.currentPage,this.pageSize)
        for(let i in data.data.list){
          if(data.data.list[i].loginFlag == 1){
            data.data.list[i].loginFlagName = '启用'
          }else{
            data.data.list[i].loginFlagName = '禁用'
          }

        }
        this.storesTabel = data.data.list
        this.total = data.data.total
        console.log(this.storesTabel)
      },
      async getResest(){
        //获取角色列表
        const data = await getAllRoleList()
        this.options = data.data.list;
        this.optionsRole = this.options

      },
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.form.loginFlag = this.formLoginFlag ? '1' : '0'
            if(this.formName == '添加账户'){
              //添加账户
              addSysuser(this.form).then((data)=>{
                if(data.code === 0){
                  this.$refs['form'].resetFields()//重置信息
                  this.dialogFormVisible = false
                  this.$message.success('添加成功')
                  this.upPages()
                }else{
                  this.$message.error('添加失败'+data.msg)
                }
              })
            }else{
              for(let i in this.form){
                if(this.form[i] == ''){
                  this.form[i] = null
                }
              }
              console.log(this.formLoginFlag,this.form)
              //编辑账户
              editSysuser(this.form).then((data)=>{
                if(data.code === 0){
                  this.$refs['form'].resetFields()//重置信息
                  this.dialogFormVisible = false
                  this.$message.success('编辑成功')
                  this.upPages()//刷新数据
                }else{
                  this.$message.error(data.msg)
                }
              })
            }

          }else{
            this.$refs[fm].resetFields()
            return false
          }
        })
      },
      onAddBtn(fm){
        //this.$refs[fm].resetFields()
        this.form = {
          userName: '',
          phone: '',
          roleList: [],
          mendianId: '',
          loginName: '',
          password: '',
          loginFlag: 1
        }
       //this.$refs['form'].resetFields()
        //点击增加弹出框
        this.formName = '添加账户'
        this.dialogFormVisible = true


      },
      onEidtBtn(id){

        this.formName = '编辑账户'
        getSysuserDetail(id).then((data)=>{
          let obj = data.data.detail

          this.dialogFormVisible = true
          this.form.userName = obj.userName === undefined ? '' : obj.userName
          this.form.phone = obj.phone === undefined ? '' : obj.phone
          this.form.mendianId = obj.mendianId === undefined ? '' : obj.mendianId
          this.form.loginName = obj.loginName === undefined ? '' : obj.loginName
          this.form.password = null
          this.form.loginFlag = obj.loginFlag

          if(obj.roleList !== undefined && obj.roleList.length > 0){
            this.form.roleList = []
          }

          this.formLoginFlag  = this.form.loginFlag === '1' ? true : false
          this.form.userId = obj.userId
          for(let i in obj.roleList){
            this.form.roleList.push(obj.roleList[i].roleId)
          }
          console.log(this.form)

        })

      },
      delItem(id){
        //console.log(id)
        this.$confirm('确认删除改用户吗？').then(()=>{
          console.log(id)
          delSysuser(id).then((data)=>{
            if(data.code === 0){
              this.$message.success('操作成功')
              this.upPages()//刷新数据
            }else{
              this.$message.error('操作失败'+data.msg)
            }
          })
        })

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.total=val
        this.getPages()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage=val
        this.getPages()
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
  .formwidth{
    width: 16rem;
  }
</style>
