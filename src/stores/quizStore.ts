import { defineStore } from "pinia";
import axios from "axios";

export interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
  selectedAnswer?: number;
}

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    questions: [] as Question[],
    currentQuestion: 0,
    questionsLoaded: false,
    errorMsg: "",
  }),
  actions: {
    async fetchQuestions() {
      const url = "https://opentdb.com/api.php?amount=10&type=multiple";
      try {
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
      } catch(error) {
        this.errorMsg = error.message;
      }
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
    selectAnswer(questionIndex: number, answerIndex: number) {
      this.questions[questionIndex].selectedAnswer = answerIndex;
    },
    isAnswerCorrect(index: number) {
      const selectedIndex = this.questions[index].selectedAnswer;
      const selected = this.questions[index].answers[selectedIndex];
      if (selected === this.questions[index].correctAnswer) {
        return true;
      }

      return false;
    },
    getResults() {
      let correct = 0;
      this.questions.map((question, index) => {
        if (this.isAnswerCorrect(index)) {
          correct += 1;
        }
      });

      return correct;
    },
    reset() {
      this.$reset();
    },
  },
});
