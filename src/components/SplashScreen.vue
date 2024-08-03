<script setup>
import Logo from './icons/Logo.vue';
</script>

<template>
    <main class="w-screen h-screen grid place-content-center">
        <section class="w-fit h-min flex flex-col justify-center items-center">
            <Logo :size="'240px'"></Logo>
            <p class="text-3xl font-extrabold">
                <span class="text-green-500">Cash</span>
                <span class="text-blue-400">Flow</span>
            </p>
        </section>
    </main>
</template>

<style scoped>
</style>