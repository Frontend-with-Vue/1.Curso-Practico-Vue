<script setup>
    import FormUpdateMovement from './FormUpdateMovement.vue';
    import { inject } from 'vue';

    const {toggleModalUpdateMovement} = inject('movements');
</script>

<template>
    <section class="w-screen h-screen fixed z-20 top-0 left-0 grid place-content-center overflow-y-hidden">
        <div class="absolute -z-0 w-full h-full bg-black opacity-35"></div>
        <div class="relative w-auto h-auto px-5 py-10 bg-white rounded-2xl shadow-[0_4px_25px_rgb(96,165,250)] ">
            <div class="flex justify-between gap-4 text-blue-400">
                <h2 class="text-2xl">Actualizar movimiento</h2>
                <button
                    @click="toggleModalUpdateMovement"
                    class="text-2xl w-9 aspect-square rounded-full hover:bg-blue-400 hover:text-white transition">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <FormUpdateMovement/>
        </div>
    </section>
</template>

<style scoped></style>