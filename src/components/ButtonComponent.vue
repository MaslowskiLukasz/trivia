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
  height: 100%;
}
</style>

<style>
.selected {
  background-color: #94b49f;
}

button {
  background-color: #fcf8e8;
  color: #000;
  transition: background-color 0.2s ease-in, transform 0.2s ease-in-out;
}

button:hover {
  background-color: #afb4ff;
  color: #000;
}

.submit-btn {
  background-color: #5a8f7b;
  color: #fff;
}

.navigation-btn {
  background-color: #76549a;
  color: #fff;
}
</style>
