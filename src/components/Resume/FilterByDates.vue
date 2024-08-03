<script setup>
    import { inject } from 'vue';

    const { filterDate } = inject('movements');

    function setFilter(newFilter){
        filterDate.value = newFilter;
    }
</script>

<template>
    <div class="flex justify-between pb-10">
        <button
            @click="setFilter(1)"
            :class="{'bg-blue-800 text-white': filterDate==1, 'transition hover:scale-110 hover:border-red-600': filterDate!=1}"
            class="border-blue-800 border-2 px-2 rounded-lg">Todos</button>
        <button
            @click="setFilter(2)"
            :class="{'bg-blue-800 text-white': filterDate==2, 'transition hover:scale-110 hover:border-red-600': filterDate!=2}"
            class="border-blue-800 border-2 px-2 rounded-lg">Personalizado</button>
        <button
            @click="setFilter(3)"
            :class="{'bg-blue-800 text-white': filterDate==3, 'transition hover:scale-110 hover:border-red-600': filterDate!=3}"
            class="border-blue-800 border-2 px-2 rounded-lg">Ultimos 30 dias</button>
    </div>
</template>

<style scoped></style>