<script setup>
import { useQuizCategoryOptions } from "../stores/useQuizCategoryOptions";
import { onMounted, computed, watch } from "vue";

const storeQuizCategoryOptions = useQuizCategoryOptions();

function hideHighScores() {
  storeQuizCategoryOptions.showHighScores = false;
}

const highScores = computed(() => {
  return storeQuizCategoryOptions.userScores
    .filter((score) => score > 0)
    .sort((a, b) => b - a)
    .slice(0, 10);
});
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <button @click="hideHighScores" class="return-btn">X</button>
      <h2>High Scores:</h2>
      <ul class="high-scores">
        <li v-for="(score, id) in highScores" :key="id">
          <span>{{ id + 1 }}</span> <span>{{ score }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .wrapper {
    position: relative;
    width: 90vw;
    max-width: 60rem;
    height: 47rem;
    background-color: #642576;
    border-radius: 13px;
    padding: 2.5rem min(10%, 5rem);
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    overflow: hidden;

    @media screen and (min-width: 700px) {
    }

    h2 {
      font-size: 2.4rem;
    }

    .high-scores {
      width: 100%;
      list-style: none;
      font-size: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }

    .return-btn {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      font-family: inherit;
      align-self: flex-end;
      width: 3rem;
      height: 3rem;
      border: 0;
      color: #a71a1a;
      font-size: 2.4rem;
      font-weight: 700;
      background-color: #642576;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.3s ease color;

      &:hover {
        color: #ff0000;
      }
    }
  }
}
</style>
