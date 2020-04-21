<template>
  <section class="scention-ht">
    <navSide title="预约" active="预约排班管理"></navSide>
    <section class="scention-wh">
      <headTop active="预约"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">预约管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>排班管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="schedulingManager-body-top">
          <el-button @click="clickSettingsBooking">设置排班</el-button>
        </div>
        <div class="schedulingManager-body-content">
          <div class="schedulingManager-body-content-table" style="width: 35%">
            <div class="schedulingManager-body-content-title">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  {{this.leftTitle}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item command="false">当前排班</el-dropdown-item>
                  <el-dropdown-item command="true">历史排班</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <el-table
              border
            :data="tableLeft"
            fit="false"
            :row-style="table1Style"
            >
              <el-table-column
              label="日期"
              prop="date"
              ></el-table-column>
              <el-table-column
              label="星期"
              prop="dayOfWeek"
              ></el-table-column>
              <el-table-column
              label="操作"
              >
                <template slot-scope="scope">
                  <div style="color: blue;font-size: 15px;" class="cursor-pointer" @click="viewDetail(scope.row.date)">查看</div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNumDialog1"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSizeDialog1"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              v-if="historyStatus"
            >
            </el-pagination>
          </div>
          <div style="width: 55%;margin-left: 2rem">
            <div class="schedulingManager-body-content-title">
              <span style="font-size: 14px">排班详情({{this.now}})</span>
            </div>
            <el-table
              border
            :data="tableRight"
            :row-style="table2Style"
            >
              <el-table-column
              label="可预约时段"
              >
                <template slot-scope="scope">
                  <p>{{scope.row.startTime+'-'+scope.row.endTime}}</p>
                </template>
              </el-table-column>
              <el-table-column
              label="可预约员工"
              >
                <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.empList" :key="index">{{item.appointFlag ===0?item.empName+' ':''}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-dialog title="设置排班" :visible.sync="dialog1Status">
            <el-button @click="addBookingClick" style="margin-bottom:1.6rem">新增</el-button>
            <el-table
              border
            :data="dialog1Data"
            :row-style="table1Style"
            >
              <el-table-column
              label="可预约时段"
              >
                <template slot-scope="scope">
                  <p>{{scope.row.startTime+'-'+scope.row.endTime}}</p>
                </template>
              </el-table-column>
              <el-table-column
              label="可预约员工"
              >
                <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.empList" :key="index">{{item.empName}} </span>
                </template>
              </el-table-column>
              <el-table-column
              label="可预约周期"
              >
                <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.dayOfWeek" :key="index">{{item}} </span>
                </template>
              </el-table-column>
              <el-table-column
              label="操作"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="editBooking(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" @click="delBooking(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="dialog1Footer">
              <el-button @click="dialog1Status = false">取消</el-button>
              <el-button type="primary" @click="dialog1Status = false">保存</el-button>
            </div>
          </el-dialog>
          <el-dialog :title="dialog2Title" :visible.sync="dialog2Status">
            <el-form>
              <el-form-item label="预约时段：">
                <el-time-picker
                  is-range
                  v-model="timePicker"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                  value-format="yyyy-MM-dd hh:mm:ss">
                </el-time-picker>
              </el-form-item>
              <el-form-item label="预约技师：">
                <el-checkbox-group v-model="empListSubmit">
                  <el-checkbox v-for="item in dialog2Data.empListAll" :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="预约周期：">
                  <div>
                    <el-checkbox-group v-model="dialog2Data.dayOfWeek">
                      <el-checkbox label="周日">周日</el-checkbox>
                      <el-checkbox label="周一">周一</el-checkbox>
                      <el-checkbox label="周二">周二</el-checkbox>
                      <el-checkbox label="周三">周三</el-checkbox>
                      <el-checkbox label="周四">周四</el-checkbox>
                      <el-checkbox label="周五">周五</el-checkbox>
                      <el-checkbox label="周六">周六</el-checkbox>
                    </el-checkbox-group>
                  </div>
              </el-form-item>
              <el-form-item>
                <el-button @click="dialog2Status = false">取消</el-button>
                <el-button type="primary" @click="submitDialog2">提交</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import {scheduleListNow} from "../../service/getData";
  import {scheduleDetail} from "../../service/getData";
  import {scheduleListHistory} from "../../service/getData";
  import {bookingTimeList} from "../../service/getData";
  import {addBookingTime} from "../../service/getData";
  import {editBookingTime} from "../../service/getData";
  import {delBookingTime} from "../../service/getData";
  import {getStaffList} from "../../service/getData";

  export default {
      components: {
        headTop,
        navSide
      },
      data(){
        return{
          tableLeft:[],
          tableRight:[],
          dataRight:[],
          dialog1Status:false,//设置排班
          dialog2Status:false,//新增或编辑排班
          dialog1Data:[],
          dialog2Data:{
            timePicker:[],
            dayOfWeek:[],
            empList:[],
            empListSubmit:[]
          },
          empListSubmit:[],
          timePicker:[],
          dialog2Title:'',
          table1Style:{
            height:'4rem'
          },
          table2Style:{
            height:'3.2rem'
          },
          now:'',
          pageNum:1,
          pageSize:10,
          total:0,
          pageNumDialog1:1,
          pageSizeDialog1:10,
          totalDialog1:0,
          historyStatus:false,
          leftTitle:'当前排班'
        }
      },
      methods:{
        async getInitData(){
          let info = await scheduleListNow();
          for(let i =0;i<info.data.list.length;i++){
            switch (info.data.list[i].dayOfWeek) {
              case 1:{
                info.data.list[i].dayOfWeek = '周日';
                break;
              }
              case 2:{
                info.data.list[i].dayOfWeek = '周一';
                break;
              }
              case 3:{
                info.data.list[i].dayOfWeek = '周二';
                break;
              }
              case 4:{
                info.data.list[i].dayOfWeek = '周三';
                break;
              }
              case 5:{
                info.data.list[i].dayOfWeek = '周四';
                break;
              }
              case 6:{
                info.data.list[i].dayOfWeek = '周五';
                break;
              }
              case 7:{
                info.data.list[i].dayOfWeek = '周六';
                break;
              }
            }
          }
          this.tableLeft = info.data.list;
          let infoDetail = await scheduleDetail(this.tableLeft[0].date);
          this.now = this.tableLeft[0].date;
          this.tableRight = infoDetail.data.list
        },
        async editBooking(data){
          // this.now = date;
          this.dialog2Data = data;
          console.log(this.dialog2Data.dayOfWeek);
          let info = await getStaffList('','');
          this.dialog2Data.empListAll = info.data.list;
          this.empListSubmit = [];
          for(let i =0;i<this.dialog2Data.empList.length;i++){
            this.empListSubmit.push(this.dialog2Data.empList[i].empId);
          }
          this.timePicker =['1970-01-01 '+data.startTime+':00','1970-01-01 '+data.endTime+':00'];
          this.dialog2Title = '编辑预约时段';
          this.dialog2Status = true;
        },
        async delBooking(id){
          this.$confirm('确认删除吗？').then(() => {
            delBookingTime(id).then(info =>{
              if(info.code === 0){
                this.$message.success('删除预约时段成功！');
              }else{
                this.$message.error(info.msg);
              }
            });
          });
        },
        async addBookingClick(){
          let info = await getStaffList('','');
          this.dialog2Data = {
            timePicker:[],
            dayOfWeek:[],
            empListAll:[],
          };
          this.empListSubmit = [];
          this.dialog2Data.empListAll = info.data.list;
          this.dialog2Title = '新增预约时段';
          this.dialog2Status = true;
        },
        async viewDetail(date){
          let info = await scheduleDetail(date);
          this.now = date;
          if(info.code === 0){
            this.tableRight = info.data.list;
          }else{
            this.$message.error(info.msg);
          }
        },
        async clickSettingsBooking(){
          let info = await bookingTimeList(this.pageNumDialog1,this.pageSizeDialog1);
          for(let i =0;i<info.data.list.length;i++){
            for(let j = 0;j<info.data.list[i].dayOfWeek.length;j++) {
              switch (info.data.list[i].dayOfWeek[j]) {
                case 1: {
                  info.data.list[i].dayOfWeek[j] = '周日';
                  break;
                }
                case 2: {
                  info.data.list[i].dayOfWeek[j] = '周一';
                  break;
                }
                case 3: {
                  info.data.list[i].dayOfWeek[j] = '周二';
                  break;
                }
                case 4: {
                  info.data.list[i].dayOfWeek[j] = '周三';
                  break;
                }
                case 5: {
                  info.data.list[i].dayOfWeek[j] = '周四';
                  break;
                }
                case 6: {
                  info.data.list[i].dayOfWeek[j] = '周五';
                  break;
                }
                case 7: {
                  info.data.list[i].dayOfWeek[j] = '周六';
                  break;
                }
              }
            }
          }
          this.dialog1Data = info.data.list;
          this.dialog1Status = true;
        },
        async submitDialog2(){
          let weekArray = [];
            for(let j =0;j<this.dialog2Data.dayOfWeek.length;j++){
              switch (this.dialog2Data.dayOfWeek[j]) {
                case '周日': {
                  weekArray.push(1);
                  break;
                }
                case '周一': {
                  weekArray.push(2);
                  break;
                }
                case '周二': {
                  weekArray.push(3);
                  break;
                }
                case '周三': {
                  weekArray.push(4);
                  break;
                }
                case '周四': {
                  weekArray.push(5);
                  break;
                }
                case '周五': {
                  weekArray.push(6);
                  break;
                }
                case '周六': {
                  weekArray.push(7);
                  break;
                }
            }
          }
          console.log(this.empListSubmit);
          if(this.dialog2Title==='新增预约时段'){
            //循环找到所有的理疗师姓名
            for(let i =0;i<this.empListSubmit.length;i++){
              for(let j =0;j<this.dialog2Data.empListAll.length;j++){
                if(this.empListSubmit[i] === this.dialog2Data.empListAll[j].id){
                  this.empListSubmit[i] = {
                    empId:this.empListSubmit[i]
                  };
                  this.empListSubmit[i].empName = this.dialog2Data.empListAll[j].name
                }
              }
            }
            //说明是新增预约时段
            let info = await addBookingTime(this.timePicker[0].substring(11,16),this.timePicker[1].substring(11,16),weekArray,this.empListSubmit);
            if(info.code === 0){
              this.$message.success('新增预约时段成功！');
              this.dialog2Status = false;
            }else{
              this.$message.error(info.msg)
            }
          }else{
            //说明是编辑预约时段
            for(let i =0;i<this.empListSubmit.length;i++){
              for(let j =0;j<this.dialog2Data.empListAll.length;j++){
                if(this.empListSubmit[i] === this.dialog2Data.empListAll[j].id){
                  this.empListSubmit[i] = {
                    empId:this.empListSubmit[i]
                  };
                  this.empListSubmit[i].empName = this.dialog2Data.empListAll[j].name
                }
              }
            }
            let info = await editBookingTime(this.dialog2Data.id,this.timePicker[0].substring(11,16),this.timePicker[1].substring(11,16),weekArray,this.empListSubmit);
            if(info.code ===0){
              this.$message.success('修改预约时段成功！');
              this.dialog2Status = false;
            }else{
              this.$message.error(info.msg);
            }
          }
        },
        async handleCurrentChange(val){
          this.pageNumDialog1 = val;
          console.log(`当前页: ${val}`);
          this.getHistoryList();
        },
        async getHistoryList(){
          let info = await scheduleListHistory(this.pageNumDialog1,this.pageSize);
          for(let i =0;i<info.data.list.length;i++){
            switch (info.data.list[i].dayOfWeek) {
              case 1:{
                info.data.list[i].dayOfWeek = '周日';
                break;
              }
              case 2:{
                info.data.list[i].dayOfWeek = '周一';
                break;
              }
              case 3:{
                info.data.list[i].dayOfWeek = '周二';
                break;
              }
              case 4:{
                info.data.list[i].dayOfWeek = '周三';
                break;
              }
              case 5:{
                info.data.list[i].dayOfWeek = '周四';
                break;
              }
              case 6:{
                info.data.list[i].dayOfWeek = '周五';
                break;
              }
              case 7:{
                info.data.list[i].dayOfWeek = '周六';
                break;
              }
            }
          }
          if(info.code === 0){
            this.tableLeft = info.data.list;
            this.total = info.data.total;
          }else {
            this.$message.error(info.msg);
          }
        },
        handleCommand(command){
          if(command === 'true'){
            this.historyStatus = true
          }else if(command === 'false'){
            this.historyStatus = false;
          }
        }
      },
    mounted(){
      this.getInitData();
    },
    watch:{
        historyStatus:function (){
          if(this.historyStatus === true){
            this.leftTitle = '历史排班';
            this.getHistoryList();
          }else{
            this.leftTitle = '当前排班';
            this.getInitData();
          }
        }
    }
    }
</script>

<style lang="scss" scoped>
  .schedulingManager-body-top{
    height: 6rem;
    width: 100%;
    padding-left: 2rem;
    display: flex;
    align-items: center;
  }
  .schedulingManager-body-content{
    display: flex;
    justify-content: center;
  }
  .dialog1Footer{
    margin-top: 3rem;
    display: flex;
    justify-content: flex-end;
  }
  .cursor-pointer:hover{
    cursor: pointer;
  }
</style>
