<script lang="ts">
import StartView from "./views/StartView.vue";
import QuestionView from "./views/QuestionView.vue";
import { mapStores } from "pinia";
import { useQuizStore } from "./stores/quizStore";
import ButtonComponent from "./components/ButtonComponent.vue";

export default {
  methods: {
    clicked() {
      console.log("submit");
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
  },
};
</script>

<template>
  <main>
    <p v-if="!quizStore.questionsLoaded">
      <StartView />
    </p>
    <p v-if="quizStore.questionsLoaded">
      <QuestionView />
      <ButtonComponent
        :value="'Previous'"
        :onClick="quizStore.gotoPreviousQuestion"
      />
      <ButtonComponent
        :value="'Next'"
        :onClick="quizStore.gotoNextQuestion"
      />
    </p>
    <p v-if="readyToSubmit">
      <ButtonComponent :value="'Submit'" :onClick="clicked" />
    </p>
  </main>
</template>
