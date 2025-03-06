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
    <Container>
        <h2 class="question-title">{{ question.title }}</h2>
        <div class="instruction">
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
    </Container>
</template>

<style scoped>
.question-container {
    background-color: rgb(72, 123, 133);
    padding: 7% 10%;
    border-radius: 5px;
}
</style>
