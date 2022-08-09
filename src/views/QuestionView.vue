<script lang="ts">
import ButtonComponent from "../components/ButtonComponent.vue";

export default {
  props: {
    question: String,
    answers: [],
  },
  methods: {
    consoleClick() {
      console.log("answer was choosen");
    },
  },
  components: {
    ButtonComponent,
  },
};
</script>

<template>
  <h1>Question</h1>
  <p>{{ question }}</p>
  <div v-for="(answer, index) in answers" :key="index">
    <ButtonComponent :value="answer" :onClick="consoleClick" />
  </div>
</template>
