<script setup>
    import { inject, ref } from 'vue';

    const {filterDate, toggleModalChooseDate, rangeDates} = inject('movements');
    const startDate = ref('');
    const endDate = ref('');

    function setRangeDates(){
        if(!verifyDates()) {
            filterDate.value = 3;
            toggleModalChooseDate();
            return;
        };
        rangeDates.value = [startDate.value, endDate.value];
        filterDate.value = 2;
        toggleModalChooseDate();
    }

    function verifyDates(){
        if(!startDate.value) return false;
        if(!endDate.value) return false;
        if(new Date(startDate.value) > new Date(endDate.value)) return false;
        return true;
    }

    function closeModal(){
        filterDate.value = 3;
        toggleModalChooseDate();
    }
</script>

<template>
    <section class="w-screen h-screen fixed z-20 top-0 left-0 grid place-content-center overflow-y-hidden">
        <div @click="closeModal" class="absolute -z-0 w-full h-full bg-black opacity-35"></div>
        <div class="relative w-auto h-auto px-5 py-10 bg-white rounded-2xl shadow-[0_4px_25px_rgb(96,165,250)] ">
            <div class="flex justify-between gap-10 text-blue-400">
                <h2 class="text-2xl">Rango de fechas</h2>
                <button
                    @click="closeModal"
                    class="text-2xl w-9 aspect-square rounded-full hover:bg-blue-400 hover:text-white transition">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <form @submit.prevent="setRangeDates" class="w-full h-auto pt-8 flex flex-col gap-5">
                <label for="startDateDate" class="flex justify-between">
                    <span>Fecha inicial</span>
                    <input type="date" name="startDate" id="startDate" required v-model="startDate">
                </label>
                <label for="endDate" class="flex justify-between">
                    <span>Fecha final</span>
                    <input type="date" name="endDate" id="endDate" required v-model="endDate">
                </label>
                <input class="mt-5 text-center text-white font-semibold bg-blue-700 px-7 py-3 rounded-3xl hover:scale-110 transition cursor-pointer" type="submit" value="Aplicar">
            </form>
        </div>
    </section>
</template>

<style scoped></style>