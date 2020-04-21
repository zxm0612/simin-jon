<template>
  <section class="scention-ht">
    <navSide></navSide>
    <section class="scention-wh">
      <headTop></headTop>
      <div id="main">
        <div class="head-separator">
          <el-breadcrumb separator="/" class="head-quote">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-box-input">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="门店性质" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio v-model="radio" label="1">直营</el-radio>
                <el-radio v-model="radio" label="2">加盟</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="" prop="region">
              <el-select v-model="ruleForm.franchiser" placeholder="请选择加盟商">
                <el-option label="加盟商1" value="shanghai"></el-option>
                <el-option label="加盟商2" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格档：" prop="price">
              <el-select v-model="ruleForm.price" placeholder="请选择">
                <el-option label="一档" value="shanghai"></el-option>
                <el-option label="二档" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-form-item label="门店全称：" prop="fulName">
                <el-col :span="6"><el-input v-model="ruleForm.fulName" maxlength="20"></el-input></el-col><el-col :span="4">最多输入20个字</el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="门店简称：" prop="abbName">
                <el-col :span="6"><el-input v-model="ruleForm.abbName"></el-input></el-col><el-col :span="4">最多输入10个字</el-col>
              </el-form-item>
            </el-row>
            <el-form-item label="门店相册：" prop="album">
              <div class="store-album">
                <ul>
                  <li>
                    <img src="../../../images/lck.png">
                    <span><i>店面封面</i><em>删除图片</em></span>
                  </li>
                  <li>
                    <img src="../../../images/lck.png">
                    <span><i>设为封面</i><em>删除图片</em></span>
                  </li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="" v-model="ruleForm.abbName" prop="album">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList2"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">最多可以上传20张图片，建议尺寸 ？*？px</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="门店电话：" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="门店地址：" prop="addressName">
              <el-input v-model="ruleForm.addressName"></el-input>
            </el-form-item>
            <el-form-item label="门店位置：" prop="positionName">
              <el-col :span="6">
                <el-input v-model="ruleForm.positionName"></el-input>
              </el-col>
              <el-col :span="6">
                <el-input v-model="ruleForm.positionName"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="开店时间：" required>
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"></el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="状态：" prop="delivery">
              <el-switch v-model="ruleForm.delivery" active-color="#5cb531" inactive-color="#999999"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitForm('ruleForm')">提交</el-button>
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
  export default {
    data () {
      return {
        radio: '1',
        ruleForm: {
          resource: '',
          price: '',
          fulName: '',
          addName: '',
          region: '',
          phone: '',
          positionName: '',
          addressName: '',
          date1: '',
          album: '',
        },
        rules: {
          resource: [
            { required: true, message: '请选择加盟商', trigger: 'change' }
          ],
          price: [
            { required: true, message: '请选择价格档', trigger: 'change' }
          ],
          fulName: [
            { required: true, message: '请输入门店全称', trigger: 'blur' },
            { max: 20, message: '最多输入20个字', trigger: 'blur' }
          ],
          abbName: [
            { required: true, message: '请输入门店简称', trigger: 'blur' },
            { max: 10, message: '最多输入10个字', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请上传门店相片', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { max: 10, message: '最多输入10个字', trigger: 'blur' }
          ],
          addressName: [
            { required: true, message: '请输门店地址', trigger: 'blur' }
          ],
          positionName: [
            { required: true, message: '请输门店位置', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
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
      }
    },
    components: {
      headTop,
      navSide
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin.scss";

</style>
