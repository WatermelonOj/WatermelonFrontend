<template>
  <div id="app">
    <transition><router-view></router-view></transition>
  </div>
</template>

<script>
  export default {
    created () {
      document.title = 'Watermelon'
    }
  }
</script>

<style>
  .v-enter,.v-leave-to{
    opacity: 0;
    transform: translateY(40px);
  }
  .v-enter-active,.v-leave-active{
    transition: all 0.4s ease;
  }
  body{
    font-family: BPreplay;
  }
  @font-face {
    font-family: 'BPreplay';
    src:url(BPreplay.otf) format('opentype');
  }
</style>
