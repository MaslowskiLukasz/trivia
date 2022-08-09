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
  <h1>Welcome to Trivia App</h1>
  <ButtonComponent :value="btnValue" :onClick="startQuiz" />
</template>
