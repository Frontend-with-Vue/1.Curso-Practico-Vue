<template>
  <div class="modal">
    <div class="modal-content">
      <span @click="$emit('close')" class="close-button">&times;</span>
      <h3 class="modal-title">Añadir Nuevo Objetivo</h3>
      <div class="input-container">
        <label for="goal-name" class="input-label">Nombre del Objetivo:</label>
        <input v-model="goal_name" id="goal-name" placeholder="Ej. Ahorra para el viaje" class="input-field" />

        <label for="goal-target" class="input-label">Monto Objetivo:</label>
        <input v-model.number="target_amount" id="goal-target" type="number" placeholder="Monto al que aspiras" class="input-field" />

        <label for="goal-deadline" class="input-label">Fecha Límite:</label>
        <input v-model="limit_date" id="goal-deadline" type="date" class="input-field" />
      </div>
      <button @click="submitGoal" class="submit-button">Añadir Objetivo</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Goal } from '@/Models/Goal.js'

// Definir las propiedades del nuevo objetivo basado en la clase Goal
const goal_name = ref('');
const target_amount = ref(0);
const limit_date = ref(new Date().toISOString().substr(0, 10)); // Fecha por defecto

// Acceder a la función emit mediante defineEmits
const emit = defineEmits();

// Función para enviar el nuevo objetivo
const submitGoal = () => {
  // Crear el nuevo objetivo basado en la estructura de la clase Goal
  const newGoal = new Goal({
    goal_name: goal_name.value,
    target_amount: target_amount.value,
    limit_date: new Date(limit_date.value),
    gathered_amount: 0,  // El valor inicial es 0
    creation_date: new Date()  // Fecha de creación del objetivo
  });

  clearFields();

  emit('addGoal', newGoal); // Emitir el evento correctamente usando emit
};

// Limpiar los campos después de enviar el objetivo
const clearFields = () => {
  goal_name.value = '';
  target_amount.value = 0;
  limit_date.value = new Date().toISOString().substr(0, 10);
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Asegura que el modal esté por encima de otros elementos */
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  width: 400px; /* Ancho fijo del modal */
}

.close-button {
  cursor: pointer;
  font-size: 24px;
  color: #333;
  float: right;
}

.modal-title {
  color: #007BFF; /* Color azul para el título */
  margin: 0 0 15px 0;
  text-align: center; /* Centrar el título */
}

.input-container {
  display: flex;
  flex-direction: column;
}

.input-label {
  margin: 5px 0;
  font-weight: bold;
  color: #333; /* Color de las etiquetas */
}

.input-field {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.input-field:focus {
  border-color: #007BFF; /* Color de borde al enfocar */
  outline: none; /* Quitar el contorno predeterminado */
}

.submit-button {
  margin-top: 10px;
  padding: 10px;
  background-color: #007BFF; /* Color azul para el botón */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%; /* Botón de ancho completo */
}

.submit-button:hover {
  background-color: #0056b3; /* Color más oscuro al pasar el mouse */
}
</style>
