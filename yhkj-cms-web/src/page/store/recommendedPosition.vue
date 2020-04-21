<template>
    <section class="scention-ht">
      <navSide title="门店" active="推荐位设置"></navSide>
      <section class="scention-wh">
        <headTop active="门店"></headTop>
        <div id="main">
          <div class="transfer-body">
            <el-transfer v-model="timesCard" :data="timesCardData" :titles="['所有项目', '推荐项目']"></el-transfer>
          </div>
          <div class="transfer-body">
            <el-transfer v-model="courseCard" :data="courseCardData" :titles="['所有疗程卡', '推荐疗程卡']"></el-transfer>
          </div>
          <div class="transfer-body">
            <el-button @click="submitData">设置</el-button>
          </div>
        </div>
      </section>
    </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import {recommendedList} from "../../service/getData";
  import {recommendedSave} from "../../service/getData";
  import {storeAllProduction} from "../../service/getData";

  export default {
      components: {
        headTop,
        navSide
      },
      data(){
        return{
          timesCard:[],
          courseCard:[],
          timesCardData:[],
          courseCardData:[],
          type1Data:[],
          type2Data:[]
        }
      },
      methods:{
        async getInitData(){
          let info1 = await recommendedList();
          let info2 = await storeAllProduction(1);
          let info3 = await storeAllProduction(2);
          this.type1Data = info2.data.list;
          this.type2Data = info3.data.list;
          this.timesCard = info1.data.detail.singleItemList;
          this.courseCard = info1.data.detail.treatCardList;
          for(let i =0;i<this.timesCard.length;i++){
            for(let j=0;j<this.type1Data.length;j++){
              if(this.timesCard[i].shoppingId === this.type1Data[j].id){
                this.timesCard[i] = this.type1Data[j].id
              }
            }
          }
          debugger;
          for(let i =0;i<this.courseCard.length;i++){
            for(let j=0;j<this.type2Data.length;j++){
              if(this.courseCard[i].shoppingId === this.type2Data[j].id){
                this.courseCard[i] = this.type2Data[j].id
              }
            }
          }
          for(let i =0;i<this.type1Data.length;i++){
            this.timesCardData.push({
              label:this.type1Data[i].title,
              key:this.type1Data[i].id
            });
          }
          for(let i =0;i<this.type2Data.length;i++){
            this.courseCardData.push({
              label:this.type2Data[i].title,
              key:this.type2Data[i].id
            });
          }
        },
        async submitData(){
          if(this.timesCard.length>5||this.courseCard.length>5){
            this.$message.error('推荐位设置不能大于五个！');
            return;
          }
          let info = await recommendedSave(this.timesCard,this.courseCard);
          if(info.code === 0){
            this.$message.success('设置成功！');
          }else{
            this.$message.error(info.msg);
          }
        }
      },
      mounted(){
        this.getInitData();
      }
    }
</script>

<style lang="scss" scoped>
  #main{
    width: 100%;
  }
  .transfer-body{
    display: flex;
    justify-content: center;
    margin: 3rem auto;
  }
</style>
