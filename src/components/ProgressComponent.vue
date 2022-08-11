<script lang="ts">
export default {
  props: {
    number: Number,
    onClick: Function,
  },
};
</script>

<template>
  <button @click="onClick(number)">{{ number }}</button>
</template>

<style scoped>
button {
  display: block;
  border: none;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  text-align: center;
}
</style>
