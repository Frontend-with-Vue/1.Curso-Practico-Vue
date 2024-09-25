<script setup>
import { ref } from 'vue';
const showMovements = ref(false);
function toggleMovements(){
  showMovements.value = !showMovements.value;
}
</script>

<template>
  <main>
    <section class="resume-section">
      <slot name="resume"></slot>
    </section>

    <section class="movements-section" :class="showMovements ? 'completed' : 'incompleted'">

      <div class="toggle-bar" @click="toggleMovements">
        <div class="toggle-indicator"></div>
      </div>

      <div class="movements-container">
        <slot name="movements"></slot>
      </div>

    </section>
  </main>
</template>

<style scoped>
.resume-section {
  height: calc(100vh - 76px);
  width: 100%;
  padding-bottom: 20px;
  display: grid;
  place-content: center;
}

.movements-section {
  position: fixed;
  z-index: 20;
  bottom: 0;
  width: 100%;
  padding: 0.5rem 0;
  transition: all linear 2s;
}

.completed {
  transform: translateY(0);
}

.incompleted {
  transform: translateY(calc(100% - 5vh));
}

.toggle-bar {
  height: 5vh;
  width: 100%;
  display: grid;
  place-content: center;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 4px 25px rgb(96, 165, 250);
  background-color: white;
  cursor: pointer;
}

.toggle-indicator {
  width: 10rem;
  height: 0.75rem;
  background-color: rgb(96, 165, 250); /* bg-blue-400 */
  border-radius: 0.375rem;
}

.movements-container {
  height: 87vh;
  display: flex;
  flex-direction: column;
  background-color: white;
}
</style>