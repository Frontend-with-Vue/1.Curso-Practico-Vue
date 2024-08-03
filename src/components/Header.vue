<script setup>
    import Logo from './icons/Logo.vue';

    function reload(){
        window.location.reload();
    }
</script>

<template>
    <header class="w-full relative py-5">
        <Logo class="absolute mx-3 cursor-pointer" :size="'30px'" @click="reload"></Logo>
        <p class="text-center text-2xl font-extrabold">
            <span class="text-green-500">Cash</span>
            <span class="text-blue-400">Flow</span>
        </p>
    </header>
</template>

<styles scoped>
</styles>