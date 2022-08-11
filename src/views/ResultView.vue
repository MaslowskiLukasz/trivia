<script lang="ts">
import { useQuizStore } from "@/stores/quizStore";
import { mapStores } from "pinia";

export default {
  computed: {
    ...mapStores(useQuizStore),
  },
};
</script>

<template>
  <h1>Results</h1>
  <p>{{ quizStore.getResults() }} / {{ quizStore.questions.length }}</p>
</template>
