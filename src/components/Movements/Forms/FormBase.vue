<script setup>
import { onBeforeMount, ref } from 'vue';
import { Movement, Type } from '@/Models/Movement.js';

// Definimos las propiedades recibidas
const props = defineProps({
  movement: Movement,
  labelSubmit: {
    type: String,
    required: true
  }
});

// Emitimos eventos
const emit = defineEmits(['getMovement']);

// Definimos los campos del formulario
const title = ref('');
const amount = ref(0);
const description = ref('');
const type = ref('income');

// Inicializa los valores si se recibe un `movement` por prop
function initializeForm() {
  if (props.movement) {
    title.value = props.movement.title;
    amount.value = props.movement.amount;
    description.value = props.movement.description;
    type.value = props.movement.type;
  }
}

// Función para enviar el formulario
function sendMovement() {
  const movementType = type.value === 'income' ? Type.INCOME : Type.OUTCOME;

  const newMovement = new Movement({
    title: title.value,
    description: description.value,
    amount: amount.value,
    type: movementType
  });

  // Si es una actualización, conservamos el id y la fecha del movimiento existente
  if (props.movement) {
    newMovement.id = props.movement.id;
    newMovement.date = props.movement.date;
  }

  emit('getMovement', newMovement);
}

// Ejecutamos la inicialización del formulario antes de montar el componente
onBeforeMount(initializeForm);
</script>

<template>
  <form class="form-container" @submit.prevent="sendMovement">
    <label for="title" class="form-label">
      <span class="label-text">Título</span>
      <input
        class="input-field"
        type="text"
        name="title"
        id="title"
        required
        v-model="title"
      />
    </label>

    <label for="amount" class="form-label">
      <span class="label-text">Monto</span>
      <input
        class="input-field"
        type="number"
        min="1"
        name="amount"
        id="amount"
        required
        v-model="amount"
      />
    </label>

    <label for="description" class="form-label">
      <span class="label-text">Descripción</span>
      <textarea
        class="input-field"
        name="description"
        id="description"
        v-model="description"
      ></textarea>
    </label>

    <div class="form-radio-group">
      <label for="income" class="radio-label">
        <input
          type="radio"
          name="type"
          id="income"
          value="income"
          v-model="type"
        />
        <span class="label-text">Ingreso</span>
      </label>

      <label for="outcome" class="radio-label">
        <input
          type="radio"
          name="type"
          id="outcome"
          value="outcome"
          v-model="type"
        />
        <span class="label-text">Gasto</span>
      </label>
    </div>

    <input
      class="submit-button"
      type="submit"
      :value="props.labelSubmit"
    />
  </form>
</template>

<style scoped>
.form-container {
  width: 100%;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label-text {
  font-size: 1.25rem;
}

.input-field {
  font-size: 1.125rem;
  border: 2px solid rgb(96, 165, 250); /* border-blue-400 */
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.form-radio-group {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.radio-label {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.submit-button {
  margin-top: 1.25rem;
  text-align: center;
  color: white;
  font-weight: 600;
  background-color: rgb(29, 78, 216); /* bg-blue-700 */
  padding: 0.75rem 1.75rem;
  border-radius: 1.5rem;
  transition: transform 0.3s;
  cursor: pointer;
}

.submit-button:hover {
  transform: scale(1.1);
}
</style>