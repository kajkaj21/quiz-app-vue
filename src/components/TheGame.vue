<script setup>
import { onMounted, ref, computed } from "vue";
import QuizAnswerContainer from "./QuizAnswerContainer.vue";
import ButtonMinor from "./ButtonMinor.vue";
import TheSpinner from "./TheSpinner.vue";
import NotFound from "./NotFound.vue";
import { useQuizCategoryOptions } from "../stores/useQuizCategoryOptions";
import { useRouter } from "vue-router";

const router = useRouter();

const storeQuizCategoryOptions = useQuizCategoryOptions();

const currentCategoryId = computed(() => {
  return storeQuizCategoryOptions.categoryValue;
});

const errorInfo = ref(null);

onMounted(async () => {
  const res = await fetch(
    `https://opentdb.com/api_count.php?category=${currentCategoryId.value}`
  );
  const data = await res.json();
  errorInfo.value = data;
});

const isLoaded = ref(false);
const userPickedAnswer = ref(false);
const answersLetters = ["A", "B", "C", "D"];
const currentQuestion = ref(0);
const currentAnswer = ref(null);
const userAnswers = ref([]);

const questions = computed(() => {
  return storeQuizCategoryOptions.questionsArray;
});

const isSearchArrayEmpty = computed(() => {
  return questions.value.length === 0;
});

const showNextButton = computed(() => {
  return (
    currentQuestion.value < questions.value.length - 1 &&
    userPickedAnswer.value === true
  );
});

const showFinishButton = computed(() => {
  return (
    currentQuestion.value === questions.value.length - 1 &&
    userPickedAnswer.value === true
  );
});

function dataLoaded() {
  setTimeout(() => {
    isLoaded.value = true;
  }, 3000);
}

function selectValue(e) {
  const clickedAnswer = e.target.closest(".answer-container");
  clickedAnswer.classList.add("checking-answer-bac-col");
  document.querySelectorAll(".answer-container").forEach((el) => {
    el.disabled = true;
    el.classList.add("disabled-btn");
  });
  setTimeout(() => {
    clickedAnswer.classList.remove("checking-answer-bac-col");
    userPickedAnswer.value = true;
    document.querySelectorAll(".answer-container").forEach((el) => {
      const answer = el.lastElementChild;
      if (
        answer.dataset.answer ===
        storeQuizCategoryOptions.questionsArray[currentQuestion.value]
          .correct_answer
      )
        el.classList.add("correct-answer");
      else el.classList.add("incorrect-answer");
    });
  }, 2000);
  const clickedAnswerValue = clickedAnswer.lastElementChild.dataset.answer;
  currentAnswer.value = clickedAnswerValue;
}

function goToTheNextQuestion() {
  if (currentAnswer.value === null) {
    return;
  }
  document.querySelectorAll(".answer-container").forEach((el) => {
    el.disabled = false;
    el.classList.remove("disabled-btn");
    el.classList.remove("correct-answer");
    el.classList.remove("incorrect-answer");
  });
  userAnswers.value.push(currentAnswer.value);
  currentQuestion.value++;
  currentAnswer.value = null;
  userPickedAnswer.value = false;
}

function finishQuiz() {
  if (currentAnswer.value === null) return;
  document.querySelectorAll(".answer-container").forEach((el) => {
    el.disabled = false;
    el.classList.remove("disabled-btn");
    el.classList.remove("correct-answer");
    el.classList.remove("incorrect-answer");
  });
  userAnswers.value.push(currentAnswer.value);
  currentAnswer.value = null;
  userPickedAnswer.value = false;
  router.push({ name: "QuizOverview", params: { answers: userAnswers.value } });
}

dataLoaded();
</script>

<template>
  <Teleport v-if="!isLoaded" to="body">
    <TheSpinner></TheSpinner>
  </Teleport>
  <main v-else class="game-container">
    <NotFound :errorInfo="errorInfo" v-if="isSearchArrayEmpty"></NotFound>
    <section v-for="(question, id) in questions" :key="question.question">
      <article v-if="id === currentQuestion">
        <p class="question-count">
          Question {{ currentQuestion + 1 }} / {{ questions.length }}
        </p>
        <div class="question-container">
          <p v-html="question.question"></p>
        </div>
        <div class="answers-container">
          <QuizAnswerContainer
            v-for="(answer, id) in question.allAnswers"
            :key="answer"
            :answer="answer"
            :letter="answersLetters[id]"
            :correctAnswer="question.correct_answer"
            @selectValue="selectValue"
          ></QuizAnswerContainer>
        </div>
        <div class="buttons-container">
          <ButtonMinor
            v-if="showNextButton"
            buttonText="NEXT"
            @click="goToTheNextQuestion"
          ></ButtonMinor>
          <ButtonMinor
            v-if="showFinishButton"
            buttonText="FINISH"
            @click="finishQuiz"
          ></ButtonMinor>
        </div>
      </article>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.select-bac-col {
  background-color: #93669f;
}
.checking-answer-bac-col {
  background-color: #ebab07;

  &:hover {
    background-color: #ebab07;
  }
}

.correct-answer {
  background-color: #279d56;
}
.incorrect-answer {
  background-color: #a71a1a;
}

.disabled-btn {
  cursor: default;
}

.game-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;

  section {
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    article {
      width: 75vw;
      max-width: 100rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3rem;
      position: relative;

      .question-count {
        font-size: 2rem;
        align-self: flex-end;
        background-color: #642576;
        padding: 1rem 2rem;
        border-radius: 7px;
      }

      .question-container {
        width: 100%;
        min-height: 12.7rem;
        padding: 1rem 2rem;
        background-color: #642576;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 2rem;
        font-weight: 700;
        border-radius: 13px;
        overflow-x: hidden;
        overflow-wrap: anywhere;

        p {
          line-height: 1.5;
        }
      }

      .answers-container {
        width: 100%;
        list-style: none;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        overflow-x: hidden;
        overflow-wrap: anywhere;

        @media screen and (min-width: 700px) {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .buttons-container {
        position: absolute;
        right: 0;
        bottom: -10rem;
        // align-self: flex-end;
      }
    }
  }
}
</style>
