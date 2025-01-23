<script setup>
import { RouterLink } from "vue-router";
import { ref, defineProps } from "vue";
import Container from "./Container.vue";
import AuthModal from "./AuthModal.vue";
const isAuthenticated = ref(false);
const headerStyle = {
    height: 64,
    paddingInline: 50,
    lineHeight: "80px",
    width:100
};
</script>
<template>
    <ALayoutHeader :style="headerStyle">
        <Container>
            <div class="nav-container">
                <div class="left-content">
                    <RouterLink to="/">首頁</RouterLink>
                </div>
                <div class="right-content" v-if="!isAuthenticated">
                    <AuthModal :isLogin="false"></AuthModal>
                    <AuthModal :isLogin="true"></AuthModal>
                </div>
                <div class="right-content" v-else>
                    <AButton type="text">個人資料</AButton>
                    <AButton type="text">登出</AButton>
                </div>
            </div>
        </Container>
    </ALayoutHeader>
</template>
<style scoped>
.nav-container {
    z-index: 10;
    display: flex; 
    justify-content: space-between;
  
}

.left-content {
    display: flex;
    align-items: center;
}
.left-content a {
    margin-left: 10px;
    text-decoration: none;
}
.right-content {
    display: flex;
    align-items: center;
}
.right-content button {
    margin-right: 10px;
}
</style>
