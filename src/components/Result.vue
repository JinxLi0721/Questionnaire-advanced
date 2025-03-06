<script setup>
import { defineProps, inject, ref } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.js";
import { supabase } from "@/supabase";

const { question, totalScore, extraSuggest } = defineProps(["question", "totalScore", "extraSuggest"]);

const userStore = useUserStore();
const { user: loginUser, loadingUser } = storeToRefs(userStore);
const buttonTxt = ref("儲存此次結果");
const disabled = ref(false);
const loadingResult = ref(false);

let actualScore = totalScore;
if (question._id === "668f3da1166f1af15a3cd750") {
    actualScore *= 4;
}
const grade = question.grades.find(item => actualScore <= item.gradesRange.max && actualScore >= item.gradesRange.min);
async function handleFinish(data) {
    const created_at = new Date();
    let response = { success: true };
    try {
        const { question_id, user_id, score, status_result } = data;

        if (!user_id) {
            return (response = {
                success: false,
                data: "未登入"
            });
        }
        if (!question_id || !score || !status_result) {
            return (response = {
                success: false,
                data: "錯誤的參數"
            });
        }
        loadingResult.value = true;
        await supabase.from("question_result").insert({
            user_id,
            question_id,
            score,
            status_result,
            created_at
        });
        loadingResult.value = false;
    } catch (e) {
        response = {
            success: false,
            data: e.message
        };
    }
    return response;
}

const storeResult = async () => {
    let response = await handleFinish({
        question_id: question._id,
        user_id: loginUser.value.id,
        score: actualScore,
        status_result: grade.statisticsStatus
    });
    if (!response.success) {
        buttonTxt.value = `儲存失敗，${response.data}`;
    } else {
        buttonTxt.value = "儲存成功！";
    }
    disabled.value = true;
};

const reload = inject("reload");
</script>

<template>
    <div class="result-content">
        <div class="result">
            <h4 class="status">您的檢測結果：</h4>
            <p>
                {{ grade.statisticsStatus }}
            </p>
            <h4 class="description">建議：</h4>
            <p>
                {{ grade.description }}
            </p>
            <p class="suggestion">
                {{ grade.suggestion }}
            </p>
            <p class="suggestion" v-if="extraSuggest" v-for="suggestion in extraSuggest">
                {{ suggestion }}
            </p>
            <h4>參考資料：</h4>
            <p v-for="references in question.references">
                {{ references }}
            </p>
            <p class="remind">此問卷僅為參考，若有疑慮建議尋找專業資源協助。</p>
            <div class="result-footer">
                <RouterLink to="/">返回問卷</RouterLink>
                <a href="#" class="button" @click="reload()">再測一次</a>
                <AButton
                    type="text"
                    @click="storeResult"
                    v-if="loginUser"
                    :loading="loadingResult"
                    :disabled="disabled"
                >
                    {{ buttonTxt }}
                </AButton>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
