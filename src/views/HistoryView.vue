<script setup>
import Nav from "../components/Nav.vue";
import CoverSlot from "../components/CoverSlot.vue";
import CoverBtnSlot from "@/components/CoverBtnSlot.vue";
import Content from "@/components/Content.vue";
import HistoryTab from "@/components/HistoryTab.vue";
</script>

<template>
    <div class="cover-container">
        <Nav></Nav>
        <CoverSlot>
            <template #cover-title>
                <p>透過記錄了解自己</p>
            </template>
            <CoverBtnSlot>
                <template #start>查看紀錄</template>
            </CoverBtnSlot>
        </CoverSlot>
    </div>
    <div class="content-container">
        <Content>
            <template #content>
                <HistoryTab />
            </template>
        </Content>
    </div>
</template>

<style scoped></style>
