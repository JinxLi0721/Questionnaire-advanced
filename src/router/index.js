import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Question from "@/views/QuestionView.vue";
import HistoryView from "@/views/HistoryView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/questionnaires/:_id",
            name: "questionnaire",
            component: Question
        }
    ]
});

export default router;
