<script setup>
import ButtonMenu from "./ButtonMenu.vue";
import { computed } from "vue";
import { useQuizCategoryOptions } from "../stores/useQuizCategoryOptions";
import { useRouter } from "vue-router";

const store = useQuizCategoryOptions();
const router = useRouter();

const props = defineProps({
  errorInfo: Object,
});

const errorInfo = computed(() => props.errorInfo.category_question_count);

const selectedCategory = computed(() => store.difficulties);

function goToMakeQuiz() {
  router.push({ name: "MakeQuiz" });
}
</script>

<template>
  <div class="not-found">
    <p>
      Your selected number of questions is too big. Question ammount of each
      difficulty in the selected category:
    </p>
    <ul>
      <li>
        <span> Easy:</span
        ><span> {{ errorInfo.total_easy_question_count }}</span>
      </li>
      <li>
        <span> Medium:</span>
        <span> {{ errorInfo.total_medium_question_count }}</span>
      </li>
      <li>
        <span>Hard:</span>
        <span> {{ errorInfo.total_hard_question_count }}</span>
      </li>
      <li>
        <span>Total:</span><span>{{ errorInfo.total_question_count }}</span>
      </li>
    </ul>
    <ButtonMenu
      @click="goToMakeQuiz"
      color="#279d56"
      buttonName="Try Again!"
    ></ButtonMenu>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: #642576;
  font-size: 2rem;
  width: 90%;
  max-width: 64rem;
  border-radius: 13px;
  padding: 2rem 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  p {
    background-color: #93669f;
    border-radius: 7px;
    padding: 1rem 1rem;
    line-height: 1.3;
  }

  p:nth-of-type(1) {
    margin-bottom: 2.4rem;
  }

  ul {
    background-color: #93669f;
    border-radius: 7px;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    width: 100%;
    padding: 1rem 5rem;
    margin-bottom: 5rem;

    li {
      width: 100%;
      text-align: left;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
