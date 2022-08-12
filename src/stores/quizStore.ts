import { defineStore } from "pinia";
import axios from "axios";

export interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
  selectedAnswer?: number;
}

interface ApiResponseElement {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    questions: [] as Question[],
    currentQuestion: 0 as number,
    questionsLoaded: false as boolean,
    errorMsg: "" as string,
    isLoading: false as boolean,
  }),
  actions: {
    async fetchQuestions() {
      const url = "https://opentdb.com/api.php?amount=10&type=multiple";
      try {
        this.questionsLoaded = false;
        this.isLoading = true;
        const response = await axios.get(url);
        const results = await response.data.results;
        const data: Question[] = [];
  
        results.map((item: ApiResponseElement) => {
          const decodedQuestion = this.decodeText(item.question);
          const decodedCorrect = this.decodeText(item.correct_answer);
          const decodedIncorrect = item.incorrect_answers.map((item) =>
            this.decodeText(item)
          );
          const answers = [...decodedIncorrect, decodedCorrect];
          data.push({
            question: decodedQuestion,
            answers: [...this.shuffleArray(answers)],
            correctAnswer: item.correct_answer,
          });
        });
  
        this.questions = [...data];
        this.questionsLoaded = true;
        this.isLoading = false;
      } catch(error: any) {
        this.errorMsg = error.message;
        this.isLoading = false;
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
      const selectedIndex =
        this.questions[index].selectedAnswer != undefined
          ? this.questions[index].selectedAnswer
          : null;
      const selected =
        selectedIndex != null
          ? this.questions[index].answers[selectedIndex]
          : null;
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
    gotoQuestion(index: number) {
      if (index >= 0 && index < this.questions.length) {
        this.currentQuestion = index;
      }
    },
    shuffleArray(arr: string[]): string[] {
      return arr.sort(() => 0.5 - Math.random());
    },
    decodeText(text: string): string {
      const area = document.createElement("textarea");
      area.innerHTML = text;
      return area.value;
    },
  },
});
