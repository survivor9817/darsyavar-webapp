import { useEffect, useState } from "react";

export function useQuizNavigation(
  startIndex: number,
  lastQuestionIndex: number,
  setShowEndConfirm: (show: boolean) => void
) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(startIndex);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const progressBarLength = ((currentQuestionIndex + 1) / (lastQuestionIndex + 1)) * 100;
    requestAnimationFrame(() => {
      setProgressPercent(progressBarLength);
    });
  }, [currentQuestionIndex, lastQuestionIndex]);

  function goToQuestion(number: number) {
    if (number < 0 || isNaN(number) || number > lastQuestionIndex) return;
    setCurrentQuestionIndex(number);
  }

  function goToPrevQuestion() {
    const newQuestionIndex = Math.max(0, currentQuestionIndex - 1);
    goToQuestion(newQuestionIndex);
  }

  function goToNextQuestion() {
    if (currentQuestionIndex === lastQuestionIndex) {
      setShowEndConfirm(true);
      return;
    }
    const newQuestionIndex = Math.min(lastQuestionIndex, currentQuestionIndex + 1);
    goToQuestion(newQuestionIndex);
  }

  //   const isFirstQuestion = currentQuestionIndex === 0;
  //   const isLastQuestion = currentQuestionIndex === lastQuestionIndex;

  return {
    currentQuestionIndex,
    progressPercent,
    // goToQuestion,
    goToPrevQuestion,
    goToNextQuestion,
  };
}
