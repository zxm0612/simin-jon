<template>
  <section class="scention-ht">
    <navSide active="banner" title="广告位"></navSide>
    <section class="scention-wh">
      <headTop active="运营"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/bannerManager'}">运营</el-breadcrumb-item>
            <el-breadcrumb-item>编辑</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-input">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
            <el-row>
              <el-form-item label="活动名称" prop="activityName">
                <el-col span="6"><el-input v-model="ruleForm.name" maxlength="20"></el-input></el-col><el-col span="6"><i>最多20个字</i></el-col>
              </el-form-item>
            </el-row>
            <el-form-item label="门店相册：" prop="album">
              <div class="store-album">
                <ul>
                  <li>
                    <img :src="ruleForm.img">
                    <span><em>删除图片</em></span>
                  </li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="" v-model="ruleForm.abbName" prop="album">
              <el-upload
                class="upload-demo"
                action=""
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList2"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">最多可以上传20张图片，建议尺寸 ？*？px</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="活动时间：" prop="endTimes">
              <el-date-picker
                v-model="valueTimes"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-value="newDate"
                value-format="yyyy-MM-dd hh:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="活动类型：" prop="">
              <el-radio-group v-model="ruleForm.type">
                <el-radio label="1" @change="typeClick('1')">图片展示</el-radio>
                <el-radio label="2" @change="typeClick('2')">URL</el-radio>
                <el-radio label="3" @change="typeClick('3')">次卡</el-radio>
                <el-radio label="4" @change="typeClick('4')">疗程卡</el-radio>
              </el-radio-group>
              <div class="activityTab" v-if="type1">
                <img :src="ruleForm.img" alt="">
              </div>
              <div class="activityTab" v-if="type2">
                <el-form-item label="" prop="">
                  <div class="url-input">
                    <el-input v-model="ruleForm.activityUrl" placeholder="请输入url地址"></el-input>
                  </div>
                </el-form-item>
              </div>
              <div class="activityTab" v-if="type34">
                <div class="careTabel">
                  <el-button type="success" @click="addProject" class="careTabel">添加</el-button>
                  <div class="tabl">
                    <el-table :data="ruleForm.title" border  row-style="height:1.8rem">
                      <el-table-column prop="name" label="商品名称">
                      </el-table-column>
                      <el-table-column prop="operation" label="操作">
                        <template slot-scope="scope">
                          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <!--弹出对话框-->
                <el-dialog title="添加" :visible.sync="dialogFormVisible">
                  <el-form :model="form" class="careTabel">
                    <el-form-item label="活动名称：" :label-width="formLabelWidth">
                      <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <el-table :data="cardInfo" border row-style="height:1.8rem" cell-style="padding:0">
                    <el-table-column prop="careRadio" label="" width="99">
                      <template slot-scope="scope">
                        <el-radio-group v-model="muLan">
                          <el-radio :label="scope.row" @change="radioClick(scope.row)">选择</el-radio>
                        </el-radio-group>
                      </template>
                    </el-table-column>
                    <el-table-column prop="title" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="" label="所属分类">
                      <template slot-scope="scope">
                        <p>{{scope.row.shoppingCategoryName}}</p>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="success" @click="enterClick">确 定</el-button>
                  </div>
                  <div style="padding-top: 1rem">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="pageNum"
                      page-sizes="10"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total">
                    </el-pagination>
                  </div>
                </el-dialog>
              </div>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
              <el-input v-model="ruleForm.sort"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
              <el-switch v-model="ruleForm.status" active-color="#5cb531" inactive-color="#999999"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitForm()">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../../components/header/head'
  import navSide from '../../../components/nav/nav'
  import {commodityList} from "../../../service/getData";
  import {addBanner} from "../../../service/getData";
  import {editBanner} from "../../../service/getData";
  import {bannerDetail} from "../../../service/getData";

  export default {
    data () {
      return {
        id:'',
        radioData: '',
        ruleForm: {
          activityName: ''
        },
        rules: {
          activityName: [
            { required: true, message: '请输入活动名称', trigger: 'change' }
          ]
        },
        muLan:'',
        valueTimes: [],
        activityRadio: 3,
        activityTab: '',
        newDate:new Date(),
        storesTabel: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogTableVisible1: false,
        dialogFormVisible1: false,
        category:'',
        cardId:[],
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
        formLabelWidth: '85px',
        cardInfo:[],
        phyInfo:[],
        type1:false,
        type2:false,
        type34:false,
        pageNum:1,
        pageSize:10,
        total:0
      }
    },
    methods: {
      radioClick(id){
        this.cardId = [];
        this.cardId.push(id);
      },
      async getInitData(){
        let info = await bannerDetail(this.$route.params.id);
        this.ruleForm = info.data.detail;
        this.valueTimes = [this.ruleForm.startDate, this.ruleForm.endDate];
        this.ruleForm.shoppingTitle = [{
          name:this.ruleForm.shoppingTitle
        }];
        this.ruleForm.status =='1'?this.ruleForm.status=true:this.ruleForm.status=false;
        this.ruleForm.type = this.ruleForm.type.toString();
        switch (this.ruleForm.type) {
          case '1':{
            this.type1 = true;
            this.type2 = false;
            this.type34 = false;
            break;
          }
          case '2':{
            this.type1 = false;
            this.type2 = true;
            this.type34 = false;
            break;
          }
          case '3':{
            this.type1 = false;
            this.type2 = false;
            this.type34 = true;
            break;
          }
          case '4':{
            this.type1 = false;
            this.type2 = false;
            this.type34 = true;
            break;
          }
        }
      },
      typeClick(id){
        switch (id) {
          case '1':{
            this.type1 = true;
            this.type2 = false;
            this.type34 = false;
            break;
          }
          case '2':{
            this.type1 = false;
            this.type2 = true;
            this.type34 = false;
            break;
          }
          case '3':{
            this.type1 = false;
            this.type2 = false;
            this.type34 = true;
            break;
          }
          case '4':{
            this.type1 = false;
            this.type2 = false;
            this.type34 = true;
            break;
          }
        }
      },
      async getCardCategory(){
        let info = await commodityList('',this.ruleForm.type-2,this.pageNum,this.pageSize);
        this.total = info.data.total;
        this.cardInfo = info.data.list;
      },
      enterClick(){
        this.ruleForm.title = [{
          name:this.cardId[0].title,
          id:this.cardId[0].id
        }];
        this.ruleForm.link = '/commodity/'+this.cardId[0].id;
        this.dialogFormVisible = false;
      },
      handleSizeChange(val) {
        //切换每一页数量
        this.pageSize = val;
        this.getCardCategory('',true)
      },
      handleCurrentChange(val) {
        //分页
        this.pageNum = val;
        this.getCardCategory('',true);
      },
      async addProject(){
        this.cardId = [];
        if(this.ruleForm.type === '3'){
          //说明是次卡被点击
          this.pageNum = 1;
          this.pageSize =10;
          this.total = 0;
          await this.getCardCategory();
          this.category = '次卡';
          this.dialogFormVisible = true;
        }else{
          //疗程卡
          this.pageNum = 1;
          this.pageSize =10;
          this.total = 0;
          await this.getCardCategory();
          this.category = '疗程卡';
          this.dialogFormVisible = true;
        }
      },
      async submitForm() {
        if(this.$route.params.mode === 'add'){
          //新增


          //上面写校验规则
          this.ruleForm.status ===true?this.ruleForm.status=1:this.ruleForm.status=2;
          let status = await addBanner(this.ruleForm.name,this.ruleForm.img,this.ruleForm.type,this.valueTimes[0],this.valueTimes[1],this.ruleForm.sort,this.ruleForm.link,this.ruleForm.status);
          if(status.code === 0){
            this.$message.success('新增成功！');
            this.$router.go(-1);
          }else{
            alert(status.msg);
          }
        }else if(this.$route.params.mode === 'edit'){
          //编辑


          //上面写校验规则
          this.ruleForm.status ===true?this.ruleForm.status=1:this.ruleForm.status=2;
          let status = await editBanner(this.ruleForm.id,this.ruleForm.name,this.ruleForm.img,this.ruleForm.type,this.valueTimes[0],this.valueTimes[1],this.ruleForm.sort,this.ruleForm.link,this.ruleForm.status);
          if(status.code === 0){
            this.$message.success('编辑成功！');
            this.$router.go(-1);
          }else{
            alert(status.msg);
          }
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      showRow(row){
        //赋值给radio
        this.radio = this.tableData.indexOf(row);
      },
      getCurrentRow(val){
        console.log(val)
      },
      getCurrentRows(val){
        console.log(val)
      }
    },
    components: {
      headTop,
      navSide
    },
    mounted(){
      switch (this.$route.params.mode) {
        case 'add':{
          break;
        }
        case 'edit':{
          this.getInitData();
          this.id = this.$route.params.id;
          break;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin";
  .activityTab{
    width: 60%;
    height: auto;
  }
  .careTabel{
    margin-bottom: 1rem;
  }
  .el-table__header th{
    padding:0 0;
  }
  .site-wrapper .el-pagination {
    margin-top: 5px;
    text-align: right;
  }
  .el-dialog__body{
    padding-top: 0;
  }
  .el-dialog__header{
    background: #5cb531;
  }
</style>
