<script setup>
    import { currencyFormatter } from '../../Functions/currencyFormatter.js';
    import { computed } from 'vue';
    const properties = defineProps({
        label: {
            type: String,
            default: null
        },
        currentAmount: {
            type: Number,
            default: null
        },
        totalAmount: {
            type: Number,
            default: 0,
            required: true
        }
    });
    const amountVisual = computed(()=>{
        return properties.currentAmount?
            currencyFormatter.format(properties.currentAmount):
            currencyFormatter.format(properties.totalAmount);
    });
    const labelVisual = computed(()=>{
        return properties.label?properties.label: 'Ahorra total';
    });
</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class="text-lg">{{ labelVisual }}</h1>
        <h2 class="text-5xl font-bold text-green-500">{{ amountVisual }}</h2>
    </div>
    <div>
        <slot name="graphic"></slot>
    </div>
    <div class="justify-self-center">
        <slot name="action"></slot>
    </div>
</template>

<style scoped></style>