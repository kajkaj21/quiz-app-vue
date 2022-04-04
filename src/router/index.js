import { createRouter, createWebHistory } from "vue-router";
import MainMenu from "../components/MainMenu.vue";
import MakeQuiz from "../components/MakeQuiz.vue";
import TheGame from "../components/TheGame.vue";
import QuizOverview from "../components/QuizOverview.vue";

const routes = [
  { path: "/", component: MainMenu, name: "MainMenu" },
  { path: "/make-quiz", component: MakeQuiz, name: "MakeQuiz" },
  { path: "/quiz", component: TheGame, name: "TheGame" },
  {
    path: "/overview",
    component: QuizOverview,
    name: "QuizOverview",
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
