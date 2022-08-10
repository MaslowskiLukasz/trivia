import {
  describe,
  expect,
  beforeEach,
  vi,
  afterEach,
  beforeAll,
  test,
} from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useQuizStore } from "@/stores/quizStore";
import axios from "axios";

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("Quiz store - happy path", () => {
  let store: ReturnType<typeof useQuizStore>;

  const response = {
    data: {
      results: [
        {
          question: "First question",
          correct_answer: "first correct",
          incorrect_answers: ["incorrect 1", "incorrect 2", "incorrect 3"],
        },
        {
          question: "Second question",
          correct_answer: "second correct",
          incorrect_answers: ["incorrect 1", "incorrect 2", "incorrect 3"],
        },
      ],
    },
  };

  beforeEach(() => {
    store = useQuizStore();

    vi.spyOn(axios, "get").mockResolvedValue(response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    store.$reset();
  });

  test("questions loaded flag set after fetching questions", async () => {
    await store.fetchQuestions();
    expect(store.questionsLoaded).toBe(true);
  });

  test("fetch adds questions to state", async () => {
    await store.fetchQuestions();
    expect(store.questions[0].question).toMatch("First question");
    expect(store.questions[0].answers.length).toBe(4);
    expect(store.questions[0].answers).toContain("incorrect 1");
    expect(store.questions[0].answers).toContain("incorrect 2");
    expect(store.questions[0].answers).toContain("incorrect 3");
    expect(store.questions[0].answers).toContain("first correct");
    expect(store.questions[0].correctAnswer).toMatch("first correct");

    expect(store.questions[1].question).toMatch("Second question");
    expect(store.questions[1].answers.length).toBe(4);
    expect(store.questions[1].answers).toContain("incorrect 1");
    expect(store.questions[1].answers).toContain("incorrect 2");
    expect(store.questions[1].answers).toContain("incorrect 3");
    expect(store.questions[1].answers).toContain("second correct");
    expect(store.questions[1].correctAnswer).toMatch("second correct");
  });

  test("goto next question increments current question number", async () => {
    await store.fetchQuestions();
    store.gotoNextQuestion();
    expect(store.currentQuestion).toBe(1);
  });

  test("goto next question decrements current question number", async () => {
    await store.fetchQuestions();
    store.gotoNextQuestion();
    store.gotoPreviousQuestion();
    expect(store.currentQuestion).toBe(0);
  });

  test("goto next question doesn't go beyond limit", async () => {
    await store.fetchQuestions();
    store.gotoNextQuestion();
    store.gotoNextQuestion();
    store.gotoNextQuestion();
    expect(store.currentQuestion).toBe(response.data.results.length - 1);
  });

  test("goto previous question doesn't go below 0", async () => {
    await store.fetchQuestions();
    store.gotoPreviousQuestion();
    expect(store.currentQuestion).toBe(0);
  });
});

describe("Quiz store - failure API request", () => {
  let store: ReturnType<typeof useQuizStore>;

  beforeEach(() => {
    store = useQuizStore();
    vi.spyOn(axios, "get").mockRejectedValue(new Error("Bad request"));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    store.$reset();
  });

  test("doesn't set questionsLoaded flag when request fails ", async () => {
    await store.fetchQuestions();
    expect(store.questionsLoaded).toBe(false);
  });

  test("doesn't set state when request fails", async () => {
    await store.fetchQuestions();
    expect(store.questions.length).toBe(0);
  });

  test("set error message when request fails", async () => {
    await store.fetchQuestions();
    expect(store.errorMsg).toMatch("Bad request");
  });
});
