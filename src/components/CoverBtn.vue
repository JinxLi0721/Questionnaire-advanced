<script setup>
import { DownOutlined } from "@ant-design/icons-vue";
</script>

<template>
    <div class="cover-btn-container">
        <a-button type="ghost" size="large" shape="round"> 開始測驗 </a-button>
        <a-button type="ghost" shape="round">
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
