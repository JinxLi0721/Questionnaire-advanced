<script setup>
import { defineProps, inject, ref } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.js";
import { supabase } from "@/supabase";
import { VerticalAlignBottomOutlined, DoubleLeftOutlined, UndoOutlined } from "@ant-design/icons-vue";

const { question, totalScore, extraSuggest } = defineProps(["question", "totalScore", "extraSuggest"]);

const userStore = useUserStore();
const { user: loginUser, loadingUser } = storeToRefs(userStore);
const buttonTxt = ref("儲存結果");
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
        <div class="result-card">
            <div class="result-section">
                <div class="result-content">
                    <div class="result-title">您的檢測結果</div>
                    <div class="result-value">
                        {{ grade.statisticsStatus }}
                    </div>
                </div>
            </div>
            <div class="advice-section">
                <div class="advice-header">您的結果說明</div>
                <div class="advice-content">
                    {{ grade.description }}
                </div>
            </div>
            <div class="advice-section" v-if="extraSuggest.length != 0">
                <div class="advice-header">給您的建議</div>
                <div class="advice-content">
                    {{ grade.suggestion }}
                </div>
            </div>
            <div class="alert-section" v-if="extraSuggest.length != 0">
                <div class="alert-header">重要提醒</div>
                <div class="extra-suggestion" v-for="suggestion in extraSuggest">
                    {{ suggestion }}
                </div>
            </div>
            <div class="reference-section">
                <p><strong>參考資源：</strong></p>
                <p v-for="references in question.references">
                    {{ references }}
                </p>
            </div>
            <div class="result-footer">
                <a-space wrap>
                    <RouterLink to="/">
                        <AButton>
                            <template #icon> <DoubleLeftOutlined /></template>返回問卷
                        </AButton>
                    </RouterLink>

                    <AButton class="button" @click="reload()">
                        <template #icon> <UndoOutlined /></template>再測一次
                    </AButton>
                    
                    <AButton @click="storeResult" v-if="loginUser" :loading="loadingResult" :disabled="disabled">
                        <template #icon>
                            <VerticalAlignBottomOutlined />
                        </template>
                        {{ buttonTxt }}
                    </AButton>
                </a-space>
            </div>
        </div>
    </div>
</template>

<style scoped>
.result-content {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0;
    background-color: transparent;
}
.result-card {
    background-color: white;
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    padding: 2rem;
    margin-bottom: 1.8rem;
    transition: transform 0.3s ease;
    border-top: 4px solid #5d4037;
}
.result-section {
    text-align: center;
    padding: 1.5rem;
    background-color: #fff8f1;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    border-left: none;
    margin: 2rem 0;
}
.result-content {
    position: relative;
    z-index: 1;
}
.result-title {
    font-size: 1.2rem;
    color: #546e7a;
    margin-bottom: 0.8rem;
}
.result-value {
    font-size: 1.9rem;
    font-weight: 700;
    color: #7a5043;
    margin-bottom: 0.5rem;
    display: inline-block;
    padding: 0.5rem 1.5rem;
    background-color: white;
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.15);
}
.advice-section {
    padding: 1.8rem;
    margin-bottom: 1.8rem;
    border-radius: 16px;
    background-color: white;
    position: relative;
    box-shadow: inset 0 0 0 2px #f0e4d7, 0 5px 15px rgba(255, 193, 7, 0.1);
}
.advice-header {
    font-size: 1.4rem;
    color: #7a5043;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    font-weight: 600;
}
.advice-content {
    color: #555;
    font-size: 1.05rem;
    line-height: 1.8;
}
.advice-content p {
    margin: 0.8rem 0;
}
.alert-section {
    padding: 1.8rem;
    border-radius: 16px;
    background-color: #fff5f5;
    margin: 1.8rem 0;
    position: relative;
    box-shadow: inset 0 0 0 2px #ffcdd2, 0 5px 15px rgba(244, 67, 54, 0.1);
}
.alert-header {
    color: #e53935;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    font-weight: 600;
}
.reference-section {
    background-color: white;
    border-radius: 16px;
    padding: 1.5rem;
    font-size: 0.95rem;
    color: #78909c;
    margin-top: 2rem;
}
.reference-section strong {
    color: #455a64;
}
.disclaimer {
    text-align: center;
    font-style: italic;
    color: #78909c;
    margin: 1rem 0;
    font-size: 0.9rem;
}

@media (max-width: 600px) {
    .container {
        margin: 1rem;
        width: auto;
    }
    .card {
        padding: 1.5rem;
    }
    h1 {
        font-size: 1.8rem;
    }
}
.result-footer {
    display: flex;
    justify-content: space-around;
}
</style>
