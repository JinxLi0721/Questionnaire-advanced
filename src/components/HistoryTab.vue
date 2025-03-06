<script setup>
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { onMounted, watch } from "vue";
import questionnaires from "@/data/questionnaires.json";
import { supabase } from "@/supabase";
import { useUserStore } from "@/stores/user";

import { ref } from "vue";
import HistoryTable from "./HistoryTable.vue";
const activeKey = ref("1");
const tableData = ref([]);

const userStore = useUserStore();
const { user: loginUser, loadingUser } = storeToRefs(userStore);

const getData = async userNo => {
    const { data } = await supabase
        .from("question_result")
        .select()
        .eq("user_id", userNo)
        .order("created_at", { ascending: false });

    tableData.value = data.reduce((acc, { created_at, question_id, score, status_result }) => {
        if (!acc[question_id]) {
            acc[question_id] = [];
        }
        let date = dayjs(created_at).format("YYYY/MM/DD HH:mm:ss");
        acc[question_id].push({ created_at: date, score, status_result });
        return acc;
    }, {});
};

watch(loginUser, () => {
    if (!loadingUser.value && loginUser.value) {
        getData(loginUser.value.id);
    }
});

onMounted(() => {
    if (!loadingUser.value && loginUser.value) {
        getData(loginUser.value.id);
    }
});
</script>

<template>
    <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane
            v-for="(questionnaire, index) in questionnaires"
            :key="String(index + 1)"
            :tab="questionnaire.title"
        >
            <HistoryTable
                :key="questionnaire._id"
                :questionnaireId="questionnaire._id"
                :tableData="tableData[questionnaire._id]"
            />
        </a-tab-pane>
    </a-tabs>
</template>

<style scoped></style>
