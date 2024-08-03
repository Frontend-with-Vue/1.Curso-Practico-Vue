<script setup>
    import { ref } from 'vue';
    const showMovements = ref(false);
    function toggleMovements(){
        showMovements.value = !showMovements.value;
    }
</script>

<template>
    <section class="fixed z-10 w-full h-[8vh]">
        <slot name="header"></slot>
    </section>
    <main>
        <section class="h-screen w-full grid place-content-center">
            <slot name="resume"></slot>
        </section>
        <section class="fixed z-20 bottom-0 w-full" :class="showMovements?'completed':'incompleted'">
            <div class="h-[5vh] w-full grid place-content-center rounded-t-2xl shadow-[0_4px_25px_rgb(96,165,250)] bg-white cursor-pointer" @click="toggleMovements">
                <div class="w-40 h-3 bg-blue-400 rounded-md"></div>
            </div>
            <div class="h-[87vh] bg-white">
                <slot name="movements"></slot>
            </div>
        </section>
    </main>
</template>

<style scoped>
    .completed {
        transform: translateY(0);
        transition: all linear 2s;
    }
    .incompleted {
        transform: translateY(calc(100% - 5vh));
        transition: all linear 2s;
    }
</style>