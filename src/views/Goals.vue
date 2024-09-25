<script setup>
import { Goal } from '@/Models/Goal.js';
import GoalList from '@/components/Goals/GoalList.vue';
import { ref, provide, onBeforeMount } from 'vue';

const totalGoals = ref([]);

function addNewGoal(goal) {
  totalGoals.value.push(goal);
}

const showModalAddGoal = ref(false);
function toggleModalAddGoal() {
  showModalAddGoal.value = !showModalAddGoal.value;
}

provide('goals', {
  totalGoals,
  showModalAddGoal,
  toggleModalAddGoal
});

onBeforeMount(() => {
  totalGoals.value = [
    new Goal({
      title: 'Ahorra para el viaje',
      description: 'Objetivo para ahorrar para el viaje de vacaciones.',
      amount: 500,
      targetAmount: 1500,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }),
    new Goal({
      title: 'Fondo de emergencia',
      description: 'Objetivo para establecer un fondo de emergencia.',
      amount: 200,
      targetAmount: 1000,
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    }),
  ];
  console.log(totalGoals.value);
});
</script>

<template>
  <div>
    <h2 class=" text-3xl text-blue-400 font-bold p-5">Mis objetivos</h2>
    <button @click="toggleModalAddGoal" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded" style="margin-left: 0.5rem">
      Añadir Objetivo
    </button>
    <GoalList />
  </div>
</template>