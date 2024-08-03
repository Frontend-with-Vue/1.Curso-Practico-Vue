<script setup>
    import { Type } from '@/Models/Movement.js';
    import { currencyFormatter } from '../../Functions/currencyFormatter.js';
    import { computed, inject } from 'vue';
    const {filterMovementsDate} = inject('movements');
    const amountVisual = computed(()=>{
        if(filterMovementsDate.value.length == 0) return 0;
        if(filterMovementsDate.value.length == 1) return filterMovementsDate.value[0].amount;
        return filterMovementsDate.value.reduce((sum, movement)=>{
            if(movement.type == Type.INCOME) return sum + movement.amount;
            else return sum - movement.amount;
        },0);
    });
</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class="text-lg">Ahorra total</h1>
        <h2
            class="text-5xl font-bold"
            :class="amountVisual>=0?'text-green-500':'text-red-500'"
        >{{ currencyFormatter.format(amountVisual) }}</h2>
    </div>
    <div>
        <slot name="graphic"></slot>
    </div>
    <div class="justify-self-center">
        <slot name="action"></slot>
    </div>
</template>

<style scoped></style>