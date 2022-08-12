<script setup lang="ts">
const quizStore = useQuizStore();
</script>

<script lang="ts">
import { useQuizStore } from "@/stores/quizStore";
import { mapStores } from "pinia";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    ...mapStores(useQuizStore),
    chartData() {
      const correct = this.quizStore.getResults();
      const incorrect = this.quizStore.questions.length - correct;
      return {
        labels: ["correct", "incorrect"],
        datasets: [
          {
            backgroundColor: ["#5a8f7b", "#E64848"],
            data: [correct, incorrect],
          },
        ],
      };
    },
  },
  components: {
    Pie,
  },
};
</script>

<template>
  <div id="wrapper">
    <h1>Results</h1>
    <h2>{{ quizStore.getResults() }} / {{ quizStore.questions.length }}</h2>
    <div id="chart-wrapper">
      <Pie :chartData="chartData" :chartOptions="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  place-items: center;
}

#chart-wrapper {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
