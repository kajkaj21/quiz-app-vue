<script setup>
import { computed } from "vue";

const props = defineProps({
  buttonText: String,
});

const buttonText = computed(() => {
  return props.buttonText;
});
</script>

<template>
  <button>{{ buttonText }}</button>
</template>

<style lang="scss" scoped>
button {
  cursor: pointer;
  display: block;
  font-family: inherit;
  color: #fff;
  font-size: 2rem;
  width: 9.2rem;
  height: 3.5rem;
  background-color: #279d56;
  border: 0;
  border-radius: 7px;
  margin-top: 1.5rem;
  margin-left: auto;
  margin-bottom: 5rem;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.97);
  }
}
</style>
