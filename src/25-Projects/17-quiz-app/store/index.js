import { create } from "zustand";
import { quizData } from "../quizData";
import confetti from "canvas-confetti";

export const useQuizStore = create((set, get) => ({
  currentQuestion: 0,
  score: 0,
  userAnswers: [],
  lifelines: { fiftyFifty: 2, skip: 1, timeBonus: 1 },
  quizStarted: false,
  quizEnded: false,
  timeLeft: 30,
  currentQuestions: [...quizData],
  darkMode: false,

  startQuiz: () => set({ quizStarted: true, timeLeft: 30 }),
  restartQuiz: () =>
    set({
      currentQuestion: 0,
      score: 0,
      userAnswers: [],
      lifelines: { fiftyFifty: 2, skip: 1, timeBonus: 1 },
      quizStarted: false,
      quizEnded: false,
      timeLeft: 30,
      currentQuestions: [...quizData],
    }),
  decrementTime: () => set((state) => ({ timeLeft: state.timeLeft - 1 })),
  endQuiz: () => set({ quizEnded: true }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  handleAnswer: (selectedIndex) => {
    const state = get();
    const currentQ = state.currentQuestions[state.currentQuestion];
    const isCorrect = selectedIndex === currentQ.correct;

    if (isCorrect) confetti({ particleCount: 50, spread: 70 });

    set({
      userAnswers: [
        ...state.userAnswers,
        {
          question: state.currentQuestion,
          answer: selectedIndex,
          isCorrect,
          timeSpent: 30 - state.timeLeft,
          explanation: currentQ.explanation,
        },
      ],
      score: isCorrect ? state.score + 10 : state.score,
    });
  },

  nextQuestion: () =>
    set((state) => {
      if (state.currentQuestion < state.currentQuestions.length - 1) {
        return { currentQuestion: state.currentQuestion + 1, timeLeft: 30 };
      }
      return { quizEnded: true };
    }),

  useFiftyFifty: () =>
    set((state) => {
      const currentQ = state.currentQuestions[state.currentQuestion];
      const wrongOptions = currentQ.options
        .filter((_, i) => i !== currentQ.correct)
        .slice(0, 2);

      const updatedQuestions = state.currentQuestions.map((q, i) =>
        i === state.currentQuestion
          ? {
              ...q,
              options: q.options.filter((opt) => !wrongOptions.includes(opt)),
            }
          : q
      );

      return {
        currentQuestions: updatedQuestions,
        lifelines: {
          ...state.lifelines,
          fiftyFifty: state.lifelines.fiftyFifty - 1,
        },
      };
    }),

  useSkip: () =>
    set((state) => ({
      currentQuestion: state.currentQuestion + 1,
      lifelines: { ...state.lifelines, skip: state.lifelines.skip - 1 },
      timeLeft: 30,
    })),

  addTimeBonus: () =>
    set((state) => ({
      timeLeft: state.timeLeft + 15,
      lifelines: {
        ...state.lifelines,
        timeBonus: state.lifelines.timeBonus - 1,
      },
    })),
}));
