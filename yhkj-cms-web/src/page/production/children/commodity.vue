<template>
  <section class="scention-ht">
    <navSide title="产品" active="商品管理"></navSide>
    <section class="scention-wh">
      <headTop active="产品"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{path:'/cardCategory'}">产品</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/commodityManager'}">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-input">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商品名称：" prop="addressName">
              <el-input v-model="ruleForm.title" disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="商品类型：" prop="resource">
              <el-radio-group v-model="ruleForm.shoppingType">
                <el-radio v-model="ruleForm.shoppingType" :label="1" class="mr-right" @change="radioClick(1,1)" value=1 disabled="true">次卡</el-radio>
                <el-select v-model="ruleForm.shoppingCategory" :placeholder="timesPlace" class="mr-right" disabled="true" v-if="timesStatus">
                  <el-option v-for="item in this.timesInfo" :label="item.name" :value="item.id" :key="item.id" ></el-option>
                </el-select>
                <el-radio v-model="ruleForm.shoppingType" :label=2 class="mr-right" @change="radioClick(2,1)" value=2 disabled="true">疗程卡</el-radio>
                <el-select v-model="ruleForm.shoppingCategory" :placeholder="lcPlace" disabled="true" v-if="lcStatus">
                  <el-option v-for="item in this.lcInfo" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
                <el-radio v-model="ruleForm.shoppingType" :label="3" class="mr-left" @change="radioClick(3,1)" value=3 disabled="true">健康管理卡</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商品价格：" prop="">
              <el-col style="width:4.4rem">一档价格：</el-col><el-col style="width:15rem"><el-input v-model="ruleForm.firstPrice" disabled="true"></el-input></el-col>
              <el-col style="width:4.4rem">二档价格：</el-col><el-col style="width:15rem"><el-input v-model="ruleForm.secondPrice" disabled="true"></el-input></el-col>
              <el-col style="width:4.4rem">三档价格：</el-col><el-col style="width:15rem"><el-input v-model="ruleForm.thirdPrice" disabled="true"></el-input></el-col>
            </el-form-item>
            <el-form-item label="状态：" prop="delivery">
              <el-switch v-model="ruleForm.status" active-color="#5cb531" inactive-color="#999999" disabled="true"></el-switch>
            </el-form-item>
            <el-form-item label="关联门店：" prop="">
              <template>
                <el-transfer v-model="mendianList" :data="datastore" :titles="['未关联门店', '已关联门店']" disabled="true"></el-transfer>
              </template>
            </el-form-item>
            <el-form-item label="包括项目：" prop="">
              <!--<el-button @click="addClick">添加</el-button>-->
              <!--次卡表格开始-->
              <el-table :data="ruleForm.productList" border class="mr-top" v-if="timesStatus">
                <el-table-column prop="name" label="包含项目">
                </el-table-column>
                <el-table-column label="数量">
                  <template slot-scope="scope">
                    <p>1</p>
                  </template>
                </el-table-column>
                <el-table-column label="单价">
                  <template slot-scope="scope">
                    <p>一档：<em>￥{{scope.row.firstPrice}}</em></p>
                    <p>二档：<em>￥{{scope.row.secondPrice}}</em></p>
                    <p>三档：<em>￥{{scope.row.thirdPrice}}</em></p>
                  </template>
                </el-table-column>
                <el-table-column prop="state" label="总价">
                  <template slot-scope="scope">
                    <p>一档：<em>￥{{scope.row.firstPrice}}</em></p>
                    <p>二档：<em>￥{{scope.row.secondPrice}}</em></p>
                    <p>三档：<em>￥{{scope.row.thirdPrice}}</em></p>
                  </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作">
                  <template slot-scope="scope">
                    <!--<el-button type="text" size="small" @click="deleteProduct(scope.row.id)">删除</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
              <!--次卡表格结束-->
              <!--疗程卡表格开始-->
              <el-table :data="ruleForm.productList" border class="mr-top" v-if="lcStatus">
                <el-table-column prop="name" label="包含项目">
                </el-table-column>
                <el-table-column prop="num" label="数量">
                  <template slot-scope="scope">
                    <p><el-input :value="scope.row.num" v-model="scope.row.num" @change="totalCompute" disabled="true"></el-input></p>
                  </template>
                </el-table-column>
                <el-table-column prop="creationTime" label="单价">
                  <template slot-scope="scope">
                    <p>一档：<em>￥{{scope.row.firstPrice}}</em></p>
                    <p>二档：<em>￥{{scope.row.secondPrice}}</em></p>
                    <p>三档：<em>￥{{scope.row.thirdPrice}}</em></p>
                  </template>
                </el-table-column>
                <el-table-column prop="state" label="总价">
                  <template slot-scope="scope">
                    <p>一档：<em>￥{{scope.row.firstPrice*scope.row.num}}</em></p>
                    <p>二档：<em>￥{{scope.row.secondPrice*scope.row.num}}</em></p>
                    <p>三档：<em>￥{{scope.row.thirdPrice*scope.row.num}}</em></p>
                  </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作">
                  <template slot-scope="scope">
                    <!--<el-button type="text" size="small" @click="deleteProduct(scope.row.id)">删除</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
              <!--疗程卡表格结束-->
              <!--健康管理卡表格开始-->
              <el-table :data="ruleForm.productList" border class="mr-top" v-if="!disHealthStatus">
                <el-table-column prop="name" label="包含项目">
                </el-table-column>
                <el-table-column prop="creationTime" label="单价">
                  <template slot-scope="scope">
                    <p>一档：<em>￥{{scope.row.firstPrice}}</em></p>
                    <p>二档：<em>￥{{scope.row.secondPrice}}</em></p>
                    <p>三档：<em>￥{{scope.row.thirdPrice}}</em></p>
                  </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作">
                  <template slot-scope="scope">
                    <!--<el-button type="text" size="small" @click="deleteProduct(scope.row.id)">删除</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
              <!--健康管理卡表格结束-->
              <!--<div class="paging-postion"><span>商品总价：一档<em>￥{{this.totalPriceData.firstPrice}}</em>  二档<em>￥{{this.totalPriceData.secondPrice}}</em>  三档<em>￥{{this.totalPriceData.thirdPrice}}</em></span></div>-->
            </el-form-item>
            <el-form-item label="门店相册：" prop="album" v-show="disHealthStatus">
              <div class="store-album">
                <ul>
                  <li>
                    <img :src="ruleForm.cover">
                    <span><i>商品封面</i></span>
                  </li>
                  <li v-for="item in ruleForm.imageList" :key="item">
                    <img :src="item">
                    <!--<span><i @click="isCover(item)">设为封面</i><em @click="deleteImage(item)">删除图片</em></span>-->
                  </li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="" v-model="ruleForm.abbName" prop="album" v-if="disHealthStatus">
            </el-form-item>
            <el-form-item label="商品简介：" prop="" v-show="disHealthStatus">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"
                maxlength="20"
                placeholder="请输入内容，最多输入20个字"
                v-model="ruleForm.intro" style="width: 30rem"
                disabled="true"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="商品详情：" prop="" v-show="disHealthStatus">
              <div id="editorElem" style="text-align:left"></div>
            </el-form-item>
            <el-form-item class="mr-top">
              <el-button type="success" @click="$router.go(-1)">返回</el-button>
            </el-form-item>
          </el-form>
          <!--次卡对话框开始-->
          <el-dialog title="添加" :visible.sync="secondaryCardVisible" z-index="10000">
            <el-input v-model="ruleForm.dialogSecondaryCard" placeholder="次卡名称"></el-input>
            <el-table :data="dialogData" border class="mr-top">
              <el-table-column width="99">
                <template slot-scope="scope" >
                  <!-- class="textRadio" -->
                  <el-radio @change.native="getCurrentRow(scope.$index)" v-model="selectList[scope.$index]" class="textRadio" :label="scope.row.id" :value="scope.row.id">选择</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="项目名称">
              </el-table-column>
              <el-table-column prop="unitPrice" label="单价">
                <template slot-scope="scope">
                  <p>一档：<em>￥{{scope.row.firstPrice}}</em></p>
                  <p>二档：<em>￥{{scope.row.secondPrice}}</em></p>
                  <p>三档：<em>￥{{scope.row.thirdPrice}}</em></p>
                </template>
              </el-table-column>
            </el-table>
            <div class="paging-postion" style="padding: 1rem 1.5rem">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="secondaryCardVisible = false">取 消</el-button>
              <el-button type="success" @click="enterClick">确 定</el-button>
            </div>
          </el-dialog>
          <!--次卡对话框结束-->
          <!--疗程卡对话框开始-->
          <el-dialog title="添加" :visible.sync="courseCardVisible" z-index="100000">
            <el-input v-model="ruleForm.dialogCourseCard" placeholder="疗程卡名称"></el-input>
            <el-table :data="dialogData" border class="mr-top" ref="selectTimes"  @selection-change="handleSelectionChange">
              <el-table-column width="99">
                <template slot-scope="scope">
                  <el-checkbox label="选择"  v-model="selectList[scope.$index]" :value="scope.row.id" @change="addProduct(scope.$index,selectList[scope.$index])"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="项目名称">
              </el-table-column>
              <el-table-column prop="unitPrice" label="单价" :data="dialogData">
                <template slot-scope="scope">
                  <p>一档：<em>￥{{scope.row.firstPrice}}</em></p>
                  <p>二档：<em>￥{{scope.row.secondPrice}}</em></p>
                  <p>三档：<em>￥{{scope.row.thirdPrice}}</em></p>
                </template>
              </el-table-column>
            </el-table>
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
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelProduct(2)">取 消</el-button>
              <el-button type="success" @click="addProductionList">确 定</el-button>
            </div>
          </el-dialog>
          <!--疗程卡对话框结束-->
          <!--健康管理卡对话框开始-->
          <el-dialog title="添加" :visible.sync="healthyCardVisible" z-index="100000">
            <el-input v-model="ruleForm.dialogCourseCard" placeholder="疗程卡名称"></el-input>
            <el-table :data="dialogData" border class="mr-top" ref="selectTimes"  @selection-change="handleSelectionChange">
              <el-table-column width="99">
                <template slot-scope="scope">
                  <el-checkbox label="选择"  v-model="selectList[scope.$index]" :value="scope.row.id" @change="addProduct(scope.$index,selectList[scope.$index])"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="项目名称">
              </el-table-column>
              <el-table-column prop="unitPrice" label="单价" :data="dialogData">
                <template slot-scope="scope">
                  <p>一档：<em>￥{{scope.row.firstPrice}}</em></p>
                  <p>二档：<em>￥{{scope.row.secondPrice}}</em></p>
                  <p>三档：<em>￥{{scope.row.thirdPrice}}</em></p>
                </template>
              </el-table-column>
            </el-table>
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
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelProduct(2)">取 消</el-button>
              <el-button type="success" @click="addProductionList">确 定</el-button>
            </div>
          </el-dialog>
          <!--健康管理卡对话框结束-->
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../../components/header/head'
  import navSide from '../../../components/nav/nav'
  import {editCommodity} from "../../../service/getData";
  import {mendianList} from "../../../service/getData";
  import {timesCardCategory} from "../../../service/getData";
  import {physiotherapyCategory} from "../../../service/getData";
  import {commodityDetails} from "../../../service/getData";
  import {projectList} from "../../../service/getData";
  import E from "wangeditor";

  export default {
    data () {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 8; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
          });
        }
        return data;
      };
      return {
        uploadSuccess : (response,file,fileList) => {
          this.ruleForm.imageList === undefined?this.ruleForm.imageList = []:console.log('');
          this.ruleForm.imageList.push(response.data.detail);
          this.ruleForm.name += '1';
          this.ruleForm.name.substring(0,this.ruleForm.name.length-1);
        },
        pageState:'',
        secondaryCard: '',
        headers:{
          Authorization:window.localStorage.Authorization
        },
        mendianList:[],
        healthyCard: '',
        disHealthStatus:false,
        introduction: '',
        secondaryCardVisible: false,
        courseCardVisible: false,
        healthyCardVisible: false,
        datastore: [],
        ruleForm: {},
        timesStatus:false,
        lcStatus:false,
        storesTabel: [],
        secondary: [],
        courseCard: [],
        dialoghealthyCard: [],
        rules: {
          price: [
            { required: true, message: '请选择价格档', trigger: 'change' }
          ],
          addressName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          positionName: [
            { required: true, message: '请输门店位置', trigger: 'blur' }
          ]
        },
        fileList: [],
        timesCard:'',
        timesInfo:[],
        allMendian:[],
        lcInfo:[],
        liaochengCard:'',
        timesPlace:'',
        lcPlace:'',
        pageNum:1,
        pageSize:10,
        total:0,
        dialogData:[],
        healthStatus:false,
        productionList:[],
        totalPriceData:{
          firstPrice:0,
          secondPrice:0,
          thirdPrice:0
        },
        selectTimes:'',//选择的次卡项目
        selectList:[],
        content:'',
        productStatus:[],//项目临时状态
      }
    },
    methods: {
      async getProjectList(name ='',status=false){
        for(let i =0;i<this.selectList.length;i++){
          this.selectList[i] = false;
        }
        let info = await projectList(name,this.pageNum,this.pageSize);
        this.dialogData = info['data']['list'];
        this.total = info['data']['total'];
        // Object.keys(Array.apply(null,{length:info['data']['list'].length}).map(function (item) {
        //   return 0;
        // }));
        for(let i =0;i<this.productStatus.length;i++){
          for(let j =0;j<this.dialogData.length;j++){
            if(this.productStatus[i].id === this.dialogData[j].id){
              this.selectList[j] = true;
            }
          }
          console.log(this.selectList[8]);
        }
      },
      addProductionList(){
        this.ruleForm.productList = [];
        console.log(this.productStatus);
        for(let i =0;i<this.productStatus.length;i++){
          this.ruleForm.productList.push(this.productStatus[i]);
        }
        this.productStatus = [];
        this.courseCardVisible = false;
      },
      deleteProduct(id){
        for(let i =0;i<this.ruleForm.productList.length;i++){
          if(this.ruleForm.productList[i].id === id){
            this.ruleForm.productList.splice(i,1);
          }
        }
      },
      cancelProduct(key){
        if(key === 2){
          //说明是疗程卡被取消
          this.productStatus = [];
          this.courseCardVisible = false;
        }
      },
      handleRemove (file, fileList) {
      },
      handleSelectionChange(val){
        this.ruleForm.productList = val;
      },
      handlePreview (file) {
      },
      isCover(url){
        if(this.ruleForm.cover === ''){
          for(let i =0;i<this.ruleForm.imageList.length;i++){
            this.ruleForm.imageList[i] === url?this.ruleForm.imageList.splice(i,1):console.log('1');
          }
        }else{
          for(let i =0;i<this.ruleForm.imageList.length;i++){
            this.ruleForm.imageList[i] === url?this.ruleForm.imageList[i] = this.ruleForm.cover:this.ruleForm.imageList[i];
          }
        }
        this.ruleForm.cover = url;
      },
      async handleSuccess(response){
        this.ruleForm.imageList.push(response.data.detail);
      },
      getCurrentRow (radio) {
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      handleSizeChange(val) {
        //切换每一页数量
        this.pageSize = val;
        this.getProjectList('',true)
      },
      handleCurrentChange(val) {
        //分页
        this.pageNum = val;
        this.getProjectList('',true);
      },
      addProduct(id,status){
        if(status === true){
          this.productStatus.push(this.dialogData[id]);
        }else{
          for(let i =0;i<this.productStatus.length;i++){
            if(this.productStatus[i].id === this.dialogData[id].id){
              this.productStatus.splice(i,1);
            }
          }
        }
      },
      async getInitData(){
        let info = await commodityDetails(this.$route.params.id);
        this.ruleForm = info['data']['detail'];
        for(let i =0;i<this.ruleForm.productList.length;i++){
          this.ruleForm.productList[i].id = this.ruleForm.productList[i].productId
        }
      },
      async getCategory(){
        this.timesInfo = await timesCardCategory();
        this.timesInfo = this.timesInfo.data.list;
        this.lcInfo = await physiotherapyCategory();
        this.lcInfo = this.lcInfo.data.list;
      },
      radioClick(key,status){
        switch (key) {
          case 1:{
            //次卡被点击
            this.ruleForm.shoppingType =1;
            this.timesStatus = true;
            this.lcStatus = false;
            this.disHealthStatus = true;
            if(status === 1)
              this.ruleForm.shoppingCategory = '';
            return;
          }
          case 2:{
            //疗程卡被点击
            this.ruleForm.shoppingType =2;
            this.timesStatus = false;
            this.lcStatus = true;
            this.disHealthStatus = true;
            if(status === 1)
              this.ruleForm.shoppingCategory = '';
            return;
          }
          case 3:{
            //健康管理卡被点击
            this.ruleForm.shoppingType =3;
            this.timesStatus = false;
            this.lcStatus = false;
            this.disHealthStatus = false;
            if(status === 1)
              this.ruleForm.shoppingCategory = '';
            return;
          }
        }
      },
      async getMendianData(){
        let info = await mendianList('','','',1,20);
        info =info['data']['list'];
        // Object.keys(info).forEach(key =>{
        //   this.datastore.push({
        //     key:info[key].id,
        //     label: info[key].name
        //   });
        //   this.allMendian.push({
        //     id:info[key].id,
        //     name: info[key].name
        //   });
        // })
        for(let i =0;i<info.length;i++){
          this.datastore.push({
            key:info[i].id,
            label: info[i].name,
            disabled:true
          });
          this.allMendian.push({
            id:info[i].id,
            name: info[i].name
          });
        }
      },
      async submitChange(){
        //校验
        if(this.ruleForm.shoppingType == 1||this.ruleForm.shoppingType==2){
          //说明是次卡状态
          if(this.ruleForm.title ===''||this.ruleForm.title===undefined){
            this.$message.error('请输入商品名称！');
            return;
          }else if(this.ruleForm.intro === ''||this.ruleForm.intro===undefined){
            this.$message.error('请输入商品简介！');
            return;
          }else if(this.ruleForm.content === ''||this.ruleForm.content ===undefined){
            this.$message.error('请输入商品详情！');
            return;
          }else if(this.ruleForm.imageList.length===0){
            this.$message.error('请上传至少一张照片至相册');
            return;
          }else if(this.ruleForm.mendianList.length === 0){
            this.$message.error('请选择门店！');
            return;
          }else if(this.ruleForm.shoppingType === undefined||this.ruleForm.shoppingType === ''){
            this.$message.error('请选择类型！');
            return;
          }else if(this.ruleForm.shoppingCategory === undefined||this.ruleForm.shoppingCategory === ''){
            this.$message.error('请选择分类名称！');
            return;
          }else if(this.ruleForm.productList.length === 0){
            this.$message.error('请选择项目列表！');
            return;
          }else if(this.ruleForm.firstPrice ===''||this.ruleForm.firstPrice===undefined||this.ruleForm.secondPrice===''||this.ruleForm.secondPrice === undefined||this.ruleForm.thirdPrice===''||this.ruleForm.thirdPrice===undefined){
            this.$message.error('请输入价格！');
          }
        }else{
          //说明是健康管理卡
          if(this.ruleForm.title ===''||this.ruleForm.title===undefined){
            this.$message.error('请输入商品名称！');
            return;
          }else if(this.ruleForm.intro === ''||this.ruleForm.intro===undefined) {
            this.$message.error('请输入商品简介！');
            return;
          }else if(this.ruleForm.productList.length === 0){
            this.$message.error('请选择项目列表！');
            return;
          }else if(this.ruleForm.firstPrice ===''||this.ruleForm.firstPrice===undefined||this.ruleForm.secondPrice===''||this.ruleForm.secondPrice === undefined||this.ruleForm.thirdPrice===''||this.ruleForm.thirdPrice===undefined){
            this.$message.error('请输入价格！');
          }
        }
        // this.content = editor.txt.html();
        this.ruleForm.mendianList = [];
        for(let i =0 ;i<this.ruleForm.productList.length;i++){
          if(this.ruleForm.productList[i].id){
            this.ruleForm.productList[i].productId = this.ruleForm.productList[i].id;
          }
        }
        for(let i =0;i<this.mendianList.length;i++){
          for(let l =0;l<this.allMendian.length;l++){
            if(this.allMendian[l]['id'] === this.mendianList[i]){
              this.ruleForm.mendianList.push({
                id:this.allMendian[l]['id'],
                name:this.allMendian[l]['name']
              });
            }
          }
        }
        this.ruleForm.status ===true?this.ruleForm.status =1:this.ruleForm.status=0;
        //写个循环重新查找一下所有门店值，生成对应数据传到后台
        // for(let i =0;i<this.allMendian.length;i++){
        //   alert(this.allMendian.length);
        //   // this.mendianList.indexOf(this.allMendian[i].id) ===-1?this.allMendian.splice(i,1):console.log('');
        //   if(this.mendianList.indexOf(this.allMendian[i].id) ===-1){
        //     this.allMendian.splice(i,1);
        //   }
        // }
        if(this.timesStatus === true){
          //说明是次卡
          for(let i =0;i<this.timesInfo.length;i++){
            if(this.timesInfo[i].name === this.ruleForm.shoppingCategory){
              this.ruleForm.shoppingCategory = this.timesInfo[i].id
            }
          }
        }else if(this.lcStatus === true){
          for(let i =0;i<this.lcInfo.length;i++) {
            if (this.lcInfo[i].name === this.ruleForm.shoppingCategory) {
              this.ruleForm.shoppingCategory = this.lcInfo[i].id
            }
          }
        }else if(this.disHealthStatus ===false){

        }
        let status = await editCommodity(
          this.ruleForm.id,
          this.ruleForm.title,
          this.ruleForm.intro,
          this.ruleForm.content,
          this.ruleForm.cover,
          this.ruleForm.imageList,
          this.ruleForm.mendianList,
          this.ruleForm.shoppingType,
          this.ruleForm.shoppingCategory,
          this.ruleForm.firstPrice,
          this.ruleForm.secondPrice,
          this.ruleForm.thirdPrice,
          this.ruleForm.status,
          this.ruleForm.productList
        );
        if(status.code === 0){
          this.$message.success('编辑成功了！');
          this.$router.go(-1);
        }else{
          this.$message.error(status.message);
        }
      },
      async getLis0tData(){
        let timesInfo = await timesCardCategory();
        timesInfo = timesInfo['data']['list'];
        let liaochengInfo = await physiotherapyCategory();
        liaochengInfo = liaochengInfo['data']['list'];
        Object.keys(timesInfo).forEach(key =>{
          this.timesInfo.push(timesInfo[key]['name'])
        });
        Object.keys(liaochengInfo).forEach(key =>{
          this.lcInfo.push(liaochengInfo[key]['name'])
        });
      },
      addClick(){
        switch(this.ruleForm.shoppingType){
          case 1:{
            //说明是次卡被点击
            this.healthyCardVisible = false;
            this.courseCardVisible = false;
            this.secondaryCardVisible = true;
            //获取所有项目并且默认勾选已有项目
            this.getProjectList();
            return;
          }
          case 2:{
            for(let i =0;i<this.ruleForm.productList.length;i++){
              this.productStatus.push(this.ruleForm.productList[i]);
            }
            // this.ruleForm.productList = [];
            //说明是疗程卡被点击
            this.healthyCardVisible = false;
            this.courseCardVisible = true;
            this.secondaryCardVisible = false;
            this.getProjectList();
            return;
          }
          case 3:{
            //说明是健康管理卡被点击
            this.healthyCardVisible = true;
            this.courseCardVisible = false;
            this.secondaryCardVisible = false;
            this.getProjectList();
            return;
          }
        }
      },
      enterClick(){
        this.ruleForm.productList = [];
        for(let i=0;i<this.selectList.length;i++){
          for(let j =0;j<this.dialogData.length;j++){
            if(!this.dialogData[j].id){
              continue;
            }
            if(this.selectList[i] === this.dialogData[j].id){
              this.ruleForm.productList.push(this.dialogData[j]);
            }
          }
        }
        this.secondaryCardVisible = false;
        this.healthyCardVisible = false;
        this.courseCardVisible = false;
      },
      deleteImage(id){
        for(let i=0;i<this.ruleForm.imageList.length;i++){
          if(this.ruleForm.imageList[i] === id){
            this.ruleForm.imageList.splice(i,1);
          }
        }
      },
      totalCompute(){
        for(let i =0;i<this.ruleForm.productList.length;i++){
          // this.totalPriceData = {
          //   firstPrice:0,
          //   secondPrice:0,
          //   thirdPrice:0
          // };
          // this.totalPriceData.firstPrice += this.ruleForm.productList[i].num*this.ruleForm.productList[i].firstPrice;
          // this.totalPriceData.secondPrice += this.ruleForm.productList[i].num*this.ruleForm.productList[i].secondPrice;
          // this.totalPriceData.thirdPrice += this.ruleForm.productList[i].num*this.ruleForm.productList[i].thirdPrice;
        }
      }
    },
    components: {
      headTop,
      navSide,
      E
    },
    mounted(){
      this.getCategory();
      let editor = new E('#editorElem');
      editor.customConfig.onchange = (html) => {
        this.ruleForm.content = html
      };
      editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;
      editor.customConfig.uploadImgServer = 'https://testcms.1haokj.com/cms/api/file/editor/upload' ; // 上传图片到服务器
      editor.customConfig.uploadImgHeaders = {
        'Authorization': window.localStorage.Authorization
      };
      editor.create();
      editor.$textElem.attr('contenteditable', false);
      this.getLis0tData();
      this.getMendianData().then(() => this.getInitData().then(()=>{
        for(let i =0;i<this.ruleForm.mendianList.length;i++){
          // this.mendianList.push({
          //   id:this.ruleForm.mendianList[i]['id'],
          //   label:this.ruleForm.mendianList[i]['name']
          // });

          for(let j=0;j<this.datastore.length;j++){
            if(this.ruleForm.mendianList[i].id === this.datastore[j].key){
              this.mendianList.push(this.datastore[j].key);
            }
          }
        }
        if(this.ruleForm.shoppingType === 1){
          this.timesCard = this.ruleForm.shoppingCategory;
        }else if(this.ruleForm.shoppingType === 2){
          this.liaochengCard = this.ruleForm.shoppingCategory
        }
        this.ruleForm.status === 1?this.ruleForm.status=true:this.ruleForm.status=false;
        editor.txt.html(this.ruleForm.content);
        // editor.disable();
        this.radioClick(this.ruleForm.shoppingType,0);
      }));

    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin.scss";
  .content-box-input table tr{
    padding: 0 0;
  }
  .el-table__header-wrapper{
    padding: 0 0;
  }
  .el-form .el-table__header th{
    padding: 0 0;
  }
  .paging-postion em{
    display: inline-block;
    margin-right: .5rem;
    color: #ff0000;
  }
</style>
