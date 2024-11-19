<script setup>
import Logo from './icons/Logo.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const showOpcions = ref(false);
const router = useRouter();

function toggleMenu() {
  showOpcions.value = !showOpcions.value;
}

function reload() {
  window.location.reload();
}

function logout() {
  // Limpiar los datos del usuario del sessionStorage y localStorage
  sessionStorage.clear();
  localStorage.removeItem('authToken'); // Eliminar el token de autenticación del localStorage

  // Recargar la página, lo que redirigirá al login
  window.location.reload();
}
</script>

<template>
  <header class="w-full relative">
    <div class="p-5 relative flex justify-between items-center bg-white z-10 sm:grid sm:grid-cols-3">
      <Logo class="cursor-pointer" :size="'30px'" @click="reload"></Logo>
      <p class="text-center text-2xl font-extrabold">
        <span class="text-green-500">Cash</span>
        <span class="text-blue-400">Flow</span>
      </p>
      <button @click="toggleMenu" class="text-3xl cursor-pointer sm:hidden">
        <i class="bi bi-list"></i>
      </button>
    </div>
    <nav class="absolute bottom-0 left-0 w-full transition -z-0 sm:relative sm:translate-y-0" :class="{'translate-y-full': showOpcions}">
      <ul class="flex flex-col items-center gap-2 text-lg text-green-500 sm:flex-row sm:justify-center sm:gap-4">
        <li class="flex w-min">
          <router-link
            @click="toggleMenu"
            :to="{name: 'home'}"
            class="p-2 rounded-lg font-bold hover:text-blue-400 hover:border-blue-400 hover:border-2"
            exactActiveClass="border-blue-400 border-2 text-blue-400"
          >Movimientos</router-link>
        </li>
        <li class="flex w-min">
          <router-link
            @click="toggleMenu"
            :to="{name: 'goals'}"
            class="p-2 rounded-lg font-bold hover:text-blue-400 hover:border-blue-400 hover:border-2"
            exactActiveClass="border-blue-400 border-2 text-blue-400"
          >Objetivos</router-link>
        </li>
      </ul>
    </nav>

    <!-- Botón de cierre de sesión más grande y con texto, posicionado fijo -->
    <button @click="logout" class="logout-btn">
      Cerrar Sesión
    </button>
  </header>
  <router-view/>
</template>

<style scoped>
.logout-btn {
  position: fixed; /* Cambiado a fixed para que quede fijo en la parte superior */
  top: 20px;
  right: 20px;
  background-color: #ff5c5c; /* Color de fondo azul */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 15px 30px; /* Botón más grande */
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
  z-index: 20; /* Asegura que esté sobre otros elementos */
}

.logout-btn:hover {
  background-color: #0056b3; /* Color más oscuro al pasar el ratón */
  transform: scale(1.05); /* Efecto de agrandamiento */
}

.logout-btn:focus {
  outline: none;
}

/* Asegurando que el contenido del header no empuje el botón */
header {
  position: relative;
  z-index: 10; /* Asegura que el header esté en una capa por debajo del botón */
}
</style>
