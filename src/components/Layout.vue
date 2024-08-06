<script setup>
    import { ref } from 'vue';
    const showMovements = ref(false);
    function toggleMovements(){
        showMovements.value = !showMovements.value;
    }
</script>

<template>
    <main>
        <section class="h-[calc(100vh_-_76px)] w-full pb-20 grid place-content-center">
            <slot name="resume"></slot>
        </section>
        <section class="fixed z-20 bottom-0 w-full py-2" :class="showMovements?'completed':'incompleted'">
            <div class="h-[5vh] w-full grid place-content-center rounded-t-2xl shadow-[0_4px_25px_rgb(96,165,250)] bg-white cursor-pointer" @click="toggleMovements">
                <div class="w-40 h-3 bg-blue-400 rounded-md"></div>
            </div>
            <div class="h-[87vh] flex flex-col bg-white">
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