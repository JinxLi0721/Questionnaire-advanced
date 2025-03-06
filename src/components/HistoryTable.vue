<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const { loadingUser } = storeToRefs(userStore);
const { questionnaireId, tableData } = defineProps(["questionnaireId", "tableData"]);
const errMsg = ref("");

const columns = [
    {
        title: "日期",
        dataIndex: "created_at",
        width: 250
    },
    {
        title: "分數",
        dataIndex: "score",
        width: 150
    },
    {
        title: "結果",
        dataIndex: "status_result"
    }
];
</script>

<template>
    <div class="spinner" v-if="loadingUser">
        <a-spin size="large" />
    </div>
    <div class="table-data" v-else>
        <a-table :columns="columns" :data-source="tableData" bordered v-if="!errMsg">
            <template #bodyCell="{ column, text }">
                <template v-if="column.dataIndex === 'name'">
                    <a>{{ text }}</a>
                </template>
            </template>
        </a-table>
        <div class="error" v-else>
            {{ errMsg }}
        </div>
    </div>
</template>

<style scoped></style>
