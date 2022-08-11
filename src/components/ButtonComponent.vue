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

<style>
.selected {
  background-color: aquamarine;
}
</style>
