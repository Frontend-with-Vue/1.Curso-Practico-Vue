<script setup>
import FormUpdateMovement from '../Forms/FormUpdateMovement.vue';
import { inject } from 'vue';

const { toggleModalUpdateMovement } = inject('movements');
</script>

<template>
  <section class="modal-overlay">
    <div @click="toggleModalUpdateMovement" class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Actualizar movimiento</h2>
        <button @click="toggleModalUpdateMovement" class="close-button">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <FormUpdateMovement/>
    </div>
  </section>
</template>

<style scoped>
.modal-overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  overflow-y: hidden;
}

.modal-background {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.35;
}

.modal-content {
  position: relative;
  padding: 2.5rem 1.25rem;
  background-color: white;
  border-radius: 1.25rem;
  box-shadow: 0 4px 25px rgb(96, 165, 250);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: rgb(96, 165, 250); /* text-blue-400 */
}

.modal-title {
  font-size: 1.5rem; /* text-2xl */
}

.close-button {
  font-size: 1.5rem; /* text-2xl */
  width: 2.25rem; /* w-9 */
  aspect-ratio: 1 / 1; /* aspect-square */
  border-radius: 50%;
  transition: background-color 0.3s, color 0.3s;
}

.close-button:hover {
  background-color: rgb(96, 165, 250); /* hover:bg-blue-400 */
  color: white; /* hover:text-white */
}
</style>