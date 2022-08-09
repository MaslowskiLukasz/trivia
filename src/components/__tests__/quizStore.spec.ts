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

  beforeEach(() => {
    store = useQuizStore();
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

    vi.spyOn(axios, "get").mockResolvedValue(response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    store.$reset;
  });

  test("questions loaded flag set after fetching questions", async () => {
    await store.fetchQuestions();
    expect(store.questionsLoaded).toBe(true);
  });
});
