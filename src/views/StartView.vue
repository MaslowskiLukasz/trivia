<script lang="ts">
import ButtonComponent from "../components/ButtonComponent.vue";
import { useQuizStore } from "@/stores/quizStore";
import { mapActions } from "pinia";

export default {
  data() {
    return {
      btnValue: "Start the quiz!",
    };
  },
  methods: {
    ...mapActions(useQuizStore, ["fetchQuestions"]),
    startQuiz() {
      this.fetchQuestions();
      console.log("start quiz");
    },
  },
  components: { ButtonComponent },
};
</script>

<template>
  <div id="wrapper">
    <h1>Welcome to Trivia App!</h1>
    <h2>Rules:</h2>
    <ul>
      <li>There is always only one correct answer</li>
      <li>You can skip questions and come back to them later</li>
      <li>You can change your answer until you hit submit</li>
    </ul>
    <ButtonComponent
      class="submit-btn"
      :value="btnValue"
      :onClick="startQuiz"
    />
  </div>
</template>

<style scoped>
#wrapper {
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  place-items: center;
}

button {
  margin-top: 3rem;
  width: 80%;
}

h2 {
  margin-top: 3rem;
}

@media (min-width: 550px) {
  button {
    width: 30%;
  }
}
</style>
