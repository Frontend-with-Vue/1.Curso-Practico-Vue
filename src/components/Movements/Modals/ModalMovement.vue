<script setup>
    import { inject } from 'vue';

    const {toggleModalMovement} = inject('movements');
</script>

<template>
    <aside class="px-6 py-5 fixed z-20 top-0 right-0 h-screen w-full max-w-80 rounded-s-2xl bg-white shadow-[0_4px_25px_rgb(96,165,250)] ">
        <div class="flex justify-between text-blue-400">
            <h2 class="text-2xl">Nuevo movimiento</h2>
            <button
                @click="toggleModalMovement"
                class="text-2xl w-9 aspect-square rounded-full hover:bg-blue-400 hover:text-white transition">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
        <slot name="form"></slot>
    </aside>
</template>

<style scoped></style>