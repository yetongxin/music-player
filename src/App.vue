<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- <h1>hello world</h1> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
  import MHeader from './components/m-header/m-header'
  import Tab from './components/tab/tab'
  import Player from './components/player/player'
  export default {
    components: {
      MHeader,
      Tab,
      Player
    } 
  }
</script>
<style lang="stylus">
// #app
//   font-family 'Avenir', Helvetica, Arial, sans-serif
//   -webkit-font-smoothing antialiased
//   -moz-osx-font-smoothing grayscale
//   text-align center
//   color #2c3e50
//   margin-top 60px
//   h1
//     color red
</style>
