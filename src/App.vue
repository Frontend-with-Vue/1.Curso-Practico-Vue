<script setup>
import { defineAsyncComponent } from 'vue'
import SplashScreen from './components/SplashScreen.vue'
const AsyncHome =  defineAsyncComponent({
  loader: () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('./components/Home-Cash.vue'));
    }, 1000);
  }),
  loadingComponent: SplashScreen
})
</script>

<template>
  <AsyncHome></AsyncHome>
</template>

<style scoped>
</style>
