<template>
  <div v-if="isEditing" class="goal-edit-modal">
    <div class="modal-content">
      <h3>Editar Objetivo</h3>

      <label for="goal-name">Nombre del Objetivo</label>
      <input v-model="editedGoal.goal_name" id="goal-name" type="text" placeholder="Nombre del objetivo" />

      <label for="target-amount">Monto Objetivo</label>
      <input v-model="editedGoal.target_amount" id="target-amount" type="number" placeholder="Monto del objetivo" />

      <label for="limit-date">Fecha Límite</label>
      <input v-model="editedGoal.limit_date" id="limit-date" type="date" />

      <div class="modal-actions">
        <button @click="saveChanges" class="save-button">Guardar Cambios</button>
        <button @click="cancelEdit" class="cancel-button">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  goal: {
    type: Object,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update', 'cancel']);

// Copiar el objeto goal para que el usuario pueda editarlo sin alterar los datos originales
const editedGoal = ref({ ...props.goal });

// Función para guardar los cambios
const saveChanges = () => {
  emit('update', editedGoal.value);  // Emitir los cambios para que el componente padre lo reciba
};

// Función para cancelar la edición
const cancelEdit = () => {
  emit('cancel');
};
</script>

<style scoped>
/* Estilos para el modal */
.goal-edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Contenedor principal del modal */
.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 500px;
  max-width: 100%;
}

/* Título del modal */
.modal-content h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

/* Estilo de los campos de entrada */
label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #444;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

/* Estilos para las acciones del modal (guardar/cancelar) */
.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* Estilo para el botón "Guardar Cambios" */
.save-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #0056b3;
}

/* Estilo para el botón "Cancelar" */
.cancel-button {
  padding: 10px 20px;
  background-color: #f1f1f1;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #e0e0e0;
}
</style>
