<script lang="ts">
import StartView from "./views/StartView.vue";
import QuestionView from "./views/QuestionView.vue";
import { mapStores } from "pinia";
import { useQuizStore } from "./stores/quizStore";
import ButtonComponent from "./components/ButtonComponent.vue";
import ResultView from "./views/ResultView.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

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
    Loading,
  },
};
</script>

<template>
  <main>
    <loading
      v-model:active="quizStore.isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
      :color="'#76549a'"
      :background-color="'#282828'"
    />

    <div v-if="!quizStore.questionsLoaded && !showResult && !quizStore.isLoading">
      <StartView />
    </div>
    <div v-if="quizStore.questionsLoaded && !showResult">
      <QuestionView />
    </div>
    <div v-if="showResult">
      <ResultView />
      <ButtonComponent :value="'Start next quiz'" :onClick="restart" />
    </div>
    <div
      class="submit"
      :style="{
        visibility: readyToSubmit && !showResult ? 'visible' : 'hidden',
      }"
    >
      <div id="submit-btn-wrapper">
        <ButtonComponent
          :value="'Submit'"
          :onClick="submit"
          class="submit-btn"
        />
      </div>
    </div>
  </main>
</template>

<style>
main {
  width: 100%;
}

.submit {
  margin-right: 2em;
  width: 100%;
}

#submit-btn-wrapper {
  padding: 2em;
}

@media (min-width: 550px) {
  .submit {
    margin: 0 auto;
    width: 30%;
  }
}
</style>
