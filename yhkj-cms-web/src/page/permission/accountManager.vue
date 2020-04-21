<template>
  <section class="scention-ht">
    <navSide active="角色管理" title="权限" :navList="navList"></navSide>
    <section class="scention-wh">
      <headTop active="权限"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span>
            <el-input v-model="input" placeholder="角色名称" class="input-width"></el-input>
            <div style="margin-left: .6rem;display: inline-block">
              <el-button type="primary" @click="onSearch">查询</el-button>
              <el-button @click="onR">重置</el-button>
            </div>
          </div>
        </div>
        <div class="box-content clearfix">
          <div class="mr-bottom clearfix">
            <el-row class="fll mr-right">
              <el-button type="primary" @click="clickAddRole">新增</el-button>
            </el-row>
            <el-row class="fll">
              <el-button type="primary" @click="clickResset">刷新</el-button>
            </el-row>
          </div>
          <el-table :data="storesTabel" border >
            <el-table-column prop="roleName" label="角色名称">
            </el-table-column>
            <el-table-column prop="remarks" label="备注">
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间">
            </el-table-column>
            <el-table-column prop="useable" label="状态">
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <el-button @click="getRoleMenu(scope.row.roleId)" type="text" size="small">授权设置</el-button>
                <el-button @click="clickEditRole(scope.row)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="selItem(scope.row.roleId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--新增角色-->
          <el-dialog :title="formName" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="95px">
              <el-form-item label="角色名称：" prop="roleName">
                <el-input v-model="form.roleName" placeholder="最多输入10个字" :maxlength="10"></el-input>
              </el-form-item>
              <el-form-item label="备注：" prop="remarks">
                <el-input type="textarea" v-model="form.remarks" placeholder="最多输入100个字符" ></el-input>
              </el-form-item>
              <el-form-item label="状态:">
                <el-switch v-model="formUseable"
                active-text="启用"
                inactive-text="禁用"
                ></el-switch>
                <!-- <el-input v-model="form.useable" placeholder="最多输入100个字符" ></el-input> -->
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="success" @click="getAddRole('form')">确 定</el-button>
            </div>
          </el-dialog>
          <!--授权设置-->
            <el-dialog title="授权设置" :visible.sync="dialogAuthorizedRole">
              <el-tree
                :data="data2"
                show-checkbox
                node-key="menuId"
                :check-strictly="true"
                ref="tree"
                children="childs"
                :default-expanded-keys="defaultExpandedKeys"
                :default-checked-keys="defaultCheckedKeys"
                label="menuName"
                :props="defaultProps">
              </el-tree>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAuthorizedRole = false">取 消</el-button>
                <el-button type="success" @click="gettree()">确 定</el-button>
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
  import { getAuthorityList,addRole,delRole,getAllMenuList,getRoleMenuList,editRole,saveRoleMenuList } from "../../service/getData"

  export default {
    data () {
      return {
        select: '',
        selectPrice: '',
        storesTabel: [],
        formName:'新增角色',
        form: {
          roleName: '',
          remarks: '',
          useable:1,
        },
        formUseable:true,
        formRoleId:1,
        formLabelWidth: '10rem',
        dialogTableVisible: false,//增加角色弹框
        dialogFormVisible: false,//
        dialogAuthorizedRole:false,//权限设置弹框
        dialogformAuthorizedRole: false,
        dialogEditorRole: false,//编辑角色弹框
        data2: [],
        //默认展开项
        defaultExpandedKeys:['1','2','3'],
        //设置选中项
        defaultCheckedKeys:[],
        defaultProps: {
          children: 'childs',
          label: 'fullName'
        },
        navList:[
          {name:'角色管理',value:'#/accountManager'},
          {name:'账户管理',value:'#/storeAccount'},
          {name:'操作日志',value:'#/operationLog'},
        ],
        input:'',
        currentPage:1,
        total:0,
        pageSize:15,
        rules:{
          //表单验证规则
          roleName:[
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          remarks:[
            { min: 0, max: 1000, message: '长度在 0 到 100 个字符', trigger: 'blur' }
          ]
        },
        roleId:''
      }
    },
    mounted:function(){
      this.getResest()
      this.getAllList()
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.getResest()
        //设置每页条数
      },
      handleCurrentChange(val) {
        //分页加载
        this.currentPage = val
        this.getResest()
      },
      async gettree(){
        ///设置权限
        const menuIdList = this.$refs.tree.getCheckedKeys()
        const data = await saveRoleMenuList({
          roleId:this.roleId,
          menuIdList:menuIdList
        })
        if(data.code === 0){
          this.$message.success('保存权限成功')
          this.dialogAuthorizedRole = false
        }else{
          this.$message.error('保存权限失败'+data.code)
          //this.dialogAuthorizedRole = false
        }

      },
      async getResest(){
        //获取数据
        const data = await getAuthorityList(this.input,this.currentPage,this.pageSize)
        //console.log(data,this.input,this.currentPage,this.pageSize)
        //this.storesTabel = data.data.list
        for(let i in data.data.list){
          if(data.data.list[i].useable == '0'){
            data.data.list[i].useable = '禁用'
          }else{
            data.data.list[i].useable = '启用'
          }
        }
        this.storesTabel = data.data.list
          this.total = data.data.total
      },
      onSearch(){
        this.currentPage = 1
        this.getResest()
      },
      onR(){
        this.input = ''
        this.currentPage = 1
      },
      clickResset(){
        //点击刷新
        this.input = ''
        this.currentPage = 1
        this.getResest()
      },
      clickAddRole(){
        this.dialogFormVisible = true
        ///点击新增会员序列化表单
        this.form.roleName = ''
        this.form.remarks = ''
        this.formName = '新增角色'

      },
      getAddRole(formName){
        //const that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //正则通过开始提交表单数据
            this.form.useable = this.formUseable ? '1' : '0'
            if(this.formName == '新增角色'){

              //进入新增角色
              console.log(this.form)
              addRole(this.form).then((data)=>{
                //console.log(data)
                if(data.code === 0){
                  this.$message.success('角色创建成功!')
                  this.dialogFormVisible = false
                  this.clickResset()
                }else{
                  this.$message.error(res.msg)
                }
              })
            }else{
              //进入编辑角色
              //console.log(this.formRoleId,this.form.roleName,this.form.remarks,this.form.useable)
              editRole(this.formRoleId,this.form.roleName,this.form.remarks,this.form.useable).then((res)=>{
                //console.log(data)
                if(res.code === 0){
                  this.$message.success('编辑完成!')
                  this.dialogFormVisible = false
                  this.clickResset()
                }else{
                  this.$message.error(res.msg)
                }
              })
            }
          } else {
            return false
          }
        })
      },
      clickEditRole(data){
        ///编辑角色
        this.dialogFormVisible = true
        console.log(data)
        ///序列化表单
        this.form.roleName = data.roleName
        this.form.remarks = data.remarks
        this.useable = data.useable === '启用' ? 1 : 0
        this.formUseable = this.useable === 1 ? true : false
        this.formName = '编辑角色'
        this.formRoleId = data.roleId
        // const res = await editRole(data.roleId,this.form.roleName,this.form.remarks,this.formUseable)
        // console.log(res)

      },
      selItem(roleId){
        //删除项目
        this.$confirm('确认删除改用户吗？')
        .then(() => {
          //const data = await delRole(id)
          console.log(roleId);
          delRole(roleId).then((data)=>{
            if(data.code === 0){
              this.$message.success('已经删除')
              this.clickResset()
            }else{
              this.$message.error(data.msg)
            }
          })
        })
      },
      ///获取所有权限
      async getAllList(){
        //this.dialogAuthorizedRole = true
        const data = await getAllMenuList()//获取所有权限列表
        this.data2 = data.data.list
        //console.log(JSON.stringify(data.data))
        //this.searchSuperNodeId(this.data2[0],'0400004')
      },
      async getRoleMenu(id){
        this.roleId = id
        ///获取角色权限
        this.dialogAuthorizedRole = true
        const data =  await getRoleMenuList(id)//获取所有权限列表
        this.defaultExpandedKeys = []
        this.defaultCheckedKeys = []
        this.$refs.tree.setCheckedKeys([])///清空
        for(let i in data.data.list){
          if(data.data.list[i].menuId !== '1'){
            //选中返回来的设置项
            this.defaultCheckedKeys.push(data.data.list[i].menuId)
          }
        }
        //this.defaultExpandedKeys = this.defaultCheckedKeys //展开选择项目
        if(this.defaultExpandedKeys.length == 0){
          this.defaultExpandedKeys.push('1')
        }
        console.log(this.defaultExpandedKeys)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
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
