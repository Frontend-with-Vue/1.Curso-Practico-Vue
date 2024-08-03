<script setup>
    import { currencyFormatter } from '@/Functions/currencyFormatter';
    import { Movement, Type } from '@/Models/Movement';
    import { computed, inject } from 'vue';
    const properties = defineProps({
        movement: Movement
    });
    const currentAmount = computed(()=>{
        return currencyFormatter.format(properties.movement.amount)
    });

    const {removeMovement, setIdUpdatedMovement} = inject('movements');
</script>

<template>
    <article class="w-full h-auto flex bg-blue-200 rounded-md p-3">
        <div class="flex-grow flex flex-col justify-between">
            <h3 class="font-bold">{{ properties.movement.title }}</h3>
            <p>{{ properties.movement.description }}</p>
            <p class="text-lg font-bold"
                :class="properties.movement.type == Type.OUTCOME ? 'text-red-600' : 'text-green-500'"
            >
                <span v-if="properties.movement.type == Type.OUTCOME">-</span>
                {{ currentAmount }}
            </p>
        </div>
        <div class="flex flex-col text-blue-400 text-lg">
            <button class="cursor-pointer rotate-90 hover:text-red-600 hover:scale-125 transition">
                <i class="bi bi-grid-3x2-gap-fill"></i>
            </button>
            <button
                @click="removeMovement(properties.movement.id)"
                class="cursor-pointer hover:text-red-600 hover:scale-125 transition"
            >
                <i class="bi bi-trash-fill"></i>
            </button>
            <button
                @click="setIdUpdatedMovement(properties.movement.id)"
                class="cursor-pointer hover:text-red-600 hover:scale-125 transition"
            >
                <i class="bi bi-pencil-fill"></i>
            </button>
        </div>
    </article>
</template>

<style scoped></style>