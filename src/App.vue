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
    <p v-if="!quizStore.questionsLoaded">
      <StartView />
    </p>
    <p v-if="quizStore.questionsLoaded">
      <QuestionView />
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
