<script setup>

const { from } = defineProps(["from"]);
const background = from == "Home" ? "/pawel-czerwinski-home-cover.jpg" : "/pawel-czerwinski-history-cover.jpg";
</script>

<template>
    <div class="cover" :style="{ backgroundImage: `url(${background})` }">
        <div class="cover-title">
            <h2>自我評估問卷</h2>
            <slot name="cover-title">
                <p>免費心理檢測評估</p>
            </slot>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped>
.cover {
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    width: 100%;
    height: 800px;
    top: 0;
    left: 0;
    z-index: -1;
    min-height: 100vh;
}
.cover-title {
    display: grid;
    align-items: center;
    justify-content: center;
    top: 35vh;
    position: relative;
    text-align: center;
}
</style>
