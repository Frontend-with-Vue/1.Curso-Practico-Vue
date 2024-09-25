<template>
  <div>
    <div class="flex flex-col gap-2 px-2 overflow-y-auto">
      <GoalItem
        v-for="goal in totalGoals"
        :key="goal.id"
        :goal="goal"
      />
    </div>

    <Teleport to="#app">
      <ModalAddGoal v-if="showModalAddGoal" @close="toggleModalAddGoal" @addGoal="addNewGoal" />
    </Teleport>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import GoalItem from './GoalItem.vue'; // Importa el componente GoalItem
import ModalAddGoal from '@/components/Goals/Modals/ModalAddGoal.vue';

const { totalGoals, addNewGoal, showModalAddGoal, toggleModalAddGoal, removeGoal } = inject('goals');
</script>

<style scoped>

</style>