<script setup>
    import { inject, computed, ref } from 'vue';
    import { Type } from '@/Models/Movement';

    const { filterMovementsDate } = inject('movements');

    const svgElementRef = ref(null);
    const xVerticalLine = ref('100%');

    const points = computed(()=>{
        return convertirToPoints();
    });
    const yHorizontalLine = computed(()=>{
        if(!svgElementRef.value) return '50%';
        if(filterMovementsDate.value.length == 0 || filterMovementsDate.value.length == 1) return '50%';
        const {percentIncome} = values();
        return `${percentIncome*100}%`;
    });

    function moveLine(event){
        if(!svgElementRef.value) return;
        const elementX = svgElementRef.value.getBoundingClientRect().x;
        const touchX = event.clientX - elementX;
        xVerticalLine.value = touchX;
    };
    function normalizeY(type, amount){
        const {height, maxIncome, maxOutcome, percentIncome, percentOutcome} = values();
        let y = 0;
        if(type == Type.INCOME) y = height * percentIncome - (amount / maxIncome) * height * percentIncome;
        else y = height * percentIncome + (amount / maxOutcome) * height * percentOutcome;
        return y;
    };
    function convertirToPoints(){
        if(!svgElementRef.value) return '';
        if(filterMovementsDate.value.length == 0) return '';
        const {width, totalLength} = values();
        const pointZero = `0,${normalizeY(filterMovementsDate.value[0].type,filterMovementsDate.value[0].amount)}`;
        return filterMovementsDate.value.reduce((result, movement, i)=>{
            const { amount, type } = movement;
            const x = ((i+1) / totalLength) * width;
            let y =  normalizeY(type, amount);
            return `${result} ${x},${y}`
        }, pointZero);
    };
    function values(){
        const height = svgElementRef.value.clientHeight;
        const width = svgElementRef.value.clientWidth;

        const totalLength = filterMovementsDate.value.length;

        let maxIncome = Math.max(...filterMovementsDate.value.filter((movement)=>movement.type == Type.INCOME).map(movement=>movement.amount));
        let maxOutcome = Math.max(...filterMovementsDate.value.filter((movement)=>movement.type == Type.OUTCOME).map(movement=>movement.amount));

        maxIncome = maxIncome | 0;
        maxOutcome = maxOutcome | 0;

        const percentIncome = maxIncome/(maxIncome+maxOutcome);
        const percentOutcome = maxOutcome/(maxIncome+maxOutcome);

        return {height, width, totalLength, maxIncome, maxOutcome, percentIncome, percentOutcome};
    };
</script>

<template>
    <svg @click="moveLine" @mousemove="moveLine" class="w-full min-w-80 h-[200px] my-10 overflow-visible" ref="svgElementRef">
        <line
            class="stroke-2 stroke-blue-950 hover:stroke-red-600"
            x1="0"
            :y1="yHorizontalLine"
            x2="100%"
            :y2="yHorizontalLine"
        ></line>
        <polyline
            class="stroke-[4] stroke-blue-600 hover:stroke-red-600"
            fill="none"
            :points="points"
        ></polyline>
        <line
            class="stroke-2 stroke-green-500 hover:stroke-red-600 hover:cursor-move"
            :x1="xVerticalLine"
            y1="0"
            :x2="xVerticalLine"
            y2="100%"
        >
        </line>
    </svg>
    <slot name="filterByDate"></slot>
</template>

<style scoped></style>