<script setup></script>

<template>
    <div class="cover">
        <slot></slot>
    </div>
</template>

<style scoped>
.cover {
    background-image: url(/pawel-czerwinski-home-cover.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    width: 100%;
    height: 800px;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>
