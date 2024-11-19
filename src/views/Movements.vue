<script setup>
import Layout from '../components/Movements/Layout.vue';
import Resume from '@/components/Movements/Resume/Index.vue';
import Graphic from '@/components/Movements/Resume/Graphic.vue';
import FilterByDates from '@/components/Movements/Resume/FilterByDates.vue';
import Action from '@/components/Movements/Resume/Action.vue';
import Movements from '../components/Movements/MovementList.vue';
import { ref, computed, provide, onBeforeMount } from 'vue';
import axios from 'axios';
import { apiBaseUrl } from '@/apiConfig.js';

const totalMovements = ref([]);
const userToken = localStorage.getItem('authToken');
const userId = sessionStorage.getItem('UserId');

const showModalMovement = ref(false);
const showModalUpdateMovement = ref(false);
const showModalChooseDate = ref(false);
const filterDate = ref(3);
const rangeDates = ref([]);

const fetchMovements = async () => {
  if (!userId || !userToken) {
    console.error('Usuario no autenticado o falta el token.');
    return;
  }
  try {
    const response = await axios.get(`${apiBaseUrl}/movement/get/${userId}`, {
    });
    totalMovements.value = response.data.body.data.movements;
    console.log(totalMovements.value);
  } catch (error) {
    console.error('Error fetching movements:', error);
  }
};
const addNewMovement = async (movement) => {
  try {
    const { id, date, ...movementData } = movement;
    const userId = sessionStorage.getItem('UserId');
    if (!userId) {
      console.error('User ID no disponible');
      return;
    }
    movementData.user_id = userId;
    console.log(movementData);
    const response = await axios.post(`${apiBaseUrl}/movement/post`, movementData, {
    });
    if (response.data.body.success) {
      await fetchMovements();
      console.log('Movimiento agregado y movimientos recargados');
    } else {
      console.error('Error al agregar el movimiento');
    }
  } catch (error) {
    console.error('Error en la solicitud de adición:', error);
  }
};
const removeMovement = async (id) => {
  try {
    if (!userId || !userToken) {
      console.error('Usuario no autenticado o falta el token.');
      return;
    }
    const response = await axios.delete(`${apiBaseUrl}/movement/delete/${id}`, {
    });
    if (response.data.body.success) {
      await fetchMovements();
      console.log('Movimiento eliminado y datos actualizados');
    } else {
      console.error('Error al eliminar el movimiento');
    }
  } catch (error) {
    console.error('Error en la solicitud de eliminación:', error);
  }
};

const updateMovement = async (updatedMovement) => {
  try {
    const requestBody = {
      id: updatedMovement.id,
      update_fields: { ...updatedMovement }
    };
    const response = await axios.patch(`${apiBaseUrl}/movement/patch`, requestBody, {
    });
    if (response.data.body.success) {
      totalMovements.value = totalMovements.value.map(movement => {
        if (movement.id === updatedMovement.id) {
          console.log("Movimiento actualizado con éxito en el servidor y en el estado local");
          return { ...updatedMovement };
        } else {
          return movement;
        }
      });
    } else {
      console.error("Error al actualizar el movimiento en el servidor");
    }
  } catch (error) {
    console.error('Error en la solicitud de actualización:', error);
  }
};
function setIdUpdatedMovement(newId) {
  currentIdUpdatedMovement.value = newId;
  toggleModalUpdateMovement();
}
const currentUpdateMovement = computed(() => {
  if (currentIdUpdatedMovement.value) {
    return totalMovements.value.find((mov) => mov.id === currentIdUpdatedMovement.value);
  }
  return null;
});
const currentIdUpdatedMovement = ref(null);

function convertToPeruTime(date) {
  const peruOffset = 5 * 60; // Perú está 5 horas detrás de UTC (UTC-5)
  const localDate = new Date(date);

  // Ajustar la hora a la zona horaria de Perú (restamos 5 horas)
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset() - peruOffset);

  return localDate;
}
function checkInRange(movement) {
  const movementDate = new Date(movement.date).getTime();
  const statDate = new Date(rangeDates.value[0]).getTime();
  const endDate = new Date(rangeDates.value[1]).getTime();
  return movementDate >= statDate && movementDate <= endDate;
}
const filterMovementsDate = computed(() => {
  const currentDate = new Date();
  const currentDatePeru = convertToPeruTime(currentDate);
  if (filterDate.value === 1) return totalMovements.value;
  if (filterDate.value === 2) {
    return totalMovements.value.filter(movement => {
      const movementDatePeru = convertToPeruTime(movement.date);
      return checkInRange(movementDatePeru);
    });
  }
  if (filterDate.value === 3) {
    return totalMovements.value.filter(movement => {
      const movementDatePeru = convertToPeruTime(movement.date);
      return movementDatePeru > (currentDatePeru.getTime() - 30 * 24 * 60 * 60 * 1000);
    });
  }
  return totalMovements.value;
});

function toggleModalMovement() {
  showModalMovement.value = !showModalMovement.value;
}
function toggleModalUpdateMovement() {
  showModalUpdateMovement.value = !showModalUpdateMovement.value;
}
function toggleModalChooseDate() {
  showModalChooseDate.value = !showModalChooseDate.value;
}

provide('movements', {
  totalMovements,
  removeMovement,
  showModalMovement,
  toggleModalMovement,
  addNewMovement,
  filterDate,
  rangeDates,
  filterMovementsDate,
  toggleModalUpdateMovement,
  showModalUpdateMovement,
  updateMovement,
  toggleModalChooseDate,
  showModalChooseDate,
  currentUpdateMovement,
  setIdUpdatedMovement
});
onBeforeMount(() => {
  fetchMovements();
});
</script>

<template>
  <Layout>
    <template #resume>
      <Resume>
        <template #graphic>
          <Graphic>
            <template #filterByDate>
              <FilterByDates></FilterByDates>
            </template>
          </Graphic>
        </template>
        <template #action>
          <Action />
        </template>
      </Resume>
    </template>
    <template #movements>
      <Movements />
    </template>
  </Layout>
</template>

<style scoped>
</style>
