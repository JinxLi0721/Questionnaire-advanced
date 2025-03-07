<script setup>
import { ref, reactive } from "vue";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
const open = ref(false);
const props = defineProps(["isMember", "style"]);

const userStore = useUserStore();
const { errorMsg, loading, user } = storeToRefs(userStore);

const emit = defineEmits(["loginSuccess"]);
const userCredentials = reactive({
    name: "",
    email: "",
    password: ""
});

const showModal = () => {
    clearCredentials();
    open.value = true;
};
const handleOk = async e => {
    if (props.isMember) {
        const res = await userStore.handleLogin(userCredentials);
        emit("loginSuccess", res);
    } else {
        await userStore.handleSignup(userCredentials);
    }
    if (user.value) {
        open.value = false;
    }
};

const handleCancel = () => {
    open.value = false;
};

const clearCredentials = () => {
    userCredentials.name = "";
    userCredentials.email = "";
    userCredentials.password = "";
    userStore.clearErrorMsg();
    loading.value = false;
};

const title = props.isMember ? "登入" : "註冊";
</script>

<template>
    <a-button :type="props.style" @click="showModal">{{ title }}</a-button>
    <a-modal v-model:open="open" :title="title">
        <template #footer>
            <a-button key="back" @click="handleCancel">取消</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="handleOk">確定</a-button>
        </template>
        <div v-if="!loading">
            <a-input
                class="auth-input"
                v-if="!props.isMember"
                v-model:value="userCredentials.name"
                placeholder="名稱"
            />
            <a-input class="auth-input" v-model:value="userCredentials.email" placeholder="信箱" />
            <a-input class="auth-input" v-model:value="userCredentials.password" placeholder="密碼" />
        </div>
        <div class="spinner" v-else>
            <a-spin size="large" />
        </div>
        <a-typography-text type="danger">{{ errorMsg }}</a-typography-text>
    </a-modal>
</template>

<style scoped>
.auth-input {
    margin-top: 4px;
    margin-bottom: 3px;
}
.spinner {
    text-align: center;
}

button {
    padding: 0 20px;
}
</style>
