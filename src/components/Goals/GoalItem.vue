<template>
  <div class="goal-item">
    <h3 class="goal-title">{{ goal.goal_name }}</h3>
    <p class="goal-description">Creado el: {{ formatDate(goal.creation_date) }}</p>
    <div class="goal-stats">
      <p>
        <span class="current-amount">Ahorro Actual: {{ goal.gathered_amount }}</span>
        <span class="separator">/</span>
        <span class="target-amount">Objetivo: {{ goal.target_amount }}</span>
      </p>
      <p class="goal-deadline">Fecha Límite: {{ formatDate(goal.limit_date) }}</p>
    </div>
    <!-- Botones para editar y eliminar -->
    <div class="goal-actions">
      <button @click="editGoal" class="edit-button">Editar</button>
      <button @click="deleteGoal" class="delete-button">Eliminar</button>
    </div>
  </div>
</template>


<script setup>
import { format } from 'date-fns';

const props = defineProps({
  goal: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['edit', 'delete']);

const formatDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy');
};

const editGoal = () => {
  emit('edit', props.goal);
};

const deleteGoal = () => {
  emit('delete', props.goal); // Emitir el evento 'delete' con el objetivo actual
};
</script>

<style scoped>
.goal-item {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.goal-title {
  font-size: 1.5rem;
  color: #007BFF;
  margin: 0 0 10px 0;
}

.goal-description {
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
}

.goal-stats {
  font-size: 0.9rem;
  color: #333;
}

.current-amount, .target-amount {
  font-weight: bold;
}

.separator {
  margin: 0 5px;
}

.goal-deadline {
  margin-top: 5px;
  font-style: italic;
  color: #888;
}

/* Estilo de los botones */
.goal-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.edit-button, .delete-button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-button {
  background-color: #007BFF;
  color: white;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #DC3545;
  color: white;
}

.delete-button:hover {
  background-color: #a71d2a;
}
</style>
