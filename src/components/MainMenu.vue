<script setup>
import { useRouter } from "vue-router";
import ButtonMenu from "./ButtonMenu.vue";

import { useQuizCategoryOptions } from "../stores/useQuizCategoryOptions";

const storeQuizCategoryOptions = useQuizCategoryOptions();

const router = useRouter();

function startNewGame() {
  router.push({ name: "MakeQuiz" });
}

function displayHighScores() {
  storeQuizCategoryOptions.showHighScores = true;
}
</script>

<template>
  <main class="main-menu">
    <h1>QUIZ APP</h1>
    <div class="buttons-container">
      <ButtonMenu
        buttonName="NEW GAME"
        color="#279d56"
        @click="startNewGame"
      ></ButtonMenu>
      <ButtonMenu
        buttonName="HIGH SCORES"
        color="#ebab07"
        @click="displayHighScores"
      ></ButtonMenu>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main-menu {
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 6rem;
  align-items: center;
  justify-content: space-around;
  color: #fff;

  h1 {
    font-size: 4.8rem;
    margin-top: 14rem;
  }
  .buttons-container {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 15rem;
  }
}
</style>
