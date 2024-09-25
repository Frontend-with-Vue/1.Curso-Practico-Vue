<script setup>
    import { currencyFormatter } from '@/Functions/currencyFormatter.js';
    import { inject, computed, ref, watch } from 'vue';
    import { Type } from '@/Models/Movement.js';

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

    const indexGraphic = ref(null);
    watch(xVerticalLine,(current)=>{
        if(!svgElementRef.value) return;
        const {width, totalLength} = values();
        const space = width/totalLength;
        const totalSpaces = parseInt(width/space);
        let index = parseInt(current/space);
        if(index >= totalSpaces) index = totalSpaces - 1;
        if(index == indexGraphic.value) return;
        indexGraphic.value = index;
    });

    const xShortInfo = ref(0);
    const yShortInfo = ref(0);
    watch(indexGraphic, (current)=>{
        if(!svgElementRef.value) return;
        if(filterMovementsDate.value.length == 0) return;

        const pointsList = points.value.split(' ').map(item=>item.split(',').map(Number));
        xShortInfo.value =
            pointsList[current][0] == pointsList[current+1][0] ?
                pointsList[current][0]:
                (pointsList[current][0]+pointsList[current+1][0])/2;
        yShortInfo.value = 
            pointsList[current][1] == pointsList[current+1][1] ?
                pointsList[current][1]:
                (pointsList[current][1]+pointsList[current+1][1])/2;
    });

    const currentIndexMovement = computed(()=>{
        if(filterMovementsDate.value.length == 0) return;
        return filterMovementsDate.value[indexGraphic.value];
    });
    const currentSaving = computed(()=>{
        if(filterMovementsDate.value.length == 0) return;
        return filterMovementsDate.value.reduce((sum, movement, i)=>{
            if(indexGraphic.value < i) return sum;
            if(indexGraphic.value >=i){
                if(movement.type == Type.INCOME) return sum + movement.amount;
                else return sum - movement.amount;
            }
        },0);
    });

    const showVerticalLine = ref(false);
    const showShortInfo = computed(()=>{
        if(filterMovementsDate.value.length == 0) return false;
        return showVerticalLine.value
    })

    function moveLine(event){
        if(!svgElementRef.value) return;
        setShowVerticalLine(true);
        const elementX = svgElementRef.value.getBoundingClientRect().x;
        const touchX = event.clientX - elementX;
        if(touchX < 0 || touchX > svgElementRef.value.clientWidth) return;
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
    function setShowVerticalLine(newStatus){
        showVerticalLine.value = newStatus
    }
</script>

<template>
    <div class="relative w-auto h-auto">
        <svg @mousemove="moveLine" @mouseleave="setShowVerticalLine(false)" class="w-full min-w-80 h-[200px] my-10 overflow-visible" ref="svgElementRef">
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
                v-if="showVerticalLine"
                class="stroke-2 stroke-green-500 hover:stroke-red-600 hover:cursor-move"
                :x1="xVerticalLine"
                y1="0"
                :x2="xVerticalLine"
                y2="100%"
            >
            </line>
        </svg>
        <div
            @mousemove="setShowVerticalLine(true)"
            v-if="showShortInfo"
            class="absolute top-0 left-0 p-1 bg-blue-400 bg-opacity-85 border-2 border-blue-800 rounded-xl transition"
            :style = "{
                transform: 'translate('+xShortInfo+'px,'+ yShortInfo +'px)'
            }"
        >
            <p class="flex flex-col font-bold">
                <span>Ahorro acumulado: </span>
                <span :class="currentSaving>0?'text-green-600':'text-red-600'">{{currencyFormatter.format(currentSaving)}}</span>
            </p>
            <p>
                <span v-if="currentIndexMovement?.type == Type.INCOME">Ingreso: </span>
                <span v-else>Gasto: </span>
                <span>{{currencyFormatter.format(currentIndexMovement?.amount)}}</span>
            </p>
            <p>{{ 'Fecha: '+ currentIndexMovement?.date.toDateString() }}</p>
        </div>
    </div>
    <slot name="filterByDate"></slot>
</template>

<style scoped></style>