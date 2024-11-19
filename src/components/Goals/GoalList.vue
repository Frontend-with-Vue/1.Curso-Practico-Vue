<template>
  <div>
    <!-- Mostrar lista de objetivos -->
    <div class="goal-list">
      <GoalItem
        v-for="goal in totalGoals"
        :key="goal.id"
        :goal="goal"
        @edit="startEditing"
        @delete="handleDelete" />
    </div>

    <!-- Modal para editar un objetivo -->
    <GoalEditModal
      v-if="isEditing"
      :goal="currentGoal"
      :isEditing="isEditing"
      @update="updateGoal"
      @cancel="cancelEdit" />
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import GoalItem from './GoalItem.vue';  // Asegúrate de tener este componente
import GoalEditModal from '../Goals/Modals/GoalEdit.vue'; // Modal de edición

// Inyectar las funciones y el estado desde el componente Goals
const { totalGoals, handleEdit, handleDelete } = inject('goals');

// Estado para manejar la edición
const isEditing = ref(false);
const currentGoal = ref(null);

// Función para iniciar la edición de un objetivo
const startEditing = (goal) => {
  currentGoal.value = { ...goal };  // Copiar el objetivo para que sea editable
  isEditing.value = true;
};

// Función para actualizar el objetivo
const updateGoal = (updatedGoal) => {
  handleEdit(updatedGoal);  // Llamar a la función inyectada para actualizar el objetivo
  cancelEdit();  // Cerrar el modal
};

// Función para cancelar la edición
const cancelEdit = () => {
  isEditing.value = false;  // Cerrar el modal sin guardar cambios
};
</script>

<style scoped>
/* Estilos para GoalList */
.goal-list {
  display: flex;
  flex-direction: column;
}
</style>
