<script setup>
    const props = defineProps({
        userId: String
    });
</script>

<template>
    <h5>Profiles</h5>
    <router-link :to="{name: 'profile', params: {userId: '1'}}">Profile 1</router-link>
    <router-link :to="{name: 'profile', params: {userId: '2'}}">Profile 2</router-link>
    <router-link :to="{name: 'profile', params: {userId: '3'}}">Profile 3</router-link>
    <p>
        {{ props.userId }}
    </p>
</template>

<style scoped></style>