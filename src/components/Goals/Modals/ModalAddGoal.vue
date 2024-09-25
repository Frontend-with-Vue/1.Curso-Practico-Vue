<template>
  <div class="modal">
    <div class="modal-content">
      <span @click="$emit('close')" class="close-button">&times;</span>
      <h3 class="modal-title">Añadir Nuevo Objetivo</h3>
      <div class="input-container">
        <label for="goal-title" class="input-label">Título:</label>
        <input v-model="title" id="goal-title" placeholder="Ej. Ahorra para el viaje" class="input-field" />

        <label for="goal-description" class="input-label">Descripción:</label>
        <input v-model="description" id="goal-description" placeholder="Descripción del objetivo" class="input-field" />

        <label for="goal-target" class="input-label">Monto Objetivo:</label>
        <input v-model.number="targetAmount" id="goal-target" type="number" placeholder="Monto al que aspiras" class="input-field" />

        <label for="goal-deadline" class="input-label">Fecha Límite:</label>
        <input v-model="deadline" id="goal-deadline" type="date" class="input-field" />
      </div>
      <button @click="submitGoal" class="submit-button">Añadir Objetivo</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('');
const description = ref('');
const targetAmount = ref(0);
const deadline = ref(new Date().toISOString().substr(0, 10)); // Fecha por defecto

const submitGoal = () => {
  const newGoal = {
    title: title.value,
    description: description.value,
    amount: 0, // Se establece en 0 ya que no se pide al usuario
    targetAmount: targetAmount.value,
    deadline: new Date(deadline.value),
  };

  clearFields();

  // Emitir el nuevo objetivo al componente padre
  // Puedes incluir aquí el $emit para enviar el nuevo objetivo
};

const clearFields = () => {
  title.value = '';
  description.value = '';
  targetAmount.value = 0;
  deadline.value = new Date().toISOString().substr(0, 10);
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
