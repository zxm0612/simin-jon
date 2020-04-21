<template>
  <section class="scention-ht">
    <navSide active="基本设置" title="平台设置" :navList="navList"></navSide>
    <section class="scention-wh">
      <headTop active="设置"></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基本设置</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="box-content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item prop="closeOrder">
                <span class="labeltext"><em>*</em>订单关闭时间：</span>
                <el-input v-model.number="ruleForm.closeOrder" maxlength="20" style="width: 20rem;"><template slot="append">分钟</template></el-input>
                <span>订单在此时间内未支付将自动关闭</span>
              </el-form-item>

              <el-form-item prop="cardTerm">
                <span class="labeltext"><em>*</em>次卡有效时间：</span>
                <el-input v-model.number="ruleForm.cardTerm" style="width: 20rem;"><template slot="append">天</template></el-input>
                <span>购买次卡后到期天数</span>
              </el-form-item>
            <el-form-item prop="courseCardTime">
              <span class="labeltext"><em>*</em>疗程卡有效时间：</span>
              <el-input v-model.number="ruleForm.courseCardTime" style="width: 20rem;"><template slot="append">天</template></el-input>
              <span>购买疗程卡后到期天数</span>
            </el-form-item>
            <el-form-item label="" prop="Reception">
              <span class="labeltext"><em>*</em>用于前台显示：</span>
              <el-input v-model="ruleForm.Reception" style="width: 20rem;"><template slot="append">天</template></el-input>
              <span>疗程卡商品详情页中显示的文字</span>
            </el-form-item>
            <el-form-item label="" prop="healthyCardTime">
              <span class="labeltext"><em>*</em>健康管理卡有效时间：</span>
              <el-input v-model.number="ruleForm.healthyCardTime" style="width: 20rem;"><template slot="append">天</template></el-input>
              <span>购健康管理卡后到期天数</span>
            </el-form-item>
            <div style="text-align: center;width:1rem; margin-left: 10rem">
            <el-form-item>
              <el-button type="success" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import { getSettings,editSettings } from "../../service/getData"
  export default {
    data () {
      return {
        ruleForm: {
          closeOrder: '',
          cardTerm: '',
          courseCardTime: '',
          healthyCardTime: '',
          Reception: ''
        },
        list: [
          {
          "name": "订单关闭时间",
          "code": "order_close_times",
          "value": "15",
          "desc": ""
        },
        {
          "name": "次卡有效期",
          "code": "single_item_indate_days",
          "value": "365",
          "desc": "有效期一年"
        },
        {
          "name": "疗程卡有效期",
          "code": "treat_card_indate_days",
          "value": "365",
          "desc": "有效期一年"
        },
        {
          "name": "健康管理卡有效期",
          "code": "health_card_indate_days",
          "value": "365",
          "desc": "有效期一年"
        }
        ],
        navList:[
          {name:'基本设置',
            value:'#/settings'
          }
        ],
        rules: {
          closeOrder: [
            { required: true, message: '请输入订单关闭时间', trigger: 'blur' },
            { type: 'number', message: '必须为数字值'}

          ],
          cardTerm: [
            { required: true, message: '请输入次卡有效时间', trigger: 'blur' },
            { type: 'number', message: '必须为数字值'}
            
          ],
          courseCardTime: [
            { required: true, message: '请输入疗程卡有效时间', trigger: 'blur' },
            { type: 'number', message: '必须为数字值'}
          ],
          healthyCardTime: [
            { required: true, message: '请输入健康管理卡有效时间', trigger: 'blur' },
            { type: 'number', message: '必须为数字值'}
          ],
          Reception: [
            { required: true, message: '请输入用于前台显示字段', trigger: 'blur' }
          ]
        }
      }
    },
    mounted:function(){
      this.setRes()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');验证成功
            this.editSet()

          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async setRes(){
        ///获取数据
        let res = await getSettings()
        res = res.data.list
        this.ruleForm.closeOrder = parseInt(res[0].value)
        this.ruleForm.cardTerm = parseInt(res[1].value)
        this.ruleForm.courseCardTime = parseInt(res[2].value)
        this.ruleForm.healthyCardTime = parseInt(res[3].value)
        this.ruleForm.Reception = res[2].desc
      },
      async editSet(){
        this["list"][0].value = this.ruleForm.closeOrder
        this["list"][1].value = this.ruleForm.cardTerm
        this["list"][2].value = this.ruleForm.courseCardTime
        this["list"][2].desc = this.ruleForm.Reception
        this["list"][3].value = this.ruleForm.healthyCardTime
        let option = {
          "configList":this["list"]
        }
        let res = await editSettings(option)
        if(res.code === 0){
          this.$message.success('修改成功!')
        }
        
      },
      
    },
    components: {
      headTop,
      navSide
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .el-form label{
    display: inline-block;
    width: 20rem;
    text-align: right;
  }
  .el-form .labeltext {
    display: inline-block;
    width: 9.2rem;
    text-align: right;
  }
  .el-form .labeltext em {
    color: #ff0000;
  }
  .el-form span {
    margin-left: .5rem;
  }
  .el-form-item .el-form-item__error {
 position: absolute;left: 10rem;
}
</style>
