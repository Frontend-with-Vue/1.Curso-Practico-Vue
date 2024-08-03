<script setup>
    import { inject } from 'vue';
    import MovementItem from './MovementItem.vue';
    const {totalMovements} = inject('movements');
</script>

<template>
    <h2 class=" text-3xl text-blue-400 font-bold p-5">Historial</h2>
    <div class="flex flex-col gap-2 px-2">
        <MovementItem
            v-for="movementItem in totalMovements"
            :key="movementItem.id"
            :movement="movementItem"
        />
    </div>
</template>

<style scoped></style>