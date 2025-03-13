<script setup>
import Nav from "../components/Nav.vue";
import CoverSlot from "../components/CoverSlot.vue";
import CoverBtnSlot from "@/components/CoverBtnSlot.vue";
import Content from "@/components/Content.vue";
</script>

<template>
    <div class="cover-container">
        <Nav></Nav>
        <CoverSlot :from="'Home'">
            <template #cover-title>
                <p>免費心理檢測評估</p>
            </template>
            <CoverBtnSlot>
                <template #start> 開始測驗 </template>
            </CoverBtnSlot>
        </CoverSlot>
    </div>
    <div class="content-container">
        <Content />
    </div>
</template>
<style scoped>
.cover-container {
    padding: 0;
    margin: 0;
}
</style>
