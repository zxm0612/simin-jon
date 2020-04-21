<template>
  <section>
    <ul id="headTap">
      <li v-for="item in menuList" @click="$router.push({ path:item.href})"  :key="item.href" :class="{active: item.state}">{{item.name}}</li>
    </ul>
    <div class="user-out">
      <span>{{this.username}}</span>
      <div class="flr"><i></i><span @click="logout()">退出</span></div>
    </div>
  </section>
</template>
<script>
  import {logout} from "../../service/getData";

  export default {
    data () {
      return {
        activeNameList:[],
        activeName: 'second',
        username:'',
        menuList:[],
      }
    },
    props:['active'],
    methods: {
      async logout(){
        let status = await logout();
        if(status.code === 0){
          window.localStorage.username = '';
          this.$router.push('/login')
        }else{
          alert(status.msg);
        }
      }
    },
    beforeMount(){

    },
    mounted(){
      ;
      this.menuList = [];
      for(let i =0;i<this.$store.state.permission[0]['childs'].length;i++){
        this.menuList.push({
          name:this.$store.state.permission[0]['childs'][i].menuName,
          href:this.$store.state.permission[0]['childs'][i].href,
          state:false
        });
      }
      // let menu = document.querySelectorAll(".head-li");
      // for(let i=0;i<menu.length;i++) {
      //   if (menu[i].textContent === this.active) {
      //     menu[i].className += ' active';
      //     return;
      //   }
      // }
      for(let i = 0;i<this.menuList.length;i++){
        if(this.menuList[i].name === this.active){
          this.menuList[i].state = true;
        }
      }

      if(window.localStorage.username !==undefined&&window.localStorage.username!==''){
        this.username = window.localStorage.username;
      }
        }
      }
</script>
<style lang="scss" scoped>
  @import "../../style/mixin";
  section{
    @include wh(100%,3.6rem);
    background-color: #f5f5f5;
    border-bottom: #cacaca 1px solid;
    ul {
      li {
        @include wh(6rem,3.6rem);
        float: left;
        text-align: center;
        padding-right: 0.2rem;
        line-height: 3.6rem;
        position: relative;
        color: #999999;
        border-right: 1px solid #e5e5e5;
        &:hover {
          cursor: pointer;
          background: #ebebeb;
          color: #5CB531;
          border-bottom: 2px solid #5CB531;
        }
      }
      .active {
        background: #ebebeb;
        color: #5CB531;
        border-bottom: 2px solid #5CB531;
      }
    }
  }
  .user-out {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #999999;
    z-index: 101;
    overflow: hidden;
    display: flex;
    justify-content: center;
    div {
      img {
        @include wh(2rem,2rem);
        border-radius: 50% 50%;
        @include box-mr(1rem,1.5rem);
      }
    }
    i {
      display:inline-block;
      background: url("../../images/tc.png");
      @include wh(.8rem,1rem);
    }
    span {
      display: inline-block;
      margin-left: .5rem;
      margin-right: .5rem;
      font-size: 1rem;
      color: #F7AC23;
    }
    span:hover{
      cursor: pointer;
    }
  }
</style>
