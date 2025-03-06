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
        },
        {
            path: "/history/:user_id",
            name: "history",
            component: HistoryView,
            meta: { requiresAuth: true }
        }
    ]
});
router.beforeEach((to, from, next) => {
    console.log("to=", to.fullPath, "| from=", from.fullPath);
    if (
        to.matched.some(record => {
            console.log(record.name, record.meta.requiresAuth);
            return record.meta.requiresAuth;
        })
    ) {
        let store = JSON.parse(localStorage.getItem("sb-mcvkdbrohrjsrfvpdltd-auth-token"));
        if (!store || !store["access_token"]) {
            next({ path: "/" });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
