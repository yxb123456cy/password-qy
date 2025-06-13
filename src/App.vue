<script setup lang="ts">

import {SVG_URL_1} from "./config/constants/constants.ts";
</script>

<template>
  <div id="password-qy-app">
    <img :src="SVG_URL_1" alt="1.svg" class="back-img hidden-xs-only">
    <RouterView/>
  </div>

</template>

<style scoped lang="less">
img {
  overflow-clip-margin: content-box;
  overflow: clip;
}
.back-img{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
}
</style>
