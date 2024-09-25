<script setup>
import { currencyFormatter } from '@/Functions/currencyFormatter';
import { Movement, Type } from '@/Models/Movement';
import { computed, inject } from 'vue';

const { movement } = defineProps({
  movement: Movement
});

const { removeMovement, setIdUpdatedMovement } = inject('movements');

// Computed para formatear el monto del movimiento
const currentAmount = computed(() => currencyFormatter.format(movement.amount));

// Computed para definir la clase basada en el tipo de movimiento
const currencyClass = computed(() => {
  return movement.type === Type.OUTCOME ? 'text-red-600' : 'text-green-500';
});

// Verificación si el movimiento es de tipo OUTCOME
const isOutcome = computed(() => movement.type === Type.OUTCOME);
</script>

<template>
  <article class="w-full h-auto flex bg-blue-200 rounded-md p-3">
    <div class="flex-grow flex flex-col justify-between">
      <h3 class="font-bold">{{ movement.title }}</h3>
      <p>{{ movement.description }}</p>
      <p class="text-lg font-bold" :class="currencyClass">
        <span v-if="isOutcome">-</span>
        {{ currentAmount }}
      </p>
    </div>
    <div class="flex flex-col text-blue-400 text-lg">
      <button class="cursor-pointer rotate-90 hover:text-red-600 hover:scale-125 transition handle">
        <i class="bi bi-grid-3x2-gap-fill"></i>
      </button>
      <button
        @click="removeMovement(movement.id)"
        class="cursor-pointer hover:text-red-600 hover:scale-125 transition"
      >
        <i class="bi bi-trash-fill"></i>
      </button>
      <button
        @click="setIdUpdatedMovement(movement.id)"
        class="cursor-pointer hover:text-red-600 hover:scale-125 transition"
      >
        <i class="bi bi-pencil-fill"></i>
      </button>
    </div>
  </article>
</template>

<style scoped></style>