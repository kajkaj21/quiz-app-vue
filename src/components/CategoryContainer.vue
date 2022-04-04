<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  type: String,
  categoryTitle: String,
  categoryOption: Array,
  id: String,
});

const optionValue = ref(null);

const isTypeSelect = computed(() => {
  return props.type === "select";
});

const categoryId = computed(() => {
  return props.id;
});
</script>

<template>
  <div class="container">
    <label :for="categoryId">{{ props.categoryTitle }}</label>
    <input
      v-if="!isTypeSelect"
      class="input-field"
      :id="categoryId"
      type="number"
      min="1"
      max="50"
      v-model="optionValue"
      @input="$emit('changeValue', optionValue)"
      required
    />
    <select
      v-else
      class="input-field"
      :id="categoryId"
      v-model="optionValue"
      @change="$emit('changeValue', optionValue)"
    >
      <option v-for="option in categoryOption" :key="option" :value="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 2rem;
  }

  .input-field {
    font-family: inherit;
    width: 28rem;
    height: 3rem;
    border-radius: 7px;
    border: none;
    font-size: 1.6rem;
    padding: 0.5rem 1rem;
    background-color: #642576;
    color: #fff;

    @media screen and (min-width: 700px) {
      width: 35rem;
    }
    @media screen and (min-width: 1000px) {
      width: 40rem;
      height: 4rem;
      font-size: 2rem;
    }
    @media screen and (min-width: 1300px) {
      width: 45rem;
    }
    @media screen and (min-width: 1600px) {
      width: 50rem;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
