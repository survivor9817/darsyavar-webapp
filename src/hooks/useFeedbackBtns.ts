import { useEffect, useRef, useState } from "react";
import type { feedbackBtnsType, feedbackMsgsType } from "../data/feedbackData";

export type FeedbackBtnsStateType = {
  isCorrect: boolean;
  isIncorrect: boolean;
  isLike: boolean;
  isStar: boolean;
  isReport: boolean;
};

export const useFeedbackBtns = (
  feedbackBtnData: feedbackBtnsType,
  feedbackMsgData: feedbackMsgsType
) => {
  // btns and msgs handlers and logic #########################################
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

  const emptyFeedback = {
    isCorrect: false,
    isIncorrect: false,
    isLike: false,
    isStar: false,
    isReport: false,
  };

  function resetBtns() {
    Object.entries(emptyFeedback).forEach(([id, isOn]) => {
      handleBtn(id, isOn);
    });
  }

  function turnOffAllMsgs() {
    Object.entries(emptyFeedback).forEach(([id, isOn]) => {
      handleMsg(id, isOn);
    });
  }

  // inja feedbacke har soal ro dar har click mitonim hesab konim
  function getBtnsState(): FeedbackBtnsStateType {
    return btnsMeta.reduce(
      (acc, item) => {
        acc[item.id] = item.isOn;
        return acc;
      },
      { ...emptyFeedback }
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
      clearPrevMsgTimeout();
      handleMsg(otherOnMsgID, false);
      handleMsg(id, true);
      prevMsgTimeout.current = setTimeout(() => {
        handleMsg(id, false);
      }, 1500);
    }
  }

  return {
    btnsMeta,
    msgsMeta,
    updateFeedbackOnClick,
    handleBtn,
    handleMsg,
    resetBtns,
    getBtnsState,
    setBtnsStateByObject,
    turnOffAllMsgs,
  };
  // #########################################################################
};
