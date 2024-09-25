<script setup>
    import draggableComponent from 'vuedraggable';
    import { inject } from 'vue';
    import MovementItem from './MovementItem.vue';
    import ModalUpdateMovement from './Modals/ModalUpdateMovement.vue';
    const {totalMovements, showModalUpdateMovement} = inject('movements');
</script>

<template>
    <h2 class=" text-3xl text-blue-400 font-bold p-5">Historial</h2>
    <div class="flex flex-col gap-2 px-2 overflow-y-auto">
        <draggableComponent
            handle=".handle"
            v-model="totalMovements"
            tag="transition-group"
            :component-data="{name: 'fade'}"
        >
            <template #item="{ element }">
                <MovementItem
                    :movement="element"
                />
            </template>
        </draggableComponent>
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

.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.fade-leave-active {
    position: absolute;
}
</style>