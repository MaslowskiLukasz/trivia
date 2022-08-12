<script setup lang="ts">
const quizStore = useQuizStore();
</script>

<script lang="ts">
import { useQuizStore } from "@/stores/quizStore";
import { mapActions, mapStores } from "pinia";
import ButtonComponent from "../components/ButtonComponent.vue";
import ProgressComponent from "../components/ProgressComponent.vue";

export default {
  methods: {
    //...mapActions(useQuizStore, ["selectAnswer", "gotoQuestion"]),
    selectCurrentAnswer(index: number) {
      this.quizStore.selectAnswer(this.quizStore.currentQuestion, index);
    },
    changeQuestion(index: number) {
      this.quizStore.gotoQuestion(index - 1);
    },
  },
  computed: {
    ...mapStores(useQuizStore),
  },
  components: {
    ButtonComponent,
    ProgressComponent,
  },
};
</script>

<template>
  <section id="progress">
    <div
      class="question-number"
      v-for="(question, index) in quizStore.questions"
      :key="index"
    >
      <ProgressComponent
        :number="index + 1"
        :onClick="changeQuestion"
        :class="[
          typeof question.selectedAnswer !== 'undefined' ? 'selected' : '',
          index === quizStore.currentQuestion ? 'current' : '',
        ]"
      ></ProgressComponent>
    </div>
  </section>
  <section id="question">
    <h1>
      Question nr {{ quizStore.currentQuestion + 1 }} /
      {{ quizStore.questions.length }}
    </h1>
    <p>{{ quizStore.questions[quizStore.currentQuestion].question }}</p>
  </section>
  <section id="answers">
    <div
      class="answer"
      v-for="(answer, index) in quizStore.questions[quizStore.currentQuestion]
        .answers"
      :key="index"
    >
      <ButtonComponent
        :value="answer"
        :onClick="selectCurrentAnswer"
        :index="index"
        :class="[
          quizStore.questions[quizStore.currentQuestion].selectedAnswer === index
            ? 'selected'
            : '',
        ]"
      ></ButtonComponent>
    </div>
  </section>
  <section id="navigation">
    <ButtonComponent
      class="navigation-btn"
      :value="'<< Previous'"
      :onClick="quizStore.gotoPreviousQuestion"
    />
    <ButtonComponent
      class="navigation-btn"
      :value="'Next >>'"
      :onClick="quizStore.gotoNextQuestion"
    />
  </section>
</template>

<style scoped>
#question {
  margin-bottom: 2em;
}

#answers {
  padding: 2rem;
}

.answer {
  margin-bottom: 1rem;
}

#progress {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.question-number {
  margin: 0.2rem;
}

#navigation {
  display: flex;
  flex-direction: column-reverse;
  row-gap: 1rem;
  padding: 2rem;
}

@media (min-width: 550px) {
  #answers {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 1em;
    grid-row-gap: 1em;
  }

  #navigation {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10rem;
  }
}
</style>
