import { defineStore } from "pinia";
import axios from "axios";

export interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
  selectedAnswer?: number;
}

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    questions: [] as Question[],
    currentQuestion: 0,
    questionsLoaded: false,
  }),
  actions: {
    async fetchQuestions() {
      const url = "https://opentdb.com/api.php?amount=10&type=multiple";
      const response = await axios.get(url);
      const results = await response.data.results;
      const data: Question[] = [];

      results.map((item) => {
        data.push({
          question: item.question,
          answers: [...item.incorrect_answers, item.correct_answer],
          correctAnswer: item.correct_answer,
        });
      });

      this.questions = [...data];
      this.questionsLoaded = true;
    },
    gotoNextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
      }
    },
    gotoPreviousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
      }
    },
  },
});
