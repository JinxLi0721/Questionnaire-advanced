<script setup>
import { ref, defineProps } from "vue";
import { Modal } from "ant-design-vue";
const open = ref(false);
const props = defineProps(['isLogin'])
const showModal = () => {
    open.value = true;
};
const hideModal = () => {
    open.value = false;
};

const title = (props.isLogin)? "登入": "註冊";

</script>

<template>
    <div>
        <a-button type="text" @click="showModal">{{title}}</a-button>
        <a-modal v-model:open="open" :title="title" ok-text="確定" cancel-text="取消" @ok="hideModal">
            <a-input class="auth-input" v-if="!props.isLogin" v-model:value="value" placeholder="名稱" />
            <a-input class="auth-input" v-model:value="value" placeholder="信箱" />
            <a-input class="auth-input" v-model:value="value" placeholder="密碼" />
        </a-modal>
    </div>
</template>

<style scoped>
.auth-input {
    margin-top: 4px;
    margin-bottom: 3px;
}
</style>
