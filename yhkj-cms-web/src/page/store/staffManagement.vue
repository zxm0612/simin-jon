<template>
  <section class="scention-ht">
    <navSide active="员工管理" title="门店" :navList="navList"></navSide>
    <section class="scention-wh">
      <headTop></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{}">门店</el-breadcrumb-item>
            <el-breadcrumb-item>员工管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt">
          <span>筛选查询</span>
          <div class="mr-top head-input">
            <span>输入搜索：</span>
            <el-input v-model="searchInfo.keyword" placeholder="姓名/手机号" class="input-width"></el-input>
            <span>职位：</span>
            <el-select v-model="searchInfo.jobId" clearable  placeholder="全部">
              <el-option v-for="item in jobList" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
            <el-row class="mr-top">
              <el-button type="success" @click="getInitData">查询</el-button>
              <el-button @click="clear">重置</el-button>
            </el-row>
          </div>
        </div>
        <div class="box-content clearfix">
          <div class="mr-bottom clearfix">
            <el-row class="fll mr-right">
              <el-button type="success" @click="optionClick(0,3)">新增</el-button>
            </el-row>
            <el-row class="fll">
              <el-button type="success" @click="$router.go(0)">刷新</el-button>
            </el-row>
          </div>
          <el-table :data="staffTable" border >
            <el-table-column prop="id" label="编号">
            </el-table-column>
            <el-table-column prop="name" label="员工姓名">
            </el-table-column>
            <el-table-column prop="image" label="相片">
              <template slot-scope="scope">
                <img :src=scope.row.image alt="" style="width: 6rem;height: 5rem">
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号码">
            </el-table-column>
            <el-table-column prop="sex" label="性别">
              <template slot-scope="scope">
                <p>{{scope.row.sex === 1?'男':'女'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="jobName" label="职位">
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="optionClick(scope.row.id,1)">查看</el-button>
                <el-button type="text" size="small" @click="optionClick(scope.row.id,2)">编辑</el-button>
                <el-button type="text" size="small" @click="optionClick(scope.row.id,4)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--新增员工弹出框开始-->
      <el-dialog
        title="新增员工"
        :visible.sync="newEmployees"
        width="40%"
        :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="职位：" prop="jobName">
            <el-select v-model="ruleForm.jobId" placeholder="请选择">
              <el-option v-for="item in jobList" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别：" prop="resource">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="1" value="1">男性</el-radio>
              <el-radio label="2" value="2">女性</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="相片：" prop="album">
            <div class="store-album">
              <ul>
                <li>
                  <img :src="cover">
                </li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item label="" v-model="ruleForm.abbName" prop="album">
            <el-upload
              :show-file-list="false"
              class="upload-demo"
              action="https://testcms.1haokj.com/cms/api/file/upload"
              :on-preview="handlePreview"
              :headers="headers"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" plain @click="newEmployees = false">取 消</el-button>
          <el-button type="success" @click="addStaff">确 定</el-button>
        </span>
      </el-dialog>
      <!--新增员工弹出框结束-->
      <!--查看员工弹出框开始-->
      <el-dialog
        title="查看员工"
        :visible.sync="viewingEmployees"
        width="40%"
        :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="ruleForm.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="ruleForm.phone" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="职位：" prop="region">
            <el-input v-model="ruleForm.jobName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="resource">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio v-model="ruleForm.sex" label="1" value="1" :disabled="true">男</el-radio>
              <el-radio v-model="ruleForm.sex" label="2" value="2" :disabled="true">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="相片:" prop="album">
            <div class="store-album">
              <ul>
                <li>
                  <img :src="cover">
                </li>
              </ul>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="viewingEmployees = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--查看员工弹出框结束-->
      <!--编辑员工弹出框开始-->
      <el-dialog
        title="编辑员工"
        :visible.sync="editors"
        width="40%"
        :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="职位：" prop="jobId">
            <el-select v-model="ruleForm.jobId" placeholder="请选择">
              <el-option v-for="item in jobList" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="1" value="1">男</el-radio>
              <el-radio label="2" value="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="相片：" prop="album">
            <div class="store-album">
              <ul>
                <li>
                  <img :src="cover">
                </li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item label="" v-model="ruleForm.abbName" prop="album">
            <el-upload
              :show-file-list="false"
              class="upload-demo"
              action="https://testcms.1haokj.com/cms/api/file/upload"
              :on-preview="handlePreview"
              :headers="headers"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" plain @click="editors = false">取 消</el-button>
          <el-button type="success" @click="editStaff">确 定</el-button>
        </span>
      </el-dialog>
      <!--编辑员工弹出框结束-->
    </section>
  </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import {getJobList} from "../../service/getData";
  import {editStaff} from "../../service/getData";
  import {getStaffDetail} from "../../service/getData";
  import {addStaff} from "../../service/getData";
  import {deleteStaff} from "../../service/getData";
  import {getStaffList} from "../../service/getData";
  import {isPoneAvailable} from "../../config/reg";

  export default {
    data () {
      return {
        uploadSuccess : (response,file,fileList) => {
          alert( response.data.detail);
          this.cover = response.data.detail;
        },
        searchInfo:{
          keyword:'',
          jobId:''
        },
        headers:{
          Authorization:window.localStorage.Authorization
        },
        jobList:[],
        cover:'',
        select: '',
        selectPrice: '',
        newEmployees: false,
        viewingEmployees: false,
        editors: false,
        staffTable: [],
        ruleForm: {
          name: '',
          phone: '',
          region: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号为11位数', trigger: 'blur' }
          ],
          jobId: [
            { required: true, message: '请选择职位', trigger: 'change' }
          ],
          sex:[
            { required: true, message: '请选择性别', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      clear(){
        this.searchInfo = {
          keyword:'',
          jobId:''
        }
      },
      async optionClick(id,mode){
        switch (mode) {
          case 1:{
            //说明查看被单击
            let info =  await getStaffDetail(id);
            this.ruleForm = info.data.detail;
            this.ruleForm.sex = this.ruleForm.sex.toString();
            this.cover = info.data.detail.image;
            this.viewingEmployees = true;
            this.newEmployees = false;
            this.editor = false;
            break;
          }
          case 2:{
            //说明编辑被单击
            let info =  await getStaffDetail(id);
            this.ruleForm = info.data.detail;
            this.ruleForm.sex = this.ruleForm.sex.toString();
            this.cover = info.data.detail.image;
            this.viewingEmployees = false;
            this.newEmployees = false;
            this.editors = true;
            break;
          }
          case 3:{
            //说明新增被单击
            this.ruleForm = {};
            this.viewingEmployees = false;
            this.newEmployees = true;
            this.editor = false;
            break;
          }
          case 4:{
            //说明删除被单击
            let status =  await deleteStaff(id);
            if(status.code === 0){
              this.$message.success('删除成功！');
              this.getInitData();
              return;
            }else{
              alert(status.msg);
              return;
            }
          }
        }
      },
      async getInitData(){
        let info =  await getStaffList(this.searchInfo.keyword,this.searchInfo.jobId);
        this.staffTable = info.data.list;
      },
      // handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      // },
      // handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      // },
      async getJobList(){
        let info = await getJobList();
        this.jobList = info.data.list;
      },
      async editStaff(){
        if(this.ruleForm.name === ''||this.ruleForm.name === undefined){
          this.$message.error('请输入姓名！');
          return;
        }else if(this.ruleForm.phone ===''||this.ruleForm.phone === undefined||isPoneAvailable(this.ruleForm.phone) === false){
          this.$message.error('请输入正确的手机号！');
          return;
        }else if(this.ruleForm.sex ===''||this.ruleForm.sex===undefined){
          this.$message.error('请选择性别！');
          return;
        }else if(this.cover === ''||this.cover===undefined){
          this.$message.error('请上传照片！');
          return;
        }else if(this.ruleForm.jobId ===''||this.ruleForm.jobId===undefined){
          this.$message.error('请选择职位！');
          return;
        }
        let status = await editStaff(this.ruleForm.id,this.ruleForm.name,this.cover,this.ruleForm.phone,this.ruleForm.sex,this.ruleForm.jobId,this.ruleForm.jobName);
        if(status.code === 0){
          this.$message.success('编辑成功！');
          this.getInitData();
          this.editors = false;
          this.ruleForm = [];
        }else{
          alert(status.msg)
        }
      },
      async addStaff(){
        if(this.ruleForm.name === ''||this.ruleForm.name === undefined){
          this.$message.error('请输入姓名！');
          return;
        }else if(this.ruleForm.phone ===''||this.ruleForm.phone === undefined||isPoneAvailable(this.ruleForm.phone) === false){
          this.$message.error('请输入正确的手机号！');
          return;
        }else if(this.ruleForm.sex ===''||this.ruleForm.sex===undefined){
          this.$message.error('请选择性别！');
          return;
        }else if(this.cover === ''||this.cover===undefined){
          this.$message.error('请上传照片！');
          return;
        }else if(this.ruleForm.jobId ===''||this.ruleForm.jobId===undefined){
          this.$message.error('请选择职位！');
          return;
        }
        let jobName = '';
        for(let i =0;i<this.jobList.length;i++){
          if(this.jobList[i].id =this.ruleForm.jobId){
            jobName = this.jobList[i].name
          }
        }
        let status = await addStaff(this.ruleForm.name,this.cover,this.ruleForm.phone,this.ruleForm.sex,this.ruleForm.jobId,jobName);
        if(status.code === 0){
          this.$message.success('新增成功！');
          this.getInitData();
          this.newEmployees = false;
        }else{
          alert(status.msg)
        }
      },
    },
    components: {
      headTop,
      navSide
    },
    mounted(){
      this.getJobList();
      this.getInitData();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
</style>
