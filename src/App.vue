<script lang="ts">
import StartView from "./views/StartView.vue";
import QuestionView from "./views/QuestionView.vue";
import { mapStores } from "pinia";
import { useQuizStore } from "./stores/quizStore";
import ButtonComponent from "./components/ButtonComponent.vue";

export default {
  data() {
    return {
      next: "Next",
      previous: "Previous",
    };
  },
  computed: {
    ...mapStores(useQuizStore),
  },
  components: {
    StartView,
    QuestionView,
    ButtonComponent,
  },
};
</script>

<template>
  <main>
    <StartView />
    <p v-if="quizStore.questionsLoaded">
      Question nr {{ quizStore.currentQuestion + 1 }} /
      {{ quizStore.questions.length }}
      <QuestionView
        :question="quizStore.questions[quizStore.currentQuestion].question"
        :answers="quizStore.questions[quizStore.currentQuestion].answers"
      />
      <ButtonComponent
        :value="previous"
        :onClick="quizStore.gotoPreviousQuestion"
      />
      <ButtonComponent
        :value="next"
        :onClick="quizStore.gotoNextQuestion"
      />
    </p>
  </main>
</template>
