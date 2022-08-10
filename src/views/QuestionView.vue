<script lang="ts">
import { useQuizStore } from "@/stores/quizStore";
import { mapStores } from "pinia";
import ButtonComponent from "../components/ButtonComponent.vue";

export default {
  methods: {
    consoleClick(index: number) {
      this.quizStore.questions[this.quizStore.currentQuestion].selectedAnswer = index;
    },
  },
  computed: {
    ...mapStores(useQuizStore),
  },
  components: {
    ButtonComponent,
  },
};
</script>

<template>
  <h1>
    Question nr {{ quizStore.currentQuestion + 1 }} /
    {{ quizStore.questions.length }}
  </h1>
  <p>{{ quizStore.questions[quizStore.currentQuestion].question }}</p>
  <div
    v-for="(answer, index) in quizStore.questions[quizStore.currentQuestion]
      .answers"
    :key="index"
  >
    <ButtonComponent
      :value="answer"
      :onClick="consoleClick"
      :index="index"
      :class="[
        quizStore.questions[quizStore.currentQuestion].selectedAnswer === index
          ? 'selected'
          : '',
      ]"
    />
  </div>
</template>
