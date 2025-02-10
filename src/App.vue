<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "./stores/user";


const userStore = useUserStore();

onMounted(() => {
    userStore.getUser();
})




</script>

<template>
    <RouterView />
</template>

<style scoped>
body, html {
    margin: 0;
    padding: 0;
}

</style>
