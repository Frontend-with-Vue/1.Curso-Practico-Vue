<script setup>
    import Logo from './icons/Logo.vue';
    import { ref } from 'vue';

    const showOpcions = ref(false);

    function toggleMenu(){
        showOpcions.value = !showOpcions.value;
    }

    function reload(){
        window.location.reload();
    }
</script>

<template>
    <header class="w-full relative">
        <div class="p-5 relative flex justify-between items-center bg-white z-10 sm:grid sm:grid-cols-3">
            <Logo class="cursor-pointer" :size="'30px'" @click="reload"></Logo>
            <p class="text-center text-2xl font-extrabold">
                <span class="text-green-500">Cash</span>
                <span class="text-blue-400">Flow</span>
            </p>
            <button @click="toggleMenu" class="text-3xl cursor-pointer sm:hidden">
                <i class="bi bi-list"></i>
            </button>
        </div>
        <nav class="absolute bottom-0 left-0 w-full transition -z-0 sm:relative sm:translate-y-0" :class="{'translate-y-full': showOpcions}">
            <ul class="flex flex-col items-center gap-2 text-lg text-green-500 sm:flex-row sm:justify-center sm:gap-4">
                <li class="flex w-min">
                    <router-link
                        @click="toggleMenu"
                        :to="{name: 'home'}"
                        class="p-2 rounded-lg font-bold hover:text-blue-400 hover:border-blue-400 hover:border-2"
                        exactActiveClass="border-blue-400 border-2 text-blue-400"
                    >Home</router-link>
                </li>
                <li class="flex w-min">
                    <router-link
                        @click="toggleMenu"
                        :to="{name: 'about'}"
                        class="p-2 rounded-lg font-bold hover:text-blue-400 hover:border-blue-400 hover:border-2"
                        exactActiveClass="border-blue-400 border-2 text-blue-400"
                    >About</router-link>
                </li>
                <li class="flex w-min">
                    <router-link
                        @click="toggleMenu"
                        :to="{ path: '/profile'}"
                        class="p-2 rounded-lg font-bold hover:text-blue-400 hover:border-blue-400 hover:border-2"
                        exactActiveClass="border-blue-400 border-2 text-blue-400"
                    >Profile</router-link>
                </li>
            </ul>
        </nav>
    </header>
    <router-view/>
</template>

<styles scoped>
</styles>