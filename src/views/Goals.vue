<template>
  <div>
    <h2 class="text-3xl text-blue-400 font-bold p-5">Mis Objetivos</h2>
    <button @click="toggleModalAddGoal" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded" style="margin-left: 0.5rem">
      Añadir Objetivo
    </button>

    <GoalList /> <!-- Aquí se muestra la lista de objetivos -->

    <!-- Modal para agregar un nuevo objetivo -->
    <Teleport to="#app">
      <ModalAddGoal v-if="showModalAddGoal" @close="toggleModalAddGoal" @addGoal="addNewGoal" />
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, provide, toRaw } from 'vue'
import axios from 'axios';
import {apiBaseUrl} from '@/apiConfig.js'
import GoalList from '../components/Goals/GoalList.vue'; // Importa GoalList
import ModalAddGoal from '../components/Goals/Modals/ModalAddGoal.vue'; // Importa el modal

// Definir los estados reactivos
const totalGoals = ref([]);
const userToken = localStorage.getItem('authToken');
const userId = sessionStorage.getItem('UserId');

const showModalAddGoal = ref(false);

// Función para abrir y cerrar el modal de agregar un objetivo
function toggleModalAddGoal() {
  showModalAddGoal.value = !showModalAddGoal.value;
}

// Agregar un nuevo objetivo a la lista
const addNewGoal = async (goal) => {
  try {
    console.log(goal);
    // Realizar la solicitud POST al backend para agregar un nuevo objetivo
    const response = await axios.post(`${apiBaseUrl}/goal/post`, {
      user_id: userId,  // Usar las propiedades correspondientes del objeto goal
      goal_name: goal.goal_name,
      target_amount: goal.target_amount,
      limit_date: goal.limit_date,
    });

    // Verificar si la respuesta es exitosa (status 200)
    if (response.data.body.success) {
      // Agregar el nuevo objetivo a la lista local de objetivos
      //totalGoals.value.push(response.data.body.data.goal);
      fetchGoals();
      toggleModalAddGoal();
      console.log('Nuevo objetivo agregado:', response.data.body.data.goal);
    } else {
      console.error('Error al agregar el objetivo:', response.data.error);
    }
  } catch (error) {
    // Manejo de errores si la solicitud falla
    console.error('Error al agregar el objetivo:', error);
  }
};


// Obtener los objetivos desde la API
const fetchGoals = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/goal/get/${userId}`, {
    });
    totalGoals.value = response.data.body.data.goals;

  } catch (error) {
    console.error('Error al cargar los objetivos:', error);
  }
};

const handleEdit = async (updated_goal) => {
  try {
    // Crear una copia del objeto updated_goal para modificarlo sin afectar el original
    const updateFields = { ...updated_goal };

    // Eliminar los campos id y user_id de updateFields
    delete updateFields.id;
    delete updateFields.user_id;

    const payload = {
      id: updated_goal.id, // Incluir el id fuera de update_fields
      update_fields: updateFields, // Pasar solo los campos que deben actualizarse
    };

    console.log(payload);  // Verificar que los campos no deseados se han eliminado

    // Realizar la solicitud PATCH al backend
    const response = await axios.patch(`${apiBaseUrl}/goal/patch`, payload);
    fetchGoals();  // Actualizar la lista de objetivos
  } catch (error) {
    console.error('Error al cargar los objetivos:', error);
  }
};

const handleDelete = async (deleted_goal) => {
  try {
    let goalId = deleted_goal.id;
    const response = await axios.delete(`${apiBaseUrl}/goal/delete/${goalId}`);
    if (response.data.body.success) {
      // Filtrar el objetivo eliminado de la lista
      fetchGoals();
    }
  } catch (error) {
    console.error('Error al eliminar el objetivo:', error);
  }
};

// Cargar los objetivos al montar el componente
onBeforeMount(() => {
  fetchGoals();
});

// Proveer los datos a los componentes hijos
provide('goals', {
  totalGoals,
  showModalAddGoal,
  toggleModalAddGoal,
  addNewGoal,
  handleEdit,
  handleDelete
});
</script>

<style scoped>
/* Estilos específicos para Goals */
</style>
