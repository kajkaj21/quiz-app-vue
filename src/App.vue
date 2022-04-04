<script setup>
import { onMounted, computed } from "vue";
import HighScores from "./components/HighScores.vue";
import { useQuizCategoryOptions } from "./stores/useQuizCategoryOptions";

onMounted(() => {
  storeQuizCategoryOptions.userScores =
    JSON.parse(localStorage.getItem("scores")) || [];
});

const storeQuizCategoryOptions = useQuizCategoryOptions();

const showHighScores = computed(() => {
  return storeQuizCategoryOptions.showHighScores;
});
</script>

<template>
  <router-view></router-view>
  <Teleport to="body">
    <HighScores v-if="showHighScores"></HighScores>
  </Teleport>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
html {
  font-size: 62.5%;
  font-family: "Roboto", sans-serif;
}

*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  background-image: linear-gradient(
    to right top,
    #a63ec5,
    #a33ab5,
    #9f37a5,
    #9a3597,
    #943389
  );
  min-height: 100vh;
  overflow-y: auto;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  cursor: pointer;
}

/* Track */
::-webkit-scrollbar-track {
  background-color: #3b2940;
  border-radius: 7px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background-color: #93669f;
  border-radius: 7px;
}
</style>
