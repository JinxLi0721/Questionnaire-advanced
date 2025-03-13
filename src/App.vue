<script setup>
import { onMounted, nextTick, ref, provide } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();

const isRouterAlive = ref(true);
onMounted(() => {
    userStore.getUser();
});

const reload = () => {
    isRouterAlive.value = false;
    nextTick(() => {
        isRouterAlive.value = true;
    });
};

provide("reload", reload);
</script>

<template>
    <RouterView v-if="isRouterAlive" />
</template>

<style>
body {
    margin: 0;
    padding: 0;
}
</style>
