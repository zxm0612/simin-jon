<template>
  <section style="display: flex;width: 100%;height: 100%">
    <navSide active="首页" title="首页"></navSide>
    <section style="width: 85%;height: 100%">
      <headTop active="首页"></headTop>
      <div id="main">
        <div class="content-list">
          <ul>
            <li>
              <div class="price-center">
                <span>{{'￥'+this.home['data']['detail']['todayIncome']}}</span>
                <p>今日订单实收（元）</p>
              </div>
            </li>
            <li>
              <div class="price-center">
                <span>{{'￥'+this.home['data']['detail']['todayRecharge']}}</span>
                <p>今日充值总额（元）</p>
              </div>
            </li>
            <li>
              <div class="price-center">
                <span>{{this.home['data']['detail']['todayNewUserNum']}}</span>
                <p>今日新增会员数（人）</p>
              </div>
            </li>
            <li>
              <div class="price-center">
                <span>{{'￥'+this.home['data']['detail']['todayAppointNum']}}</span>
                <p>今日预约（元）</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import headTop from '../../components/header/head'
  import navSide from '../../components/nav/nav'
  import {homeData} from '../../service/getData'

  export default {
    components: {
      headTop,
      navSide,
    },
    data(){
      return{
        actualHarvest:'',
        home:'',
        navSide:[]
      }
    },
    methods:{
      async initData(){
        this.home = await homeData();
        if(this.home['code'] == 403){
          this.$router.push('/login')
        }
        console.log(this.home['code']);
      }
    },
    mounted(){
      console.log(this.$store.state.permission);
      this.initData()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  #main{
    @include wh(100%,auto);
    margin: auto auto;
    ul {
      overflow: hidden;
      margin-right: -3%;
      margin-top: 5%;
      li {
        float: left;
        position: relative;
        @include wh(47%, 12rem);
        border: 1px solid #e5e5e5;
        margin-bottom: 3%;
        margin-right: 3%;
        border-radius: .5rem;
        justify-items: center;
        justify-content: center;
        .price-center{
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          width: 50%;
          height:4rem;
          margin: auto auto;
          text-align: center;
          line-height: 2.2rem;
        }
      }
      li span{
        font-size: 1.6rem;
        color:#F7AC23;
      }
      li p{
        color: #999999;
      }
    }
    >.content-list{
      width: 70%;
      margin: auto auto;
    }
  }
  .one{
    margin-right: 1rem;
  }
  .number{
    font-size: 4rem;
    font-weight: bolder;
    margin: 0 auto;
    color: #000;
  }
  .word{
    font-size: 1rem;
    margin: 0 auto;
    color: #bbbbbb;
  }
  .title{
    padding: 0;
    @include wh(100%,100%);
    background-color: #bbbbbb;
    span{
      color:#000;
      position: absolute;
      transform:translate(-50%,50%);
      font-size: 1.4rem;
      font-weight: bold;
      letter-spacing: 3rem;
    }
  }
  //#main{
  //   @include wh(100%,100%);
  //  margin: auto auto;
  // }
</style>
