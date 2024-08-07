<script setup>
    import { watchEffect, ref } from 'vue';

    const props = defineProps({
        userId: String
    });

    const profiles = ref([1,2,3,4]);

    watchEffect(()=>{
        profiles.value = profiles.value.map((prof)=>{
            if(prof === Number(props.userId)) return prof*2;
            else return prof
        });
    })
</script>

<template>
    <h5>Profiles</h5>
    <router-link v-for="profile in profiles" :key="profile" :to="{name: 'profile', params: {userId: profile}}">Profile {{ profile }}</router-link>
    <p>
        {{ props.userId }}
    </p>
</template>

<style scoped></style>