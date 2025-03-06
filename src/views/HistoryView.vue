<script setup>
import Nav from "../components/Nav.vue";
import Cover from "../components/Cover.vue";
import CoverBtn from "@/components/CoverBtn.vue";
import CoverTitle from "@/components/CoverTitle.vue";
import Content from "@/components/Content.vue";
import HistoryTab from "@/components/HistoryTab.vue";
</script>

<template>
    <div class="cover-container">
        <Nav></Nav>
        <Cover>
            <CoverTitle />
            <CoverBtn />
        </Cover>
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
