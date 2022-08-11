<script lang="ts">
export default {
  props: {
    value: String,
    index: Number,
    onClick: {
      type: Function,
      required: true,
    },
  },
};
</script>

<template>
  <button @click="onClick(index)">
    {{ value }}
  </button>
</template>

<style scoped>
button {
  display: block;
  border: none;
  padding: 1rem;
  width: 100%;
  /*margin: 0.5rem;*/
}
</style>

<style>
.selected {
  background-color: aquamarine;
}

button:hover {
  background-color: coral;
}
</style>
