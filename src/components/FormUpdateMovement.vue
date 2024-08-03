<script setup>
    import FormBase from './FormBase.vue';
    import { inject, ref } from 'vue';

    const {updateMovemente, toggleModalUpdateMovement, currentUpdateMovement} = inject('movements');

    const labelSubmit = ref('Actualizar movimiento');

    function actualizarMovement(newMovement){
        updateMovemente(newMovement);
        toggleModalUpdateMovement();
    }
</script>

<template>
    <FormBase :movement="currentUpdateMovement" :labelSubmit="labelSubmit" @getMovement="actualizarMovement"/>
</template>

<style scoped>
</style>