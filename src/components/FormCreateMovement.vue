<script setup>
    import FormBase from './FormBase.vue';
    import { inject, ref } from 'vue';

    const {addNewMovement, toggleModalMovement} = inject('movements');

    const labelSubmit = ref('Agregar movimiento');

    function createMovement(newMovement){
        addNewMovement(newMovement);
        toggleModalMovement();
    }
</script>

<template>
    <FormBase :labelSubmit="labelSubmit" @getMovement="createMovement"/>
</template>

<style scoped>
</style>