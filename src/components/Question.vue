<script setup>
const { question } = defineProps(["question"]);

const emit = defineEmits(["selectOption", "extraSuggest"]);

const emitSelectedOpt = (event, score, extraSuggest) => {
    const target = event.target;

    emit("selectOption", score);
    emit("extraSuggest", extraSuggest);
};
</script>

<template>
    <div class="question-content">
        <p>{{ question.description }}</p>
    </div>
    <a-space direction="vertical" class="option-space">
        <a-button
            ghost
            class="option"
            v-for="(option, index) in question.options"
            :key="index"
            @click="emitSelectedOpt($event, option.score, option.extraSuggest)"
        >
            {{ option.description }}</a-button
        >
    </a-space>
</template>

<style scoped>
.question-content p {
    padding: 0 0 10px 10px;
}
.option-space {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
}

.option {
    width: 70%;
    margin: 0 0 3px 0;
}
</style>
