<template>
  <section>
    <div id="logo">
      <img src="../../images/yhkj.png" alt="logo">
    </div>
    <div id="menu" v-for="item in navList" :key="item.menuName">
      <p id="title">{{item.menuName}}</p>
      <ul id="nav">
        <li v-for="i in item['childs']" class="li" :key="i.href">
          <a @click="$router.push(i.href)">{{i.menuName}}</a>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        navList:[],
        status:0
      }
    },
    props:['active','title'],
    beforeMount(){
      for(let i =0;i<this.$store.state.permission[0]['childs'].length;i++){
        if(this.$store.state.permission[0]['childs'][i].menuName === this.title){
          this.navList = this.$store.state.permission[0]['childs'][i]['childs'];
        }
      }
    },
    mounted(){
      let menu = document.querySelectorAll(".li");
      for(let i=0;i<menu.length;i++) {
        if (menu[i].textContent == this.active) {
          menu[i].className += ' nav-active';
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../style/mixin";
  section{
    @include wh(15%,100%);
    background-color: #35373d;
    text-align: center;
    img{
      @include wh(auto,80px);
    }
    #title{
      background-color: #202126;
      border-top: #4a4b51 1px solid;
      border-bottom: #4a4b51 1px solid;
      text-align: center;
      @include wh(100%,3rem);
      line-height: 3rem;
      word-spacing: 1.8rem;
      color: #ffffff;
      font-size: 1rem;
    }
    li{
      @include wh(100%,3.5rem);
      line-height: 3.5rem;
      word-spacing: 1.2rem;
      text-align: center;
      color: #b8bbc2;
      border-bottom: #4a4b51 1px solid;
      &:hover{
        background: #202126;
        color: #b8bbc2;
        border-left:2px solid #6abd2d;
        cursor: pointer;
      }
    }
    li.nav-active{
      background: #0d0f16;
      color: #b8bbc2;
      border-left:2px solid #6abd2d;
    }
  }
  #logo{
    padding-top:.8rem;
    padding-bottom: .8rem;
    background:-webkit-linear-gradient(#35373d,#202126);
    background:-o-linear-gradient(#35373d,#202126);
    background:-moz-linear-gradient(#35373d,#202126);
    background:linear-gradient(#35373d,#202126);
  }
</style>
