<script setup>
import { computed } from "vue";
const props = defineProps({
  buttonName: String,
  color: String,
});

const backgroundColor = computed(() => {
  return props.color;
});
</script>

<template>
  <button>{{ props.buttonName }}</button>
</template>

<style lang="scss" scoped>
button {
  cursor: pointer;
  font-family: inherit;
  display: block;
  border: 0;
  border-radius: 9px;
  font-size: 2.4rem;
  width: 17rem;
  height: 7.5rem;
  color: #fff;
  font-weight: bold;
  background-color: v-bind(backgroundColor);
  transition: all ease 0.3s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>
