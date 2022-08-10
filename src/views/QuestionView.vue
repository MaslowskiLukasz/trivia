<script lang="ts">
import { useQuizStore } from "@/stores/quizStore";
import { mapStores } from "pinia";
import ButtonComponent from "../components/ButtonComponent.vue";

export default {
  methods: {
    selectAnswer(index: number) {
      this.quizStore.selectAnswer(this.quizStore.currentQuestion, index);
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
      :onClick="selectAnswer"
      :index="index"
      :class="[
        quizStore.questions[quizStore.currentQuestion].selectedAnswer === index
          ? 'selected'
          : '',
      ]"
    />
  </div>
  <ButtonComponent
    :value="'Previous'"
    :onClick="quizStore.gotoPreviousQuestion"
  />
  <ButtonComponent
    :value="'Next'"
    :onClick="quizStore.gotoNextQuestion"
  />
</template>
