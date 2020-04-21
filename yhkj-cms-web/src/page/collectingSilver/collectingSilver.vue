<template>
  <section>
    <div class="sy-head">
      <div class="logo"><img src="../../images/syt_03.png"></div>
      <div class="title">收银台</div>
      <div class="close_btn" @click="$router.go(-1)"><i class="el-icon-arrow-left"></i> 返回管理后台</div>
    </div>
    <div class="container">
      <div class="card_view">
        <div class="title">充值用户资料</div>
        <div class="view_content">
          <el-form :inline="true" size="small" @submit.native.prevent>
            <el-form-item >
              <el-autocomplete
              style="width:300px"
              popper-class="my-autocomplete"
              v-model="keyword"
              autocomplete="off"
              :fetch-suggestions="querySearch"
              placeholder="输入姓名或者手机号码"
              @select="handleSelect">
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onRecharge">充值</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onAddCard">办卡（疗程卡/管理卡）</el-button>
            </el-form-item>
          </el-form>
          <div class="formInline1">
            <span>姓名：{{ formInline.name }}</span>
            <span>手机号码：{{ formInline.phone }}</span>
            <span>所属门店：{{ formInline.mendianName }}</span>
            <span>余额：{{ formInline.balance }}元</span>
            </div>
          <!-- <el-form :inline="true" :model="formInline" size="small">
            <el-form-item label="姓名：">
              <el-input v-model="formInline.name" disabled placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：">
              <el-input v-model="formInline.phone" disabled placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="所属门店：">
              <el-input v-model="formInline.mendianName" disabled placeholder="请输入门店"></el-input>
            </el-form-item>
            <el-form-item label="余额：">
              <el-input v-model="formInline.balance" disabled placeholder="请输入余额"></el-input>
            </el-form-item>
          </el-form> -->
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="card_view" :style="{height: boxHeight }" style="overflow-y: auto;">
            <div class="title">选择项目</div>
            <div class="view_content">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="已有卡券" name="haveCard" v-if="isVip">
                  <div style="text-align: center; margin-bottom:10px;">
                    <el-button-group size="mini">
                      <el-button type="" size="mini" class="haveCardBtn" :autofocus="true" :class="{active : myCardTab[0]}" @click="onMyTab(1)">次卡</el-button>
                      <el-button type="" size="mini" class="haveCardBtn" :class="{active : myCardTab[1]}" @click="onMyTab(2)">疗程卡</el-button>
                      <el-button type="" size="mini" class="haveCardBtn" :class="{active : myCardTab[2]}" @click="onMyTab(3)">健康管理卡</el-button>
                    </el-button-group>
                  </div>
                  <div class="" v-show="myCardTab[0]">
                    <el-table :data="userGoodsList0" size="small" height="39.8vh">
                      <el-table-column prop="title" label="次卡名称" width="200">
                      </el-table-column>
                      <el-table-column label="包含项目" width="200">
                        <template slot-scope="scope">
                          <p v-for="item in scope.row.productList" :key="item.id">{{ item.name + '  x'+ item.remainNum }}</p>
                        </template>
                      </el-table-column>
                      <el-table-column prop="operation" label="操作">
                        <template slot-scope="scope">
                          <el-button  type="text" @click="addCarCk(scope.row,0,false)" size="small">添加</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="" v-show="myCardTab[1]">
                    <el-collapse v-model="myLcActiveName" accordion>
                      <el-collapse-item v-for="(item,index) in userGoodsList1" :key="index"  :title="item.title" :name="index">
                        <div v-for="(obj,i) in item.productList" :key="i" class="accordion_iitem" >{{ obj.name + '(剩余次数 x' + obj.remainNum}}) <el-button  type="text" @click="addCarCk(item,i,false)" size="small">添加消费</el-button></div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                  <div class="" v-show="myCardTab[2]">
                    <el-collapse v-model="myLcActiveName" accordion>
                      <el-collapse-item v-for="(item,index) in userGoodsList2" :key="index"  :title="item.title  + '(剩余次数 x' + item.remainNum +')'" :name="index">
                        <div v-for="(obj,i) in item.productList" :key="i" class="accordion_iitem" >{{ obj.name }} <el-button  type="text" @click="addCarCk(item,i,false)" size="small">添加消费</el-button></div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="门店项目" name="oneCard">
                  <el-input v-model="ckKeyword" placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" @keyup.enter.native="onSearchCk"
                  ></el-input>
                  <el-table :data="ckList" size="small" height="37.1vh">
                    <el-table-column prop="title" label="次卡名称" width="140">
                    </el-table-column>
                    <el-table-column label="包含项目" width="180">
                      <template slot-scope="scope">
                        <p v-for="item in scope.row.productList" :key="item.id">{{ item.name }}</p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格(元)">
                    </el-table-column>
                    <el-table-column prop="operation" label="操作">
                      <template slot-scope="scope">
                        <el-button  type="text" @click="addCarCk(scope.row,0,true)" size="small">添加</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div style="padding-top:15px; float:right">
                    <el-pagination small layout="prev, pager, next" :total="ckTotal"  :current-page="ckPageNum"  @current-change="handleCurrentChangeT1">
                    </el-pagination>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="card_view" :style="{height: boxHeight }">
            <div class="title">已选消费列表</div>
            <div class="view_content">
              <el-table :data="ckSelect" height="49.5vh"  size="small">
                <el-table-column prop="name" label="商品名称">
                </el-table-column>
                <el-table-column prop="shoppingTypeName" label="商品类型">
                </el-table-column>
                <el-table-column prop="isNewStr" label="消费模式">
                </el-table-column>
                <el-table-column prop="cost" label="原价(元)">
                </el-table-column>
                <el-table-column label="数量" width="150">
                  <template slot-scope="scope" style="margin:0 auto">
                    <el-input-number size="mini" v-model="scope.row.num" :min="1" :max="scope.row.temporaryTotal" @change="change4" @focus="change5"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column label="应收金额(元)">
                  <template slot-scope="scope" >
                    <p>{{ (scope.row.num * scope.row.price) }}</p>
                  </template>
                </el-table-column>
                <el-table-column  label="调理师" width="130">
                  <template slot-scope="scope" >
                    <el-select v-model="scope.row.empId" size="mini" @change="change2" placeholder="请选择">
                      <el-option v-for="(item,index) in llsList" :label="item.name" :value='item.id' :key="index"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作">
                  <template slot-scope="scope">
                    <el-button  @click="ckDel(scope.$index)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--底部信息栏-->
    <div class="bottom_info">
      <div class="price"><p class="p">数量 x </p>{{ ckSelectNum }} <p class="p">应收金额 &nbsp;</p><span class="p s1"> &yen; </span> {{ upForm.totalMoney.toFixed(2) }} </div>
      <div class="form">
        <el-form :inline="true" :model="formInline" size="small">
          <el-form-item label="下单时间">
            <el-date-picker
              v-model="todayTime"
              disabled
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="upForm.remark" placeholder="请输入备注" style="width:400px;"></el-input>
          </el-form-item>
          <el-button type="primary" class="flr"  @click="showPayDialog">结算</el-button>
        </el-form>
      </div>
    </div>

    <!--办卡弹出框开始-->
    <div class="xm_cssss">
      <el-dialog title="办卡(疗程卡/管理卡)" :visible.sync="applyCard" custom-class="card-dialog" width="98%" top="5vh"  >
        <div class="box-content-tblr" style="background: #e5e5e5;">
          <el-form :inline="true" :model="formInline" size="small">
            <el-form-item label="姓名：">
              <el-input v-model="formInline.name" disabled placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：">
              <el-input v-model="formInline.phone" disabled placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="所属门店：">
              <el-input v-model="formInline.mendianName" disabled placeholder="请输入门店"></el-input>
            </el-form-item>
            <el-form-item label="余额：">
              <el-input v-model="formInline.balance" disabled placeholder="请输入余额"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="mr-top box-clear" style="margin-bottom:40px">
          <div class="box-border box-left">
            <div class="box-head">
              <h4>选择卡</h4>
            </div>
            <div style="padding:0 15px 10px 15px;">
              <el-tabs>
                <el-tab-pane>
                  <span slot="label" @click="getGoodsListT2">疗程卡</span>
                      <el-input v-model="applyCardForm.lckw"  placeholder="搜索疗程卡" size="mini" prefix-icon="el-icon-search" @keyup.enter.native="onSearchLc"></el-input>
                      <div class="mr-top">
                        <el-table :data="applyCardForm.lcList" size="small" height="40vh">
                          <el-table-column prop="title" label="疗程卡名称"  width="250">
                          </el-table-column>
                          <el-table-column prop="price" label="价格(元)">
                          </el-table-column>
                          <el-table-column prop="operation" label="操作">
                            <template slot-scope="scope">
                              <el-button  type="text" @click="addCar(scope.row)" size="small">添加</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                        <div class="paging-postion">
                          <el-pagination layout="prev, pager, next" small :total="applyCardForm.lcTotal" :current-page="applyCardForm.lcPageNum"  @current-change="handleCurrentChangeT2">
                          </el-pagination>
                        </div>
                      </div>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label" @click="getGoodsListT3">健康管理卡</span>
                  <el-input v-model="applyCardForm.jkkw" placeholder="请输入次卡名称"  size="mini" prefix-icon="el-icon-search" @keyup.enter.native="onSearchJk"></el-input>
                  <div class="mr-top">
                    <el-table :data="applyCardForm.jkList" size="small" height="40vh">
                      <el-table-column prop="title" label="健康管理卡名称">
                      </el-table-column>
                      <el-table-column prop="price" label="价格(元)">
                      </el-table-column>
                      <el-table-column prop="operation" label="操作">
                        <template slot-scope="scope">
                          <el-button  type="text" @click="addCar(scope.row)" size="small">添加</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="paging-postion">
                      <el-pagination layout="prev, pager, next" small :total="applyCardForm.jkTotal" :current-page="applyCardForm.jkPageNum"  @current-change="handleCurrentChangeT3">
                      </el-pagination>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="box-border box-right">
            <div class="box-head">已选消费列表</div>
            <div class="mr-tblr">
              <el-table :data="applyCardForm.selectData" height="51.6vh"  size="small">
                <el-table-column prop="title" label="商品名称" width="250">
                </el-table-column>
                <el-table-column prop="shoppingTypeName" label="商品类型">
                </el-table-column>
                <el-table-column prop="cost" label="原价">
                </el-table-column>
                <el-table-column prop="num" label="数量">
                  <template slot-scope="scope" style="margin:0 auto">
                    <el-input-number size="mini" v-model="scope.row.num" :min="1" :max="10" @change="change3"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column prop="price" label="应收金额">
                </el-table-column>
                <el-table-column prop="culinarian" label="销售人员" width="180">
                  <template slot-scope="scope" >
                    <el-select v-model="scope.row.sales" size="mini" @change="change3" multiple placeholder="请选择">
                      <el-option v-for="(item,index) in applyCardForm.salesperson" :label="item.name" :value='item.id' :key="index"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作">
                  <template slot-scope="scope">
                    <el-button  type="text" size="small"   @click="ckDel2(scope.$index)" >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="bottom_info bottom_info2">
          <div class="price"><p class="p">数量 x </p>{{ bkNum }} <p class="p">应收金额&nbsp;</p><span class="p s1"> &yen; </span> {{ upapplyCardForm.totalMoney.toFixed(2) }} </div>
          <div class="form">
            <el-form :inline="true" :model="formInline" size="small">
              <el-form-item label="下单时间">
                <el-date-picker
                  v-model="todayTime"
                  disabled
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="upapplyCardForm.remark" placeholder="请输入备注" style="width:400px;"></el-input>
              </el-form-item>
              <el-button type="primary" class="flr"  @click="onpay2">结算</el-button>
            </el-form>
          </div>
        </div>
      </el-dialog>
    </div>
    <!--办卡弹出框结束-->
    <!--结算弹出-->
    <el-dialog title="结算确认" :visible.sync="payDialog" width="600px">
      <el-form ref="form" :model="upForm" label-width="80px" size="small">
        <el-form-item label="应收总额">
          <div><span style="font-size:24px; color:red">{{upForm.totalMoney}}</span>元</div>
        </el-form-item>
        <el-form-item label="会员">
          {{formInline.name}}
          <!-- <el-input v-model="formInline.name" :disabled="true" style="border:none"></el-input> -->
        </el-form-item>
        <el-form-item label="账户余额" v-if="isVip">
          <div><span style="font-size:24px; color:red">{{formInline.balance}}</span>元</div>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-radio-group  v-model="upForm.payType" @change="onPayType">
            <el-radio :label="1">微信</el-radio>
            <el-radio :label="2">支付宝</el-radio>
            <el-radio :label="3" v-if="isVip">余额</el-radio>
            <el-radio :label="4">现金</el-radio>
            <el-radio :label="5">银联</el-radio>
            <el-radio :label="6">其它</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="付款金额">
          <el-input type="text" v-model.number="upForm.payMoney" style="width:200px"><template slot="append">元</template></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <div>支付<span style="font-size:24px; color:red"> {{upForm.payMoney}}</span>元</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="payDialog = false">取 消</el-button>
        <el-button type="primary" @click="onpay1()">确 定</el-button>
      </span>
    </el-dialog>
    <!--结算弹出en-->
    <!--办卡结算弹出-->
    <el-dialog title="结算确认" :visible.sync="payDialogBk" width="600px">
      <el-form ref="form" :model="upForm" label-width="80px" size="small">
        <el-form-item label="应收总额">
          <div><span style="font-size:24px; color:red">{{upapplyCardForm.totalMoney}}</span>元</div>
        </el-form-item>
        <el-form-item label="会员">
          {{formInline.name}}
          <!-- <el-input v-model="formInline.name" :disabled="true" style="border:none"></el-input> -->
        </el-form-item>
        <el-form-item label="账户余额" v-if="isVip">
          <div><span style="font-size:24px; color:red">{{formInline.balance}}</span>元</div>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-radio-group  v-model="upapplyCardForm.payType" @change="onPayType2">
            <el-radio :label="1">微信</el-radio>
            <el-radio :label="2">支付宝</el-radio>
            <el-radio :label="3">余额</el-radio>
            <el-radio :label="4">现金</el-radio>
            <el-radio :label="5">银联</el-radio>
            <el-radio :label="6">其它</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="付款金额">
          <el-input type="text" v-model.number="upapplyCardForm.payMoney" style="width:200px"><template slot="append">元</template></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <div>支付<span style="font-size:24px; color:red"> {{upapplyCardForm.payMoney}}</span>元</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="payDialogBk = false">取 消</el-button>
        <el-button type="primary" @click="onPayBk()">确 定</el-button>
      </span>
    </el-dialog>
    <!--结算弹出en-->
    <!--充值弹出-->
    <el-dialog title="充值" :visible.sync="rechargeDialog" width="600px">
      <el-form ref="form" :model="upForm" label-width="80px" size="small">
        <el-form-item label="会员">
          {{formInline.name}}
          <!-- <el-input v-model="formInline.name" :disabled="true" style="border:none"></el-input> -->
        </el-form-item>
        <el-form-item label="支付方式">
          <el-radio-group  v-model="rechargeForm.payType" @change="onPayType2">
            <el-radio :label="1">微信</el-radio>
            <el-radio :label="2">支付宝</el-radio>
            <el-radio :label="4">现金</el-radio>
            <el-radio :label="5">银联</el-radio>
            <el-radio :label="6">其它</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="充值金额">
          <el-input type="text" v-model="rechargeForm.payMoney" placeholder="请输入金额" style="width:200px"><template slot="append">元</template></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="rechargeForm.remark" placeholder="请输入备注" :max="120"></el-input>
        </el-form-item>
        <el-form-item label="销售人员">
          <el-select v-model="rechargeFormSales" size="mini" @change="change3" multiple placeholder="请选择">
            <el-option v-for="(item,index) in applyCardForm.salesperson" :label="item.name" :value='item.id' :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rechargeDialog = false">取 消</el-button>
        <el-button type="primary" @click="onRechargePay()">确 定</el-button>
      </span>
    </el-dialog>
    <!--充值弹出en-->
    <!--充值确认弹出-->
    <el-dialog title="结算确认" :visible.sync="rechargeDialogc" width="600px">
      <el-form ref="form" :model="upForm" label-width="80px" size="small">
        <el-form-item label="应收总额">

          <div><span style="font-size:24px; color:red">{{rechargeForm.payMoney}}</span>元</div>
          <!-- <el-input v-model="formInline.name" :disabled="true" style="border:none"></el-input> -->
        </el-form-item>
        <el-form-item label="会员">
          {{formInline.name}}
          <!-- <el-input v-model="formInline.name" :disabled="true" style="border:none"></el-input> -->
        </el-form-item>
        <el-form-item label="支付方式">
          <el-radio-group  v-model="rechargeForm.payType" @change="onPayType2">
            <el-radio :label="1">微信</el-radio>
            <el-radio :label="2">支付宝</el-radio>
            <el-radio :label="4">现金</el-radio>
            <el-radio :label="5">银联</el-radio>
            <el-radio :label="6">其它</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="确认金额">
          <el-input type="text" v-model="rechargeForm.totalMoney" placeholder="请输入金额" style="width:200px"><template slot="append">元</template></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <div>支付<span style="font-size:24px; color:red"> {{rechargeForm.totalMoney}}</span>元</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rechargeDialogc = false">取 消</el-button>
        <el-button type="primary" @click="onRechargePayC()">确 定</el-button>
      </span>
    </el-dialog>
    <!--充值确认弹出en-->

  </section>
</template>
<script>
  // import headTop from '../../components/header/head'
  // import navSide from '../../components/nav/nav'
  import {vipList,vipInfo,getMendianGoodsList,getStaffLists,payExpense,vipApplyCard,getAppuserShoppingList,vipRecharge_v} from '../../service/getData'
  import fetch from '@/config/fetch'
  export default {
    data () {
      return {
        keyword:'',
        autofocus:false,
        todayTime:new Date(),
        boxHeight:'',
        //用户信息表单
        formInline: {
          "id": "",
          "name": "散客",
          "phone": 0,
          "sex": " ",
          "birthday": "",
          "height": 0,
          "address": "",
          "mendianId": "1",
          "balance": 0,
          "mendianName": "",
          "registTime": "",
          "appType": "",
          "phoneOs": "",
          "phoneOsVer": "",
          "lastLoginTime": ""
        },
        isVip:false,//是否会员
        //没有会员次卡
        activeName:'oneCard',
        showC:false,
        myCardTab:[true,false,false],
        //返回用户所拥有卡券列表
        userGoodsList0:[],
        userGoodsList1:[],
        userGoodsList2:[],
        myLcActiveName:0,//我的疗程卡默认显示
        ///用户搜索框自动弹出列表
        restaurants:[
        ],
        ckListHeight:'',
        ckKeyword:'',
        delSave:[],
        ckList:[],///默认次卡列表
        ckPageNum:1,//默认次卡页码
        ckTotal:1,//默认次卡总数量
        ckSelect:[],//已选择的次卡
        ckSelectNum:0,///次卡总数
        llsList:[],//理疗师列表
        upForm:{
          "userId": "",
          "totalMoney": 0.00,//订单金额 (没有新购项目)
          "remark": "",
          "payType": 1,///支付方式:1-微信 2-支付宝 3.余额(没有新购项目)4现金5银联6其它
          "payMoney": '',//支付金额
          "expenseList": [
          ]
        },
        payDialog:false,
        rechargeDialog:false,///充值弹出
        rechargeDialogc:false,///充值确认弹出
        rechargeFormSales: [],
        rechargeForm:{///充值表单
          "userId": "",
          "totalMoney": '',
          "remark": "",
          "payType": 1,
          "payMoney": '',
          "sales": []
        },

        applyCard:false,//办卡弹出
        applyCardForm:{
          lckw:'',//疗程卡keyword
          lcList:[],///疗程卡列表
          jkkw:'',//健康管理卡keyword
          jkList:[],///健康管理卡列表
          selectData:[],///已选择消费列表
          salesperson:[],//销售人员列表
          time:'',//时间
          num:'',///购买数量
          totalPrice:'',///总价
          remarks:'',//备注
          lcPageNum:1,
          lcTotal:0,
          jkPageNum:1,
          jkTotal:0,
          pageSize:10,
        },
        bkNum:0,
        //办卡提交form
        upapplyCardForm:{
          "userId": "",
          "totalMoney": 0,
          "remark": "",
          "payType": 1,
          "payMoney": '',
          "orderItemList": [{
            "shoppingId": "",
            "price": 0.00,
            "num": 0,
            "sales": []
          }]
        },
        sjs: ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        upSales:[],
        payDialogBk:false
      }
    },
    mounted:function(){
      this.getUserList()
      this.getGoodsListT1()
      this.boxHeight = window.innerHeight - 397 +'px'
      //this.ckListHeight = window.innerHeight - 577 +'px'
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        };
      },
      handleSelect(item) {
        this.getUserInfo(item.id)
      },
      async getStaffList(type){
        //获取员工列表
        const data = await getStaffLists(type)
        if(data.code === 0){
           switch(type){
            case '':
            this.applyCardForm.salesperson = data.data.list
            break
            case '1':
            this.llsList = data.data.list
            break
          }
        }else{
          this.$alert(data.msg)
        }

      },
      async getUserInfo(id){
        //获取会员信息
        this.formInline = await vipInfo(id)
        if(this.formInline.code === 0 ){
          this.formInline = this.formInline['data']['detail'];
          this.isVip = true
          this.activeName = 'haveCard'
          this.ckSelect = [];
          this.getAppuserShoppingLists1(1) //获取已经拥有的次卡
          this.getAppuserShoppingLists2(2)//获取已经拥有的疗程卡
          this.getAppuserShoppingLists3(3)//获取已经拥有的健康管理卡
        }else{
          this.isVip = false
          this.$alert('会员信息获取失败')
        }

      },
      async getUserList(){
        //默认获取自动弹出用户列表30条数据
        let userInfo = await vipList(this.keyword,'','','',1,20)
        this.restaurants = []
        userInfo.data.list.forEach((key)=>{
          let item = {
            value:key.name,
            id:key.id
          }
          if( typeof key.phone !== undefined){
            item.value += key.phone
          }
          this.restaurants.push(item)
        })
        //console.log(this.restaurants)
      },
      async getGoodsListT1(){
        //获取次卡列表
        let result = await getMendianGoodsList(this.ckKeyword,1,this.ckPageNum,this.applyCardForm.pageSize);
        this.ckList = result.data.list
        this.ckTotal = result.data.total
        console.log(this.ckList)
      },
      //搜索次卡
      onSearchCk(){
        this.ckPageNum = 1
        this.getGoodsListT1()
      },
      async getAppuserShoppingLists1(type){
        ///获取会员已购买商品
        const res = await getAppuserShoppingList(this.formInline.id,1)
        if(res.code === 0){
          for(let i in res.data.list){
            for(let b in res.data.list[i].productList){
              res.data.list[i].productList[b].temporaryTotal = res.data.list[i].productList[b].remainNum 
              res.data.list[i].productList[b].contrastId = res.data.list[i].productList[b].productId.toString(5) + this.sjs[Math.ceil(Math.random()*35)]
            }
          }
          this.userGoodsList0 = res.data.list
        }else{
          this.$massege.error('获取不到用户商品信息')
        }
      },
      async getAppuserShoppingLists2(type){
        const res = await getAppuserShoppingList(this.formInline.id,2)
        if(res.code === 0){
          for(let i in res.data.list){
            for(let b in res.data.list[i].productList){
              res.data.list[i].productList[b].temporaryTotal = res.data.list[i].productList[b].remainNum 
              res.data.list[i].productList[b].contrastId = res.data.list[i].productList[b].productId.toString(5) + this.sjs[Math.ceil(Math.random()*35)]
            }
          }
          this.userGoodsList1= res.data.list
        }else{
          this.$massege.error('获取不到用户商品信息')
        }
      },
      async getAppuserShoppingLists3(type){
        const res = await getAppuserShoppingList(this.formInline.id,3)
        if(res.code === 0){
          for(let i in res.data.list){
            res.data.list[i].totalNum = res.data.list[i].remainNum
            for(let b in res.data.list[i].productList){
              //res.data.list[i].productList[b].temporaryTotal = res.data.list[i].productList[b].remainNum 
              res.data.list[i].productList[b].contrastId = res.data.list[i].productList[b].productId.toString(5) + this.sjs[Math.ceil(Math.random()*35)]
            }
          }
          this.userGoodsList2 = res.data.list
        }else{
          this.$massege.error('获取不到用户商品信息')
        }
      },
      onMyTab(type){
        switch(type){
          case 1:
            this.myCardTab = [true,false,false]
            console.log(this.userGoodsList0)
          break
          case 2:
            this.myCardTab = [false,true,false]
            console.log(this.userGoodsList1)
          break
          case 3:
            this.myCardTab = [false,false,true]
            console.log(this.userGoodsList2)
          break
        }
      },
      async getGoodsListT2(){
        //获取疗程卡
        let result = await getMendianGoodsList(this.applyCardForm.lckw,2,this.applyCardForm.lcPageNum,this.applyCardForm.pageSize);
        this.applyCardForm.lcList = result.data.list
        this.applyCardForm.lcTotal = result.data.total
       // console.log(this.applyCardForm.lcList)
      },
      //搜索疗程卡
      onSearchLc(){
        this.applyCardForm.lcPageNum= 1
        this.getGoodsListT2()
      },
      handleCurrentChangeT2(val){
        //疗程卡分页
        this.applyCardForm.lcPageNum = val
        this.getGoodsListT2()
      },
      async getGoodsListT3(){
        //获取健康管理卡
        let result = await getMendianGoodsList(this.applyCardForm.jkkw,3,this.applyCardForm.jkPageNum,this.applyCardForm.pageSize);
        this.applyCardForm.jkList = result.data.list
        this.applyCardForm.jkTotal = result.data.total
      },
      handleCurrentChangeT3(val){
        //健康管理卡分页
        this.applyCardForm.jkPageNum = val
        this.getGoodsListT3()
      },
      handleCurrentChangeT1(val){
        //健康管理卡分页
        this.ckPageNum = val
        this.getGoodsListT1()
      },
      //搜索健康管理卡
      onSearchJk(){
        this.applyCardForm.jkPageNum= 1
        this.getGoodsListT3()
      },
      change5(){
        console.log('1')
      },
      change4(val){
        for(let i in this.userGoodsList2){
          //console.log(this.userGoodsList2[i].shoppingId)
          let n = 0
          for(let c in this.ckSelect){

            if(this.ckSelect[c].shoppingId === this.userGoodsList2[i].shoppingId){
              n += this.ckSelect[c].num
            }
            //his.userGoodsList2[i].totalNum
          }
          if(this.userGoodsList2[i].remainNum > 0){
            this.userGoodsList2[i].remainNum = this.userGoodsList2[i].totalNum - n
          }else{
           this.$alert('消费次数超过了剩余次数了!请核对数据! 程序员正在努力修复这个bug QAQ!') 
          }
          
          //console.log(n)
        }
        ///疗程卡数量增加
        for(let c in this.ckSelect){
          if(this.ckSelect.isNew){
            this.ckSelect[c].price = this.ckSelect[c].cost * this.ckSelect[c].num
          }          
          for(let i in this.userGoodsList1){
            for(let b in this.userGoodsList1[i].productList){
              if(this.ckSelect[c].contrastId === this.userGoodsList1[i].productList[b].contrastId){
                this.userGoodsList1[i].productList[b].remainNum = this.userGoodsList1[i].productList[b].temporaryTotal - this.ckSelect[c].num
              }
            }
            
          }    
        }
        
        this.change1()
      },
      change2(val){
        this.change1()
      },
      change1(obj){
        ///更新已经选择次卡视图
        this.ckSelect.push('')
        this.ckSelect.splice(this.ckSelect.length-1, 1)
        this.TPC()
      },
      change3(obj){
        ///更新已经选择办卡项目视图
        for(let i in this.applyCardForm.selectData){
          this.applyCardForm.selectData[i].price = this.applyCardForm.selectData[i].cost * this.applyCardForm.selectData[i].num
        }
        this.applyCardForm.selectData.push('')
        this.applyCardForm.selectData.splice(this.applyCardForm.selectData.length-1, 1)
        this.TPC2()
      },
      addCar(row){

        ///添加到
        //let obj = row
        if(this.applyCardForm.salesperson.length == 0){
         // this.llsList = this.getStaffList('1')
          this.getStaffList('')
        }
        //console.log(row,this.applyCardForm.selectData)
        for(let i=0; i<this.applyCardForm.selectData.length; i++){
          if(this.applyCardForm.selectData[i].id == row.id || this.applyCardForm.selectData[this.applyCardForm.selectData.length-1].id == row.id){
            this.$alert('该商品已经添加')
            return false
          }
        }
        ////
        switch(row.shoppingType){
          case 1:
          row.shoppingTypeName = '次卡'
          break;
          case 2:
          row.shoppingTypeName = '疗程卡'
          break;
          case 3:
          row.shoppingTypeName = '健康管理卡'
          break;
        }
        row.num = 1
        row.cost = row.price
        row.sales = []
        ///添加到选择消费项目
        this.applyCardForm.selectData.push(row)
        this.TPC2()
      },
      ckDel2(index){
        ///从已选择删除
        this.applyCardForm.selectData.splice(index, 1)
        this.TPC2()
      },
      addCarCk(obj,index,is){
        console.log(obj)
        ////点击添加店铺商品obj传过来的订单对象is是否新购true false
        let row = obj.productList[index] ///获取卡对应项目

        ///获得理疗师列表
        if(this.llsList.length == 0){
          this.getStaffList('1')
        }

        if(obj.productList[index].remainNum <= 0 && !is ){
          this.$alert('该商品已经消费完了,不能再消费了')
          return false
        }

        //
        //console.log(this.ckSelect)

        if(is){
          for(let i in this.ckSelect){
            if( this.ckSelect[i].shoppingId == obj.id || this.ckSelect[this.ckSelect.length-1].shoppingId == row.id ){
              this.$alert('该商品已经添加')
              return
            }
          }
        }else{
          for(let i in this.ckSelect){
            if( this.ckSelect[i].contrastId == row.contrastId || this.ckSelect[this.ckSelect.length-1].contrastId == row.contrastId ){
              this.$alert('该商品已经添加')
              return
            }
          }
        }

        ///添加到次卡选择消费项目
        switch(obj.shoppingType){
          case 1:
          row.shoppingTypeName = '次卡'
          break;
          case 2:
          row.shoppingTypeName = '疗程卡'
          break;
          case 3:
          row.shoppingTypeName = '健康管理卡'
          break;
        }
        row.empId = ''
        row.empName = ''
        row.shoppingType = obj.shoppingType ///项目id
        row.orderItemId = obj.orderItemId ///项目id
        row.orderId = obj.orderId ///创建订单
        row.cost = row.price || 0.00 ///创建成本参数
        row.price = is ? row.price : 0.00 ///是否为新购不是价格变0
        row.shoppingId = obj.id || obj.shoppingId//创建商品id
        row.num = row.num || 1 //创建商品初始数量
        row.isNew = is ///增加是否新购标识
        row.isNewStr = is ? '新购' : '已购'
        //row.remainNum = is ? 10 : (row.remainNum || obj.remainNum)

        if(this.myCardTab[0]){
          this.delSave.push(obj) ///临时存储用户次卡消费
          row.remainNum = 1
        }else if(this.myCardTab[1]){
          row.remainNum = row.remainNum
        }else if(this.myCardTab[2]){
          row.remainNum = obj.remainNum
        }
        this.ckSelect.push(row)

        if(!is){
          ///删除用户对应的添加的卡
          if(this.myCardTab[0]){
            for(let i in this.userGoodsList0){
              for(let b in this.userGoodsList0[i].productList){
                if(this.userGoodsList0[i].productList[b].contrastId === row.contrastId){
                  this.userGoodsList0.splice(i, 1)
                }
              }
            }
          }else if(this.myCardTab[1]){
            for(let i in this.userGoodsList1){
              for(let b in this.userGoodsList1[i].productList){
                if(this.userGoodsList1[i].productList[b].contrastId === row.contrastId){
                  this.userGoodsList1[i].productList[b].remainNum -= 1
                }
              }
            }
          }else if(this.myCardTab[2]){
            for(let i in this.userGoodsList2){
              for(let b in this.userGoodsList2[i].productList){
                if(this.userGoodsList2[i].productList[b].contrastId === row.contrastId){
                  if(this.userGoodsList2[i].totalNum  > 0){
                    this.userGoodsList2[i].remainNum -= 1
                  }
                }
              }
            }
          }
        }
        ///console.log(row)
        this.TPC()
      },
      addCarMyCk(row){
        ///点击添加我的次卡到消费栏
        console.log(row)
      },
      ckDel(index){
        ///点击删除从消费项目删除
        //
        //console.log(this.ckSelect)
        //console.log(this.delSave)
        switch(this.ckSelect[index].shoppingType){
          case 1:
            for(let i in this.delSave){
              for(let b in this.delSave[i].productList){
                if(this.ckSelect[index].contrastId === this.delSave[i].productList[b].contrastId){
                  this.userGoodsList0.push(this.delSave[i]) 
                  this.delSave.splice(i, 1)
                  ///把商品回退
                }
              }
            }
          break
          case 2:
            for(let i in this.userGoodsList1){
              for(let b in this.userGoodsList1[i].productList){
                if(this.userGoodsList1[i].productList[b].contrastId === this.ckSelect[index].contrastId){
                  this.userGoodsList1[i].productList[b].remainNum += this.ckSelect[index].num //相对应商品返回次数
                }
              }
            }
          break
          case 3:
            for(let i in this.userGoodsList2){
              for(let b in this.userGoodsList2[i].productList){
                if(this.userGoodsList2[i].productList[b].contrastId === this.ckSelect[index].contrastId){
                  this.userGoodsList2[i].remainNum += this.ckSelect[index].num //相对应商品返回次数
                  this.userGoodsList2.push('')
                  this.userGoodsList2.splice(this.userGoodsList2.length -1 , 1)                 
                }
              }
            }
          break
        }
        this.ckSelect.splice(index, 1) ///删除对应商品
        this.TPC() //计算价格
      },
      TPC(){
        //计算总价
        this.upForm.totalMoney = 0.00
        this.ckSelectNum = 0
        for(let i in this.ckSelect){
         this.upForm.totalMoney += this.ckSelect[i].num * this.ckSelect[i].price
         this.ckSelectNum += this.ckSelect[i].num
        }

      },
      TPC2(){
        //办卡计算总价
        this.upapplyCardForm.totalMoney = 0.00
        this.bkNum = 0
        for(let i in this.applyCardForm.selectData){
         this.upapplyCardForm.totalMoney += this.applyCardForm.selectData[i].num * this.applyCardForm.selectData[i].cost
         this.bkNum += this.applyCardForm.selectData[i].num
        }

      },
      async onpay1(){
        ////次卡消费结算
        this.upForm.expenseList = []
        this.upForm.userId = this.isVip ? this.formInline.id : '-1'
        let that = this
        for(let i in that.ckSelect){
          console.log(that.ckSelect[i].orderItemId)
          let obj = {
            "orderId": that.ckSelect[i].isNew ? '-1' : that.ckSelect[i].orderId,
            "orderItemId": that.ckSelect[i].isNew ? '-1' : that.ckSelect[i].orderItemId,
            "shoppingId": that.ckSelect[i].shoppingId,
            "productId": that.ckSelect[i].productId,
            "price": that.ckSelect[i].price,
            "amount": that.ckSelect[i].num,
            "empId": that.ckSelect[i].empId,
            "empName":that.ckSelect[i].empName
          }
          this.upForm.expenseList.push(obj)
        }

        for(let i in that.upForm.expenseList){
          for(let a in that.llsList){
            if(that.upForm.expenseList[i].empId = that.llsList[a].id){
              that.upForm.expenseList[i].empName =  that.llsList[a].name
            }
          }
        }
        if(that.upForm.payMoney !== that.upForm.totalMoney){
           this.$alert('输入金额有误！')
        }else{
          console.log(this.upForm)
          const res = await payExpense(this.upForm)
          if(res.code === 0){
            this.payDialog = false
            this.ckSelect = []
            this.$alert('结算成功')
          }else{
            this.$alert(res.msg)
          }
        }

      },
      onpay2(){
        //办卡结算
        //点击结算按钮
        if(this.applyCardForm.selectData.length === 0){
          this.$message.warning('还没有添加商品! 不要调皮!')
          return false
        }
        const that = this
        for(let i=0; i<this.applyCardForm.selectData.length; i++){
          if(this.applyCardForm.selectData[i].sales.length == 0 || this.applyCardForm.selectData[this.applyCardForm.selectData.length-1].sales.length == 0){

            this.$confirm('有商品没有选择销售人员，是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              that.payDialogBk = true
            })
            //this.$alert('第'+(parseInt(i)+1)+'项目没有选择销售员是否继续结算')

          }else{
            that.payDialogBk = true
          }
          // else{
          //   //console.log(this.applyCardForm.selectData)
          //   this.upapplyCardForm.payMoney = this.upapplyCardForm.totalMoney///默认显示

          // }

        }
      },
      async onPayBk(){
        //办卡提交消费结算
        this.upapplyCardForm.orderItemList = []
        this.upapplyCardForm.userId = this.isVip ? this.formInline.id : '-1'
        const that = this
        for(let i in that.applyCardForm.selectData){
          let obj = {
            "shoppingId": that.applyCardForm.selectData[i].id,
            "price": that.applyCardForm.selectData[i].price,
            "num": that.applyCardForm.selectData[i].num,
            "sales1":that.applyCardForm.selectData[i].sales,
            "sales": [],
          }
          this.upapplyCardForm.orderItemList.push(obj)
        }
        for(let i in this.upapplyCardForm.orderItemList){
          for(let p in this.upapplyCardForm.orderItemList[i].sales1){
            for(let s in this.applyCardForm.salesperson){
              if(this.upapplyCardForm.orderItemList[i].sales1[p] == this.applyCardForm.salesperson[s].id){
                //console.log(this.applyCardForm.salesperson[s].id,this.applyCardForm.salesperson[s].name)
                let obj ={
                  empId:this.applyCardForm.salesperson[s].id,
                  empName:this.applyCardForm.salesperson[s].name
                }
                this.upapplyCardForm.orderItemList[i].sales.push(obj)
              }
            }

          }
        }
        for(let i in this.upapplyCardForm.orderItemList){
          delete this.upapplyCardForm.orderItemList[i]['sales1']
        }

        console.log(this.upapplyCardForm)
        // let goPay = false
        // //const that = this
        // if(this.upapplyCardForm.payMoney !== this.upapplyCardForm.totalMoney){
        //     goPay = false
        //     this.$confirm('您所输入的付款金额和商品价格不符合还需继续操作吗?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {

        //     }).catch(() => {
        //       goPay = false
        //     })
        // }
        const res = await vipApplyCard(this.upapplyCardForm)
        if(res.code === 0){
          this.payDialogBk = false
          this.applyCardForm.selectData = []
          this.$alert('购买成功')
          this.TPC2()
        }else{
          this.$alert(res.msg)
        }

      },
      // addGoPay(){
      //   const res = await vipApplyCard(this.upapplyCardForm)
      //   if(res.code === 0){
      //     this.payDialogBk = false
      //     this.applyCardForm.selectData = []
      //     this.$alert('购买成功')
      //   }else{
      //     this.$alert(res.msg)
      //   }
      // },
      showPayDialog(){
        //点击结算按钮
        if(this.ckSelect.length === 0){
          this.$message.warning('还没有添加商品! 不要调皮!')
          return false
        }
        for(let i=0; i<this.ckSelect.length; i++){
          if(this.ckSelect[i].empId == '' || this.ckSelect[this.ckSelect.length-1].empId == ''){
            this.payDialog = false
            this.$alert('第'+(parseInt(i)+1)+'项目请选择调理师')

          }else{
            //console.log(this.ckSelect)
           // this.upForm.payMoney = this.upForm.totalMoney///默认显示
            this.payDialog = true
          }

        }
      },
      onPayType2(type){
        //选择支付方式
        // console.log(type)
        if(type == 3){
          if(this.upapplyCardForm.payMoney > this.formInline.balance){
            this.upapplyCardForm.payType = 1
            this.$alert('账户余额不足')
          }
        }

      },
      onPayType(type){
        //选择支付方式
        // console.log(type)
        if(type == 3){
          if(this.upForm.payMoney > this.formInline.balance){
            this.upForm.payType = 1
            this.$alert('账户余额不足')
          }
        }

      },
      onAddCard(){
        //
        //点击办卡按钮
        if(this.keyword !== ''){
          this.applyCardForm.lcPageNum = 1
          this.getGoodsListT2()
          this.applyCard = true
        }else{
          this.$alert('选择会员才可以办卡!')
        }

      },
      onRecharge(){
        //点击充值按钮
        if(!this.isVip){
          this.$alert('请选择会员')
          return
        }
         if(this.applyCardForm.salesperson.length == 0){
          this.getStaffList('')
        }
        this.rechargeDialog = true

      },
      onRechargePay(){
        var a = this.rechargeForm.payMoney
        if(a == '' || a == 0 || isNaN(a) ){
          this.$alert('请输入正确的金额!')
          return
        }
        if(this.rechargeFormSales.length == 0  ){
          this.$alert('请选择销售小姐姐哟!')
          return
        }
        this.rechargeForm.sales = []
        for(let i in this.rechargeFormSales){
          console.log(i)
          for(let b in this.applyCardForm.salesperson){
              if(this.applyCardForm.salesperson[b].id == this.rechargeFormSales[i]){
                let obj = {
                  empId:this.rechargeFormSales[i],
                  empName:this.applyCardForm.salesperson[b].name,
                }
                this.rechargeForm.sales.push(obj)
              }
          }
        }
        this.rechargeForm.userId = this.formInline.id
        //this.rechargeForm.totalMoney = this.rechargeForm.payMoney
        this.rechargeDialog = false
        this.rechargeDialogc = true
      },
      async onRechargePayC(){

        if( this.rechargeForm.totalMoney !==  this.rechargeForm.payMoney){
          this.$alert('支付金额有误，请输入正确金额')
          return false
        }
        ///再次确认充值
        const res = await vipRecharge_v(this.rechargeForm)
        if(res.code == 0){
          this.rechargeDialog = false
          this.rechargeDialogc = false
          this.$alert('充值成功')
          this.rechargeForm = {///充值表单
            "userId": "",
            "totalMoney": '',
            "remark": "",
            "payType": 1,
            "payMoney": '',
            "sales": []
          }

        }else{
          this.$alert('充值失败'+res.msg)
        }

      },
      handleClick(){

      },
      async searchPhone(val){
        //this.restaurants = []
        const res = await fetch('/cms/api/appuser/search',{phone:val})
        let item = {
          value:res.data.detail.name + res.data.detail.phone,
          id:res.data.detail.id
        }
        this.restaurants.push(item)

        console.log(this.restaurants)
      }

    },
    watch:{
      keyword:function(val){
        //this.getUserList()
        ///
        if(val.length == 11){
          this.searchPhone(val)
        }else{
          this.getUserList()
          
        }
        // console.log(this.restaurants)
        if(val ==""){
          this.formInline.name = '散客'
          this.isVip = false
        }
      }

    }

  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  section{
    position:relative;
    height: 100%;
    background: #eee;
    font-size: 14px;
    .sy-head{
      background: #00072c;
      height: 80px;
      display: flex;
      align-items: center;
      padding: 20px;
      color:#fff;
      .title{
        font-size: 24px;
        line-height: 80px;
        width: 100%;
        text-align: center;
      }
      .close_btn{
        width: 140px;
        text-align: right;
        cursor: pointer;
      }
      .logo{
        width: 140px;
      }
    }
    .container{ margin:20px; }
    .card_view{
      background: #fff;
      margin-bottom: 20px;
      border-radius: 6px;
      .title{
        line-height:44px;
        border-bottom: 1px #efefef solid;
        padding-left: 15px;
        font-size: 15px;
      }
      .view_content{
        padding: 15px 15px 0 15px;
        .haveCardBtn{
          width: 100px;
        }
        .active{
          background: #edf7e8;
          border: 1px #c9e7bc solid;
          color: #56ae34;
        }
        .formInline1{
           padding-bottom: 15px;
          span{
            margin-right: 20px;
          }
        }
      }
    }
    .bottom_info{
      width: 100%;
      position:fixed;
      left:0;
      bottom:0;
      background: #fff;
      padding:0 20px;
      z-index: 9;
      border-top:1px #efefef solid;
      .price{
        height: 50px;
        line-height: 50px;
        border-bottom:1px #efefef solid;
        margin-bottom: 15px;
        text-align: right;
        font-size: 24px;
        color: #ff0000;
        p,span{ display: inline-block;font-size: 13px; color: #474747 }
      }
    }
    .bottom_info2{
      position: relative;
    }
  }
  .my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;
      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }
      .highlighted .addr {
        color: #ddd;
      }
    }
  }

.xm_cssss{
  .card-dialog{
    position:relative;
    .dialog-footer{
      position:absolute;
      left:0;
      bottom:0;
      width:100%
    }
    .box-head{
      line-height: 44px;
    }

  }

.box-border-bt {
    border-bottom: 1px solid #ffffff;
  }
  .box-content-tblr {
    padding: .5rem 1.5rem .5rem 1.5rem;
  }
  .nav-separator {
    padding: .5rem 1.5rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .quote>span {
    display: inline-block;
    border-left: 3px solid #5CB531;
    text-indent: .5rem;
    font-size: 14px;
  }
  .box-border {
    float: left;
    border: 1px solid #e5e5e5;
    position:relative;
  }
  .box-left {
    width: 30%;
    margin-right: 1%;
  }
  .box-right {
    width: 69%;
  }
  .box-head {
    background: #e8e8e8;
    height: 44px;
    padding-left: 15px;
  }
  .box-head h4 {
    line-height: 3rem;
  }
  .el-form-item {
  margin-bottom: 0;
}
  .el-form span {
    display: block;
    padding-top: 0;
    padding-bottom: 0;
  }
  .mr-tblr{
    margin: 1rem 1rem;
  }
  .total{
    margin-top: 1rem;
    height: 50px;
    line-height: 50px;
    text-align: right;
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    padding-right: 1.5rem;
    clear: bottom;
  }
  .total-bottom {
    margin-top: 1rem;
    border-bottom: 1px solid #e5e5e5;
    padding:0 1.5rem 1rem 1.5rem;
  }
  .total span {
    font-size: 1rem;
  }
  .total span em {
    font-size: 1rem;
    color: #ff0000;
  }
  .input-width{
    width: 30rem;
  }
}

</style>
