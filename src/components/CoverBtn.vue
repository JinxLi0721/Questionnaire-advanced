<script setup>
import { DownOutlined } from "@ant-design/icons-vue";

const scrollToCard = () => {
    window.scrollTo({
        top:900,
        left:0,
        behavior:"smooth"
    })
}
</script>

<template>
    <div class="cover-btn-container">
        <a-button type="ghost" size="large" shape="round" @click="scrollToCard"> 開始測驗 </a-button>
        <a-button type="ghost" shape="round" @click="scrollToCard">
            <template #icon>
                <DownOutlined />
            </template>
        </a-button>
    </div>
</template>

<style scoped>
.cover-btn-container {
    display: grid;
    align-items: center;
    justify-content: center;
    top: 60vh;
    position: relative;
    margin-bottom: 10px;
}
</style>
