<script lang="ts">
export default {
  props: {
    value: String,
    onClick: {
      type: Function,
      required: true,
    },
  },
};
</script>

<template>
  <button @click="onClick">{{ value }}</button>
</template>
