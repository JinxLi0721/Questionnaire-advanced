<script setup>
import CardsContent from './CardsContent.vue';

</script>

<template>
    <main>
        <section class="content">
            <slot name="content">
                <CardsContent/>
            </slot>
        </section>
    </main>
</template>

<style scoped>
main {
    position: relative;
    padding: 0;
    margin: 0;
    z-index: 1; 
}

.content {
    padding: 100px 20px;
    background-color: white; 
    min-height: 100vh;
    top: 100px;
    width: 70%;
    margin: 0 auto;
}


</style>
