<script setup>
import { computed } from "@vue/runtime-core";

const props = defineProps({
  answer: String,
  letter: String,
  correctAnswer: String,
});

const answer = computed(() => {
  return props.answer;
});
const letter = computed(() => {
  return props.letter;
});

// function test(e) {
//   console.log(e.target.closest(".answer-container").lastElementChild.innerText);
// }

function test(e) {
  console.log(e.target.closest(".answer-container").lastElementChild.innerText);
  console.log(props.correctAnswer);
}
</script>

<template>
  <button class="answer-container" @click="$emit('selectValue', $event)">
    <span class="option">{{ letter }}</span>
    <span class="answer" :data-answer="answer" v-html="answer"></span>
  </button>
</template>

<style lang="scss" scoped>
.answer-container {
  font-family: inherit;
  color: #fff;
  cursor: pointer;
  background-color: #642576;
  // width: 28rem;
  min-height: 5rem;
  border: none;
  border-radius: 7px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: 0.3s ease all;
  text-align: left;

  &:not(.disabled-btn):hover {
    background-color: #93669f;
  }

  @media screen and (min-width: 1150px) {
    // width: 45rem;
  }

  span {
    font-size: 2rem;
  }

  .option {
    font-weight: 700;
  }

  .answer {
    font-weight: 300;
  }
}
</style>
