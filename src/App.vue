<script lang="ts">
import StartView from "./views/StartView.vue";
import QuestionView from "./views/QuestionView.vue";
import { mapStores } from "pinia";
import { useQuizStore } from "./stores/quizStore";
import ButtonComponent from "./components/ButtonComponent.vue";
import ResultView from "./views/ResultView.vue";

export default {
  data() {
    return {
      showResult: false,
    };
  },
  methods: {
    submit() {
      console.log("submit");
      this.showResult = true;
    },
    restart() {
      this.showResult = false;
      this.quizStore.reset();
      this.quizStore.fetchQuestions();
    },
  },
  computed: {
    ...mapStores(useQuizStore),
    readyToSubmit() {
      return (
        !this.quizStore.questions.some(
          (question) => question.selectedAnswer === undefined
        ) && this.quizStore.questionsLoaded
      );
    },
  },
  components: {
    StartView,
    QuestionView,
    ButtonComponent,
    ResultView,
  },
};
</script>

<template>
  <main>
    <p v-if="!quizStore.questionsLoaded && !showResult">
      <StartView />
    </p>
    <p v-if="quizStore.questionsLoaded && !showResult">
      <QuestionView />
    </p>
    <p v-if="readyToSubmit && !showResult">
      <ButtonComponent :value="'Submit'" :onClick="submit" />
    </p>
    <p v-if="showResult">
      <ResultView />
      <ButtonComponent :value="'Start next quiz'" :onClick="restart" />
    </p>
  </main>
</template>
