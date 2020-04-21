<template>
  <div id="app">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    <transition name="fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created(){
      if(window.localStorage.permission) {
        let jsonInfo = JSON.parse(window.localStorage.permission);
        this.$store.commit('getPermission',jsonInfo);
        console.log(this.$store.state.permission);
      }
    }
  }
</script>

<style lang="scss">
  @import './style/common';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  min-width: 1280px;
}
</style>
