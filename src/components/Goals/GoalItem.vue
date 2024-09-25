<template>
  <div class="goal-item">
    <h3 class="goal-title">{{ goal.title }}</h3>
    <p class="goal-description">{{ goal.description }}</p>
    <div class="goal-stats">
      <p>
        <span class="current-amount">Ahorro Actual: {{ goal.currentAmount }}</span>
        <span class="separator">/</span>
        <span class="target-amount">Objetivo: {{ goal.targetAmount }}</span>
      </p>
      <p class="goal-deadline">Fecha Límite: {{ formatDate(goal.deadline) }}</p>
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

const formatDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy');
};
</script>

<style scoped>
.goal-item {
  background-color: #f9f9f9; /* Color de fondo más suave */
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
  transition: transform 0.2s; /* Efecto de transformación al pasar el mouse */
}

.goal-title {
  font-size: 1.5rem; /* Tamaño de fuente más grande */
  color: #007BFF; /* Color azul para el título */
  margin: 0 0 10px 0; /* Espaciado debajo del título */
}

.goal-description {
  font-size: 1rem;
  color: #555; /* Color gris para la descripción */
  margin-bottom: 10px; /* Espaciado debajo de la descripción */
}

.goal-stats {
  font-size: 0.9rem; /* Tamaño de fuente más pequeño para las estadísticas */
  color: #333; /* Color más oscuro para las estadísticas */
}

.current-amount, .target-amount {
  font-weight: bold; /* Negrita para los montos */
}

.separator {
  margin: 0 5px; /* Espaciado entre los montos */
}

.goal-deadline {
  margin-top: 5px; /* Espaciado encima de la fecha límite */
  font-style: italic; /* Estilo de fuente en cursiva */
  color: #888; /* Color gris más claro para la fecha */
}
</style>
