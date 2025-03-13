<script setup>
import { RouterLink } from "vue-router";
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";

import Container from "./Container.vue";
import AuthModal from "./AuthModal.vue";
import { useUserStore } from "../stores/user";
import router from "@/router";

const userStore = useUserStore();

const { user, loadingUser, errorMsg } = storeToRefs(userStore);
const open = ref(false);
const loading = ref(false);

const formState = reactive({
    username: "",
    email: ""
});
const onFinish = values => {
    errorMsg.value = values;
};
const onFinishFailed = errorInfo => {
    errorMsg.value = errorInfo;
};

const headerStyle = {
    height: 64,
    paddingInline: 50,
    lineHeight: "80px",
    width: 100
};

const handleLogout = async e => {
    const re = await userStore.handleLogout(user);
    router.push("/");
};

const goToHistory = () => {
    if (user.value.id) {
        return router.push(`/history/${user.value.id}`);
    }
};

const handleProfile = () => {
    userStore.clearErrorMsg();
    open.value = true;
    formState.username = user.value.name;
    formState.email = user.value.email;
};

const handleCancel = () => {
    open.value = false;
};

const handleOk = async () => {
    await userStore.updateUser({ name: formState.username });
    await userStore.getUser();
    open.value = false;
};
</script>
<template>
    <ALayoutHeader :style="headerStyle">
        <Container>
            <div class="position-absolute">
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
                            <AButton type="text" @click="goToHistory">歷史紀錄</AButton>
                            <AButton type="text" @click="handleProfile">個人資料</AButton>
                            <AButton type="text" @click="handleLogout">登出</AButton>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </ALayoutHeader>

    <a-modal v-model:open="open" title="個人資料">
        <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 10 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
                label="姓名"
                name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]"
            >
                <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="Email" name="email">
                <a-input v-model:value="formState.email" :rules="[{ type: 'email' }]" :disabled="true" />
            </a-form-item>
        </a-form>
        {{ errorMsg }}
        <template #footer>
            <a-button key="back" @click="handleCancel">取消</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="handleOk">送出</a-button>
        </template>
    </a-modal>
</template>
<style scoped>
.position-absolute {
    position: absolute;
}
.nav-container {
    z-index: 10;
    display: flex;
    justify-content: space-between;
    position: static;
    width: 80vw;
}

.left-content {
    display: flex;
    align-items: center;
}
.left-content a {
    margin-left: 10px;
    text-decoration: none;
}
.right-content button {
    padding: 0 10px;
}

.nav-button {
    display: flex;
    align-items: center;
}
</style>
