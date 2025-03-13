<script setup>
import Card from "./Card.vue";
import questionnaires from "../data/questionnaires.json";

import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";

import AuthModal from "./AuthModal.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const { user: loginUser, loadingUser } = storeToRefs(userStore);

const openMemberModal = ref(false);
const openConfirm = ref(false);
const confirmNotLogin = ref(false);

const handleMemberModal = () => {
    if (!loginUser.value && !confirmNotLogin.value) {
        openConfirm.value = true;
    }
};

const confirm = () => {
    openMemberModal.value = true;
    openConfirm.value = false;
};

const cancelConfirm = () => {
    confirmNotLogin.value = true;
    openConfirm.value = false;
};

onMounted(async () => {
    await userStore.getUser();
});

watch(loginUser, () => {
    if (loginUser.value) {
        confirmNotLogin.value = false;
        openConfirm.value = false;
    }
});

const onLoginSuccess = res => {
    if (res.success) openMemberModal.value = false;
};
</script>

<template>
    <div class="cards-content">
        <div class="card-content" v-for="(question, index) in questionnaires" @click="handleMemberModal">
            <Card
                :question="question"
                :key="question._id"
                :data-index="index"
                :isLogin="confirmNotLogin"
                v-if="!loadingUser"
            />
            <div class="spinner" v-else="isLogin">
                <a-spin size="large" />
            </div>
        </div>
    </div>

    <a-modal v-model:open="openMemberModal" title="成為會員" :footer="null">
        <div class="flex-content">
            <AuthModal :isMember="false" :style="'primary'" @loginSuccess="onLoginSuccess"></AuthModal>
            <AuthModal :isMember="true" :style="'primary'" @loginSuccess="onLoginSuccess"></AuthModal>
        </div>
    </a-modal>

    <a-modal
        v-model:open="openConfirm"
        title="成為會員"
        ok-text="加入"
        cancel-text="取消"
        @ok="confirm"
        @cancel="cancelConfirm"
    >
        <p>會員能夠回顧過去評估的結果，</p>
        <p>可讓您更加了解自己的狀況</p>
        <p>是否加入?</p>
    </a-modal>
</template>

<style scoped>
.cards-content {
    margin: auto;
    display: flex;
    flex-wrap: wrap;
}

.flex-content {
    display: flex;
    padding: 5%;
    justify-content: space-evenly;
}
</style>
