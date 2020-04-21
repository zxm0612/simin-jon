<template>
  <section class="scention-ht">
    <navSide active="预约管理" title="预约"></navSide>
    <section class="scention-wh">
      <headTop active="预约"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>预约管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-ipt">
            <span>筛选查询</span>
            <div class="mr-top head-input">
                <span>输入搜索：</span>
                <el-input v-model="fromData.keyword" placeholder="姓名/手机号" class="input-width"></el-input>
                <span>状态：</span>
                <el-select v-model="fromData.verifyStatus" clearable  placeholder="全部">
                <el-option label="全部" value=""></el-option>
                <el-option label="已处理" value="1"></el-option>
                <el-option label="未处理" value="0"></el-option>
                </el-select>
                <span>预约来源：</span>
                <el-select v-model="fromData.appType" slot="prepend" placeholder="全部">
                <el-option label="全部" value=""></el-option>
                <el-option label="门店后台" value="cms"></el-option>
                <el-option label="公众号" value="wxgz"></el-option>
                <el-option label="小程序" value="wxmini"></el-option>
                </el-select>
                <div class="block mr-top">
                <span class="demonstration">预约时间：</span>
                <el-date-picker
                    v-model="dateList"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-value="new Date()"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                </div>
                <el-row class="mr-top">
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button @click="reset">重置</el-button>
                </el-row>
            </div>
        </div>
        <div class="box-content clearfix">          
          <div class="mr-bottom clearfix">
              <el-row class="fll mr-right">
                <el-button type="primary" >新增</el-button>
              </el-row>
              <!-- <el-row class="fll">
                <el-button type="primary" >刷新</el-button>
              </el-row> -->
            </div>
            <el-table :data="table" >
                <el-table-column prop="appointId" label="预约编号" width="130">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" width="130">
                    
                </el-table-column>
                <el-table-column prop="userName" label="姓名">
                </el-table-column>
                <el-table-column prop="createDate" label="预约项目" width="200">
                    <template slot-scope="scope">
                        <div style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis;"  v-for="(item,index) in scope.row.appointItemList" :key="index" v-if="scope.row.shoppingType !== 3">{{ item.productName }}</div>
                        <div style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis;" v-if="scope.row.shoppingType === 3" >-</div>
                    </template>
                </el-table-column>
                <el-table-column prop="appointStartTime" label="预约时间" width="140">
                    <template slot-scope="scope">
                        <span>{{ scope.row.appointDate + ' ' +  scope.row.appointStartTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="appointNum" label="预约人数">
                    
                </el-table-column>
                <el-table-column prop="appointEmpList" label="调理师" width="150">
                    <template slot-scope="scope">
                        <span v-for="(item,index) in scope.row.appointEmpList" :key="index">{{ item.empName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="shoppingTypeStr" label="预约方式">
                </el-table-column>
                <el-table-column prop="appTypeStr" label="预约来源">
                </el-table-column>
                <el-table-column prop="mendianName" label="预约门店">
                </el-table-column>
                <el-table-column prop="verifyStatusStr" label="状态">
                </el-table-column>
                <el-table-column label="处理结果">
                    <template slot-scope="scope" >
                        <div v-if="scope.row.confirmState">
                            <div v-if="scope.row.confirmNum">消费{{ scope.row.confirmNum }}</div>
                            <div v-if="scope.row.cancelNum">取消{{ scope.row.cancelNum }}</div>
                        </div>
                        <span v-else >- </span>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作">
                    <template slot-scope="scope" v-if="scope.row.verifyStatus === 0">
                    <el-button @click="onHandle(scope.row)" type="text" size="small">处理</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paging-postion">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="fromData.pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="fromData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
        </div>
      </div>
    </section>
    <el-dialog
        title="确认消费"
        :visible.sync="dialogVisible"
        width="800px">
        <el-table :data="verifyFrom.result" style="width: 100%" v-if="detail.shoppingType !== 3">
            <el-table-column prop="productName" label="预约项目">
            </el-table-column>
            <el-table-column label="调理师">
                <template slot-scope="scope">
                     <el-select v-model="scope.row.empId" placeholder="请选择" >
                        <el-option
                        v-for="item in allEmpList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-radio v-model="scope.row.verify" label="1" @change="changeRadio">确认消费</el-radio>
                    <el-radio v-model="scope.row.verify" label="2" @change="changeRadio">取消预约</el-radio>
                </template>
            </el-table-column>
        </el-table>        
        <el-table :data="verifyFrom.result" style="width: 100%" v-if="detail.shoppingType === 3">
            <el-table-column prop="productName" label="健康管理卡包含项目">
            </el-table-column>
            <el-table-column label="消费数量">
                <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount" @change="changeRadio" :min="0" :max="10" ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="调理师">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.list" multiple placeholder="请选择"  @change="changeSelect" >
                        <el-option
                        v-for="item in allEmpList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>        
        <div slot="footer" class="dialog-footer">
            <div class="dialog-footer" v-if="detail.verifyStatus === 0">剩{{ detail.remainNum }}次，已选中：<span class="s">{{ num }}</span></div>
            <el-button @click="onqx">取 消</el-button>
            <el-button type="primary" @click="enterVerifyFrom">确 定</el-button>
        </div>
    </el-dialog>
    <!-- <el-dialog
        title="确认消费"
        :visible.sync="dialogVisible"
        width="800px">      
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="enterVerifyFrom">确 定</el-button>
        </span>
    </el-dialog> -->

  </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import fetch from "@/config/fetch"
  import { getStaffLists } from '@/service/getData'
  export default {
    data () {
      return {
        //查询预约列表
        fromData:{
            keyword:'',//	string	是	搜索关键词(姓名/手机号)
            appType:'',//	date	是	来源:wxgz-公众号,cms-后台
            verifyStatus:'',//	int	是	处理状态:0-未处理 1.已处理 
            startTime:'',//	date	是	开始时间
            endTime:'',//	date	是	截止时间
            pageNum:1,//	int	否	页码,从1开始
            pageSize:10,//	int	否	分页大小,例如每页10条记录
        },
        dateList:null, //时间
        table:[],
        total:0,  
        dialogVisible: false,
        //预约详情
        detail:{

        },
        ///疗程卡/次卡
        verifyFrom:{
            appointId:'',
            result:[

            ]
        },
        //健康管理卡理疗师列表
        l:[],
        //健康管理卡已选次数
        num:0,
        shoppingDetail:null,
        allEmpList:[]//员工列表      
      }
    },
    mounted:function(){
      this.searchList()
    },
    methods: {
        reset(){
            //重置
            this.fromData = {
                keyword:'',//	string	是	搜索关键词(姓名/手机号)
                appType:'',//	date	是	来源:wxgz-公众号,cms-后台
                verifyStatus:'',//	int	是	处理状态:0-未处理 1.已处理 
                startTime:'',//	date	是	开始时间
                endTime:'',//	date	是	截止时间
                pageNum:1,//	int	否	页码,从1开始
                pageSize:10,//	int	否	分页大小,例如每页10条记录
            }
            this.dateList = null;

        },
        onSearch(){
            this.fromData.pageNum = 1
            this.searchList()
        },
        async searchList(){
            console.log(this.dateList)
            if(this.dateList !== null){
                this.fromData.startTime = this.dateList[0] + ' 00:00:00'
                this.fromData.endTime = this.dateList[1] + ' 23:59:59'
            }else{
                this.fromData.startTime = ''
                this.fromData.endTime = ''
            }
            let data = await fetch('/cms/api/appoint/list',this.fromData)
            for(let i in data.data.list){
                switch(data.data.list[i].shoppingType){
                    case 1:
                    data.data.list[i].shoppingTypeStr = '次卡预约'
                    break
                    case 2:
                    data.data.list[i].shoppingTypeStr = '疗程卡预约'
                    break
                    case 3:
                    data.data.list[i].shoppingTypeStr = '健康管理卡预约'
                    break
                }
                switch(data.data.list[i].appType){
                    case 'wxgz':
                    data.data.list[i].appTypeStr = '公众号'
                    break
                    case 'cms':
                    data.data.list[i].appTypeStr = '管理后台'
                    break
                    case 'wxmini':
                    data.data.list[i].appTypeStr = '小程序'
                    break
                }
                switch(data.data.list[i].verifyStatus){
                    case 0:
                    data.data.list[i].verifyStatusStr = '未处理'
                    break
                    case 1:
                    data.data.list[i].verifyStatusStr = '已处理'
                    break
                }
                if(data.data.list[i].confirmNum !== undefined || data.data.list[i].cancelNum !== undefined){
                    data.data.list[i].confirmState = true
                }else{
                    data.data.list[i].confirmState = false
                }
                
            }
            this.total = data.data.total;
            this.table = data.data.list            
        },
        //选择是否核销 1确认消费 2取消预约
        changeRadio(val){
            let arr = []
            for(let i in this.verifyFrom.result){
                arr.push(this.verifyFrom.result[i])
            }
            this.verifyFrom.result = arr

            if(this.detail.shoppingType === 3){
                this.num = 0
                for(let i in this.verifyFrom.result){
                    this.num += this.verifyFrom.result[i].amount
                }
            }
        },
        changeSelect(){

        },
        onqx(){
            this.dialogVisible = false
            this.num = 0
        },
        //点击处理
        async onHandle(row){
            const list = await getStaffLists('') 
           // console.log(row)
            this.allEmpList = list.data.list
            this.getDetail(row)  
        },
        async getDetail(row){
            const detail = await fetch('/cms/api/appoint/detail',{appointId:row.appointId})                       
            this.detail = detail.data.detail
            this.verifyFrom.appointId = detail.data.detail.appointId
            this.verifyFrom.result = []
            //console.log(this.detail)
            if(this.detail.shoppingType === 3){
                //console.log(row)
                //如果是健康管理卡
                for(let i in this.detail.productList){
                    let obj = {
                        productId:this.detail.productList[i].productId,        
                        productName:this.detail.productList[i].name,        
                        amount:0,
                        list:[], 
                        empList:[], 
                    }
                    this.verifyFrom.result.push(obj)
                }
            }else{
                //如果是次卡疗程卡
                for(let i in this.detail.appointItemList){
                    if(detail.data.detail.appointItemList[i].appointStatus === 0){                        
                        detail.data.detail.appointItemList[i].verify = ''
                        this.verifyFrom.result.push(detail.data.detail.appointItemList[i])
                    }
                }
            }
            this.dialogVisible = true
        },
        async enterVerifyFrom(){
            if(this.verifyFrom.result.length == 0){
                return
            }
            for(let i in this.verifyFrom.result){
                // delete this.verifyFrom.result[i]['appointStatus']
                // delete this.verifyFrom.result[i]['productName']
                if(this.verifyFrom.result[i].verify == ''){
                    this.$message.warning('请处理完操作')
                    return
                }
                if(this.detail.shoppingType === 3){
                    this.verifyFrom.result[i].empList = []
                    console.log(this.verifyFrom.result[i].amount)
                    for(let b in this.verifyFrom.result[i].list){
                        for( let c in this.allEmpList){
                            if(this.allEmpList[c].id === this.verifyFrom.result[i].list[b]){
                                this.verifyFrom.result[i].empList.push({ empId:this.allEmpList[c].id, empName: this.allEmpList[c].name})
                            }
                        }
                    }
                    if(this.verifyFrom.result[i].empList.length !== this.verifyFrom.result[i].amount){
                        this.$message.warning('第'+ (parseInt(i)+1) +'行, 调理师数量必须与消费数量相等')
                        return false
                    }
                }
            }
            let option = null
            let URL = ''
            if(this.detail.shoppingType === 3){
                option = {
                    appointId:this.verifyFrom.appointId,
                    result:[

                    ]
                }
                URL = '/cms/api/appoint/healthCard/verify'
                for(let i in this.verifyFrom.result){
                    if(this.verifyFrom.result[i].amount !== 0){
                        option.result[i] = {}
                        option.result[i].amount = this.verifyFrom.result[i].amount
                        option.result[i].empList = this.verifyFrom.result[i].empList
                        option.result[i].verify = 1
                        option.result[i].productId = this.verifyFrom.result[i].productId
                    }
                    
                }
            }else{
                option = this.verifyFrom
                URL = '/cms/api/appoint/verify'
            }
            

            console.log(option)
            const res = await fetch(URL,option,'POST','Json')
            if(res.code === 0){
                this.$message.success('操作成功')
                this.searchList()
            } 
            this.dialogVisible = false   
        },
        handleSizeChange(val){
            this.fromData.pageSize = val
            this.searchList()
        },
        handleCurrentChange(val){
            this.fromData.pageNum = val
            this.searchList()
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
  .dialog-footer{
      display: inline-block;
      margin-right: 20px;
      .s{
          color: red;
      }
  }
</style>
