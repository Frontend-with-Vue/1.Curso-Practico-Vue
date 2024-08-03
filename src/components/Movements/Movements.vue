<script setup>
    import { inject } from 'vue';
    import MovementItem from './MovementItem.vue';
    import ModalUpdateMovement from '../ModalUpdateMovement.vue';
    const {totalMovements, showModalUpdateMovement} = inject('movements');
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
    <Teleport to="#app">
        <Transition name="modalUpdateMovement">
            <ModalUpdateMovement v-if="showModalUpdateMovement"></ModalUpdateMovement>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modalUpdateMovement-enter-active,
.modalUpdateMovement-leave-active {
    transition: all 2s ease-in;
}

.modalUpdateMovement-enter-from,
.modalUpdateMovement-leave-to {
    opacity: 0;
}
</style>