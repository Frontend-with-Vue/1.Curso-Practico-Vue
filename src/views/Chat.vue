<script setup></script>

<template>
    <div class="flex">
        <main class="order-2 flex-grow">
            <router-view></router-view>
        </main>
        <aside class="order-1">
            <router-view name="sidebar"></router-view>
        </aside>
    </div>
</template>

<style scoped></style>