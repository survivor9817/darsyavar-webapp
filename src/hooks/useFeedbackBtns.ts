import { useEffect, useRef, useState } from "react";
import type { feedbackBtnsType, feedbackMsgsType } from "../data/feedbackData";
import type { FeedbackObjectType } from "../data/questionsData";
import { useUpdateEffect } from "./useUpdateEffect";

export type FeedbackBtnsStateType = {
  isCorrect: boolean;
  isIncorrect: boolean;
  isLike: boolean;
  isStar: boolean;
  isReport: boolean;
};

export const useFeedbackBtns = (
  feedbackBtnData: feedbackBtnsType,
  feedbackMsgData: feedbackMsgsType,
  currentQuestionIndex: number,
  userId: string,
  savedfeedbacks: FeedbackObjectType[],
  questionIDs: number[]
) => {
  // #########################################################################
  // useFeedbackBtns: btns and msgs handlers and logic
  // #########################################################################
  const [btnsMeta, setBtnsMeta] = useState(feedbackBtnData);
  const [msgsMeta, setMsgsMeta] = useState(feedbackMsgData);

  function handleBtn(id: string, state: boolean) {
    setBtnsMeta((prev) => {
      return prev.map((item) => {
        if (item.id === id) return { ...item, isOn: state };
        const clickedOnCorrect = id === "isCorrect" && item.id === "isIncorrect";
        const clickedOnIncorrect = id === "isIncorrect" && item.id === "isCorrect";
        if (clickedOnCorrect || clickedOnIncorrect) return { ...item, isOn: false };
        return item;
      });
    });
  }

  function handleMsg(id: string, state: boolean) {
    setMsgsMeta((prev) => {
      return prev.map((item) => {
        if (item.id === id) return { ...item, isOn: state };
        const clickedOnCorrect = id === "isCorrect" && item.id === "isIncorrect";
        const clickedOnIncorrect = id === "isIncorrect" && item.id === "isCorrect";
        if (clickedOnCorrect || clickedOnIncorrect) return { ...item, isOn: false };
        return item;
      });
    });
  }

  const prevMsgTimeout = useRef<number | null>(null);
  function clearPrevMsgTimeout() {
    if (prevMsgTimeout.current !== null) {
      clearTimeout(prevMsgTimeout.current);
      prevMsgTimeout.current = null;
    }
  }

  useEffect(() => {
    return () => {
      clearPrevMsgTimeout();
    };
  }, []);

  // function showMsgTemporarily(id: string, duration = 1500) {
  //   clearPrevMsgTimeout();
  //   handleMsg(id, true);
  //   prevMsgTimeout.current = setTimeout(() => {
  //     handleMsg(id, false);
  //   }, duration);
  // }

  const emptyFeedbackState = {
    isCorrect: false,
    isIncorrect: false,
    isLike: false,
    isStar: false,
    isReport: false,
  };

  function resetBtns() {
    Object.entries(emptyFeedbackState).forEach(([id, isOn]) => {
      handleBtn(id, isOn);
    });
  }

  function turnOffAllMsgs() {
    Object.entries(emptyFeedbackState).forEach(([id, isOn]) => {
      handleMsg(id, isOn);
    });
  }

  useEffect(() => {
    turnOffAllMsgs();
  }, [currentQuestionIndex]);

  // inja feedbacke har soal ro dar har click mitonim hesab konim
  function getBtnsState(): FeedbackBtnsStateType {
    return btnsMeta.reduce(
      (acc, item) => {
        acc[item.id] = item.isOn;
        return acc;
      },
      { ...emptyFeedbackState }
    );
  }

  function setBtnsStateByObject(feedbackObject: FeedbackBtnsStateType) {
    setBtnsMeta((prev) => {
      return prev.map((item) => {
        if (item.id in feedbackObject) {
          return {
            ...item,
            isOn: feedbackObject[item.id] ?? false,
          };
        }
        return item;
      });
    });
  }

  function updateFeedbackOnClick(id: string) {
    const isClickedBtnOn = btnsMeta.find((item) => item.id === id)?.isOn;
    const isClickedMsgOn = msgsMeta.find((item) => item.id === id)?.isOn;
    const isOtherMsgOn = msgsMeta.some((item) => item.id !== id && item.isOn);
    const otherOnMsgID = isOtherMsgOn && msgsMeta.find((item) => item.isOn)?.id;
    // const noMsgsOn = !msgsMeta.some((item) => item.isOn);
    if (isClickedBtnOn) {
      handleBtn(id, false);
    }

    if (isClickedBtnOn && isClickedMsgOn) {
      handleBtn(id, false);
      clearPrevMsgTimeout();
      handleMsg(id, false);
    }

    if (!isClickedBtnOn && !isOtherMsgOn) {
      handleBtn(id, true);
      handleMsg(id, true);
      prevMsgTimeout.current = setTimeout(() => {
        handleMsg(id, false);
      }, 1500);
    }

    if (!isClickedBtnOn && isOtherMsgOn) {
      handleBtn(id, true);
      if (!otherOnMsgID) return;
      handleMsg(otherOnMsgID, false);
      clearPrevMsgTimeout();
      handleMsg(id, true);
      prevMsgTimeout.current = setTimeout(() => {
        handleMsg(id, false);
      }, 1500);
    }
  }

  // #########################################################################
  // useFeedbackUpdate: load and save data to fake db
  // #########################################################################

  const feedbacks = useRef(savedfeedbacks);
  const currentQuestionID = questionIDs[currentQuestionIndex];

  function getFeedbackFromDB(questionId: number, userId: string) {
    const currentFeedback = feedbacks.current.find(
      (f) => f.questionId === questionId && f.userId === userId
    );

    if (!currentFeedback) {
      const emptyFeedbackRecord = {
        questionId,
        userId,
        answer: null,
        isLike: false,
        isStar: false,
        isReport: false,
      };

      feedbacks.current.push(emptyFeedbackRecord);

      const emptyFeedbackState = {
        isCorrect: false,
        isIncorrect: false,
        isLike: false,
        isStar: false,
        isReport: false,
      };

      return emptyFeedbackState;
    }

    const { answer, isLike, isStar, isReport } = currentFeedback;
    const savedBtnsState: FeedbackBtnsStateType = {
      isCorrect: answer === true,
      isIncorrect: answer === false,
      isLike: isLike || false,
      isStar: isStar || false,
      isReport: isReport || false,
    };

    return savedBtnsState;
  }

  // load feedback on load question and on change question.
  useEffect(() => {
    const currentFeedbackObj = getFeedbackFromDB(currentQuestionID, userId);
    const timerId = setTimeout(() => {
      resetBtns();
      setBtnsStateByObject(currentFeedbackObj);
    }, 700);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentQuestionIndex]);

  // save feedback on data base.
  function saveFeedbackToDB(questionId: number, userId: string, btnsState: FeedbackBtnsStateType) {
    const { isCorrect, isIncorrect, isLike, isStar, isReport } = btnsState;

    let answer: boolean | null = null;
    if (isCorrect) answer = true;
    if (isIncorrect) answer = false;

    const dbFeedbackObj = { questionId, userId, answer, isLike, isStar, isReport };

    feedbacks.current = feedbacks.current.filter(
      (item) => item.questionId !== questionId && item.userId === userId
    );

    feedbacks.current.push(dbFeedbackObj);
  }

  useUpdateEffect(() => {
    saveFeedbackToDB(currentQuestionID, userId, getBtnsState());
  }, [btnsMeta]);

  return {
    btnsMeta,
    msgsMeta,
    updateFeedbackOnClick,
  };
  // #########################################################################
};
