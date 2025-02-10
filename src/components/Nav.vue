<script setup>
import { RouterLink } from "vue-router";
import { ref, defineProps } from "vue";
import { storeToRefs } from "pinia";

import Container from "./Container.vue";
import AuthModal from "./AuthModal.vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const { user, loadingUser } = storeToRefs(userStore);

const headerStyle = {
    height: 64,
    paddingInline: 50,
    lineHeight: "80px",
    width: 100
};

const handleLogout = async e => {
    const re = await userStore.handleLogout(user);
};
</script>
<template>
    <ALayoutHeader :style="headerStyle">
        <Container>
            <div class="nav-container">
                <div class="left-content">
                    <RouterLink to="/">首頁</RouterLink>
                </div>
                <div v-if="!loadingUser" class="nav-button">
                    <div class="right-content" v-if="!user">
                        <AuthModal :isMember="false" :style="'text'"></AuthModal>
                        <AuthModal :isMember="true" :style="'text'"></AuthModal>
                    </div>
                    <div class="right-content" v-else>
                        <AButton type="text">個人資料</AButton>
                        <AButton type="text" @click="handleLogout">登出</AButton>
                    </div>
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
    position: static;
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

.nav-button {
    display: flex;
    align-items: center;
}
</style>
