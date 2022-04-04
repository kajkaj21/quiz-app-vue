<script setup>
import { watch, ref, computed } from "vue";
import { useQuizCategoryOptions } from "../stores/useQuizCategoryOptions";
import ButtonMenu from "./ButtonMenu.vue";
import TheSpinner from "./TheSpinner.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const storeQuizCategoryOptions = useQuizCategoryOptions();

watch(
  () => storeQuizCategoryOptions.userScores,
  (newVal, oldVal) => {
    localStorage.setItem("scores", JSON.stringify(newVal));
  },
  { deep: true }
);

const showQuestion = ref(false);

function startNewGame() {
  storeQuizCategoryOptions.userScores.push(score.value);
  router.push({ name: "MainMenu" });
}

const props = defineProps({
  answers: Array,
});

const correctAnswers = computed(() => {
  return storeQuizCategoryOptions.questionsArray.map((el) => el.correct_answer);
});

const questionCount = computed(() => {
  return storeQuizCategoryOptions.questionsArray.length;
});

const userCorrectAnswersCount = computed(() => {
  return correctAnswers.value
    .map((el, id) => el === props.answers[id])
    .filter((el) => el === true).length;
});

const resultPercentage = computed(() => {
  return Math.floor(
    (userCorrectAnswersCount.value / questionCount.value) * 100
  );
});

const score = computed(() => {
  return resultPercentage.value * userCorrectAnswersCount.value;
});

const isLoaded = ref(false);

function dataLoaded() {
  setTimeout(() => {
    isLoaded.value = true;
  }, 3000);
}

const answers = computed(() => {
  return props.answers;
});

const questionQuestion = ref(null);
const questionCorrectAnswer = ref(null);
const userAnswer = ref(null);

function hoverOnQuestion(id) {
  const clickedQuestion = storeQuizCategoryOptions.questionsArray[id];
  questionQuestion.value = clickedQuestion.question;
  questionCorrectAnswer.value = clickedQuestion.correct_answer;
  userAnswer.value = answers.value[id];
  showQuestion.value = true;
}

function hoverOnQuestionLeave(e) {
  if (!e.target.closest("li")) showQuestion.value = false;
}

dataLoaded();
</script>

<template>
  <Teleport to="body" v-if="!isLoaded">
    <TheSpinner></TheSpinner>
  </Teleport>
  <main v-else @click="hoverOnQuestionLeave($event)">
    <div class="container" v-if="!showQuestion">
      <div class="result">
        <p>Correct answers:</p>
        <p>{{ userCorrectAnswersCount }} / {{ questionCount }}</p>
      </div>
      <div class="result-percentage">
        <p>{{ resultPercentage }}%</p>
      </div>
    </div>
    <div class="clicked-question" v-else>
      <div class="question" v-html="questionQuestion"></div>
      <div class="answers">
        <div class="user-answer">
          <span>Your Answer: </span>
          <span v-html="userAnswer"></span>
        </div>
        <div class="correct-answer">
          <span>Correct Answer: </span>
          <span v-html="questionCorrectAnswer"></span>
        </div>
      </div>
    </div>
    <ul class="questions">
      <li
        v-for="(answer, id) in answers"
        :key="answer"
        @click="hoverOnQuestion(id)"
      >
        <div class="question">
          <span> Question {{ id + 1 }} </span>
          <font-awesome-icon
            v-if="answer === correctAnswers[id]"
            :icon="['fas', 'check']"
            class="icon correct"
          >
          </font-awesome-icon>
          <font-awesome-icon
            v-else
            :icon="['fas', 'xmark']"
            class="icon incorrect"
          ></font-awesome-icon>
        </div>
      </li>
    </ul>
    <ButtonMenu
      buttonName="NEW GAME"
      color="#279d56"
      @click="startNewGame"
    ></ButtonMenu>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100vh;
  padding: 2.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 5rem;

  .container {
    height: 50rem;
    width: 90%;
    max-width: 64rem;
    background-color: #642576;
    border-radius: 13px;
    color: #fff;
    padding: 2.2rem 1.6rem;
    display: flex;
    flex-direction: column;

    .result {
      display: flex;
      justify-content: space-between;
      font-size: 2.4rem;
    }

    .result-percentage {
      width: 15rem;
      height: 15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: center;
      border-radius: 50%;
      background-color: #93669f;
      font-size: 4rem;
      font-weight: bold;
      margin: auto 0;
    }
  }

  .clicked-question {
    height: 50rem;
    width: 90%;
    max-width: 64rem;
    background-color: #642576;
    border-radius: 13px;
    color: #fff;
    padding: 2.2rem 1.6rem;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 1rem;

    .question {
      background-color: #93669f;
      border-radius: 7px;
      padding: 1rem;
    }

    .answers {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 0.5rem;

      & * {
        display: flex;
        // flex-direction: column;
        justify-content: space-between;
        background-color: #93669f;
        border-radius: 7px;
        padding: 0.5rem;
      }
    }
  }

  .questions {
    overflow: auto;
    height: 40rem;
    width: 90%;
    max-width: 64rem;
    border-radius: 13px;
    color: #fff;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 1.5rem;
    background-color: #642576;
    font-size: 2rem;

    li {
      cursor: pointer;
      background-color: #93669f;
      border-radius: 7px;
      padding: 1rem 2rem;

      .question {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .icon {
        width: 3.2rem;
        height: 3.2rem;
      }

      .correct {
        color: #279d56;
      }

      .incorrect {
        color: #a71a1a;
      }
    }
  }
}
</style>
