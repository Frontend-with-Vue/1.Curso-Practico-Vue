<script setup>
import { ref, onMounted } from 'vue';
import SplashScreen from './components/SplashScreen.vue';

const loading = ref(true);
// Simulacion de la carga con delay (testeo)
const loadComponent = async () => {
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  loading.value = false;
};

onMounted(() => {
  loadComponent();
});
</script>

<template>
  <component :is="loading? SplashScreen: 'router-view'"></component>
</template>

<style scoped>
</style>
