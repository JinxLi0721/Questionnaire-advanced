<script setup>
import Container from "@/components/Container.vue";
import Nav from "../components/Nav.vue";
import Question from "@/components/Question.vue";
import questionnaires from "@/data/questionnaires.json";
import { ref } from "vue";
import { useRoute } from "vue-router";
import Result from "@/components/Result.vue";

const route = useRoute();
const question = questionnaires.find(q => q._id === route.params._id);
const currentQuestionIndex = ref(0);
const totalScore = ref(0);
const extraSuggest = ref([]);

const onOptionSelected = score => {
    totalScore.value += score;
    currentQuestionIndex.value++;
};

const onExtraSuggest = v => {
    if (v) {
        extraSuggest.value.push(v);
    }
};
</script>

<template>
    <Nav></Nav>
    <Container class="question-result-container">
        <h2 class="question-title">{{ question.title }}</h2>
        <div class="instruction" v-if="currentQuestionIndex != question.questions.length">
            <p>{{ question.instructions }}</p>
        </div>
        <div class="question-container" v-if="currentQuestionIndex != question.questions.length">
            <Question
                :question="question.questions[currentQuestionIndex]"
                :key="currentQuestionIndex"
                @selectOption="onOptionSelected"
                @extraSuggest="onExtraSuggest"
            />
        </div>
        <div class="result-container" v-else>
            <Result :question="question" :totalScore="totalScore" :extraSuggest="extraSuggest" :key="question._id" />
        </div>
        <footer>
            <p>此測驗僅供參考，若有任何疑慮，建議尋求專業醫療或心理資源協助。</p>
            <p>關心您的心理健康，與您同在每一天</p>
            <div class="heart-footer">❤</div>
        </footer>
    </Container>
</template>

<style scoped>
.question-result-container {
    font-family: "Noto Sans TC", sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f9f7f4;
    padding: 10%;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
.question-result-container h2 {
    color: #5d4037;
    font-weight: 600;
    font-size: 1.8rem;
}
.instruction {
    color: #5d4037;
}
.question-container {
    background-color: #c7a383;
    padding: 7% 10%;
    border-radius: 8px;
}
footer {
    text-align: center;
    color: #78909c;
    font-size: 0.9rem;
    margin: 2rem 0 1rem;
    padding-top: 0.5rem;
}
</style>
