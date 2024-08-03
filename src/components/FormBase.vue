<script setup>
    import { onBeforeMount, ref } from 'vue';
    import { Movement, Type } from '@/Models/Movement';

    const properties = defineProps({
        movement: Movement,
        labelSubmit: {
            type: String,
            required: true
        }
    });
    const emits = defineEmits(['getMovement']);

    const title = ref('');
    const amount = ref(0);
    const description = ref('');
    const type = ref('income');

    onBeforeMount(()=>{
        if(properties.movement){
            title.value = properties.movement.title;
            amount.value = properties.movement.amount;
            description.value = properties.movement.description;
            type.value = properties.movement.type;
        }
    });

    function sendMovement(){
        if(type.value=='income') type.value = Type.INCOME;
        if(type.value=='outcome') type.value = Type.OUTCOME;
        const newMovement = new Movement({
            title: title.value,
            description: description.value,
            amount: amount.value,
            type: type.value
        });
        if(properties.movement){
            newMovement.id = properties.movement.id;
            newMovement.date = properties.movement.date;
        }
        emits('getMovement', newMovement);
    }
</script>

<template>
    <form
        class="w-full h-auto pt-8 flex flex-col gap-5"
        @submit.prevent="sendMovement"
    >
        <label for="title" class="flex flex-col gap-2">
            <span class="text-xl">Titulo</span>
            <input class="text-lg border-blue-400 border-2 rounded-lg" type="text" name="title" id="title" required v-model="title">
        </label>
        <label for="amount" class="flex flex-col gap-2">
            <span class="text-xl">Monto</span>
            <input class="text-lg border-blue-400 border-2 rounded-lg" type="number" min="1" name="amount" id="amount" required v-model="amount">
        </label>
        <label for="description" class="flex flex-col gap-2">
            <span class="text-xl">Descripción</span>
            <textarea class="text-lg border-blue-400 border-2 rounded-lg" name="description" id="description" v-model="description"></textarea>
        </label>
        <label for="type" class="flex gap-3 items-center">
            <input type="radio" name="type" id="income" value="income" checked v-model="type">
            <span class="text-xl">Ingreso</span>
        </label>
        <label for="type" class="flex gap-3 items-center">
            <input type="radio" name="type" id="outcome" value="outcome" v-model="type">
            <span class="text-xl">Gasto</span>
        </label>
        <input class="mt-5 text-center text-white font-semibold bg-blue-700 px-7 py-3 rounded-3xl hover:scale-110 transition cursor-pointer" type="submit" :value="properties.labelSubmit">
    </form>
</template>

<style scoped>
</style>