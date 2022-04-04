<script setup>
import { ref, computed } from "vue";
import CategoryContainer from "./CategoryContainer.vue";
import ButtonMinor from "./ButtonMinor.vue";
import { useQuizCategoryOptions } from "../stores/useQuizCategoryOptions";
import { useRouter } from "vue-router";

const router = useRouter();
const storeQuizCategoryOptions = useQuizCategoryOptions();

const questions = ref(null);
const categoryId = ref(null);
const difficulty = ref(null);

function getQuizQuestionAmmount(val) {
  questions.value = val;
}
function getQuizCategory(val) {
  categoryId.value = val;
  storeQuizCategoryOptions.categoryValue = val;
}
function getQuizDifficulty(val) {
  difficulty.value = val;
  storeQuizCategoryOptions.difficultyValue = val;
}

const questionsValue = computed(() => {
  return questions.value;
});

const categoryIdValue = computed(() => {
  return categoryId.value === null
    ? (categoryId.value = "")
    : (categoryId.value = `&category=${categoryId.value}`);
});
const difficultyValue = computed(() => {
  return difficulty.value === null
    ? (difficulty.value = "")
    : (difficulty.value = `&difficulty=${difficulty.value}`);
});

async function getQuiz() {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${questionsValue.value}${categoryIdValue.value}${difficultyValue.value}`
  );
  const data = await res.json();
  storeQuizCategoryOptions.questionsArray = data.results;
  storeQuizCategoryOptions.questionsArray.forEach(
    (el) =>
      (el.allAnswers = [...el.incorrect_answers, el.correct_answer].sort(
        (a, b) => a.length - b.length
      ))
  );
  console.log(data);
  router.push({ name: "TheGame" });
}

const storeQuizCategory = useQuizCategoryOptions();
</script>

<template>
  <main class="form-container">
    <h2>Make a Quiz!</h2>
    <form class="quiz-options" @submit.prevent="getQuiz">
      <CategoryContainer
        categoryTitle="Number of Questions:"
        type="number"
        id="questions"
        @changeValue="getQuizQuestionAmmount"
      ></CategoryContainer>
      <CategoryContainer
        categoryTitle="Select Category:"
        type="select"
        :categoryOption="storeQuizCategory.categories"
        id="categories"
        @changeValue="getQuizCategory"
      ></CategoryContainer>
      <CategoryContainer
        categoryTitle="Select difficulty:"
        type="select"
        :categoryOption="storeQuizCategory.difficulties"
        id="difficulties"
        @changeValue="getQuizDifficulty"
      ></CategoryContainer>
      <ButtonMinor buttonText="START"></ButtonMinor>
    </form>
  </main>
</template>

<style lang="scss" scoped>
.form-container {
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: 0 2rem;

  h2 {
    margin-top: 6.7rem;
    font-size: 3.6rem;
  }

  .quiz-options {
    margin-top: 4.2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
