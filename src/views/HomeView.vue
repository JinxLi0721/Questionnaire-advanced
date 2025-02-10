<script setup>
import Nav from "../components/Nav.vue";
import Cover from "../components/Cover.vue";
import CoverBtn from "@/components/CoverBtn.vue";
import CoverTitle from "@/components/CoverTitle.vue";
import Content from "@/components/Content.vue";
import CardsContent from '@/components/CardsContent.vue';

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
        <!-- <CardsContent/> -->
        <Content/>
    </div>
</template>
<style scoped>
.cover-container{
    padding: 0;
    margin: 0;
}
</style>