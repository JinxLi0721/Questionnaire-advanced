<script setup>
import { ref, defineProps } from "vue";
import { storeToRefs } from "pinia";

import { useUserStore } from "@/stores/user";
import router from "@/router";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const open = ref(false);
const { question, dataIndex, isLogin } = defineProps(["question", "data-index", "isLogin"]);
const explainText = ref("")

const showModal = () => {
    if ((isLogin && !user.value) || (!isLogin && user.value)) {
        open.value = true;

        if (typeof question.explain === "string") {
        explainText.value = question.explain.split("/");
    }
    }
};
const handleOk = (event) => {
    open.value = false;
    if (question._id) {
        return router.push(`/questionnaires/${question._id}`);
    }
};


</script>

<template>
    <a-card hoverable style="width: 240px" class="card-space" @click="showModal">
        <template #cover>
            <img alt="example" :src="question.image" />
        </template>
        <a-card-meta :title="question.title">
            <template #description>題數：{{ question.questions.length }}</template>
        </a-card-meta>
        <p>{{ question.explain.substr(0, 35) }}...</p>
    </a-card>
    <!--已登入  -->
    <a-modal v-model:open="open" :title=question.title @ok="handleOk">
        <template #footer>
            <a-button key="submit" type="primary" @click="handleOk">開始測驗</a-button>
        </template>
        <p class="explain-text" v-for="row in explainText">{{ row }}</p>
    </a-modal>
</template>

<style scoped>
.card-space {
    margin: 5px 10px;
}
</style>
