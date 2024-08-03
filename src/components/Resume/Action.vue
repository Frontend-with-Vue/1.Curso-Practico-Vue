<script setup>
    import ModalMovement from '../ModalMovement.vue';
    import Form from '../Form.vue';
    import { inject } from 'vue';

    const {showModalMovement, toggleModalMovement} = inject('movements');
</script>

<template>
    <button
        @click="toggleModalMovement"
        class="text-center text-white font-semibold bg-blue-700 px-7 py-3 rounded-3xl  hover:scale-110 transition"
    >Agregar movimiento</button>
    <Teleport to="#app">
        <Transition name="modal">
            <ModalMovement v-if="showModalMovement">
                <template #form>
                    <Form/>
                </template>
            </ModalMovement>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all 1s ease-in;
}

.modal-enter-from,
.modal-leave-to {
    transform: translateX(100%);
}
</style>